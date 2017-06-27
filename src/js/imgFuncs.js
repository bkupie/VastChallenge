

var dateSelect; // keep track of what date the user selected

var system = new imgSystem();

var image = new Image;
// specify as anonymous to remove cross-origin error
image.crossOrigin = "";
image.src = "data/OG/image01.jpg"; // starting out picture
image.onload = loaded;

system.initialize("data/CSV/image09_2016_03_06.csv",canvas,'sic')

//get an image from the "Original" menu
function changeImageOriginal(d) {
   var pictureName = "data/OG/image";
   if(d< 10)
   pictureName+="0";

   pictureName = pictureName  + d + ".jpg";
   console.log(pictureName);
   image.src = pictureName;
   image.onload = newloaded;

}

// get image from the RGB menu
function changeImageRGB(d) {
   var pictureName = "data/RGB/";
   if(d< 10)
   pictureName+="0";
   pictureName = pictureName  + d + ".png";
   console.log(pictureName);
   image.src = pictureName;
   image.onload = newloaded;

}

function changeImageLake() {
   var pictureName = "data/BoonsongLake.jpg";
   console.log(pictureName);
   image.src = pictureName;
   image.onload = newloaded;

}


function loaded() {
  context.drawImage(this, 0, 0);

  svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [[307, 167], [611, 539]]);
}

function newloaded() {
  context.drawImage(this, 0, 0,651,651);
}

// testing
function myzoom() {
   context.scale(1.1,1.1);
  context.drawImage(this, 0, 0,651,651);
}
