<template>
  <v-app-bar
    flat
    color="white"
    border="b"
    height="60"
  >
    <v-app-bar-nav-icon color="primary" @click="$emit('toggle-drawer')" />

    <v-app-bar-title>
      <span class="topbar-title">SIPBDMB</span>
    </v-app-bar-title>

    <v-spacer />

    <!-- Notifikasi -->
    <v-btn icon variant="text" color="grey-darken-1" class="mr-1" @click="goNotifikasi">
      <v-badge :content="unread" :model-value="unread > 0" color="error">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

    <!-- User -->
    <v-menu location="bottom end">
      <template #activator="{ props }">
        <div v-bind="props" class="user-trigger mr-3">
          <v-avatar color="primary" size="32">
            <span class="text-white font-weight-bold" style="font-size:11px;">
              {{ initials }}
            </span>
          </v-avatar>
          <span class="user-trigger-name d-none d-sm-inline">{{ user?.nama }}</span>
          <v-icon size="16" color="grey">mdi-chevron-down</v-icon>
        </div>
      </template>

      <v-card rounded="lg" elevation="8" min-width="200" class="mt-1">
        <div class="pa-4 border-b">
          <div class="text-body-2 font-weight-bold">{{ user?.nama }}</div>
          <div class="text-caption text-grey">{{ user?.email }}</div>
          <v-chip size="x-small" color="primary" variant="tonal" class="mt-2">
            {{ getRoleLabel(user?.role) }}
          </v-chip>
        </div>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-bell-outline"
            title="Notifikasi"
            rounded="lg"
            @click="goNotifikasi"
          />
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            base-color="error"
            rounded="lg"
            @click="handleLogout"
          />
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotifikasiStore } from '@/stores/notifikasi'
import { getRoleLabel } from '@/utils/helpers'

defineEmits(['toggle-drawer'])

const router     = useRouter()
const authStore  = useAuthStore()
const notifStore = useNotifikasiStore()

const user      = computed(() => authStore.user)
const unread    = computed(() => notifStore.unread)
const initials  = computed(() => {
  const nama = user.value?.nama || ''
  return nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
})

const goNotifikasi = () => router.push(`/${authStore.role}/notifikasi`)
const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.topbar-title {
  font-size: 16px;
  font-weight: 700;
  color: #1565C0;
}
.user-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
}
.user-trigger:hover {
  background: #F0F4F8;
}
.user-trigger-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}
</style>