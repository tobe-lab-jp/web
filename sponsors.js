/* ============================================================
   協賛・パートナー企業データ
   新しいスポンサーが増えたら、この配列(SPONSORS)にデータを追加するだけで
   自動的にトップページに反映されます。
   ============================================================ */
const SPONSORS = [
  // --- 協力 (Support) ---
  {
    id: "klas",
    tier: "support", // support = 協力 / sponsorship = 協賛
    name: { ja: "スイス公文学園高等部", en: "Kumon Leysin Academy of Switzerland" },
    role: { ja: "会場提供・協力", en: "Venue & Support" },
    url: "https://www.klas-ac.jp/",
    image: "assets/images/sponser/Switzerland.png"
  },
  {
    id: "zurich-japan",
    tier: "support",
    name: { ja: "Zürich Japan Society", en: "Zürich Japan Society" },
    role: { ja: "協力", en: "Support" },
    url: "https://www.instagram.com/zurich_japan_society/",
    image: "assets/images/sponser/Zurich_Japan.png"
  },
  // --- 協賛 (Sponsorship) ---
  {
    id: "ana",
    tier: "sponsorship",
    name: { ja: "ANA", en: "ANA" },
    role: { ja: "物品協賛", en: "In-kind Sponsorship" },
    url: "https://www.ana.co.jp/ja/jp/", 
    image: "assets/images/sponser/ana.jpg" 
  }
];

/* ============================================================
   HTMLへの自動描画処理
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const supportContainer = document.getElementById("sponsor-list-support");
  const sponsorshipContainer = document.getElementById("sponsor-list-sponsorship");

  if (!supportContainer || !sponsorshipContainer) return;

  let supportHTML = "";
  let sponsorshipHTML = "";

  SPONSORS.forEach(sponsor => {
    // 日英対応のテキスト（HTMLタグの改行を含む）
    const textJa = `${sponsor.role.ja}<br>${sponsor.name.ja}`;
    const textEn = `${sponsor.role.en}<br>${sponsor.name.en}`;

    const html = `
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <a href="${sponsor.url}" target="_blank" rel="noopener noreferrer" class="sponsor-logo" style="width: 100%; height: 160px; display: flex; justify-content: center; align-items: center; padding: 16px; box-sizing: border-box; text-decoration: none;">
          <img src="${sponsor.image}" alt="${sponsor.name.ja}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </a>
        <p style="text-align: center; margin-top: 12px; font-size: 0.9em; line-height: 1.5; width: 100%;" data-ja="${textJa}" data-en="${textEn}">
          ${textJa}
        </p>
      </div>
    `;

    if (sponsor.tier === "support") {
      supportHTML += html;
    } else if (sponsor.tier === "sponsorship") {
      sponsorshipHTML += html;
    }
  });

  // 画面の指定枠にHTMLを流し込む
  supportContainer.innerHTML = supportHTML;
  sponsorshipContainer.innerHTML = sponsorshipHTML;
});
