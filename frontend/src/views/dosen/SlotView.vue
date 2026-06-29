<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h5 font-weight-bold">Kelola Slot Jadwal</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog()">Tambah Slot</v-btn>
    </div>

    <v-card rounded="lg" elevation="2">
      <v-card-text>
        <v-data-table :headers="headers" :items="store.list" :loading="store.loading" rounded="lg">
          <template #item.tanggal="{ item }">{{ formatTanggal(item.tanggal) }}</template>
          <template #item.jam="{ item }">{{ formatJam(item.jam_mulai) }} - {{ formatJam(item.jam_selesai) }}</template>
          <template #item.status="{ item }">
            <StatusBadge :status="item.status" />
          </template>
          <template #item.actions="{ item }">
            <v-btn icon size="small" variant="text" color="primary" @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon size="small" variant="text" color="error" @click="confirmDelete(item)"><v-icon>mdi-delete</v-icon></v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="450" persistent>
      <v-card rounded="lg">
        <v-card-title class="pa-4 font-weight-bold">{{ isEdit ? 'Edit Slot' : 'Tambah Slot' }}</v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-text-field v-model="form.tanggal"     label="Tanggal"     type="date" variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-model="form.jam_mulai"   label="Jam Mulai"   type="time" variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-model="form.jam_selesai" label="Jam Selesai" type="time" variant="outlined" density="comfortable" class="mb-3" />
          <v-select v-if="isEdit" v-model="form.status" label="Status" :items="['tersedia','tidak_tersedia']" variant="outlined" density="comfortable" />
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Batal</v-btn>
          <v-btn color="primary" variant="flat" :loading="saving" @click="handleSave">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ConfirmDialog ref="confirmRef" message="Hapus slot ini?" @confirm="handleDelete" />
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSlotStore } from '@/stores/slot'
import StatusBadge   from '@/components/ui/StatusBadge.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import { formatTanggal, formatJam } from '@/utils/helpers'

const store   = useSlotStore()
const dialog  = ref(false)
const saving  = ref(false)
const isEdit  = ref(false)
const selectedId   = ref(null)
const confirmRef   = ref(null)
const deleteTarget = ref(null)
const snackbar     = ref({ show: false, text: '', color: 'success' })
const form = ref({ tanggal: '', jam_mulai: '', jam_selesai: '', status: 'tersedia' })

const headers = [
  { title: 'Tanggal',    key: 'tanggal' },
  { title: 'Jam',        key: 'jam', sortable: false },
  { title: 'Status',     key: 'status' },
  { title: 'Aksi',       key: 'actions', sortable: false },
]

const openDialog = (item = null) => {
  isEdit.value     = !!item
  selectedId.value = item?.id || null
  form.value = item
    ? { tanggal: item.tanggal?.substring(0,10), jam_mulai: item.jam_mulai?.substring(0,5), jam_selesai: item.jam_selesai?.substring(0,5), status: item.status }
    : { tanggal: '', jam_mulai: '', jam_selesai: '', status: 'tersedia' }
  dialog.value = true
}

const handleSave = async () => {
  saving.value = true
  try {
    isEdit.value ? await store.update(selectedId.value, form.value) : await store.create(form.value)
    dialog.value = false
    showSnackbar('Slot berhasil disimpan')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  } finally { saving.value = false }
}

const confirmDelete = (item) => { deleteTarget.value = item; confirmRef.value.open() }
const handleDelete  = async () => {
  try {
    await store.remove(deleteTarget.value.id)
    showSnackbar('Slot berhasil dihapus')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  }
}

const showSnackbar = (text, color = 'success') => { snackbar.value = { show: true, text, color } }
onMounted(() => store.fetchAll())
</script>