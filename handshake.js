/* jshint strict: true */

var constants = require('./constants')
  , cio = require('./constants-io');

// private Extension functions

var readExtensions = function(buf, handshake) {
  handshake.ExtensionsLength = cio.readUInt16(buf);
  handshake.Extensions = [];
  
  var extension_cursor = 0;
  while (extension_cursor < handshake.ExtensionsLength) {
    var extension = {};
    extension.Type = cio.readExtensionType(buf, false);
    extension.Length = cio.readUInt16(buf);
    if (extension.Length > 0)
      extension.Bytes = cio.readBytes(buf, extension.Length);
    extension_cursor += constants.sizeOf.ExtensionType + 2 + extension.Length;
    handshake.Extensions.push(extension);
  }
};

var writeExtensions = function(buf, handshake) {
  cio.writeUInt16(buf, handshake.ExtensionsLength);
  var extensionsLengthCheck = 0;
  handshake.Extensions.forEach(function(Extension) {
    cio.writeExtensionType(buf, Extension.Type, false);
    cio.writeUInt16(buf, Extension.Length);
    if (Extension.Length > 0) {
      cio.writeBytes(buf, Extension.Bytes);
      extensionsLengthCheck += Extension.Bytes.length;
    }
    extensionsLengthCheck += constants.sizeOf.ExtensionType;
    extensionsLengthCheck += 2; // Length uint16
  });
  if (extensionsLengthCheck != handshake.ExtensionsLength)
    throw new Error('invalid ExtensionsLength '+extensionsLengthCheck+' != '+handshake.ExtensionsLength);
};

var fixExtensions = function(handshake) {
  var size = 0;
  if (Array.isArray(handshake.Extensions)) {
    size += 2; // length uint16
    var extlen = 0;
    handshake.Extensions.forEach(function(Extension){
      if (Extension.Length === undefined) {
        if (Buffer.isBuffer(Extension.Bytes)) {
          Extension.Length = Extension.Bytes.length;
        } else {
          throw new Error('Extension.Length or Extension.Bytes is required');
        }
      }
      if (Extension.Length !== 0 && (!Buffer.isBuffer(Extension.Bytes) || Extension.Bytes.length != Extension.Length)) 
        throw new Error('Extension.Bytes are invalid '+Extension.Type);
      extlen += constants.sizeOf.ExtensionType;
      extlen += 2; // Length uint16
      extlen += Extension.Length;
    });
    handshake.ExtensionsLength = extlen;
    size += extlen;
  } else if (handshake.ExtensionsLength == 0) {
    handshake.Extensions = [];
    size += 2; // length uint16
  }
  return size;
};

var read = {};
var fix = {};
var write = {};

// ## client hello -------------------------------------------------------------

read.client_hello = function(buf, handshake, options) {
  var handshake_start_cursor = buf.cursor;
  
  handshake.ProtocolVersion = cio.readProtocolVersion(buf);
  handshake.Time = cio.readUInt32(buf);
  handshake.Random = cio.readBytes(buf, 28);
  handshake.SessionIDLength = cio.readUInt8(buf);
  
  if (handshake.SessionIDLength != 0) throw new Error('not implemented');
  
  handshake.CipherSuitesLength = cio.readUInt16(buf);
  if (handshake.CipherSuitesLength % 2 != 0) throw new Error('invalid CipherSuitesLength');
  handshake.CipherSuites = [];
  for (var i=0; i<handshake.CipherSuitesLength; i+=2) {
    handshake.CipherSuites.push(cio.readCipherSuite(buf, false));
  }
  handshake.CompressionMethodsLength = cio.readUInt8(buf);
  handshake.CompressionMethods = [];
  for (var i=0; i<handshake.CompressionMethodsLength; i++) {
    handshake.CompressionMethods.push(cio.readCompressionMethod(buf));
  }
  
  // if the packet is longer then parse the extensions
  if (handshake.Length >= buf.cursor-handshake_start_cursor+2) {
    readExtensions(buf, handshake);
  }
};

