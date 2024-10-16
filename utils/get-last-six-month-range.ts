import { format, subMonths } from "date-fns";

const getLastSixMonthsRange = () => {
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 5); // Mengurangi 5 bulan dari bulan sekarang, jadi akan mencakup 6 bulan

  // Format tanggal
  const startMonth = format(sixMonthsAgo, "MMMM"); // Bulan awal
  const endMonth = format(now, "MMMM"); // Bulan akhir
  const year = format(now, "yyyy"); // Tahun (asumsi sama, jika beda tahun, perlu penyesuaian)

  return `${startMonth} - ${endMonth} ${year}`;
};

export const lastSixMonthsRange = getLastSixMonthsRange();
