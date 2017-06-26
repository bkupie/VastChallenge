
// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 50, left: 50},
    widthgraph = 500;
    heightgraph = 500;


var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var x = d3.scaleLinear().domain([0, 256]).rangeRound([0, widthgraph]),
    y = d3.scaleLinear().rangeRound([heightgraph, 0]);

var r = new Array(257),
    g = new Array(257),
    b = new Array(257);

var area = d3.area()
    .curve(d3.curveStepAfter)
    .x(function(d, i) { return x(i); })
    .y0(y(0))
    .y1(y);

var line = d3.line()
    .curve(curveStepBelow)
    .x(function(d, i) { return x(i); })
    .y(y);

var brush = d3.brush()
    .on("start brush", brushed)
    .on("end", brushended);


var svgText= d3.select("body").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .attr("transform",
          "translate(0,651)")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg2 = d3.select("body").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .style("background","white")
    .style("border","2px solid green")
    .attr("transform",
          "translate(651,51)")
          .call(d3.zoom().on("zoom", function () {
    svg2.attr("transform", d3.event.transform)
 }))
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
          ;

    var svg = d3.select("svg");

    var histogram = svg2.append("g")
        .attr("class", "histogram")
        .attr("transform",
          "translate(0,0)");



  //add the x Axis
  svg2.append("g")
      .attr("transform",
          "translate(" + 0 + " ," + (heightgraph ) + ")")
      .call(d3.axisBottom(x));

// text label for the x axis
svg2.append("text")
  .attr("transform",
      "translate(" + (widthgraph/2) + " ," + (heightgraph + 30) + ")")
  .style("text-anchor", "middle")
  .text("RGB Value");


  // add the y Axis
  svg2.append("g")
      .call(d3.axisLeft(y));
  // text label for the y axis
  svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50 )
    .attr("x",-250 )
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Intensity");


    svgText.append("text")
      .attr("y",-10 )
      .attr("x",150 )
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "24px")
      .text("Original Boonsong Lake Picture ")
      .style('fill', d3.rgb(170, 247, 151))

var histoarea = histogram.selectAll(".histogram-area")
    .data([r, g, b])
  .enter().append("path")
    .attr("class", function(d, i) { return "histogram-area histogram-" + "rgb"[i]; });

var histoline = histogram.selectAll(".histogram-line")
    .data([r, g, b])
  .enter().append("path")
    .attr("class", function(d, i) { return "histogram-line histogram-" + "rgb"[i]; });

var image = new Image;
var image2 = new Image;
image2.src = "data/BoonsongLake.jpg";
image2.onload = loadedsecond;
image.src = "data/original/image01.jpg"; // starting out picture
image.onload = loaded;


function loadedsecond() {
  context.drawImage(this,20, 721);
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

function myzoom() {
   context.scale(1.1,1.1);
  context.drawImage(this, 0, 0,651,651);
}

function brushed() {
  var s = d3.event.selection,
      x0 = s[0][0],
      y0 = s[0][1],
      dx = s[1][0] - x0,
      dy = s[1][1] - y0,
      max = 0;

  for (var i = 0; i < 257; ++i) {
    r[i] = g[i] = b[i] = 0;
  }

  if (dx && dy) {
    var data = context.getImageData(x0, y0, dx, dy).data;
    for (var i = 0; i < dx; ++i) {
      for (var j = 0; j < dy; ++j) {
        var k = j * dx + i << 2;
        max = Math.max(max, ++r[data[k]], ++g[data[k + 1]], ++b[data[k + 2]]);
      }
    }
    y.domain([0, max]);
    histoarea.attr("d", area);
    histoline.attr("d", line);
  } else {
    histoarea.attr("d", null);
    histoline.attr("d", null);
  }
}

function brushended() {
  if (!d3.event.selection) {
    histoarea.attr("d", null);
    histoline.attr("d", null);
  }
}

function curveStepBelow(context) {
  var y0, i;
  return {
    lineStart: function() { y0 = NaN, i = 0; },
    lineEnd: function() {},
    point: function(x, y) {
      x -= y0 < y ? -0.5 : +0.5, y += 0.5;
      if (++i === 1) context.moveTo(x, y0 = y);
      else context.lineTo(x, y0), context.lineTo(x, y0 = y);
    }
  };
}

//get an image from the "Original" menu
function changeImageOriginal(d) {
   var pictureName = "data/original/image";
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

// gridlines in x axis function
function make_x_gridlines() {
    return d3.axisBottom(x)
        .tickArguments([20, "s"]);
}
// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(y)
        .tickArguments([20, "s"]);
}


// add the X gridlines
  svg2.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
          .tickSize(-1650)
          .tickFormat("")
      )

      // add the Y gridlines
        svg2.append("g")
            .attr("class", "grid")
            .call(make_y_gridlines()
                .tickSize(-500)
                .tickFormat("")
            )


// ------------------------------------------zooming ------------------------------------------
