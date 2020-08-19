export default class VideoPlay{
    constructor(page=null, buttons=null) { 
    	try {
			this.$page = document.querySelector(page);
			this.$btns = this.$page.querySelectorAll(buttons);
			this.$overlay = this.$page.parentElement.querySelector('.overlay');
            this.$close = this.$overlay.querySelector('.close');
    	} catch(err) {

       }
    }

    init() {
        try{
			const tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			_bindTriggersPlay.call(this);
			_bindCloseBtn.call(this);
		} catch(err) {}
    }

    useClose() {

    }

    btnClickHandler(e) {
        e.preventDefault();
        this.currentBtn = e.target;
        const path = e.target.closest('[data-url]').getAttribute('data-url');
        _createPlayer.call(this, path);
    }

    destroy() {
        this.$btns.forEach(btn => {
            btn.onclick = null;
        });

        this.$close.onclick = null;

        this.player.destroy();
    }
}


function _closeClickHandler() {
    _overlayStyle.call(this, 'none', ['animated', 'fadeOut'], ['fadeIn']);
    this.player.stopVideo();
    this.useClose()
}

function _bindTriggersPlay() {
    this.$btns.forEach(btn => {
        if(btn.classList.contains('closed')) btn.onclick = null;
        else btn.onclick = (e) => {
          this.btnClickHandler(e);
        }
    });
}

function _bindCloseBtn() {
    this.$close.onclick = _closeClickHandler.bind(this);
}

function _createPlayer(url) { 
    _overlayStyle.call(this, 'flex', ['animated', 'fadeIn'], ['fadeOut']);
	if(this.player) {
       this.player.loadVideoById({videoId:`${url}`});
       return;
	}
	this.player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: `${url}`
    });
}

function _overlayStyle(display, addClass, removeClass) {
    this.$overlay.style.display = display;
    this.$overlay.classList.add(...addClass);
    this.$overlay.classList.remove(...removeClass);
}