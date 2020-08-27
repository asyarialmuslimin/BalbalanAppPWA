import DataSource from "../../data/data-source";
import DBSource from "../../data/db-source";

class PageTeam extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `<pre-loader></pre-loader>`;
    }

    set id(id) {
        this.innerHTML = `<pre-loader></pre-loader>`;
        const getData = async () => {
            this._team = await DataSource.getTeam(id);
            this.render();
        }
        getData();
    }

    set favorit(data) {
        this._team = data;
        this._status = "favorit";
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .logo-wrapper{
                width: 100%;
                height: 300px;
                display: flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
            }
            .team-name{
                margin-top:20px;
                font-size:3vh;
            }
            .team-content{
                width:100%;
            }
        </style>

        <div class="logo-wrapper">
            <img src="${this._team.crestUrl}" alt="team-logo" height="150px" />
            <div class="team-name">${this._team.name}</div>
        </div
        <div class="card team-content">
            <h5>Profil Tim</h5>
            <table>
                <tbody>
                    <tr>
                        <td>Pelatih</td><td> : </td><td>${this._team.squad[this._team.squad.length - 1].name}</td>
                    </td>
                    <tr>
                        <td>Alamat</td><td> : </td><td>${this._team.address}</td>
                    </tr>
                    <tr>
                        <td>Telepon</td><td> : </td><td>${this._team.phone}</td>
                    </tr>
                    <tr>
                        <td>Website</td><td> : </td><td>${this._team.website}</td>
                    </tr>
                    <tr>
                        <td>Email</td><td> : </td><td>${this._team.email}</td>
                    </tr>
                    <tr>
                        <td>Tahun Dibentuk</td><td> : </td><td>${this._team.founded}</td>
                    </tr>
                    <tr>
                        <td>Warna Tim</td><td> : </td><td>${this._team.clubColors}</td>
                    </tr>
                    <tr>
                        <td>Stadion</td><td> : </td><td>${this._team.venue}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <h5>Susunan Pemain</h5>
            <table>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Posisi</th>
                        <th>Asal</th>
                    </tr>
                </thead>
                <tbody id="pemain">
                </tbody>
            </table>
        </div>
        `;
        const pemain = this.querySelector('#pemain');
        this._team.squad.forEach(result => {
            pemain.innerHTML += `
                <tr>
                    <td>${result.name}</td>
                    <td>${result.position}</td>
                    <td>${result.nationality}</td>
                </tr>
            `;
        });

        const appBar = document.querySelector('app-bar');
        appBar.mode = 'team';

        const searchData = async () => await DBSource.searchData(this._team.name)
            .then(result => {
                appBar.favorited = result.length
            });
        searchData();

        document.querySelector('.star-btn').addEventListener('click', () => {
            const starStatus = document.querySelector('.star-btn img').getAttribute('src');

            if (starStatus === "/assets/svg/star-active.svg") {
                M.toast({
                    html: "Menghapus dari Favorit"
                });
                DBSource.deleteData(this._team.id);
                document.querySelector('.star-btn img').setAttribute('src', '/assets/svg/star.svg');
            } else {
                M.toast({
                    html: "Menambahkan ke Favorit"
                });
                DBSource.createData(this._team);
                document.querySelector('.star-btn img').setAttribute('src', '/assets/svg/star-active.svg');
            }
        });

        document.querySelector('.back-btn').addEventListener('click', () => {
            document.querySelector('.back-btn').classList.add('hide');
            document.querySelector('.star-btn').classList.add('hide');
            document.querySelector('bottom-nav').classList.remove('hide');

            if (this._status) {
                document.querySelector('bottom-nav').active = 'favorit';
                document.querySelector('route-container').route = 'favorit';
            } else {
                document.querySelector('bottom-nav').active = 'klasmen';
                document.querySelector('route-container').route = 'klasmen';
            }
        });
    }
}

customElements.define('page-team', PageTeam);