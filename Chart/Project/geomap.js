
	var width  = 900;
	var height = 700;

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", 900)
    .attr("height", 700)
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
  
  d3.csv("https://raw.githubusercontent.com/weeblord2030/DS-DV-Project/master/world%20case%2031-05.csv")
.then(function(data1){
	d3.json("https://raw.githubusercontent.com/weeblord2030/DS-DV-Project/master/custom.geo%20(1).json")
	.then(function(data){
	console.log(data1);
	
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
	console.log(data);
	
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
	
	

	
	
		var color = d3.scaleLinear()
	.range(["#00FFFF","yellow"])
				.domain([
		d3.min(data1, function(d) { return d["Cumulative_cases"]; }),
		d3.max(data1, function(d) { return d["Cumulative_cases"]; })])
		
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
	console.log(data1);
	
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
	console.log(data);
	
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
	
	
	
	
	
	

	
	
	
		
		
		var color = d3.scaleLinear()
			.range(["yellow","red"])
			.domain([
			d3.min(data1, function(d) { return d["Cumulative_deaths"]; }),
			d3.max(data1, function(d) { return d["Cumulative_deaths"]; })])

	
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
		return "#FFA07A";}})
		
		
		
	
	 
			
})
})	
}