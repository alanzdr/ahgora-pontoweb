"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

document.addEventListener("DOMContentLoaded", function () {
  handleWithToPlansLinks();
  handleWithClientsCarousel();
  handleWithPlansCarousel();
  handleWithPlans();
});

function handleWithToPlansLinks() {
  var links = document.querySelectorAll('.btn-toplans');
  var plans = document.getElementById('content-plans');
  links.forEach(btn => {
    btn.addEventListener('click', () => {
      plans.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

function getSearchParams() {
  var querys = {};
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var keys = urlParams.keys();

  for (var key of keys) {
    var value = urlParams.get(key);

    if (value) {
      querys[key] = value;
    }
  }

  ;
  return querys;
}

function handleWithPlans() {
  var index = 0;
  var buttons = document.querySelectorAll('#plans-buttons > button');
  var headerText = document.getElementById('plans-title-text');
  var priceText = document.getElementById('price-value-text');
  var priceContainer = document.getElementById('price-container');
  var asideText = document.getElementById('aside-text-number');
  var planButton = document.getElementById('plan-button');
  var form = document.getElementById('pontoweb-form');
  var formContainer = document.getElementById('content-form');
  var selectField = document.getElementById('employers');
  var params = getSearchParams();
  buttons.forEach((val, i) => {
    val.addEventListener('click', () => {
      onClickButton(val, i);
    });
  });

  function removeAllActiveClass() {
    buttons.forEach((val, i) => {
      if (i === index) {
        val.classList.add('active');
      } else {
        val.classList.remove('active');
      }
    });
  }

  function onClickButton(button, buttonIndex) {
    if (index !== buttonIndex) {
      index = buttonIndex;
      setLayout();
    }
  }

  function getIndexText() {
    switch (index) {
      case 0:
        return 'de <strong>0 a 10 colaboradores</strong>';

      case 1:
        return 'de <strong>11 a 20 colaboradores</strong>';

      case 2:
        return 'de <strong>21 a 40 colaboradores</strong>';

      case 3:
        return 'de <strong>41 a 50 colaboradores</strong>';

      case 4:
        return '<strong>acima de 50 colaboradores</strong>';

      default:
        return '';
    }
  }

  function getPriceText() {
    switch (index) {
      case 0:
        return 'R$<strong>89</strong><span>,00</span>';

      case 1:
        return 'R$<strong>140</strong><span>,00</span>';

      case 2:
        return 'R$<strong>179</strong><span>,00</span>';

      case 3:
        return 'R$<strong>219</strong><span>,00</span>';

      case 4:
        return "R$<strong>5</strong><span>,00</span>";

      default:
        return '';
    }
  }

  function getAsideText() {
    switch (index) {
      case 0:
        return 'de 0 a 10';

      case 1:
        return 'de 11 a 20';

      case 2:
        return 'de 21 a 40';

      case 3:
        return 'de 41 a 50';

      case 4:
        return 'acima de 50';

      default:
        return '';
    }
  }

  function handleWithSelectValue() {
    switch (index) {
      case 0:
        return '0 a 10 colaboradores';

      case 1:
        return '11 a 20 colaboradores';

      case 2:
        return '21 a 40 colaboradores';

      case 3:
        return '41 a 50 colaboradores';

      case 4:
        return 'Acima de 50 colaboradores';

      default:
        return '';
    }
  }

  function handleWithSelectValueInverse(value) {
    switch (value) {
      case '0 a 10 colaboradores':
        return 0;

      case '11 a 20 colaboradores':
        return 1;

      case '21 a 40 colaboradores':
        return 2;

      case '41 a 50 colaboradores':
        return 3;

      case 'Acima de 50 colaboradores':
        return 4;

      default:
        return 0;
    }
  }

  function handleWithForm() {
    var value = handleWithSelectValue();
    selectField.value = value;
  }

  function setPerAndMoutnContent() {
    if (index === 4) {
      priceContainer.classList.add('collaborator-mode');
    } else {
      priceContainer.classList.remove('collaborator-mode');
    }
  }

  function setLayout() {
    var text = getIndexText();
    var price = getPriceText();
    var aside = getAsideText();
    removeAllActiveClass();
    headerText.classList.add('animate');
    priceText.classList.add('animate');
    asideText.classList.add('animate');
    handleWithForm();
    setTimeout(() => {
      setPerAndMoutnContent();
      headerText.innerHTML = text;
      headerText.classList.remove('animate');
      priceText.innerHTML = price;
      priceText.classList.remove('animate');
      asideText.innerHTML = aside;
      asideText.classList.remove('animate');
    }, 350);
  }

  function onChangeSelectValue() {
    selectField.addEventListener("change", () => {
      var newIndex = handleWithSelectValueInverse(selectField.value);

      if (newIndex !== index) {
        index = newIndex;
        setLayout();
      }
    });
  }

  planButton.addEventListener('click', () => {
    formContainer.scrollIntoView({
      behavior: 'smooth'
    });
  });

  function getUTM() {
    var utm = {};

    if (params.utm_source) {
      utm.traffic_source = params.utm_source;
    }

    if (params.utm_medium) {
      utm.traffic_medium = params.utm_medium;
    }

    if (params.utm_campaign) {
      utm.traffic_campaign = params.utm_campaign;
    }

    if (params.utm_term) {
      utm.traffic_value = params.utm_term;
    }

    return utm;
  }

  function getFormData() {
    var data = {};

    if (form) {
      var elements = form.elements;

      for (var x = 0; x < elements.length; x++) {
        var input = elements[x];

        if (input.type != 'submit') {
          var key = "";
          if (input.name) key = input.name;
          data[key] = input.value;
        }
      }
    }

    return data;
  }

  function is0to20() {
    var value = selectField.value;
    return value === '0 a 10 colaboradores' || value === '11 a 20 colaboradores';
  }

  function sendData() {
    return _sendData.apply(this, arguments);
  }

  function _sendData() {
    _sendData = _asyncToGenerator(function* () {
      var url = "https://us-central1-sower-283917.cloudfunctions.net/ahgora-rd-middleware";
      var identificador = is0to20() ? 'pme-hotsite-0-20' : 'pme-hotsite-acima-20';
      var rdInfo = {
        identificador,
        origem: window.location.href
      };
      var utm = getUTM();
      var formData = getFormData();

      var data = _objectSpread(_objectSpread(_objectSpread({}, rdInfo), utm), formData);

      yield fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    });
    return _sendData.apply(this, arguments);
  }

  function changeLocations(newLocation) {
    var url = new URL(newLocation);
    Object.keys(params).forEach(key => {
      var value = params[key];

      if (value) {
        url.searchParams.append(key, value);
      }
    });
    window.location.href = url.toString();
  }

  function redirectUser() {
    if (is0to20()) {
      changeLocations('https://pme.ahgora.com/pacote-ahgora-easy/fluxo/');
    } else {
      var {
        protocol,
        host,
        pathname
      } = window.location;
      var link = "".concat(protocol, "//").concat(host).concat(pathname, "obrigado");
      changeLocations(link);
    }
  }

  function unviableForm() {
    form.querySelector('button').setAttribute('disabled', true);
  }

  function sendDataToFacebook() {
    if ("fbq" in window) {
      fbq('track', 'Lead');
    }
  }

  form.addEventListener('submit', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (ev) {
      ev.preventDefault();
      unviableForm();
      sendDataToFacebook(); // await sendData();

      redirectUser();
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  setLayout();
  onChangeSelectValue();
}

function handleWithPlansCarousel() {
  tns({
    container: '#plans-carousel',
    items: 1,
    mouseDrag: true,
    loop: false,
    gutter: 20,
    swipeAngle: false,
    speed: 400,
    controls: false
  });
}

function handleWithClientsCarousel() {
  var carousel = tns({
    container: '#clients-carousel',
    items: 1,
    mouseDrag: true,
    loop: true,
    gutter: 20,
    swipeAngle: false,
    speed: 400,
    controls: false,
    responsive: {
      600: {
        items: 3
      },
      1000: {
        items: 6
      }
    }
  });
  var next = document.getElementById("clients-next-button");
  next.addEventListener('click', () => carousel.goTo('next'));
  var prev = document.getElementById("clients-prev-button");
  prev.addEventListener('click', () => carousel.goTo('prev'));
}