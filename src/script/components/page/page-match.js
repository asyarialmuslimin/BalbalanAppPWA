import '../list-match.js';

class PageMatch extends HTMLElement {
    set halaman(liga) {
        const match = this.querySelector('list-match');
        match.id = liga;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .match-header{
                width:100%;
                padding:15px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                color:white;
                margin-bottom:10px;
            }
            .match-header .title{
                font-weight:700;
                font-size:4vh;
            }
            .match-header .subtitle{
                font-size:2vh;
                text-align:center;
            }
        </style>
        <competition-tabs></competition-tabs>
        <div class="match-header red darken-3">
            <div class="title">Match</div>
            <div class="subtitle">Menampilkan Hasil Pertandingan Liga</div>
        </div>
        <list-match></list-match>`;

        const tabs = document.querySelector('competition-tabs');
        tabs.activeTab = ["match", 2021];
        this.querySelector('list-match').id = 2021;
    }
}

customElements.define('page-match', PageMatch);