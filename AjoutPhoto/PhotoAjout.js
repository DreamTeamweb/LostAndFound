'use strict';
let fs = require('fs');
let Gridfs = require('gridfs-stream');
let multiparty = require('multiparty');
let mongoose = require('mongoose');
var im = require('imagemagick');
let mime = require('mime-types');

exports.uploadImage = function(req, res)
{
  let gfs = new Gridfs(mongoose.connection.db, mongoose.mongo); // on instancie l'objet GridFS
  let form = new multiparty.Form({maxFilesSize: 1024 * 1024 * 2});

  form.parse(req, function (err, fields, files) { //On parse les informations du formulaire

    if( mime.lookup(files.file[0].path) === 'image/png' ||
      mime.lookup(files.file[0].path) === 'image/jpeg' ||
      mime.lookup(files.file[0].path) === 'image/gif' ||
      mime.lookup(files.file[0].path) === 'image/pjpeg' ||
      mime.lookup(files.file[0].path) ==='image/x-png')
    {
      im.identify(files.file[0].path, function(err, features){

          if(err) console.log(err);

          if (!err) {

            let writestream = gfs.createWriteStream({
              filename: files.file[0].originalFilename,
              mode: 'w',
              content_type: mime.lookup(files.file[0].path),
               metadata: {
                 width : features.width,
                 height: features.height,
                 extension: files.file[0].originalFilename.split('.').pop()
              }
            });

            fs.createReadStream(files.file[0].path).pipe(writestream);

            writestream.on('close', function (file) {

              fs.unlink(files.file[0].path, function (err) {
                if (err) console.log(err);
                // handle error
                //console.log('success!');

                return res.send(file);
              });

            });
          }
        });

    }
    else {
      return res.status(400).send({err : 'err type file, only png, gif or jpeg, type : '
      + mime.lookup(files.file[0].path)});
    }

  });
};
