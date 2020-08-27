class CompetitionTabs extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            'mode': 'open'
        });
    }

    set activeTab(active) {
        this._active = active;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .tabs{
                display:block;
                overflow-x: scroll;
                height: auto;
                white-space: nowrap;
            }

            ::-webkit-scrollbar {
                width: 0px;
                background: transparent;
            }
            
            .tabs button, .tabs button:focus{
                display: inline-block;
                cursor: pointer;
                color: #00A2FF;
                font-size: 20px;    
                border: none;
                background: none;
                margin: 10px;
                padding: 10px;
            }
            
            .tabs .active{
                color: #0277BD;
                border-bottom: 2px solid #0277BD;
            }
        </style>

        <div class="tabs">
            <button class="pl" idliga="2021">Premier League</button>
            <button class="la" idliga="2014">LA Liga</button>
            <button class="sa" idliga="2019">Serie A</button>
            <button class="bl" idliga="2002">Bundesliga</button>
            <button class="lo" idliga="2015">Ligue 1</button>
        </div>`;
        this.setActives(this._active[1]);
        this.tabsClick();
        if (this._active[0] === "klasmen") {
            const pageKlasmen = document.querySelector('page-klasmen');
            pageKlasmen.halaman = this._active[1];
        } else if (this._active[0] === "match") {
            const pageMatch = document.querySelector('page-match');
            pageMatch.halaman = this._active[1];
        } else if (this._active[0] === "jadwal") {
            const pageJadwal = document.querySelector('page-jadwal');
            pageJadwal.halaman = this._active[1];
        }
    }

    removeActives() {
        const tabs = this.shadowDOM.querySelectorAll('.tabs button');
        tabs.forEach(el => {
            el.classList.remove('active');
        })
    }

    setActives(active) {
        this.removeActives();

        const pl = this.shadowDOM.querySelector('.pl');
        const la = this.shadowDOM.querySelector('.la');
        const sa = this.shadowDOM.querySelector('.sa');
        const bl = this.shadowDOM.querySelector('.bl');
        const lo = this.shadowDOM.querySelector('.lo');

        switch (active) {
            case 2021:
                pl.classList.add('active');
                break;
            case 2014:
                la.classList.add('active');
                break;
            case 2019:
                sa.classList.add('active');
                break;
            case 2002:
                bl.classList.add('active');
                break;
            case 2015:
                lo.classList.add('active');
                break;
            default:
                break;
        }
    }

    tabsClick() {
        const tab = this.shadowDOM.querySelectorAll('.tabs button');
        tab.forEach(elm => {
            elm.addEventListener('click', () => {
                const page = document.querySelector(`page-${this._active[0]}`);
                const idliga = elm.getAttribute('idliga');
                this.setActives(parseInt(idliga));
                page.halaman = parseInt(idliga);
            })
        });
    }
}

customElements.define('competition-tabs', CompetitionTabs);