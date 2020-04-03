exports.getFile = function(req, res){
  'use strict';

  let gfs = new Gridfs(mongoose.connection.db, mongoose.mongo);

  _db.File.findOne({ _id: req.params['file_id'] }).exec( function(err, file) {
    if(err) console.log(err);
    if(file)
    {
      res.set('Content-Type', JSON.parse(JSON.stringify(file)).contentType);

      let readstream = gfs.createReadStream({
        _id: req.params['file_id']
      });

      //error handling, e.g. file does not exist
      readstream.on('error', function (err) {
        //console.log('An error occurred!', err);
        throw err;
      });

      readstream.pipe(res);
    }

  });
};
