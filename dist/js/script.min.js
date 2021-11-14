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
    const btnText = btnShow.querySelector('span');
    if (!expanded) {
      textAccordionBlock.style.height = `${textAccordionBlock.scrollHeight}px`;
      btnShow.classList.add('active');
      btnText.textContent = 'Свернуть';
    } else {
      textAccordionBlock.style.height = `${textAccordionBlock.scrollHeight}px`;
      textAccordionBlock.style.height = startHeight;
      btnShow.classList.remove('active');
      btnText.textContent = 'Подробнее';
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
  const owlLicense = $(".owl-carousel-license");

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
    autoplayTimeout: 6000,
    smartSpeed: 1,
    slideTransition: 'linear',
    autoplayHoverPause: true,
    animateIn: 'fadeIn',
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


  owlLicense.owlCarousel({
    margin: 10,
    rewind: true,
    autoplay: true,
    touchDrag: true,
    autoplayTimeout: 3000,
    smartSpeed: 1000,
    slideTransition: 'linear',
    autoplayHoverPause: true,
    responsive: {
      320: {
        items: 2,
      },
      576: {
        items: 3,
        nav: false
      },
      769: {
        items: 4,
        nav: false
      },
      992: {
        items: 5,
        nav: true,
      }
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

if (window.innerWidth < 769) {
  servicesAccordion('.services__subitems', '.services__item.has-subitem > .services__link');
}

const mapPopup = (mapSelector, mapBtnClass, popupActive, btnActive) => {
  const map = document.querySelector(mapSelector);
  const mapPopupActive = document.querySelector(popupActive);
  const mapBtnActive = document.querySelector(btnActive);
  let visible = false;

  if (!map) return false;
  if (!mapPopupActive) return false;
  if (!mapBtnActive) return false;

  const setPopupActive = (popup, btn) => {
      const top = btn.getBoundingClientRect().top;
      const right = btn.getBoundingClientRect().right;
  
      popup.style.top = top - 100 + 'px';
      popup.style.left = right + 20 + 'px'; 
  }

if(window.innerWidth > 769) {
  setPopupActive(mapPopupActive, mapBtnActive);
  window.addEventListener('resize', () => {
    setPopupActive(mapPopupActive, mapBtnActive)
  });
}


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

    const popupId = mapBtn.getAttribute('data-popup');
    if (!popupId) return false;
    const mapPopup = document.querySelector(`#${popupId}`);

   if(window.innerWidth > 769) {
    if (mapPopup.classList.contains('loaded-active')) {
      return false;
    }
   }

    let coordX = e.pageX;
    let coordY = e.pageY;

    visible = visibilityValue;
    const setPopupPosition = (popup, visibilityClass, mapPosition) => {
      if (visibilityValue) {
        if (!popup) return false;
        map.style.position = mapPosition;
        mapBtn.classList.add('active');
        popup.classList.add(visibilityClass);
      } else {
        popup.classList.remove(visibilityClass);
        mapBtn.classList.remove('active');
      }
    }

    if (mapBtn.classList.contains(mapBtnClass)) {
      if (window.innerWidth < 769) {
        setPopupPosition(mapPopup, 'visible-center', 'relative')
      } else {
        if(mapPopup.getAttribute('id') === 'diabet') {
          const top = mapBtn.getBoundingClientRect().top;
          const left = mapBtn.getBoundingClientRect().left;
    
          mapPopup.style.top = top - mapPopup.clientHeight + 25 + 'px';
          mapPopup.style.left = left - mapPopup.clientWidth + 'px';
        } else {
          mapPopup.style.top = coordY + 'px';
          mapPopup.style.left = coordX + 'px';
        }
        setPopupPosition(mapPopup, 'visible', 'static');
      }
    }

  }
}

mapPopup('.map', 'map__btn', '.map__popup.loaded-active', '.map__btn.loaded-active');

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
  if (!header) return false;
  if (!main) return false;

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
  if (!header) return false;
  if (!topHead) return false;

  let start = window.pageYOffset;

  if (start > curPosition) {
    topHead.classList.add('hide');

  } else {
    topHead.classList.remove('hide');
  }

  curPosition = start;

}


// image preview


const previewImage = (imagesSelector, previewWindowSelector, previewContainerSelector, previewImgSelector,
  btnCloseSelector, btnNextSelector, btnPrevSelector) => {
  const images = document.querySelectorAll(imagesSelector),
    previewWindow = document.querySelector(previewWindowSelector);
  if (!images) return false;
  if (!previewWindow) return false;

  const previewContainer = previewWindow.querySelector(previewContainerSelector),
    previewImg = previewWindow.querySelector(previewImgSelector),
    btnClose = previewWindow.querySelector(btnCloseSelector),
    btnNext = previewWindow.querySelector(btnNextSelector),
    btnPrev = previewWindow.querySelector(btnPrevSelector),
    body = document.body;

  let index = 0;

  const treshold = 120,
    allowedTime = 200;
  let startX = 0,
    startY = 0,
    startTime = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];

    img.addEventListener('click', () => {
      index = i;
      getImageURL(index);
      body.classList.add('show');

    })
  }

  btnNext.addEventListener('click', () => {
    next();
  })

  btnPrev.addEventListener('click', () => {
    prev();
  })

  previewImg.addEventListener('touchstart', (e) => {
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
  }, {
    passive: true
  });

  previewImg.addEventListener('touchend', (e) => {
    const touchObj = e.changedTouches[0];
    const dist = touchObj.pageX - startX;
    const elapsedTime = new Date().getTime() - startTime;

    if (Math.abs(touchObj.pageY - startY) < 100 &&
      elapsedTime <= allowedTime &&
      Math.abs(dist) >= treshold) {
      const swiperRightBol = dist > 0;

      if (swiperRightBol) {
        prev();
      } else {
        next();
      }

    }
  }, {
    passive: true
  });


  btnClose.addEventListener('click', () => {
    closePreview();
  })

  previewContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  previewWindow.addEventListener('click', () => {
    closePreview();
  })

  function getImageURL(index) {
    let imageURL = images[index].getAttribute('src');
    previewImg.src = imageURL;
  }

  function next() {
    index++;
    index %= images.length;
    getImageURL(index);
  }

  function prev() {
    index--;
    if (index < 0) index = images.length - 1;
    getImageURL(index);
  }

  function closePreview() {
    body.classList.remove('show');
  }
}

previewImage(
  '.preview-link',
  '.preview',
  '.preview__container',
  '.preview__img',
  '.preview__close',
  '.preview__btn--next',
  '.preview__btn--prev'
);

