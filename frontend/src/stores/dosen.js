import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as dosenService from '../services/dosenService'

export const useDosenStore = defineStore('dosen', () => {
  const list    = ref([])
  const loading = ref(false)
  const error   = ref(null)

  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await dosenService.getAll()
      list.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat data'
    } finally {
      loading.value = false
    }
  }

  const create = async (data) => {
    const res = await dosenService.create(data)
    await fetchAll()
    return res.data
  }

  const update = async (id, data) => {
    const res = await dosenService.update(id, data)
    await fetchAll()
    return res.data
  }

  const remove = async (id) => {
    const res = await dosenService.remove(id)
    await fetchAll()
    return res.data
  }

  return { list, loading, error, fetchAll, create, update, remove }
})