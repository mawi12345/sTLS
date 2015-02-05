# sTLS

TLS packet decoder / encoder. 

This module provides methods to decode TLS packets to javascript objects and
vice versa.

## Features

Supported packets:

 - client_hello
 - server_hello
 - client_key_exchange
 - server_key_exchange
 - certificate
 - server_hello_done

## API

```javascript

var stls = require('stls');

// client_hello
var buf = new Buffer('16030200310100002d030254cd22e09fe9c4556bb4a6246a8641ad23c8a4c69a7c41da9d78e462a2a352900000040033c01101000000', 'hex');
// set the start position by
buf.cursor = 0;
// or pass the {offset: 0} as option to the read method

var jsObject = stls.read(buf);

console.log(jsObject);

/*
{ ContentType: 'handshake',
  ProtocolVersion: '1.1',
  Length: 49,
  handshake: 
   { HandshakeType: 'client_hello',
     Length: 45,
     ProtocolVersion: '1.1',
     Time: 1422729952,
     Random: <Buffer 9f e9 c4 55 6b b4 a6 24 6a 86 41 ad 23 c8 a4 c6 9a 7c 41 da 9d 78 e4 62 a2 a3 52 90>,
     SessionIDLength: 0,
     CipherSuitesLength: 4,
     CipherSuites: 
      [ 'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
        'TLS_ECDHE_RSA_WITH_RC4_128_SHA' ],
     CompressionMethodsLength: 1,
     CompressionMethods: [ 'null' ],
     ExtensionsLength: 0,
     Extensions: [] } }
*/

var encodedSize = stls.size(jsObject);

var buf2 = new Buffer(encodedSize);

stls.write(buf2, jsObject, {offset: 0}); // or set buf2.cursor

// now buf2 === buf

```

See `example.js` and `test/` for further examples.

#### LICENSE

The MIT License (MIT)

Copyright (c) 2015 Martin Wind

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.