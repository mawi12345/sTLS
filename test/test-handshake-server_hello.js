var msg = require('../message');

var records = function(){
  return [
    {
      buf: new Buffer('1603030039020000350303b07edee4fd10eb26f3cb7290ff83ead81d1bb4e65283df96c0789de0a4cadd2500009c00000d00000000ff0100010000230000', 'hex'),
      obj: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        Length: 57,
        handshake: {
          HandshakeType: "server_hello",
          Length: 53,
          ProtocolVersion: "1.2",
          Time: 2961104612,
          Random: new Buffer('fd10eb26f3cb7290ff83ead81d1bb4e65283df96c0789de0a4cadd25', 'hex'),
          SessionIDLength: 0,
          CipherSuite: 'TLS_RSA_WITH_AES_128_GCM_SHA256',
          CompressionMethod: 'null',
          ExtensionsLength: 13,
          Extensions: [ 
            { 
              Type: 'server_name',
              Length: 0
            },
            { 
              Type: 'renegotiation_info',
              Length: 1,
              Bytes: new Buffer('00', 'hex')
            },
            { 
              Type: 'SessionTicket TLS',
              Length: 0
            }
          ]
        }
      },
      fix: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        handshake: {
          HandshakeType: "server_hello",
          ProtocolVersion: "1.2",
          Time: 2961104612,
          Random: new Buffer('fd10eb26f3cb7290ff83ead81d1bb4e65283df96c0789de0a4cadd25', 'hex'),
          CipherSuite: 'TLS_RSA_WITH_AES_128_GCM_SHA256',
          Extensions: [ 
            { 
              Type: 'server_name',
              Length: 0
            },
            { 
              Type: 'renegotiation_info',
              Bytes: new Buffer('00', 'hex')
            },
            { 
              Type: 'SessionTicket TLS',
              Length: 0
            }
          ]
        }
      },
      name: 'google server (chrome request)'
    }
  ];
};

// add all content unaware tests
require('./content-unaware-tests')(exports, records);