document.addEventListener('DOMContentLoaded', function () {
  // burger
  let burger = document.querySelector('#burger');
  let nav = document.querySelector('#nav');
  let navBottom = document.querySelector('#nav-bottom');

  burger.addEventListener('click', function () {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('is-active');
    navBottom.classList.toggle('is-active')
  })

  // play
  let play = document.querySelector('#play');
  let navPlay = document.querySelector('#nav-play');

  play.addEventListener('click', function () {
    play.classList.toggle('play--active');
    navPlay.classList.toggle('is-active')
  })

  // Поиск
  let search = document.querySelector('#search');
  let searchMeny = document.querySelector('#search-menu');

  search.addEventListener('click', function () {
    search.classList.toggle('search--active');
    searchMeny.classList.toggle('search--is-active')
  })

  // header_btn
  let headerBtn = document.querySelector('#header-bottom__btn');
  let headerBtnActive = document.querySelector('#header-btn--active');
  let headerBtnPause = document.querySelector('#header-btn--pause');
  let headerBtn2 = document.querySelector('#header-bottom__btn2');
  let headerBtn2Active = document.querySelector('#header-btn2--active');
  let headerBtn2Pause = document.querySelector('#header-btn2--pause');

  headerBtn.addEventListener('click', function () {
    headerBtnActive.classList.toggle('header-btn__svg--none');
    headerBtnPause.classList.toggle('header-btn__svg--none')
  })

  headerBtn2.addEventListener('click', function () {
    headerBtn2Active.classList.toggle('header-btn__svg--none')
    headerBtn2Pause.classList.toggle('header-btn__svg--none')
  })

  // Podcast
  let podcastBtn = document.querySelector('.podcast__btn');
  let podcastItem = document.querySelectorAll('.podcast__item');

  podcastBtn.addEventListener('click', function () {
    podcastItem.forEach(function (e) {
      e.classList.toggle('podcast__item--vision')
    })
    if (podcastBtn.innerHTML == "Ещё подкасты") {
      podcastBtn.innerHTML = "Скрыть подкасты";
    }
    else {
      podcastBtn.innerHTML = "Ещё подкасты";
    }
  })

  // Select автор
  const element = document.querySelector('#selectCustom');
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: ""
  });

  // Accordion
  $(function () {
    $(".guests__accordion").accordion({
      heightStyle: "content"
    });
  });

  // Табы
  let guestsBtn = document.querySelectorAll('.guests-accordion__btn');
  let guestsTab = document.querySelectorAll('.guests__tab');

  guestsBtn.forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;

      guestsBtn.forEach(function (btn) {
        btn.classList.remove('guests-accordion__btn--active')
      });
      event.currentTarget.classList.add('guests-accordion__btn--active');

      guestsTab.forEach(function (tabsBtn) {
        tabsBtn.classList.remove('guests__tab--active')
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('guests__tab--active');
    });
  });

  // Валидация формы
  new JustValidate('.form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      mail: {
        required: true,
        email: true
      },
      message: {
        required: true,
      }
    },
    messages: {
      name: {
        required: "Как вас зовут?",
        minLength: "Это поле дожно содержать минимум 2 символа",
        maxLength: "Это поле дожно содержать максимум 30 символов"
      },
      mail: {
        required: "Укажите ваш e-mail",
        email: "Пожалуйста, введите правильный Email"
      },
      message: {
        required: "Введите текст",
      }
    },
    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
            new GraphModal().open('second');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    }
  });

  // Подключение модального окна
  const modal = new GraphModal({
    isOpen: (modal) => {
      console.log('opened');
    },
    isClose: () => {
      console.log('closed');
    }
  });
})

// скролл в табах

const screen = window.matchMedia("(max-width: 991px)");

function handleMobilePhoneResize(as) {
  // Проверяем, верен ли медиа-запрос
  if (as.matches) {
    var hiddenElement = document.querySelector('.guests__tabs');
    var btnTabs = document.querySelectorAll('.guests-accordion__btn');

    btnTabs.forEach(function (btnAccordion) {
      btnAccordion.addEventListener('click', function (handleButtonClick) {
        hiddenElement.scrollIntoView({ behavior: "smooth" });
      });
    });
  }
}

handleMobilePhoneResize(screen);

// Настраиваем слушателя событий
screen.addListener(handleMobilePhoneResize);
