import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authService from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user  = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isLoggedIn  = computed(() => !!token.value)
  const role        = computed(() => user.value?.role || null)
  const isAdmin     = computed(() => role.value === 'admin')
  const isDosen     = computed(() => role.value === 'dosen')
  const isMahasiswa = computed(() => role.value === 'mahasiswa')

  const login = async (credentials) => {
    const res = await authService.login(credentials)
    token.value = res.data.data.token
    user.value  = res.data.data.user
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
    return res.data.data
  }

  const logout = async () => {
    try { await authService.logout() } catch {}
    token.value = null
    user.value  = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    token, user,
    isLoggedIn, role,
    isAdmin, isDosen, isMahasiswa,
    login, logout,
  }
})