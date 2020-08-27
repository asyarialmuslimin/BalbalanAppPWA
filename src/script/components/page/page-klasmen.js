import '../klasmen-table.js';

class PageKlasmen extends HTMLElement {

    set halaman(liga) {
        const klasmen = this.querySelector('klasmen-table');
        klasmen.id = liga;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .klasmen-header{
                width:100%;
                padding:15px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                color:white;
            }
            .klasmen-header .title{
                font-weight:700;
                font-size:4vh;
            }
            .klasmen-header .subtitle{
                font-size:2vh;
                text-align:center;
            }
        </style>
        <competition-tabs></competition-tabs>
        <div class="klasmen-header blue darken-3">
            <div class="title">Klasmen</div>
            <div class="subtitle">Menampilkan Klasmen Sementara Liga dan Daftar Top Scorer Sementara</div>
        </div>
        <klasmen-table></klasmen-table>
        `;
        const tabs = document.querySelector('competition-tabs');
        tabs.activeTab = ["klasmen", 2021];
        this.querySelector('klasmen-table').id = 2021;
    }
}
customElements.define('page-klasmen', PageKlasmen);