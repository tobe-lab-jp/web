/* ============================================================
   運営メンバー
   1人ぶんを { ... } でひとまとまりにして、上から順に並びます。
   ・core: true  … コアメンバー（中心メンバー）。false にすると「メンバー」の欄に移ります。
   ・role / field / country / inst は { ja:"日本語", en:"English" } の形（空 "" は「—」表示）
   ・photo … assets/images/members/ に入れた写真のパス
   ・contact … アイコンを押すと飛ぶリンク先（空 "" のものは薄いアイコンのまま）
       instagram: "https://www.instagram.com/…"
       facebook:  "https://www.facebook.com/…"
       linkedin:  "https://www.linkedin.com/in/…"
       email:     "name@example.com"   （メールアドレスだけでOK）
       web:       "https://…"          （個人サイトなど。入れたときだけ表示）
   ============================================================ */
const MEMBER_GROUPS = {
  core:  { ja: "コアメンバー", en: "Core members" },
  other: { ja: "メンバー",     en: "Members" }
};

const MEMBERS = [
  {
    core: true,
    name: { ja: "三河 優", en: "Yu Mikawa" },
    role:    { ja: "代表（全体統括）", en: "Representative & Coordinator" },
    field:   { ja: "ロボティクス（鳥型ロボットなど）", en: "Robotics (bird-inspired robots)" },
    country: { ja: "スイス", en: "Switzerland" },
    inst:    { ja: "EPFL", en: "EPFL" },
    photo: "assets/images/members/mikawa.jpg",
    contact: { instagram: "https://www.instagram.com/yu.mikawa/", facebook: "https://www.facebook.com/profile.php?id=61591803997784", linkedin: "https://www.linkedin.com/in/yu-mikawa/", email: "yu-mikawa@g.ecc.u-tokyo.ac.jp", web: "" }
  },
  {
    core: true,
    name: { ja: "丹羽 彩月", en: "Satsuki Niwa" },
    role: { ja: "財務", en: "Finance" }, field: { ja: "", en: "" },
    country: { ja: "ドイツ", en: "Germany" }, inst: { ja: "", en: "" },
    photo: "assets/images/members/niwa.jpg",
    contact: { instagram: "https://www.instagram.com/satsu_ki_bow/", facebook: "", linkedin: "", email: "", web: "" }
  },
  {
    core: true,
    name: { ja: "岩橋 治子", en: "Haruko Iwahashi" },
    role: { ja: "広報", en: "Public Relations" }, field: { ja: "", en: "" },
    country: { ja: "ドイツ", en: "Germany" }, inst: { ja: "ミュンヘン工科大学", en: "Technical University of Munich" },
    photo: "assets/images/members/iwahashi.jpg",
    contact: { instagram: "https://www.instagram.com/haruko.iw/", facebook: "", linkedin: "", email: "", web: "" }
  },
  {
    core: true,
    name: { ja: "杉元 優介", en: "Yusuke Sugimoto" },
    role: { ja: "渉外（協賛・提携）", en: "External Relations" }, field: { ja: "", en: "" },
    country: { ja: "ドイツ", en: "Germany" }, inst: { ja: "", en: "" },
    photo: "assets/images/members/sugimoto.jpg",
    contact: { instagram: "https://www.instagram.com/yusuke.70/", facebook: "https://www.facebook.com/yusuke.70", linkedin: "https://www.linkedin.com/in/yusuke70", email: "japankksy99@gmail.com", web: "" }
  },
  {
    core: true,
    name: { ja: "尾崎 倫斗", en: "Rinto Ozaki" },
    role: { ja: "", en: "" }, field: { ja: "", en: "" },
    country: { ja: "イタリア", en: "Italy" }, inst: { ja: "", en: "" },
    photo: "",
    contact: { instagram: "", facebook: "", linkedin: "", email: "", web: "" }
  },
  {
    core: true,
    name: { ja: "河瀬 なつみ", en: "Natsumi Kawase" },
    role: { ja: "", en: "" }, field: { ja: "", en: "" },
    country: { ja: "イタリア", en: "Italy" }, inst: { ja: "", en: "" },
    photo: "",
    contact: { instagram: "https://www.instagram.com/14harinezumi/", facebook: "", linkedin: "", email: "", web: "" }
  }
];
