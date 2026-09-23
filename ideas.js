/* ============================================================
   構想中の企画（トップの「構想中の企画」と ideas.html に反映されます）
   やりたい企画はたくさんあるが、人手が足りていない ── 一緒に進めてくれる方を募集する、という位置づけです。

   1件のかたち（使う項目だけでOK）:
   {
     id:      "flat-talk",                 // ページ内リンク用の名前（英数字とハイフン）
     status:  "idea",                      // idea=構想中 / considering=検討中 / planning=準備中
     hidden:  false,                       // true にすると、サイトに出しません（下書き用）
     tag:     { ja:"交流", en:"Community" },
     title:   { ja:"…", en:"…" },
     summary: { ja:"…", en:"…" },          // トップに出る短い説明
     background: {…}, purpose: {…}, content: {…}, method: {…}, help: {…}   // ideas.html の詳細（任意）
   }
   ============================================================ */
const IDEAS = [
  {
    id: "insta-introduction",
    status: "idea",
    tag: { ja: "発信", en: "Outreach" },
    title:   { ja: "トビタテ生の留学紹介（Instagram）", en: "Introducing Tobitate students on Instagram" },
    summary: { ja: "トビタテ生（主に18期）の留学や日本での活動を、Instagram で紹介します。", en: "We introduce Tobitate students' study-abroad experiences and activities in Japan on Instagram." },
    purpose: { ja: "留学や活動を発信したいトビタテ生の、発信を後押しする。", en: "To support Tobitate students who want to share their experiences and activities." },
    content: { ja: "留学内容の紹介や、日本での活動の紹介など。", en: "Introductions to study-abroad experiences and activities in Japan." },
    method:  { ja: "テンプレートに記入してもらう、または、フォームに入力してもらった内容をもとに、運営で投稿を作成する形を考えています。", en: "Either participants fill in a template, or they submit a form and the team turns it into a post." },
    help:    { ja: "投稿の制作・デザイン、紹介したい方への連絡を一緒に進めてくれる方。", en: "People who can help with post creation, design, and reaching out to featured students." }
  },
  {
    id: "flat-talk",
    status: "idea",
    tag: { ja: "交流", en: "Community" },
    title:   { ja: "トビタテ生のふらっと話せる会", en: "A casual weekly chat for Tobitate students" },
    summary: { ja: "毎週決まった時間に、1時間ほど、雑談でも最近の困りごとでも話せる場をひらきます。", en: "A weekly one-hour online space to chat — about anything, from small talk to recent worries." },
    purpose: { ja: "トビタテ生（主に18期）が、気軽に話せる場所をつくる。", en: "To give Tobitate students (mainly the 18th cohort) a relaxed place to talk." },
    content: { ja: "雑談でも、最近困っていることの相談でも、話したいことを話す時間です。", en: "Talk about whatever you like — casual topics or things you are currently struggling with." },
    method:  { ja: "毎週の固定の時間に、Zoom などのオンラインで、1時間ほど開く形を考えています。", en: "Held online (e.g. Zoom) at a fixed time every week, for about an hour." },
    help:    { ja: "場を回す役を、交代で担ってくれる方。", en: "People who can take turns hosting the sessions." }
  },
  {
    id: "discord-space",
    status: "considering",
    tag: { ja: "交流", en: "Community" },
    title:   { ja: "オンラインの居場所（Discord）", en: "An online space on Discord" },
    summary: { ja: "ふらっと話したり、作業通話をしたりできる場所として、Discord の活用を検討しています。", en: "We are considering Discord as a place to chat casually or work together on a call." },
    purpose: { ja: "話したいときに、いつでも気軽に集まれる場所をつくる。", en: "To offer a place where people can drop in whenever they want to talk." },
    method:  { ja: "作業通話の部屋などをつくり、運営メンバーが交代で入る形を検討中です。公開の範囲や運営の方法は、これから決めていきます。", en: "We are thinking of work-call rooms with organizers joining in turns. How open it is and how it is run will be decided later." },
    help:    { ja: "運営のルールづくりや、部屋に入る当番を一緒にやってくれる方。", en: "People who can help set the rules and take turns joining the rooms." }
  },
  {
    id: "online-sharing",
    status: "idea",
    tag: { ja: "オンラインイベント", en: "Online event" },
    title:   { ja: "トビタテ生の活動を知るオンラインイベント", en: "An online event to learn about each Tobitate student's activities" },
    summary: { ja: "トビタテ生それぞれの活動を知り、横のつながりを深める、少し硬めのオンラインイベントです。", en: "A slightly more formal online event to learn about each other's activities and build connections." },
    background: { ja: "こんなにたくさんのトビタテ生がいるのに、お互いのことを意外と知らない、というコミュニティです。", en: "There are so many Tobitate students, yet surprisingly few know each other's work." },
    purpose:    { ja: "それぞれの活動を知り合うことで、横のつながりを深める。", en: "To deepen horizontal connections by getting to know each other's activities." },
    method:     { ja: "オンラインで、それぞれの活動内容を紹介し合う形を考えています。", en: "Held online, with participants introducing their own activities." },
    help:       { ja: "企画・司会・当日の運営を一緒に進めてくれる方、発表してくれる方。", en: "People who can help plan, host, and run the event, and those willing to present." }
  }
];
