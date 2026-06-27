// nfc_core.js - Gerçek Web NFC Erişim Motoru

async function startNFCScan(callbackLog) {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            callbackLog("[NFC] Okuyucu aktif edildi. Lütfen kartı telefonun arkasına yaklaştırın...");
            await ndef.scan();
            
            ndef.onreading = event => {
                const serialNumber = event.serialNumber;
                callbackLog(`[NFC BULUNDU] Gerçek Kart UID: ${serialNumber}`);
                localStorage.setItem("saved_nfc_uid", serialNumber);
            };

            ndef.onreadingerror = () => {
                callbackLog("[NFC HATA] Kart okunamadı. Sinyal kesildi veya kart uyumsuz.", true);
            };
        } catch (error) {
            callbackLog(`[NFC HATA] Başlatılamadı: ${error.message}`, true);
        }
    } else {
        callbackLog("[NFC DESTEKLENMİYOR] Bu cihaz veya tarayıcı gerçek Web NFC özelliğini desteklemiyor.", true);
    }
}

function emulateSavedNFC(callbackLog) {
    callbackLog("[NFC HATA] Tarayıcı güvenliği (Sandbox) nedeniyle web siteleri dışarıya NFC sinyali YAYAMAZ (Emüle edemez).", true);
}
