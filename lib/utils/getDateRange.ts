export function getDateRange(period: "today" | "thisWeek" | "thisMonth") {
  const today = new Date();
  let start: Date, end: Date;

  switch (period) {
    case "today":
      start = new Date(today.setHours(0, 0, 0, 0));
      end = new Date(today.setHours(23, 59, 59, 999));
      break;

    case "thisWeek":
      const day = today.getDay(); // 0=Sun
      const diff = today.getDate() - day + (day === 0 ? -6 : 1);  
      start = new Date(today.setDate(diff));
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;

    case "thisMonth":
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
      break;
  }

  return { start, end };
}
