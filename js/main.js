define(['js/thirdparty/d3.v3', 'js/thirdparty/elasticsearch'], function(d3, elasticsearch) {
    "use strict";
    var client = new elasticsearch.Client({
        host: '10.66.123.135:46700'
    });


    //Search for workorders status ----------------------------------------------------------------------------------------
    client.search({
      index: 'workorders',
      size: 5,
      body: {
          //Begin query
          query: {
              bool: {
                  //Boolean query for matching and excluding items
                  must: {
                      match: {
                          "requester.display_name": "CP - TORINO"
                      }
                  }
              }
          },
          //Aggregate on the results
          aggs: {
              wostatus: {
                  terms: {
                      field: "status"
                  }
              }
          }
          //End query
      }
    }).then(function(resp) {

        var wostatus = resp.aggregations.wostatus.buckets;

        var w = 300,
            h = 300,
            r = 140,
            inner = 50,
            color = d3.scale.category20c();

        var total = d3.sum(wostatus, function(d) {
            return d3.sum(d3.values(d));
        });

        var vis = d3.select("#donut-chart-1")
            .append("svg:svg")
            .data([wostatus])
            .attr("width", w)
            .attr("height", h)
            .attr("style", "display:block; margin-left:auto; margin-right:auto;")
            .append("svg:g")
            .attr("transform", "translate(" + r * 1.1 + "," + r * 1.1 + ")")

        var textTop = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textTop")
            .text( "TOTAL" )
            .attr("y", -10);
        var textBottom = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textBottom")
            .text(total)
            .attr("y", 10);

        var arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(r);

        var arcOver = d3.svg.arc()
            .innerRadius(inner + 5)
            .outerRadius(r + 5);
         
        var pie = d3.layout.pie()
            .value(function(d) { return d.doc_count; });
 
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition()
                        .duration(200)
                        .attr("d", arcOver)
                    
                    textTop.text(d3.select(this).datum().data.key)
                        .attr("y", -10);
                    textBottom.text(d3.select(this).datum().data.doc_count)
                        .attr("y", 10);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition()
                        .duration(100)
                        .attr("d", arc);
                    
                    textTop.text( "TOTAL" )
                        .attr("y", -10);
                    textBottom.text(total);
                });

        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc);

        var legend = d3.select("#donut-chart-1").append("svg")
            .attr("class", "legend")
            .attr("width", w)
            .attr("height", r)
            .attr("style", "display:block; margin-left:auto; margin-right:auto;")
            .selectAll("g")
            .data(wostatus)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d.key; });
    });

    //Search for workorders type ------------------------------------------------------------------------------------------
    client.search({
      index: 'workorders',
      size: 5,
      body: {
          //Begin query
          query: {
              bool: {
                  //Boolean query for matching and excluding items
                  must: {
                      match: {
                          "requester.display_name": "CP - TORINO"
                      }
                  }
              }
          },
          //Aggregate on the results
          aggs: {
              wotype: {
                  terms: {
                      field: "type"
                  }
              }
          }
          //End query
      }
    }).then(function(resp) {

        var wotype = resp.aggregations.wotype.buckets;

        var w = 300,
            h = 300,
            r = 140,
            inner = 50,
            color = d3.scale.category20c();

        var total = d3.sum(wotype, function(d) {
            return d3.sum(d3.values(d));
        });

        var vis = d3.select("#donut-chart-2")
            .append("svg:svg")
            .data([wotype])
            .attr("width", w)
            .attr("height", h)
            .attr("style", "display:block; margin-left:auto; margin-right:auto;")
            .append("svg:g")
            .attr("transform", "translate(" + r * 1.1 + "," + r * 1.1 + ")")

        var textTop = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textTop")
            .text( "TOTAL" )
            .attr("y", -10);
        var textBottom = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textBottom")
            .text(total)
            .attr("y", 10);

        var arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(r);

        var arcOver = d3.svg.arc()
            .innerRadius(inner + 5)
            .outerRadius(r + 5);
         
        var pie = d3.layout.pie()
            .value(function(d) { return d.doc_count; });
 
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition()
                        .duration(200)
                        .attr("d", arcOver)
                    
                    textTop.text(d3.select(this).datum().data.key)
                        .attr("y", -10);
                    textBottom.text(d3.select(this).datum().data.doc_count)
                        .attr("y", 10);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition()
                        .duration(100)
                        .attr("d", arc);
                    
                    textTop.text( "TOTAL" )
                        .attr("y", -10);
                    textBottom.text(total);
                });

        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc);

        var legend = d3.select("#donut-chart-2").append("svg")
            .attr("class", "legend")
            .attr("width", w)
            .attr("height", r)
            .attr("style", "display:block; margin-left:auto; margin-right:auto;")
            .selectAll("g")
            .data(wotype)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d.key; });
    });

    //Search for workorders type -------------------------------------------------------------------------------------------------
    client.search({
      index: 'workorders',
      size: 5,
      body: {
          //Begin query
          query: {
              bool: {
                  //Boolean query for matching and excluding items
                  must: {
                      match: {
                          "requester.display_name": "CP - TORINO"
                      }
                  }
              }
          },
          //Aggregate on the results
          aggs: {
              wofromsystemtype: {
                  terms: {
                      field: "from_resource.system_type"
                  }
              }
          }
          //End query
      }
    }).then(function(resp) {

        var wofromsystemtype = resp.aggregations.wofromsystemtype.buckets;

        var w = 300,
            h = 300,
            r = 140,
            inner = 50,
            color = d3.scale.category20c();

        var total = d3.sum(wofromsystemtype, function(d) {
            return d3.sum(d3.values(d));
        });

        var vis = d3.select("#donut-chart-3")
            .append("svg:svg")
            .data([wofromsystemtype])
            .attr("width", w)
            .attr("height", h)
            .attr("style", "display:block; margin-left:auto; margin-right:auto;")
            .append("svg:g")
            .attr("transform", "translate(" + r * 1.1 + "," + r * 1.1 + ")")

        var textTop = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textTop")
            .text( "TOTAL" )
            .attr("y", -10);
        var textBottom = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textBottom")
            .text(total)
            .attr("y", 10);

        var arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(r);

        var arcOver = d3.svg.arc()
            .innerRadius(inner + 5)
            .outerRadius(r + 5);
         
        var pie = d3.layout.pie()
            .value(function(d) { return d.doc_count; });
 
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition()
                        .duration(200)
                        .attr("d", arcOver)
                    
                    textTop.text(d3.select(this).datum().data.key)
                        .attr("y", -10);
                    textBottom.text(d3.select(this).datum().data.doc_count)
                        .attr("y", 10);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition()
                        .duration(100)
                        .attr("d", arc);
                    
                    textTop.text( "TOTAL" )
                        .attr("y", -10);
                    textBottom.text(total);
                });

        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc);

        var legend = d3.select("#donut-chart-3").append("svg")
            .attr("class", "legend")
            .attr("width", w)
            .attr("height", r)
            .attr("style", "display:block; margin-left:auto; margin-right:auto;")
            .selectAll("g")
            .data(wofromsystemtype)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d.key; });
    });
    
    //Search for workorders per day ---------------------------------------------------------------------------------------------------
    client.search({
      index: 'workorders',
      size: 5,
      body: {
          //Begin query
          query: {
              bool: {
                  //Boolean query for matching and excluding items
                  must: {
                      match: {
                          "requester.display_name": "CP - TORINO"
                      }
                  }
              }
          },
          //Aggregate on the results
          aggs: {
              woperday: {
                  date_histogram: {
                      field: "creation_date",
                      interval: "day",
                      format: "yyyy-MM-dd"
                  }
              }
          }
          //End query
      }
    }).then(function(resp) {
      console.log(resp);
      // #woperday-histogram
      var woperday = resp.aggregations.woperday.buckets;

      var data = new Array();
      for (var i = 0; i < woperday.length; i++) {
        data[i] = new Array();
        data[i]["x"] = woperday[i].key_as_string;
        data[i]["y"] = woperday[i].doc_count;
      };

      var values = new Array();
      for (var i = 0; i < woperday.length; i++) {
        values[i] = woperday[i].doc_count;
      };

      var labels = new Array();
      for (var i = 0; i < woperday.length; i++) {
        labels[i] = woperday[i].key_as_string;
      };

      //-------------

      var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var svg = d3.select("#woperday-histogram").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(labels);
      y.domain([0, d3.max(values)]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { 

              console.log("Height: " + height);
              console.log("y(d.y): " + y(d.y));
              return height - y(d.y); });

    });


});