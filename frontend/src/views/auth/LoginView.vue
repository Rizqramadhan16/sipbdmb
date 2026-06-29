<template>
  <v-app style="background: linear-gradient(135deg, #1565C0 0%, #1976D2 50%, #42A5F5 100%);">
    <v-main>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">

            <!-- Logo atas -->
            <div class="text-center mb-6">
              <div class="login-logo mx-auto mb-3">
                <v-icon color="white" size="36">mdi-school</v-icon>
              </div>
              <h1 class="text-h5 font-weight-bold text-white">SIPBDMB</h1>
              <p class="text-caption text-white opacity-75 mt-1">
                Sistem Informasi Penjadwalan Bimbingan Dosen & Mahasiswa
              </p>
            </div>

            <!-- Card -->
            <v-card rounded="xl" elevation="0" class="login-card">
              <v-card-text class="pa-8">

                <h2 class="text-h6 font-weight-bold text-primary mb-1">Selamat Datang</h2>
                <p class="text-caption text-grey mb-6">Masuk ke akun Anda untuk melanjutkan</p>

                <!-- Alert -->
                <v-alert
                  v-if="errorMsg"
                  type="error"
                  variant="tonal"
                  rounded="lg"
                  class="mb-4"
                  closable
                  @click:close="errorMsg = ''"
                >
                  {{ errorMsg }}
                </v-alert>

                <!-- Email -->
                <div class="mb-1 text-caption font-weight-medium text-grey-darken-1">Email</div>
                <v-text-field
                  v-model="form.email"
                  placeholder="Masukkan email"
                  type="email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="mb-3"
                  :disabled="loading"
                  bg-color="#F0F4F8"
                />

                <!-- Password -->
                <div class="mb-1 text-caption font-weight-medium text-grey-darken-1">Password</div>
                <v-text-field
                  v-model="form.password"
                  placeholder="Masukkan password"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="mb-6"
                  :disabled="loading"
                  bg-color="#F0F4F8"
                  @click:append-inner="showPassword = !showPassword"
                  @keyup.enter="handleLogin"
                />

                <!-- Button -->
                <v-btn
                  block
                  color="primary"
                  size="large"
                  rounded="lg"
                  :loading="loading"
                  style="background: linear-gradient(135deg, #1565C0, #1976D2); box-shadow: 0 4px 16px rgba(21,101,192,0.4);"
                  @click="handleLogin"
                >
                  <v-icon start>mdi-login</v-icon>
                  Masuk
                </v-btn>

                <!-- Divider info -->
                <v-divider class="my-5" />
                <div class="login-info rounded-lg pa-3">
                  <p class="text-caption text-grey mb-1">
                    <v-icon size="12" color="grey" class="mr-1">mdi-information</v-icon>
                    Akun demo tersedia:
                  </p>
                  <div v-for="akun in demoAkun" :key="akun.email" class="d-flex justify-space-between text-caption mt-1">
                    <span>
                      <v-chip size="x-small" :color="akun.color" variant="tonal" class="mr-1">{{ akun.role }}</v-chip>
                      {{ akun.email }}
                    </span>
                    <v-btn size="x-small" variant="text" color="primary" @click="fillDemo(akun)">Isi</v-btn>
                  </div>
                </div>

              </v-card-text>
            </v-card>

            <p class="text-center text-caption text-white opacity-60 mt-4">
              © {{ year }} Teknik Informatika
            </p>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router    = useRouter()
const authStore = useAuthStore()
const year      = new Date().getFullYear()

const form         = ref({ email: '', password: '' })
const loading      = ref(false)
const showPassword = ref(false)
const errorMsg     = ref('')

const demoAkun = [
  { role: 'Admin',     email: 'admin@sipbdmb.com', color: 'purple' },
  { role: 'Dosen',     email: 'budi@sipbdmb.com',  color: 'blue'   },
  { role: 'Mahasiswa', email: 'ahmad@sipbdmb.com', color: 'green'  },
]

const fillDemo = (akun) => {
  form.value.email    = akun.email
  form.value.password = 'Password123!'
}

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    errorMsg.value = 'Email dan password wajib diisi'
    return
  }
  loading.value  = true
  errorMsg.value = ''
  try {
    const data = await authStore.login(form.value)
    router.push(`/${data.user.role}/dashboard`)
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'Login gagal'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-logo {
  width: 64px;
  height: 64px;
  background: rgba(255,255,255,0.2);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}
.login-card {
  border: 1px solid #E3EAF3;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15) !important;
}
.login-info {
  background: #F0F4F8;
  border: 1px solid #E3EAF3;
}
</style>