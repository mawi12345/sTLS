var msg = require('../message');

var records = function(){
  return [
    {
      buf: new Buffer('16030200040e000000', 'hex'),
      obj: {
        ContentType: "handshake",
        ProtocolVersion: "1.1",
        Length: 4,
        handshake: {
          HandshakeType: "server_hello_done",
          Length: 0,
        }
      },
      fix: {
        ContentType: "handshake",
        ProtocolVersion: "1.1",
        handshake: {
          HandshakeType: "server_hello_done",
        }
      },
      name: 'google server'
    }
  ];
};

// add all content unaware tests
require('./content-unaware-tests')(exports, records);