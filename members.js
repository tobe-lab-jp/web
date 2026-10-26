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
  core:  { ja: "コア", en: "Core" },
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
    role: { ja: "財務", en: "Finance" }, field: { ja: "情報学", en: "Informatics" },
    country: { ja: "ドイツ", en: "Germany" }, inst: { ja: "", en: "" },
    photo: "assets/images/members/niwa.jpg",
    contact: { instagram: "https://www.instagram.com/satsu_ki_bow/", facebook: "", linkedin: "", email: "niwa.satsuki@icloud.com", web: "" }
  },
  {
    core: true,
    name: { ja: "岩橋 治子", en: "Haruko Iwahashi" },
    role: { ja: "広報", en: "Public Relations" }, field: { ja: "環境教育・化学", en: "Environmental Education & Chemistry" },
    country: { ja: "ドイツ", en: "Germany" }, inst: { ja: "ミュンヘン工科大学", en: "Technical University of Munich" },
    photo: "assets/images/members/iwahashi.jpg",
    contact: { instagram: "https://www.instagram.com/haruko.iw/", facebook: "", linkedin: "", email: "", web: "" }
  },
  {
    core: true,
    name: { ja: "杉元 優介", en: "Yusuke Sugimoto" },
    role: { ja: "渉外（協賛・提携）", en: "External Relations" }, field: { ja: "建設ロボット", en: "Construction robotics" },
    country: { ja: "ドイツ", en: "Germany" }, inst: { ja: "シュトゥットガルト大学 ISYS", en: "University of Stuttgart, ISYS" },
    photo: "assets/images/members/sugimoto.jpg",
    contact: { instagram: "https://www.instagram.com/yusuke.70/", facebook: "https://www.facebook.com/yusuke.70", linkedin: "https://www.linkedin.com/in/yusuke70", email: "japankksy99@gmail.com", web: "" }
  },
  {
    core: true,
    name: { ja: "三浦 凜々香", en: "Ririka Miura" },
    role: { ja: "", en: "" },
    field: { ja: "地域福祉、美容福祉", en: "Community welfare, beauty welfare" },
    country: { ja: "ドイツ", en: "Germany" },
    inst: { ja: "オーム大学", en: "Technische Hochschule Nürnberg Georg Simon Ohm" },
    photo: "assets/images/members/miura.jpg",
    contact: { instagram: "https://www.instagram.com/nail.ganbaru/", facebook: "", linkedin: "", email: "", web: "" }
  },
   {
    core: true,
    name: { ja: "新井 隆永", en: "Takahisa Arai" },
    role: { ja: "渉外（協賛・提携）", en: "External Relations" }, 
    field: { ja: "電気電子工学", en: "Electrical & Electronic Engineering" },
    country: { ja: "", en: "" },
    inst: { ja: "", en: "" },
    photo: "assets/images/members/arai.jpg",
    contact: { instagram: "https://www.instagram.com/arai_4263", facebook: "", linkedin: "", email: "r06e02@suzuka.kosen-ac.jp", web: "https://arai4263.github.io/" }
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
  },
    {
    core: false,
    name: { ja: "中平 広美", en: "Hiromi Nakadaira" },
    role: { ja: "総務", en: "General Affairs" }, field: { ja: "心理学", en: "Psychology" },
    country: { ja: "ドイツ", en: "Germany" }, inst: { ja: "ライプツィヒ大学", en: "Leipzig University" },
    photo: "assets/images/members/Nakadaira.jpg",
    contact: { instagram: "https://www.instagram.com/hirominakadaira_0928?srtk=MTQwMDQyYmdyM2NkOA==", facebook: "https://www.facebook.com/share/198Ad8H8fo/", linkedin: "https://www.linkedin.com/in/hiromi-n-857935392?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "hiromunomonnta2@gmail.com", web: "" }
  },
    {
    core: false,
    name: { ja: "築地 夏海", en: "Natsumi Tsukiji" },
    role: { ja: "サポート", en: "Support" }, field: { ja: "動物学", en: "zoology" },
    country: { ja: "タイ", en: "Thailand" }, inst: { ja: "", en: "" },
    photo: "assets/images/members/Tsukiji.JPG",
    contact: { instagram: "", facebook: "", linkedin: "", email: "", web: "https://researchmap.jp/tsukijinatsumi" }
  },
    {
    core: false,
    name: { ja: "佐藤 愛美", en: "Ami Sato" },
    role: { ja: "", en: "" }, field: { ja: "宇宙工学", en: "Space Engineering" },
    country: { ja: "チェコ共和国", en: "Czech Republic" }, inst: { ja: "ブルノ工科大学", en: "Brno University of Technology" },
    photo: "",
    contact: { instagram: "https://www.instagram.com/amiinbrno?psln=a2J1bTIzODU2dGZv&utm_source=qr", facebook: "", linkedin: "", email: "", web: "" }
  }
];
