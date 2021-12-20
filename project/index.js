const fs = require('fs');
const piexif = require('piexifjs');

// Handy utility functions
const getBase64DataFromJpegFile = filename => fs.readFileSync("./tree.jpg").toString('binary');
const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile("./tree.jpg"));

const pic1exif = getExifFromJpegFile("./images/palm tree 1.jpg");
console.log(pic1exif.GPS)

var ExifImage = require('exif').ExifImage;
var fs = require('fs')

try {
    new ExifImage({ image : fs.readFileSync('./npmapp/tree.jpg') }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData); // Do something with your data!
    });
} catch (error) {
    console.log('Error: ' + error.message);
}
