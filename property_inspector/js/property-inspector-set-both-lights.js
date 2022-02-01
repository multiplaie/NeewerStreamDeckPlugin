// global websocket, used to communicate from/to Stream Deck software
// as well as some info about our plugin, as sent by Stream Deck software 
var websocket = null,
	uuid = null,
	inInfo = null,
	actionInfo = {},
	settingsModel = {};


var l1hue = document.getElementById("l1-hue");
var l1h = document.getElementById("l1-h");
var l1saturation = document.getElementById("l1-saturation");
var l1s = document.getElementById("l1-s");
var l1lightness = document.getElementById("l1-lightness");
var l1l = document.getElementById("l1-l");

var l2hue = document.getElementById("l2-hue");
var l2h = document.getElementById("l2-h");
var l2saturation = document.getElementById("l2-saturation");
var l2s = document.getElementById("l2-s");
var l2lightness = document.getElementById("l2-lightness");
var l2l = document.getElementById("l2-l");

function updateHueSliderToText(light) {
	if (light == 'L1') {
		l1h.value = l1hue.value;
		setSettings(l1h.value, "L1Hue");
		updateSaturationBackground('L1');
		updateLightnessBackground('L1');
	} else if (light == 'L2') {
		l2h.value = l2hue.value;
		setSettings(l2h.value, "L2Hue");
		updateSaturationBackground('L2');
		updateLightnessBackground('L2');
    }

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


function updateSaturationBackground(light) {
	if (light == 'L1') {
		l1saturation.setAttribute("style", "background: rgba(0, 0, 0, 0) -webkit-linear-gradient(left, hsl(" + l1h.value + ",0%,50%), hsl(" + l1h.value + ", 100%, 50%)) repeat scroll 0% 0%!important; ");
	} else if (light == 'L2') {
		l2saturation.setAttribute("style", "background: rgba(0, 0, 0, 0) -webkit-linear-gradient(left, hsl(" + l2h.value + ",0%,50%), hsl(" + l2h.value + ", 100%, 50%)) repeat scroll 0% 0%!important; ");
    }
}

function updateLightnessBackground(light) {
	if (light == 'L1') {
		l1lightness.setAttribute("style", "background: rgba(0, 0, 0, 0) -webkit-linear-gradient(left, hsl(" + l1h.value + "," + l1s.value + "%,0%), hsl(" + l1h.value + ", " + l1s.value + "%, 50%)) repeat scroll 0% 0%!important; ");
	} else if (light == 'L2') {
		l2lightness.setAttribute("style", "background: rgba(0, 0, 0, 0) -webkit-linear-gradient(left, hsl(" + l2h.value + "," + l2s.value + "%,0%), hsl(" + l2h.value + ", " + l2s.value + "%, 50%)) repeat scroll 0% 0%!important; ");
	}
	
}



/*function connectElgatoStreamDeckSocket(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) {
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
*/




l1hue.addEventListener("input", updateHueSliderToText('L1'));
l1h.addEventListener("input", updateHueTextToSlider('L1'));
l2hue.addEventListener("input", updateHueSliderToText('L2'));
l2h.addEventListener("input", updateHueTextToSlider('L2'));

//saturation.addEventListener("input", updateSaturationSliderToText);
//s.addEventListener("input", updateSaturationTextToSlider);

//lightness.addEventListener("input", updateLightnessSliderToText);
//l.addEventListener("input", updateLightnessTextToSlider);

//updateSaturationBackground();
//updateLightnessBackground();

