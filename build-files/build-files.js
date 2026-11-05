(function () {
  'use strict';

  var B = window.BUILD;
  if (!B) return;

  document.documentElement.style.setProperty('--lz-accent', B.accentColor || '#1E88E5');

  var root = document.getElementById('lz-root');
  if (!root) return;

  root.innerHTML = renderHeader() + renderPage();
  bindGallery();

  /* ── Renderers ─────────────────────────────────────── */

  function renderHeader() {
    return (
      '<div class="lz-header">' +
        '<a href="../../index.html"><img src="../../logo.png" alt="LABZ RC"></a>' +
        '<span class="lz-header-title">Build Files</span>' +
        '<span class="lz-header-spacer"></span>' +
        '<a href="../index.html" class="lz-header-back">← All Builds</a>' +
      '</div>'
    );
  }

  function renderPage() {
    return (
      '<div class="lz-page">' +
        renderSubtitle() +
        renderStatus() +
        '<div class="lz-boxart">' +
          renderFrontPanel() +
          renderBackPanel() +
        '</div>' +
        renderBackstorySection() +
        renderGallerySection() +
        renderPartsSection() +
        renderNotesSection() +
        renderVideoSection() +
        renderFooter() +
      '</div>'
    );
  }

  // status: "in-progress" marks a build file that's still being written.
  function renderStatus() {
    if (B.status !== 'in-progress') return '';
    return '<div class="lz-status"><strong>In the garage</strong>This build file is still being written. Story, photos, and art are on the way.</div>';
  }

  function renderSubtitle() {
    return (
      '<div class="lz-page-subtitle">' +
        '<div class="lz-page-subtitle-label">LABZ RC — Build File</div>' +
        '<div class="lz-page-subtitle-detail">' + esc(B.chassis) + ' · ' + esc(B.raceClass) + '</div>' +
      '</div>'
    );
  }

  /* ── Front Panel ───────────────────────────────────── */

  function renderFrontPanel() {
    return (
      '<div class="lz-panel">' +
        '<div class="lz-panel-grain"></div>' +
        '<div class="lz-front-banner">' +
          '<img src="../../logo.png" alt="LABZ RC">' +
          '<div class="lz-front-banner-tagline">BUILT TO RACE. BORN TO STORY.</div>' +
        '</div>' +
        '<div class="lz-front-badge-row">' +
          '<div class="lz-front-badge">' + esc(B.raceClass).toUpperCase() + ' ROSTER · NO. ' + esc(B.fileNumber) + '</div>' +
        '</div>' +
        '<div class="lz-front-title-block">' +
          '<div class="lz-front-name">' + esc(B.name) + '</div>' +
          '<div class="lz-front-accent-bar"></div>' +
          '<div class="lz-front-class">' + esc(B.subtitle) + ' · ' + esc(B.classDesignation) + '</div>' +
        '</div>' +
        renderFrontArt() +
        '<div class="lz-front-footer">' +
          '<span>' + esc(B.chassis).toUpperCase() + '</span>' +
          '<span class="lz-front-footer-accent">LABZRC.COM</span>' +
        '</div>' +
      '</div>'
    );
  }

  // No robot art yet: the vehicle photo fills the front panel, with no mode labels.
  function renderFrontArt() {
    var robot = B.images && B.images.robotMode;
    if (!robot) return renderFrontPhoto();
    return renderFrontRobot(robot) + renderFrontVehicle();
  }

  function renderFrontPhoto() {
    var img = B.images && B.images.vehicleMode;
    var inner = img
      ? '<img src="' + esc(img) + '" alt="' + esc(B.name) + '">'
      : '<div class="lz-placeholder">Photos<br>Coming Soon</div>';
    return '<div class="lz-front-photo">' + inner + '</div>';
  }

  function renderFrontRobot(img) {
    var inner = '<img src="' + esc(img) + '" alt="' + esc(B.name) + ' — Robot Mode">';
    return (
      '<div class="lz-front-robot">' +
        inner +
        '<div class="lz-front-robot-label">ROBOT MODE</div>' +
      '</div>'
    );
  }

  function renderFrontVehicle() {
    var img = B.images && B.images.vehicleMode;
    var inner = img
      ? '<img src="' + esc(img) + '" alt="' + esc(B.name) + ' — Vehicle Mode">'
      : '<div class="lz-placeholder" style="aspect-ratio:4/3">Vehicle Mode</div>';
    return (
      '<div class="lz-front-vehicle">' +
        inner +
        '<div class="lz-front-vehicle-label">VEHICLE MODE</div>' +
      '</div>'
    );
  }

  /* ── Back Panel ────────────────────────────────────── */

  function renderBackPanel() {
    return (
      '<div class="lz-panel">' +
        '<div class="lz-panel-grain"></div>' +
        '<div class="lz-back-header">' +
          '<img src="../../logo.png" alt="LABZ RC">' +
          '<div class="lz-back-header-file">FILE ' + esc(B.fileNumber) + ' — ' + esc(B.name) + '</div>' +
        '</div>' +
        '<div class="lz-back-tech-banner">' +
          '<div class="lz-back-tech-banner-title">TECH SPECIFICATIONS</div>' +
        '</div>' +
        renderDiagram() +
        renderStory() +
        renderStats() +
        renderSpecs() +
        '<div class="lz-back-footer">' +
          '<div class="lz-back-footer-diamond"></div>' +
          '<div class="lz-back-footer-text">LABZRC.COM · BUILT TO RACE. BORN TO STORY.</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderDiagram() {
    var callouts = B.callouts || [];
    if (!B.images || !B.images.featureDiagram) return '';

    var dots = '';
    var legend = '';
    for (var i = 0; i < callouts.length; i++) {
      var c = callouts[i];
      dots += '<div class="lz-callout-dot" style="top:' + esc(c.top) + ';left:' + esc(c.left) + '">' + esc(String(c.n)) + '<span class="lz-callout-tip">' + esc(c.label) + '</span></div>';
      legend += '<div><span class="lz-callout-legend-num">' + esc(String(c.n)) + '.</span> ' + esc(c.label) + '</div>';
    }

    return (
      '<div class="lz-back-diagram">' +
        '<div class="lz-back-diagram-frame">' +
          '<img src="' + esc(B.images.featureDiagram) + '" alt="' + esc(B.name) + '">' +
          dots +
        '</div>' +
        (legend ? '<div class="lz-callout-legend">' + legend + '</div>' : '') +
      '</div>'
    );
  }

  function renderStory() {
    if (!B.story) return '';
    return (
      '<div class="lz-back-story">' +
        '<div class="lz-back-story-function">FUNCTION: ' + esc(B.functionLabel || B.subtitle).toUpperCase() + '</div>' +
        '<div class="lz-back-story-body">' +
          (B.tagline ? '<div class="lz-back-story-tagline">“' + esc(B.tagline) + '”</div>' : '') +
          '<div class="lz-back-story-text">' + esc(B.story) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderStats() {
    var stats = B.stats || [];
    if (!stats.length) return '';
    var rows = '';
    for (var i = 0; i < stats.length; i++) {
      var s = stats[i];
      var pips = '';
      for (var j = 0; j < 10; j++) {
        pips += '<div class="lz-pip' + (j < s.value ? ' on' : '') + '"></div>';
      }
      rows += (
        '<div class="lz-stat-row">' +
          '<div class="lz-stat-label">' + esc(s.label) + '</div>' +
          '<div class="lz-stat-bar">' + pips + '</div>' +
        '</div>'
      );
    }
    return '<div class="lz-back-stats">' + rows + '</div>';
  }

  function renderSpecs() {
    var specs = B.specs || [];
    if (!specs.length) return '';
    var items = '';
    for (var i = 0; i < specs.length; i++) {
      var s = specs[i];
      var wide = s.wide ? ' class="lz-back-specs-wide"' : '';
      items += '<div' + wide + '><span class="lz-spec-label">' + esc(s.label) + '</span> ' + esc(s.value) + '</div>';
    }
    return '<div class="lz-back-specs">' + items + '</div>';
  }

  /* ── Gallery ───────────────────────────────────────── */

  function renderGallerySection() {
    var gallery = B.images && B.images.gallery;
    if (!gallery || !gallery.length) return '';

    var items = '';
    for (var i = 0; i < gallery.length; i++) {
      var g = gallery[i];
      items += (
        '<div class="lz-gallery-item" data-lz-gallery="' + i + '">' +
          '<img src="' + esc(g.src) + '" alt="' + esc(g.caption || '') + '" loading="lazy">' +
          (g.caption ? '<div class="lz-gallery-caption">' + esc(g.caption) + '</div>' : '') +
        '</div>'
      );
    }

    return (
      '<div class="lz-section">' +
        sectionHeader('Build Gallery') +
        '<div class="lz-gallery">' + items + '</div>' +
      '</div>' +
      '<div class="lz-lightbox" id="lz-lightbox">' +
        '<button class="lz-lightbox-close" id="lz-lightbox-close">×</button>' +
        '<img id="lz-lightbox-img" src="" alt="">' +
        '<div class="lz-lightbox-caption" id="lz-lightbox-caption"></div>' +
      '</div>'
    );
  }

  function bindGallery() {
    var gallery = B.images && B.images.gallery;
    if (!gallery || !gallery.length) return;

    var lightbox = document.getElementById('lz-lightbox');
    var lbImg = document.getElementById('lz-lightbox-img');
    var lbCap = document.getElementById('lz-lightbox-caption');
    var lbClose = document.getElementById('lz-lightbox-close');

    if (!lightbox) return;

    var items = document.querySelectorAll('[data-lz-gallery]');
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', (function (idx) {
        return function () {
          var g = gallery[idx];
          // Show the cached gallery image right away, then swap in the full-size file when it loads.
          lbImg.src = g.src;
          if (g.full) {
            var hi = new Image();
            hi.onload = function () { if (lbImg.getAttribute('data-idx') === String(idx)) lbImg.src = g.full; };
            hi.src = g.full;
          }
          lbImg.setAttribute('data-idx', String(idx));
          lbImg.alt = g.caption || '';
          lbCap.textContent = g.caption || '';
          lbCap.style.display = g.caption ? '' : 'none';
          lightbox.classList.add('open');
        };
      })(i));
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lbClose) {
        lightbox.classList.remove('open');
        lbImg.removeAttribute('data-idx');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* ── Parts List & Setup Notes ──────────────────────── */

  // parts: [{ name, partNo, qty, note }] — everything but name is optional.
  function renderPartsSection() {
    var parts = B.parts;
    if (!parts || !parts.length) return '';

    var rows = '';
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      rows += (
        '<div class="lz-part">' +
          '<div class="lz-part-head">' +
            '<span class="lz-part-name">' + (p.qty > 1 ? esc(String(p.qty)) + ' × ' : '') + esc(p.name) + '</span>' +
            (p.partNo ? '<span class="lz-part-no">' + esc(p.partNo) + '</span>' : '') +
          '</div>' +
          (p.note ? '<div class="lz-part-note">' + esc(p.note) + '</div>' : '') +
        '</div>'
      );
    }

    return (
      '<div class="lz-section">' +
        sectionHeader('Parts List') +
        '<div class="lz-parts">' + rows + '</div>' +
      '</div>'
    );
  }

  // backstory: ["paragraph", "paragraph"] — the builder's own history with the car.
  function renderBackstorySection() {
    var paras = B.backstory;
    if (!paras || !paras.length) return '';

    var body = '';
    for (var i = 0; i < paras.length; i++) {
      body += '<p>' + esc(paras[i]) + '</p>';
    }

    return (
      '<div class="lz-section">' +
        sectionHeader('Backstory') +
        '<div class="lz-backstory">' + body + '</div>' +
      '</div>'
    );
  }

  // setupNotes: ["...", "..."] — what was changed and why.
  function renderNotesSection() {
    var notes = B.setupNotes;
    if (!notes || !notes.length) return '';

    var items = '';
    for (var i = 0; i < notes.length; i++) {
      items += '<li>' + esc(notes[i]) + '</li>';
    }

    return (
      '<div class="lz-section">' +
        sectionHeader('Setup Notes') +
        '<ul class="lz-notes">' + items + '</ul>' +
      '</div>'
    );
  }

  /* ── Videos ────────────────────────────────────────── */

  function renderVideoSection() {
    var videos = B.videos;
    if (!videos || !videos.length) return '';

    var cards = '';
    for (var i = 0; i < videos.length; i++) {
      var v = videos[i];
      cards += (
        '<div class="lz-video-card">' +
          ytFacade(v.youtubeId, v.title) +
          '<div class="lz-video-card-title">' + esc(v.title) + '</div>' +
        '</div>'
      );
    }

    return (
      '<div class="lz-section">' +
        sectionHeader('Videos') +
        '<div class="lz-videos">' + cards + '</div>' +
      '</div>'
    );
  }

  /* ── Footer ────────────────────────────────────────── */

  function renderFooter() {
    return (
      '<div class="lz-page-footer">' +
        '© 2026 <a href="https://craz.com">Crabtree Labz</a> · <a href="https://craz.com/privacy.html">Privacy</a>' +
      '</div>'
    );
  }

  /* ── Util ──────────────────────────────────────────── */

  function sectionHeader(title) {
    return (
      '<div class="lz-section-header">' +
        '<div class="lz-section-header-line"></div>' +
        '<div class="lz-section-header-title">' + esc(title) + '</div>' +
        '<div class="lz-section-header-line"></div>' +
      '</div>'
    );
  }

  /* ── Click-to-load YouTube ────────────────────────────
     Nothing loads from YouTube until the visitor presses play
     (our privacy policy promises no third-party requests on page load).
     ytFacade(id, title) returns the button; one click handler swaps in
     YouTube's privacy-enhanced player. */
  function ytFacade(id, title) {
    return '<button type="button" class="yt-facade" data-youtube="' + esc(id) + '" data-title="' + esc(title || '') + '"' +
      ' aria-label="Play video' + (title ? ': ' + esc(title) : '') + '">' +
      '<span class="yt-play" aria-hidden="true">▶</span>' +
      '<span class="yt-note">Play video · loads from YouTube</span></button>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.yt-facade') : null;
    if (!b) return;
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(b.getAttribute('data-youtube')) + '?autoplay=1&rel=0';
    f.title = b.getAttribute('data-title') || 'Video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.className = 'yt-frame';
    b.parentNode.replaceChild(f, b);
  });

  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }

})();
