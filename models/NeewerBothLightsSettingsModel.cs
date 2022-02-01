namespace NeewerStreamDeckPlugin.Models
{
  public class NeewerBothLightsSettingsModel
    {
    public string L1Mode { get; set; } = "xxxx";
    public string L1Mac { get; set; } = "F7:C5:F3:57:68:38";
    public int L1Lightness { get; set; } = 0; //min: 0, max: 100
    public int L1Hue { get; set; } = 0; //min: 0, max: 360
    public int L1Saturation {get; set; } = 0; //min: 0, max: 100
    public int L1LightnessTemperature { get; set; } = 0; //min: 0, max: 100
    public int L1Temperature { get; set; } = 32; //min: 32, max: 56

    public string L2Mode { get; set; } = "xxxx";
    public string L2Mac { get; set; } = "DB:A9:84:1F:5B:06";
    public int L2Lightness { get; set; } = 0; //min: 0, max: 100
    public int L2Hue { get; set; } = 0; //min: 0, max: 360
    public int L2Saturation { get; set; } = 0; //min: 0, max: 100
    public int L2LightnessTemperature { get; set; } = 0; //min: 0, max: 100
    public int L2Temperature { get; set; } = 32; //min: 32, max: 56
    }
}
