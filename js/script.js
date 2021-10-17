'use strict';

//dropdown clinics
const clinicBtn = document.querySelector('.clinic__btn');

clinicBtn.addEventListener('click', () => {
  document.body.classList.toggle('dropdown-clinics-active');
})

//dropdown phones
const phonesBtn = document.querySelector('.top-head__btn');

phonesBtn.addEventListener('click', () => {
  document.body.classList.toggle('dropdown-phones-active');
})

//burger-menu
const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
  document.body.classList.toggle('menu-active');
})

//text-accordion

const textAccordion = document.querySelector('.text-accordion'),
  btnShow = document.querySelector('.btn-show'),
  startHeight = textAccordion.style.height;
let expanded = false;

btnShow.addEventListener('click', () => {
  if (!expanded) {
    textAccordion.style.height = `${textAccordion.scrollHeight}px`;
    btnShow.innerHTML = 'Свернуть';
  } else {
    textAccordion.style.height = `${textAccordion.scrollHeight}px`;
    textAccordion.style.height = startHeight;
    btnShow.innerHTML = 'Подробнее';
  }
  expanded = !expanded;
})

btnShow.addEventListener("transitionend", () => {
  if (textAccordion.style.height !== startHeight) {
    textAccordion.style.height = "auto"
  }
});

//textarea autoresize

const textarea = document.querySelector('textarea');

textarea.addEventListener('input', (e) => {
  const target = e.target;

  target.style.height = 'auto';
  target.style.height = target.scrollHeight + 'px';
})

//owl-carousel

$(function () {

  const owlPromotions = $(".owl-carousel-promotions");
  const owlReviews = $(".owl-carousel-reviews");
  const owlClinic = $(".owl-carousel-clinic");

  owlPromotions.owlCarousel({
    margin: 10,
    loop: true,
    nav: true,
    autoplay: true,
    touchDrag: true,
    autoplayTimeout: 10000,
    smartSpeed: 1000,
    slideTransition: 'linear',
    responsive: {
      320: {
        items: 1,
        nav: false,
      },
      769: {
        items: 2,
        nav: false

      },
      1200: {
        items: 3
      }
    }
  });

  owlReviews.owlCarousel({
    margin: 10,
    loop: true,
    nav: true,
    autoplay: true,
    touchDrag: true,
    autoplayTimeout: 10000,
    smartSpeed: 2000,
    slideTransition: 'linear',
    responsive: {
      320: {
        items: 1,
        nav: false,
      },
      560: {
        items: 1,
        nav: false
      },
      992: {
        items: 1,
      },
    }
  });

  owlClinic.owlCarousel({
    margin: 0,
    loop: true,
    nav: false,
    autoplay: true,
    touchDrag: true,
    autoplayTimeout: 25000,
    smartSpeed: 1,
    slideTransition: 'linear',
    responsive: {
      320: {
        items: 1,
        nav: false,
      },
      560: {
        items: 1,
        nav: false
      },
      1100: {
        items: 1,
      },
    }
  });
});


//services accordion

const servicesAccordion = (listSelector, listItemsSelector) => {
  const list = document.querySelectorAll(listSelector);
  const listItems = document.querySelectorAll(listItemsSelector);

  listItems.forEach((item, i) => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      const listItem = list[i];
      const listHeight = window.getComputedStyle(listItem).height;

      if (listHeight === '0px') {
        listItem.style.height = `${listItem.scrollHeight}px`;
      } else {
        listItem.style.height = `${listItem.scrollHeight}px`;
        listItem.style.height = '0';
      }
      target.children[0].classList.toggle('rotateArrow');
    });
  });
};

servicesAccordion('.services__subitems', '.services__item.has-subitem > .services__link');









  