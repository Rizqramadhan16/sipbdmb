import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as mahasiswaService from '../services/mahasiswaService'

export const useMahasiswaStore = defineStore('mahasiswa', () => {
  const list    = ref([])
  const loading = ref(false)
  const error   = ref(null)

  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await mahasiswaService.getAll()
      list.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat data'
    } finally {
      loading.value = false
    }
  }

  const create = async (data) => {
    const res = await mahasiswaService.create(data)
    await fetchAll()
    return res.data
  }

  const update = async (id, data) => {
    const res = await mahasiswaService.update(id, data)
    await fetchAll()
    return res.data
  }

  const remove = async (id) => {
    const res = await mahasiswaService.remove(id)
    await fetchAll()
    return res.data
  }

  return { list, loading, error, fetchAll, create, update, remove }
})