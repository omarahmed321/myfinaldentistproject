export function paginate(data = [], page = 1, perPage = 5) {
  let total = data.length;
  let totalPages = Math.ceil(total / perPage) || 1;

  let start = (page - 1) * perPage;
  let end = start + perPage;

  let items = data.slice(start, end);

  return {
    items,
    totalPages,
    from: total > 0 ? start + 1 : 0,
    to: Math.min(end, total),
    total,
  };
}
