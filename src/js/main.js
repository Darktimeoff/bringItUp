import MainSlider from './modules/slider/slider-main.component';
import VideoPlay from './modules/playVideo.component';
import MiniSlider from './modules/slider/slider-mini.component'
window.addEventListener('DOMContentLoaded', () => {
    const mainPageSlider = new MainSlider({container:'.page', btns:'.next', logo:'.sidecontrol .logo'});
    mainPageSlider.render();

    const showUpSlider = new MiniSlider({
        container:'.showup__content-slider', 
        slides:'.card', 
        next: '.showup__next', 
        prev:'.showup__prev', 
        activeClass: 'card-active',
        animate: true,
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container:'.modules__content-slider',  
        slides:'.card', 
        next: '.modules__info-btns .slick-next', 
        prev:'.modules__info-btns .slick-prev', 
        activeClass: 'card-active',
        animate: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container:'.feed__slider', 
        slides:'.feed__item', 
        next: '.feed__slider .slick-next', 
        prev:'.feed__slider .slick-prev', 
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    const pageVideo = new VideoPlay('.page', '.showup .play');
    pageVideo.init();

});