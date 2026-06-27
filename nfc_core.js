async function startNFCScan(callback) {
    if (!('NDEFReader' in window)) {
        callback({ status: "HATA", message: "Tarayıcı desteklemiyor." });
        return;
    }

    try {
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.onreading = event => {
            if (event.serialNumber) {
                // UID verisini direkt gönderiyoruz
                callback({ status: "SUCCESS", uid: event.serialNumber });
            }
        };

        ndef.onreadingerror = () => {
            callback({ status: "HATA", message: "Okuma hatası." });
        };
    } catch (e) {
        callback({ status: "HATA", message: e.message });
    }
}
