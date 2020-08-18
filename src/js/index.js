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
      })
    })
  })
}

function getSearchParams () {

  const querys = {};

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const keys = urlParams.keys();

  for (const key of keys) {
    const value = urlParams.get(key);
    if (value) {
      querys[key] = value;
    }
  };

  return querys;
}

function handleWithPlans() {
  let index = 0;
  const buttons = document.querySelectorAll('#plans-buttons > button');
  const headerText = document.getElementById('plans-title-text');
  const priceText = document.getElementById('price-value-text');
  const priceContainer = document.getElementById('price-container')
  const asideText = document.getElementById('aside-text-number');
  const planButton = document.getElementById('plan-button');
  const form = document.getElementById('pontoweb-form');
  const formContainer = document.getElementById('content-form');
  const selectField = document.getElementById('employers');
  const params = getSearchParams();
  
  buttons.forEach((val, i) => {
    val.addEventListener('click', () => {
      onClickButton(val, i)
    })
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
    switch(index) {
      case 0: return 'de <strong>0 a 10 colaboradores</strong>';
      case 1: return 'de <strong>11 a 20 colaboradores</strong>';
      case 2: return 'de <strong>21 a 40 colaboradores</strong>';
      case 3: return 'de <strong>41 a 50 colaboradores</strong>';
      case 4: return '<strong>acima de 50 colaboradores</strong>';
      default: return '';
    }
  }
  function getPriceText() {
    switch(index) {
      case 0: return 'R$<strong>89</strong><span>,00</span>';
      case 1: return 'R$<strong>140</strong><span>,00</span>';
      case 2: return 'R$<strong>179</strong><span>,00</span>';
      case 3: return 'R$<strong>219</strong><span>,00</span>';
      case 4: return "R$<strong>5</strong><span>,00</span>";
      default: return '';
    }
  }

  function getAsideText() {
    switch(index) {
      case 0: return 'de 0 a 10';
      case 1: return 'de 11 a 20';
      case 2: return 'de 21 a 40';
      case 3: return 'de 41 a 50';
      case 4: return 'acima de 50';
      default: return '';
    }
  }

  function handleWithSelectValue() {
    switch(index) {
      case 0: return '0 a 10 colaboradores';
      case 1: return '11 a 20 colaboradores';
      case 2: return '21 a 40 colaboradores';
      case 3: return '41 a 50 colaboradores';
      case 4: return 'Acima de 50 colaboradores';
      default: return '';
    }
  }

  function handleWithSelectValueInverse(value) {
    switch(value) {
      case '0 a 10 colaboradores': return 0;
      case '11 a 20 colaboradores': return 1;
      case '21 a 40 colaboradores': return 2;
      case '41 a 50 colaboradores': return 3;
      case 'Acima de 50 colaboradores': return 4;
      default: return 0;
    }
  }

  function handleWithForm() {
    const value = handleWithSelectValue();
    selectField.value = value;
  }

  function setPerAndMoutnContent() {
    if (index === 4) {
      priceContainer.classList.add('collaborator-mode')
    } else {
      priceContainer.classList.remove('collaborator-mode')
    }
  }

  function setLayout() {
    const text = getIndexText();
    const price = getPriceText();
    const aside = getAsideText();
    removeAllActiveClass();
    headerText.classList.add('animate');
    priceText.classList.add('animate');
    asideText.classList.add('animate');
    handleWithForm();
    setTimeout(() => {
      setPerAndMoutnContent();
      headerText.innerHTML = text;
      headerText.classList.remove('animate')
      priceText.innerHTML = price;
      priceText.classList.remove('animate');
      asideText.innerHTML = aside;
      asideText.classList.remove('animate');
    }, 350)
  }

  function onChangeSelectValue() {
    selectField.addEventListener("change", () => {
      const newIndex = handleWithSelectValueInverse(selectField.value);
      if (newIndex !== index) {
        index = newIndex;
        setLayout();
      }
    });
  }

  planButton.addEventListener('click', () => {
    formContainer.scrollIntoView({
      behavior: 'smooth'
    })
  })

  function getUTM () {
    const utm = {};
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
    const data = {};
    if(form){
      const elements = form.elements;
      for ( var x = 0; x < elements.length; x++ ) {
        const input = elements[x];
        if (input.type != 'submit') {
          let key = "";
          if (input.name)
            key = input.name
          data[key] = input.value;
        }
      }
    }
    return data;
  }

  function is0to20 () {
    const value = selectField.value;
    return value === '0 a 10 colaboradores' || value === '11 a 20 colaboradores';
  }

  async function sendData() {
    const url = "https://us-central1-sower-283917.cloudfunctions.net/ahgora-rd-middleware";
    const identificador = is0to20() ? 'pme-hotsite-0-20' : 'pme-hotsite-acima-20';
    const rdInfo = {
      identificador,
      origem: window.location.href,
    }

    const utm = getUTM();
    const formData = getFormData();

    const data = {
      ...rdInfo,
      ...utm,
      ...formData,
    }

    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  function changeLocations(newLocation) {
    const url = new URL(newLocation);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value) {
        url.searchParams.append(key, value);
      }
    });
    window.location.href = url.toString();
  }

  function redirectUser() {
    if (is0to20()){
      changeLocations('https://pme.ahgora.com/pacote-ahgora-easy/fluxo/')
    } else {
      const { protocol, host, pathname } = window.location;
      const link = `${protocol}//${host}${pathname}obrigado`
      changeLocations(link)
    }
  }

  function unviableForm() {
    form.querySelector('button').setAttribute('disabled', true);
  } 

  function sendDataEvents() {
    const eventLabel = is0to20() ? '0 a 20 colaboradores' : 'Acima de 20 colaboradores';
    if ("fbq" in window) {
      fbq('track', 'Lead');
    }
    if("ga" in window) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'hotsite-pme-pontoweb',
        eventAction: 'contact',
        eventLabel
      });
    }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    unviableForm();
    sendDataEvents();
    await sendData();
    redirectUser();
  })

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
  const carousel = tns({
    container: '#clients-carousel',
    items: 1,
    mouseDrag: true,
    loop: true,
    gutter: 20,
    swipeAngle: false,
    speed: 400,
    controls: false,
    autoplayButton: false,
    autoplayButtonOutput: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      600: {
        items: 3
      },
      1000: {
        items: 6
      }
    }
  });
  const next = document.getElementById("clients-next-button");
  next.addEventListener('click', () => carousel.goTo('next'))
  const prev = document.getElementById("clients-prev-button");
  prev.addEventListener('click', () => carousel.goTo('prev'))
}