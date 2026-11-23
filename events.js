/* ============================================================
   イベント情報（トップの「イベント」欄 と 活動記録ページ の両方に反映されます）

   type の種類:
     "symposium" = フェスティバル
     "online"    = オンライン交流会

   複数フォームを設定する場合:
     links: [
       { url: "https://...", label: { ja: "参加を申し込む", en: "Register" } },
       { url: "https://...", label: { ja: "登壇に応募する", en: "Apply" } }
     ]

   ※ 日付が今日以降 →「開催予定」、過去 → 自動で「これまでのイベント」へ。
   ※ 文中に半角のダブルクオート " は使わないでください（「」を推奨）。
   ============================================================ */
const EVENTS = [
  {
    id: "switzerland-2026", type: "symposium",
    sort: "2027-02",
    date: "2027-02-27",
    time: "10:00-15:30",
    place:  { ja: "スイス", en: "Switzerland" },
    venue:  { ja: "スイス公文高等学校 (KLAS)", en: "Kumon Leysin Academy of Switzerland (KLAS)" },
    venueUrl: "https://maps.app.goo.gl/wrHj8niuWkZbZ8gb9",
    title:  { ja: "第1回 とびらぼフェスティバル", en: "The 1st To be.Lab Festival" },
    desc:   { ja: "派遣留学生による最先端の研究や探究活動の発信。学生の美術展示やグラフィック作品を通じてのそれぞれの世界の表現。食文化やオリジナル企画を通じた、違いを楽しむ交流ラウンジ。日本に興味のある現地の方（主に大学生）との交流会も。", en: "Presentation of cutting-edge research and inquiry activities by exchange students. Expressing diverse worlds through students' art exhibitions and graphic works. A cross-cultural exchange lounge celebrating differences through food culture and original projects. Also featuring an exchange event with locals (mainly university students) interested in Japan." },
    capacity: { ja: "80名規模", en: "~80 attendees" },
    program: [],
    photos: [{ src:"assets/images/workshop.jpg", caption:{ja:"ワークショップのイメージ", en:"Concept image of the workshop"}},
            { src:"assets/images/art.jpg", caption:{ja:"アート展示のイメージ", en:"Art exhibition view"}}],
    links: [
      { url: "https://forms.gle/7872DcL3t4HiaU3a9", label: { ja: "参加を申し込む", en: "Register to attend" } },
      { url: "https://docs.google.com/forms/d/e/1FAIpQLScRMOkElalKmX-Q_XJAtxg5etq4BY5h0UNT8KvVvFKk2d-CEw/viewform?usp=header", label: { ja: "運営・登壇に応募する", en: "Apply to present / organize" } }
    ]
  },
  {
    id: "germany-2027", type: "symposium",
    tbd: true, sort: "2027-05",
    season: { ja: "2027年 春（5〜6月ごろ）", en: "Spring 2027 (around May–Jun)" },
    place:  { ja: "ドイツ", en: "Germany" },
    venue:  { ja: "会場調整中", en: "Venue TBA" },
    venueUrl: "",
    title:  { ja: "第2回 とびらぼフェスティバル", en: "The 2st To be.Lab Festival" },
    desc:   { ja: "各回で内容を変えて開催する第2回。テーマと登壇者は準備が整い次第お知らせします。", en: "The second edition, with fresh content each time. Themes and speakers will be announced as plans are confirmed." },
    capacity: { ja: "70名規模", en: "~70 attendees" },
    program: [],
    photos: [],
    links: []
  }
];

/* ============================================================
   締切・予定（カレンダーに「Deadline」として並びます）
   日程が決まったら tbd: true を消し、date: "YYYY-MM-DD" を入れてください。
   sort は日程未定のときの並び順の目安（実際の日付ではありません）。
   type は "deadline"（締切）にしてください。
   ============================================================ */
const DEADLINES = [
  {
    id: "dl-submit", type: "deadline", tbd: true, sort: "2026-10",
    title: { ja: "応募締切（発表・ワークショップ）", en: "Submission deadline (presentations & workshops)" },
    place: { ja: "オンライン", en: "Online" },
    desc:  { ja: "第1回（スイス開催）の発表・ワークショップの応募締切です。", en: "Deadline for presentations and workshops at the 1st edition (Switzerland)." },
    related: "switzerland-2026"
  }
];
