var ticker = decodeURIComponent(window.location.href).match(/\w+\=(\w|\,)+/i)[0].split('=')[1]
var url = "http://127.0.0.1:8000/polls/securitysearch/?ids="+ticker.toUpperCase()
//fetch information from server
var obj
var c
var seriesOptions = [],
    seriesCounter = 0,
    names = ticker.split(",");
function ProcessClick(elem){
    //console.log($(elem).parent().find("#tickerar").find(":input").is(":checked"))
    $(elem).parent().find("#tickerar").find(":input").each(function(i,v){
        if($(v).is(":checked")){
            var tickerNAME = $(elem).parent().find("#reee").attr("class") 
            var techtype = $(v).attr('name')
//
            //  $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + names[i] + "&outputsize=full&apikey=PGQY7BQGQGH7EF0E&datatype=json", function(data) {
                console.log("getting " + techtype)
                $.get(("https://www.alphavantage.co/query?function=" + techtype + "&symbol=" + tickerNAME + "&interval=daily&time_period=200&series_type=close&apikey=PGQY7BQGQGH7EF0E&datatype=json"), function(q,t){
                        raw_time_series = q[("Technical Analysis: " + techtype)]
                       // console.log(raw_time_series)
                        // make moving average request
                        var RAWSERIES = []
                        $.each(raw_time_series, function(t, j) {
                            var d = new Date(t)
                            RAWSERIES.push([d.getTime()+1-1, Object.values(j)[0] + 1 - 1])
                        })
                        RAWSERIES = RAWSERIES.reverse()
                        console.log(RAWSERIES)

                            seriesOptions.push({
                                name: techtype,
                                data: RAWSERIES
                            })
                         c.update({
                                yAxis:{
                                plotLines: [{
                                       value: 40,
                                                color: 'red',
                                                width: 2,
                                                id: 'plot-line-1'
                                    }]

                              },
                            plotOptions: {
                                series: {
                                    compare: 'percent',
                                    showInNavigator: true
                                }
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
                            })
                })

        }
    })
}

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
			console.log(security)

            floatVal = "#leftsidedata"
            e = "left"
            if(i%2 == 1){
                floatVal = "#rightsidedata"
                e = "right"
            }
			$(floatVal).append(`<div id="infotableLeft" style="width: 575px; height: auto; margin-top:36px;box-shadow: #00000021 0px 0px 9px 6px; float:` + e + `;">
            <div id="st" style="text-align: center; margin-top: 20px; transform: translateY(5px); font-size: 24px; text-align: center; "> <b> ` + security.ticker.toUpperCase() + ` INFORMATION </b></div>

            <table id="tickerar" style="margin-top:50px; font-size: 12px">
              <tbody><tr>
                <td>Ticker: </td>
                <td id="info_ticker">` + security.ticker + `</td>
                <td gcfb="">Country: </td>
                <td id="info_country">` + security.country + `</td>
              </tr>
              <tr>
                <td>Currency: </td>
                <td id="info_currency"> ` + security.currency + `</td>
                <td>Description: </td>
                <td id="info_description">` + security.description + `</td>
              </tr>
              <tr>
                <td>Exchange: </td>
                <td id="info_exchange">` + security.exchangeAcronym + `</td>
                <td>Sector: </td>
                <td id="info_sector">` + security.gics1Sector + `</td>
              </tr>
               <tr>
                <td>Industry Group: </td>
                <td id="info_ig">` + security.gics2IndustryGroup + `</td>
                <td>Industry: </td>
                <td id="info_industry">` + security.gics3Industry + `</td>
              </tr>
               <tr>
                <td>Sub Industry: </td>
                <td id="info_sub_industry">` + security.gics4SubIndustry + `</td>
                <td>FTSE Industry: </td>
                <td id="info_ftse_industry">` + security.issFtse1Industry + `</td>
              </tr>
               <tr>
                <td>FTSE Subsector 2: </td>
                <td id="info_ftsesubsec2">` + security.issFtse2SuperSector + `</td>
                <td>FTSE Subsector 3: </td>
                <td id="info_ftsesubsec3">` + security.issFtse3Sector + `</td>
              </tr>
               <tr>
                <td>FTSE Subsector 4: </td>
                <td id="info_ftsesubsec4">` + security.ftseSubSector + `</td>
                <td>P/B Ratio: </td>
                <td id="info_pb">` + security.pbRatio + `</td>
              </tr>
               <tr>
                <td>P/E Ratio: </td>
                <td id="rtereee">` + security.peRatio + `</td>
                <td></td>
                <td id="info_pb"> </td>
              </tr>
               <tr>
                <td></td>
                <td id="rtereee"></td>
                <td></td>
                <td id="info_pb"> </td>
                </tr>
            </tbody></table>
        </div>`)
            $("#whitebackground").append(`<div id="technicalindic" style="width:1200px;/* position:absolute; */height: 360px;margin-top: 36px;    font-family: 'Roboto', sans-serif; float: left;box-shadow: #00000021 0px 0px 9px 6px">
             <div id="qe" style="text-align: center; margin-top: 20px; font-family: inherit;transform: translateY(5px); font-size: 24px; text-align: center; "><b> ` + security.ticker.toUpperCase() + ` INDICATORS </b></div>
            <div id="reee" class="` + security.ticker + `"> </div>            
            <table id="tickerar" style="padding:20px; width:600px;height:40%; margin-top:75px; float:left;font-family: inherit;">
              <tbody>
                <tr>
                    <td><input type="checkbox" name="SMA" value="SMA"> SMA Simple MA</td>
                    <td><input type="checkbox" name="EMA" value="EMA"> EMA Exponential MA</td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="WMA" value="WMA"> WMA Weighted MA </td>
                    <td><input type="checkbox" name="DEMA" value="DEMA">DEMA Double Exponential MA </td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="TEMA" value="TEMA">TEMA Triple exponential MA </td>
                    <td><input type="checkbox" name="TRIMA" value="TRIMA">TRIMA Triangular MA </td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="SMA" value="KAMA">KAMA Kaufman Adaptive MA </td>
                    <td> </td>
                </tr>

              </tbody>
            </table>
            <table id="tickerar" style="padding:20px; margin-top:75px;width:600px;height:40%; float:left;font-family: inherit;">
              <tbody>
                <tr>
                    <td><input type="checkbox" name="RSI" value="RSI">Relative Strength Index</td>
                    <td><input type="checkbox" name="WILLR" value="WILLR">WILLR</td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="ADM" value="ADM">Average Directional Movement </td>
                    <td><input type="checkbox" name="CCI" value="CCI">Commodity Channel Index </td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="AROON" value="AOON">AROON </td>
                    <td><input type="checkbox" name="MFI" value="MFI">Money Flow Index</td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="DX" value="DX">Directional Movement Index </td>
                    <td><input type="checkbox" name="BBANDS" value="BBANDS">Bollinger Bands </td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="MINDPOINT" value="MINDPOINT">Midpoint </td>
                    <td><input type="checkbox" name="MIDPRICE" value="MIDPRICE">Midprice</td>
                </tr>
              </tbody>
            </table>
            <button onclick="ProcessClick(this)" style="width:500px; height:25px; font-family: inherit;position: absolute; margin-top:220px; left:50%; margin-left:-250.5px">REFRESH TIMESERIES WITH INDICATORS</button>
        </div>`)
		}

		var info_objects = obj.resultMap.SEARCH_RESULTS[0]
		$("#mainHeader").html(headerString)
		
	})
	// INIT SECURITY INFO

})

function createChart() {

    c = Highcharts.stockChart('container', {
    	chart: { 
    		polar: true,
    		backgroundColor: 'whitesmoke'
    	},
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
        console.log(timeSeries)
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