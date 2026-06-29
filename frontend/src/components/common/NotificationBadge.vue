<template>
  <v-badge
    :content="count"
    :model-value="count > 0"
    color="error"
  >
    <v-icon>mdi-bell</v-icon>
  </v-badge>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 0 }
})
</script>