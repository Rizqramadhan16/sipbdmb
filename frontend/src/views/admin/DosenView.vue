<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h5 font-weight-bold">Kelola Dosen</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog()">Tambah</v-btn>
    </div>

    <v-card rounded="lg" elevation="2">
      <v-card-text>
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" placeholder="Cari dosen..." variant="outlined" density="compact" hide-details class="mb-4" />
        <v-data-table :headers="headers" :items="store.list" :search="search" :loading="store.loading" rounded="lg">
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

    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card rounded="lg">
        <v-card-title class="pa-4 font-weight-bold">{{ isEdit ? 'Edit Dosen' : 'Tambah Dosen' }}</v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-text-field v-model="form.nama"            label="Nama Lengkap"    variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-model="form.email"           label="Email"           variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-model="form.nidn"            label="NIDN"            variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-model="form.bidang_keahlian" label="Bidang Keahlian" variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-if="!isEdit" v-model="form.password" label="Password" variant="outlined" density="comfortable" class="mb-3" type="password" />
          <v-select v-if="isEdit" v-model="form.status" label="Status" :items="['aktif','nonaktif']" variant="outlined" density="comfortable" />
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Batal</v-btn>
          <v-btn color="primary" variant="flat" :loading="saving" @click="handleSave">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ConfirmDialog ref="confirmRef" @confirm="handleDelete" />
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDosenStore } from '@/stores/dosen'
import StatusBadge   from '@/components/ui/StatusBadge.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const store  = useDosenStore()
const search = ref('')
const dialog = ref(false)
const saving = ref(false)
const isEdit = ref(false)
const selectedId   = ref(null)
const confirmRef   = ref(null)
const deleteTarget = ref(null)
const snackbar     = ref({ show: false, text: '', color: 'success' })

const form = ref({ nama: '', email: '', nidn: '', bidang_keahlian: '', password: '', status: 'aktif' })

const headers = [
  { title: 'Nama',            key: 'nama' },
  { title: 'NIDN',            key: 'nidn' },
  { title: 'Email',           key: 'email' },
  { title: 'Bidang Keahlian', key: 'bidang_keahlian' },
  { title: 'Status',          key: 'status' },
  { title: 'Aksi',            key: 'actions', sortable: false },
]

const openDialog = (item = null) => {
  isEdit.value     = !!item
  selectedId.value = item?.id || null
  form.value = item
    ? { nama: item.nama, email: item.email, nidn: item.nidn, bidang_keahlian: item.bidang_keahlian, status: item.status }
    : { nama: '', email: '', nidn: '', bidang_keahlian: '', password: '', status: 'aktif' }
  dialog.value = true
}

const handleSave = async () => {
  saving.value = true
  try {
    isEdit.value ? await store.update(selectedId.value, form.value) : await store.create(form.value)
    dialog.value = false
    showSnackbar('Data berhasil disimpan')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal menyimpan', 'error')
  } finally { saving.value = false }
}

const confirmDelete = (item) => { deleteTarget.value = item; confirmRef.value.open() }

const handleDelete = async () => {
  try {
    await store.remove(deleteTarget.value.id)
    showSnackbar('Dosen berhasil dihapus')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal menghapus', 'error')
  }
}

const showSnackbar = (text, color = 'success') => { snackbar.value = { show: true, text, color } }

onMounted(() => store.fetchAll())
</script>