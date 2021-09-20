namespace NeewerStreamDeckPlugin.Models
{
  public class NeewerLightSettingsModel
  {
	public string Mac { get; set; } = "xx:xx:xx:xx:xx:xx";
    public int Brightness {get; set; } = 0; //min: 0, max: 100
    public int Color {get; set; } = 0; //min: 0, max: 360
    public int Saturation {get; set; } = 0; //min: 0, max: 100
    
  }
}
