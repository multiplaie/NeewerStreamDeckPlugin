namespace NeewerStreamDeckPlugin.Models
{
  public class NeewerLightHSLSettingsModel
  {
	public string Mac { get; set; } = "xx:xx:xx:xx:xx:xx";
    public int Lightness { get; set; } = 0; //min: 0, max: 100
    public int Hue { get; set; } = 0; //min: 0, max: 360
    public int Saturation {get; set; } = 0; //min: 0, max: 100
    
  }
}
