import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as slotService from '../services/slotService'

export const useSlotStore = defineStore('slot', () => {
  const list    = ref([])
  const loading = ref(false)
  const error   = ref(null)

  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await slotService.getAll()
      list.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat data'
    } finally {
      loading.value = false
    }
  }

  const create = async (data) => {
    const res = await slotService.create(data)
    await fetchAll()
    return res.data
  }

  const update = async (id, data) => {
    const res = await slotService.update(id, data)
    await fetchAll()
    return res.data
  }

  const remove = async (id) => {
    const res = await slotService.remove(id)
    await fetchAll()
    return res.data
  }

  return { list, loading, error, fetchAll, create, update, remove }
})