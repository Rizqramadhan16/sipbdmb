<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h5 font-weight-bold">Notifikasi</h1>
      <v-btn
        v-if="store.list.length > 0"
        variant="tonal"
        color="primary"
        size="small"
        @click="store.markAllRead()"
      >
        Tandai Semua Dibaca
      </v-btn>
    </div>

    <v-card rounded="lg" elevation="2">
      <v-list v-if="store.list.length > 0" lines="two">
        <template v-for="(notif, i) in store.list" :key="notif.id">
          <v-list-item
            :class="!notif.is_read ? 'bg-blue-lighten-5' : ''"
            @click="store.markRead(notif.id)"
          >
            <template #prepend>
              <v-avatar :color="notif.is_read ? 'grey' : 'primary'" size="36">
                <v-icon color="white" size="18">mdi-bell</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="font-weight-medium">
              {{ notif.judul }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ notif.pesan }}</v-list-item-subtitle>

            <template #append>
              <div class="text-caption text-grey">
                {{ formatDateTime(notif.created_at) }}
              </div>
            </template>
          </v-list-item>
          <v-divider v-if="i < store.list.length - 1" />
        </template>
      </v-list>

      <div v-else class="pa-8 text-center">
        <v-icon size="64" color="grey-lighten-2">mdi-bell-off</v-icon>
        <p class="text-grey mt-2">Belum ada notifikasi</p>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNotifikasiStore } from '@/stores/notifikasi'
import { formatDateTime } from '@/utils/helpers'

const store = useNotifikasiStore()
onMounted(() => store.fetchAll())
</script>