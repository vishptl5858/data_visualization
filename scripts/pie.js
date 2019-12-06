
var margin = {top: -20, right: 20, bottom: -200, left: 20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2;


var color = d3.scaleOrdinal()
    .range(["#8c8c8c","#FFE8E6", "#FF9288","#FFA199","#FE5A4C", "#FF3C2A","#F44200" ]);


var arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

// arc for the labels position
var labelArc = d3.arc() .outerRadius(radius - 40) .innerRadius(radius - 40);

// generate pie chart
var pie = d3.pie() .sort(null) .value(function(d) { return d.Area; });


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



// import data 
d3.csv("data/countries.csv", function(error, data) {
  if (error) throw error;
    
    // parse data
    data.forEach(function(d) {
        d.Area = +d.Area;
        d.Country = d.Country;
    })

  // "g element is a container used to group other SVG elements"
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  // append path 
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.Country); })
    // transition 
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenPie);
        
  // append text
  g.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(200)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.Country; });
    

    // "g element is a container used to group other SVG elements"
  var g2 = svg2.selectAll(".arc2")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc2");

   
        
   // append text
  g2.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".305em")
      .text(function(d) { return d.data.Country; });
    
});

// Helper function for animation of pie chart
function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

