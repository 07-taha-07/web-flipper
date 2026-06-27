// signal_scanner.js - Gerçek Zamanlı Frekans ve Sinyal Analiz Motoru

let audioContext = null;
let analyser = null;
let microphone = null;
let javascriptNode = null;
let isScanningSignals = false;

function toggleSignalScanner(callbackLog) {
    if (isScanningSignals) {
        // Taramayı durdur
        isScanningSignals = false;
        if (microphone) microphone.disconnect();
        if (javascriptNode) javascriptNode.disconnect();
        callbackLog("[SCANNER STOPPED] Sinyal dinleme kapatıldı.");
        return;
    }

    // Taramayı başlat
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(function(stream) {
            isScanningSignals = true;
            callbackLog("[SCANNER ACTIVE] Ortam dalgaları dinleniyor...");

            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;

            microphone = audioContext.createMediaStreamSourceStream(stream);
            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            javascriptNode.onaudioprocess = function() {
                if (!isScanningSignals) return;

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);

                // En yüksek frekansı (baskın sinyali) bulma algoritması
                let maxVal = -1;
                let maxIndex = -1;
                for (let i = 0; i < bufferLength; i++) {
                    if (dataArray[i] > maxVal) {
                        maxVal = dataArray[i];
                        maxIndex = i;
                    }
                }

                // Frekansı Hz cinsine çevir
                const nyquist = audioContext.sampleRate / 2;
                const dominantFrequency = Math.round(maxIndex * nyquist / bufferLength);
                
                // Desibel tahmini (Şiddet)
                const db = Math.round((maxVal / 255) * 100);

                // Sadece ortamda belirgin bir sinyal/ses varsa logla (Sessizliği filtrele)
                if (db > 20 && dominantFrequency > 0) {
                    callbackLog(`[RF_AUDIO] Sinyal: ${dominantFrequency} Hz | Şiddet: -${100 - db} dBm`);
                }
            };
        })
        .catch(function(err) {
            callbackLog("[HATA] Mikrofon donanım erişim izni reddedildi.", true);
        });
}
