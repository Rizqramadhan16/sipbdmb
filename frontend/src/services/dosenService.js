import api from './api'

export const getAll    = ()         => api.get('/dosen')
export const getById   = (id)       => api.get(`/dosen/${id}`)
export const create    = (data)     => api.post('/dosen', data)
export const update    = (id, data) => api.put(`/dosen/${id}`, data)
export const remove    = (id)       => api.delete(`/dosen/${id}`)