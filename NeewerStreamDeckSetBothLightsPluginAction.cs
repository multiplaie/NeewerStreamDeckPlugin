using StreamDeckLib;
using StreamDeckLib.Messages;
using System.Diagnostics;
using System.Threading.Tasks;

namespace NeewerStreamDeckPlugin
{
	[ActionUuid(Uuid = "com.khundar.neewerstreamdeckplugin.setlights.SetLightsAction")]
	public class NeewerStreamDeckSetBothLightsPluginAction : BaseStreamDeckActionWithSettingsModel<Models.NeewerBothLightsSettingsModel>
	{
		public override async Task OnKeyUp(StreamDeckEventPayload args)
		{
			var L1HSI = new Models.NeewerLightHSLModeModel(SettingsModel.L1Mac, SettingsModel.L1Hue, SettingsModel.L1Lightness, SettingsModel.L1Saturation);
			var L2HSI = new Models.NeewerLightHSLModeModel(SettingsModel.L2Mac, SettingsModel.L2Hue, SettingsModel.L2Lightness, SettingsModel.L2Saturation);
			var L1Temperature = new Models.NeewerLightTemperatureModeModel(SettingsModel.L1Mac, SettingsModel.L1Temperature, SettingsModel.L1LightnessTemperature); 
			var L2Temperature = new Models.NeewerLightTemperatureModeModel(SettingsModel.L2Mac, SettingsModel.L2Temperature, SettingsModel.L2LightnessTemperature);

			var ssh_connect_cmd = "ssh " + models.RaspberryPiModel.user + "@" + models.RaspberryPiModel.ip_addr;
			var bash_cmd = "";

            if (SettingsModel.L1Mode == "hsi")
            {
				bash_cmd += "gatttool -t random -b " + L1HSI.mac + " --char-write-req --handle=" + L1HSI.handle + " --value=" + L1HSI.buffer+";";
			}else if (SettingsModel.L1Mode == "temperature")
            {
				bash_cmd += "gatttool -t random -b " + L1Temperature.mac + " --char-write-req --handle=" + L1Temperature.handle + " --value=" + L1Temperature.buffer+";";
			}

			if (SettingsModel.L2Mode == "hsi")
			{
				bash_cmd += "gatttool -t random -b " + L2HSI.mac + " --char-write-req --handle=" + L2HSI.handle + " --value=" + L2HSI.buffer + ";";
			}
			else if (SettingsModel.L2Mode == "temperature")
			{
				bash_cmd += "gatttool -t random -b " + L2Temperature.mac + " --char-write-req --handle=" + L2Temperature.handle + " --value=" + L2Temperature.buffer + ";";
			}

			var cmd = ssh_connect_cmd + " \"" + bash_cmd + "\"";

			var processInfo = new ProcessStartInfo("cmd.exe", "/c " + cmd);
			processInfo.CreateNoWindow = true;
			processInfo.UseShellExecute = false;
			processInfo.RedirectStandardError = true;
			processInfo.RedirectStandardOutput = true;
			var process = Process.Start(processInfo);
			process.WaitForExit();
			process.Close();

			//update settings
			await Manager.SetSettingsAsync(args.context, SettingsModel);

		}

		public override async Task OnDidReceiveSettings(StreamDeckEventPayload args)
		{
			await base.OnDidReceiveSettings(args);
		}

		public override async Task OnWillAppear(StreamDeckEventPayload args)
		{
			await base.OnWillAppear(args);
		}

	}
}
