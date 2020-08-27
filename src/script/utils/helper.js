class Helper {
    static setHttps(url) {
        return url.replace(/^http:\/\//i, 'https://');
    }

    static getDateNow() {
        const now = new Date();
        let date = now.getDate();
        let month = now.getMonth() + 1;
        const year = now.getFullYear();

        if (date < 10) date = '0' + date;
        if (month < 10) month = '0' + month;
        return `${year}-${month}-${date}`;
    }

    static getDateTomorrow() {
        const tomorrow = new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000));
        let date = tomorrow.getDate();
        let month = tomorrow.getMonth() + 1;
        const year = tomorrow.getFullYear();

        if (date < 10) date = '0' + date;
        if (month < 10) month = '0' + month;
        return `${year}-${month}-${date}`;
    }

    static convertToDate(utc) {
        const year = utc.substring(0, 4);
        const month = utc.substring(5, 7);
        const date = utc.substring(8, 10);

        return `${date}-${month}-${year}`;
    }

    static getRoute(link) {
        const arr = link.split('?');
        if (arr[0].indexOf('#') > -1) {
            return arr[0].substring(1);
        } else {
            return arr[0];
        }
    }

    static getId(link) {
        const arr = link.split('?');
        const arrlink = arr[1].split('=');
        return arrlink[1];
    }

    static urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

export default Helper;