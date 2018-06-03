$(window).on('load', function() {

    var euro_sign = "\u20AC";    
            
    window.initgraphExpensesTot = function() {
        // console.log("called total");
        window.morrisGraphExpensesTot = new Morris.Bar({
            element: 'expenses',
            data: yearExpensesData,
            xkey: 'year',
            ykeys: ['expenses'],
            labels: ['Dépenses'],
            xLabelAngle: 35,
            yLabelFormat: function(y){ return euro_sign + y.toFixed(2)},
            hideHover: 'auto', 
            resize: 'true'
        });
    }
    window.initgraphExpenses2017 = function() {
        // console.log("called 2017");
        window.morrisGraphExpenses2017 = new Morris.Bar({
            element: 'expenses2017',
            data: monthExpensesData2017,
            xkey: 'month',
            ykeys: ['expenses'],
            labels: ['Dépenses'],
            xLabelAngle: 35,
            yLabelFormat: function(y){ return euro_sign + y.toFixed(2)},
            hideHover: 'auto',
            resize: 'true'
        });
    }
    window.initgraphExpenses2016 = function() {
        // console.log("called 2016");
        window.morrisGraphExpenses2016 = new Morris.Bar({
            element: 'expenses2016',
            data: monthExpensesData2016,
            xkey: 'month',
            ykeys: ['expenses'],
            labels: ['Dépenses'],
            xLabelAngle: 35,
            hideHover: 'auto',
            yLabelFormat: function(y){ return euro_sign + y.toFixed(2)},
            resize: 'true'
        });
    }
    
    $('#expensesTabs a').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href');
        var fun = "initgraph" + id.substr(1, id.length - 4);
        var gen = "morrisGraph" + id.substr(1, id.length - 4);
        // console.log(fun);    
        $(this).tab('show');
        if (typeof window[gen] === 'undefined') {        
            window[fun]();
        }
    })
    
    initgraphExpenses2017();
    
    window.initgraphConsumptionTot = function() {
        // console.log("called total");
        window.morrisGraphConsumptionTot = new Morris.Line({
            element: 'consumption',
            data: yearConsumptionData,
            xkey: 'month',
            ykeys: ['conso16', 'conso17'],
            labels: ['Consommation 2016', 'Consommation 2017'],
            xLabelAngle: 35,
            behaveLikeLine: true,
            parseTime: false,
            yLabelFormat: function(y){ return y.toFixed(2) + ' W'},
            hideHover: 'auto', 
            resize: 'true'
        });
    }
    window.initgraphConsumption2017 = function() {
        //console.log("called 2017");
        if ($("#consumption2017").length > 0) { 
            window.morrisGraphConsumption2017 = new Morris.Line({
                element: 'consumption2017',
                data: monthConsumptionData2017,
                xkey: 'month',
                ykeys: ['conso'],
                behaveLikeLine: true,
                labels: ['Consommation'],
                xLabelAngle: 35,
                yLabelFormat: function(y){ return y.toFixed(2) + ' W'},
                hideHover: 'auto',
                parseTime: false,
                resize: 'true'
            });
        }
    }
    window.initgraphConsumption2016 = function() {
        // console.log("called 2016");
        window.morrisGraphConsumption2016 = new Morris.Line({
            element: 'consumption2016',
            data: monthConsumptionData2016,
            xkey: 'month',
            ykeys: ['conso'],
            labels: ['Consommation'],
            xLabelAngle: 35,
            behaveLikeLine: true,
            parseTime: false,
            hideHover: 'auto',
            yLabelFormat: function(y){ return y.toFixed(2) + ' W'},
            resize: 'true'
        });
    }
    
    $('#consumptionTabs a').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href');
        var fun = "initgraph" + id.substr(1, id.length - 4);
        var gen = "morrisGraph" + id.substr(1, id.length - 4);
        //console.log(fun);    
        $(this).tab('show');
        if (typeof window[gen] === 'undefined') {        
            window[fun]();
        }
    })
    
    initgraphConsumption2017();
});

// REPAIR ATTEMPT FOR BROKEN MORRIS DATA IN HIDDEN DIVS

var resizeCharts = function (size) {
    //console.log("called with : "+size);
    // Get active tab
    var wattsActive = $('#consumptionTabs .active a');
    var euroActive = $('#expensesTabs .active a');
    
    // Grab ID of graph in tab
    var graphEuro = euroActive.parent().parent().next().children().children().children()[1].attributes["id"].value;
    var graphWatt = wattsActive.parent().parent().next().children().children().children()[1].attributes["id"].value;
    
    // Empty it so we can just recreate a new one
    // THIS IS A BUG!
    // .redraw() should resize but since it will not this workaround will be implemented.
    $("#"+graphEuro).empty()
    $("#"+graphWatt).empty()
    
    if ((size == 6) & (!document.getElementById("expensesDiv").classList.contains('col-sm-6'))) {
        if (!document.getElementById("consumptionDiv").classList.contains('col-sm-6')) {
            document.getElementById("expensesDiv").classList.toggle('col-sm-6');
            document.getElementById("consumptionDiv").classList.toggle('col-sm-6');
            document.getElementById("expensesDiv").classList.toggle('col-sm-12');
            document.getElementById("consumptionDiv").classList.toggle('col-sm-12');
            var id = wattsActive.attr('href');            
            var fun = "initgraph" + id.substr(1, id.length - 4);
            var gen = "morrisGraph" + id.substr(1, id.length - 4);
            if (typeof window[gen] != 'undefined') {  
                window[fun]();
            }
            id = euroActive.attr('href');
            fun = "initgraph" + id.substr(1, id.length - 4);
            gen = "morrisGraph" + id.substr(1, id.length - 4);
            if (typeof window[gen] != 'undefined') {     
                window[fun]();
            }
        }
    } else {
        if ((size == 12) & (!document.getElementById("expensesDiv").classList.contains('col-sm-12'))) {
            if (!document.getElementById("consumptionDiv").classList.contains('col-sm-12')) {
                document.getElementById("expensesDiv").classList.toggle('col-sm-6');
                document.getElementById("consumptionDiv").classList.toggle('col-sm-6');
                document.getElementById("expensesDiv").classList.toggle('col-sm-12');
                document.getElementById("consumptionDiv").classList.toggle('col-sm-12');
                var id = wattsActive.attr('href');
                var fun = "initgraph" + id.substr(1, id.length - 4);
                var gen = "morrisGraph" + id.substr(1, id.length - 4);
                if (typeof window[gen] != 'undefined') {    
                    window[fun]();
                }
                id = euroActive.attr('href');
                fun = "initgraph" + id.substr(1, id.length - 4);
                gen = "morrisGraph" + id.substr(1, id.length - 4);
                if (typeof window[gen] != 'undefined') {  
                    window[fun]();
                }
            }
        }
    } 
};

$('ul.nav a').on('shown.bs.tab', function (e) {
    var id = $(this).attr('href');
    var fun = "initgraph" + id.substr(1, id.length - 4);
    var gen = "morrisGraph" + id.substr(1, id.length - 4);
    window[gen].redraw();
});
