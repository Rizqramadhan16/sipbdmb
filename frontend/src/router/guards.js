import { useAuthStore } from '../stores/auth'

export const setupGuards = (router) => {
  router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    // Halaman guest (login) — sudah login redirect ke dashboard
    if (to.meta.guest && auth.isLoggedIn) {
      return next(`/${auth.role}/dashboard`)
    }

    // Halaman butuh auth — belum login redirect ke login
    if (to.meta.auth && !auth.isLoggedIn) {
      return next('/login')
    }

    // Cek role — role tidak sesuai redirect ke dashboard sendiri
    if (to.meta.role && auth.isLoggedIn && to.meta.role !== auth.role) {
      return next(`/${auth.role}/dashboard`)
    }

    next()
  })
}