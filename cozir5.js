const LynxariDevice = require(process.lynxari.device);
const device = require('@agilatech/cozir5');

module.exports = class Cozir5 extends LynxariDevice {
    
    constructor(config) {
        
        // The file must be defined. If not supplied in config options, then default to ttyS2
        const file  = config['file'] || "/dev/ttyS2";
        
        const hardware = new device.Cozir5(file);
        
        super(hardware, config);
        
    }
}

