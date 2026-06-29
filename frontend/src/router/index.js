import { createRouter, createWebHistory } from 'vue-router'
import { setupGuards } from './guards'

const routes = [
  // Auth
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { guest: true },
  },

  // Admin
  {
    path: '/admin',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { auth: true, role: 'admin' },
    children: [
      { path: '',          redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: () => import('../views/admin/DashboardView.vue') },
      { path: 'mahasiswa', name: 'AdminMahasiswa', component: () => import('../views/admin/MahasiswaView.vue') },
      { path: 'dosen',     name: 'AdminDosen',     component: () => import('../views/admin/DosenView.vue') },
      { path: 'monitoring',name: 'AdminMonitoring',component: () => import('../views/admin/MonitoringView.vue') },
      { path: 'user',      name: 'AdminUser',      component: () => import('../views/admin/UserView.vue') },
      { path: 'notifikasi',name: 'AdminNotifikasi',component: () => import('../views/shared/NotifikasiView.vue') },
    ],
  },

  // Dosen
  {
    path: '/dosen',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { auth: true, role: 'dosen' },
    children: [
      { path: '',          redirect: '/dosen/dashboard' },
      { path: 'dashboard', name: 'DosenDashboard', component: () => import('../views/dosen/DashboardView.vue') },
      { path: 'slot',      name: 'DosenSlot',      component: () => import('../views/dosen/SlotView.vue') },
      { path: 'pengajuan', name: 'DosenPengajuan', component: () => import('../views/dosen/PengajuanView.vue') },
      { path: 'riwayat',   name: 'DosenRiwayat',   component: () => import('../views/dosen/RiwayatView.vue') },
      { path: 'notifikasi',name: 'DosenNotifikasi',component: () => import('../views/shared/NotifikasiView.vue') },
    ],
  },

  // Mahasiswa
  {
    path: '/mahasiswa',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { auth: true, role: 'mahasiswa' },
    children: [
      { path: '',          redirect: '/mahasiswa/dashboard' },
      { path: 'dashboard', name: 'MahasiswaDashboard', component: () => import('../views/mahasiswa/DashboardView.vue') },
      { path: 'pengajuan', name: 'MahasiswaPengajuan', component: () => import('../views/mahasiswa/PengajuanView.vue') },
      { path: 'riwayat',   name: 'MahasiswaRiwayat',   component: () => import('../views/mahasiswa/RiwayatView.vue') },
      { path: 'profil',    name: 'MahasiswaProfil',    component: () => import('../views/mahasiswa/ProfilView.vue') },
      { path: 'notifikasi',name: 'MahasiswaNotifikasi',component: () => import('../views/shared/NotifikasiView.vue') },
    ],
  },

  // Redirect root
  { path: '/', redirect: '/login' },

  // 404
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

setupGuards(router)

export default router