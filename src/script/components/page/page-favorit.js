import DBSource from "../../data/db-source";

class PageFavorit extends HTMLElement {
    connectedCallback() {
        this.getData();
    }

    async getData() {
        this._favorit = await DBSource.readAll();
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>

            .favorit-header{
                width:100%;
                padding:15px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                color:white;
                margin-bottom:10px;
            }
            .favorit-header .title{
                font-weight:700;
                font-size:4vh;
            }
            .favorit-header .subtitle{
                font-size:2vh;
                text-align:center;
            }

            .favorit-item{
                padding:10px;
                display:flex;
                cursor:pointer;
            }

            .favorit-name{
                padding-left:10px;
                font-size:3.5vh;
                color:white;
            }
        </style>
        <div class="favorit-header orange darken-3">
            <div class="title">Favorit</div>
            <div class="subtitle">Menampilkan Tim Favorit</div>
        </div>
        <div class="row"></div>`;
        this._favorit.forEach(result => {
            this.querySelector('.row').innerHTML += `
            <div class="col m4 s12">
                <div class="card favorit-item orange darken-3">
                    <img src="${result.crestUrl}" alt="favorit-icon" height="40px" />
                    <div class="favorit-name">${result.name}</div>
                </div>
            </div>`;
        });

        const favoritItem = this.querySelectorAll('.favorit-item');
        for (let i = 0; i < favoritItem.length; i++) {
            favoritItem[i].addEventListener('click', () => {
                document.querySelector('route-container').route = ['team-favorit', this._favorit[i]];
            });
        }
    }
}

customElements.define('page-favorit', PageFavorit);