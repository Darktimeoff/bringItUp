export default class VideoPlay{
    constructor(page=null, buttons=null) { 
    	try {
			this.$page = document.querySelector(page);
			this.$btns = this.$page.querySelectorAll(buttons);
			this.$overlay = this.$page.parentElement.querySelector('.overlay');
			this.$close = this.$overlay.querySelector('.close');
			this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
			
    	} catch(err) {

       }
    }

    init() {
        try{
			const tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			this.bindTriggersPlay()
			this.bindCloseBtn();
		} catch(err) {}
    }

	bindTriggersPlay() {
		this.$btns.forEach((btn, i) => {
			try{
				if(i % 2 === 1) {
					btn.setAttribute('data-disabled', true);
				}
			} catch(e) {} 

			if(btn.getAttribute('data-disabled')) btn.onclick = null;
			else btn.onclick = _btnClickHandler.bind(this);
		});
	}

	bindCloseBtn() {
		this.$close.onclick = _closeClickHandler.bind(this);
	}

    useClose() {

    }
	
	createPlayer(url) {
		_overlayStyle.call(this, 'flex', ['animated', 'fadeIn'], ['fadeOut']);
		if(this.player) return;

		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: `${url}`,
			events: {
				'onStateChange': this.onPlayerStateChange
			}
		});
	}

	onPlayerStateChange(state) {
		try {
			if(!state.data) {
				const $playCircle = _showClosedVideoStyle.call(this);
		
				$playCircle.onclick = _btnClickHandler.bind(this);
			}
		} catch (e) {}
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

function _btnClickHandler(e) {
	e.preventDefault();
	this.$activeBtn = e.target;

	const url = e.target.closest('[data-url]').getAttribute('data-url');
	if(this.player) {
		if(this.path !==  url) {
			this.path = url;

			this.player.loadVideoById({videoId: this.path});
			_overlayStyle.call(this, 'flex', ['animated', 'fadeIn'], ['fadeOut'])
		} else {
			_overlayStyle.call(this, 'flex', ['animated', 'fadeIn'], ['fadeOut'])
		}
	} else {
		this.path = url;
		this.createPlayer(this.path);
	}
}

function _overlayStyle(display, addClass, removeClass) {
    this.$overlay.style.display = display;
    this.$overlay.classList.add(...addClass);
    this.$overlay.classList.remove(...removeClass);
}

function _showClosedVideoStyle() {
	const $openVideo = this.$activeBtn.closest('.module__video-item');
	const $playSvg = this.$activeBtn.querySelector('svg').cloneNode(true);;
	console.log($playSvg, this.$activeBtn)

	const $closedVideo = $openVideo.nextElementSibling;
	$closedVideo.style.filter = "grayscale(0%)";
	$closedVideo.style.opacity = '1';

	const $playCircle = $closedVideo.querySelector('.play__circle');
	$playCircle.classList.remove('closed');
	$playCircle.querySelector('svg').remove();
	$playCircle.appendChild($playSvg)
	$playCircle.setAttribute('data-disabled', false);

	const $playText = $closedVideo.querySelector('.play__text');
	$playText.classList.remove('attention');
	$playText.textContent = 'play video'; 

	return $playCircle;
}