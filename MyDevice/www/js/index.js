document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    window.addEventListener("batterystatus", onBatteryStatus, false);
    applyDeviceData();
    checkConnection();

    $("#camera-btn").click(getPicutre);
}

function applyDeviceData(){
    $("#cordovaVersion").text(device.cordova);
    $("#manufacturer").text(device.manufacturer);
    $("#isVirtual").text(device.isVirtual);
    $("#deviceModel").text(device.model);

    $("#osVersion").text(device.version);
    $("#operatingSystem").text(device.platform);
    $("#uuid").text(device.uuid);
    $("#serial").text(device.serial);
}
function onBatteryStatus(status) {
    $("#batteryStatus").text(status.level);
    $("#isPlugged").text(status.isPlugged);

}

function checkConnection(){
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    $("#connectionType").text(states[networkState]);
}
function getPicutre() {
    navigator.camera.getPicture(succeededCameraCallback, failedCameraCallback, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function succeededCameraCallback(imageData) {
    $('#myImage').attr('src', 'data:image/jpeg;base64,' + imageData);
}

function failedCameraCallback(message) {
    alert(message);
}