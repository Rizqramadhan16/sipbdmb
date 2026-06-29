import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as notifikasiService from '../services/notifikasiService'

export const useNotifikasiStore = defineStore('notifikasi', () => {
  const list    = ref([])
  const unread  = ref(0)
  const loading = ref(false)

  const fetchAll = async () => {
    loading.value = true
    try {
      const res  = await notifikasiService.getAll()
      list.value   = res.data.data.notifikasi
      unread.value = res.data.data.unread
    } catch {}
    finally { loading.value = false }
  }

  const markRead = async (id) => {
    await notifikasiService.markRead(id)
    await fetchAll()
  }

  const markAllRead = async () => {
    await notifikasiService.markAllRead()
    await fetchAll()
  }

  return { list, unread, loading, fetchAll, markRead, markAllRead }
})