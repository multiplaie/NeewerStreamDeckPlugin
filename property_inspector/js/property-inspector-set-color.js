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
var l1ltemp = document.getElementById("l1-l-temp");
var l1lightnesstemp = document.getElementById("l1-lightness-temp");

var l2hue = document.getElementById("l2-hue");
var l2h = document.getElementById("l2-h");
var l2saturation = document.getElementById("l2-saturation");
var l2s = document.getElementById("l2-s");
var l2lightness = document.getElementById("l2-lightness");
var l2l = document.getElementById("l2-l");
var l2ltemp = document.getElementById("l2-l-temp");
var l2lightnesstemp = document.getElementById("l2-lightness-temp");

function updateL1LightnessTemperatureSliderToText() {
	l1ltemp.value = l1lightnesstemp.value;
	setSettings(l1ltemp.value, "L1LightnessTemperature");
}
function updateL2LightnessTemperatureSliderToText() {
	l2ltemp.value = l2lightnesstemp.value;
	setSettings(l1ltemp.value, "L2LightnessTemperature");
}
function updateL1LightnessTemperatureTextToSlider() {
	l1lightnesstemp.value = l1ltemp.value;
	setSettings(l1lightnesstemp.value, "L1LightnessTemperature");
}
function updateL2LightnessTemperatureTextToSlider() {
	l2lightnesstemp.value = l2ltemp.value;
	setSettings(l2lightnesstemp.value, "L2LightnessTemperature");
}

function updateL1HueSliderToText() {
	l1h.value = l1hue.value;
	setSettings(l1h.value, "L1Hue");
	updateSaturationBackground('L1');
	updateLightnessBackground('L1');
}

function updateL2HueSliderToText() {
	l2h.value = l2hue.value;
	setSettings(l2h.value, "L2Hue");
	updateSaturationBackground('L2');
	updateLightnessBackground('L2');
}
function updateL1HueTextToSlider() {
	l1hue.value = l1h.value;
	setSettings(l1hue.value, "L1Hue");
	updateSaturationBackground('L1');
	updateLightnessBackground('L1');
}
function updateL2HueTextToSlider() {
	l2hue.value = l2h.value;
	setSettings(l2hue.value, "L2Hue");
	updateSaturationBackground('L2');
	updateLightnessBackground('L2');
}
function updateL1SaturationSliderToText() {
	l1s.value = l1saturation.value;
	setSettings(l1s.value, "L1Saturation");
	updateLightnessBackground('L1');
}

function updateL2SaturationSliderToText() {
	l2s.value = l2saturation.value;
	setSettings(l2s.value, "L2Saturation");
	updateLightnessBackground('L2');
}
function updateL1SaturationTextToSlider() {
	l1saturation.value = l1s.value;
	setSettings(l1saturation.value, "L1Saturation");
	updateLightnessBackground('L1');
}
function updateL2SaturationTextToSlider() {
	l2saturation.value = l2s.value;
	setSettings(l2saturation.value, "L2Saturation");
	updateLightnessBackground('L2');
}
function updateL1LightnessSliderToText() {
	l1l.value = l1lightness.value;
	setSettings(l1l.value, "L1Lightness");
}
function updateL2LightnessSliderToText() {
	l2l.value = l2lightness.value;
	setSettings(l2l.value, "L2Lightness");
}

function updateL1LightnessTextToSlider() {
	l1lightness.value = l1l.value;
	setSettings(l1lightness.value, "L1Lightness");
}
function updateL2LightnessTextToSlider() {
	l2lightness.value = l2l.value;
	setSettings(l2lightness.value, "L2Lightness");
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

		document.getElementById('l1-h').value = settingsModel.L1Hue;
		document.getElementById('l2-h').value = settingsModel.L2Hue;
		document.getElementById('l1-s').value = settingsModel.L1Saturation;
		document.getElementById('l2-s').value = settingsModel.L2Saturation;
		document.getElementById('l1-l').value = settingsModel.L1Lightness;
		document.getElementById('l2-l').value = settingsModel.L2Lightness;
		document.getElementById('l1-mode').value = settingsModel.L1Mode;
		document.getElementById('l2-mode').value = settingsModel.L2Mode;
		document.getElementById('l1-l-temp').value = settingsModel.L1Lightness;
		document.getElementById('l2-l-temp').value = settingsModel.L2Lightness;
		document.getElementById('l1-temperature').value = settingsModel.L1Temperature;
		document.getElementById('l2-temperature').value = settingsModel.L2Temperature;
		updateL1HueTextToSlider();
		updateL2HueTextToSlider();
		updateL1SaturationTextToSlider();
		updateL2SaturationTextToSlider();
		updateL1LightnessTextToSlider();
		updateL2LightnessTextToSlider();
		updateL1LightnessTemperatureTextToSlider();
		updateL2LightnessTemperatureTextToSlider();
		changeMode('L1');
		changeMode('L2');

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
					document.getElementById('l1-h').value = settingsModel.L1Hue;
					document.getElementById('l2-h').value = settingsModel.L2Hue;
					document.getElementById('l1-s').value = settingsModel.L1Saturation;
					document.getElementById('l2-s').value = settingsModel.L2Saturation;
					document.getElementById('l1-l').value = settingsModel.L1Lightness;
					document.getElementById('l2-l').value = settingsModel.L2Lightness;
					document.getElementById('l1-mode').value = settingsModel.L1Mode;
					document.getElementById('l2-mode').value = settingsModel.L2Mode;
					document.getElementById('l1-l-temp').value = settingsModel.L1Lightness;
					document.getElementById('l2-l-temp').value = settingsModel.L2Lightness;
					document.getElementById('l1-temperature').value = settingsModel.L1Temperature;
					document.getElementById('l2-temperature').value = settingsModel.L2Temperature;
					updateL1HueTextToSlider();
					updateL2HueTextToSlider();
					updateL1SaturationTextToSlider();
					updateL2SaturationTextToSlider();
					updateL1LightnessTextToSlider();
					updateL2LightnessTextToSlider();
					updateL1LightnessTemperatureTextToSlider();
					updateL2LightnessTemperatureTextToSlider();
					changeMode('L1');
					changeMode('L2');
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




l1hue.addEventListener("input", updateL1HueSliderToText);
l1h.addEventListener("input", updateL1HueTextToSlider);
l2hue.addEventListener("input", updateL2HueSliderToText);
l2h.addEventListener("input", updateL2HueTextToSlider);

l1saturation.addEventListener("input", updateL1SaturationSliderToText);
l1s.addEventListener("input", updateL1SaturationTextToSlider);
l2saturation.addEventListener("input", updateL2SaturationSliderToText);
l2s.addEventListener("input", updateL2SaturationTextToSlider);

l1lightness.addEventListener("input", updateL1LightnessSliderToText);
l1l.addEventListener("input", updateL1LightnessTextToSlider);
l2lightness.addEventListener("input", updateL2LightnessSliderToText);
l2l.addEventListener("input", updateL2LightnessTextToSlider);

l1lightnesstemp.addEventListener("input", updateL1LightnessTemperatureSliderToText);
l1ltemp.addEventListener("input", updateL1LightnessTemperatureTextToSlider);
l2lightnesstemp.addEventListener("input", updateL2LightnessTemperatureSliderToText);
l2ltemp.addEventListener("input", updateL2LightnessTemperatureTextToSlider);

updateSaturationBackground('L1');
updateLightnessBackground('L1');
updateSaturationBackground('L2');
updateLightnessBackground('L2');
