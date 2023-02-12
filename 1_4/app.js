const sharp = require("sharp");
function convertImage(filePath){
sharp(filePath)
  .rotate()
  .resize(500, 500)
  .jpeg()
  .toFile("converted.jpeg")
  .then((data) => {
    console.log(`${filePath} Converted Successfully `);
  })
  .catch((err) => {
     console.log("Error description: ", err);
  });

}
 pointedImage="./apple.png";
 convertImage(pointedImage);