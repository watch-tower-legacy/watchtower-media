var ticker = decodeURIComponent(window.location.href).match(/\w+\=(\w|\,)+/i)[0].split('=')[1]
var url = "http://127.0.0.1:8000/polls/securitysearch/?ids="+ticker.toUpperCase()
//fetch information from server
var obj

var seriesOptions = [],
    seriesCounter = 0,
    names = ticker.split(",");

$(document).ready(function() {
	$.get(url, function(data) {
		//console.log(data)
		obj = JSON.parse(data)
	    var headerString = ""

		for(var i = 0; i < names.length; i++) {
			var security = obj.resultMap.SEARCH_RESULTS[0].resultList[i]
			if(i+1 === names.length)
				headerString += security.description + " (" + security.ticker + ")"
			else
				headerString += security.description + " (" + security.ticker + "), "
			
		}
		$("#mainHeader").html(headerString)
		
	})
})

function createChart() {

    Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },

        series: seriesOptions
    });
}

$.each(names, function (i, name) {
	var timeSeries = []
	$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + names[i] + "&outputsize=full&apikey=PGQY7BQGQGH7EF0E&datatype=json", function(data) {
		$.each(data["Time Series (Daily)"], function(i, v) {
			var d = new Date(i)
			timeSeries.push([d.getTime()+1-1, v["4. close"]+1-1])
		})
		timeSeries = timeSeries.reverse()

		seriesOptions[i] = {
			name: name,
			data: timeSeries
		};
		seriesCounter += 1

		if (seriesCounter === names.length) {
			createChart();
		}

	});
});