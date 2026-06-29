<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Dashboard Admin</h1>

    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <StatCard title="Total Mahasiswa" :value="data.total_mahasiswa" icon="mdi-account-school" color="blue" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <StatCard title="Total Dosen" :value="data.total_dosen" icon="mdi-account-tie" color="green" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <StatCard title="Total Slot" :value="data.total_slot" icon="mdi-calendar" color="orange" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <StatCard title="Total Pengajuan" :value="data.total_pengajuan" icon="mdi-clipboard-list" color="purple" />
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2">
          <v-card-title class="pa-4 font-weight-bold">
            <v-icon class="mr-2">mdi-chart-pie</v-icon>
            Statistik Status Pengajuan
          </v-card-title>
          <v-divider />
          <v-card-text>
            <div v-for="item in data.statistik_status" :key="item.status" class="mb-3">
              <div class="d-flex justify-space-between mb-1">
                <span class="text-capitalize">{{ item.status }}</span>
                <strong>{{ item.total }}</strong>
              </div>
              <v-progress-linear
                :model-value="(item.total / data.total_pengajuan) * 100"
                :color="getStatusColor(item.status)"
                rounded
                height="8"
              />
            </div>
            <p v-if="!data.statistik_status?.length" class="text-grey text-center">
              Belum ada data
            </p>
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

const data = ref({
  total_mahasiswa:  0,
  total_dosen:      0,
  total_slot:       0,
  total_pengajuan:  0,
  statistik_status: [],
})

onMounted(async () => {
  const res = await api.get('/dashboard')
  data.value = res.data.data
})
</script>