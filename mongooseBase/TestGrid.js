var mongoose = require('mongoose');
var Schema =mongoose.Schema;

mongoose.connect('mongodb://localhost/blog');
var conn = mongoose.connection;
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');
var videoPath = path.join(__dirname, './readFrom/surprise.png');

Grid.mongo = mongoose.mongo;

conn.once('open', function () {
  console.log('-Connection open-');
  var gfs = Grid(conn.db);
  var writestream = gfs.createWriteStream({
    filename: 'surprise.png'
  });
  fs.createReadStream(videoPath).pipe(writestream);
  writestream.on('close', function(file) {
    console.log(file.filename + ' has been written to DB');
  });
});
