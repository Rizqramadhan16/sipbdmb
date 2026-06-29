import api from './api'

export const getAll    = ()       => api.get('/mahasiswa')
export const getById   = (id)     => api.get(`/mahasiswa/${id}`)
export const create    = (data)   => api.post('/mahasiswa', data)
export const update    = (id, data) => api.put(`/mahasiswa/${id}`, data)
export const remove    = (id)     => api.delete(`/mahasiswa/${id}`)