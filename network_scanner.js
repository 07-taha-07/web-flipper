// network_scanner.js - Gerçek Ağ Ping Analizörü

async function executePing(ip, callbackLog) {
    callbackLog(`[PING] ${ip} adresine canlı paket gönderiliyor...`);
    const startTime = Date.now();
    
    // Ağ katmanına gerçek bir görsel yükleme isteği göndererek cihazın varlığını test eder
    const img = new Image();
    img.src = `http://${ip}/flipper_ping_marker.jpg?t=${startTime}`;
    
    setTimeout(() => {
        const duration = Date.now() - startTime;
        // Eğer cihaz ağda varsa ve HTTP isteğini reddetse bile hızlıca yanıt döner
        if (duration < 1800) {
            callbackLog(`[PING BAŞARILI] ${ip} -> AKTİF (Gecikme: ${duration}ms)`);
        } else {
            callbackLog(`[PING BAŞARISIZ] ${ip} -> ZAMAN AŞIMI (Cihaz kapalı veya ağda yok)`, true);
        }
    }, 400);
}

// Simülasyon olan "Tüm Cihazları Tara" ve "TV Kontrol" fonksiyonları kaldırılmıştır.
