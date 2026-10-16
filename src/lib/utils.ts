export function cn(...classes: (string | number | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-emerald-100 text-emerald-800';
    case 'DRAFT':
      return 'bg-amber-100 text-amber-800';
    case 'NEW':
      return 'bg-blue-100 text-blue-800';
    case 'READ':
      return 'bg-purple-100 text-purple-800';
    case 'PROCESSED':
      return 'bg-orange-100 text-orange-800';
    case 'DONE':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

export function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PUBLISHED: 'Dipublikasi',
    DRAFT: 'Draf',
    NEW: 'Baru',
    READ: 'Dibaca',
    PROCESSED: 'Diproses',
    DONE: 'Selesai',
  };
  return labels[status] || status;
}
