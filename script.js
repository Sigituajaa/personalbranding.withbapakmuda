/* Logika kursus: kurikulum, progres (localStorage), penguncian berurutan, salin prompt, tab, FAQ. */
(function () {
  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  var STEPS = [
    {
      title: 'Kenali diri lo',
      tag: 'Branding yang kuat mulai dari lo sendiri',
      blocks: [
        { h: 'Gali keahlian lo', p: 'Kasih Claude bahan mentah, biar dia bantu nemuin yang unik dari lo.',
          prompt: 'Gue bapak muda, kerja di [bidang lo], hobi [hobi lo]. Tanya gue 10 pertanyaan buat nemuin keahlian dan cerita unik gue.',
          after: 'Jawab jujur dan apa adanya.' },
        { h: 'Cari niche lo', p: 'Niche itu fokus topik lo, biar orang tau lo orangnya buat apa.',
          prompt: 'Dari jawaban gue tadi, kasih 5 opsi niche konten buat pemula, lengkap dengan kelebihan dan tantangannya.',
          after: 'Pilih satu dulu. Bisa ganti nanti.' },
        { h: 'Tes niche lo', p: 'Jawab tiga pertanyaan ini sebelum milih:',
          list: ['Gue seneng bahas ini selama 30 hari?', 'Ada orang yang butuh topik ini?', 'Gue punya pengalaman buat dibagiin?'] },
        { h: 'Tentuin audiens dan gaya', p: 'Lo ngomong ke siapa, dan pake gaya apa?',
          prompt: 'Bantu gue tentuin target audiens dan gaya bahasa buat niche [niche lo]. Gue pengen kesannya santai, jujur, dan relate.',
          after: 'Pake gaya yang sama di semua konten.' }
      ]
    },
    {
      title: 'Rapihin profil Instagram',
      tag: 'Orang nentuin follow atau enggak dalam hitungan detik',
      blocks: [
        { h: 'Akun profesional', p: 'Ganti akun lo ke akun profesional lewat menu pengaturan Instagram, biar ada insight performa konten. Jangan di-private ya.' },
        { h: 'Nama dan foto profil', p: 'Biar gampang diinget:',
          list: ['Nama pendek, gampang diketik', 'Hindari angka dan banyak simbol', 'Foto jelas, gak banyak pernak-pernik'] },
        { h: 'Bikin bio', p: 'Bio yang bagus ngejawab: lo siapa, bantu apa, kenapa harus diikutin.',
          prompt: 'Bikinin 5 opsi bio Instagram maksimal 150 karakter. Niche: [niche lo]. Gaya: santai. Sertakan ajakan buat follow.',
          after: 'Edit pake kata-kata lo sendiri.' },
        { h: 'Highlight profil', p: 'Siapin 4 highlight biar profil keliatan rapi:',
          list: ['Mulai dari sini', 'Cerita gue', 'Tips', 'Proses belajar'] }
      ]
    },
    {
      title: 'Susun strategi konten',
      tag: 'Biar gak bingung mau posting apa',
      blocks: [
        { h: 'Tiga pilar konten', p: 'Bagi konten lo ke pilar biar gak muter-muter:',
          list: ['Edukasi: bagi tips dan ilmu', 'Cerita: perjalanan lo belajar', 'Ajakan: ngajak orang ikut bareng'] },
        { h: 'Content plan 30 hari', p: 'Minta Claude bikinin kalender konten.',
          prompt: 'Bikinin content plan 30 hari buat niche [niche lo]. Format tabel: tanggal, topik, jenis konten, dan hook.',
          after: 'Gak harus tiap hari. Ambil yang realistis.' },
        { h: 'Kenapa fokus ke Reels?', p: 'Reels punya peluang dilihat orang yang belum follow lo, jadi cocok buat akun baru.',
          list: ['Pendek, 15 sampai 45 detik cukup', 'Satu ide per video', 'Hook kuat di 3 detik pertama'] }
      ]
    },
    {
      title: 'Bikin konten bareng Claude',
      tag: 'Dari ide sampe siap posting',
      blocks: [
        { h: 'Skrip Reels', p: 'Reels pendek lebih gampang kalo udah ada kerangka.',
          prompt: 'Bikinin skrip Reels 30 detik soal [topik]. Struktur: hook 3 detik, isi 3 poin, ajakan di akhir. Pake bahasa gue/lo yang santai.',
          after: 'Baca keras-keras. Kalo kaku, ubah.' },
        { h: 'Hook dan caption', p: 'Kalimat pertama nentuin orang lanjut atau skip.',
          prompt: 'Kasih 10 opsi kalimat pembuka buat caption soal [topik]. Bikin penasaran tapi jangan lebay.',
          after: 'Tes dua hook, liat mana yang jalan.' },
        { h: 'Tanpa nunjukin wajah', p: 'Gak mau tampil muka? Bisa banget:',
          list: ['Voice over plus teks di layar', 'Video aktivitas atau footage tangan', 'Cerita pengalaman pake storytelling'] },
        { h: 'Rumus prompt yang enak', p: 'Kalo hasil Claude kurang pas, biasanya prompt-nya kurang jelas. Kasih:',
          list: ['Konteks: lo siapa dan tujuannya', 'Tugas: minta apa persisnya', 'Format dan gaya: bentuk dan nada jawaban'] },
        { h: 'Edit hasil Claude', p: 'Jangan langsung posting. Cek dulu:',
          list: ['Ganti kata biar kayak omongan lo', 'Tambahin cerita pribadi', 'Cek fakta dan angka', 'Baca keras-keras'] }
      ]
    },
    {
      title: 'Konsisten',
      tag: 'Yang menang bukan yang sempurna, tapi yang rutin',
      blocks: [
        { h: 'Ritme yang realistis', p: 'Contoh ritme yang realistis: bikin 3 Reels tiap minggu.',
          stat: { big: '12', unit: 'konten sebulan' } },
        { h: 'Jangan cuekin komentar', p: 'Cek Instagram buat bales komentar dan DM. Interaksi itu bikin orang ngerasa dihargai.' }
      ]
    },
    {
      title: 'Evaluasi dan perbaiki',
      tag: '',
      blocks: [
        { h: 'Bonus: audit akun', p: 'Setelah 2 minggu, minta Claude jadi reviewer jujur.',
          prompt: 'Ini bio dan 5 caption terakhir gue: [tempel]. Kasih 3 kekuatan, 3 kelemahan, dan saran perbaikan yang konkret.' }
      ]
    }
  ];


  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function withMarks(s) {
    return esc(s).replace(/\[[^\]]+\]/g, '<mark>$&</mark>');
  }


  function blockHTML(b) {
    var html = '<div class="block"><h4>' + esc(b.h) + '</h4>';
    if (b.p) html += '<p>' + esc(b.p) + '</p>';
    if (b.stat) html += '<div class="rhythm"><strong>' + esc(b.stat.big) + '</strong><span>' + esc(b.stat.unit) + '</span></div>';
    if (b.list) html += '<ul class="sq">' + b.list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (b.prompt) {
      html += '<div class="prompt"><div class="prompt-head"><span>Ketik di Claude</span>' +
        '<button type="button" class="copy" aria-label="Salin prompt: ' + esc(b.h) + '">Salin</button></div>' +
        '<pre>' + withMarks(b.prompt) + '</pre></div>';
    }
    if (b.after) html += '<p class="after">' + esc(b.after) + '</p>';
    return html + '</div>';
  }

  var META = [[1, "Kenalan dulu"], [1, "Apa itu personal branding?"], [1, "Kenapa pake AI?"], [1, "Siapin dulu"], [2, "@@S0"], [2, "@@S1"], [2, "@@S2"], [2, "@@S3"], [2, "@@S4"], [2, "@@S5"], [3, "Kesalahan umum dan FAQ"], [4, "Bonus: bekal 30 hari ke depan"], [4, "Ide konten 30 hari"], [4, "Template siap pakai"], [4, "30 prompt siap pakai"], [5, "Ketentuan penggunaan konten"], [5, "Kontak"]];
  var MODS = {"1": "Modul 1 · Pengantar", "2": "Modul 2 · Praktek 6 langkah", "3": "Modul 3 · Tanya jawab", "4": "Modul 4 · Bonus", "5": "Modul 5 · Penutup"};
  var N = META.length;
  var KEY = 'pb-course-v1';
  var done = [];
  for (var i = 0; i < N; i++) done.push(false);
  try {
    var v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (Array.isArray(v)) { var gap = false; done = done.map(function (_, k) { if (!v[k]) gap = true; return gap ? false : !!v[k]; }); }
  } catch (err) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (err) {} }
  function count() { return done.filter(Boolean).length; }
  function nextIdx() { var k = done.indexOf(false); return k < 0 ? N - 1 : k; }
  function open(n) { return n === 1 || done[n - 2]; }   /* n is 1-based */

  /* practice lessons from STEPS */
  var CLAUDE = '<div class="cta-claude"><p>Buka Claude di tab baru, tempel prompt yang udah lo salin, lalu balik lagi ke sini.</p><a class="btn btn-claude" href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">Claude<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3h8v8M13 3L3 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>';
  STEPS.forEach(function (s, i) {
    var art = document.getElementById('L' + (5 + i));
    art.querySelector('.crumb').textContent = 'Modul 2 · Langkah ' + ROMAN[i] + ' dari VI';
    var t = art.querySelector('.lt'); t.textContent = s.title;
    META[4 + i][1] = s.title;
    var lead = art.querySelector('.lead');
    if (s.tag) { if (!lead) { lead = document.createElement('p'); lead.className = 'lead'; t.after(lead); } lead.textContent = s.tag; }
    var body = art.querySelector('.lbody');
    body.innerHTML = '<div class="blocks">' + s.blocks.map(blockHTML).join('') + '</div>' + CLAUDE;
  });

  /* curriculum */
  var side = document.getElementById('side'), list = document.getElementById('curr');
  var LOCK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 7V5a4 4 0 0 1 8 0v2M3 7h10v7H3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  var CHECK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var KIND = {1: 'Bacaan', 2: 'Praktek', 3: 'Bacaan', 4: 'Bonus', 5: 'Bacaan'};
  var cur = 0;
  function renderCurr() {
    var html = '', lastMod = 0;
    META.forEach(function (m, k) {
      var n = k + 1;
      if (m[0] !== lastMod) { if (lastMod) html += '</ol>'; html += '<h3>' + MODS[m[0]] + '</h3><ol>'; lastMod = m[0]; }
      var st = done[k] ? 'done' : (open(n) ? 'cur' : 'lock');
      html += '<li><a href="#l' + n + '"' + (st === 'lock' ? ' class="locked" aria-disabled="true"' : '') + (cur === n ? ' aria-current="page"' : '') + '><span class="st ' + st + '">' +
        (st === 'done' ? CHECK : st === 'lock' ? LOCK : n) + '</span><span>' + esc(m[1]) + '<small>' + KIND[m[0]] + (st === 'lock' ? ' · terkunci' : '') + '</small></span></a></li>';
    });
    list.innerHTML = html + '</ol>';
  }
  function renderProgress() {
    var c = count(), p = Math.round(100 * c / N);
    document.getElementById('bar').style.width = p + '%';
    document.getElementById('pct').textContent = p + '%';
    document.getElementById('sBar').style.width = p + '%';
    document.getElementById('sText').textContent = c + ' dari ' + N + ' pelajaran selesai';
    document.getElementById('hBar').style.width = p + '%';
    document.getElementById('hCount').textContent = c;
    var st = document.getElementById('hStart');
    st.textContent = c === 0 ? 'Mulai belajar' : (c === N ? 'Buka pelajaran terakhir' : 'Lanjutkan belajar');
    st.setAttribute('href', '#l' + (nextIdx() + 1));
    document.getElementById('donePanel').hidden = c !== N;
  }

  /* views */
  var views = [].slice.call(document.querySelectorAll('.view, .lesson'));
  function show(id) {
    views.forEach(function (v) { v.hidden = v.id !== id; });
  }
  function closeSide() { side.classList.remove('open'); document.getElementById('back').classList.remove('on'); }
  function route() {
    var m = /^#l(\d+)$/.exec(location.hash), n = m ? +m[1] : 0;
    if (n >= 1 && n <= N) {
      if (!open(n)) { location.replace('#l' + (nextIdx() + 1)); return; }
      cur = n; show('L' + n); refreshNav(n);
    } else { cur = 0; show('home'); }
    renderCurr(); renderProgress(); closeSide();
    window.scrollTo(0, 0);
    var f = cur ? document.querySelector('#L' + cur + ' .lt') : document.querySelector('#home h1');
    if (f) { f.setAttribute('tabindex', '-1'); try { f.focus({ preventScroll: true }); } catch (err) {} }
  }
  function refreshNav(n) {
    var a = document.getElementById('L' + n);
    var prev = a.querySelector('[data-prev]'), nx = a.querySelector('[data-done]');
    prev.hidden = n === 1;
    nx.textContent = n === N ? (done[n - 1] ? 'Kembali ke awal kursus' : 'Selesaikan kursus') : (done[n - 1] ? 'Lanjut' : 'Selesai & lanjut');
  }
  window.addEventListener('hashchange', route);

  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-prev]'))) { location.hash = '#l' + (cur - 1); return; }
    if ((t = e.target.closest('[data-done]'))) {
      done[cur - 1] = true; save();
      location.hash = cur === N ? '#home' : '#l' + (cur + 1);
      if (cur === N) { cur = 0; route(); }
      return;
    }
    if (e.target.closest('[data-open-side]')) { side.classList.add('open'); document.getElementById('back').classList.add('on'); return; }
    if (e.target.closest('[data-close-side]')) { closeSide(); return; }
    var lk = e.target.closest('a.locked');
    if (lk) { e.preventDefault(); return; }
    /* tabs */
    t = e.target.closest('[role="tab"]');
    if (t) {
      var bar = t.parentNode, scope = bar.parentNode;
      [].forEach.call(bar.querySelectorAll('[role="tab"]'), function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
      [].forEach.call(scope.querySelectorAll('[role="tabpanel"]'), function (p) { p.hidden = p.id !== t.getAttribute('aria-controls'); });
      return;
    }
    /* copy */
    var btn = e.target.closest('.copy');
    if (btn) {
      var pre = btn.closest('.prompt').querySelector('pre');
      var finish = function (ok) {
        if (!ok) { var r = document.createRange(); r.selectNodeContents(pre); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
        btn.textContent = ok ? 'Tersalin' : 'Tekan salin';
        btn.classList.toggle('done', ok);
        setTimeout(function () { btn.textContent = 'Salin'; btn.classList.remove('done'); }, 1800);
      };
      try { navigator.clipboard.writeText(pre.textContent).then(function () { finish(true); }, function () { finish(false); }); }
      catch (err) { finish(false); }
    }
  });
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d.open || !d.parentNode.classList.contains('plist')) return;
    [].forEach.call(d.parentNode.querySelectorAll('details[open]'), function (o) { if (o !== d) o.open = false; });
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSide(); });

  /* two-step reset */
  var rs = document.getElementById('reset'), armT = null;
  rs.addEventListener('click', function () {
    if (!rs.dataset.arm) {
      rs.dataset.arm = '1'; rs.textContent = 'Yakin? Tekan sekali lagi buat hapus progres';
      armT = setTimeout(function () { delete rs.dataset.arm; rs.textContent = 'Ulangi dari awal (hapus progres)'; }, 4000);
      return;
    }
    clearTimeout(armT); delete rs.dataset.arm; rs.textContent = 'Ulangi dari awal (hapus progres)';
    done = done.map(function () { return false; }); save(); renderCurr(); renderProgress();
  });

  route();
})();
