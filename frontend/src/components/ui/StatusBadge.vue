<template>
  <v-chip
    :color="getStatusColor(status)"
    size="small"
    variant="tonal"
  >
    {{ status }}
  </v-chip>
</template>

<script setup>
import { getStatusColor } from '@/utils/helpers'

defineProps({
  status: { type: String, required: true }
})
</script>