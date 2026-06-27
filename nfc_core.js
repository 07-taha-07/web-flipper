async function startNFCScan(callback) {
    if (!('NDEFReader' in window)) {
        callback("[HATA] Cihaz desteklemiyor.", null);
        return;
    }

    try {
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.onreading = event => {
            // UID verisi mutlaka olmalı
            if (event.serialNumber) {
                callback("OK", { uid: event.serialNumber });
            }
        };

        ndef.onreadingerror = () => {
            callback("[HATA] Kart okunamadı.", null);
        };
    } catch (e) {
        callback(`[HATA] ${e.message}`, null);
    }
}
