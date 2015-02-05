var msg = require('../message');

module.exports = function(test, records) {

  test.testReadOffset0 = function(test) {
    var recs = records();
    
    test.expect(recs.length);
    recs.forEach(function(rec){
      var options = rec.options || {};
      options.offset = 0;
      var packet = msg.read(rec.buf, options);
      test.deepEqual(packet, rec.obj, 'decoding '+rec.name+' with offset');
    });
    test.done();
  };
  
  test.testSize = function(test) {
    var recs = records();
    test.expect(recs.length);
    recs.forEach(function(rec){
      var size = msg.size(rec.obj, rec.options);
      test.equal(size, rec.buf.length, 'size '+rec.name);
    });
    test.done();
  };
  
  /**
   * test fix with a already complete message
   */
  test.testFix = function(test) {
    var recs = records();
    test.expect(recs.length);
    recs.forEach(function(rec){
      var size = msg.size(rec.obj);
      var orig = JSON.parse(JSON.stringify(rec.obj));
      var fixed = JSON.parse(JSON.stringify(msg.fix(rec.obj, rec.options)));
      test.deepEqual(fixed, orig, 'fix '+rec.name);
    });
    test.done();
  };
  
  /**
   * test if the fix calculates a lengths and adds the defauls
   */
  test.testFixMissing = function(test) {
    var recs = records();
    test.expect(recs.length);
    recs.forEach(function(rec){
      var fixed = msg.fix(rec.fix, rec.options);
      test.deepEqual(fixed, rec.obj, 'fix '+rec.name);
    });
    test.done();
  };
  
  test.testWrite = function(test) {
    var recs = records();
    test.expect(recs.length);
    recs.forEach(function(rec){
      var options = rec.options || {};
      options.doFix = false;
      var size = msg.size(rec.obj);
      var target = new Buffer(size);
      target.cursor = 0;
      msg.write(target, rec.obj, options);
      test.equal(target.toString('hex'), rec.buf.toString('hex'), 'write '+rec.name);
    });
    test.done();
  };
}