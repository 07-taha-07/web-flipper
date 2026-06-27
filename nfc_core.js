async function startNFCScan(callbackLog) {
    if (!('NDEFReader' in window)) {
        callbackLog("[HATA] Web NFC bu tarayıcıda desteklenmiyor.", true);
        return;
    }

    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        callbackLog("[SİSTEM] Okuyucu aktif. Kartı yaklaştırın...");

        ndef.onreading = event => {
            const { serialNumber, message } = event;
            
            callbackLog(`--- KART ALGILANDI ---`);
            callbackLog(`UID: ${serialNumber}`);

            if (message.records.length > 0) {
                message.records.forEach((record, i) => {
                    // Veri tipini ve içeriğini çözümle
                    const decoder = new TextDecoder(record.encoding || 'utf-8');
                    const data = decoder.decode(record.data);
                    
                    callbackLog(`[Kayıt ${i+1}] Tip: ${record.recordType}`);
                    callbackLog(`  İçerik: ${data}`);
                });
            } else {
                callbackLog("[BİLGİ] Kartta NDEF verisi bulunamadı.");
            }
            
            // Veriyi kaydet
            localStorage.setItem("nfc_last_uid", serialNumber);
        };

        ndef.onreadingerror = () => {
            callbackLog("[HATA] Okuma başarısız. Kartı sabit tutun.", true);
        };

    } catch (error) {
        callbackLog(`[HATA] ${error.message}`, true);
    }
}
