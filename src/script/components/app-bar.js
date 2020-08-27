class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set mode(mode) {
        this._mode = mode;
        this.render();
    }

    set favorited(status) {
        if (status === 1) {
            const star = this.querySelector('.star-btn img');
            star.setAttribute('src', '/assets/svg/star-active.svg');
        }
    }

    render() {
        this.innerHTML = `
        <style>
            .appbar{
                position: fixed;
                top: 0;
                z-index: 3;
                height: 10vh;
                width: 100%;
                color: white;
                display: flex;
                align-items: center;
                justify-content:center;
            }
            .appbar .title{
                font-size: 36px;
                text-align:center;
                flex-grow:1;
            }
            .back-btn, .star-btn{
                padding:5px 20px;
                cursor:pointer;
            }
            
        </style>
        <div class="appbar light-blue darken-3">
            <a class="back-btn hide">
                <img src="/assets/svg/back.svg" height="30px" />
            </a>
            <div class="title">
                BalBalan
            </div>
            <a class="star-btn hide">
                <img src="/assets/svg/star.svg" height="40px" />
            </a>
        </div>
        `;
        if (this._mode) {
            const back = this.querySelector('.back-btn');
            const star = this.querySelector('.star-btn');
            const bottomNav = document.querySelector('bottom-nav');
            back.classList.remove('hide');
            star.classList.remove('hide');
            bottomNav.classList.add('hide');

        }
    }
}

customElements.define('app-bar', AppBar);