fix.client_hello = function(msg, options) {
  var handshake = msg.handshake;
  var size = 0;
  
  if (!handshake.ProtocolVersion) handshake.ProtocolVersion = '1.1';
  size += constants.sizeOf.ProtocolVersion;
  
  if (!handshake.Time) handshake.Time = Math.floor((new Date()).getTime()/1000);
  size += 4; // Time uint32
  
  if (!Buffer.isBuffer(handshake.Random)) {
    handshake.Random = new Buffer(handshake.Random);
    if (handshake.Random.length != 28)
      handshake.Random = new Buffer(28);
  }
  size += 28; // random
  
  if (!handshake.SessionIDLength) handshake.SessionIDLength = 0;
  size += 1; // SessionIDLength uint8
  if (handshake.SessionIDLength) {
    size += handshake.SessionIDLength;
    if (!Buffer.isBuffer(handshake.SessionID)) {
      handshake.SessionID = new Buffer(handshake.SessionID);
      if (handshake.SessionID.length != handshake.SessionIDLength)
        handshake.SessionID = new Buffer(handshake.SessionIDLength);
    }
  }
  
  size += 2; // CipherSuitesLength uint16
  if (Array.isArray(handshake.CipherSuites)) {
    handshake.CipherSuitesLength = handshake.CipherSuites.length * constants.sizeOf.CipherSuite;
  } else {
    handshake.CipherSuites = [];
    handshake.CipherSuitesLength = 0;
  }
  size += handshake.CipherSuitesLength;
  
  size += 1; // CompressionMethodsLength unit8
  if (Array.isArray(handshake.CompressionMethods)) {
    handshake.CompressionMethodsLength = handshake.CompressionMethods.length * constants.sizeOf.CompressionMethod;
  } else {
    handshake.CompressionMethods = [ 'null' ];
    handshake.CompressionMethodsLength = 1;
  }
  size += handshake.CompressionMethodsLength;
  
  size += fixExtensions(handshake);
  
  return size;
};

write.client_hello = function(buf, handshake, options) {
  
  cio.writeProtocolVersion(buf, handshake.ProtocolVersion);
  cio.writeUInt32(buf, handshake.Time);
  cio.writeBytes(buf, handshake.Random);
  cio.writeUInt8(buf, handshake.SessionIDLength);
  if (handshake.SessionIDLength != 0) throw new Error('not implemented');
  
  cio.writeUInt16(buf, handshake.CipherSuitesLength);
  var cipherLengthCheck = 0;
  handshake.CipherSuites.forEach(function(CipherSuite) {
    cio.writeCipherSuite(buf, CipherSuite);
    cipherLengthCheck += 2;
  });
  if (cipherLengthCheck != handshake.CipherSuitesLength)
    throw new Error('invalid CipherSuitesLength');
  
  cio.writeUInt8(buf, handshake.CompressionMethodsLength);
  var compressionLengthCheck = 0;
  handshake.CompressionMethods.forEach(function(CompressionMethod) {
    cio.writeCompressionMethod(buf, CompressionMethod);
    compressionLengthCheck += 1;
  });
  if (compressionLengthCheck != handshake.CompressionMethodsLength)
    throw new Error('invalid CompressionMethodsLength');
    
  if (handshake.ExtensionsLength !== undefined) {
    writeExtensions(buf, handshake);
  }
};

// ## server hello -------------------------------------------------------------

read.server_hello = function(buf, handshake, options) {
  var handshake_start_cursor = buf.cursor;
  handshake.ProtocolVersion = cio.readProtocolVersion(buf);
  handshake.Time = cio.readUInt32(buf);
  handshake.Random = cio.readBytes(buf, 28);
  handshake.SessionIDLength = cio.readUInt8(buf);
  
  if (handshake.SessionIDLength > 0) {
    if (handshake.SessionIDLength > 32) throw new Error('invalid SessionIDLength');
    handshake.SessionID = cio.readBytes(buf, handshake.SessionIDLength);
  }
  
  handshake.CipherSuite = cio.readCipherSuite(buf, false);
  handshake.CompressionMethod = cio.readCompressionMethod(buf);
  
  // if the packet is longer then parse the extensions
  if (handshake.Length >= buf.cursor-handshake_start_cursor+2) {
    readExtensions(buf, handshake);
  }
};

fix.server_hello = function(msg, options) {
  var handshake = msg.handshake;
  var size = 0;
  
  if (!handshake.ProtocolVersion) handshake.ProtocolVersion = '1.1';
  size += constants.sizeOf.ProtocolVersion;
  
  if (!handshake.Time) handshake.Time = Math.floor((new Date()).getTime()/1000);
  size += 4; // Time uint32
  
  if (!Buffer.isBuffer(handshake.Random)) {
    handshake.Random = new Buffer(handshake.Random);
    if (handshake.Random.length != 28)
      handshake.Random = new Buffer(28);
  }
  size += 28; // random
  
  if (!handshake.SessionIDLength) handshake.SessionIDLength = 0;
  size += 1; // SessionIDLength uint8
  if (handshake.SessionIDLength) {
    size += handshake.SessionIDLength;
    if (!Buffer.isBuffer(handshake.SessionID)) {
      handshake.SessionID = new Buffer(handshake.SessionID);
      if (handshake.SessionID.length != handshake.SessionIDLength)
        handshake.SessionID = new Buffer(handshake.SessionIDLength);
    }
  }
  
  if (!handshake.CipherSuite) throw new Error('handshake.CipherSuite is required');
  size += constants.sizeOf.CipherSuite;
  
  if (!handshake.CompressionMethod) handshake.CompressionMethod = 'null';
  size += 1; // CompressionMethodsLength unit8
  
  size += fixExtensions(handshake);
  
  return size;
};

