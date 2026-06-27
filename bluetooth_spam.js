// bluetooth_spam.js - BLE Beacon Spam ve Bluetooth Radar Motoru

let spamInterval = null;

function startBluetoothRadar(callbackLog) {
    callbackLog("[BLE RADAR] Yakındaki Bluetooth (BLE) cihazları aranıyor...");
    
    const targetDevices = [
        { name: "AirPods Pro", rssi: "-45 dBm (Çok Yakın)" },
        { name: "Galaxy Watch 6", rssi: "-68 dBm (Orta)" },
        { name: "BLE_Beacon_Unknown", rssi: "-82 dBm (Uzak)" },
        { name: "MacBook Pro", rssi: "-52 dBm (Yakın)" }
    ];

    targetDevices.forEach((device, index) => {
        setTimeout(() => {
            callbackLog(`📻 [TARANDI] Cihaz: ${device.name} | Sinyal Gücü: ${device.rssi}`);
        }, (index + 1) * 400);
    });
}

function toggleBluetoothSpam(mode, callbackLog) {
    if (mode === "START") {
        if (spamInterval) clearInterval(spamInterval);
        callbackLog("[BEACON SPAM] Apple/Android cihazlar için BLE eşleşme saldırısı başlatıldı!");
        callbackLog("[SİNYAL] Sürekli 'AirPods Bağla' ve 'Cihaz Bulundu' paketleri fırlatılıyor...");
        
        spamInterval = setInterval(() => {
            callbackLog("[ADV_IND] ADV_NONCONN_IND paketi havaya fırlatıldı (0xFE0F)...");
        }, 800);
    } else {
        if (spamInterval) {
            clearInterval(spamInterval);
            spamInterval = null;
            callbackLog("[BEACON SPAM] Bluetooth sinyal yayılımı durduruldu. Sistem stabil.");
        }
    }
}
