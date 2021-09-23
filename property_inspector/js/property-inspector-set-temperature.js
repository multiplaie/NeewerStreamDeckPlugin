// global websocket, used to communicate from/to Stream Deck software
// as well as some info about our plugin, as sent by Stream Deck software 
var websocket = null,
  uuid = null,
  inInfo = null,
  actionInfo = {},
	settingsModel = {};

var l = document.getElementById("l");
var lightness = document.getElementById("lightness");

function updateLightnessSliderToText() {
	l.value = lightness.value;
	setSettings(l.value, "Lightness");
}

function updateLightnessTextToSlider() {
	lightness.value = l.value;
	setSettings(lightness.value, "Lightness");
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
	  document.getElementById('l').value = settingsModel.Lightness;
	  document.getElementById('temperature').value = settingsModel.Temperature;
	  document.getElementById('mac').value = settingsModel.Mac;

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
					document.getElementById('temperature').value = settingsModel.Temperature;
					document.getElementById('l').value = settingsModel.Lightness;
					document.getElementById('mac').value = settingsModel.Mac;
					updateLightnessTextToSlider();
				}
				break;
			default:
				break;
		}
	};
}

const setSettings = (value, param) => {
	console.log(value, param);
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

lightness.addEventListener("input", updateLightnessSliderToText);
l.addEventListener("input", updateLightnessTextToSlider);