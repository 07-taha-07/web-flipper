async function startNFCScan(callbackLog) {
    if (!('NDEFReader' in window)) {
        callbackLog("[HATA] Tarayıcınız Web NFC desteklemiyor.", true);
        return;
    }

    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        callbackLog("[SİSTEM] NFC taraması aktif. Kartı yaklaştırın...");

        ndef.onreading = event => {
            const { serialNumber, message } = event;
            
            // 1. Temel Bilgi
            callbackLog(`--- YENİ KART TESPİT EDİLDİ ---`);
            callbackLog(`UID (Seri No): ${serialNumber}`);

            // 2. Kart İçeriğindeki Tüm Kayıtları İncele
            if (message.records.length > 0) {
                message.records.forEach((record, index) => {
                    const textDecoder = new TextDecoder(record.encoding || 'utf-8');
                    const data = textDecoder.decode(record.data);

                    callbackLog(`[Kayıt ${index + 1}]`);
                    callbackLog(`  - Tip: ${record.recordType}`);
                    callbackLog(`  - Medya Tipi: ${record.mediaType || 'N/A'}`);
                    callbackLog(`  - Veri: ${data}`);
                });
            } else {
                callbackLog("[BİLGİ] Kart boş veya NDEF formatında değil.");
            }

            // Geri bildirim sesi
            if (typeof playFlipperSound === "function") playFlipperSound('trink');
            localStorage.setItem("last_nfc_scan", JSON.stringify({uid: serialNumber, time: Date.now()}));
        };

        ndef.onreadingerror = () => {
            callbackLog("[HATA] Kart okuma sırasında hata oluştu. Sabit tutun.", true);
        };

    } catch (error) {
        callbackLog(`[HATA] Erişim reddedildi veya donanım meşgul: ${error.message}`, true);
    }
}
