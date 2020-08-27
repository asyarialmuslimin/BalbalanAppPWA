import DataSource from '../data/data-source.js';
import Helper from '../utils/helper.js';

class ListJadwal extends HTMLElement {
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
                this._jadwal = await DataSource.getJadwal(id);
                if (this._jadwal.length === 0) {
                    this.renderError();
                } else {
                    this.render();
                }
            } catch (error) {}
        }

        getData();

    }

    render() {
        this._awal = 0;
        this._akhir = 10;

        this.innerHTML = `
        <style>
            .jadwal-wrapper{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding:10px;
                color:white;
            }
            
            .date{
                font-size:2vh;
                padding-bottom:10px
            }

            .teams{
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
            }
            
            .status{
                display: flex;
                font-size: 2.5vh;
            }

            .team{
                flex-grow:1;
                font-weight:700;
            }

            .matchday{
                font-size:2vh;
                padding-top:10px
            }
            
        </style>
        <div class="row jadwal"></div>`;

        this.loadData();
    }

    renderError() {
        this.innerHTML = `
        <style>
            .pesanerror{
                width: 100%;
                text-align:center;
                text-size:4vh;
            }
        </style>
        <div class="pesanerror">Sepertinya tidak ada Pertandingan Sepakbola Terjadwal</div>`;
    }

    loadData() {
        const jadwallist = this.querySelector('.jadwal');
        this._jadwal.forEach(data => {
            const date = Helper.convertToDate(data.utcDate);
            jadwallist.innerHTML += `
            <div class="col m4 s12">
                    <div class="card  green darken-3">
                        <div class="jadwal-wrapper">
                            <div class="date">${this._liga} | ${date}</div>
                            <div class="teams">
                                <div class="status">
                                    <div class="team">${data.homeTeam.name}</div>
                                </div>
                                <div>VS</div>
                                <div class="status">
                                    <div class="team">${data.awayTeam.name}</div>
                                </div>
                            </div>
                            <div class="matchday">Matchday ${data.matchday}</div>
                        </div>
                    </div>
                </div>`;
        });
    }
}

customElements.define('list-jadwal', ListJadwal);