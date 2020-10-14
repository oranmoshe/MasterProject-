function update(illuminance) {
  document.getElementById("value").innerHTML = illuminance + " lux";

  var colorPart = Math.min(255, illuminance).toFixed(0);
  document.getElementById("box").style.backgroundColor =
    "rgb(" + colorPart + ", " + colorPart + ", " + colorPart + ")";
}

if ("AmbientLightSensor" in window) {
  alert("yes");
  try {
    var sensor = new AmbientLightSensor();
    sensor.addEventListener("reading", function (event) {
      update(sensor.illuminance);
    });
    sensor.start();
  } catch (e) {
    console.error(e);
  }
}else{
  alert("no");
}
if ("ondevicelight" in window) {
    alert("yes");

  function onUpdateDeviceLight(event) {

    update(event.value);
  }
  
  window.addEventListener("devicelight", onUpdateDeviceLight);
}
else{
  alert("no");
}