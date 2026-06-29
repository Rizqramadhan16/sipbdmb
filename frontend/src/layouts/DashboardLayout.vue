<template>
  <v-app>
    <AppSidebar :drawer="drawer" @update:drawer="drawer = $event" />
    <AppTopbar @toggle-drawer="drawer = !drawer" />
    <v-main class="main-bg">
      <v-container fluid class="pa-5">
        <router-view />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from '@/components/common/AppSidebar.vue'
import AppTopbar  from '@/components/common/AppTopbar.vue'
import AppFooter  from '@/components/common/AppFooter.vue'

const drawer = ref(true)
</script>

<style scoped>
.main-bg {
  background-color: #F0F4F8 !important;
}
</style>