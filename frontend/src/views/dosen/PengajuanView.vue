<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Kelola Pengajuan</h1>

    <v-card rounded="lg" elevation="2">
      <v-card-text>
        <v-data-table :headers="headers" :items="store.list" :loading="store.loading" rounded="lg">
          <template #item.tanggal="{ item }">
            {{ formatTanggal(item.tanggal) }} {{ formatJam(item.jam_mulai) }}
          </template>
          <template #item.status="{ item }">
            <StatusBadge :status="item.status" />
          </template>
          <template #item.actions="{ item }">
            <template v-if="item.status === 'pending'">
              <v-btn size="small" color="green" variant="flat" class="mr-1" @click="handleAksi(item, 'disetujui')">Setujui</v-btn>
              <v-btn size="small" color="red"   variant="flat" @click="openTolakDialog(item)">Tolak</v-btn>
            </template>
            <template v-else-if="item.status === 'disetujui'">
              <v-btn size="small" color="blue" variant="flat" @click="handleSelesai(item)">Selesai</v-btn>
            </template>
            <span v-else class="text-grey text-caption">—</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Dialog Tolak -->
    <v-dialog v-model="tolakDialog" max-width="450" persistent>
      <v-card rounded="lg">
        <v-card-title class="pa-4">Alasan Penolakan</v-card-title>
        <v-card-text>
          <v-textarea v-model="alasan" label="Alasan" variant="outlined" rows="3" />
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="tolakDialog = false">Batal</v-btn>
          <v-btn color="error" variant="flat" :loading="saving" @click="handleTolak">Tolak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePengajuanStore } from '@/stores/pengajuan'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { formatTanggal, formatJam } from '@/utils/helpers'

const store       = usePengajuanStore()
const tolakDialog = ref(false)
const saving      = ref(false)
const alasan      = ref('')
const selected    = ref(null)
const snackbar    = ref({ show: false, text: '', color: 'success' })

const headers = [
  { title: 'Mahasiswa', key: 'nama_mahasiswa' },
  { title: 'NIM',       key: 'nim' },
  { title: 'Topik',     key: 'topik' },
  { title: 'Jadwal',    key: 'tanggal' },
  { title: 'Status',    key: 'status' },
  { title: 'Aksi',      key: 'actions', sortable: false },
]

const handleAksi = async (item, status) => {
  try {
    await store.updateStatus(item.id, { status })
    showSnackbar('Status berhasil diperbarui')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  }
}

const openTolakDialog = (item) => { selected.value = item; alasan.value = ''; tolakDialog.value = true }

const handleTolak = async () => {
  saving.value = true
  try {
    await store.updateStatus(selected.value.id, { status: 'ditolak', alasan_penolakan: alasan.value })
    tolakDialog.value = false
    showSnackbar('Pengajuan ditolak')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  } finally { saving.value = false }
}

const handleSelesai = async (item) => {
  try {
    await store.selesai(item.id)
    showSnackbar('Bimbingan ditandai selesai')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  }
}

const showSnackbar = (text, color = 'success') => { snackbar.value = { show: true, text, color } }
onMounted(() => store.fetchAll())
</script>