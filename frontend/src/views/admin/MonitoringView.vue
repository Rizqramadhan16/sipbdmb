<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Monitoring</h1>

    <v-tabs v-model="tab" color="primary" class="mb-4">
      <v-tab value="pengajuan">Semua Pengajuan</v-tab>
      <v-tab value="slot">Semua Slot</v-tab>
      <v-tab value="notifikasi">Semua Notifikasi</v-tab>
    </v-tabs>

    <v-card rounded="lg" elevation="2">
      <v-card-text>

        <!-- Pengajuan -->
        <div v-if="tab === 'pengajuan'">
          <v-data-table :headers="headersPengajuan" :items="pengajuan" :loading="loading" rounded="lg">
            <template #item.status="{ item }">
              <StatusBadge :status="item.status" />
            </template>
            <template #item.tanggal="{ item }">
              {{ formatTanggal(item.tanggal) }} {{ formatJam(item.jam_mulai) }}
            </template>
          </v-data-table>
        </div>

        <!-- Slot -->
        <div v-if="tab === 'slot'">
          <v-data-table :headers="headersSlot" :items="slots" :loading="loading" rounded="lg">
            <template #item.status="{ item }">
              <StatusBadge :status="item.status" />
            </template>
            <template #item.tanggal="{ item }">
              {{ formatTanggal(item.tanggal) }}
            </template>
            <template #item.jam="{ item }">
              {{ formatJam(item.jam_mulai) }} - {{ formatJam(item.jam_selesai) }}
            </template>
          </v-data-table>
        </div>

        <!-- Notifikasi -->
        <div v-if="tab === 'notifikasi'">
          <v-data-table :headers="headersNotif" :items="notifikasi" :loading="loading" rounded="lg">
            <template #item.is_read="{ item }">
              <v-chip :color="item.is_read ? 'green' : 'orange'" size="small" variant="tonal">
                {{ item.is_read ? 'Dibaca' : 'Belum' }}
              </v-chip>
            </template>
            <template #item.created_at="{ item }">
              {{ formatDateTime(item.created_at) }}
            </template>
          </v-data-table>
        </div>

      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/services/api'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { formatTanggal, formatJam, formatDateTime } from '@/utils/helpers'

const tab        = ref('pengajuan')
const loading    = ref(false)
const pengajuan  = ref([])
const slots      = ref([])
const notifikasi = ref([])

const headersPengajuan = [
  { title: 'Mahasiswa', key: 'nama_mahasiswa' },
  { title: 'NIM',       key: 'nim' },
  { title: 'Dosen',     key: 'nama_dosen' },
  { title: 'Topik',     key: 'topik' },
  { title: 'Jadwal',    key: 'tanggal' },
  { title: 'Status',    key: 'status' },
]

const headersSlot = [
  { title: 'Dosen',      key: 'nama_dosen' },
  { title: 'Tanggal',    key: 'tanggal' },
  { title: 'Jam',        key: 'jam' },
  { title: 'Status',     key: 'status' },
]

const headersNotif = [
  { title: 'User',    key: 'nama_user' },
  { title: 'Role',    key: 'role' },
  { title: 'Judul',   key: 'judul' },
  { title: 'Status',  key: 'is_read' },
  { title: 'Waktu',   key: 'created_at' },
]

const fetchData = async () => {
  loading.value = true
  try {
    if (tab.value === 'pengajuan') {
      const res = await api.get('/pengajuan')
      pengajuan.value = res.data.data
    } else if (tab.value === 'slot') {
      const res = await api.get('/slot')
      slots.value = res.data.data
    } else {
      const res = await api.get('/notifikasi')
      notifikasi.value = res.data.data?.notifikasi || []
    }
  } finally { loading.value = false }
}

watch(tab, fetchData)
onMounted(fetchData)
</script>