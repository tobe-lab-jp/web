/* ============================================================
   お知らせ（トップの「Latest News」と news.html に反映されます）
   1件のかたち:
   {
     id:   "n-2026-09-20",
     date: "2026-09-20",                     // YYYY-MM-DD
     tag:  "call",                           // call=募集 / event=開催 / report=報告 / notice=お知らせ
     title:   { ja:"…", en:"…" },
     summary: { ja:"…", en:"…" },            // 任意
     link: "events.html#dates"               // 任意（詳細ページ・URL）
   }
   ※ 新しいものを上に足していくだけでOK（日付順に自動で並びます）。
   ※ 下の2件は、現在の公開情報にあわせた例です。自由に書き換えてください。
   ============================================================ */
const NEWS_TAGS = {
  call:   { ja: "募集",     en: "Call" },
  event:  { ja: "開催",     en: "Event" },
  report: { ja: "報告",     en: "Report" },
  notice: { ja: "お知らせ", en: "Notice" }
};

const NEWS = [
  {
    id: "n-call-2026", date: "2026-09-20", tag: "call",
    title:   { ja: "発表者・ワークショップ担当者の募集を近日開始します", en: "Calls for presenters and workshop leaders will open soon" },
    summary: { ja: "日本の文化や研究を発信したい派遣留学生のみなさん、書道・折り紙などの文化体験を届けたい方へ。募集の詳細と応募フォームは、準備ができ次第こちらでお知らせします。", en: "For exchange students who want to share Japanese culture and research, and for those who would like to lead cultural workshops: details and the application forms will be announced here once they are ready." },
    link: "events.html#dates"
  },
  {
    id: "n-swiss-2026", date: "2026-09-20", tag: "event",
    title:   { ja: "第1回 トビタテ！シンポジウム（スイス）の準備を進めています", en: "Preparing the 1st Tobitate! Symposium in Switzerland" },
    summary: { ja: "2027年2〜3月ごろにスイスで開催を予定しています。日程と会場が決まり次第お知らせします。", en: "Planned for around Feb–Mar 2027 in Switzerland. Date and venue will be announced once confirmed." },
    link: "activities.html#switzerland-2026"
  }
];
