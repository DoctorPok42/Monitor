export default function FormatDate(date: string) {
  const formatDate = new Date(date.split("/").reverse().join("-"));

  formatDate.setDate(formatDate.getDate() + 1);

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(formatDate));
}
