/* ============================================================
   共通レイアウト（ヘッダー・メガメニュー・検索・フッター）
   メニューの項目を変えたいときは、下の NAV を書き換えるだけで全ページに反映されます。
   ============================================================ */
(function(){
  'use strict';
  const part = document.currentScript && document.currentScript.dataset.part;
  const page = document.body.dataset.page || '';
  const S = (typeof SITE !== 'undefined') ? SITE : { forms:{}, email:'' };

  const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
  const b = (ja, en) => `<span data-ja="${esc(ja)}" data-en="${esc(en)}">${ja}</span>`;

  const SPONSOR_MAIL = 'mailto:tobe.lab.jp@gmail.com?subject=%E5%8D%94%E8%B3%9B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%20%2F%20About%20sponsorship';

  /* ---------- メニュー定義 ----------
     link: [日本語, 英語, リンク先]   form: "presentation" のときは Google フォームへ */
  const NAV = [
    { ja:'私たちについて', en:'About', href:'index.html#about', key:'about',
      cols:[
        { h:['理念','Philosophy'], links:[
          ['To be. Lab の理念','Our philosophy','index.html#about'],
          ['4つの合言葉','Four keywords','index.html#values'] ]},
        { h:['人','People'], links:[
          ['運営メンバー','Organizing committee','members.html'],
          ['お問い合わせ','Contact','index.html#contact'] ]}
      ],
      feat:{ tag:['はじめに','Start here'], title:['海外で学ぶ留学生が集う、あたたかな場所','A warm place for students abroad'], text:['To be. Lab がめざすことを、まずこちらから。','Begin with what To be. Lab is about.'], href:'index.html#about', c:'y' } },
    { ja:'活動', en:'Activities', href:'index.html#research', key:'activities',
      cols:[
        { h:['発表・体験','Formats'], links:[
          ['口頭＋ポスター発表','Oral + poster presentations','index.html#poster'],
          ['ワークショップ','Workshops','index.html#workshop'] ]},
        { h:['記録','Archive'], links:[
          ['活動記録（すべて）','All records','activities.html'],
          ['スイス（第1回）','Switzerland (1st)','activities.html#switzerland-2026'],
          ['ドイツ（第2回）','Germany (2nd)','activities.html#germany-2027'] ]}
      ],
      feat:{ tag:['活動記録','Archive'], title:['開催ごとの日程・会場・写真','Dates, venues and photos'], text:['スイス・ドイツでの開催記録をまとめています。','Records of the Switzerland and Germany editions.'], href:'activities.html', c:'p' } },
    { ja:'イベント・お知らせ', en:'Events & News', href:'index.html#events', key:'events',
      cols:[
        { h:['イベント','Events'], links:[
          ['トビタテ！シンポジウム','Tobitate! Symposium','index.html#symposium'],
          ['開催予定・締切カレンダー','Events & deadlines','events.html'],
          ['構想中の企画','Ideas in the works','ideas.html'],
          ['Important Dates','Important Dates','events.html#dates'] ]},
        { h:['お知らせ','News'], links:[
          ['最新のお知らせ','Latest news','index.html#news'],
          ['お知らせ一覧','All news','news.html'] ]}
      ],
      feat:{ tag:['次回','Next'], title:['スイス ・ 2027年 2–3月ごろ','Switzerland · Feb–Mar 2027'], text:['日程・会場が決まり次第お知らせします。','Date and venue to be announced.'], href:'activities.html#switzerland-2026', c:'b' } },
    { ja:'参加する', en:'Get Involved', href:'index.html#get-involved', key:'involved',
      cols:[
        { h:['応募','Apply'], links:[
          ['発表に応募する','Apply to present','', 'presentation'],
          ['ワークショップに応募する','Apply to lead a workshop','', 'workshop'] ]},
        { h:['関わる','Join us'], links:[
          ['協賛・パートナーになる','Become a sponsor / partner','index.html#sponsors'],
          ['メンバーとして参加する','Join as a member','', 'member', 'members.html#join'],
          ['構想中の企画の仲間になる','Join our ideas','', 'member', 'ideas.html'] ]}
      ],
      feat:{ tag:['近日開始','Opening soon'], title:['Call for Presentations','Call for Presentations'], text:['日本の文化・研究を、留学先から発信しませんか。','Share Japanese culture and research from where you study.'], href:'index.html#get-involved', c:'g' } },
    { ja:'協賛', en:'Sponsors', href:'index.html#sponsors', key:'sponsors',
      cols:[
        { h:['協賛・パートナー','Sponsors & Partners'], links:[
          ['協賛・パートナー','Sponsors & Partners','index.html#sponsors'],
          ['協賛について問い合わせる','Ask about sponsorship', SPONSOR_MAIL] ]}
      ],
      feat:{ tag:['ご支援','Support us'], title:['志を共にする皆さまへ','For those who share our vision'], text:['企業・団体・個人のご協力を募集しています。','We welcome companies, organizations and individuals.'], href:'index.html#sponsors', c:'y' } }
  ];

  function linkHTML(l){
    const [ja,en,href,form,fb] = l;
    if (form) return `<a href="${esc(href || fb || 'index.html#get-involved')}" data-form-link="${form}" data-fallback-href="${esc(fb || 'index.html#get-involved')}">${b(ja,en)}</a>`;
    return `<a href="${esc(href)}">${b(ja,en)}</a>`;
  }

  function headerHTML(){
    const items = NAV.map(n => `
      <li class="mnav-item${page === n.key ? ' is-current' : ''}">
        <a class="mnav-link" href="${n.href}" aria-haspopup="true" aria-expanded="false">${b(n.ja,n.en)}<i class="caret" aria-hidden="true"></i></a>
        <div class="mega" role="region">
          <div class="mega-inner">
            <div class="mega-cols">${n.cols.map(c => `
              <div class="mega-col"><p class="mega-h">${b(c.h[0],c.h[1])}</p>${c.links.map(linkHTML).join('')}</div>`).join('')}
            </div>
            <a class="mega-feat mf-${n.feat.c}" href="${n.feat.href}">
              <span class="mf-tag">${b(n.feat.tag[0],n.feat.tag[1])}</span>
              <span class="mf-title">${b(n.feat.title[0],n.feat.title[1])}</span>
              <span class="mf-text">${b(n.feat.text[0],n.feat.text[1])}</span>
              <span class="mf-go" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </li>`).join('');

    return `
<div class="utility">
  <div class="utility-inner">
    <a class="utility-call" href="index.html#get-involved"><span class="ribbon-dot" aria-hidden="true"></span>${b('Call for Presentations ・ 近日募集開始 →','Call for Presentations · Opening soon →')}</a>
    <div class="utility-right">
      <a href="${esc(S.instagram)}" target="_blank" rel="noopener">Instagram</a>
      <a href="${esc(S.facebook)}" target="_blank" rel="noopener">Facebook</a>
      <a href="index.html#contact">${b('お問い合わせ','Contact')}</a>
      <button class="lang-toggle" id="langToggle" aria-label="Switch language / 言語切り替え">English</button>
    </div>
  </div>
</div>
<header class="site-header" id="top">
  <div class="header-inner">
    <a class="brand" href="index.html">
      <img class="brand-logo" src="assets/images/logo.png" alt="To be. Lab" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
      <span class="brand-wordmark" style="display:none;">To&nbsp;be.<span class="brand-lab"> Lab</span></span>
    </a>
    <nav class="mnav" id="mnav" aria-label="メインナビゲーション"><ul>${items}</ul></nav>
    <div class="header-tools">
      <button class="icon-btn" id="searchBtn" aria-label="Search / 検索"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button>
      <a class="btn btn-primary btn-sm header-cta" href="index.html#get-involved">${b('参加する','Get involved')}</a>
      <button class="nav-toggle" id="navToggle" aria-label="メニュー" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;
  }

  function footerHTML(){
    return `
<footer class="site-footer" id="contact">
  <div class="container footer-inner footer-4">
    <div class="footer-brand">
      <span class="brand-wordmark">To&nbsp;be.<span class="brand-lab"> Lab</span></span>
      <p class="footer-tagline">${b('海外で学ぶ派遣留学生が集う、あたたかな場所。ヨーロッパで、研究と文化をひらく。','A welcoming hub for Japanese students abroad, opening research and culture in Europe.')}</p>
    </div>
    <div class="footer-links">
      <p class="footer-h">Explore</p>
      <a href="index.html#about">${b('理念','Philosophy')}</a>
      <a href="index.html#research">${b('活動','Activities')}</a>
      <a href="activities.html">${b('活動記録','Archive')}</a>
      <a href="events.html">${b('イベント・締切','Events & deadlines')}</a>
      <a href="ideas.html">${b('構想中の企画','Ideas in the works')}</a>
      <a href="news.html">${b('お知らせ','News')}</a>
      <a href="members.html">${b('運営メンバー','Committee')}</a>
      <a href="index.html#sponsors">${b('協賛','Sponsors')}</a>
    </div>
    <div class="footer-links">
      <p class="footer-h">Get involved</p>
      <a href="index.html#get-involved" data-form-link="presentation" data-fallback-href="index.html#get-involved">${b('発表に応募する','Apply to present')}</a>
      <a href="index.html#get-involved" data-form-link="workshop" data-fallback-href="index.html#get-involved">${b('ワークショップに応募する','Apply to lead a workshop')}</a>
      <a href="members.html#join" data-form-link="member" data-fallback-href="members.html#join">${b('メンバーとして参加する','Join as a member')}</a>
      <a href="${SPONSOR_MAIL}">${b('協賛について','About sponsorship')}</a>
    </div>
    <div class="footer-links">
      <p class="footer-h">Contact</p>
      <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>
      <a href="${esc(S.instagram)}" target="_blank" rel="noopener">Instagram @tobe__lab</a>
      <a href="${esc(S.facebook)}" target="_blank" rel="noopener">Facebook TobeLab.jp</a>
    </div>
  </div>
  <div class="footer-base"><p>© <span id="year">2026</span> To be. Lab. All rights reserved.</p></div>
</footer>

<div class="search-overlay" id="searchOverlay" hidden>
  <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search">
    <button class="search-close" id="searchClose" aria-label="Close">×</button>
    <p class="search-title">${b('何をお探しですか？','What are you looking for?')}</p>
    <form class="search-form" id="searchForm" autocomplete="off">
      <input type="search" id="searchInput" placeholder="イベント・メンバー・お知らせを検索 / Search…" aria-label="Search">
    </form>
    <div id="searchResults" class="search-results"></div>
    <div class="search-quick" id="searchQuick">
      <div><p class="footer-h">${b('クイックリンク','Quick links')}</p>
        <a href="index.html#get-involved">${b('参加する','Get involved')}</a>
        <a href="events.html#dates">Important Dates</a>
        <a href="activities.html">${b('活動記録','Archive')}</a></div>
      <div><p class="footer-h">${b('よく見られているページ','Most viewed')}</p>
        <a href="index.html#about">${b('理念','Philosophy')}</a>
        <a href="events.html">${b('イベント・締切','Events & deadlines')}</a>
        <a href="members.html">${b('運営メンバー','Committee')}</a></div>
      <div><p class="footer-h">${b('注目','Featured')}</p>
        <a href="activities.html#switzerland-2026">${b('スイス開催（第1回）','Switzerland (1st)')}</a>
        <a href="news.html">${b('お知らせ一覧','All news')}</a>
        <a href="index.html#sponsors">${b('協賛・パートナー','Sponsors & Partners')}</a></div>
    </div>
  </div>
</div>`;
  }

  /* ============ ヘッダー部分 ============ */
  if (part === 'header'){
    document.currentScript.insertAdjacentHTML('beforebegin', headerHTML());

    const nav = document.getElementById('mnav');
    const items = Array.from(nav.querySelectorAll('.mnav-item'));
    const isDesktop = () => window.matchMedia('(min-width: 981px)').matches;
    let timer;
    function closeAll(except){
      items.forEach(i => { if (i !== except){ i.classList.remove('open'); const a = i.querySelector('.mnav-link'); if (a) a.setAttribute('aria-expanded','false'); } });
    }
    function open(i){ closeAll(i); i.classList.add('open'); i.querySelector('.mnav-link').setAttribute('aria-expanded','true'); }
    items.forEach(i => {
      const link = i.querySelector('.mnav-link');
      i.addEventListener('mouseenter', () => { if (!isDesktop()) return; clearTimeout(timer); open(i); });
      i.addEventListener('mouseleave', () => { if (!isDesktop()) return; timer = setTimeout(() => closeAll(), 140); });
      i.addEventListener('focusin', () => { if (isDesktop()) open(i); });
      link.addEventListener('click', e => {
        // 狭い画面では、1回目のタップで開き、もう一度で移動
        if (!isDesktop() && !i.classList.contains('open')){ e.preventDefault(); open(i); }
      });
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
    document.addEventListener('click', e => { if (!nav.contains(e.target)) closeAll(); });

    const toggle = document.getElementById('navToggle');
    toggle.addEventListener('click', () => {
      const o = nav.classList.toggle('open');
      toggle.classList.toggle('open', o);
      toggle.setAttribute('aria-expanded', o);
      document.body.classList.toggle('nav-open', o);
    });
  }

  /* ============ フッター部分（＋検索） ============ */
  if (part === 'footer'){
    document.currentScript.insertAdjacentHTML('beforebegin', footerHTML());

    const ov = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const quick = document.getElementById('searchQuick');

    const lang = () => document.body.getAttribute('data-lang') || 'ja';
    const T = o => o ? (o[lang()] || o.ja || '') : '';

    // 検索の対象（ページ・イベント・お知らせ・メンバー）
    function buildIndex(){
      const idx = [
        { g:['ページ','Pages'], ja:'理念', en:'Philosophy', url:'index.html#about', k:'理念 philosophy to be lab 合言葉 keywords turn the key open the door' },
        { g:['ページ','Pages'], ja:'活動', en:'Activities', url:'index.html#research', k:'活動 口頭 ポスター ワークショップ activities poster workshop oral' },
        { g:['ページ','Pages'], ja:'活動記録', en:'Archive', url:'activities.html', k:'活動記録 写真 archive photos' },
        { g:['ページ','Pages'], ja:'イベント・締切カレンダー', en:'Events & deadlines', url:'events.html', k:'イベント 締切 カレンダー events deadlines calendar important dates' },
        { g:['ページ','Pages'], ja:'お知らせ', en:'News', url:'news.html', k:'お知らせ ニュース news' },
        { g:['ページ','Pages'], ja:'運営メンバー', en:'Organizing committee', url:'members.html', k:'メンバー 運営 committee members' },
        { g:['ページ','Pages'], ja:'協賛・パートナー', en:'Sponsors & Partners', url:'index.html#sponsors', k:'協賛 スポンサー パートナー sponsor partner' },
        { g:['ページ','Pages'], ja:'発表に応募する', en:'Apply to present', url:'index.html#get-involved', k:'応募 発表 フォーム call for presentations apply' },
        { g:['ページ','Pages'], ja:'ワークショップに応募する', en:'Apply to lead a workshop', url:'index.html#get-involved', k:'応募 ワークショップ 書道 折り紙 workshop apply' },
        { g:['ページ','Pages'], ja:'お問い合わせ', en:'Contact', url:'index.html#contact', k:'連絡 問い合わせ contact mail instagram facebook' }
      ];
      if (typeof EVENTS !== 'undefined') EVENTS.forEach(e => idx.push({ g:['イベント','Events'], ja:e.title.ja, en:e.title.en, url:'activities.html#' + e.id, k:[e.place.ja,e.place.en,e.desc.ja,e.desc.en].join(' ') }));
      if (typeof IDEAS !== 'undefined') IDEAS.filter(i => !i.hidden).forEach(i => idx.push({ g:['構想中の企画','Ideas'], ja:i.title.ja, en:i.title.en, url:'ideas.html#' + i.id, k:[(i.summary||{}).ja,(i.summary||{}).en].join(' ') }));
      if (typeof DEADLINES !== 'undefined') DEADLINES.forEach(e => idx.push({ g:['締切','Deadlines'], ja:e.title.ja, en:e.title.en, url:'events.html#dates', k:[e.desc.ja,e.desc.en].join(' ') }));
      if (typeof NEWS !== 'undefined') NEWS.forEach(n => idx.push({ g:['お知らせ','News'], ja:n.title.ja, en:n.title.en, url:n.link || 'news.html', k:[(n.summary||{}).ja,(n.summary||{}).en].join(' ') }));
      if (typeof MEMBERS !== 'undefined') MEMBERS.forEach(m => idx.push({ g:['メンバー','Members'], ja:m.name.ja, en:m.name.en, url:'members.html', k:[m.field.ja,m.field.en,m.country.ja,m.country.en,m.inst.ja,m.inst.en,m.role.ja].join(' ') }));
      return idx;
    }
    let INDEX = null;
    function doSearch(q){
      q = q.trim().toLowerCase();
      if (!q){ results.innerHTML = ''; quick.hidden = false; return; }
      quick.hidden = true;
      if (!INDEX) INDEX = buildIndex();
      const terms = q.split(/\s+/);
      const hits = INDEX.filter(it => { const hay = (it.ja + ' ' + it.en + ' ' + it.k).toLowerCase(); return terms.every(t => hay.includes(t)); }).slice(0, 12);
      results.innerHTML = hits.length
        ? hits.map(h => `<a class="sr-item" href="${esc(h.url)}"><span class="sr-g">${lang()==='ja'?h.g[0]:h.g[1]}</span><span class="sr-t">${esc(lang()==='ja'?h.ja:h.en)}</span></a>`).join('')
        : `<p class="sr-none">${lang()==='ja' ? '見つかりませんでした。' : 'No results found.'}</p>`;
    }
    function openSearch(){ ov.hidden = false; document.body.classList.add('search-open'); setTimeout(() => input.focus(), 30); }
    function closeSearch(){ ov.hidden = true; document.body.classList.remove('search-open'); }
    document.getElementById('searchBtn').addEventListener('click', openSearch);
    document.getElementById('searchClose').addEventListener('click', closeSearch);
    ov.addEventListener('click', e => { if (e.target === ov) closeSearch(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !ov.hidden) closeSearch();
      if (e.key === '/' && ov.hidden && !/input|textarea/i.test((document.activeElement||{}).tagName || '')){ e.preventDefault(); openSearch(); }
    });
    input.addEventListener('input', () => doSearch(input.value));
    document.getElementById('searchForm').addEventListener('submit', e => { e.preventDefault(); const first = results.querySelector('a'); if (first) location.href = first.getAttribute('href'); });
    ov.addEventListener('click', e => { if (e.target.closest('a')) closeSearch(); });
  }
})();
