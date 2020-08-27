import '../list-jadwal.js';

class PageJadwal extends HTMLElement {
    set halaman(liga) {
        const jadwal = this.querySelector('list-jadwal');
        jadwal.id = liga;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .jadwal-header{
                width:100%;
                padding:15px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                color:white;
                margin-bottom:10px;
            }
            .jadwal-header .title{
                font-weight:700;
                font-size:4vh;
            }
            .jadwal-header .subtitle{
                font-size:2vh;
                text-align:center;
            }
        </style>
        <competition-tabs></competition-tabs>
        <div class="jadwal-header green darken-3">
            <div class="title">Jadwal</div>
            <div class="subtitle">Menampilkan Jadwal Pertandingan Liga yang akan berlangsung</div>
        </div>
        <list-jadwal></list-jadwal>`;

        const tabs = document.querySelector('competition-tabs');
        tabs.activeTab = ["jadwal", 2021];
        this.querySelector('list-jadwal').id = 2021;
    }
}

customElements.define('page-jadwal', PageJadwal);