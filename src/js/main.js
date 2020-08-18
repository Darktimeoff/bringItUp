import Slider from './modules/slider.component';
import VideoPlay from './modules/playVideo.component';

window.addEventListener('DOMContentLoaded', () => {
    const indexSlider = new Slider('.page', '.next', '.sidecontrol .logo');
    indexSlider.render();

    const indexVideo = new VideoPlay('.page', '.showup .play');
    indexVideo.init();

});