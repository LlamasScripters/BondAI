export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-100"
    case "in_progress":
      return "text-blue-600 bg-blue-100"
    case "review":
      return "text-orange-600 bg-orange-100"
    case "on_hold":
      return "text-gray-600 bg-gray-100"
    case "pending":
      return "text-yellow-600 bg-yellow-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "Terminé"
    case "in_progress":
      return "En cours"
    case "review":
      return "En révision"
    case "on_hold":
      return "En pause"
    case "pending":
      return "En attente"
    case "active":
      return "Actif"
    case "cancelled":
      return "Annulé"
    default:
      return status
  }
}
