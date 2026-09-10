// Mobile menu
(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : 'Menu';
  });
})();

// Quote form (Web3Forms). Without JS the form still posts normally.
(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  var status = form.querySelector('.form__status');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    button.disabled = true;
    button.textContent = 'Sending…';
    status.removeAttribute('data-state');
    status.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success) throw new Error(data.message || 'Send failed');
        form.reset();
        status.dataset.state = 'ok';
        status.textContent = 'Request sent. We’ll reply with a price and our earliest start date.';
        button.textContent = 'Request sent';
      })
      .catch(function () {
        status.dataset.state = 'error';
        status.textContent = 'Your request didn’t send. Check your connection and try again, or message us on WhatsApp.';
        button.disabled = false;
        button.textContent = 'Send my quote request';
      });
  });
})();

// Hero quick-start: carry postcode and service into the main quote form
(function () {
  var quick = document.getElementById('quick-form');
  var form = document.getElementById('quote-form');
  if (!quick || !form) return;
  quick.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelector('#f-postcode').value = quick.querySelector('#q-postcode').value;
    var service = quick.querySelector('#q-service').value;
    if (service) form.querySelector('#f-service').value = service;
    document.getElementById('quote').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    form.querySelector('#f-name').focus({ preventScroll: true });
  });
})();
