/* jshint strict: true */

var constants = require('./constants')
  , cio = require('./constants-io')
  , handlers = {
    'handshake': require('./handshake'),
    'change_cipher_spec': {
      read: function(buf, msg, options) {
        msg.ChangeCipherSpecMessage = (cio.readUInt8(buf) == 1);
        return msg;
      },
      size: function(msg, options) {
        return 1; // uint8
      },
      fix: function(msg, options) {
        msg.ChangeCipherSpecMessage = 1;
        return 1; // uint8
      },
      write: function(buf, msg, options) {
        if (msg.ChangeCipherSpecMessage) {
          cio.writeUInt8(buf, 1);
        } else {
          throw new Error('invalid ChangeCipherSpecMessage')
        }
      }
    }
  };
  
var getHandler = function(type) {
  if (handlers[type]) return handlers[type];
  throw new Error('the content type '+type+' is not implemented');
};
  
exports.read = function(buf, options) {
  if (options === undefined) options = {};
  if (!Buffer.isBuffer(buf)) throw new Error('invalid buffer argument');
  var updateBufferCursor = false;
  if (options.offset === undefined) {
    if (buf.cursor !== undefined) {
      options.offset = buf.cursor;
      updateBufferCursor = true;
    } else {
      throw new Error('neither offset nor buf.cursor is defined');
    }
  }
  var startOffset = options.offset;
  buf.cursor = options.offset;
  
  if (buf.cursor + 5 > buf.length) return false;
  
  var msg = {};
  msg.ContentType = cio.readContentType(buf);
  msg.ProtocolVersion = cio.readProtocolVersion(buf);
  msg.Length = cio.readUInt16(buf);
  
  if (buf.cursor + msg.Length > buf.length) {
    if (!updateBufferCursor) buf.cursor = startOffset;
    return false;
  }
  
  msg = getHandler(msg.ContentType).read(buf, msg, options);
  
  if (!updateBufferCursor) buf.cursor = startOffset;
  
  return msg;
};


/**
 * calculates the size of a message
 * this method expects that all Length fields are set correctly
 */
exports.size = function(msg, options) {
  if (options === undefined) options = {};
  var size = 0;
  size += constants.sizeOf.ContentType;
  size += constants.sizeOf.ProtocolVersion;
  size += 2; // Length uint16
  size += getHandler(msg.ContentType).size(msg, options);
  return size;
};

/**
 * sets all sizes and hashes of the message
 */
exports.fix = function(msg, options) {
  if (options === undefined) options = {};
  if (!msg.ContentType) throw new Error('ContentType is required');
  if (!msg.ProtocolVersion) msg.ProtocolVersion = '1.1';
  msg.Length = getHandler(msg.ContentType).fix(msg, options);
  return msg;
};

/**
 * writes a message to the buffer
 */
exports.write = function(buf, msg, options) {
  if (options === undefined) options = {};
  if (options.doFix === undefined) options.doFix = true;
  if (!Buffer.isBuffer(buf)) throw new Error('invalid buffer argument');
  if (options.doFix) msg = exports.fix(msg, options);
  var msgSize = exports.size(msg);
  if (msgSize === undefined) throw new Error('invalid msg');
  var updateBufferCursor = false;
  if (options.offset === undefined) {
    if (buf.cursor !== undefined) {
      options.offset = buf.cursor;
      updateBufferCursor = true;
    } else {
      throw new Error('neither offset nor buf.cursor is defined');
    }
  }
  
  var startOffset = options.offset;
  buf.cursor = options.offset;
  
  if (buf.cursor+msgSize > buf.length) {
    throw new Error('write buffer is to samll');
  }
  
  cio.writeContentType(buf, msg.ContentType);
  cio.writeProtocolVersion(buf, msg.ProtocolVersion);
  cio.writeUInt16(buf, msg.Length);
  getHandler(msg.ContentType).write(buf, msg, options);

  if (!updateBufferCursor) buf.cursor = startOffset;
};