write.server_hello = function(buf, handshake, options) {
  
  cio.writeProtocolVersion(buf, handshake.ProtocolVersion);
  cio.writeUInt32(buf, handshake.Time);
  cio.writeBytes(buf, handshake.Random);
  cio.writeUInt8(buf, handshake.SessionIDLength);
  if (handshake.SessionIDLength != 0) throw new Error('not implemented');
  
  cio.writeCipherSuite(buf, handshake.CipherSuite);
  cio.writeCompressionMethod(buf, handshake.CompressionMethod);
  
  if (handshake.ExtensionsLength !== undefined) {
    writeExtensions(buf, handshake);
  }
};

// ## certificate --------------------------------------------------------------

read.certificate = function(buf, handshake, options) {
  var handshake_start_cursor = buf.cursor;
  
  handshake.CertificatesLength = cio.readUInt24(buf);
  handshake.Certificates = [];
  
  var certificate_cursor = 0;
  while (certificate_cursor < handshake.CertificatesLength) {
    var certificate = {};
    certificate.Length = cio.readUInt24(buf);
    if (certificate.Length > 0)
      certificate.Bytes = cio.readBytes(buf, certificate.Length);
    certificate_cursor += certificate.Length + 3 // length uint24;
    handshake.Certificates.push(certificate);
  }
  
  // if the packet is longer then parse the extensions
  if (handshake.Length >= buf.cursor-handshake_start_cursor+2) {
    readExtensions(buf, handshake);
  }
};

fix.certificate = function(msg, options) {
  var handshake = msg.handshake;
  var size = 0;
  
  size += 3; // CertificatesLength uint24
  
  if (Array.isArray(handshake.Certificates)) {
    var certlen = 0;
    handshake.Certificates.forEach(function(Certificate){
      if (Buffer.isBuffer(Certificate.Bytes)) {
        Certificate.Length = Certificate.Bytes.length;
        certlen += 3; // CertificateLength uint24
        certlen += Certificate.Length;
      } else {
        throw new Error('Certificate.Bytes is required');
      }
    });
    handshake.CertificatesLength = certlen;
    size += certlen;
  } else {
    handshake.CertificatesLength = 0;
    handshake.Certificates = [];
  }
  
  size += fixExtensions(handshake);
  
  return size;
};

write.certificate = function(buf, handshake, options) {

  cio.writeUInt24(buf, handshake.CertificatesLength);

  var certificatesLengthCheck = 0;
  handshake.Certificates.forEach(function(Certificate) {
    cio.writeUInt24(buf, Certificate.Length);
    cio.writeBytes(buf, Certificate.Bytes);
    certificatesLengthCheck += Certificate.Bytes.length + 3; // Length uint24
  });
  if (certificatesLengthCheck != handshake.CertificatesLength)
    throw new Error('invalid CertificatesLength '+ certificatesLengthCheck +' '+ handshake.CertificatesLength);
  
  if (handshake.ExtensionsLength !== undefined) {
    writeExtensions(buf, handshake);
  }
};

// ## server key exchange ------------------------------------------------------

read.server_key_exchange = function(buf, handshake, options) {
  var handshake_start_cursor = buf.cursor;
  
  handshake.Bytes = cio.readBytes(buf, handshake.Length);
  
  // if the packet is longer then parse the extensions
  if (handshake.Length >= buf.cursor-handshake_start_cursor+2) {
    readExtensions(buf, handshake);
  }
};

fix.server_key_exchange = function(msg, options) {
  if (!Buffer.isBuffer(msg.handshake.Bytes))
    throw new Error('server_key_exchange Bytes are required');
  msg.handshake.Length = msg.handshake.Bytes.length;
  return msg.handshake.Length;
};

