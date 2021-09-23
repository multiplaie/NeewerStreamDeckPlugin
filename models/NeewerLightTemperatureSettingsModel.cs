namespace NeewerStreamDeckPlugin.Models
{
  public class NeewerLightTemperatureSettingsModel
  {
	public string Mac { get; set; } = "xx:xx:xx:xx:xx:xx";
    public int Lightness {get; set; } = 0; //min: 0, max: 100
    public int Temperature {get; set; } = 32; //min: 32, max: 56

    
  }
}
