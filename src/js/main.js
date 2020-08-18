import MainSlider from './modules/slider/slider-main.component';
import VideoPlay from './modules/playVideo.component';
import MiniSlider from './modules/slider/slider-mini.component'
window.addEventListener('DOMContentLoaded', () => {
    const mainPageSlider = new MainSlider({container:'.page', btns:'.next', logo:'.sidecontrol .logo'});
    mainPageSlider.render();

    const showUpSlider = new MiniSlider({container:'.showup__content-slider', next: '.showup__next', prev:'.showup__prev', activeClass: 'card-active'});
    showUpSlider.init();

    const modulesSlider = new MiniSlider({container:'.modules__content-slider', next: '.modules__info-btns .slick-next', prev:'.modules__info-btns .slick-prev', activeClass: 'card-active'});
    modulesSlider.init();

    const feedSlider = new MiniSlider({container:'.feed__slider', next: '.feed__slider .slick-next', prev:'.feed__slider .slick-prev', activeClass: 'feed__item-active'});
    feedSlider.init();

    const pageVideo = new VideoPlay('.page', '.showup .play');
    pageVideo.init();

});