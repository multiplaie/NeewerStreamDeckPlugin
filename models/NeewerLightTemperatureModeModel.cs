namespace NeewerStreamDeckPlugin.Models
{
    public class NeewerLightTemperatureModeModel
    {
        public string mac;
        public int lightness; //min: 0, max: 100
        public int temperature; //min: 0, max: 100
        private const int min_lightness = 0;
        private const int max_lightness = 100;
        private const int min_temperature = 32;
        private const int max_temperature = 56;
        private const string start_buffer = "788702";

        public string handle { get; set; } = "0x000e";

        public NeewerLightTemperatureModeModel(string mac, int temperature, int lightness) {

            this.mac = mac;

            if (temperature <= NeewerLightTemperatureModeModel.max_temperature && temperature >= NeewerLightTemperatureModeModel.min_temperature)
            {
                this.temperature = temperature;
            }
            else
            {
                throw new System.Data.DataException("Temperature value must be between " + NeewerLightTemperatureModeModel.max_temperature + " and " + NeewerLightTemperatureModeModel.min_temperature);
            }

            if (lightness <= NeewerLightTemperatureModeModel.max_lightness && lightness >= NeewerLightTemperatureModeModel.min_lightness)
            {
                this.lightness = lightness;
            }
            else
            {
                throw new System.Data.DataException("Lightness value must be between " + NeewerLightTemperatureModeModel.max_lightness + " and " + NeewerLightTemperatureModeModel.min_lightness);
            }
        }

        public string buffer{
            get
            {
                var buffer = NeewerLightTemperatureModeModel.start_buffer + this.lightness.ToString("X2")  + this.temperature.ToString("X2")+this.checksum;
                return buffer;
            }
        }

        private string checksum
        {
            get
            {
                var mod = 1;
                var checksum = this.lightness + this.temperature + mod;
                var hex_checksum = checksum.ToString("X2");
                return hex_checksum.Substring(hex_checksum.Length - 2);
            }
        }



    }
}
