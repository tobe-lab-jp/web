/* ============================================================
   サイト設定 — リンク先などはここだけ書き換えればOKです
   ============================================================ */
const SITE = {
  email: "tobe.lab.jp@gmail.com",
  instagram: "https://www.instagram.com/tobe__lab/",
  facebook: "https://www.facebook.com/TobeLab.jp/",

  // 運営メンバーの連絡先アイコン（Instagram / Facebook / LinkedIn / メール）で、未登録のものを薄く表示するか。
  // false = 登録済みのものだけ表示（おすすめ）／ true = 未登録も薄く表示。
  showEmptyContactIcons: false,

  // トップページのメンバーカードに連絡先アイコンを出すか（false でトップは名前・役職・所属だけになります）
  showContactOnHome: true,

  // 「スイス・ドイツの様子」の写真。ファイルを assets/images/gallery/ に置くと自動で入ります
  // （ファイルがない間は「Photo」の枠になります）。イベントの写真に替えるときは src を差し替えるだけです。
  gallery: [
    { src: "assets/images/gallery/swiss-1.jpg",   ja: "スイス・シヨン城", en: "Switzerland · Château de Chillon" },
    { src: "assets/images/gallery/swiss-2.jpg",   ja: "スイス・モントルー", en: "Switzerland · Montreux" },
    { src: "assets/images/gallery/swiss-3.jpg",   ja: "スイス・EPFL", en: "Switzerland · EPFL" },
    { src: "assets/images/gallery/germany-1.jpg", ja: "ドイツ",  en: "Germany" },
    { src: "assets/images/gallery/germany-2.jpg", ja: "ドイツ",  en: "Germany" },
    { src: "assets/images/gallery/germany-3.jpg", ja: "ドイツ",  en: "Germany" }
  ],

  // 活動記録ページ上部の写真一覧（assets/images/gallery/ の全写真）。ファイルがないものは自動で非表示。
  galleryAll: [
    { src: "assets/images/gallery/swiss-1.jpg", ja: "スイス・シヨン城", en: "Switzerland · Château de Chillon" },
    { src: "assets/images/gallery/swiss-2.jpg", ja: "スイス・モントルー", en: "Switzerland · Montreux" },
    { src: "assets/images/gallery/swiss-3.jpg", ja: "スイス・EPFL", en: "Switzerland · EPFL" },
    { src: "assets/images/gallery/swiss-4.jpg", ja: "スイス・ベルン", en: "Switzerland · Bern" },
    { src: "assets/images/gallery/swiss-5.jpg", ja: "スイス・レザン", en: "Switzerland · Leysin" },
    { src: "assets/images/gallery/swiss-6.jpg", ja: "スイス・EPFL（ロレックス・ラーニングセンター）", en: "Switzerland · EPFL Rolex Learning Center" },
    { src: "assets/images/gallery/swiss-7.jpg", ja: "スイス・ローザンヌ", en: "Switzerland · Lausanne" },
    { src: "assets/images/gallery/swiss-8.jpg", ja: "スイス・ローザンヌ（メトロ）", en: "Switzerland · Lausanne metro" },
    { src: "assets/images/gallery/swiss-9.jpg", ja: "スイス・ローザンヌ（オリンピック博物館）", en: "Switzerland · Lausanne, Olympic Museum" },
    { src: "assets/images/gallery/germany-1.jpg", ja: "ドイツ", en: "Germany" },
    { src: "assets/images/gallery/germany-2.jpg", ja: "ドイツ", en: "Germany" },
    { src: "assets/images/gallery/germany-3.jpg", ja: "ドイツ", en: "Germany" }
  ],

  forms: {
    // Google フォームの URL を、あとでここに貼ってください。
    // 空 "" のあいだは、ボタンが「応募フォームは近日公開」と表示されて押せません。
    presentation: "",   // 発表応募
    workshop: "",       // ワークショップ応募
    member: "https://forms.gle/2VKhx1NhK6z27J1R8"  // メンバー参加（コアメンバー以外）・構想中の企画のお手伝い
  }
};
