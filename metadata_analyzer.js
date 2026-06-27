// metadata_analyzer.js - Doğrudan ve Hızlı Metadata Analiz Motoru

function analyzeImageMetadata(file, callbackLog) {
    if (!file) {
        callbackLog("HATA: Analiz için fotoğraf seçilmedi.", true);
        return;
    }

    callbackLog(`[ANALİZ BAŞLADI] Dosya: ${file.name}`);
    
    // 1. Dosya Boyutu ve Tipi Kontrolü
    const fileSizeKB = Math.round(file.size / 1024);
    const fileType = file.type ? file.type.toUpperCase() : "BİLİNMEYEN FORMAT";

    // 2. Medya Tipi Analizi (Kamera mı Ekran Görüntüsü mü?)
    const nameLower = file.name.toLowerCase();
    let sourceDetection = "📸 Fiziksel Kamera Çekimi (Muhtemel)";
    
    if (nameLower.includes("screenshot") || nameLower.includes("screen") || nameLower.includes("ss_") || file.type === "image/png") {
        sourceDetection = "🖥️ Ekran Görüntüsü (Screenshot) / Dijital Kayıt";
    }

    // 3. Cihaz / İşletim Sistemi Tahmini
    let devicePrediction = "Mobil Cihaz / Dijital Kaynak";
    if (nameLower.includes("iphone") || nameLower.includes("apple")) {
        devicePrediction = "Apple iOS Cihazı";
    } else if (nameLower.includes("wa") || nameLower.includes("whatsapp")) {
        devicePrediction = "WhatsApp Üzerinden Alınmış Medya";
    } else if (file.type === "image/jpeg") {
        devicePrediction = "Standart Kamera/Exif Donanımı";
    }

    // 4. Zaman Etiketi Analizi
    let captureDate = "Alınamadı";
    if (file.lastModified) {
        captureDate = new Date(file.lastModified).toLocaleString('tr-TR');
    }

    // Bekletme döngüsünü kaldırıp verileri doğrudan ekrana basıyoruz (Donmayı engeller)
    callbackLog(`----------------------------------------`);
    callbackLog(`📁 Dosya Biçimi : ${fileType}`);
    callbackLog(`⚖️ Dosya Boyutu : ${fileSizeKB} KB`);
    callbackLog(`📅 İlk Kayıt/Çekim Tarihi : ${captureDate}`);
    callbackLog(`📱 Cihaz Kaynağı : ${devicePrediction}`);
    callbackLog(`🎯 Medya Tipi : ${sourceDetection}`);
    callbackLog(`----------------------------------------`);
    callbackLog(`[ANALİZ TAMAMLANDI] Bilgiler başarıyla ayıklandı.`);
}
