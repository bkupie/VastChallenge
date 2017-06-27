// set up the histogram and its area

    // store the three RGB values that come from using the brushing
    var r = new Array(257),
        g = new Array(257),
        b = new Array(257);

    // specify the area of the graph
    var area = d3.area()
        .curve(d3.curveStepAfter)
        .x(function(d, i) { return x(i); })
        .y0(y(0))
        .y1(y);

    //sepcify the line of the graph
    var line = d3.line()
        .curve(curveStepBelow)
        .x(function(d, i) { return x(i); })
        .y(y);

        //set up the brushing feature ( i.e. the movable box)
        var brush = d3.brush()
            .on("start brush", brushed)
            .on("end", brushended);

    var histoarea = histogram.selectAll(".histogram-area")
    .data([r, g, b])
    .enter().append("path")
    .attr("class", function(d, i) { return "histogram-area histogram-" + "rgb"[i]; });

    var histoline = histogram.selectAll(".histogram-line")
    .data([r, g, b])
    .enter().append("path")
    .attr("class", function(d, i) { return "histogram-line histogram-" + "rgb"[i]; });

// gridlines in x axis function
function make_x_gridlines() {
    return d3.axisBottom(x)
        .tickArguments([20, "s"]);
}
// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(y)
        .tickSize(widthgraph)
        .tickArguments([20, "s"]);
}

// add the X gridlines
  svg2.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + heightgraph + ")")
      .call(make_x_gridlines()
          .tickSize(-500)
          .tickFormat(""))

  // add the Y gridlines
    svg2.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-500)
            .tickFormat("")) // make sure it doesn't print the labels again

// brushing functions


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
