<template>
  <v-navigation-drawer
    :model-value="drawer"
    color="white"
    width="255"
    @update:model-value="$emit('update:drawer', $event)"
  >
    <!-- Brand -->
    <div class="brand-header">
      <div class="d-flex align-center">
        <div class="brand-icon mr-3">
          <v-icon color="white" size="20">mdi-school</v-icon>
        </div>
        <div>
          <div class="text-subtitle-2 font-weight-bold text-white">SIPBDMB</div>
          <div class="brand-sub">Teknik Informatika</div>
        </div>
      </div>
    </div>

    <!-- User Info -->
    <div class="px-3 py-3">
      <div class="user-card">
        <v-avatar color="primary" size="34" class="mr-2">
          <span class="text-white text-caption font-weight-bold">{{ initials }}</span>
        </v-avatar>
        <div>
          <div class="user-name">{{ user?.nama }}</div>
          <v-chip size="x-small" color="primary" variant="tonal">
            {{ getRoleLabel(role) }}
          </v-chip>
        </div>
      </div>
    </div>

    <v-divider />

    <!-- Menu -->
    <div class="px-2 pt-2">
      <div class="menu-label">MENU UTAMA</div>
      <v-list density="compact" nav>
        <v-list-item
          v-for="menu in menus"
          :key="menu.to"
          :to="menu.to"
          :prepend-icon="menu.icon"
          :title="menu.title"
          rounded="lg"
          color="primary"
          class="menu-item mb-1"
        />
      </v-list>
    </div>

    <!-- Logout -->
    <template #append>
      <div class="pa-3">
        <v-divider class="mb-3" />
        <v-btn
          block
          variant="tonal"
          color="error"
          prepend-icon="mdi-logout"
          rounded="lg"
          size="small"
          @click="handleLogout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getRoleLabel } from '@/utils/helpers'

defineProps({ drawer: Boolean })
defineEmits(['update:drawer'])

const router    = useRouter()
const authStore = useAuthStore()
const role      = computed(() => authStore.role)
const user      = computed(() => authStore.user)

const initials = computed(() => {
  const nama = user.value?.nama || ''
  return nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
})

const menuByRole = {
  admin: [
    { title: 'Dashboard',   icon: 'mdi-view-dashboard-outline', to: '/admin/dashboard'  },
    { title: 'Mahasiswa',   icon: 'mdi-account-school-outline', to: '/admin/mahasiswa'  },
    { title: 'Dosen',       icon: 'mdi-account-tie-outline',    to: '/admin/dosen'      },
    { title: 'Monitoring',  icon: 'mdi-monitor-eye',            to: '/admin/monitoring' },
    { title: 'Kelola User', icon: 'mdi-account-cog-outline',    to: '/admin/user'       },
    { title: 'Notifikasi',  icon: 'mdi-bell-outline',           to: '/admin/notifikasi' },
  ],
  dosen: [
    { title: 'Dashboard',   icon: 'mdi-view-dashboard-outline', to: '/dosen/dashboard'  },
    { title: 'Slot Jadwal', icon: 'mdi-calendar-plus-outline',  to: '/dosen/slot'       },
    { title: 'Pengajuan',   icon: 'mdi-clipboard-list-outline', to: '/dosen/pengajuan'  },
    { title: 'Riwayat',     icon: 'mdi-history',                to: '/dosen/riwayat'    },
    { title: 'Notifikasi',  icon: 'mdi-bell-outline',           to: '/dosen/notifikasi' },
  ],
  mahasiswa: [
    { title: 'Dashboard',   icon: 'mdi-view-dashboard-outline', to: '/mahasiswa/dashboard' },
    { title: 'Pengajuan',   icon: 'mdi-send-outline',           to: '/mahasiswa/pengajuan' },
    { title: 'Riwayat',     icon: 'mdi-history',                to: '/mahasiswa/riwayat'   },
    { title: 'Profil',      icon: 'mdi-account-outline',        to: '/mahasiswa/profil'    },
    { title: 'Notifikasi',  icon: 'mdi-bell-outline',           to: '/mahasiswa/notifikasi'},
  ],
}

const menus = computed(() => menuByRole[role.value] || [])

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.brand-header {
  padding: 18px 16px;
  background: linear-gradient(135deg, #1565C0, #1976D2);
}
.brand-icon {
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.brand-sub {
  font-size: 10px;
  color: rgba(255,255,255,0.65);
}
.user-card {
  display: flex;
  align-items: center;
  background: #F0F4F8;
  border-radius: 10px;
  padding: 8px 10px;
}
.user-name {
  font-size: 12px;
  font-weight: 600;
  color: #1a1a1a;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.menu-label {
  font-size: 10px;
  font-weight: 600;
  color: #9e9e9e;
  letter-spacing: 0.08em;
  padding: 0 8px 6px;
}
.menu-item {
  font-size: 13px !important;
  font-weight: 500;
}
</style>