write.server_key_exchange = function(buf, handshake, options) {

  cio.writeBytes(buf, handshake.Bytes);

  if (handshake.ExtensionsLength !== undefined) {
    writeExtensions(buf, handshake);
  }
};

// ## server hello done --------------------------------------------------------

read.server_hello_done = function(buf, handshake, options) {
  // if the packet is longer then parse the extensions
  if (handshake.Length >= buf.cursor-buf.cursor+2) {
    readExtensions(buf, handshake);
  }
};

fix.server_hello_done = function(msg, options) {
  msg.handshake.Length = 0;
  return msg.handshake.Length;
};

write.server_hello_done = function(buf, handshake, options) {
  if (handshake.ExtensionsLength !== undefined) {
    writeExtensions(buf, handshake);
  }
};

// ## client key exchange ------------------------------------------------------

read.client_key_exchange = function(buf, handshake, options) {
  
  if (options.client_key_exchange == 'RSA') {
    handshake.Content = {};
    handshake.Content.EncryptedPreMasterSecretLength = cio.readUInt16(buf);
    handshake.Content.EncryptedPreMasterSecret = cio.readBytes(buf, handshake.Content.EncryptedPreMasterSecretLength);
  } else if (options.client_key_exchange == 'DH') {
    handshake.Content = {};
    handshake.Content.ClientDiffieHellmanPublicLength = cio.readUInt8(buf);
    handshake.Content.ClientDiffieHellmanPublic = cio.readBytes(buf, handshake.Content.ClientDiffieHellmanPublicLength);
  } else {
    handshake.Content = cio.readBytes(buf, handshake.Length);
  }
};

fix.client_key_exchange = function(msg, options) {
  var handshake = msg.handshake;
  var size = 0;
  if (Buffer.isBuffer(handshake.Content)) {
    size = handshake.Content.length;
  } else if (handshake.Content && Buffer.isBuffer(handshake.Content.EncryptedPreMasterSecret)) {
    handshake.Content.EncryptedPreMasterSecretLength = handshake.Content.EncryptedPreMasterSecret.length;
    size = handshake.Content.EncryptedPreMasterSecretLength + 2; // Length uint16
  } else if (handshake.Content && Buffer.isBuffer(handshake.Content.ClientDiffieHellmanPublic)) {
    handshake.Content.ClientDiffieHellmanPublicLength = handshake.Content.ClientDiffieHellmanPublic.length;
    size = handshake.Content.ClientDiffieHellmanPublicLength + 1; // Length uint8
  } else {
    handshake.Content = new Buffer(0);
  }
  return size;
};

write.client_key_exchange = function(buf, handshake, options) {
  if (Buffer.isBuffer(handshake.Content)) {
    cio.writeBytes(buf, handshake.Content);
  } else if (handshake.Content && Buffer.isBuffer(handshake.Content.EncryptedPreMasterSecret)) {
    cio.writeUInt16(buf, handshake.Content.EncryptedPreMasterSecretLength);
    cio.writeBytes(buf, handshake.Content.EncryptedPreMasterSecret);
  } else if (handshake.Content && Buffer.isBuffer(handshake.Content.ClientDiffieHellmanPublic)) {
    cio.writeUInt8(buf, handshake.Content.ClientDiffieHellmanPublicLength);
    cio.writeBytes(buf, handshake.Content.ClientDiffieHellmanPublic);
  } else {
    throw new Error('invalid client_key_exchange Content');
  }
};

// # public functions ----------------------------------------------------------

exports.read = function(buf, msg, options) {
  var handshake = {};
  handshake.HandshakeType = cio.readHandshakeType(buf);
  handshake.Length = cio.readUInt24(buf);
  read[handshake.HandshakeType](buf, handshake, options);
  msg.handshake = handshake;
  return msg;
};

exports.size = function(msg, options) {
  var size = 0;
  size += constants.sizeOf.HandshakeType;
  size += 3; // Length uint24
  
  var handshake = msg.handshake;
  if (handshake.Length) size += handshake.Length;
  return size;
};

exports.fix = function(msg, options) {
  var handshake = msg.handshake;
  if (!handshake.HandshakeType) throw new Error('HandshakeType is required');
  handshake.Length = fix[handshake.HandshakeType](msg, options);
  return handshake.Length + constants.sizeOf.HandshakeType + 3; // Length uint24
};

exports.write = function(buf, msg, options) {
  var handshake = msg.handshake;
  
  cio.writeHandshakeType(buf, handshake.HandshakeType);
  cio.writeUInt24(buf, handshake.Length);
  write[handshake.HandshakeType](buf, handshake, options);
};