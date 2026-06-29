<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Riwayat Bimbingan</h1>
    <v-card rounded="lg" elevation="2">
      <v-card-text>
        <v-data-table :headers="headers" :items="riwayat" :loading="store.loading" rounded="lg">
          <template #item.tanggal="{ item }">{{ formatTanggal(item.tanggal) }} {{ formatJam(item.jam_mulai) }}</template>
          <template #item.status="{ item }"><StatusBadge :status="item.status" /></template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePengajuanStore } from '@/stores/pengajuan'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { formatTanggal, formatJam } from '@/utils/helpers'

const store   = usePengajuanStore()
const riwayat = computed(() => store.list.filter(p => ['selesai','ditolak'].includes(p.status)))

const headers = [
  { title: 'Dosen',   key: 'nama_dosen' },
  { title: 'Topik',   key: 'topik' },
  { title: 'Jadwal',  key: 'tanggal' },
  { title: 'Status',  key: 'status' },
]

onMounted(() => store.fetchAll())
</script>
