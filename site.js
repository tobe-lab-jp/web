/* ============================================================
   To be. Lab — 共通スクリプト（言語切り替え・データの描画・動き）
   ふだんは編集不要です。文章は各HTML、データは events.js / members.js / news.js / config.js へ。
   ============================================================ */
(function(){
  'use strict';

  // ---------- 小さな道具 ----------
  const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
  const t = o => o ? `<span data-ja="${esc(o.ja)}" data-en="${esc(o.en != null && o.en !== '' ? o.en : o.ja)}">${o.ja || ''}</span>` : '';
  const b = (ja, en) => `<span data-ja="${esc(ja)}" data-en="${esc(en)}">${ja}</span>`;
  const has = o => o && (o.ja || o.en);
  const na = '<span class="na">—</span>';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const fmtDate = d => String(d).replace(/-/g, '.');
  const today = new Date(); today.setHours(0,0,0,0);

  const EV = (typeof EVENTS !== 'undefined') ? EVENTS : [];
  const DL = (typeof DEADLINES !== 'undefined') ? DEADLINES : [];
  const NW = (typeof NEWS !== 'undefined') ? NEWS : [];
  const MB = (typeof MEMBERS !== 'undefined') ? MEMBERS : [];
  const TAGS = (typeof NEWS_TAGS !== 'undefined') ? NEWS_TAGS : {};
  const TYPE = {
    symposium: { ja: 'シンポジウム', en: 'Symposium' },
    deadline:  { ja: '締切・予定',   en: 'Deadline' },
    workshop:  { ja: 'ワークショップ', en: 'Workshop' }
  };

  // ---------- イベント・締切（カレンダー） ----------
  const key = e => String(e.sort || e.date || '');
  const cal = [...EV.map(e => Object.assign({ type: 'symposium' }, e)), ...DL].sort((a, b2) => key(a).localeCompare(key(b2)));
  const isPast = e => !e.tbd && e.date && new Date(e.date) < today;
  const upcoming = cal.filter(e => !isPast(e));
  const pastEv = cal.filter(isPast).reverse();

  function dateBlock(e){
    if (e.tbd || !e.date)
      return `<div class="ev-date ev-date-tbd"><span class="ev-tbd" data-ja="日程" data-en="Date">日程</span><span class="ev-tbd-main" data-ja="未定" data-en="TBD">未定</span></div>`;
    const x = new Date(e.date);
    return `<div class="ev-date"><span class="ev-mon">${x.toLocaleString('en',{month:'short'})}</span><span class="ev-day">${x.getDate()}</span><span class="ev-year">${x.getFullYear()}</span></div>`;
  }
  const whenText = e => e.date ? (fmtDate(e.date) + (e.time ? ' ・ ' + e.time : '')) : (e.season ? t(e.season) : b('未定','TBA'));
  const typeChip = e => `<span class="type-chip tc-${esc(e.type || 'symposium')}">${t(TYPE[e.type || 'symposium'])}</span>`;

  function calRow(e){
    const past = isPast(e);
    const more = e.type === 'symposium'
      ? `<a class="ev-link" href="activities.html#${esc(e.id)}">${b('詳細・写真 →','Details & photos →')}</a>`
      : (e.related ? `<a class="ev-link" href="activities.html#${esc(e.related)}">${b('関連イベント →','Related event →')}</a>` : '');
    const reg = e.link ? `<a class="ev-link" href="${esc(e.link)}" target="_blank" rel="noopener">${t(e.linkLabel)} →</a>` : '';
    return `<article class="ev-card cal-row${past ? ' is-past' : ''}" data-type="${esc(e.type || 'symposium')}" data-text="${esc(((e.title||{}).ja||'') + ' ' + ((e.title||{}).en||'') + ' ' + ((e.place||{}).ja||'') + ' ' + ((e.place||{}).en||''))}">
      ${dateBlock(e)}
      <div class="ev-body">
        <div class="ev-meta">${typeChip(e)}<span class="ev-place">${e.place ? t(e.place) : ''}${e.tbd || e.date ? ' ・ ' + whenText(e) : ''}</span></div>
        <h3 class="ev-title">${t(e.title)}</h3>
        <p class="ev-desc">${t(e.desc)}</p>
        <div class="ev-links">${more}${reg}</div>
      </div>
    </article>`;
  }
  const emptyMsg = '<p class="ev-empty" data-ja="該当する予定はありません。" data-en="Nothing to show.">該当する予定はありません。</p>';

  const calHome = $('#calHome');
  if (calHome) calHome.innerHTML = upcoming.slice(0, 5).map(calRow).join('') || emptyMsg;
  const calAll = $('#calAll');
  if (calAll) calAll.innerHTML = upcoming.map(calRow).join('') || emptyMsg;
  const calPast = $('#calPast');
  if (calPast){
    if (pastEv.length) calPast.innerHTML = pastEv.map(calRow).join('');
    else { const blk = calPast.closest('.events-block'); if (blk) blk.style.display = 'none'; }
  }

  // Important Dates（DEADLINES と各開催の日程から自動で作成）
  const dt = $('#datesTable');
  if (dt){
    const rows = [...DL, ...EV].sort((a, b2) => key(a).localeCompare(key(b2))).map(e => {
      const label = e.type === 'deadline' || !e.type ? e.title : { ja: e.title.ja + '（' + e.place.ja + '）', en: e.title.en + ' (' + e.place.en + ')' };
      return `<tr><th scope="row">${t(label)}</th><td>${e.date ? fmtDate(e.date) + (e.time ? ' ・ ' + e.time : '') : (e.season ? t(e.season) + ' <span class="na">' + '（日程調整中）</span>' : b('未定','TBA'))}</td></tr>`;
    });
    dt.innerHTML = `<tbody>${rows.join('')}</tbody>`;
  }

  // ---------- お知らせ ----------
  const newsSorted = [...NW].sort((a, b2) => String(b2.date).localeCompare(String(a.date)));
  const tagChip = n => `<span class="type-chip nt-${esc(n.tag)}">${t(TAGS[n.tag] || { ja: n.tag, en: n.tag })}</span>`;
  const newsMore = n => n.link ? `<a class="ev-link" href="${esc(n.link)}">${b('詳しく見る →','Read more →')}</a>` : '';
  function newsRow(n){
    return `<article class="news-row" data-tag="${esc(n.tag)}">
      <div class="news-meta">${tagChip(n)}<time>${fmtDate(n.date)}</time></div>
      <h3 class="news-title">${t(n.title)}</h3>
      ${n.summary ? `<p class="news-sum">${t(n.summary)}</p>` : ''}
      ${newsMore(n)}
    </article>`;
  }
  const newsHome = $('#newsHome');
  if (newsHome){
    const [first, ...rest] = newsSorted.slice(0, 5);
    newsHome.innerHTML = first ? `
      <article class="news-feature">
        <div class="news-feature-body">
          <div class="news-meta">${tagChip(first)}<time>${fmtDate(first.date)}</time></div>
          <h3 class="news-feature-title">${t(first.title)}</h3>
          ${first.summary ? `<p class="news-sum">${t(first.summary)}</p>` : ''}
          ${newsMore(first)}
        </div>
      </article>
      <div class="news-list">${rest.map(newsRow).join('')}</div>` : '<p class="ev-empty">—</p>';
  }
  const newsAll = $('#newsAll');
  if (newsAll) newsAll.innerHTML = newsSorted.map(newsRow).join('') || emptyMsg;

  // ---------- 運営メンバー ----------
  const cell = o => has(o) ? t(o) : na;
  const GROUPS = (typeof MEMBER_GROUPS !== 'undefined') ? MEMBER_GROUPS : { core: { ja: 'コアメンバー', en: 'Core members' }, other: { ja: 'メンバー', en: 'Members' } };
  const S0 = (typeof SITE !== 'undefined') ? SITE : {};
  const showEmptyIcons = S0.showEmptyContactIcons !== false;

  // 連絡先アイコン（押すと飛ぶ）
  const ICON = {
    instagram: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>',
    linkedin:  '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.01 5.01A2.5 2.5 0 014.98 3.5zM3 9.75h4v11.25H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4z"/></svg>',
    facebook:  '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.6v3h2.7V21z"/></svg>',
    email:     '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
    web:       '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9S14.6 18.3 12 21c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z"/></svg>'
  };
  const ICON_LABEL = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn', email: 'Email', web: 'Web' };
  function contactIcons(c){
    c = c || {};
    const kinds = ['instagram', 'facebook', 'linkedin', 'email'].concat(c.web ? ['web'] : []);
    const out = kinds.map(k => {
      const v = (c[k] || '').trim();
      if (!v) return showEmptyIcons ? `<span class="ci is-empty" title="${ICON_LABEL[k]}（未登録）" aria-hidden="true">${ICON[k]}</span>` : '';
      const href = k === 'email' ? (v.startsWith('mailto:') ? v : 'mailto:' + v) : v;
      const ext = k === 'email' ? '' : ' target="_blank" rel="noopener"';
      return `<a class="ci" href="${esc(href)}"${ext} aria-label="${ICON_LABEL[k]}" title="${ICON_LABEL[k]}">${ICON[k]}</a>`;
    }).join('');
    return `<span class="ci-row">${out}</span>`;
  }
  const initialOf = m => (m.name.ja || '?').charAt(0);
  const avatarOf = (m, cls) => m.photo ? `<img class="avatar ${cls || ''}" src="${esc(m.photo)}" alt="">` : `<span class="avatar avatar-i ${cls || ''}" aria-hidden="true">${initialOf(m)}</span>`;
  const splitGroups = () => [
    { key: 'core',  list: MB.filter(m => m.core !== false) },
    { key: 'other', list: MB.filter(m => m.core === false) }
  ].filter(g => g.list.length || g.key === 'other');   // 「メンバー」の枠は、空でも見せる
  // 空の枠（参加してくれた方が入る場所）
  const placeholders = () => `<div class="mstrips">${Array.from({ length: 3 }, () => `<div class="mstrip mstrip-ph">
      <span class="ph-plus" aria-hidden="true">＋</span>
      <span class="ph-t">${b('あなたの名前が<br>ここに入ります','Your name<br>could be here')}</span>
    </div>`).join('')}</div>`;

  // 一覧ページ（表）
  function memberRow(m){
    const hay = [m.name.ja, m.name.en, m.role.ja, m.role.en, m.field.ja, m.field.en, m.country.ja, m.country.en, m.inst.ja, m.inst.en].join(' ');
    return `<tr data-country="${esc(m.country.ja)}" data-text="${esc(hay)}">
      <td class="c-name" data-label-ja="氏名" data-label-en="Name">${avatarOf(m)}<span class="c-name-t">${t(m.name)}</span></td>
      <td data-label-ja="役職" data-label-en="Role">${cell(m.role)}</td>
      <td data-label-ja="専門" data-label-en="Field">${cell(m.field)}</td>
      <td data-label-ja="留学先（国）" data-label-en="Country">${cell(m.country)}</td>
      <td data-label-ja="留学機関" data-label-en="Institution">${cell(m.inst)}</td>
      <td class="c-links" data-label-ja="リンク" data-label-en="Links">${contactIcons(m.contact)}</td>
    </tr>`;
  }
  const cg = $('#committeeGroups');
  if (cg){
    cg.innerHTML = splitGroups().map(g => g.list.length ? `<div class="mgroup">
      <h3 class="mgroup-h">${t(GROUPS[g.key])}<span class="mgroup-n">${g.list.length}</span></h3>
      <div class="committee-wrap"><table class="committee">
        <thead><tr>
          <th data-ja="氏名" data-en="Name">氏名</th><th data-ja="役職" data-en="Role">役職</th><th data-ja="専門" data-en="Field">専門</th>
          <th data-ja="留学先（国）" data-en="Country">留学先（国）</th><th data-ja="留学機関" data-en="Institution">留学機関</th><th data-ja="リンク" data-en="Links">リンク</th>
        </tr></thead>
        <tbody>${g.list.map(memberRow).join('')}</tbody>
      </table></div></div>` : `<div class="mgroup mgroup-ph">
      <h3 class="mgroup-h">${t(GROUPS[g.key])}</h3>${placeholders()}</div>`).join('');
  }

  const mf = $('#memberFilters');
  if (mf){
    const countries = [];
    MB.forEach(m => { if (m.country.ja && !countries.find(c => c.ja === m.country.ja)) countries.push(m.country); });
    mf.innerHTML = `<button class="chip is-on" data-filter="">${b('すべて','All')}</button>` +
      countries.map(c => `<button class="chip" data-filter="${esc(c.ja)}">${t(c)}</button>`).join('');
  }

  // トップページ（役職と留学国・機関）
  const strip = $('#memberStrip');
  if (strip){
    const showHomeIcons = S0.showContactOnHome !== false;
    const line = m => {
      const parts = [has(m.country) ? t(m.country) : '', has(m.inst) ? t(m.inst) : ''].filter(Boolean);
      return parts.length ? parts.join('<span class="dot"> ・ </span>') : na;
    };
    strip.innerHTML = splitGroups().map(g => `<div class="mgroup${g.list.length ? '' : ' mgroup-ph'}">
      <h3 class="mgroup-h">${t(GROUPS[g.key])}${g.list.length ? `<span class="mgroup-n">${g.list.length}</span>` : ''}</h3>
      ${g.list.length ? `<div class="mstrips">${g.list.map(m => `<div class="mstrip">
        <a class="mstrip-main" href="members.html">
          ${avatarOf(m, 'avatar-lg')}
          <span class="mstrip-n">${t(m.name)}</span>
          <span class="mstrip-role">${has(m.role) ? t(m.role) : na}</span>
          <span class="mstrip-inst">${line(m)}</span>
        </a>
        ${showHomeIcons ? contactIcons(m.contact) : ''}
      </div>`).join('')}</div>` : placeholders()}</div>`).join('');
  }

  // ---------- 構想中の企画 ----------
  const IDEA = (typeof IDEAS !== 'undefined') ? IDEAS : [];
  const IDEA_STATUS = { idea: { ja: '構想中', en: 'Idea' }, considering: { ja: '検討中', en: 'Under consideration' }, planning: { ja: '準備中', en: 'In preparation' } };
  const statusChip = i => `<span class="type-chip st-${esc(i.status || 'idea')}">${t(IDEA_STATUS[i.status || 'idea'])}</span>`;
  const helpBtn = `<a class="btn btn-primary btn-sm" href="members.html#join" data-ja="メンバー募集へ →" data-en="Join as a member →">メンバー募集へ →</a>`;
  const ideasHome = $('#ideasHome');
  if (ideasHome) ideasHome.innerHTML = IDEA.filter(i => !i.hidden).map(i => `<article class="idea-card">
      <div class="idea-top">${statusChip(i)}<span class="idea-tag">${t(i.tag)}</span></div>
      <h4 class="idea-title">${t(i.title)}</h4>
      <p class="idea-sum">${t(i.summary)}</p>
      <a class="ev-link" href="ideas.html#${esc(i.id)}">${b('くわしく見る →','Read more →')}</a>
    </article>`).join('');
  const ideasAll = $('#ideasAll');
  if (ideasAll) ideasAll.innerHTML = IDEA.filter(i => !i.hidden).map((i, idx) => {
    const rows = [['背景','Background',i.background],['目的','Purpose',i.purpose],['内容','Content',i.content],['進め方','How',i.method],['一緒に進めたいこと','Where you can join in',i.help]]
      .filter(r => has(r[2])).map(r => `<tr><th scope="row" data-ja="${r[0]}" data-en="${r[1]}">${r[0]}</th><td>${t(r[2])}</td></tr>`).join('');
    return `<article class="frame idea-frame" id="${esc(i.id)}">
      <header class="frame-head"><span class="frame-no">${String(idx + 1).padStart(2, '0')}</span>
        <div><p class="frame-status">${statusChip(i)}<span class="idea-tag">${t(i.tag)}</span></p><h2 class="frame-title">${t(i.title)}</h2>
        <p class="frame-sub">${t(i.summary)}</p></div></header>
      <table class="info">${'<tbody>' + rows + '</tbody>'}</table>
      <div class="idea-help">${helpBtn}</div>
    </article>`;
  }).join('');

  // ---------- 活動記録ページ（開催ごとの枠） ----------
  const sortedEv = [...EV].sort((a, b2) => key(a).localeCompare(key(b2)));
  const arc = $('#archive');
  if (arc){
    const nav = $('#archiveNav');
    if (nav) nav.innerHTML = sortedEv.map(e => `<a href="#${esc(e.id)}">${t(e.place)} <small>${e.season ? t(e.season) : (e.date || '')}</small></a>`).join('');
    arc.innerHTML = sortedEv.map((e, idx) => {
      const rows = [
        ['開催日','Date',   e.date ? (fmtDate(e.date) + (e.time ? ' ・ ' + e.time : '')) : (e.season ? t(e.season) + ' <span class="na">（日程調整中）</span>' : na)],
        ['場所','Place',    t(e.place)],
        ['会場','Venue',    has(e.venue) ? (e.venueUrl ? `<a class="txt-link" href="${esc(e.venueUrl)}" target="_blank" rel="noopener">${t(e.venue)} ↗</a>` : t(e.venue)) : na],
        ['規模','Scale',    has(e.capacity) ? t(e.capacity) : na],
        ['申込・詳細','Registration', e.link ? `<a class="txt-link" href="${esc(e.link)}" target="_blank" rel="noopener">${t(e.linkLabel)} ↗</a>` : '<span class="na" data-ja="準備中" data-en="Coming soon">準備中</span>']
      ].map(r => `<tr><th scope="row" data-ja="${r[0]}" data-en="${r[1]}">${r[0]}</th><td>${r[2]}</td></tr>`).join('');
      const photos = (e.photos && e.photos.length)
        ? e.photos.map(p => `<figure class="ph"><img src="${esc(p.src)}" alt="${esc(p.caption ? p.caption.ja : '')}" loading="lazy">${p.caption ? `<figcaption>${t(p.caption)}</figcaption>` : ''}</figure>`).join('')
        : Array.from({ length: 6 }, (_, i) => `<figure class="ph ph-empty"><span class="ph-label">Photo ${i + 1}</span></figure>`).join('');
      const program = (e.program && e.program.length)
        ? `<table class="prog"><tbody>${e.program.map(p => `<tr><td class="prog-time">${p.time || ''}</td><td>${t(p.title)}${has(p.speaker) ? `<span class="prog-sp">${t(p.speaker)}</span>` : ''}</td></tr>`).join('')}</tbody></table>`
        : '<p class="ph-note" data-ja="プログラム・発表者は決まり次第、こちらに掲載します。" data-en="The program and presenters will be posted here once confirmed.">プログラム・発表者は決まり次第、こちらに掲載します。</p>';
      const status = isPast(e) ? b('終了','Ended') : (e.tbd ? b('開催予定・日程調整中','Planned · date TBA') : b('開催予定','Upcoming'));
      return `<article class="frame" id="${esc(e.id)}">
        <header class="frame-head"><span class="frame-no">${String(idx + 1).padStart(2, '0')}</span>
          <div><p class="frame-status"><span>${status}</span></p><h2 class="frame-title">${t(e.title)}</h2>
          <p class="frame-sub">${t(e.place)}${e.season || e.date ? ' ・ ' + whenText(e) : ''}</p></div></header>
        <div class="frame-grid">
          <div class="frame-info"><p class="frame-h" data-ja="開催概要" data-en="Overview">開催概要</p><table class="info"><tbody>${rows}</tbody></table>
            <p class="frame-desc">${t(e.desc)}</p><p class="frame-h" data-ja="プログラム" data-en="Program">プログラム</p>${program}</div>
          <div class="frame-photos"><p class="frame-h" data-ja="写真" data-en="Photos">写真</p><div class="ph-grid">${photos}</div></div>
        </div></article>`;
    }).join('');
  }

  // ---------- ホームのギャラリー ----------
  const gal = $('#gallery');
  if (gal){
    const items = (typeof SITE !== 'undefined' && SITE.gallery) ? SITE.gallery : [];
    const slots = items.slice(0, 6).map(g => `<a class="g-item g-empty" href="activities.html#photos"><span class="ph-label">Photo</span><span class="g-cap">${b(g.ja, g.en)}</span><img src="${esc(g.src)}" alt="${esc(g.ja)}" loading="lazy" onload="this.parentNode.classList.remove('g-empty')" onerror="this.remove()"></a>`);
    gal.innerHTML = slots.join('');
  }
  const galAll = $('#galleryAll');
  if (galAll){
    const list = (typeof SITE !== 'undefined' && SITE.galleryAll) ? SITE.galleryAll : [];
    galAll.innerHTML = list.map(g => `<a class="g-item" href="${esc(g.src)}" target="_blank" rel="noopener"><span class="g-cap">${b(g.ja, g.en)}</span><img src="${esc(g.src)}" alt="${esc(g.ja)}" loading="lazy" onerror="this.parentNode.remove()"></a>`).join('');
  }

  // ---------- 数字のカウントアップ ----------
  $$('[data-count]').forEach(el => { if (el.dataset.count === 'members') el.dataset.count = MB.length || 0; });
  const cio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, to = parseFloat(el.dataset.count) || 0;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent = to; cio.unobserve(el); return; }
      const t0 = performance.now(), dur = 1100;
      (function tick(now){
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach(el => { el.textContent = '0'; cio.observe(el); });

  // ---------- 絞り込み（チップ＋テキスト検索） ----------
  function applyFilter(scope){
    const list = $(scope.dataset.target);
    if (!list) return;
    const on = $('.chip.is-on', scope);
    const val = on ? on.dataset.filter : '';
    const attr = scope.dataset.attr || 'type';
    const box = scope.dataset.search ? $(scope.dataset.search) : null;
    const q = box ? box.value.trim().toLowerCase() : '';
    let shown = 0;
    $$('[data-' + attr + ']', list).forEach(it => {
      const okType = !val || it.dataset[attr] === val;
      const okText = !q || (it.dataset.text || '').toLowerCase().includes(q);
      it.hidden = !(okType && okText);
      if (!it.hidden) shown++;
    });
    $$('.mgroup:not(.mgroup-ph)', list).forEach(g => { g.hidden = !g.querySelector('[data-country]:not([hidden])'); });
    const empty = (list.closest('section') || document).querySelector('.filter-empty');
    if (empty) empty.hidden = shown > 0;
  }
  $$('[data-filters]').forEach(scope => {
    scope.addEventListener('click', e => {
      const c = e.target.closest('.chip'); if (!c) return;
      $$('.chip', scope).forEach(x => x.classList.toggle('is-on', x === c));
      applyFilter(scope);
    });
    if (scope.dataset.search){ const bx = $(scope.dataset.search); if (bx) bx.addEventListener('input', () => applyFilter(scope)); }
  });

  // ---------- Google フォーム／リンク ----------
  const S = (typeof SITE !== 'undefined') ? SITE : { forms: {} };
  $$('[data-form]').forEach(a => {   // ボタン
    const url = (S.forms || {})[a.dataset.form];
    if (url){ a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else {
      a.removeAttribute('href'); a.classList.add('is-disabled'); a.setAttribute('aria-disabled', 'true');
      a.dataset.ja = a.dataset.pendingJa; a.dataset.en = a.dataset.pendingEn;
    }
  });
  $$('[data-form-link]').forEach(a => {   // メニュー・フッターのリンク
    const url = (S.forms || {})[a.dataset.formLink];
    if (url){ a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else a.href = a.dataset.fallbackHref || 'index.html#get-involved';
  });

  // ---------- 写真スロット ----------
  $$('.photo-slot[data-photo]').forEach(el => {
    const src = el.dataset.photo;
    if (src){ el.classList.add('has-photo'); el.insertAdjacentHTML('afterbegin', `<img src="${esc(src)}" alt="" loading="lazy">`); }
  });

  // ---------- ヒーローの4行/2行（?concept=2 でプレビュー） ----------
  const concept = $('.hero-concept');
  if (concept && /[?&]concept=2/.test(location.search)) concept.classList.add('is-two');

  // ---------- 言語切り替え (JA / EN) ----------
  const body = document.body;
  const langToggle = $('#langToggle');
  function applyLang(root, lang){
    $$('[data-ja][data-en]', root).forEach(el => { el.innerHTML = el.dataset[lang]; });
    $$('[data-label-ja]', root).forEach(el => el.setAttribute('data-label', el.dataset['label' + (lang === 'ja' ? 'Ja' : 'En')]));
  }
  function setLang(lang){
    body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
    applyLang(document, lang);
    if (langToggle) langToggle.textContent = lang === 'ja' ? 'English' : '日本語';
    try { localStorage.setItem('tobelab-lang', lang); } catch (e) {}
    const inp = $('#searchInput'); if (inp && inp.value) inp.dispatchEvent(new Event('input'));
  }
  if (langToggle) langToggle.addEventListener('click', () => setLang(body.getAttribute('data-lang') === 'ja' ? 'en' : 'ja'));
  let saved = 'ja';
  try { saved = localStorage.getItem('tobelab-lang') || 'ja'; } catch (e) {}
  setLang(saved);

  // ---------- ヘッダー影 / 年 / スクロール表示 ----------
  const header = $('.site-header');
  if (header) addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20));
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  $$('.section, .research-card, .value, .sponsor-tier, .frame, .tile, .cta-card, .news-feature, .idea-card').forEach(el => { el.classList.add('reveal'); io.observe(el); });

  // ハッシュ付きで開いたとき（レンダリング後にもう一度スクロール）
  if (location.hash){ const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView(), 60); }
})();
