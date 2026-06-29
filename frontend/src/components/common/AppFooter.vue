<template>
  <v-footer app color="white" border="t" height="42">
    <span class="footer-text">
      © {{ year }} <strong>SIPBDMB</strong> — Teknik Informatika
    </span>
    <v-spacer />
    <span class="footer-text">v1.0.0</span>
  </v-footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer-text {
  font-size: 12px;
  color: #9e9e9e;
}
</style>