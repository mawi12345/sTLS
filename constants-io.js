/* jshint strict: true */

var constants = require('./constants');

/**
 * This private method creates a write method bound to the constants
 */
var createWriteMethod = function(constants, size, constantName) {
  if (size < 0 || size > 2) throw new Error('invalid size argument');
  var map = {};
  Object.keys(constants).forEach(function(value) {
    var name = constants[value];
    map[name] = value;
  });
  return function(buf, name, strict, offset) {
    if (strict === undefined) strict = true;
    var value;
    if (map[name] === undefined) {
      if (!strict) {
        value = name;
      } else {
        throw new Error('constant '+name+' of '+constantName+' not found');
      }
    } else {
      value = map[name];
    }
    if (offset === undefined) {
      if (buf.cursor !== undefined) {
        offset = buf.cursor;
        buf.cursor += size;
      } else {
        throw new Error('neither offset nor buf.cursor is defined');
      }
    }
    if (!Buffer.isBuffer(buf)) {
      throw new Error('invalid buffer argument');
    } else if (offset + size > buf.length) {
      throw new Error('buffer is to small');
    } else {
      if (size == 1) {
        buf.writeUInt8(value, offset);
      } else if (size == 2) {
        buf.writeUInt16BE(value, offset);
      } else {
        throw new Error('invalid size argument');
      }
    }
  };
};

/**
 * This private method creates a read method bound to the constants
 */
var createReadMethod = function(constants, size, constantName) {
  if (size < 0 || size > 2) throw new Error('invalid size argument');
  return function(buf, strict, offset) {
    if (strict === undefined) strict = true;
    if (offset === undefined) {
      if (buf.cursor !== undefined) {
        offset = buf.cursor;
        buf.cursor += size;
      } else {
        throw new Error('neither offset nor buf.cursor is defined');
      }
    }
    if (!Buffer.isBuffer(buf)) {
      throw new Error('invalid buffer argument');
    } else if (offset + size > buf.length) {
      throw new Error('buffer is to small');
    } else {
      var value = null;
      if (size == 1) {
        value = buf.readUInt8(offset);
      } else if (size == 2) {
        value = buf.readUInt16BE(offset);
      } else {
        throw new Error('invalid size argument');
      }
      if (constants[value]) {
        return constants[value];
      } else if (!strict) {
        return value;
      } else {
        throw new Error('constant name for value '+value+' of '+constantName+' not found');
      }
    }
  };
};

/**
 * export for every constant a read and a write method
 */
Object.keys(constants).forEach(function(name) {
  if (name != 'sizeOf' && constants.sizeOf[name]) {
    exports['write'+name] = createWriteMethod(constants[name], constants.sizeOf[name], name);
    exports['read'+name] = createReadMethod(constants[name], constants.sizeOf[name], name);
  }
});

var offestAndCursor = function(buf, offset, size) {
  if (offset === undefined) {
    if (buf.cursor !== undefined) {
      offset = buf.cursor;
      buf.cursor += size;
    } else {
      throw new Error('neither offset nor buf.cursor is defined');
    }
  }
  return offset;
};

exports.readUInt8 = function(buf, offset) {
  offset = offestAndCursor(buf, offset, 1);
  return buf.readUInt8(offset);
};

exports.writeUInt8 = function(buf, value, offset) {
  offset = offestAndCursor(buf, offset, 1);
  buf.writeUInt8(value, offset);
};

exports.readUInt16 = function(buf, offset) {
  offset = offestAndCursor(buf, offset, 2);
  return buf.readUInt16BE(offset);
};

exports.writeUInt16 = function(buf, value, offset) {
  offset = offestAndCursor(buf, offset, 2);
  buf.writeUInt16BE(value, offset);
};

exports.readUInt24 = function(buf, offset) {
  offset = offestAndCursor(buf, offset, 3);
  return (buf.readUInt8(offset) << 16)  +
         (buf.readUInt8(offset+1) << 8) +
          buf.readUInt8(offset+2);
};

exports.writeUInt24 = function(buf, value, offset) {
  offset = offestAndCursor(buf, offset, 3);
  buf.writeUInt8((value >> 16) & 0xFF, offset);
  buf.writeUInt8((value >> 8) & 0xFF, offset+1);
  buf.writeUInt8(value & 0xFF, offset+2);
};

exports.readUInt32 = function(buf, offset) {
  offset = offestAndCursor(buf, offset, 4);
  return buf.readUInt32BE(offset);
};

exports.writeUInt32 = function(buf, value, offset) {
  offset = offestAndCursor(buf, offset, 4);
  buf.writeUInt32BE(value, offset);
};

exports.readBytes = function(buf, len, offset) {
  if (len < 1) throw new Error('invalid length');
  offset = offestAndCursor(buf, offset, len);
  var targetBuffer = new Buffer(len);
  buf.copy(targetBuffer, 0, offset, offset+len);
  return targetBuffer;
};

exports.writeBytes = function(buf, bufValue, offset) {
  offset = offestAndCursor(buf, offset, bufValue.length);
  bufValue.copy(buf, offset, 0, bufValue.length);
};