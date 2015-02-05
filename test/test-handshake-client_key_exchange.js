var msg = require('../message');

var records = function(){
  return [
    {
      buf: new Buffer('1603030046100000424104290b993a39ccffe4234a7b6403111c50ae27af2a83a8e60f7c32a43cf088b241124ba8c640a877d7267537ebfec76a56c5ba42ec8a5909efa5fd2f3072bd6d1a', 'hex'),
      obj: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        Length: 70,
        handshake: {
          HandshakeType: "client_key_exchange",
          Length: 66,
          Content: new Buffer('4104290b993a39ccffe4234a7b6403111c50ae27af2a83a8e60f7c32a43cf088b241124ba8c640a877d7267537ebfec76a56c5ba42ec8a5909efa5fd2f3072bd6d1a', 'hex')
        }
      },
      fix: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        handshake: {
          HandshakeType: "client_key_exchange",
          Content: new Buffer('4104290b993a39ccffe4234a7b6403111c50ae27af2a83a8e60f7c32a43cf088b241124ba8c640a877d7267537ebfec76a56c5ba42ec8a5909efa5fd2f3072bd6d1a', 'hex')
        }
      },
      name: 'chrome DH'
    },
    {
      buf: new Buffer('16030301061000010201004eeb7b8fdbb95068ac1c69f101a87a0931750840b8776280acc58c88825fff61b0ef44b092883d1fdee6b1193e9b8b8d75c50ed2dc45c55352367ed92026f16d4e31a1390852c650b81867ad7b51adb9682a2e4dfc4e297147e961fc1b7a9cdf10600237e5c790472ab43dc316520c103a9c994429db350314e99e23c12b7ff6cf37e4ee730d64e771d52b01c4f71d7d76fb2ef9c5ea2f700aa547e32bfab3b206c87b7165d9c81ca2f8516d26c5bf7a630296823b625a05aa752be639aab0cc7e44db47aadd6fcc1e51d381a4c73c349ae183722e8443ee852bcd5cfb12febeb2f9ac23eb2ee3a32b516e3ad7d5c635f3bd81991f0dc09f0e437f169d999796', 'hex'),
      obj: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        Length: 262,
        handshake: {
          HandshakeType: "client_key_exchange",
          Length: 258,
          Content: new Buffer('01004eeb7b8fdbb95068ac1c69f101a87a0931750840b8776280acc58c88825fff61b0ef44b092883d1fdee6b1193e9b8b8d75c50ed2dc45c55352367ed92026f16d4e31a1390852c650b81867ad7b51adb9682a2e4dfc4e297147e961fc1b7a9cdf10600237e5c790472ab43dc316520c103a9c994429db350314e99e23c12b7ff6cf37e4ee730d64e771d52b01c4f71d7d76fb2ef9c5ea2f700aa547e32bfab3b206c87b7165d9c81ca2f8516d26c5bf7a630296823b625a05aa752be639aab0cc7e44db47aadd6fcc1e51d381a4c73c349ae183722e8443ee852bcd5cfb12febeb2f9ac23eb2ee3a32b516e3ad7d5c635f3bd81991f0dc09f0e437f169d999796', 'hex')
        }
      },
      fix: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        handshake: {
          HandshakeType: "client_key_exchange",
          Content: new Buffer('01004eeb7b8fdbb95068ac1c69f101a87a0931750840b8776280acc58c88825fff61b0ef44b092883d1fdee6b1193e9b8b8d75c50ed2dc45c55352367ed92026f16d4e31a1390852c650b81867ad7b51adb9682a2e4dfc4e297147e961fc1b7a9cdf10600237e5c790472ab43dc316520c103a9c994429db350314e99e23c12b7ff6cf37e4ee730d64e771d52b01c4f71d7d76fb2ef9c5ea2f700aa547e32bfab3b206c87b7165d9c81ca2f8516d26c5bf7a630296823b625a05aa752be639aab0cc7e44db47aadd6fcc1e51d381a4c73c349ae183722e8443ee852bcd5cfb12febeb2f9ac23eb2ee3a32b516e3ad7d5c635f3bd81991f0dc09f0e437f169d999796', 'hex')
        }
      },
      name: 'chrome RSA'
    },
    {
      buf: new Buffer('1603030046100000424104290b993a39ccffe4234a7b6403111c50ae27af2a83a8e60f7c32a43cf088b241124ba8c640a877d7267537ebfec76a56c5ba42ec8a5909efa5fd2f3072bd6d1a', 'hex'),
      obj: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        Length: 70,
        handshake: {
          HandshakeType: "client_key_exchange",
          Length: 66,
          Content: {
            ClientDiffieHellmanPublicLength: 65,
            ClientDiffieHellmanPublic: new Buffer('04290b993a39ccffe4234a7b6403111c50ae27af2a83a8e60f7c32a43cf088b241124ba8c640a877d7267537ebfec76a56c5ba42ec8a5909efa5fd2f3072bd6d1a', 'hex')
          }
        }
      },
      fix: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        handshake: {
          HandshakeType: "client_key_exchange",
          Content: {
            ClientDiffieHellmanPublic: new Buffer('04290b993a39ccffe4234a7b6403111c50ae27af2a83a8e60f7c32a43cf088b241124ba8c640a877d7267537ebfec76a56c5ba42ec8a5909efa5fd2f3072bd6d1a', 'hex')
          }
        }
      },
      options: {
        client_key_exchange: 'DH'
      },
      name: 'chrome DH with options'
    },
    {
      buf: new Buffer('16030301061000010201004eeb7b8fdbb95068ac1c69f101a87a0931750840b8776280acc58c88825fff61b0ef44b092883d1fdee6b1193e9b8b8d75c50ed2dc45c55352367ed92026f16d4e31a1390852c650b81867ad7b51adb9682a2e4dfc4e297147e961fc1b7a9cdf10600237e5c790472ab43dc316520c103a9c994429db350314e99e23c12b7ff6cf37e4ee730d64e771d52b01c4f71d7d76fb2ef9c5ea2f700aa547e32bfab3b206c87b7165d9c81ca2f8516d26c5bf7a630296823b625a05aa752be639aab0cc7e44db47aadd6fcc1e51d381a4c73c349ae183722e8443ee852bcd5cfb12febeb2f9ac23eb2ee3a32b516e3ad7d5c635f3bd81991f0dc09f0e437f169d999796', 'hex'),
      obj: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        Length: 262,
        handshake: {
          HandshakeType: "client_key_exchange",
          Length: 258,
          Content: {
            EncryptedPreMasterSecretLength: 256,
            EncryptedPreMasterSecret: new Buffer('4eeb7b8fdbb95068ac1c69f101a87a0931750840b8776280acc58c88825fff61b0ef44b092883d1fdee6b1193e9b8b8d75c50ed2dc45c55352367ed92026f16d4e31a1390852c650b81867ad7b51adb9682a2e4dfc4e297147e961fc1b7a9cdf10600237e5c790472ab43dc316520c103a9c994429db350314e99e23c12b7ff6cf37e4ee730d64e771d52b01c4f71d7d76fb2ef9c5ea2f700aa547e32bfab3b206c87b7165d9c81ca2f8516d26c5bf7a630296823b625a05aa752be639aab0cc7e44db47aadd6fcc1e51d381a4c73c349ae183722e8443ee852bcd5cfb12febeb2f9ac23eb2ee3a32b516e3ad7d5c635f3bd81991f0dc09f0e437f169d999796', 'hex')
          }
        }
      },
      fix: {
        ContentType: "handshake",
        ProtocolVersion: "1.2",
        handshake: {
          HandshakeType: "client_key_exchange",
          Content: {
            EncryptedPreMasterSecret: new Buffer('4eeb7b8fdbb95068ac1c69f101a87a0931750840b8776280acc58c88825fff61b0ef44b092883d1fdee6b1193e9b8b8d75c50ed2dc45c55352367ed92026f16d4e31a1390852c650b81867ad7b51adb9682a2e4dfc4e297147e961fc1b7a9cdf10600237e5c790472ab43dc316520c103a9c994429db350314e99e23c12b7ff6cf37e4ee730d64e771d52b01c4f71d7d76fb2ef9c5ea2f700aa547e32bfab3b206c87b7165d9c81ca2f8516d26c5bf7a630296823b625a05aa752be639aab0cc7e44db47aadd6fcc1e51d381a4c73c349ae183722e8443ee852bcd5cfb12febeb2f9ac23eb2ee3a32b516e3ad7d5c635f3bd81991f0dc09f0e437f169d999796', 'hex')
          }
        }
      },
      options: {
        client_key_exchange: 'RSA'
      },
      name: 'chrome RSA with options'
    }
  ];
};

// add all content unaware tests
require('./content-unaware-tests')(exports, records);