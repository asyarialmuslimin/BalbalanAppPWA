class BottomNav extends HTMLElement {
    set active(active) {
        this._active = active;
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .bottom-nav{
                height: 10vh;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                bottom: 0;
                color: white;
                background:#E6E6E6;
            }

            .nav-wrapper{
                flex-grow:1;
            }
            
            .nav-item{
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #999999;
                font-size: 1.5vh;
            }
            
            .nav-item img{
                width: 25px;
            }

            .nav-item .active{
                color: #1565C0;
                font-size: 1.5vh;
            }
        </style>
        <div class="bottom-nav">
            <div class="nav-wrapper">
                <div class="nav-item">
                    <a href="#klasmen">
                        <img id="klasmen" src="./assets/svg/klasmen.svg" alt="trophy-icon">
                    </a>
                    <div id="caption-klasmen">Klasemen</div>
                </div>
            </div>
            <div class="nav-wrapper">
                <div class="nav-item">
                    <a href="#match">
                        <img id="match" src="./assets/svg/match.svg" alt="match-icon"></a>
                    <div id="caption-match">Match</div>
                </div>            
            </div>
            <div class="nav-wrapper">
                <div class="nav-item">
                    <a href="#jadwal">
                        <img id="jadwal" src="./assets/svg/jadwal.svg" alt="fixture-icon"></a>
                    <div id="caption-jadwal">Jadwal</div>
                </div>            
            </div>
            <div class="nav-wrapper">
                <div class="nav-item">
                    <a href="#favorit">
                        <img id="favorit" src="./assets/svg/favorit.svg" alt="favorit-icon"></a>
                    <div id="caption-favorit">Favorit</div>
                </div>        
            </div>
        </div>`;
        const navItems = this.querySelectorAll('.nav-item a');
        const routeContainer = document.querySelector('route-container');
        navItems.forEach(el => {
            el.addEventListener('click', () => {
                const link = el.getAttribute('href').substring(1);
                routeContainer.route = link;
                setActive(link);
            });
        });
        setActive(this._active);

        function setActive(route) {
            setInactive();
            document.querySelector('#' + route).setAttribute("src", "./assets/svg/" + route + "-active.svg");
            document.querySelector(`#caption-${route}`).classList.add('active');
        }

        function setInactive() {
            const routearr = ['klasmen', 'jadwal', 'match', 'favorit'];
            routearr.forEach(el => {
                document.querySelector(`#${el}`).setAttribute("src", `./assets/svg/${el}.svg`);
                document.querySelector(`#caption-${el}`).classList.remove('active');
            });
        }
    }
}

customElements.define('bottom-nav', BottomNav);