﻿using StreamDeckLib;
using StreamDeckLib.Messages;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeewerStreamDeckPlugin
{
  [ActionUuid(Uuid="com.khundar.neewerstreamdeckplugin.setlights.DefaultPluginAction")]
  public class NeewerStreamDeckPluginAction : BaseStreamDeckActionWithSettingsModel<Models.CounterSettingsModel>
  {
	public override async Task OnKeyUp(StreamDeckEventPayload args)
	{
	  SettingsModel.Counter++;
	  await Manager.SetTitleAsync(args.context, SettingsModel.Counter.ToString());

	  if (SettingsModel.Counter % 10 == 0)
	  {
		await Manager.ShowAlertAsync(args.context);
	  }
	  else if (SettingsModel.Counter % 15 == 0)
	  {
		await Manager.OpenUrlAsync(args.context, "https://www.bing.com");
	  }
	  else if (SettingsModel.Counter % 3 == 0)
	  {
		await Manager.ShowOkAsync(args.context);
	  }
	  else if (SettingsModel.Counter % 7 == 0)
	  {
		await Manager.SetImageAsync(args.context, "images/Fritz.png");
	  }

	  //update settings
	  await Manager.SetSettingsAsync(args.context, SettingsModel);
	}

	public override async Task OnDidReceiveSettings(StreamDeckEventPayload args)
	{
	  await base.OnDidReceiveSettings(args);
	  await Manager.SetTitleAsync(args.context, SettingsModel.Counter.ToString());
	}

	public override async Task OnWillAppear(StreamDeckEventPayload args)
	{
	  await base.OnWillAppear(args);
	  await Manager.SetTitleAsync(args.context, SettingsModel.Counter.ToString());
	}

  }
}
