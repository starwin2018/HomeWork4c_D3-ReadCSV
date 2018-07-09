function barchart() {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.5);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data from csv
    d3.csv("test.csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d.value = +d.value;
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function (d) { return d.no; }));
        y.domain([0, d3.max(data, function (d) { return d.value; })]);

        //Toggle color on every click
        var toggleColor = (function () {
            var currentColor = "blue";

            return function () {
                currentColor = currentColor == "blue" ? "orange" : "blue";
                d3.selectAll("rect").style("fill", currentColor);
            }
        })();

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.no); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); })

            //mouse over color change
            .on('mouseover', function (d) {
                d3.select(this).style('fill', 'green');
                console.log('over');
            })

            //mouseout color change
            .on('mouseout', function (d) {
                d3.select(this).style('fill', 'orange');
                console.log('out');
            });

        //toggle color change
        //.on('click', toggleColor);



        // append the rectangles for the bar chart text
        svg.selectAll("text")
            .data(data)
            .enter().append("text")
            .attr("class", "bar")
            .text(function (d) { return d.value; })
            .attr("x", function (d) { return x(d.no); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    });
}

//Change color on click change color button
function changeColor() {
    d3.select('button#color').on('click', function () {
        d3.selectAll("rect").style('fill', 'green');
    });

}

