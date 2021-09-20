namespace NeewerStreamDeckPlugin.Models
{
    public class NeewerLightColorModeModel
    {
        public string mac;
        public const string mode = "color"; // color or Temperature
        public int brightness; //min: 0, max: 100
        public int color; //min: 0, max: 360
        public int saturation; //min: 0, max: 100
        private const int min_saturation = 0;
        private const int max_saturation = 100;
        private const int min_brightness = 0;
        private const int max_brightness = 100;
        private const int min_color = 0;
        private const int max_color = 360;
        private const string start_buffer = "788604";

        public string handle { get; set; } = "0x000e";

        public NeewerLightColorModeModel(string mac, int color, int brightness, int saturation) {

            this.mac = mac;

            if (color <= NeewerLightColorModeModel.max_color && color >= NeewerLightColorModeModel.min_color)
            {
                this.color = color;
            }
            else
            {
                throw new System.Data.DataException("Color value must be between " + NeewerLightColorModeModel.max_color + " and " + NeewerLightColorModeModel.min_color);
            }

            if (brightness <= NeewerLightColorModeModel.max_brightness && brightness >= NeewerLightColorModeModel.min_brightness)
            {
                this.brightness = brightness;
            }
            else
            {
                throw new System.Data.DataException("Brightness value must be between " + NeewerLightColorModeModel.max_brightness + " and " + NeewerLightColorModeModel.min_brightness);
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
                var hex_color = this.color.ToString("X2");
                hex_color = hex_color.Substring(hex_color.Length - 2);
                var flag = (this.color > 255) ? 1 : 0;
                var buffer = NeewerLightColorModeModel.start_buffer+hex_color+flag.ToString("X2")+this.saturation.ToString("X2")+this.brightness.ToString("X2")+this.checksum;
                return buffer;
            }
        }

        private string checksum
        {
            get
            {
                var flag = (this.color > 255) ? 1 : 0;
                var mod = 2;
                var checksum = this.brightness + this.color + this.saturation + mod + flag;
                var hex_checksum = checksum.ToString("X2");
                return hex_checksum.Substring(hex_checksum.Length - 2);
            }
        }



    }
}
