// global websocket, used to communicate from/to Stream Deck software
// as well as some info about our plugin, as sent by Stream Deck software 
var websocket = null,
  uuid = null,
  inInfo = null,
  actionInfo = {},
  settingsModel = {};

function connectElgatoStreamDeckSocket(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) {
	uuid = inUUID;
	actionInfo = JSON.parse(inActionInfo);
	inInfo = JSON.parse(inInfo);
	websocket = new WebSocket('ws://localhost:' + inPort);

  //initialize values
  if (actionInfo.payload.settings.settingsModel) {
	  settingsModel = actionInfo.payload.settings.settingsModel;
	  settingsModel.Brightness = actionInfo.payload.settings.settingsModel.Brightness;
	  settingsModel.Saturation = actionInfo.payload.settings.settingsModel.Saturation;
	  settingsModel.Mac = actionInfo.payload.settings.settingsModel.Mac;
  }


  websocket.onopen = function () {
	  var json = { event: inRegisterEvent, uuid: inUUID };

	  document.getElementById('hue').value = settingsModel.Color;
	  document.getElementById('brightness').value = settingsModel.Brightness;
	  document.getElementById('saturation').value = settingsModel.Saturation;
	  document.getElementById('mac').value = settingsModel.Mac;

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
					document.getElementById('hue').value = settingsModel.Color;
					document.getElementById('brightness').value = settingsModel.Brightness;
					document.getElementById('saturation').value = settingsModel.Saturation;
					document.getElementById('mac').value = settingsModel.Mac;
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

