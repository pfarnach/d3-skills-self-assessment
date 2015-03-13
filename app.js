var time_select = document.getElementById('time'),
	time = "today",
	height = 200,
	width = 300,
	padding = 50;

var skillz = d3.select('#skillz')
				.append('svg')
				.attr('height', height + padding)
				.attr('width', width + padding * 3)
				.append('g')
				.attr('id', 'viz')
				.attr('transform', 'translate(' + padding * 2+ ',' + padding + ')');

d3.csv('data.csv', function(data) {

	console.log(data);

	// set scales
	var yScale = d3.scale.ordinal()
					.rangeRoundBands([0, 150])
					.domain(data.map(function(element) {
						return element.skill;
					}));

	var xScale = d3.scale.linear()
					.range([0, width])
					.domain([0, 5]);

	// set axes
	var xAxis = d3.svg.axis().scale(xScale)
								.orient('bottom')
								.ticks(5);

	var yAxis = d3.svg.axis().scale(yScale)
								.orient('left')
								.ticks(8);

	// bind data to rectangles
	var bars = skillz.selectAll('rect')
						.data(data)
						.enter()
						.append('rect');

	// call axes
	skillz.append('g')
			.attr('class', 'x axis')
			.attr("transform", "translate(0," + (height - 50) + ")")
			.call(xAxis);

	skillz.append('g')
			.attr('class', 'y axis')
			.call(yAxis);

	bars.attr('x', xScale(0))
			.attr('y', function(d, i){
				return yScale(d.skill);
			})
			.attr('height', yScale.rangeBand())
			.attr('width', function(d, i){
				return xScale(d[time]);
			})
			.style('stroke', 'rgba(0, 0, 0, 0.5)')
			.style('fill', function(d){
				if (d[time] === "1") {
					return "red";
				} else if (d[time] === "2") {
					return "orange";
				} else if (d[time] === "3") {
					return "yellow";
				} else if (d[time] === "4") {
					return "green";
				}
			});


	function draw() {
		bars.transition()
			.duration(600)
			.attr('x', xScale(0))
			.attr('y', function(d, i){
				return yScale(d.skill);
			})

			.attr('height', yScale.rangeBand())
			.attr('width', function(d, i){
				return xScale(d[time]);
			})
			.style('fill', function(d){
				if (d[time] === "1") {
					return "red";
				} else if (d[time] === "2") {
					return "orange";
				} else if (d[time] === "3") {
					return "yellow";
				} else if (d[time] === "4") {
					return "green";
				}
			});
	}

	time_select.addEventListener('change', function(data){
		time = time_select.options[time_select.selectedIndex].value;
		draw();
	});
	
});