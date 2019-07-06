
// Define SVG area dimensions
var svgWidth = 1400;
var svgHeight = 400;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions

//var svg = d3.select("body")
var svg = d3.select(".chart")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from Nuggets_schedule_results.csv
d3.csv("Nuggets_schedule_results.csv", function (error, NuggetsData) {
  if (error) throw error;

  //   console.log(NuggetsData);

  // Cast the margin value to a number for each game played
  NuggetsData.forEach(function (d) {
    d.Margin = +d.Margin;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(NuggetsData.map(d => d.G))
    .range([0, chartWidth])
    .padding(0.25);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(NuggetsData, d => d.Margin), d3.max(NuggetsData, d => d.Margin)])
    .range([chartHeight, 0]);

  var leftAxis = d3.axisLeft(yLinearScale)
    .ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  var barsGroup = chartGroup.selectAll(".bar")
    .data(NuggetsData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.G))
    .attr("width", xBandScale.bandwidth())
    .attr("y", d => { return yLinearScale(Math.max(0, d.Margin)) })
    .attr("height", d => { return Math.abs(yLinearScale(d.Margin) - yLinearScale(0)) })

    // .attr("fill", "navy")
    .style('fill', function (d) {
      if (d.Margin > 0) {
        return "royalblue";
      } else {
        return "gold";
      }
    })
    .attr("opacity", "1")


  var htmlTooltip = d3.select("body")
    .append("div")
    .classed("toolTip", true)


  barsGroup.on("mouseover", function (d) {
    var xPos = +d3.select(this).attr("x")
    var wid = +d3.select(this).attr("width");
    d3.select(this).attr("x", xPos - 2).attr("width", wid + 4);

    htmlTooltip
      .style("display", "block")
      .style('position', 'fixed')
      .style('left', (d3.event.clientX + 20) + 'px')
      .style('top', (d3.event.clientY - 50) + 'px')
      .html(
        `<strong>${[d.Date]}<hr><strong> 
            Denver Nuggets ${d.DenverNuggets}<strong><hr>
            ${d.Opponent} ${d.Opp}
        `)


  })
    .on("mouseout", function () {
      htmlTooltip.style("display", "none")
      d3.select(this).attr("x", function (d) {
        return (xBandScale(d.G))
      })
        .attr("width", xBandScale.bandwidth());
    });
})

// var svgTooltip = svg.append("g")
//   .attr("class", 'svg-tooltip')
//   .style("display", "none");

// svgTooltip.append("text")
//   .attr("x", "90")
//   .attr("y", "3.8em")
//   .style("font-size", "1.25em")
//   .attr("font-weight", "bold");


svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", 10)
  .attr("x", -115)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Margin of Victory/Loss")
  .style("font-size", "20px")
  .attr("font-family", "sanscreek")

  ;
