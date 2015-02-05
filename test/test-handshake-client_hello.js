var msg = require('../message');

var records = function(){
  return [
    {
      buf: new Buffer('16030200310100002d030254cd22e09fe9c4556bb4a6246a8641ad23c8a4c69a7c41da9d78e462a2a352900000040033c01101000000', 'hex'),
      obj: {
        ContentType: "handshake",
        ProtocolVersion: "1.1",
        Length: 49,
        handshake: {
          HandshakeType: "client_hello",
          Length: 45,
          ProtocolVersion: "1.1",
          Time: 1422729952,
          Random: new Buffer('9fe9c4556bb4a6246a8641ad23c8a4c69a7c41da9d78e462a2a35290', 'hex'),
          SessionIDLength: 0,
          CipherSuitesLength: 4,
          CipherSuites: [
            'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
            'TLS_ECDHE_RSA_WITH_RC4_128_SHA'
          ],
          CompressionMethodsLength: 1,
          CompressionMethods: [ 'null' ],
          ExtensionsLength: 0,
          Extensions: []
        }
      },
      fix: {
        ContentType: "handshake",
        ProtocolVersion: "1.1",
        handshake: {
          HandshakeType: "client_hello",
          ProtocolVersion: "1.1",
          Time: 1422729952,
          Random: new Buffer('9fe9c4556bb4a6246a8641ad23c8a4c69a7c41da9d78e462a2a35290', 'hex'),
          CipherSuites: [
            'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
            'TLS_ECDHE_RSA_WITH_RC4_128_SHA'
          ],
          Extensions: []
        }
      },
      name: 'minimal'
    },
    {
      buf: new Buffer('16030100d2010000ce030359fe2ff8326bab07607d65abdd79de67e8455f28162c6de11640ec7de2851c2000002ac02fc02b009ecc14cc13cc15c014c00a0039c013c0090033c011c007009c0035002f00050004000a00ff0100007b00000013001100000e746f6f6c732e696574662e6f726700230000000d00160014060106030501050304010403030103030201020300050005010000000033740000001200000010001b001908687474702f312e3106737064792f3308737064792f332e3175500000000b00020100000a00080006001700180019', 'hex'),
      obj: {
        ContentType: 'handshake',
        ProtocolVersion: '1.0',
        Length: 210,
        handshake: {
          HandshakeType: 'client_hello',
          Length: 206,
          ProtocolVersion: '1.2',
          Time: 1509830648,
          Random: new Buffer('326bab07607d65abdd79de67e8455f28162c6de11640ec7de2851c20', 'hex'),
          SessionIDLength: 0,
          CipherSuitesLength: 42,
          CipherSuites: [
            'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
            'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
            'TLS_DHE_RSA_WITH_AES_128_GCM_SHA256',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
            'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256',
            'TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256',
            'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA',
            'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA',
            'TLS_DHE_RSA_WITH_AES_256_CBC_SHA',
            'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA',
            'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA',
            'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
            'TLS_ECDHE_RSA_WITH_RC4_128_SHA',
            'TLS_ECDHE_ECDSA_WITH_RC4_128_SHA',
            'TLS_RSA_WITH_AES_128_GCM_SHA256',
            'TLS_RSA_WITH_AES_256_CBC_SHA',
            'TLS_RSA_WITH_AES_128_CBC_SHA',
            'TLS_RSA_WITH_RC4_128_SHA',
            'TLS_RSA_WITH_RC4_128_MD5',
            'TLS_RSA_WITH_3DES_EDE_CBC_SHA',
            'TLS_EMPTY_RENEGOTIATION_INFO_SCSV'
          ],
          CompressionMethodsLength: 1,
          CompressionMethods: [ 'null' ],
          ExtensionsLength: 123,
          Extensions: [ 
          { 
            Type: 'server_name',
            Length: 19,
            Bytes: new Buffer('001100000e746f6f6c732e696574662e6f7267', 'hex')
          },
          { 
            Type: 'SessionTicket TLS', 
            Length: 0 
          },
          { 
            Type: 'signature_algorithms',
            Length: 22,
            Bytes: new Buffer('00140601060305010503040104030301030302010203', 'hex')
          },
          { 
            Type: 'status_request',
            Length: 5,
            Bytes: new Buffer('0100000000', 'hex') 
          },
          { 
            Type: 13172, 
            Length: 0 
          },
          { 
            Type: 'signed_certificate_timestamp', 
            Length: 0 
          },
          { 
            Type: 'application_layer_protocol_negotiation',
            Length: 27,
            Bytes: new Buffer('001908687474702f312e3106737064792f3308737064792f332e31', 'hex')
          },
          { 
            Type: 30032, 
            Length: 0,
          },
          { 
            Type: 'ec_point_formats', 
            Length: 2, 
            Bytes: new Buffer('0100', 'hex')
          },
          { 
            Type: 'elliptic_curves',
            Length: 8,
            Bytes: new Buffer('0006001700180019', 'hex')
          }]
        }
      },
      fix: {
        ContentType: 'handshake',
        ProtocolVersion: '1.0',
        handshake: {
          HandshakeType: 'client_hello',
          ProtocolVersion: '1.2',
          Time: 1509830648,
          Random: new Buffer('326bab07607d65abdd79de67e8455f28162c6de11640ec7de2851c20', 'hex'),
          SessionIDLength: 0,
          CipherSuites: [
            'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
            'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
            'TLS_DHE_RSA_WITH_AES_128_GCM_SHA256',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
            'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256',
            'TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256',
            'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA',
            'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA',
            'TLS_DHE_RSA_WITH_AES_256_CBC_SHA',
            'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA',
            'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA',
            'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
            'TLS_ECDHE_RSA_WITH_RC4_128_SHA',
            'TLS_ECDHE_ECDSA_WITH_RC4_128_SHA',
            'TLS_RSA_WITH_AES_128_GCM_SHA256',
            'TLS_RSA_WITH_AES_256_CBC_SHA',
            'TLS_RSA_WITH_AES_128_CBC_SHA',
            'TLS_RSA_WITH_RC4_128_SHA',
            'TLS_RSA_WITH_RC4_128_MD5',
            'TLS_RSA_WITH_3DES_EDE_CBC_SHA',
            'TLS_EMPTY_RENEGOTIATION_INFO_SCSV'
          ],
          Extensions: [ 
          { 
            Type: 'server_name',
            Bytes: new Buffer('001100000e746f6f6c732e696574662e6f7267', 'hex')
          },
          { 
            Type: 'SessionTicket TLS', 
            Length: 0 
          },
          { 
            Type: 'signature_algorithms',
            Bytes: new Buffer('00140601060305010503040104030301030302010203', 'hex')
          },
          { 
            Type: 'status_request',
            Bytes: new Buffer('0100000000', 'hex') 
          },
          { 
            Type: 13172, 
            Length: 0
          },
          { 
            Type: 'signed_certificate_timestamp', 
            Length: 0 
          },
          { 
            Type: 'application_layer_protocol_negotiation',
            Bytes: new Buffer('001908687474702f312e3106737064792f3308737064792f332e31', 'hex')
          },
          { 
            Type: 30032, 
            Length: 0,
          },
          { 
            Type: 'ec_point_formats', 
            Bytes: new Buffer('0100', 'hex')
          },
          { 
            Type: 'elliptic_curves',
            Bytes: new Buffer('0006001700180019', 'hex')
          }]
        }
      },
      name: 'chrome'
    }
  ];
};

// add all content unaware tests
require('./content-unaware-tests')(exports, records);
