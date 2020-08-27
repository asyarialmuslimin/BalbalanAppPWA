import DataSource from '../data/data-source.js';
import Helper from '../utils/helper.js';

class KlasmenTable extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `<br><br><pre-loader></pre-loader>`;
    }

    set id(id) {
        this.innerHTML = `<br><br><pre-loader></pre-loader>`;

        const getData = async () => {
            try {
                this._klasmen = await DataSource.getKlasmen(id);
                this._topscore = await DataSource.getTopscore(id);
                this.render();
            } catch (error) {}
        }

        getData();
    }

    render() {
        this.innerHTML = `
        <style>
            .card{
                padding: 20px;
                overflow-x: scroll;
            }
            .klasmen{
                margin-bottom: 20px;
            }

            @media screen and (max-width: 600px){
                .card{
                    overflow-x: scroll;
                }   
            }
        </style>
        <div class="card">
            <div class="klasmen">
                <h5>Klasemen</h5>
                <table class="highlight">
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Team</th>
                            <th></th>
                            <th>GP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GT</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                    </thead>
                    <tbody class="table-klasmen">

                    </tbody>
                </table>
            </div>
            <div class="topscore">
                <h5>Top Scorer</h5>
                <table class="highlight">
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Nama</th>
                            <th>Team</th>
                            <th>Total Goal</th>
                        </tr>
                    </thead>
                    <tbody class="table-topscore">

                    </tbody>
                </table>
            </div>
        </div>`;

        const tklasmen = this.querySelector('.table-klasmen');
        const ttopscore = this.querySelector('.table-topscore');

        for (let i = 0; i < this._klasmen.length; i++) {
            tklasmen.innerHTML += `
                    <tr>
                        <td>${this._klasmen[i].position}</td>
                        <td>
                            <img src="${Helper.setHttps(this._klasmen[i].team.crestUrl)}" alt="teams-logo" height="20px" />
                        </td>
                        <td><a class="team-name" href="#team?id=${this._klasmen[i].team.id}">${this._klasmen[i].team.name}</a></td>
                        <td>${this._klasmen[i].playedGames}</td>
                        <td>${this._klasmen[i].won}</td>
                        <td>${this._klasmen[i].draw}</td>
                        <td>${this._klasmen[i].lost}</td>
                        <td><b>${this._klasmen[i].points}</b></td>
                        <td>${this._klasmen[i].goalsFor}</td>
                        <td>${this._klasmen[i].goalsAgainst}</td>
                        <td>${this._klasmen[i].goalDifference}</td>
                    </tr>
                    
                `;
        }

        const routeContainer = document.querySelector('route-container');

        const link = this.querySelectorAll('.team-name');
        link.forEach(elm => {
            elm.addEventListener('click', () => {
                routeContainer.route = elm.getAttribute('href').substring(1);
            })
        });

        for (let i = 0; i < this._topscore.length; i++) {
            ttopscore.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${this._topscore[i].player.name}</td>
                <td>${this._topscore[i].team.name}</td>
                <td>${this._topscore[i].numberOfGoals}</td>
            </tr>
            `;
        }
    }

}

customElements.define('klasmen-table', KlasmenTable);