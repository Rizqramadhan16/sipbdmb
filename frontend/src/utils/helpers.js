export const formatTanggal = (tanggal) => {
  if (!tanggal) return '-'
  return new Date(tanggal).toLocaleDateString('id-ID', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  })
}

export const formatJam = (jam) => {
  if (!jam) return '-'
  return jam.substring(0, 5)
}

export const formatDateTime = (datetime) => {
  if (!datetime) return '-'
  return new Date(datetime).toLocaleString('id-ID', {
    day:    'numeric',
    month:  'long',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

export const getStatusColor = (status) => {
  const colors = {
    pending:         'orange',
    disetujui:       'green',
    ditolak:         'red',
    selesai:         'blue',
    tersedia:        'green',
    tidak_tersedia:  'red',
    aktif:           'green',
    nonaktif:        'red',
  }
  return colors[status] || 'grey'
}

export const getRoleLabel = (role) => {
  const labels = {
    admin:     'Admin',
    dosen:     'Dosen',
    mahasiswa: 'Mahasiswa',
  }
  return labels[role] || role
}