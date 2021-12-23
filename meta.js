var ExifImage = require('exif').ExifImage;
var fs = require('fs')
try {
    new ExifImage({ image : 'tree.jpg' }, function (error, exifData) {
        if (error)
             console.log("error" + error.message)
        else
           var exif = exifData.gps
           
           console.log(exif)
           //console.log(exif)
           fs.writeFile('exif.json', exif, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
         }) // Do something with your data!
    });
} catch (error) {
    console.log("error" + error.message)
}

module.exports = {exif}
