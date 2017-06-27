// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 50, left: 50},
    widthgraph = 500;
    heightgraph = 500;

// store our canvas information
var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

//set up scales for the graph to show RGB values
var x = d3.scaleLinear().domain([0, 260]).rangeRound([0, widthgraph]),
    y = d3.scaleLinear().rangeRound([heightgraph, 0]);

// select the SVG we created in HTML
var svg = d3.select("svg");

// append svg to store our text
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
          "translate(" + margin.left + "," + margin.top + ")");
// set up the histogram in the second svg view
  var histogram = svg2.append("g")
      .attr("class", "histogram")
      .attr("transform",
        "translate(0,0)");
// do nice formatting for the second svg
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
