<template>
  <v-card class="stat-card" :class="`stat-card--${color}`">
    <v-card-text class="pa-5">
      <div class="d-flex align-center justify-space-between">
        <div>
          <p class="stat-label">{{ title }}</p>
          <p class="stat-value">{{ value }}</p>
          <p v-if="subtitle" class="stat-subtitle">{{ subtitle }}</p>
        </div>
        <div class="stat-icon" :class="`stat-icon--${color}`">
          <v-icon :icon="icon" size="24" :color="color === 'orange' ? 'orange-darken-2' : color" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title:    { type: String, required: true },
  value:    { type: [String, Number], default: 0 },
  subtitle: { type: String, default: '' },
  icon:     { type: String, default: 'mdi-chart-bar' },
  color:    { type: String, default: 'blue' },
})
</script>

<style scoped>
.stat-card { border: 1px solid #E3EAF3; }

.stat-card--blue   { border-left: 4px solid #1565C0 !important; }
.stat-card--green  { border-left: 4px solid #2E7D32 !important; }
.stat-card--orange { border-left: 4px solid #E65100 !important; }
.stat-card--purple { border-left: 4px solid #6A1B9A !important; }
.stat-card--red    { border-left: 4px solid #C62828 !important; }

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #9e9e9e;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
}
.stat-subtitle {
  font-size: 11px;
  color: #9e9e9e;
  margin-top: 4px;
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-icon--blue   { background: #E3F2FD; }
.stat-icon--green  { background: #E8F5E9; }
.stat-icon--orange { background: #FFF3E0; }
.stat-icon--purple { background: #F3E5F5; }
.stat-icon--red    { background: #FFEBEE; }
</style>