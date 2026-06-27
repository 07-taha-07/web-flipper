async function startNFCScan(callbackLog) {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            callbackLog("NFC Alanı Aktif. Kartı yaklaştırın...");
            
            ndef.addEventListener("readingerror", () => {
                callbackLog("NFC Kart okuma hatası! Tekrar deneyin.", true);
            });
            
            ndef.addEventListener("reading", ({ serialNumber }) => {
                callbackLog(`KART YAKALANDI! UID: ${serialNumber}`);
                localStorage.setItem("last_nfc_uid", serialNumber); // Kartı hafızaya al
            });
        } catch (error) {
            callbackLog("NFC Başlatılamadı (İzin yok veya NFC kapalı)", true);
        }
    } else {
        // Masaüstü veya WebNFC desteklemeyen cihazlar için simülasyon modu
        callbackLog("WebNFC simüle ediliyor... Kart aranıyor...");
        setTimeout(() => {
            const fakeUIDs = ["04:A2:3B:DE:88:5C:80", "12:F3:8E:AA:C1:22:90", "99:BC:11:4D:5E:6F:00"];
            const randomUID = fakeUIDs[Math.floor(Math.random() * fakeUIDs.length)];
            callbackLog(`KART YAKALANDI (Simüle)! UID: ${randomUID}`);
            localStorage.setItem("last_nfc_uid", randomUID);
        }, 2000);
    }
}

function emulateSavedNFC(callbackLog) {
    const savedUID = localStorage.getItem("last_nfc_uid");
    if (savedUID) {
        callbackLog(`Sinyal yayılıyor... Taklit edilen UID: ${savedUID}`);
    } else {
        callbackLog("Hafızada kopyalanmış kart bulunamadı!", true);
    }
}
