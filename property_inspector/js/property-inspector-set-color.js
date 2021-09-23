// global websocket, used to communicate from/to Stream Deck software
// as well as some info about our plugin, as sent by Stream Deck software 
var websocket = null,
  uuid = null,
  inInfo = null,
  actionInfo = {},
	settingsModel = {};


var hue = document.getElementById("hue");
var h = document.getElementById("h");
var saturation = document.getElementById("saturation");
var s = document.getElementById("s");
var lightness = document.getElementById("lightness");
var l = document.getElementById("l");

function updateHueSliderToText() {
	h.value = hue.value;
	setSettings(h.value, "Hue");
	updateSaturationBackground();
	updateLightnessBackground();
}

function updateHueTextToSlider() {
	hue.value = h.value;
	setSettings(hue.value, "Hue");
	updateSaturationBackground();
	updateLightnessBackground();
}

function updateSaturationSliderToText() {
	s.value = saturation.value;
	setSettings(s.value, "Saturation");
	updateLightnessBackground();
}

function updateSaturationTextToSlider() {
	saturation.value = s.value;
	setSettings(saturation.value, "Saturation");
	updateLightnessBackground();
}

function updateLightnessSliderToText() {
	l.value = lightness.value;
	setSettings(l.value, "Lightness");
}

function updateLightnessTextToSlider() {
	lightness.value = l.value;
	setSettings(lightness.value, "Lightness");
}


function updateSaturationBackground() {
	saturation.setAttribute("style", "background: rgba(0, 0, 0, 0) -webkit-linear-gradient(left, hsl(" + h.value + ",0%,50%), hsl(" + h.value +", 100%, 50%)) repeat scroll 0% 0%!important; ");
}

function updateLightnessBackground() {
	lightness.setAttribute("style", "background: rgba(0, 0, 0, 0) -webkit-linear-gradient(left, hsl(" + h.value + "," + s.value + "%,0%), hsl(" + h.value + ", " + s.value +"%, 50%)) repeat scroll 0% 0%!important; ");
}



function connectElgatoStreamDeckSocket(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) {
	uuid = inUUID;
	actionInfo = JSON.parse(inActionInfo);
	inInfo = JSON.parse(inInfo);
	websocket = new WebSocket('ws://localhost:' + inPort);

  //initialize values
  if (actionInfo.payload.settings.settingsModel) {
	  settingsModel = actionInfo.payload.settings.settingsModel;
  }


  websocket.onopen = function () {
	  var json = { event: inRegisterEvent, uuid: inUUID };

	  document.getElementById('h').value = settingsModel.Hue;
	  document.getElementById('s').value = settingsModel.Saturation;
	  document.getElementById('l').value = settingsModel.Lightness;
	  document.getElementById('mac').value = settingsModel.Mac;
	  updateHueTextToSlider();
	  updateSaturationTextToSlider();
	  updateLightnessTextToSlider();

	// register property inspector to Stream Deck
	websocket.send(JSON.stringify(json));

  };

	websocket.onmessage = function (evt) {
	// Received message from Stream Deck
		var jsonObj = JSON.parse(evt.data);
		var sdEvent = jsonObj['event'];
		switch (sdEvent) {
			case "didReceiveSettings":
				settingsModel = jsonObj.payload.settings.settingsModel;
				if (jsonObj.payload.settings.settingsModel) {
					document.getElementById('h').value = settingsModel.Hue;
					document.getElementById('s').value = settingsModel.Saturation;
					document.getElementById('l').value = settingsModel.Lightness;
					document.getElementById('mac').value = settingsModel.Mac;
					updateHueTextToSlider();
					updateSaturationTextToSlider();
					updateLightnessTextToSlider();
				}
				break;
			default:
				break;
		}
	};
}

const setSettings = (value, param) => {
  if (websocket) {
	settingsModel[param] = value;
	var json = {
	  "event": "setSettings",
	  "context": uuid,
	  "payload": {
		"settingsModel": settingsModel
	  }
	};
	websocket.send(JSON.stringify(json));
  }
};





hue.addEventListener("input", updateHueSliderToText);
h.addEventListener("input", updateHueTextToSlider);

saturation.addEventListener("input", updateSaturationSliderToText);
s.addEventListener("input", updateSaturationTextToSlider);

lightness.addEventListener("input", updateLightnessSliderToText);
l.addEventListener("input", updateLightnessTextToSlider);

updateSaturationBackground();
updateLightnessBackground();

