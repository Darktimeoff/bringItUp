export default class Slider {
    constructor(page,  btns, logo) {
		try {
			this.$page = document.querySelector(page);
			this.$slides = [...this.$page.children];
			this.$btns = this.$page.querySelectorAll(btns);
			this.slideIndex = 1;
			this.$logo = this.$page.querySelectorAll(logo);
		} catch (e) {}
	}

	render() {
		this.$btns.forEach( btn => {
			btn.onclick = (e) => {
				e.preventDefault();
				this.plusSlides(1);
			};
		});

		this.$logo.forEach(logo => {
			logo.onclick = (e) => {
				e.preventDefault();
				this.showSlides(this.slideIndex = 1);
			};
		});

		this.showSlides(1)
	}

	showSlides(n = 1) { 
		if(n > this.$slides.length) this.slideIndex = 1;

		if(n < 1) this.slideIndex = this.$slides.length;

		_hideAllSlides(this.$slides);

		_showSlide(this.$slides, this.slideIndex - 1);
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	destroy() {
		this.$btns.forEach( btn => {
			btn.onclick = null
		});

		this.$logo.forEach(logo => {
			logo.onclick = null;
		});
	}
}

function _hideAllSlides(slides) {
	slides.forEach( slide => {
		slide.classList.add('animated');
		slide.classList.remove('slideInDown');
		slide.style.display = 'none';
	})
}

function _showSlide(slides, n, display='block') {
	slides[n].style.display = display;
	slides[n].classList.add('slideInDown');
}