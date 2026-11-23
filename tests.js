// tests.js：測試都寫在這個檔。一條測試呼叫一次 addCase，格式見 README.md。
// 每一條的名字開頭標它對應 rules.md 的第幾條規則。
//
// 寫法範例（這幾行是註解，不會執行）：
//
// addCase({
//   name: '規則 1：（這條測試在檢查什麼）',
//   today: '2026-11-23',
//   records: [ { log_date: '2026-11-23', minutes: 30 } ],
//   expect: { minutes: 30, count: 1 }
// });

// ---------- 規則 1：只算「今天減 6 天」到「今天」之間的紀錄，兩端都包含 ----------

addCase({
  name: '規則 1：今天和今天減 6 天這兩端都算（11-17 ～ 11-23）',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-17', minutes: 15 }
  ],
  expect: { minutes: 45, count: 2 }
});

addCase({
  name: '規則 1：今天減 7 天（11-16）就出範圍，不算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-16', minutes: 99 },
    { log_date: '2026-11-17', minutes: 10 }
  ],
  expect: { minutes: 10, count: 1 }
});

addCase({
  name: '規則 1：跨年也照樣往回數 7 天（2026-01-01 往回到 2025-12-26）',
  today: '2026-01-01',
  records: [
    { log_date: '2025-12-27', minutes: 5 },
    { log_date: '2025-12-25', minutes: 100 }
  ],
  expect: { minutes: 5, count: 1 }
});

// ---------- 規則 2：log_date 比今天還晚的紀錄不算 ----------

addCase({
  name: '規則 2：明天的紀錄（11-24）跳過',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-24', minutes: 50 },
    { log_date: '2026-11-23', minutes: 20 }
  ],
  expect: { minutes: 20, count: 1 }
});

// ---------- 規則 3：minutes 是 null、0 或整個欄位不見的，算筆數、分鐘以 0 計 ----------

addCase({
  name: '規則 3：minutes 是 null 算 1 筆、加 0 分',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20', minutes: null }
  ],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 3：minutes 是 0 算 1 筆、加 0 分',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20', minutes: 0 }
  ],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 3：整個 minutes 欄位不見也算 1 筆、加 0 分',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20' }
  ],
  expect: { minutes: 0, count: 1 }
});

// ---------- 規則 4：筆數＝符合範圍的條數，分鐘數＝這些紀錄的 minutes 相加 ----------

addCase({
  name: '規則 4：混合 null 和數字，筆數算 3、分鐘只加有數字的',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-21', minutes: null },
    { log_date: '2026-11-19', minutes: 5 }
  ],
  expect: { minutes: 35, count: 3 }
});

addCase({
  name: '規則 4：一筆紀錄都沒有時回 0 和 0',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});

// ---------- 規則 5：用不到的欄位（topic 等）一律忽略 ----------

addCase({
  name: '規則 5：紀錄帶 topic 等額外欄位，照常算、額外欄位不影響答案',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30, topic: '閱讀' },
    { log_date: '2026-11-22', minutes: 10, topic: '寫程式', id: 99 }
  ],
  expect: { minutes: 40, count: 2 }
});

// ---------- 不做什麼：不檢查日期格式，看不懂的日期當作不在範圍內 ----------

addCase({
  name: '不做什麼：log_date 是亂寫的，當作不在範圍內',
  today: '2026-11-23',
  records: [
    { log_date: '亂寫的日期', minutes: 70 },
    { log_date: '2026-11-23', minutes: 10 }
  ],
  expect: { minutes: 10, count: 1 }
});

// ---------- 不做什麼：不檢查分鐘數正負，負數照加 ----------

addCase({
  name: '不做什麼：minutes 是負數，照樣加進總和',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: -10 },
    { log_date: '2026-11-22', minutes: 25 }
  ],
  expect: { minutes: 15, count: 2 }
});

// ---------- 不做什麼：不管順序，也不合併重複的紀錄 ----------

addCase({
  name: '不做什麼：兩筆一模一樣的紀錄各算各的，不合併',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-23', minutes: 30 }
  ],
  expect: { minutes: 60, count: 2 }
});

addCase({
  name: '不做什麼：紀錄順序打亂，答案一樣',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-21', minutes: 10 },
    { log_date: '2026-11-23', minutes: 20 }
  ],
  expect: { minutes: 30, count: 2 }
});
