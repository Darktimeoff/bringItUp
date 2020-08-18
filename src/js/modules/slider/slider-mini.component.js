import Slider from './slider.component';

export default class MiniSlider extends Slider {
    constructor({slides = null, ...options}) {
        super(options);
        this.$slides = [...this.$container.querySelectorAll(slides)];
        console.log(this)
    }

    init() {
        this.$container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `
        _bindTriggers.call(this);

        _hideActiveSlide.call(this);
        _addActiveSlide.call(this, this.$slides[0]);
    }
}

function _swapNext(array) {
    array.push(array.shift());
}

function _swapPrev(array) {
    array.unshift(array.pop())
}

function _nextClickHandler(e) {
    e.preventDefault();
    _hideActiveSlide.call(this);

    this.$container.appendChild(this.$slides[0]);

    _swapNext(this.$slides);
    
    _addActiveSlide.call(this, this.$slides[0]);
}

function _prevClickHandler(e) {
    e.preventDefault();
    _hideActiveSlide.call(this)

    let active = this.$slides[this.$slides.length - 1];
    this.$container.insertBefore(active, this.$slides[0])
    _addActiveSlide.call(this, active);

    _swapPrev(this.$slides);
}

function _bindTriggers() {
    this.$next.onclick = _nextClickHandler.bind(this);

    this.$prev.onclick = _prevClickHandler.bind(this);
}

function _hideActiveSlide() {
    const active = this.$slides.find(slide => slide.classList.contains(this.activeClass));
    active.classList.remove(this.activeClass);
    if(this.animate) {
        active.querySelector('.card__title').style.opacity = '0.4';
        active.querySelector('.card__controls-arrow').style.opacity = '0';
    }
}

function _addActiveSlide(slide) { 
    slide.classList.add(this.activeClass);
    if(this.animate) {
        slide.querySelector('.card__title').style.opacity = '1';
        slide.querySelector('.card__controls-arrow').style.opacity = '1';
    }
}