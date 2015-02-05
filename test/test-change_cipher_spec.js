var msg = require('../message');

var records = function(){
  return [
    {
      buf: new Buffer('140303000101', 'hex'),
      obj: {
        ContentType: "change_cipher_spec",
        ProtocolVersion: "1.2",
        Length: 1,
        ChangeCipherSpecMessage: true,
      },
      fix: {
        ContentType: "change_cipher_spec",
        ProtocolVersion: "1.2",
      },
      name: 'chrome'
    }
  ];
};

// add all content unaware tests
require('./content-unaware-tests')(exports, records);