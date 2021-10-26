'use strict';

//dropdown clinics / phones

const dropdownActive = (btnSelector, activeClass) => {
  const btn = document.querySelector(btnSelector);
  if (!btn) return false;
  btn.addEventListener('click', () => {
    document.body.classList.toggle(activeClass);
  })
}

dropdownActive('.clinic__btn', 'dropdown-clinics-active');
dropdownActive('.top-head__btn', 'dropdown-phones-active');

//burger-menu
const burger = (burgerSelector, classActive) => {
  const burger = document.querySelector(burgerSelector);
  if (!burger) return false;
  burger.addEventListener('click', () => {
    document.body.classList.toggle(classActive);
  })
}

burger('.burger', 'menu-active');


//text-accordion

const textAccordion = (textAccordionSelector, btnShowSelector) => {
  const textAccordionBlock = document.querySelector(textAccordionSelector);
  if (!textAccordionBlock) return false;

  const btnShow = document.querySelector(btnShowSelector),
    startHeight = textAccordionBlock.style.height;
  if (!btnShow) return false;

  let expanded = false;


  btnShow.addEventListener('click', () => {
    if (!expanded) {
      textAccordionBlock.style.height = `${textAccordionBlock.scrollHeight}px`;
      btnShow.innerHTML = 'Свернуть';
    } else {
      textAccordionBlock.style.height = `${textAccordionBlock.scrollHeight}px`;
      textAccordionBlock.style.height = startHeight;
      btnShow.innerHTML = 'Подробнее';
    }
    expanded = !expanded;
  })

  btnShow.addEventListener("transitionend", () => {
    if (textAccordionBlock.style.height !== startHeight) {
      textAccordionBlock.style.height = "auto"
    }
  });
}

textAccordion('.text-accordion', '.btn-show')

//textarea autoresize

const textareaAutoresize = (textareaSelector) => {
  const textareas = document.querySelectorAll(textareaSelector);
  if (!textareas) return false;

  textareas.forEach(item => {
    item.addEventListener('input', (e) => {
      const target = e.target;

      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 'px';
    })
  })
}

textareaAutoresize('textarea');



//owl-carousel

window.addEventListener('load', () => {

})

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
    autoplayHoverPause: true,
    responsive: {
      320: {
        items: 1,
        nav: false,
      },
      769: {
        items: 1,
        nav: false

      },
      1200: {
        items: 2
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
    smartSpeed: 1000,
    slideTransition: 'linear',
    autoplayHoverPause: true,
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
        nav: true
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
    autoplayHoverPause: true,
    responsive: {
      320: {
        items: 1,
      },
      560: {
        items: 1,
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
  if (!list) return false;
  const listItems = document.querySelectorAll(listItemsSelector);
  if (!listItems) return false;

  listItems.forEach((item, i) => {
    item.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const listItem = list[i];
      const listHeight = window.getComputedStyle(listItem).height;
      const listItemScrollHeight = () => {
        listItem.style.height = `${listItem.scrollHeight}px`;
      }
      if (listHeight === '0px') {
        listItemScrollHeight();
      } else {
        listItemScrollHeight();
        listItem.style.height = '0';
      }

      item.querySelector('.services__arrow').classList.toggle('rotateArrow');
    }, true);
  });
};

if(window.innerWidth < 769) {
  servicesAccordion('.services__subitems', '.services__item.has-subitem > .services__link');
}

const mapPopup = (mapSelector, mapBtnClass) => {
  const map = document.querySelector(mapSelector);
  if (!map) return false;
  let visible = false;
  map.addEventListener('mouseover', (e) => {
    mapPopupOnOff(e, true);
  })

  map.addEventListener('mouseout', (e) => {
    mapPopupOnOff(e, false);
  })

  const mapPopupOnOff = (e, visibilityValue) => {
    const target = e.target;
    const mapBtn = target.parentElement;
    if (!mapBtn) return false;

    let coordX = e.pageX;
    let coordY = e.pageY;

    visible = visibilityValue;

    if (mapBtn.classList.contains(mapBtnClass)) {
      const popupId = mapBtn.getAttribute('data-popup');
      const mapPopup = document.querySelector(`#${popupId}`);
      if (window.innerWidth < 650) {
        setPopupPosition(visible, 'visible-center', 'relative');
      } else {
        mapPopup.style.top = coordY + 'px';
        mapPopup.style.left = coordX + 'px';
        setPopupPosition(visible, 'visible', 'static');
      }

      function setPopupPosition(visibilityValue, visibilityClass, mapPosition) {
        if (visibilityValue) {
          if (!mapPopup) return false;
          map.style.position = mapPosition;
          mapBtn.classList.add('active');
          mapPopup.classList.add(visibilityClass);
        } else {
          mapPopup.classList.remove(visibilityClass);
          mapBtn.classList.remove('active');
        }
      }
    }

  }
}

mapPopup('.map', 'map__btn');

// pageup

const pageUp = (btnSelector) => {
  const pageUpBtn = document.querySelector(btnSelector);
  if (!pageUpBtn) return false;

  window.addEventListener('scroll', trackScroll);
  pageUpBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    backToTop();
  });

  function trackScroll() {
    let scrolled = window.pageYOffset;

    scrolled > 500 ? pageUpBtn.classList.add('show') : pageUpBtn.classList.remove('show');
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

pageUp('.page-up');

//padding-top main

const padTopMain = (headerSelector, mainSelector) => {
  const header = document.querySelector(headerSelector),
  main = document.querySelector(mainSelector),
  headerHeight = header.offsetHeight;
  if(!header) return false;
  if(!main) return false;

  main.style.paddingTop = headerHeight + 'px';
}

padTopMain('header', 'main');

//sticky header

let curPosition = 0;

window.addEventListener('scroll', () => {

  stickyHeader('header');
})

const stickyHeader = (headerSelector) => {
  const header = document.querySelector(headerSelector),
  topHead = header.querySelector('.top-head');
  if(!header) return false;
  if(!topHead) return false;

  let start = window.pageYOffset;

  if (start > curPosition) {
    topHead.classList.add('hide');

  } else {
    topHead.classList.remove('hide');
  }

  curPosition = start;

}