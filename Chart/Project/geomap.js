
	var width  = 900;
	var height = 700;

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", 1200)
    .attr("height", 900)
	.attr("background-color","black");


	
function cases() {
	svg.selectAll("*").remove();

	
	svg.append("text") // Add tittle
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + 400)
        .attr("y", -50)
        .attr("transform", "rotate(360)")
        .attr("font-size", 20)
        .attr("font-family", "sans-serif")
        .text(
            "        Total case in the world at the end of May "
        )
        .attr("font-weight", "bold");
		
		
	 var allgroups = ["0-300",
					"301-3000",
					"3001-15000",
					"15001-100000",
					">100000"]
   
  
  d3.csv("https://raw.githubusercontent.com/weeblord2030/DS-DV-Project/master/world%20case%2031-05.csv")
.then(function(data1){
	d3.json("https://raw.githubusercontent.com/weeblord2030/DS-DV-Project/master/custom.geo%20(1).json")
	.then(function(data){
	
	
	for (var i = 0; i < data1.length; i ++){
	var dataMa = String(data1[i]["Country_code"]);
	var cases = parseFloat(data1[i]["Cumulative_cases"]);
	for (var j = 0; j < data.features.length; j++){
	var Ma = String(data.features[j].properties["iso_a2"]);
	if (Ma == dataMa){
	data.features[j].properties.case = cases;
		
	
	} 
	}
	}
	
	
	var center = d3.geoCentroid(data)
var scale = 120;
var offset = [width/2, height/2];
var projection = d3.geoMercator().scale(scale).center(center).translate(offset);

var path = d3.geoPath().projection(projection);


var bounds = path.bounds(data);
var hscale = scale*width / (bounds[1][0] - bounds[0][0]);
var vscale = scale*height / (bounds[1][1] - bounds[0][1]);

var scale   = (hscale < vscale) ? hscale : vscale;
var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
             height - (bounds[0][1] + bounds[1][1])/2];

      // new projection
	projection = d3.geoMercator().center(center)
        .scale(scale).translate(offset);
      path = path.projection(projection);
	   svg.append("rect").attr('width', width).attr('height', height)
        .style('stroke', 'black').style('fill', 'none');
	
	

	
		
		
		var arr = [];
		for (i = 0; i < 216; i++){
		arr.push(parseFloat(data1[i]["Cumulative_cases"]));	
		
		}
		arr.sort(function(a, b) {
				return a - b;
			});
		console.log(arr);
		
		
		
		 var color1 = d3.scaleOrdinal()
		.domain(allgroups)
		.range(["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"]);
		
		 svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("rect")
        .attr("x", 820)
        .attr("y", function(d,i){ return 10 + i*(10+5)}) 
        .attr("width", 10)
		.attr("height", 10)
        .style("fill", function(d){ return color1 (d)})
		
		
	 svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 830 + 10*.8)
        .attr("y", function(d,i){ return 17 + i*(10+5)})
        .style("fill", "black")
        .text(function(d){ return d})
        .attr("text-anchor", "left")
		.style("font-size",14)
        .style("alignment-baseline", "middle")
		
		 var color = d3.scaleQuantile()
		.domain(arr)
		.range(["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"]);
		
		
		
		 svg.selectAll("path").data(data.features).enter().append("path")
        .attr("d", path)
        .style("stroke-width", "0.3")
        .style("stroke", "black")
		.attr("fill", function(d) {
		var value = d.properties.case;	
		
			if (value) {
		//If value exists…
		return color(value);
		console.log(color(value));
			} else {
		//If value is undefined…
		return "white";}})
		
		

		
	
	 
			
})
})	




			
	  
} 
		
function death() {
		svg.selectAll("*").remove();
		
		
	var allgroups = ["<10",
					"10-20",
					"20-100",
					"100-1000",
					">1000"]
					
					
	svg.append("text") // Add tittle
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + 300)
        .attr("y", -50)
        .attr("transform", "rotate(360)")
        .attr("font-size", 20)
        .attr("font-family", "sans-serif")
        .text(
            "Total fatalities in the world at the end of May 2020 "
        )
        .attr("font-weight", "bold");

 d3.csv("https://raw.githubusercontent.com/weeblord2030/DS-DV-Project/master/world%20case%2031-05.csv")
.then(function(data1){
	d3.json("https://raw.githubusercontent.com/weeblord2030/DS-DV-Project/master/custom.geo%20(1).json")
	.then(function(data){
	
	
	for (var i = 0; i < data1.length; i ++){
	var dataMa = String(data1[i]["Country_code"]);
	var death = parseFloat(data1[i]["Cumulative_deaths"]);
	for (var j = 0; j < data.features.length; j++){
	var Ma = String(data.features[j].properties["iso_a2"]);
	if (Ma == dataMa){
	data.features[j].properties.death = death;
		
	
	} 
	}
	}
	console.log(data1);
	
	var center = d3.geoCentroid(data)
var scale = 120;
var offset = [width/2, height/2];
var projection = d3.geoMercator().scale(scale).center(center).translate(offset);

var path = d3.geoPath().projection(projection);


var bounds = path.bounds(data);
var hscale = scale*width / (bounds[1][0] - bounds[0][0]);
var vscale = scale*height / (bounds[1][1] - bounds[0][1]);

var scale   = (hscale < vscale) ? hscale : vscale;
var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
             height - (bounds[0][1] + bounds[1][1])/2];

      // new projection
	projection = d3.geoMercator().center(center)
        .scale(scale).translate(offset);
      path = path.projection(projection);
	   svg.append("rect").attr('width', width).attr('height', height)
        .style('stroke', 'black').style('fill', 'none');
	
	
	
		var arr = [];
		for (i = 0; i < 216; i++){
		arr.push(parseFloat(data1[i]["Cumulative_deaths"]));	
		
		}
		arr.sort(function(a, b) {
				return a - b;
			});
		console.log(arr);
	
	
	 var color1 = d3.scaleOrdinal()
		.domain(allgroups)
		.range(["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"])
		
		 svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("rect")
        .attr("x", 830)
        .attr("y", function(d,i){ return 10 + i*(10+5)}) 
        .attr("width", 10)
		.attr("height", 10)
        .style("fill", function(d){ return color1 (d)})
		
		
	 svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 840 + 10*.8)
        .attr("y", function(d,i){ return 17 + i*(10+5)})
        .style("fill", "black")
        .text(function(d){ return d})
        .attr("text-anchor", "left")
		.style("font-size",14)
        .style("alignment-baseline", "middle")
	
	

	
	
	
		
		
		var color = d3.scaleQuantile()
		.domain(arr)
		.range(["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"])

		
	
		 svg.selectAll("path").data(data.features).enter().append("path")
        .attr("d", path)
        .style("stroke-width", "0.3")
        .style("stroke", "black")
		.attr("fill", function(d) {
		var value = d.properties.death;	
		
			if (value) {
		//If value exists…
		return color(value);
		console.log(color(value));
			} else {
		//If value is undefined…
		return "#ffffb2";}})
		
		
		
	
	 
			
})
})	
}
