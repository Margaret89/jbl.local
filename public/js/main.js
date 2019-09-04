$(document).ready(function () {
	// Инициализация слайдера
	function fullSlider() {
		const $slider = $(".js-fullpage");
		$slider
			.on('init', function () {
				mouseWheel($slider)
			})
			.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				vertical: true,
				infinite: false,
				swipe: false,
				 responsive: [
					{
						breakpoint: 768,
						settings: "unslick"
					},
				]
			})
		function mouseWheel($slider) {
			$(window).on('wheel', { $slider: $slider }, mouseWheelHandler)
		}
		function mouseWheelHandler(event) {
			// event.preventDefault()
			const $slider = event.data.$slider
			const delta = event.originalEvent.deltaY
			if(delta > 0) {
				$slider.slick('slickNext')
			}
			else {
				
				$slider.slick('slickPrev')
			}
		}
	}

	var $windowWidth = $(window).width();
	var showFullSlider = true;

	if ($windowWidth > 767) {
		fullSlider();
	}

	$(window).resize(function(){
		$windowWidth = $(window).width();

		if ($windowWidth > 767) {
			if (showFullSlider == false) {
				fullSlider();
				showFullSlider = true;
			}
		}else{
			 showFullSlider = false;
		}
	});

	// Слайдер преимуществ
	$('.js-advant').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		arrows: false,
		dots: true,
	});

	// Слайдер цен
	$('.js-prices-slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		centerMode: true,
		centerPadding: '18.5%',
		swipe: true,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				centerMode: false,
				vertical: true,
				swipe: false,
			}
		},
		
	]
	});

	$('.js-prices-card').click(function(){
		var $itemSlider = $(this).parent('.js-prices-item');
		var idSlide = $itemSlider.data('price');
		$('.js-prices-slider').slick('slickGoTo', idSlide);

		$('.js-prices-item').removeClass('active');
		$itemSlider.addClass('active');
	});

	$('.js-prices-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.js-prices-item').removeClass('active');
	});

	// Добавление анимации
	var changeAdvant = false;

	if ($windowWidth < 768) {
		$('[data-advant=advant0]').addClass('animate');
	}

	$('#slide0').addClass('animate');

	$('.js-fullpage').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('#slide'+currentSlide).removeClass('animate');
		$('#slide'+nextSlide).addClass('animate');

		if ((nextSlide == 1) && (changeAdvant == false)) {
			changeAdvant == false;
			$('[data-advant=advant0]').addClass('animate');
		}
	});

	$('.js-advant').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		changeAdvant = true;
		$('[data-advant=advant'+currentSlide+']').removeClass('animate');
		$('[data-advant=advant'+nextSlide+']').addClass('animate');

		if (nextSlide == 0) {
			$('[data-advant=advant0]').addClass('animate');
		}
	});

	// Плавный переход к ссылке
	if ($('.js-link-move').length) {
		$('body').on('click','.js-link-move', function (event) {
			event.preventDefault();

			if ($windowWidth>767) {
				var $slider = $(".js-fullpage");
				var slide = $(this).attr('data-slide');
				$slider.slick('slickGoTo', slide);
			} else {
				var id  = $(this).attr('href'),
				top = $(id).offset().top;
				$('body,html').animate({scrollTop: top}, 1000);

				// Проверка наличия анимации
				// productAnim(1);
			}
		});
	}

	// Открыть/Закрыть мобильное меню
	$('.js-open-menu').click(function(){
		$('.js-open-menu').toggleClass('active');
		$('.js-top-menu').slideToggle();
	});

	$(document).click(function(event) {
		if ($windowWidth < 768) {
			if ($(event.target).closest(".js-open-menu").length) return;
			if ($(event.target).closest(".js-top-menu").length) return;
			$('.js-open-menu').removeClass('active');
			$('.js-top-menu').slideUp();
			event.stopPropagation();
		}
	});
});
