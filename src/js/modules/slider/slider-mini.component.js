import Slider from './slider.component';

export default class MiniSlider extends Slider {
    constructor({activeClass = '', ...options}) {
        super(options);
        this.activeClass = activeClass
        console.log(this)
    }

    init() {
        this.$container.style.cssText = `
            display: flex;
            flex: wrap;
            overflow: hidden;
            align-items: flex-start;
        `
    }
}
