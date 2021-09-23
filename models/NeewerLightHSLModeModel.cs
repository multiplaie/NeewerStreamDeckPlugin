namespace NeewerStreamDeckPlugin.Models
{
    public class NeewerLightColorModeModel
    {
        public string mac;
        public int lightness; //min: 0, max: 100
        public int hue; //min: 0, max: 360
        public int saturation; //min: 0, max: 100
        private const int min_saturation = 0;
        private const int max_saturation = 100;
        private const int min_lightness = 0;
        private const int max_lightness = 100;
        private const int min_hue = 0;
        private const int max_hue = 360;
        private const string start_buffer = "788604";

        public string handle { get; set; } = "0x000e";

        public NeewerLightColorModeModel(string mac, int color, int lightness, int saturation) {

            this.mac = mac;

            if (color <= NeewerLightColorModeModel.max_hue && color >= NeewerLightColorModeModel.min_hue)
            {
                this.hue = color;
            }
            else
            {
                throw new System.Data.DataException("Color value must be between " + NeewerLightColorModeModel.max_hue + " and " + NeewerLightColorModeModel.min_hue);
            }

            if (lightness <= NeewerLightColorModeModel.max_lightness && lightness >= NeewerLightColorModeModel.min_lightness)
            {
                this.lightness = lightness;
            }
            else
            {
                throw new System.Data.DataException("Brightness value must be between " + NeewerLightColorModeModel.max_lightness + " and " + NeewerLightColorModeModel.min_lightness);
            }

            if (saturation <= NeewerLightColorModeModel.max_saturation && saturation >= NeewerLightColorModeModel.min_saturation)
            {
                this.saturation = saturation;
            }
            else
            {
                throw new System.Data.DataException("Saturation value must be between " + NeewerLightColorModeModel.max_saturation + " and " + NeewerLightColorModeModel.min_saturation);
            }

        }

        public string buffer{
            get
            {
                var hex_color = this.hue.ToString("X2");
                hex_color = hex_color.Substring(hex_color.Length - 2);
                var flag = (this.hue > 255) ? 1 : 0;
                var buffer = NeewerLightColorModeModel.start_buffer+hex_color+flag.ToString("X2")+this.saturation.ToString("X2")+this.lightness.ToString("X2")+this.checksum;
                return buffer;
            }
        }

        private string checksum
        {
            get
            {
                var flag = (this.hue > 255) ? 1 : 0;
                var mod = 2;
                var checksum = this.lightness + this.hue + this.saturation + mod + flag;
                var hex_checksum = checksum.ToString("X2");
                return hex_checksum.Substring(hex_checksum.Length - 2);
            }
        }



    }
}
