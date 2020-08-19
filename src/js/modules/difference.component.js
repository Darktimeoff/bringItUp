export default class Difference {
    constructor({container, cardContent, buttonClick, animateClass}) {
        this.$container = document.querySelector(container);
        this.$cards = this.$container.querySelectorAll(cardContent);
        this.buttonClick  = buttonClick;
        this.animateClass = animateClass;
        this.click = 0;
    }

    init() { 
        this.$container.onclick = _containerClickHandler.bind(this);

        this.hideAllCards();
        this.useInit();
    }

    static moreComponent({containers, ...options}) {
        const temp = {};
        containers.forEach(item => {
            options.container = item;
            temp[item.slice(1)] = new Difference(options);
            temp[item.slice(1)].init();
        })
        return temp;
    }

    hideAllCards() {
        this.$cards.forEach((card, i) => {
            if(i < this.$cards.length - 1) {
                _hideCardStyle(card);
            }
        })
    }

    useEnd() {}
    useDestroy() {}
    useInit() {}

    destroy() { 
        this.$container.onclick = null;
        this.destroy();
    }
}


function _containerClickHandler(e) { 
    if(e.target.closest(this.buttonClick)) {
        this.click += 1;
        _showNextCard.call(this, this.click)

        if(this.click === 3){ 
            _hideCardStyle(this.$cards[this.$cards.length - 1]); 
            this.useEnd();
        }
    }
}

function _showNextCard(n) {
    _showCardStyle.call(this, this.$cards[n - 1]);
}
    
function _hideCardStyle(card) { 
    card.classList.add('animated');
    card.style.display = 'none';
}

function _showCardStyle(card) {
    card.style.display = 'flex';
    card.classList.add(this.animateClass);
}