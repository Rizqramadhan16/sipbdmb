<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Dashboard Mahasiswa</h1>

    <v-row>
      <v-col cols="12" sm="4">
        <StatCard title="Total Pengajuan" :value="data.total_pengajuan" icon="mdi-send" color="blue" />
      </v-col>
      <v-col cols="12" sm="4">
        <StatCard title="Status Terakhir" :value="data.status_terakhir || '-'" icon="mdi-information" color="orange" />
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" md="6">
        <v-card v-if="data.jadwal_berikutnya" rounded="lg" elevation="2" color="primary">
          <v-card-text class="text-white">
            <p class="text-caption mb-1 opacity-80">Jadwal Berikutnya</p>
            <p class="text-h6 font-weight-bold">{{ formatTanggal(data.jadwal_berikutnya.tanggal) }}</p>
            <p class="text-body-2">{{ formatJam(data.jadwal_berikutnya.jam_mulai) }} — {{ data.jadwal_berikutnya.nama_dosen }}</p>
          </v-card-text>
        </v-card>
        <v-card v-else rounded="lg" elevation="2">
          <v-card-text class="text-center text-grey pa-6">
            <v-icon size="48" color="grey-lighten-2">mdi-calendar-blank</v-icon>
            <p class="mt-2">Tidak ada jadwal mendatang</p>
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
import { formatTanggal, formatJam } from '@/utils/helpers'

const data = ref({ total_pengajuan: 0, status_terakhir: null, jadwal_berikutnya: null })

onMounted(async () => {
  const res  = await api.get('/dashboard')
  data.value = res.data.data
})
</script>