//JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP

function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});

//Попапы
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//Попапы
let burger = document.querySelector('.menu-toggle');
let menu = document.querySelector('.header__nav');
let bodyPage = document.querySelector('body');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	menu.classList.toggle('active');
	bodyPage.classList.toggle('lock');
})

var mainSlider = new Swiper('.main-slider', {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: true,
	// effect: 'fade',
	autoplay: {
		delay: 5000,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});
var reviewSlider = new Swiper('.review-slider', {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: true,
	watchOverflow: true,
	
	navigation: {
		nextEl: '.review__slider--next',
		prevEl: '.review__slider--prev',
	},
});


var servicesSlider = new Swiper('.services__slider', {
	slidesPerView: 2,
	watchOverflow: true,
	slidesPerColumn: 2,
	spaceBetween: 0,
	slidesPerColumnFill: 'row',
	navigation: {
		nextEl: '.services__slider--next',
		prevEl: '.services__slider--prev',
	},
	breakpoints: {
		// when window width is >= 640px
		640: {
			slidesPerView: 3,
			watchOverflow: true,
			slidesPerColumn: 2,
			slidesPerGroup: 2
		}
	}
});

var instaSlider = new Swiper('.instagram__slider', {
	// autoHeight: false,
	slidesPerView: 'auto',
	// slidesPerColumn: 2,
	spaceBetween: 15,
	watchOverflow: true,
	navigation: {
		nextEl: '.insta__slider--next',
		prevEl: '.insta__slider--prev',
	},
	breakpoints: {
		// when window width is >= 640px
		640: {
			slidesPerView: 3,
			watchOverflow: true,
			slidesPerColumn: 2,
			slidesPerGroup: 2,
			spaceBetween: 24,
			slidesPerColumnFill: 'row'
		}
	}
});

const swiperPrev = document.querySelector('.insta__slider--prev');
const swiperNext = document.querySelector('.insta__slider--next');

swiperPrev.addEventListener('click', () => {
  instaSlider.slidePrev();
})
swiperNext.addEventListener('click', () => {
  instaSlider.slideNext();
})






window.onscroll = function () {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	if (scrolled > 200) {
		document.querySelector('.menu-active').style.display = scrolled == 0 ? "none" : "flex";
	} else if (scrolled == 0) {
		document.querySelector('.menu-active').style.display = "none";
	}
};

(function () {
	'use strict';

	function trackScroll() {
		var scrolledArrow = window.pageYOffset;
		var coords = document.documentElement.clientHeight;

		if (scrolledArrow > coords) {
			goTopBtn.classList.add('to-top-show');
		}
		if (scrolledArrow < coords) {
			goTopBtn.classList.remove('to-top-show');
		}
	}

	function backToTop() {
		if (window.pageYOffset > 0) {
			window.scrollBy(0, -80);
			setTimeout(backToTop, 0);
		}
	}

	var goTopBtn = document.querySelector('.to-top');

	window.addEventListener('scroll', trackScroll);
	goTopBtn.addEventListener('click', backToTop);
})();
