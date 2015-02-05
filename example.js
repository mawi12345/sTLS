/* jshint strict: true */

var net = require('net')
  , msg = require('./message');

// optional dependency to print the certificate
var asn1 = null;
try {
  asn1 = require('sasn1');
} catch(e) {
  console.log('if you want to see the certificate content install sasn1 `npm install sasn1`');
}

var readBuf = new Buffer(0);

var socket = net.connect({host: 'google.com', port: 443}, function() {
//var socket = net.connect({host: '127.0.0.1', port: 3333}, function() {
  console.log('connected');
  
  var client_hello = msg.fix({
    ContentType: "handshake",
    ProtocolVersion: "1.1",
    handshake: {
      HandshakeType: "client_hello",
      ProtocolVersion: "1.1",
      Time: 1422729952,
      Random: new Buffer('9fe9c4556bb4a6246a8641ad23c8a4c69a7c41da9d78e462a2a35290', 'hex'),
      CipherSuites: [
        'TLS_RSA_WITH_AES_128_GCM_SHA256',
        'TLS_RSA_WITH_AES_256_GCM_SHA384',
        'TLS_RSA_PSK_WITH_AES_128_GCM_SHA256',
        'TLS_RSA_WITH_AES_128_CBC_SHA'
      ],
      Extensions: []
    }
  });
  
  console.log('====>====>====>');
  console.log(client_hello);
  
  var buf = new Buffer(msg.size(client_hello));
  buf.cursor = 0;
  msg.write(buf, client_hello);
  socket.write(buf);
  
});

socket.on('data', function(chunk) {
  readBuf = Buffer.concat([readBuf, chunk]);
  readBuf.cursor = 0;
  var packet = msg.read(readBuf);
  while(packet) {
    readBuf = readBuf.slice(readBuf.cursor, readBuf.length);
    readBuf.cursor = 0;
    socket.emit('tls-packet', packet);
    packet = msg.read(readBuf);
  }
});


var certificate = null;

socket.on('tls-packet', function(packet) {
  console.log('<====<====<====');
  console.log(packet);
  
  if (packet.handshake && packet.handshake.HandshakeType == 'certificate') {
    certificate = packet.handshake.Certificates[packet.handshake.Certificates.length-1];
    console.log('certificate:');
    if (asn1) {
      var crt = asn1.decode(certificate.Bytes);
      console.log(crt);
    } else {
      console.log(certificate);
    }
  }
  
  if (packet.handshake && packet.handshake.HandshakeType == 'server_hello_done') {
    var client_key_exchange = msg.fix({
      ContentType: "handshake",
      ProtocolVersion: "1.1",
      handshake: {
        HandshakeType: "client_key_exchange",
        Content: {
          EncryptedPreMasterSecret: new Buffer('4eeb7b8fdbb95068ac1c69f101a87a0931750840b8776280acc58c88825fff61b0ef44b092883d1fdee6b1193e9b8b8d75c50ed2dc45c55352367ed92026f16d4e31a1390852c650b81867ad7b51adb9682a2e4dfc4e297147e961fc1b7a9cdf10600237e5c790472ab43dc316520c103a9c994429db350314e99e23c12b7ff6cf37e4ee730d64e771d52b01c4f71d7d76fb2ef9c5ea2f700aa547e32bfab3b206c87b7165d9c81ca2f8516d26c5bf7a630296823b625a05aa752be639aab0cc7e44db47aadd6fcc1e51d381a4c73c349ae183722e8443ee852bcd5cfb12febeb2f9ac23eb2ee3a32b516e3ad7d5c635f3bd81991f0dc09f0e437f169d999796', 'hex')
        }
      }
    });
    
    console.log('====>====>====>');
    console.log(client_key_exchange);
    
    var buf = new Buffer(msg.size(client_key_exchange));
    buf.cursor = 0;
    msg.write(buf, client_key_exchange);
    socket.write(buf);
    
    var change_cipher_spec = msg.fix({
      ContentType: "change_cipher_spec",
      ProtocolVersion: "1.1",
    });
    
    console.log('====>====>====>');
    console.log(change_cipher_spec);
    
    buf = new Buffer(msg.size(change_cipher_spec));
    buf.cursor = 0;
    msg.write(buf, change_cipher_spec);
    socket.write(buf);
  }
});