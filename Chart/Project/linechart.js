// set the dimensions and margins of the graph
var margin = {top: 100, right: 20, bottom: 30, left: 55},
    width = 1000 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#linechart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
   .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


function line(){
		svg.selectAll("*").remove();


// Parse the Data
	
	
	

	d3.csv("https://raw.githubusercontent.com/weeblord2030/DSDV-PJ/master/Data/Data3%2C4%2C5.csv", function(data)  {
		return{
		
	region:  data["WHO_region"],
	
	date :new Date(data["Date_reported"]),
	cases : parseFloat(data["New_cases"])
	};
	})
	.then(function(data) {
	console.log(data);
	
	


	var datanest = d3.nest()
					.key( function (d){return d.region})
					.key( function (d){return d.date})
					 .rollup(function(v) { return {
					cases: d3.sum(v, function(d) { return d.cases; })
					}})
					.entries(data);
		
		
		console.log(datanest)
		for (i = 0 ; i < 6 ; i ++){
		console.log(datanest[i].values.length)
			for (j = 0 ; j < datanest[i].values.length ; j ++){
			var cases = datanest[i].values[j].value.cases;
			
		
			datanest[i].values[j].date = new Date(datanest[i].values[j].key);
			datanest[i].values[j].cases = cases;
			
			
		}
		}
	console.log(datanest)


	var x = d3.scaleTime()
			 .domain(d3.extent(data, function(d) { return d.date; }))
	.range([0, width-250])
	svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).scale(x));
	
	 
	svg.append("text") // Add tittle
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + 300)
        .attr("y", -50)
        .attr("transform", "rotate(360)")
        .attr("font-size", 20)
        .attr("font-family", "sans-serif")
        .text(
            "Line chart of new cases everyday follow by WHO region "
        )
        .attr("font-weight", "bold");
	
	
	
	var y = d3.scaleLinear()
			.domain([0, d3.max(data,function(d) {return +d.cases*1.75; })])
			.range([height,0])
		svg.append("g")
			.call(d3.axisLeft(y));
	
	
	var line = d3.line()
		.x(function (d) {return x(d.date);})
		.y(function (d) {return y(d.cases);})
		 .curve(d3.curveBasis);
		
		
	var res = datanest.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#00FF80','#000099','purple','#FF007F','orange', 'green',])
	
	var bisect = d3.bisector(function(d) { return d.date; }).left;
		
	var focus = svg
		.append('g')
		.append('circle')
		.style("opacity", 0)
		.attr("text-anchor", "left")
		.attr("alignment-baseline", "middle")
		
	var focusText = svg
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")
	
	 svg.append('rect')
		.style("fill", "none")
		.style("pointer-events", "all")
		.attr('width', width)
		.attr('height', height)
		


	 
	 var size = 20
    var allgroups = ["Eastern Mediterranean Region",
					"European Region",
					"African Region",
					"American Region",
					"Western Pacific Region",
					"South East Asian Region"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 700)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) 
        .attr("r", 7)
        .style("fill", function(d){ return color (d)})
       
	
	 svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 700 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
       
		
		
		
		svg.selectAll(".line")
		.data(datanest)
		.enter()
		.append("path")
			.transition()
			.duration(1000)
			.attr("class","line")
			.attr("fill", "none")
			.attr("stroke", function(d){ return color(d.key) })
			.attr("stroke-width", 2)
			.attr("d", function(d){
			return line(d.values)
			})
			
		var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(datanest)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 5)
      .style("stroke", function(d) {
        return color(d.key);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(0))
			   .style("stroke", function(d) {
			   return color(d.key)});
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
    
      

			
	
	});

		
      

			
	
	});
}


function line1(){
	svg.selectAll("*").remove();


// Parse the Data
	
	
	

	d3.csv("https://raw.githubusercontent.com/weeblord2030/DSDV-PJ/master/Data/Data3%2C4%2C5.csv", function(data)  {
		return{
		
	region:  data["WHO_region"],
	
	date :new Date(data["Date_reported"]),
	cases : parseFloat(data["Cumulative_cases"])
	};
	})
	.then(function(data) {
	console.log(data);
	
	


	var datanest = d3.nest()
					.key( function (d){return d.region})
					.key( function (d){return d.date})
					 .rollup(function(v) { return {
					cases: d3.sum(v, function(d) { return d.cases; })
					}})
					.entries(data);
		
		
		console.log(datanest)
		for (i = 0 ; i < 6 ; i ++){
		console.log(datanest[i].values.length)
			for (j = 0 ; j < datanest[i].values.length ; j ++){
			var cases = datanest[i].values[j].value.cases;
			
		
			datanest[i].values[j].date = new Date(datanest[i].values[j].key);
			datanest[i].values[j].cases = cases;
			
			
		}
		}
	console.log(datanest)


	var x = d3.scaleTime()
			 .domain(d3.extent(data, function(d) { return d.date; }))
	.range([0, width-250])
	svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).scale(x));
	
	
	svg.append("text") // Add tittle
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + 300)
        .attr("y", -50)
        .attr("transform", "rotate(360)")
        .attr("font-size", 20)
        .attr("font-family", "sans-serif")
        .text(
            "Line chart of Total cases everyday follow by WHO region "
        )
        .attr("font-weight", "bold");
	
	
	var y = d3.scaleLinear()
			.domain([0, d3.max(data,function(d) {return +d.cases*1.75; })])
			.range([height,0])
		svg.append("g")
			.call(d3.axisLeft(y));
	
	
	var line = d3.line()
		.x(function (d) {return x(d.date);})
		.y(function (d) {return y(d.cases);})
		 .curve(d3.curveBasis);
		
		
	var res = datanest.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#00FF80','#000099','purple','#FF007F','orange', 'green',])
	
	var bisect = d3.bisector(function(d) { return d.date; }).left;
		
	var focus = svg
		.append('g')
		.append('circle')
		.style("opacity", 0)
		.attr("text-anchor", "left")
		.attr("alignment-baseline", "middle")
		
	var focusText = svg
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")
	
	 svg.append('rect')
		.style("fill", "none")
		.style("pointer-events", "all")
		.attr('width', width)
		.attr('height', height)
		


	 
	 var size = 20
    var allgroups = ["Eastern Mediterranean Region",
					"European Region",
					"African Region",
					"American Region",
					"Western Pacific Region",
					"South East Asian Region"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 700)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) 
        .attr("r", 7)
        .style("fill", function(d){ return color (d)})
       
	
	 svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 700 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
       
		
		
		
		svg.selectAll(".line")
		.data(datanest)
		.enter()
		.append("path")
		.transition()
		.duration(1000)
			.attr("class","line")
			.attr("fill", "none")
			.attr("stroke", function(d){ return color(d.key) })
			.attr("stroke-width", 2)
			.attr("d", function(d){
			return line(d.values)
			})
			
		var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(datanest)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 5)
      .style("stroke", function(d) {
        return color();
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(0))
              .style("stroke", function(d) {
			   return color(d.key)});
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
    
      

			
	
	});

		
      

			
	
	});
}