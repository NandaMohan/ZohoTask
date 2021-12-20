const fs = require('fs');
const piexif = require('piexifjs');

// Handy utility functions
const getBase64DataFromJpegFile = filename => fs.readFileSync("./tree.jpg").toString('binary');
const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile("./tree.jpg"));

const pic1exif = getExifFromJpegFile("./images/palm tree 1.jpg");
console.log(pic1exif.GPS)