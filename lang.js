(function () {
  var body = document.body;
  function set(lang) {
    body.dataset.lang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  set(saved || ((navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en'));
  document.querySelectorAll('[data-set]').forEach(function (b) {
    b.addEventListener('click', function () { set(b.dataset.set); });
  });
})();
