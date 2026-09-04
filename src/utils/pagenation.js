// 
export function paginate(data = [], page = 1, perPage = 5) {
  let total = data.length;
  // بص عدد الصفحات المفروض كل صفحه فيها 5 فنقسم طول الاراء علي 5  ولو مطلعش موجود يبقي 1 عشان ميحصلش ايرور 
  let totalPages = Math.ceil(total / perPage) || 1;
// نقطه البدايه هنا بكل بساطه الطبيعي انك في الصفحه الاولي فانت عاوزها عشان تستعملها في سلايس وعاوز تجيب اول عناصر بس 
// فهيطلع معاك لاول تقسيمه slice(0,5)
  let start = (page - 1) * perPage;
  let end = start + perPage;

  let items = data.slice(start, end);

  return {
    items,
    totalPages,
    // بنشيك بس ان فيه اراي اصلا
    from: total > 0 ? start + 1 : 0,
    
    to: Math.min(end, total),
    total,
  };
}
