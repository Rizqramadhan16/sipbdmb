<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Kelola User</h1>

    <v-card rounded="lg" elevation="2">
      <v-card-text>
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" placeholder="Cari user..." variant="outlined" density="compact" hide-details class="mb-4" />
        <v-data-table :headers="headers" :items="users" :search="search" :loading="loading" rounded="lg">
          <template #item.role="{ item }">
            <v-chip size="small" color="primary" variant="tonal">{{ item.role }}</v-chip>
          </template>
          <template #item.status="{ item }">
            <StatusBadge :status="item.status" />
          </template>
          <template #item.actions="{ item }">
            <v-btn size="small" variant="tonal" color="orange" class="mr-1" @click="openResetDialog(item)">Reset PW</v-btn>
            <v-btn size="small" variant="tonal" color="primary" @click="openRoleDialog(item)">Ubah Role</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Reset Password Dialog -->
    <v-dialog v-model="resetDialog" max-width="400" persistent>
      <v-card rounded="lg">
        <v-card-title class="pa-4">Reset Password</v-card-title>
        <v-card-text>
          <p class="mb-3">User: <strong>{{ selected?.nama }}</strong></p>
          <v-text-field v-model="newPassword" label="Password Baru" type="password" variant="outlined" density="comfortable" />
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="resetDialog = false">Batal</v-btn>
          <v-btn color="primary" variant="flat" :loading="saving" @click="handleReset">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Change Role Dialog -->
    <v-dialog v-model="roleDialog" max-width="400" persistent>
      <v-card rounded="lg">
        <v-card-title class="pa-4">Ubah Role</v-card-title>
        <v-card-text>
          <p class="mb-3">User: <strong>{{ selected?.nama }}</strong></p>
          <v-select v-model="newRole" label="Role" :items="['admin','dosen','mahasiswa']" variant="outlined" density="comfortable" />
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="roleDialog = false">Batal</v-btn>
          <v-btn color="primary" variant="flat" :loading="saving" @click="handleChangeRole">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import StatusBadge from '@/components/ui/StatusBadge.vue'

const users       = ref([])
const loading     = ref(false)
const search      = ref('')
const resetDialog = ref(false)
const roleDialog  = ref(false)
const saving      = ref(false)
const selected    = ref(null)
const newPassword = ref('')
const newRole     = ref('')
const snackbar    = ref({ show: false, text: '', color: 'success' })

const headers = [
  { title: 'Nama',  key: 'nama' },
  { title: 'Email', key: 'email' },
  { title: 'Role',  key: 'role' },
  { title: 'Status',key: 'status' },
  { title: 'Aksi',  key: 'actions', sortable: false },
]

const fetchUsers = async () => {
  loading.value = true
  const res = await api.get('/user')
  users.value = res.data.data
  loading.value = false
}

const openResetDialog = (item) => { selected.value = item; newPassword.value = ''; resetDialog.value = true }
const openRoleDialog  = (item) => { selected.value = item; newRole.value = item.role; roleDialog.value = true }

const handleReset = async () => {
  saving.value = true
  try {
    await api.put(`/user/${selected.value.id}/password`, { password: newPassword.value })
    resetDialog.value = false
    showSnackbar('Password berhasil direset')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  } finally { saving.value = false }
}

const handleChangeRole = async () => {
  saving.value = true
  try {
    await api.put(`/user/${selected.value.id}/role`, { role: newRole.value })
    roleDialog.value = false
    await fetchUsers()
    showSnackbar('Role berhasil diubah')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  } finally { saving.value = false }
}

const showSnackbar = (text, color = 'success') => { snackbar.value = { show: true, text, color } }

onMounted(fetchUsers)
</script>