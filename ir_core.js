// ir_core.js - Evrensel TV ve Klima Kızılötesi (IR) Kod Veritabanı

const AirConditionerDatabase = {
    Beko: { POWER: "0xC1AA807F", TEMP_UP: "0xC1AA40BF", TEMP_DOWN: "0xC1AA20DF", MODE_COOL: "0xC1AA10EF" },
    Vestel: { POWER: "0x20DF10EF", TEMP_UP: "0x20DF40BF", TEMP_DOWN: "0x20DF609F", MODE_COOL: "0x20DF807F" },
    Daikin: { POWER: "0x110A10AF", TEMP_UP: "0x110A40BF", TEMP_DOWN: "0x110A609F", MODE_COOL: "0x110A807F" }
};

// Klimaya gönderilecek olan kızılötesi sinyali hazırlar
function generateIRKlimaSignal(brand, action, param = "") {
    const brandData = AirConditionerDatabase[brand];
    if (!brandData) return `Bilinmeyen Klima Markası: ${brand}`;
    
    let hexCode = brandData[action] || "0x00000000";
    let msg = `[IR TRANSMIT] ${brand} Klima -> ${action} sinyali fırlatıldı (HEX: ${hexCode})`;
    
    if (action === 'SET_TEMP') {
        msg = `[IR TRANSMIT] ${brand} Klima -> Derece ${param}°C olarak ayarlandı.`;
    }
    
    // Eğer ileride ESP32 donanımı bağlanırsa bu fetch satırı donanımı tetikler:
    // fetch(`http://ESP32_IP/send_ir?hex=${hexCode}`);
    
    return msg;
}
