var dino_data
var dino_data_type = new Set();
var dino_data_period = new Set();
var dino_data_diet = new Set();
var dino_data_lived_in = new Set();
var dino_data_length = new Set();
var svg, map, margin;
var mouseleave, mousemove, mouseover, mouseout;
var projection, tooltip;
let map_data, world_data;
var width, height;

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('data/dino.csv'), d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.json("data_wrangling/world.json")])
        .then(function (values) {
            dino_data = values[0];
            map_data = values[1];
            world_data = values[2];


            // for (let i = 0; i < dino_data.length; i++) {
            //     dino_data_type.add(dino_data[i].type)
            //     dino_data_diet.add(dino_data[i].diet)
            //     dino_data_lived_in.add(dino_data[i].lived_in)
            //     dino_data_length.add(+dino_data[i].length)
            //     dino_data_period.add(dino_data[i].period.split(' ').slice(0, 2).join(' '));

            // }

            dino_pic = { "sauropod": "sauropod", "large theropod": "theropod", "ceratopsian": "ceratopsian", "euornithopod": "euornithopod", "small theropod": "theropod", "armoured dinosaur": "armoured" }

            margin = { top: 100, right: 250, bottom: 100, left: 100 },
                width = 1300 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;

            svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            tooltip = d3.select("#my_dataviz")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "10px")
                .style("width", "fit-content")
                .style("position", "absolute")

            createMap()
            drawDino("Early Jurassic")


        });
});


function keepActive(id) {
    var collection = document.getElementsByClassName("period");
    for (let i = 0; i < collection.length; i++) {
        collection[i].classList.remove("active")
    }
    document.getElementById(id).classList.add("active")
    let e = document.querySelector("#my_dataviz > svg")
    while (e.lastElementChild) {
        e.removeChild(e.lastElementChild);
    }
    svg = d3.select("#my_dataviz > svg")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;
    createMap()
    drawDino(id)


}
function createMap() {

    projection = d3.geoNaturalEarth1()
        .scale(width / 4)
        .translate([width / 2, height / 2])

    map = svg
        .selectAll("path")
        .data(map_data.features)
        .join("path")
        .attr("fill", "#62ff66")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "black")
        .style("stroke-width", "0.5px");

}
function getDinoData(period = "Early Jurassic") {
    let dindata = []
    dino_data.filter(function (d) {
        if (d['period'] == period) {
            dindata.push(d)
        }
    })
    return dindata;
}
function drawDino(period = "Early Jurassic") {
    // console.log(dino_data)
    const size = d3.scaleLinear()
        .domain([0, 40])
        .range([20, 80])

    mouseover = function (event, d) {
        tooltip
            .html("Name: " + d.name + "<br>" + "Lived In: " + d.lived_in + "<br>" + "Length: " + d.length + "<br>" + "Diet: " + d.diet + "<br>" + "Type: " + d.type)
            .style("opacity", 1)
        d3.select(this).transition()
        .duration(500)
        .attr("height", function(d) { return size(parseFloat(d.length.slice(0, (d.length).length - 1 ))) * 2;})

    }
    mousemove = function (event, d) {
        tooltip
            .style("opacity", 1)
            .style("left", (event.pageX) + 30 + "px")
            .style("top", (event.pageY) - 150 + "px")
    }

    mouseleave = function (event, d) {
        tooltip
            .style("opacity", 0)
        d3.select(this).transition()
        .duration(500)
        .attr("height", function(d) { return size(parseFloat(d.length.slice(0, (d.length).length - 1 )));})
    }
    let dindata = getDinoData(period)
    svg.selectAll(".mark")
        .data(dindata)
        .join("image")
        .attr('class', 'mark')
        // .attr("height", d => size(d.length))
        .attr("height", function(d) { return size(parseFloat(d.length.slice(0, (d.length).length - 1 )));})
        .attr("xlink:href", d => "data/" + dino_pic[d.type] + ".png")
        .attr("transform", function (d) {
            let x = projection([d.long, d.lat])[0];
            let y = projection([d.long, d.lat])[1];
            return "translate(" + x + "," + y + ")";
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .transition()
        .duration(800)
        .attr("height", function(d) { return size(parseFloat(d.length.slice(0, (d.length).length - 1 ))) * 2;})
        .transition()
        .duration(800)
        .attr("height", function(d) { return size(parseFloat(d.length.slice(0, (d.length).length - 1 )));})
        .style("opacity", 1)


    const s = 20;
    const allgroups = Object.values(dino_pic)
    const dinotypes = Object.keys(dino_pic)

    // console.log(allgroups)

    svg.append("rect")
        .attr("x", -75)
        .attr("y", 280)
        .attr("width", "190")
        .attr("height", "250")
        .style("fill", "white")
        .style("stroke-width", "1px")
        .style("stroke", "black")
    
    svg.selectAll("my_rect")
        .data(allgroups)
        .join("image")
        .attr("xlink:href", function (d) {
            return "data/" + d + ".png";
        })
        .attr("x", -60)
        .attr("y", (d, i) => 300 + i * (s + 15))
        .attr("width", 25)
        .attr("height", 25)

    svg.selectAll("my_labels")
        .data(dinotypes)
        .enter()
        .append("text")
        .attr("x", -80 + s * 2.5)
        .attr("y", (d, i) => 305 + i * (s + 15) + (s / 2))
        .text(d => d.toUpperCase())
        .attr("text-anchor", "left")
        .style("fill", "black")
        .style("alignment-baseline", "middle")
        .style("font-size", "12px")
        .style("font-weight", "400");


}