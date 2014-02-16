var fs = require("fs");
var map = {0: "A",1:"B",2:"8",3:"9",4:"E",5:"F",6:"C",7:"D",8:"2",9:"3",A:"0",B:"1",C:"6",D:"7",E:"4",F:"5"};

process.argv.forEach(function (val, index, array) {
  if(index>1){
    fs.readFile(val, function (err, buf) {
      if (err) throw err;
      var d = +new Date();
      var len = buf.length;
      var nData = new Buffer(len);
      var o, n;
      for (ii = 0; ii < len; ii++) {
        o = buf[ii].toString(16);
        if(o.length==1)o = "0"+o;
        n = map[o.charAt(0).toUpperCase()]+map[o.charAt(1).toUpperCase()];
        nData.writeUInt8(parseInt(n, 16), ii);
      }
      var s = ((+new Date()-d)/1000);
      var k = (len/1024)/s;
      console.log("Decoded "+Math.floor(len/1024)+"KB in "+s+"s ( "+Math.floor(k)+" KB/s )");
      var nName = val.indexOf("pno")?(val.slice(0, -3)+"png"):(val+".png");
      fs.writeFile(nName, nData);
    });
  }
});
