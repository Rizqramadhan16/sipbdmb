<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Dashboard Dosen</h1>

    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <StatCard title="Pengajuan Baru" :value="data.pengajuan_baru" icon="mdi-clipboard-alert" color="orange" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <StatCard title="Jadwal Hari Ini" :value="data.jadwal_hari_ini" icon="mdi-calendar-today" color="blue" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <StatCard title="Slot Aktif" :value="data.slot_aktif" icon="mdi-calendar-check" color="green" />
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2">
          <v-card-title class="pa-4 font-weight-bold">Statistik Pengajuan</v-card-title>
          <v-divider />
          <v-card-text>
            <div v-for="item in data.statistik_status" :key="item.status" class="mb-3">
              <div class="d-flex justify-space-between mb-1">
                <span class="text-capitalize">{{ item.status }}</span>
                <strong>{{ item.total }}</strong>
              </div>
              <v-progress-linear :model-value="item.total * 20" :color="getStatusColor(item.status)" rounded height="8" />
            </div>
            <p v-if="!data.statistik_status?.length" class="text-grey text-center">Belum ada data</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import StatCard from '@/components/ui/StatCard.vue'
import { getStatusColor } from '@/utils/helpers'

const data = ref({ pengajuan_baru: 0, jadwal_hari_ini: 0, slot_aktif: 0, statistik_status: [] })

onMounted(async () => {
  const res = await api.get('/dashboard')
  data.value = res.data.data
})
</script>