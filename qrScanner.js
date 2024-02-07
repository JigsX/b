
function success(result) {
    console.log('QR Code Value Detected:', result);

    document.getElementById('result').innerHTML = `
        <h2>Success!</h2>
        <p><a href="${result}">${result}</a></p>
    `;
    
    scanner.clear();
    document.getElementById('reader').remove();
}

function error(err) {
    console.error(err);
}

function success(result) {
    console.log('QR Code Value Detected:', result);
    let scannedLoc = document.getElementById("currentLocation");
    scannedLoc.value = result;
    scanner.clear();
    document.getElementById('reader').remove();
}

function error(err) {
    console.error(err);
}

function showPopup(){
    document.getElementById('reader').style.display = "block";
    document.getElementById('QRB').style.display = "none";
    document.getElementById('closeQR').style.display = "block";

    const scanner = new Html5QrcodeScanner('reader', { 
        qrbox: {
            width: 300,
            height: 300,
        },
        fps: 20,
    });
    
  
    scanner.render(success, error);


}

function hidePopup() {
    document.getElementById('reader').style.display = "none";
    document.getElementById('QRB').style.display = "block";
    document.getElementById('closeQR').style.display = "none";
}
