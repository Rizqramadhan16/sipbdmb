<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card rounded="lg">
      <v-card-title class="pa-4">
        <v-icon :color="color" class="mr-2">{{ icon }}</v-icon>
        {{ title }}
      </v-card-title>

      <v-card-text class="px-4 pb-2">
        {{ message }}
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="text" @click="cancel">Batal</v-btn>
        <v-btn :color="color" variant="flat" @click="confirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title:       { type: String, default: 'Konfirmasi' },
  message:     { type: String, default: 'Apakah Anda yakin?' },
  confirmText: { type: String, default: 'Ya, Lanjutkan' },
  color:       { type: String, default: 'error' },
  icon:        { type: String, default: 'mdi-alert-circle' },
})

const emit  = defineEmits(['confirm', 'cancel'])
const dialog = ref(false)

const open    = () => { dialog.value = true }
const confirm = () => { dialog.value = false; emit('confirm') }
const cancel  = () => { dialog.value = false; emit('cancel') }

defineExpose({ open })
</script>