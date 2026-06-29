import api from './api'

export const getAll      = ()    => api.get('/notifikasi')
export const markRead    = (id)  => api.put(`/notifikasi/${id}/read`)
export const markAllRead = ()    => api.put('/notifikasi/read-all')