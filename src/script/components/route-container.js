import Helper from "../utils/helper";

class RouteContainer extends HTMLElement {
    set route(route) {
        this._teamdata = undefined;
        this._teamid = undefined;
        if (route.length > 2) {
            if (route.indexOf('?') > -1) {
                this._teamid = Helper.getId(route);
                this._route = Helper.getRoute(route);
            } else {
                this._route = route;
            }
        } else {
            if (route[0] === 'team-favorit') {
                this._route = 'team';
                this._teamdata = route[1];
            }
        }
        this.render();
    }

    render() {
        this.innerHTML = `<page-${this._route}></page-${this._route}>`;
        if (this._teamid) {
            document.querySelector('page-team').id = this._teamid;
        } else if (this._teamdata) {
            document.querySelector('page-team').favorit = this._teamdata;
        }
    }
}

customElements.define('route-container', RouteContainer);