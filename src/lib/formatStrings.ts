export function formatPremio(medal: string) {
  switch (medal) {
    case 'g':
      return 'Medalla de oro 🥇'
    case 's':
      return 'Medalla de plata 🥈'
    case 'b':
      return 'Medalla de bronce🥉'
    case 'hm':
      return 'Mención de honor'
    default:
      return '-'
  }
}