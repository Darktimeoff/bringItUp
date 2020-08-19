import Slider from './slider.component';

export default class MainSlider extends Slider {
    constructor({logo=null, next, prev, ...options}) {
        super(options);
		try {
			this.$logo = this.$container.querySelectorAll(logo);
			this.$next = this.$container.querySelectorAll(next);
			this.$prev = this.$container.querySelectorAll(prev);
			console.log(this)
		} catch (e) {}
    }

    render() {
		try {
			try {
				this.hanson = document.querySelector('.hanson');
			} catch (e) {}
	
			this.bindTriggers();
		} catch (e){}
	}

	bindTriggers() {
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

		this.$prev.forEach(prev => {
			prev.onclick = (e) => {
				e.preventDefault();
				this.plusSlides(-1);
			}
		});

		this.$next.forEach(next => {
			next.onclick = (e) => {
				e.preventDefault();
				this.plusSlides(1);
			}
		});
	}

	showSlides(n = 1) { 
		if(n > this.$slides.length) this.slideIndex = 1;

		if(n < 1) this.slideIndex = this.$slides.length;

		_showSlideAfterDelay.call(this);

		_hideAllSlides(this.$slides);

		_showSlide(this.$slides, this.slideIndex - 1);
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}


	destroy() {
		this.$btns.forEach( btn => {
			btn.onclick = null;
		});

		this.$logo.forEach(logo => {
			logo.onclick = null;
		});

		this.$prev.forEach(prev => {
			prev.onclick = null;
		});

		this.$next.forEach(next => {
			next.onclick = null
		});
	}
}

function _hideAllSlides(slides) {
	slides.forEach( slide => {
		slide.classList.add('animated');
		slide.classList.remove('slideInDown');
		slide.style.display = 'none';
	});
}

function _showSlide(slides, n, display='block') {
	slides[n].style.display = display;
	slides[n].classList.add('slideInDown');
}

function _showSlideAfterDelay() {
	if(this.$container.classList.contains('page')) {
		this.hanson.style.opacity = 0;
		if(this.slideIndex === 3) {
			setTimeout(() => {
				this.hanson.style.opacity = 1;
				this.hanson.classList.add('animated','slideInUp');
			}, 3000);
		} else {
			this.hanson.classList.remove('slideInUp');
		}
	}
}
