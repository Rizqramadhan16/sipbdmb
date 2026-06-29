<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Pengajuan Bimbingan</h1>

    <!-- Status pengajuan aktif -->
    <v-alert v-if="pengajuanAktif" type="info" variant="tonal" class="mb-4" rounded="lg">
      Anda memiliki pengajuan <strong>pending</strong>. Tunggu konfirmasi dosen.
    </v-alert>

    <!-- Form Pengajuan -->
    <v-card v-if="!pengajuanAktif" rounded="lg" elevation="2" class="mb-6">
      <v-card-title class="pa-4 font-weight-bold">Buat Pengajuan Baru</v-card-title>
      <v-divider />
      <v-card-text class="pa-4">
        <v-select
          v-model="form.slot_id"
          :items="slotOptions"
          item-title="label"
          item-value="id"
          label="Pilih Slot Jadwal"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model="form.topik"
          label="Topik Bimbingan"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-textarea
          v-model="form.catatan"
          label="Catatan (opsional)"
          variant="outlined"
          rows="3"
        />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn color="primary" variant="flat" size="large" :loading="saving" @click="handleSubmit">
          Kirim Pengajuan
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Daftar Pengajuan -->
    <v-card rounded="lg" elevation="2">
      <v-card-title class="pa-4 font-weight-bold">Riwayat Pengajuan</v-card-title>
      <v-divider />
      <v-card-text>
        <v-data-table :headers="headers" :items="store.list" :loading="store.loading" rounded="lg">
          <template #item.tanggal="{ item }">{{ formatTanggal(item.tanggal) }} {{ formatJam(item.jam_mulai) }}</template>
          <template #item.status="{ item }"><StatusBadge :status="item.status" /></template>
          <template #item.alasan_penolakan="{ item }">
            <span class="text-caption text-red">{{ item.alasan_penolakan || '-' }}</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePengajuanStore } from '@/stores/pengajuan'
import { useSlotStore }      from '@/stores/slot'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { formatTanggal, formatJam } from '@/utils/helpers'

const store     = usePengajuanStore()
const slotStore = useSlotStore()
const saving    = ref(false)
const snackbar  = ref({ show: false, text: '', color: 'success' })
const form      = ref({ slot_id: null, topik: '', catatan: '' })

const pengajuanAktif = computed(() =>
  store.list.some(p => p.status === 'pending')
)

const slotOptions = computed(() =>
  slotStore.list.map(s => ({
    id:    s.id,
    label: `${s.nama_dosen} — ${formatTanggal(s.tanggal)} ${formatJam(s.jam_mulai)}`,
  }))
)

const headers = [
  { title: 'Dosen',    key: 'nama_dosen' },
  { title: 'Topik',    key: 'topik' },
  { title: 'Jadwal',   key: 'tanggal' },
  { title: 'Status',   key: 'status' },
  { title: 'Catatan Dosen', key: 'alasan_penolakan' },
]

const handleSubmit = async () => {
  if (!form.value.slot_id || !form.value.topik) {
    showSnackbar('Slot dan topik wajib diisi', 'error')
    return
  }
  saving.value = true
  try {
    await store.create(form.value)
    form.value = { slot_id: null, topik: '', catatan: '' }
    showSnackbar('Pengajuan berhasil dikirim')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  } finally { saving.value = false }
}

const showSnackbar = (text, color = 'success') => { snackbar.value = { show: true, text, color } }

onMounted(() => {
  store.fetchAll()
  slotStore.fetchAll()
})
</script>