// nfc_core.js - Gelişmiş Gerçek Web NFC Erişim Motoru

async function startNFCScan(callbackLog) {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            callbackLog("[NFC] Okuyucu aktif. Kartı telefonun arkasına yaklaştırın...");
            await ndef.scan();
            
            ndef.onreading = event => {
                const serialNumber = event.serialNumber;
                
                // index.html içindeki küresel ses motorunu tetikler
                if (typeof playFlipperSound === "function") {
                    playFlipperSound('trink'); 
                }
                
                callbackLog(`[NFC BAŞARILI] Gerçek Kart UID: ${serialNumber}`);
                localStorage.setItem("saved_nfc_uid", serialNumber);
            };

            ndef.onreadingerror = () => {
                callbackLog("[NFC HATA] Kart okunamadı. Sinyal kesildi.", true);
            };
        } catch (error) {
            callbackLog(`[NFC HATA] Başlatılamadı: ${error.message}`, true);
        }
    } else {
        callbackLog("[NFC DESTEKLENMİYOR] Bu cihaz gerçek Web NFC özelliğini desteklemiyor.", true);
    }
}

function emulateSavedNFC(callbackLog) {
    callbackLog("[NFC HATA] Tarayıcı güvenliği dışarıya sinyal yaymayı engeller.", true);
}
