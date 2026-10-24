// Alternância de tema e menu do site de documentação.
(function () {
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return media.matches ? 'dark' : 'light';
  }
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('constela-tema', next); } catch (e) { /* armazenamento indisponível */ }
    });
  }
  var menu = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (menu && nav) {
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }
})();
