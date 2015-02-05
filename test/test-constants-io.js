var cio = require('../constants-io');


var uInt24s = function() {
  return [
    {val: 0x0000ff, buf: new Buffer('0000ff', 'hex')},
    {val: 0x00131f, buf: new Buffer('00131f', 'hex')},
    {val: 0x000558, buf: new Buffer('000558', 'hex')},
    {val: 0x32f558, buf: new Buffer('32f558', 'hex')},
  ]
};

exports.readUInt24 = function(test) {
  var recs = uInt24s();
  test.expect(recs.length);
  recs.forEach(function(rec) {
    var readValue = cio.readUInt24(rec.buf, 0);
    test.equal(readValue, rec.val, 'read UInt24 '+rec.val);
  });
  test.done();
}

exports.writeUInt24 = function(test) {
  var recs = uInt24s();
  test.expect(recs.length);
  recs.forEach(function(rec) {
    var target = new Buffer(3);
    cio.writeUInt24(target, rec.val, 0);
    test.equal(target.toString('hex'), rec.buf.toString('hex'), 'write UInt24 '+rec.val);
  });
  test.done();
}