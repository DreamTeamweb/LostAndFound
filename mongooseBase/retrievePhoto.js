var mongoose = require('mongoose');
var Schema =mongoose.Schema;

mongoose.connect('mongodb://localhost/blog');
var conn = mongoose.connection;
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');

Grid.mongo = mongoose.mongo;

conn.once('open', function () {
  console.log('-Connection open-');
  var gfs = Grid(conn.db);
  var fs_write_stream = fs.createWriteStream(path.join(__dirname, './writeTo/surprise.png'));
  var readstream = gfs.createReadStream({
    filename: 'surprise.png'
  });
  readstream.pipe(fs_write_stream);
  fs_write_stream.on('close', function() {
    console.log(' File has been written fully');
  });
});
