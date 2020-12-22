import Helper from '../utils/helper.js';

const API_URL = 'https://api.football-data.org/v2';
const API_KEY = "<YOUR FOOTBALL-DATA API KEY>";

class DataSource {

    static fetchApi(url) {
        return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        }).then(response => response.json())
    }

    static getKlasmen(liga) {
        return this.fetchApi(`${API_URL}/competitions/${liga}/standings`)
            .then(result => {
                return Promise.resolve(result.standings[0].table);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    static getTopscore(liga) {
        return this.fetchApi(`${API_URL}/competitions/${liga}/scorers`)
            .then(result => {
                return Promise.resolve(result.scorers);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    static getJadwal(liga) {
        return this.fetchApi(`${API_URL}/competitions/${liga}/matches?dateFrom=${Helper.getDateNow()}&dateTo=${Helper.getDateTomorrow()}`)
            .then(result => {
                return Promise.resolve(result.matches);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    static getMatch(liga) {
        return this.fetchApi(`${API_URL}/competitions/${liga}/matches?status=FINISHED`)
            .then(result => {
                return Promise.resolve(result.matches.reverse());
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    static getTeam(id) {
        return this.fetchApi(`${API_URL}/teams/${id}`)
            .then(result => {
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    }
}

export default DataSource;
