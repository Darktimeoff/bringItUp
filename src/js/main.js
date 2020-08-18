import Slider from './modules/slider.component';

window.addEventListener('DOMContentLoaded', () => {
    const indexSlider = new Slider('.page', '.next', '.sidecontrol .logo');
    indexSlider.render();
});