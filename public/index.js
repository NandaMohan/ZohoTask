var ExifImage = require('exif').ExifImage;

try {
    new ExifImage({ image : 'tree.jpg' }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData.gps); // Do something with your data!
    });
} catch (error) {
    console.log('Error: ' + error.message);
}
