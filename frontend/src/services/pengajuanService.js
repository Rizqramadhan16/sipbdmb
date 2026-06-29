import api from './api'

export const getAll       = ()         => api.get('/pengajuan')
export const create       = (data)     => api.post('/pengajuan', data)
export const updateStatus = (id, data) => api.put(`/pengajuan/${id}`, data)
export const selesai      = (id)       => api.patch(`/pengajuan/${id}/selesai`)