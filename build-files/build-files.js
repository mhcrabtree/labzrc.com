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
        '<a href="../../index.html"><img src="../logo.png" alt="LABZ RC"></a>' +
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
        '<div class="lz-boxart">' +
          renderFrontPanel() +
          renderBackPanel() +
        '</div>' +
        renderGallerySection() +
        renderVideoSection() +
        renderFooter() +
      '</div>'
    );
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
          '<img src="../logo.png" alt="LABZ RC">' +
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
        renderFrontRobot() +
        renderFrontVehicle() +
        '<div class="lz-front-footer">' +
          '<span>' + esc(B.chassis).toUpperCase() + '</span>' +
          '<span class="lz-front-footer-accent">LABZRC.COM</span>' +
        '</div>' +
      '</div>'
    );
  }

  function renderFrontRobot() {
    var img = B.images && B.images.robotMode;
    var inner = img
      ? '<img src="' + esc(img) + '" alt="' + esc(B.name) + ' — Robot Mode">'
      : '<div class="lz-placeholder">Robot Mode Art<br>Coming Soon</div>';
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
          '<img src="../logo.png" alt="LABZ RC">' +
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
          '<img src="' + esc(B.images.featureDiagram) + '" alt="Feature diagram">' +
          dots +
        '</div>' +
        '<div class="lz-callout-legend">' + legend + '</div>' +
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
        '<div class="lz-section-header">' +
          '<div class="lz-section-header-line"></div>' +
          '<div class="lz-section-header-title">Build Gallery</div>' +
          '<div class="lz-section-header-line"></div>' +
        '</div>' +
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
          lbImg.src = g.src;
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
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
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
          '<iframe src="https://www.youtube.com/embed/' + esc(v.youtubeId) + '" ' +
            'title="' + esc(v.title) + '" ' +
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
            'allowfullscreen loading="lazy"></iframe>' +
          '<div class="lz-video-card-title">' + esc(v.title) + '</div>' +
        '</div>'
      );
    }

    return (
      '<div class="lz-section">' +
        '<div class="lz-section-header">' +
          '<div class="lz-section-header-line"></div>' +
          '<div class="lz-section-header-title">Videos</div>' +
          '<div class="lz-section-header-line"></div>' +
        '</div>' +
        '<div class="lz-videos">' + cards + '</div>' +
      '</div>'
    );
  }

  /* ── Footer ────────────────────────────────────────── */

  function renderFooter() {
    return (
      '<div class="lz-page-footer">' +
        '© 2026 <a href="https://craz.com">Crabtree Labz</a>' +
      '</div>'
    );
  }

  /* ── Util ──────────────────────────────────────────── */

  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }

})();
