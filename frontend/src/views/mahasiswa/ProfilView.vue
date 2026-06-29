<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Profil Saya</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2">
          <v-card-title class="pa-4 font-weight-bold">Informasi Akun</v-card-title>
          <v-divider />
          <v-card-text class="pa-4">
            <v-text-field v-model="form.nama"  label="Nama Lengkap" variant="outlined" density="comfortable" class="mb-3" />
            <v-text-field v-model="form.email" label="Email" variant="outlined" density="comfortable" class="mb-3" readonly />
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn color="primary" variant="flat" :loading="saving" @click="handleUpdate">Simpan</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2">
          <v-card-title class="pa-4 font-weight-bold">Ganti Password</v-card-title>
          <v-divider />
          <v-card-text class="pa-4">
            <v-text-field v-model="passForm.password" label="Password Baru" type="password" variant="outlined" density="comfortable" class="mb-3" />
            <v-text-field v-model="passForm.konfirmasi" label="Konfirmasi Password" type="password" variant="outlined" density="comfortable" />
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn color="primary" variant="flat" :loading="savingPass" @click="handleChangePass">Ganti Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const authStore  = useAuthStore()
const saving     = ref(false)
const savingPass = ref(false)
const snackbar   = ref({ show: false, text: '', color: 'success' })

const form     = ref({ nama: '', email: '' })
const passForm = ref({ password: '', konfirmasi: '' })

const handleUpdate = async () => {
  saving.value = true
  try {
    showSnackbar('Profil berhasil diperbarui')
  } finally { saving.value = false }
}

const handleChangePass = async () => {
  if (passForm.value.password !== passForm.value.konfirmasi) {
    showSnackbar('Password tidak cocok', 'error')
    return
  }
  savingPass.value = true
  try {
    await api.put(`/user/${authStore.user.id}/password`, { password: passForm.value.password })
    passForm.value = { password: '', konfirmasi: '' }
    showSnackbar('Password berhasil diganti')
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Gagal', 'error')
  } finally { savingPass.value = false }
}

const showSnackbar = (text, color = 'success') => { snackbar.value = { show: true, text, color } }

onMounted(() => {
  form.value.nama  = authStore.user?.nama  || ''
  form.value.email = authStore.user?.email || ''
})
</script>