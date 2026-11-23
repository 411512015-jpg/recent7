// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。
// 只給 AI 的一句話：算最近 7 天學了幾分鐘、記了幾筆。

function recent7(records, today) {
  // 「最近 7 天」自己猜成：今天往前算 7 天、含今天。
  var p = today.split('-');
  var d = new Date(Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2])));
  d.setUTCDate(d.getUTCDate() - 6);
  var start = d.toISOString().slice(0, 10);

  var minutes = 0;
  var count = 0;
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    if (r.log_date >= start && r.log_date <= today) {
      count += 1;
      if (typeof r.minutes === 'number') minutes += r.minutes;
    }
  }
  return { minutes: minutes, count: count };
}
