/*---------------------------------
 | Google Line Chart : small chart
 *---------------------------------*/
google.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Date', 'Views'],
        ['6/15/2015',  0],
        ['6/16/2015',  5],
        ['6/17/2015',  10],
        ['6/18/2015',  16],
        ['6/19/2015',  20],
        ['6/20/2015',  27],
        ['6/21/2015',  19],
        ['6/22/2015',  33],
        ['6/23/2015',  21],
        ['6/24/2015',  24],
        ['6/25/2015',  30],
        ['6/26/2015',  22],
        ['6/27/2015',  28],
        ['6/28/2015',  30],
        ['6/29/2015',  33],
        ['6/30/2015',  38],
        ['7/01/2015',  41],
        ['7/02/2015',  45],
        ['7/03/2015',  52],
        ['7/04/2015',  60]
    ]);

    var options = {
        legend: 'none',
        backgroundColor : '#141414',
        width: 300,
        height: 110,
        chartArea : {
            top: 50,
            left : 0  
        },

        lineWidth : 3,

        vAxis : {
            baseline : 1,
            baselineColor : '#FC0',
            gridlines : 3,
            textStyle : {
                color : 'none'
            },
        },

        hAxis : {
            gridlines : {
                color : '#1b1b1b',
                count : 0 
            },
            textStyle : {
                color : 'none'
            },
            showTextEvery : 3
        },

        trendlines: {
            0: {
                color: '#FFF'
            }
        },

        tooltip : {
            trigger : 'none'
        },

        pointsVisible : false
    };

    var chart = new google.visualization.LineChart(document.getElementById('data-chart-sm'));

    chart.draw(data, options);
}

/*--------------------------------
 | Google Pie Charts
 *--------------------------------*/
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart1);
google.setOnLoadCallback(drawChart2);

function drawChart1() {

    var data = google.visualization.arrayToDataTable([
        ['Splits', 'Percentage'],
        ['', 50],
        ['', 50]
    ]);

    var options = {
        backgroundColor : '#141414',
        chartArea : {
            top: 0,
            left: 0
        },
        width: 120,
        height: 120,
        legend: 'none',
        slices : {
            0 : { color: '#141414' },
            1 : { color: '#CC9900' }
        },
        tooltip : {
            trigger : 'none'
        }
    };

    var chart = new google.visualization.PieChart(document.querySelector('#sa-pie-1'));

    chart.draw(data, options);

}

function drawChart2() {
    var data = google.visualization.arrayToDataTable([
        ['Splits', 'Percentage'],
        ['', 50],
        ['', 50]
    ]);
    var options = {
        backgroundColor : '#141414',
        chartArea : {
            top: 0,
            left: 0
        },
        width: 120,
        height: 120,
        legend: 'none',
        slices : {
            0 : { color: '#CC9900' },
            1 : { color: '#141414' }
        },
        tooltip : {
            trigger : 'none'
        }
    };

    var chart = new google.visualization.PieChart(document.querySelector('#sa-pie-2'));
    chart.draw(data, options);
}