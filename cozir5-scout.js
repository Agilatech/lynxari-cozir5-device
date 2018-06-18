const config = require('./config');
const Scout = require(process.lynxari.scout);
const Cozir5 = require('./cozir5');

module.exports = class Cozir5Scout extends Scout {

  constructor(opts) {

    super();

    if (typeof opts !== 'undefined') {
      // copy all config options defined in the server
      for (const key in opts) {
        if (typeof opts[key] !== 'undefined') {
          config[key] = opts[key];
        }
      }
    }

    if (config.name === undefined) { config.name = "COZIR5" }
    this.name = config.name;

    this.cozir5 = new Cozir5(config);

  }

  init(next) {
    const query = this.server.where({name: this.name});
  
    const self = this;

    this.server.find(query, function(err, results) {
      if (!err) {
        if (results[0]) {
          self.provision(results[0], self.cozir5);
          self.server.info('Provisioned known device ' + self.name);
        } else {
          self.discover(self.cozir5);
          self.server.info('Discovered new device ' + self.name);
        }
      }
      else {
        self.server.error(err);
      }
    });

    next();
  }

}
