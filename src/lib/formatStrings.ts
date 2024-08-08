export function formatPremio(medal: string) {
  switch (medal) {
    case 'ORO':
      return 'Medalla de oro 🥇'
    case 'PLATA':
      return 'Medalla de plata 🥈'
    case 'BRONCE':
      return 'Medalla de bronce🥉'
    case 'MENCION':
      return 'Mención de honor'
    default:
      return '-'
  }
}