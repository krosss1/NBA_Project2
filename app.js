var margin = { top: 10, right: 30, bottom: 40, left: 160 },
  width = 600 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Parse the Data

d3.csv("per_game_stats.csv", function (error, data) {


  // sort data
  data.sort(function (b, a) {
    return a.Points - b.Points;
  });

  d3.select('#btn1').on('click', function () {
    d3.select('#my_dataviz').html("")
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var Tooltip = d3.select("#my_dataviz").append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "gold")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "3px")
      .style("padding", "3px")

    console.log('hello')
    // X-Axis
    var x = d3.scaleLinear()
      .domain([0, 22])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "15px");
    svg.append("text")
      .attr("class", "x label")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
      .attr("text-anchor", "middle")
      .text("Points Per Game");

    // Y axis
    var y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(function (d) { return d.Name; }))
      .padding(1);
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("font-size", "12px")


    // Lines
    svg.selectAll("myline")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", function (d) { return y(d.Name); })
      .attr("y2", function (d) { return y(d.Name); })
      .attr("stroke", "royalblue")
    // Three function that change the tooltip when user hover / move / leave a cell 
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
        .style("position", "fixed");

      d3.select(this)
        .style("stroke", 0)
        .transition()
        .duration(100)
        .attr('r', 12)
    }
    var mousemove = function (d) {
      Tooltip.html(d.Points + ' per Game')
        .style("top", (d3.event.clientY + 10) + "px")
        .style("left", (d3.event.clientX + 10) + "px");
    }
    var mouseleave = function (d) {
      Tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .transition()
        .duration(100)
        .attr('r', 7)
    }

    // Circles
    svg.selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", x(0))
      .attr("cy", function (d) { return y(d.Name); })
      .attr("r", "7")
      .style("fill", "gold")
      .attr("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    svg.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function (d) { return x(d.Points); })

    svg.selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function (d) { return x(d.Points); })


  })

  d3.select('#btn2').on('click', function () {
    d3.select('#my_dataviz').html("")
    d3.select('#my_dataviz').html("")
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "gold")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "3px")
      .style("padding", "3px")

    console.log('hello')

    //x axis
    var x = d3.scaleLinear()
      .domain([0, 12])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "15px");
    svg.append("text")
      .attr("class", "x label")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
      .attr("text-anchor", "middle")
      .text("Rebounds Per Game");

    // Y axis
    var y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(function (d) { return d.Name; }))
      .padding(1);
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("font-size", "12px")


    // Lines
    svg.selectAll("myline")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", function (d) { return y(d.Name); })
      .attr("y2", function (d) { return y(d.Name); })
      .attr("stroke", "royalblue")
    // Three functions that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
        .style("position", "fixed");
      d3.select(this)
        .style("stroke", 0)
        .transition()
        .duration(100)
        .attr('r', 12)
    }
    var mousemove = function (d) {
      Tooltip
        .html(d.Rebounds + ' per Game')
        .style("top", (d3.event.clientY + 10) + "px")
        .style("left", (d3.event.clientX + 10) + "px")
    }
    var mouseleave = function (d) {
      Tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .transition()
        .duration(100)
        .attr('r', 7)
    }

    // Circles
    svg.selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", x(0))
      .attr("cy", function (d) { return y(d.Name); })
      .attr("r", "7")
      .style("fill", "gold")
      .attr("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)


    svg.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function (d) { return x(d.Rebounds); })

    svg.selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function (d) { return x(d.Rebounds); })

  })

  d3.select('#btn3').on('click', function () {
    d3.select('#my_dataviz').html("")
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "gold")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "3px")
      .style("padding", "3px")

    //X Axis
    var x = d3.scaleLinear()
      .domain([0, 8])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "15px");
    svg.append("text")
      .attr("class", "x label")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
      .attr("text-anchor", "middle")
      .text("Assists Per Game");

    // Y axis
    var y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(function (d) { return d.Name; }))
      .padding(1);
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("font-size", "12px")


    // Lines
    svg.selectAll("myline")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", function (d) { return y(d.Name); })
      .attr("y2", function (d) { return y(d.Name); })
      .attr("stroke", "royalblue")
    console.log('hello')
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
        .style("Position", "fixed");
      d3.select(this)
        .style("stroke", 0)
        .transition()
        .duration(100)
        .attr('r', 12)
    }
    var mousemove = function (d) {
      Tooltip
        .html(d.Assists + ' per Game')
        .style("top", (d3.event.clientY + 10) + "px")
        .style("left", (d3.event.clientX + 10) + "px")
    }
    var mouseleave = function (d) {
      Tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .transition()
        .duration(100)
        .attr('r', 7)
    }

    // Circles
    svg.selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", x(0))
      .attr("cy", function (d) { return y(d.Name); })
      .attr("r", "7")
      .style("fill", "gold")
      .attr("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    svg.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function (d) { return x(d.Assists); })

    svg.selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function (d) { return x(d.Assists); })

  })


  d3.select('#btn4').on('click', function () {
    d3.select('#my_dataviz').html("")
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "gold")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "3px")
      .style("padding", "3px")

    console.log('hello')

    // X Axis 
    var x = d3.scaleLinear()
      .domain([0, 2])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "15px");
    svg.append("text")
      .attr("class", "x label")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
      .attr("text-anchor", "middle")
      .text("Steals Per Game");

    // Y axis
    var y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(function (d) { return d.Name; }))
      .padding(1);
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("font-size", "12px")

    // Lines
    svg.selectAll("myline")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", function (d) { return y(d.Name); })
      .attr("y2", function (d) { return y(d.Name); })
      .attr("stroke", "royalblue")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
        .style("Position", "fixed");
      d3.select(this)
        .style("stroke", 0)
        .transition()
        .duration(100)
        .attr('r', 12)
    }
    var mousemove = function (d) {
      Tooltip
        .html(d.Steals + ' per Game')
        .style("top", (d3.event.clientY + 10) + "px")
        .style("left", (d3.event.clientX + 10) + "px")
    }
    var mouseleave = function (d) {
      Tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .transition()
        .duration(100)
        .attr('r', 7)
    }

    // Circles
    svg.selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", x(0))
      .attr("cy", function (d) { return y(d.Name); })
      .attr("r", "7")
      .style("fill", "gold")
      .attr("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)


    svg.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function (d) { return x(d.Steals); })

    svg.selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function (d) { return x(d.Steals); })

  })


  d3.select('#btn5').on('click', function () {
    d3.select('#my_dataviz').html("")
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "gold")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "3px")
      .style("padding", "3px")

    console.log('hello')

    // X Axis
    var x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "15px");
    svg.append("text")
      .attr("class", "x label")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
      .attr("text-anchor", "middle")
      .text("Blocks Per Game");

    // Y axis
    var y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(function (d) { return d.Name; }))
      .padding(1);
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("font-size", "12px")


    // Lines
    svg.selectAll("myline")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", function (d) { return y(d.Name); })
      .attr("y2", function (d) { return y(d.Name); })
      .attr("stroke", "royalblue")
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
        .style("Position", "fixed");
      d3.select(this)
        .style("stroke", 0)
        .transition()
        .duration(100)
        .attr('r', 12)
    }
    var mousemove = function (d) {
      Tooltip
        .html(d.Blocks + ' per Game')
        .style("top", (d3.event.clientY + 10) + "px")
        .style("left", (d3.event.clientX + 10) + "px");
    }
    var mouseleave = function (d) {
      Tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .transition()
        .duration(100)
        .attr('r', 7)
    }

    // Circles
    svg.selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", x(0))
      .attr("cy", function (d) { return y(d.Name); })
      .attr("r", "7")
      .style("fill", "gold")
      .attr("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
    svg.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function (d) { return x(d.Blocks); })

    svg.selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function (d) { return x(d.Blocks); })

  })

});

