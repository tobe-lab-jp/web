/* ============================================================
   イベント情報（トップの「イベント」欄 と 活動記録ページ の両方に反映されます）

   1件のかたち（使う項目だけでOK）:
   {
     id:      "switzerland-2026",     // ページ内リンク用の名前（英数字とハイフン）
     tbd:     true,                   // 日程未定なら true。決まったら消して date を入れる
     sort:    "2026-11",              // 並び順のキー（日程未定のとき）
     date:    "2026-11-21",           // 開催日（YYYY-MM-DD）
     time:    "10:00–18:00",          // 時間（任意）
     season:  { ja:"…", en:"…" },     // 日程未定のときの目安表示
     place:   { ja:"スイス", en:"Switzerland" },      // 国・都市
     venue:   { ja:"○○大学 △△ホール", en:"…" },       // 会場名（任意）
     venueUrl:"https://maps.google.com/…",            // 地図リンク（任意）
     title:   { ja:"…", en:"…" },
     desc:    { ja:"…", en:"…" },
     capacity:{ ja:"70名規模", en:"~70 attendees" },   // 任意
     program: [ { time:"10:00", title:{ja:"…",en:"…"}, speaker:{ja:"…",en:"…"} } ],  // 任意
     photos:  [ { src:"assets/images/events/swiss-01.jpg", caption:{ja:"…",en:"…"} } ], // 写真（任意）
     link:    "", linkLabel: { ja:"…", en:"…" }        // 申込URL（空なら非表示）
   }

   ※ 日付が今日以降 →「開催予定」、過去 → 自動で「これまでのイベント」へ。
   ※ 文中に半角のダブルクオート " は使わないでください（「」を推奨）。
   ============================================================ */
const EVENTS = [
  {
    id: "switzerland-2026", type: "symposium",
    tbd: true, sort: "2027-02",
    season: { ja: "2027年 2〜3月ごろ", en: "Around Feb–Mar 2027" },
    place:  { ja: "スイス", en: "Switzerland" },
    venue:  { ja: "会場調整中", en: "Venue TBA" },
    venueUrl: "",
    title:  { ja: "第1回 トビタテ！シンポジウム", en: "The 1st Tobitate! Symposium" },
    desc:   { ja: "派遣留学生による口頭＋ポスター発表と、書道・折り紙などの文化体験ワークショップ。日本に興味のある現地の方（主に大学生）との交流会も。", en: "Oral and poster presentations by exchange students, plus cultural workshops such as calligraphy and origami, with a reception for locals interested in Japan (mainly university students)." },
    capacity: { ja: "70名規模", en: "~70 attendees" },
    program: [],
    photos: [],
    link: "", linkLabel: { ja: "詳細はお問い合わせを", en: "Contact us for details" }
  },
  {
    id: "germany-2027", type: "symposium",
    tbd: true, sort: "2027-05",
    season: { ja: "2027年 春（5〜6月ごろ）", en: "Spring 2027 (around May–Jun)" },
    place:  { ja: "ドイツ", en: "Germany" },
    venue:  { ja: "会場調整中", en: "Venue TBA" },
    venueUrl: "",
    title:  { ja: "第2回 トビタテ！シンポジウム", en: "The 2nd Tobitate! Symposium" },
    desc:   { ja: "各回で内容を変えて開催する第2回。テーマと登壇者は準備が整い次第お知らせします。", en: "The second edition, with fresh content each time. Themes and speakers will be announced as plans are confirmed." },
    capacity: { ja: "70名規模", en: "~70 attendees" },
    program: [],
    photos: [],
    link: "", linkLabel: { ja: "詳細はお問い合わせを", en: "Contact us for details" }
  }
];

/* ============================================================
   締切・予定（カレンダーに「Deadline」として並びます）
   日程が決まったら tbd: true を消し、date: "YYYY-MM-DD" を入れてください。
   sort は日程未定のときの並び順の目安（実際の日付ではありません）。
   type は "deadline"（締切）または "workshop"（ワークショップ関連）。
   ============================================================ */
const DEADLINES = [
  {
    id: "dl-open", type: "deadline", tbd: true, sort: "2026-09",
    title: { ja: "応募受付の開始", en: "Call opens" },
    place: { ja: "オンライン", en: "Online" },
    desc:  { ja: "発表・ワークショップの募集を開始し、応募フォームを公開します。", en: "The application forms for presentations and workshops will open." },
    related: "switzerland-2026"
  },
  {
    id: "dl-submit", type: "deadline", tbd: true, sort: "2026-10",
    title: { ja: "応募締切（発表・ワークショップ）", en: "Submission deadline (presentations & workshops)" },
    place: { ja: "オンライン", en: "Online" },
    desc:  { ja: "第1回（スイス開催）の発表・ワークショップの応募締切です。", en: "Deadline for presentations and workshops at the 1st edition (Switzerland)." },
    related: "switzerland-2026"
  }
];
