$(function () {

  // Navbar turns red on scroll + highlights the current section
  const $nav = $('.navbar');
  $(window).on('scroll', function () {
    $nav.toggleClass('scrolled', $(this).scrollTop() > 50);
    let current = 'slider';
    $('section[id]').each(function () { if ($(window).scrollTop() >= $(this).offset().top - 120) current = this.id; });
    $('.nav-link').removeClass('active').filter('[href="#' + current + '"]').addClass('active');
  }).trigger('scroll');

  // Typed.js hero text
  if (window.Typed) {
    new Typed('#typed', {
      strings: ['chocolate cakes', 'birthday cakes', 'wedding cakes', 'cupcakes'],
      typeSpeed: 60, backSpeed: 35, backDelay: 1400, loop: true
    });
  }

  // jQuery Ripples water effect on the page background (needs img/pinkS.jpeg)
  if ($.fn.ripples) {
    try { $('body').ripples({ resolution: 512, dropRadius: 20, perturbance: 0.04 }); }
    catch (e) { console.warn('Ripples not supported here:', e); }
  }

  // "Order this" fills the cake choice in the form
  $(document).on('click', '[data-cake]', function () { $('#cakeSelect').val($(this).data('cake')); });

  // Order form
  $('#orderForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#name').val().trim(), email = $('#email').val().trim(), $msg = $('#formMsg');
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      $msg.addClass('error').text('Enter your name and a valid email address.');
      return;
    }
    $msg.removeClass('error').text('Thanks ' + name + '! Your order for ' + $('#cakeSelect').val() + ' was received.');
    this.reset();
  });

  // Counting numbers when the stats section scrolls into view
  const io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      const el = en.target, to = +el.dataset.to;
      let n = 0;
      const t = setInterval(function () {
        n = Math.min(n + Math.ceil(to / 60), to);
        el.textContent = n + '+';
        if (n === to) clearInterval(t);
      }, 25);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count').forEach(function (c) { io.observe(c); });
});