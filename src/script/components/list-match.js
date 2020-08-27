import DataSource from '../data/data-source.js';
import Helper from '../utils/helper.js';

class ListMatch extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `<pre-loader></pre-loader>`;
    }

    set id(id) {
        this.innerHTML = `<pre-loader></pre-loader>`;
        switch (id) {
            case 2021:
                this._liga = "Premiere League";
                break;
            case 2014:
                this._liga = "LA Liga";
                break;
            case 2019:
                this._liga = "Serie A";
                break;
            case 2002:
                this._liga = "Bundesliga";
                break;
            case 2015:
                this._liga = "Ligue 1";
                break;
            default:
                break;
        }

        const getData = async () => {
            try {
                this._match = await DataSource.getMatch(id);
                this.render();
            } catch (error) {

            }
        }
        getData();
    }

    render() {
        this._awal = 0;
        this._akhir = 9;

        this.innerHTML = `
        <style>
            .match-wrapper{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding:10px;
                color:white;
            }

            .listmatch-header, .listmatch-footer{
                font-size:2vh;
            }

            .date{
                margin-bottom:10px;
            }

            .teams{
                width:100%;
            }
            
            .status{
                display: flex;
                font-size: 2.5vh;
            }

            .team{
                flex-grow:1
            }
            
            .score{
                font-weight: 700;
                margin-right: 10px;
            }

            .duration{
                margin-top:10px;
            }
            
            .btnloadmore{
                cursor: pointer;
                width: 100%;
                padding:10px 20px;
                border: none;
                background: white;
                font-size: 3vh;
                font-weight: 700;
                color: #c62828;
                border: 2px solid #c62828;
            }

            .btnloadmore:focus{
                background:none;
            }
        </style>
        <div class="row match"></div>
        <button class="btnloadmore">Load More</button>`;

        this.loadData();

        const loadMore = this.querySelector('.btnloadmore');
        loadMore.addEventListener('click', () => {
            this._awal += 9;
            if (this._akhir > this._match.length) {
                this._akhir = this._match.length - 1;
                loadMore.classList.add('hide');
            } else {
                this._akhir += 9;
            }
            this.loadData();
        })
    }

    loadData() {
        const matchlist = this.querySelector('.match');
        this._matcharr = this._match.slice(this._awal, this._akhir);
        this._matcharr.forEach(data => {
            const date = Helper.convertToDate(data.utcDate);
            matchlist.innerHTML += `
                <div class="col m4 s12">
                    <div class="card red darken-3">
                        <div class="match-wrapper">
                            <div class="listmatch-header">
                                <div class="date">${this._liga} | ${date}</div>
                            </div>
                            <div class="teams">
                                <div class="status">
                                    <div class="team">${data.homeTeam.name}</div>
                                    <div class="score">${data.score.fullTime.homeTeam}</div>
                                </div>
                                <div class="status">
                                    <div class="team">${data.awayTeam.name}</div>
                                    <div class="score">${data.score.fullTime.awayTeam}</div>
                                </div>
                            </div>
                            <div class="listmatch-footer">
                                <div class="duration">FULL TIME</div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    }

}

customElements.define('list-match', ListMatch);