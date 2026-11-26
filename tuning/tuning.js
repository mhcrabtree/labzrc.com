(function () {
  'use strict';

  /* ── Diagram pop-ups: what an adjustment does at the front and rear ── */
  var ADJ = window.TL_ADJ || {};
  var ORDER = window.TL_ORDER || [];
  var bg = document.getElementById('modal-bg');
  var box = document.getElementById('modal-box');
  var current = null;

  function esc(s) { var d = document.createElement('div'); d.appendChild(document.createTextNode(s)); return d.innerHTML; }

  function list(items) {
    return items.map(function (b) { return '<li><strong>' + esc(b[0]) + ':</strong> ' + esc(b[1]) + '</li>'; }).join('');
  }

  function endBlock(e) {
    return '<div class="vs">' +
      '<div class="up"><h4>' + esc(e.up_title) + '</h4><ul>' + list(e.up) + '</ul></div>' +
      '<div class="down"><h4>' + esc(e.down_title) + '</h4><ul>' + list(e.down) + '</ul></div></div>';
  }

  function render(id, tab) {
    var a = ADJ[id]; if (!a || !box) return;
    current = { id: id, tab: tab };
    var order = a.ends_order;
    var tabs = '<div class="tabs" role="tablist">';
    order.forEach(function (end) {
      tabs += '<button class="tab ' + end[0] + (tab === end ? ' on' : '') + '" data-tab="' + end + '" role="tab">' + esc(a.ends[end].label) + '</button>';
    });
    if (order.length > 1) tabs += '<button class="tab' + (tab === 'compare' ? ' on' : '') + '" data-tab="compare" role="tab">Compare</button>';
    tabs += '</div>';

    var body;
    if (tab === 'compare') {
      body = '<div class="compare">' + order.map(function (end) {
        return '<div class="cmp ' + end[0] + '"><h4>' + esc(a.ends[end].label) + '</h4>' + endBlock(a.ends[end]) + '</div>';
      }).join('') + '</div>';
    } else {
      body = endBlock(a.ends[tab]);
    }

    box.innerHTML = '<button class="x" aria-label="Close">&times;</button>' +
      '<h3>' + (ORDER.indexOf(id) + 1) + '. ' + esc(a.title) + '</h3>' +
      '<p>' + esc(a.what) + '</p>' + tabs + body +
      (a.note ? '<p class="meta">' + esc(a.note) + '</p>' : '') +
      '<p><a class="chip" href="' + a.page + '">Open the ' + esc(a.pageLabel) + ' page &rarr;</a></p>';
    box.querySelector('.x').onclick = close;
    box.querySelectorAll('.tab').forEach(function (t) {
      t.onclick = function () { render(id, t.getAttribute('data-tab')); };
    });
  }

  function open(id, end) {
    var a = ADJ[id]; if (!a || !bg) return;
    render(id, end && a.ends_order.indexOf(end) >= 0 ? end : a.ends_order[0]);
    bg.classList.add('open');
    var x = box.querySelector('.x'); if (x) x.focus();
  }
  function close() { if (bg) bg.classList.remove('open'); }

  if (bg) {
    bg.addEventListener('click', function (e) { if (e.target === bg) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.querySelectorAll('.hot').forEach(function (h) {
      var go = function () { open(h.getAttribute('data-adj'), h.getAttribute('data-end')); };
      h.addEventListener('click', go);
      h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    document.querySelectorAll('[data-open]').forEach(function (b) {
      b.addEventListener('click', function () { open(b.getAttribute('data-open')); });
    });
  }

  /* ── Wizard ──────────────────────────────────────────── */
  var wiz = document.getElementById('wiz');
  if (!wiz) return;

  var SETUPS = {
    '4wd': {
      label: '4WD buggy, 17.5 stock',
      high: { oilF: '30-35wt (Kyosho #350-#400)', oilR: '27.5-32.5wt (Kyosho #300-#350)', springF: 'Medium to medium-firm', springR: 'Medium', piston: '3-hole 1.6 front, 3-hole 1.6 to 1.7 rear (start on kit pistons)', diffF: '5,000-7,000', diffC: 'Per your kit; some cars use a very thick oil here', diffR: '3,000-5,000', camberF: '-1.5 to -2', camberR: '-1 to -1.5', toeF: '0 to 1 out', toeR: '2-3 in', antisquat: '1-2 deg rear to start', note: 'Smooth, tacky, blue-groove clay: keep the car low, firm, and quick to react.' },
      med: { oilF: '27.5-32.5wt (Kyosho #300-#350)', oilR: '25-30wt (Kyosho #300)', springF: 'Medium', springR: 'Medium-soft', piston: '3-hole 1.7 front, 3-hole 1.7 to 1.8 rear', diffF: '3,000-5,000', diffC: 'Start at your kit value; go thinner for more rotation', diffR: '2,000-4,000', camberF: '-1 to -1.5', camberR: '-1', toeF: '0 to 1 out', toeR: '2-3 in', antisquat: '2-3 deg rear', note: 'Medium bite or a little dusty: go slightly softer and thinner to find grip.' },
      low: { oilF: '25-30wt', oilR: '22.5-27.5wt', springF: 'Soft to medium-soft', springR: 'Soft', piston: '3-hole 1.8 to 2.0', diffF: '2,000-3,000', diffC: 'Thinner than your kit value, one step at a time', diffR: '1,000-3,000', camberF: '-1', camberR: '-0.5 to -1', toeF: '1 out', toeR: '3 in', antisquat: '3 deg rear', note: 'Dry, slick, or loose: more roll, thinner diffs, treaded tires.' }
    },
    '2wd': {
      label: '2WD buggy, 17.5 stock',
      high: { oilF: '30-35wt', oilR: '30-35wt', springF: 'Medium to medium-firm', springR: 'Medium', piston: '2-hole 1.6 to 1.7 front, 3-hole 1.6 rear (on kit pistons)', diffF: 'None (front is not driven)', diffC: 'None', diffR: 'Gear diff 4,000-7,000 (ball diff: tighten to taste)', camberF: '-1.5 to -2', camberR: '-1 to -1.5', toeF: '0 to 1 out', toeR: '3 in', antisquat: '1-2 deg rear', note: 'Smooth clay: thicker oil and a tighter rear diff keep the 2WD steady on power.' },
      med: { oilF: '27.5-32.5wt', oilR: '27.5-32.5wt', springF: 'Medium', springR: 'Medium-soft', piston: '2-hole 1.7 front, 3-hole 1.7 rear', diffF: 'None', diffC: 'None', diffR: 'Gear diff 3,000-5,000', camberF: '-1 to -1.5', camberR: '-1', toeF: '0 to 1 out', toeR: '3 in', antisquat: '2-3 deg rear', note: 'Medium bite: softer, thinner, and a looser rear diff.' },
      low: { oilF: '25-30wt', oilR: '25-30wt', springF: 'Soft to medium-soft', springR: 'Soft', piston: '2-hole 1.8 to 2.0', diffF: 'None', diffC: 'None', diffR: 'Gear diff 2,000-4,000', camberF: '-1', camberR: '-0.5 to -1', toeF: '1 out', toeR: '3 in', antisquat: '3 deg rear', note: 'Loose or dusty: more roll and more rear traction.' }
    }
  };

  function row(l, f, r) { return '<tr><td>' + l + '</td><td>' + f + '</td><td>' + r + '</td></tr>'; }
  function render2() {
    var d = wiz.querySelector('[name=drive]:checked').value;
    var t = wiz.querySelector('[name=track]:checked').value;
    var s = SETUPS[d][t];
    var rows = row('Shock oil', s.oilF, s.oilR) + row('Springs', s.springF, s.springR) +
      '<tr><td>Pistons</td><td colspan="2">' + s.piston + '</td></tr>' +
      row('Differentials', s.diffF + ' (front) / ' + s.diffC + ' (center)', s.diffR) +
      row('Camber (degrees)', s.camberF, s.camberR) + row('Toe (degrees)', s.toeF, s.toeR) +
      row('Kick-up / anti-squat', 'Mid kick-up', s.antisquat);
    document.getElementById('wiz-out').innerHTML =
      '<h3>' + SETUPS[d].label + '</h3><p>' + s.note + '</p>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Setting</th><th>Front</th><th>Rear</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="meta">Starting points assembled from general guidance, not measured results. Change one thing at a time, and the front and rear separately.</p>';
  }
  wiz.addEventListener('change', render2);
  render2();
})();
