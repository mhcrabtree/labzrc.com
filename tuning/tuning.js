(function () {
  'use strict';

  /* ── Adjustment data (diagram pop-ups) ───────────────── */
  var ADJ = {
    shockTop: {
      title: 'Shock top position (tower)',
      more: 'Moving the tops <strong>closer together</strong> (more lean-in) softens the effective spring rate and increases body roll. The car feels smoother and gains grip on bumpy or low-bite tracks.',
      less: 'Moving the tops <strong>further apart</strong> (more upright) firms the effective rate and reduces roll. The car reacts faster and is better on smooth, high-bite tracks, but it can feel edgy.',
      page: 'shock-position.html', label: 'Shock position'
    },
    shockBottom: {
      title: 'Shock bottom position (arm)',
      more: 'Moving the bottom <strong>outward</strong> (toward the wheel) firms the effective rate and gives a quicker response.',
      less: 'Moving the bottom <strong>inward</strong> softens the effective rate and gives more traction over bumps. Combine with the top position to fine-tune; both changes stack.',
      page: 'shock-position.html', label: 'Shock position'
    },
    springs: {
      title: 'Springs (front / rear)',
      more: '<strong>Firmer front</strong>: quicker turn-in, less front grip over bumps. <strong>Firmer rear</strong>: more rear steering response, less rear traction, snappier on jumps.',
      less: '<strong>Softer front</strong>: more front grip and steering at entry, slower response. <strong>Softer rear</strong>: more rear traction on power, more roll and squat.',
      page: 'springs.html', label: 'Springs'
    },
    oil: {
      title: 'Shock oil weight',
      more: '<strong>Thicker oil</strong> slows the damper: the chassis moves more slowly, which suits high-bite smooth tracks and big jumps.',
      less: '<strong>Thinner oil</strong> lets the chassis move faster, which finds grip on rough, low-bite tracks but can feel loose and bottom out.',
      page: 'shock-oil.html', label: 'Shock oil'
    },
    pistons: {
      title: 'Pistons and hole sizes',
      more: '<strong>Smaller holes or fewer holes</strong> add damping, much like thicker oil but with a different feel on small versus large bumps.',
      less: '<strong>Bigger holes</strong> reduce damping. Hole size and oil weight work together, so change one at a time.',
      page: 'pistons.html', label: 'Pistons'
    },
    diff: {
      title: 'Differentials (front / center / rear)',
      more: '<strong>Thicker diff oil</strong> locks that axle more: more forward drive, less rotation. Rear thicker usually means more on-power push or straighter exits. Center thicker splits power more evenly front to rear.',
      less: '<strong>Thinner diff oil</strong> lets the wheels spin more independently: more rotation and turn-in, more chance of one wheel spinning on exit.',
      page: 'diffs.html', label: 'Diffs'
    },
    antisquat: {
      title: 'Anti-squat (rear pills / inserts)',
      more: '<strong>More anti-squat</strong> reduces rear squat on throttle. The rear unloads a little under power, so you get more on-power steering and flatter jumps.',
      less: '<strong>Less anti-squat</strong> lets the rear squat and hook up. You get more rear traction under power but less on-power steering.',
      page: 'anti-squat.html', label: 'Anti-squat'
    },
    kickup: {
      title: 'Front kickup',
      more: '<strong>More kickup</strong> improves how the front climbs bumps and adds on-power steering response. It can make the front feel less stable on the brakes.',
      less: '<strong>Less kickup</strong> gives a calmer, more stable front under braking and off-power, but the nose can dig in over rough sections.',
      page: 'anti-squat.html', label: 'Kickup'
    },
    caster: {
      title: 'Caster',
      more: '<strong>More caster</strong> adds straight-line stability and on-power or mid-corner steering, with less initial turn-in.',
      less: '<strong>Less caster</strong> gives more initial turn-in and off-power steering, but the car wanders more on the straight.',
      page: 'links-alignment.html', label: 'Links and alignment'
    },
    camber: {
      title: 'Camber',
      more: '<strong>More negative camber</strong> (top leaning in) increases mid-corner side bite but reduces straight-line and braking grip, and can wear the inside edge.',
      less: '<strong>Less negative camber</strong> gives a flatter contact patch for braking and acceleration, and it lets the tire stay cooler on high bite.',
      page: 'links-alignment.html', label: 'Links and alignment'
    },
    toe: {
      title: 'Toe (front / rear)',
      more: '<strong>Front toe-out</strong> sharpens turn-in but reduces straight-line stability. <strong>Rear toe-in</strong> adds stability and rear grip on exit.',
      less: '<strong>Front toe-in</strong> calms the car but slows turn-in. <strong>Less rear toe-in</strong> frees the rear and speeds rotation, but the car can snap loose.',
      page: 'links-alignment.html', label: 'Links and alignment'
    },
    links: {
      title: 'Turnbuckles / upper links',
      more: '<strong>Longer upper link</strong> (less camber gain): calmer, less grip change as the car rolls. Mounting the link lower on the tower or hub also changes roll center.',
      less: '<strong>Shorter upper link</strong> (more camber gain): more grip when rolled and more steering, but it can feel sensitive and edgy.',
      page: 'links-alignment.html', label: 'Links and alignment'
    },
    tires: {
      title: 'Tires and compound',
      more: '<strong>Softer compound</strong> gives more grip until it overheats or chunks. <strong>Slicks</strong> are best on very smooth, high-bite clay.',
      less: '<strong>Firmer compound</strong> lasts longer and stays consistent on high bite. <strong>Treaded tires</strong> bite when the surface is dry, dusty, or loose.',
      page: 'tires.html', label: 'Tires'
    }
  };
  window.TL_ADJ = ADJ;

  /* ── Modal ───────────────────────────────────────────── */
  var bg = document.getElementById('modal-bg');
  var box = document.getElementById('modal-box');
  function openAdj(id) {
    var a = ADJ[id]; if (!a || !bg) return;
    box.innerHTML = '<button class="x" aria-label="Close">&times;</button>' +
      '<h3>' + a.title + '</h3>' +
      '<div class="vs"><div class="up"><h4>Increase / more</h4><p>' + a.more + '</p></div>' +
      '<div class="down"><h4>Decrease / less</h4><p>' + a.less + '</p></div></div>' +
      '<p><a class="chip" href="' + a.page + '">Open the ' + a.label + ' page &rarr;</a></p>';
    bg.classList.add('open');
    box.querySelector('.x').onclick = closeAdj;
    box.querySelector('.x').focus();
  }
  function closeAdj() { bg.classList.remove('open'); }
  if (bg) {
    bg.addEventListener('click', function (e) { if (e.target === bg) closeAdj(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAdj(); });
    document.querySelectorAll('.hot').forEach(function (h) {
      h.addEventListener('click', function () { openAdj(h.getAttribute('data-adj')); });
      h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAdj(h.getAttribute('data-adj')); } });
    });
    document.querySelectorAll('[data-open]').forEach(function (b) {
      b.addEventListener('click', function () { openAdj(b.getAttribute('data-open')); });
    });
  }

  /* ── Wizard ──────────────────────────────────────────── */
  var wiz = document.getElementById('wiz');
  if (!wiz) return;

  var SETUPS = {
    '4wd': {
      label: '4WD buggy, 17.5 stock',
      high: { oilF: '30-35wt (Kyosho #350-#400)', oilR: '27.5-32.5wt (Kyosho #300-#350)', springF: 'Medium to medium-firm', springR: 'Medium', piston: '3-hole 1.6 front, 3-hole 1.6 to 1.7 rear (start on kit pistons)', diffF: '5,000-7,000 (ZX-7.5 kit: 7,000)', diffC: 'Kit ZX-7.5: 200,000 (varies by car)', diffR: '3,000-5,000 (ZX-7.5 kit: 5,000)', camberF: '-1.5 to -2', camberR: '-1 to -1.5', toeF: '0 to 1 out', toeR: '2-3 in', antisquat: '1-2 deg start, then adjust', note: 'Smooth, tacky, blue-groove clay: keep the car low, firm, and quick to react.' },
      med: { oilF: '27.5-32.5wt (Kyosho #300-#350)', oilR: '25-30wt (Kyosho #300)', springF: 'Medium', springR: 'Medium-soft', piston: '3-hole 1.7 front, 3-hole 1.7 to 1.8 rear', diffF: '3,000-5,000', diffC: 'Start at the kit value; go thinner for more rotation', diffR: '2,000-4,000', camberF: '-1 to -1.5', camberR: '-1', toeF: '0 to 1 out', toeR: '2-3 in', antisquat: '2-3 deg', note: 'Medium bite or a little dusty: go slightly softer and thinner to find grip.' },
      low: { oilF: '25-30wt', oilR: '22.5-27.5wt', springF: 'Soft to medium-soft', springR: 'Soft', piston: '3-hole 1.8 to 2.0', diffF: '2,000-3,000', diffC: 'Thinner than kit, one step at a time', diffR: '1,000-3,000', camberF: '-1', camberR: '-0.5 to -1', toeF: '1 out', toeR: '3 in', antisquat: '3 deg', note: 'Dry, slick, or loose: more roll, thinner diffs, treaded tires.' }
    },
    '2wd': {
      label: '2WD buggy, 17.5 stock',
      high: { oilF: '30-35wt', oilR: '30-35wt', springF: 'Medium to medium-firm', springR: 'Medium', piston: '2-hole 1.6 to 1.7 front, 3-hole 1.6 rear (on kit pistons)', diffF: 'n/a (front is one-way or ball)', diffC: 'n/a', diffR: 'Gear diff 4,000-7,000 (ball diff: tighten to taste)', camberF: '-1.5 to -2', camberR: '-1 to -1.5', toeF: '0 to 1 out', toeR: '3 in', antisquat: '1-2 deg', note: 'Smooth clay: thicker oil and a tighter rear diff keep the 2WD steady on power.' },
      med: { oilF: '27.5-32.5wt', oilR: '27.5-32.5wt', springF: 'Medium', springR: 'Medium-soft', piston: '2-hole 1.7 front, 3-hole 1.7 rear', diffF: 'n/a', diffC: 'n/a', diffR: 'Gear diff 3,000-5,000', camberF: '-1 to -1.5', camberR: '-1', toeF: '0 to 1 out', toeR: '3 in', antisquat: '2-3 deg', note: 'Medium bite: softer, thinner, and a looser rear diff.' },
      low: { oilF: '25-30wt', oilR: '25-30wt', springF: 'Soft to medium-soft', springR: 'Soft', piston: '2-hole 1.8 to 2.0', diffF: 'n/a', diffC: 'n/a', diffR: 'Gear diff 2,000-4,000', camberF: '-1', camberR: '-0.5 to -1', toeF: '1 out', toeR: '3 in', antisquat: '3 deg', note: 'Loose or dusty: more roll and more rear traction.' }
    }
  };

  function row(l, v) { return '<tr><td>' + l + '</td><td>' + v + '</td></tr>'; }
  function render() {
    var d = wiz.querySelector('[name=drive]:checked').value;
    var t = wiz.querySelector('[name=track]:checked').value;
    var s = SETUPS[d][t];
    var rows = row('Shock oil (front)', s.oilF) + row('Shock oil (rear)', s.oilR) + row('Springs (front)', s.springF) + row('Springs (rear)', s.springR) +
      row('Pistons', s.piston) + row('Front diff', s.diffF) + row('Center diff', s.diffC) + row('Rear diff', s.diffR) +
      row('Camber (F / R, deg)', s.camberF + ' / ' + s.camberR) + row('Toe (F / R, deg)', s.toeF + ' / ' + s.toeR) + row('Anti-squat', s.antisquat);
    document.getElementById('wiz-out').innerHTML =
      '<h3>' + SETUPS[d].label + '</h3><p>' + s.note + '</p>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Setting</th><th>Starting point</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="meta">Starting points assembled from general guidance, not measured results. Change one thing at a time and keep notes.</p>';
  }
  wiz.addEventListener('change', render);
  render();
})();
