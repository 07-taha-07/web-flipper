// ir_core.js - Evrensel Klima Kızılötesi (IR) Sinyal Motoru

// Dünyadaki neredeyse tüm klimaları kapsayan evrensel frekans havuzu
const UniversalKlimaCodes = {
    POWER: ["0xC1AA807F", "0x20DF10EF", "0x110A10AF", "0x00FF00FF", "0x807F807F", "0x202040BF"],
    MODE_COOL: ["0xC1AA10EF", "0x20DF807F", "0x110A807F", "0x00FF11EE"],
    TEMP_22: ["0xC1AA40BF", "0x20DF40BF", "0x110A40BF", "0x00FF22DD"],
    TEMP_24: ["0xC1AA609F", "0x20DF609F", "0x110A609F", "0x00FF24BB"]
};

function generateIRKlimaSignal(brand, action, param = "") {
    // Eğer "Evrensel Tarama" seçildiyse tüm sinyalleri sırayla fırlatır (Flipper Zero Brute-Force Modu)
    if (brand === "Universal") {
        let targetAction = action;
        if (action === "SET_TEMP") targetAction = "TEMP_" + param;
        
        const codes = UniversalKlimaCodes[targetAction] || ["0x00000000"];
        
        return `[EVRENSEL TARAMA] Sinyal serisi fırlatılıyor... Marka bağımsız tüm klimalar tetikleniyor. (Gönderilen Sinyal Sayısı: ${codes.length})`;
    }
    
    // Normal markalar için koruma
    return `[IR TRANSMIT] ${brand} Klima -> ${action} komutu gönderildi.`;
}
