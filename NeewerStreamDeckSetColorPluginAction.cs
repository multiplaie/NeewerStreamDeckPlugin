using StreamDeckLib;
using StreamDeckLib.Messages;
using System.Diagnostics;
using System.Threading.Tasks;

namespace NeewerStreamDeckPlugin
{
  [ActionUuid(Uuid="com.khundar.neewerstreamdeckplugin.setlights.SetColorAction")]
  public class NeewerStreamDeckSetColorPluginAction : BaseStreamDeckActionWithSettingsModel<Models.NeewerLightSettingsModel>
  {
	public override async Task OnKeyUp(StreamDeckEventPayload args)
	{

			var light = new Models.NeewerLightColorModeModel(SettingsModel.Mac, SettingsModel.Color, SettingsModel.Brightness, SettingsModel.Saturation); 
			var ssh_connect_cmd = "ssh " + models.RaspberryPiModel.user + "@" + models.RaspberryPiModel.ip_addr;
			var bash_cmd = "gatttool -t random -b "+ light.mac +" --char-write-req --handle="+ light.handle + " --value="+light.buffer;
			var cmd = ssh_connect_cmd + " \""+ bash_cmd + "\"";

			var processInfo = new ProcessStartInfo("cmd.exe", "/c "+cmd);
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
