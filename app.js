var time_select = document.getElementById('time'),
	time = "today",
	height = 200,
	width = 300,
	padding = 50;
	width_fraction = width / 4

var skillz = d3.select('#skillz')
				.append('svg')
				.attr('height', height + padding)
				.attr('width', width + padding * 3)
				.append('g')
				.attr('id', 'viz')
				.attr('transform', 'translate(' + padding * 2+ ',' + padding + ')');

d3.csv('data-qual.csv', function(data) {

	console.log(data);

	// set scales
	var yScale = d3.scale.ordinal()
					.rangeRoundBands([0, 150], .2)  // second parameter is for padding 
					.domain(data.map(function(element) {
						return element.skill;
					}));

	var xScale = d3.scale.ordinal()
					.range([0, width_fraction * 1, width_fraction * 2, width_fraction * 3, width_fraction * 4])
					.domain(["none", "newbie", "novice", "not bad", "good"]);

	// set axes
	var xAxis = d3.svg.axis().scale(xScale)
								.orient('bottom')
								.ticks(5);

	var yAxis = d3.svg.axis().scale(yScale)
								.orient('left')
								.ticks(7);

	// bind data to rectangles
	var bars = skillz.selectAll('rect')
						.data(data)
						.enter()
						.append('rect')
						.attr('margin', 20);

	// call axes
	skillz.append('g')
			.attr('class', 'x axis')
			.attr("transform", "translate(0," + (height - 50) + ")")
			.call(xAxis);

	skillz.append('g')
			.attr('class', 'y axis')
			.call(yAxis);

	draw();

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
			.style('stroke', 'none')
			.style('fill', function(d){
				if (d[time] === "none") {
					return "#D1FAFF";
				} else if (d[time] === "newbie") {
					return "#A8E0FF";
				} else if (d[time] === "novice") {
					return "#7CC6FE";
				} else if (d[time] === "not bad") {
					return "#0267C1";
				} else if (d[time] === "good") {
					return "#034078";
				}
			});
	}

	time_select.addEventListener('change', function(data){
		time = time_select.options[time_select.selectedIndex].value;
		draw();
	});
	
});