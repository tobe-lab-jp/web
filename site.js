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
    symposium: { ja: 'フェスティバル',   en: 'Festival' },
    online:    { ja: 'オンライン交流会', en: 'Online Meetup' },
    deadline:  { ja: '締切・予定',       en: 'Deadline' }
  };

  // 複数リンク（links配列）と従来の単一リンク（link）の両方に対応する関数
  function getLinks(e){
    if (Array.isArray(e.links) && e.links.length) return e.links.filter(l => l && l.url);
    if (e.link) return [{ url: e.link, label: e.linkLabel || { ja: '申し込む', en: 'Register' } }];
    return [];
  }

  // ---------- イベント・締切（カレンダー） ----------
  const key = e => String(e.sort || e.date || '');
  const cal = [
    ...EV.map(e => Object.assign({ type: 'symposium', _isEvent: true }, e)),
    ...DL
  ].sort((a, b2) => key(a).localeCompare(key(b2)));
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
  const typeChip = e => {
    const tp = e.type || 'symposium';
    return `<span class="type-chip tc-${esc(tp)}">${t(TYPE[tp] || { ja: tp, en: tp })}</span>`;
  };

  function calRow(e){
    const past = isPast(e);
    const more = e._isEvent
      ? `<a class="ev-link" href="activities.html#${esc(e.id)}">${b('詳細・写真 →','Details & photos →')}</a>`
      : (e.related ? `<a class="ev-link" href="activities.html#${esc(e.related)}">${b('関連イベント →','Related event →')}</a>` : '');
    const reg = getLinks(e).map(l => `<a class="ev-link" href="${esc(l.url)}" target="_blank" rel="noopener">${t(l.label)} →</a>`).join('');
    return `<article class="ev-card cal-row${past ? ' is-past' : ''}" data-type="${esc(e.type \vert{}\vert{} 'symposium')}" data-text="${esc(((e.title||{}).ja||'') + ' ' + ((e.title||{}).en||'') + ' ' + ((e.place||{}).ja||'') + ' ' + ((e.place||{}).en||''))}">
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
      return `<tr><th scope="row">${t(label)}</th><td>${e.date ? fmtDate(e.date) + (e.time ? ' ・ ' + e.time : '') : (e.season ? t(e.season) + ' <span class="na">' + '（日程調整中）</span>' : b('未定','TBA'))}</td></tr>`; }); dt.innerHTML = `<tbody>${rows.join('')}</tbody>`;
  }

  // ---------- お知らせ ----------
  const newsSorted = [...NW].sort((a, b2) => String(b2.date).localeCompare(String(a.date)));
  const tagChip = n => `<span class="type-chip nt-${esc(n.tag)}">${t(TAGS[n.tag] || { ja: n.tag, en: n.tag })}</span>`;
  const newsMore = n => n.link ? `<a class="ev-link" href="${esc(n.link)}">${b('詳しく見る →','Read more →')}</a>` : '';
  function newsRow(n){
    return `<article class="news-row" data-tag="${esc(n.tag)}">
      <div class="news-meta">${tagChip(n)}<time>${fmtDate(n.date)}</time></div>
      <h3 class="news-title">${t(n.title)}</h3>${n.summary ? `<p class="news-sum">${t(n.summary)}</p>` : ''}
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
          <h3 class="news-feature-title">${t(first.title)}</h3>${first.summary ? `<p class="news-sum">${t(first.summary)}</p>` : ''}
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
  const avatarOf = (m, cls) => m.photo ? `<img class="avatar ${cls \vert{}\vert{} ''}" src="${esc(m.photo)}" alt="">` : `<span class="avatar avatar-i ${cls \vert{}\vert{} ''}" aria-hidden="true">${initialOf(m)}</span>`;
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
      <td data-label-ja="専門" data-label-en="Field">${cell(m
