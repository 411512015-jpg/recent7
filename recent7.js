// recent7.js：照 rules.md 的規則寫的版本。
// 函式名稱叫 recent7，輸入、輸出的格式見 README.md。

function recent7(records, today) {
  // 規則 1：範圍是「今天減 6 天」到「今天」，兩端都包含。
  var p = today.split('-');
  var d = new Date(Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2])));
  d.setUTCDate(d.getUTCDate() - 6);
  var start = d.toISOString().slice(0, 10);

  var minutes = 0;
  var count = 0;

  for (var i = 0; i < records.length; i++) {
    var r = records[i];

    // 規則 1：範圍外的不算。
    // 規則 2：比今天還晚的不算（寫成 r.log_date <= today 就一起擋掉）。
    // 不做什麼：日期看不懂的，字串比大小自然會落在範圍外，當作不算。
    if (!(r.log_date >= start && r.log_date <= today)) continue;

    // 規則 4：符合範圍就數一筆。
    count += 1;

    // 規則 3：minutes 是 null、0 或整個欄位不見，都以 0 計。
    // 不做什麼：不檢查正負，負數照加。
    if (typeof r.minutes === 'number') minutes += r.minutes;

    // 規則 5：用不到的欄位（topic、id 等）一律忽略，這裡不讀它們。
  }

  // 規則 4：回傳的 minutes 是加總，count 是筆數。
  return { minutes: minutes, count: count };
}
