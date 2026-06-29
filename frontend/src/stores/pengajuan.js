import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as pengajuanService from '../services/pengajuanService'

export const usePengajuanStore = defineStore('pengajuan', () => {
  const list    = ref([])
  const loading = ref(false)
  const error   = ref(null)

  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await pengajuanService.getAll()
      list.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat data'
    } finally {
      loading.value = false
    }
  }

  const create = async (data) => {
    const res = await pengajuanService.create(data)
    await fetchAll()
    return res.data
  }

  const updateStatus = async (id, data) => {
    const res = await pengajuanService.updateStatus(id, data)
    await fetchAll()
    return res.data
  }

  const selesai = async (id) => {
    const res = await pengajuanService.selesai(id)
    await fetchAll()
    return res.data
  }

  return { list, loading, error, fetchAll, create, updateStatus, selesai }
})