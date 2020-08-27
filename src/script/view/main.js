import Helper from "../utils/helper";

const main = () => {

    if ('serviceWorker' in navigator) {
        registerSW();
        requestPermission();
    } else {
        console.log("Service Worker tidak didukung browser ini");
    }

    function registerSW() {
        return navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('Registrasi service worker berhasil.');
                return registration;
            })
            .catch(function (err) {
                console.error('Registrasi service worker gagal.', err);
            });
    }

    function requestPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(function (result) {
                if (result === "denied") {
                    console.log("Fitur notifikasi tidak diijinkan.");
                    return;
                } else if (result === "default") {
                    console.error("Pengguna menutup kotak dialog permintaan ijin.");
                    return;
                }

                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: Helper.urlBase64ToUint8Array("BNLoE9aXa3vBXaoqmigZT9692VOkNkP2TMfOdrdCYTcNlIdvSMFa88nf2Ipte3WJeZcALsgq-cdqgK9X_b1jZHs")
                        }).then(function (subscribe) {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(function (e) {
                            console.error('Tidak dapat melakukan subscribe ', e.message);
                        });
                    });
                }
            });
        }
    }

    const routeContainer = document.querySelector('route-container');
    const bottomNav = document.querySelector('bottom-nav');

    let page = window.location.hash.substr(1);
    if (page === "") page = "klasmen";
    routeContainer.route = page;
    if (page.indexOf('?') === -1) bottomNav.active = page;
}

export default main;