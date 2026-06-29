import api from './api'

export const getAll    = ()         => api.get('/slot')
export const create    = (data)     => api.post('/slot', data)
export const update    = (id, data) => api.put(`/slot/${id}`, data)
export const remove    = (id)       => api.delete(`/slot/${id}`)