$(window).on('load', function() {
    
    window.initgraphExpensesTot = function() {
        // console.log("called total");
        window.morrisGraphExpensesTot = new Morris.Bar({
            element: 'expenses',
            data: yearExpensesData,
            xkey: 'year',
            ykeys: ['expenses'],
            labels: ['Dépenses'],
            barRatio: 0.4,
            xLabelAngle: 35,
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
            barRatio: 0.4,
            xLabelAngle: 35,
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
            barRatio: 0.4,
            xLabelAngle: 35,
            hideHover: 'auto',
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
});

// REPAIR ATTEMPT FOR BROKEN MORRIS DATA IN HIDDEN DIVS

$('ul.nav a').on('shown.bs.tab', function (e) {
    var id = $(this).attr('href');
    var fun = "initgraph" + id.substr(1, id.length - 4);
    var gen = "morrisGraph" + id.substr(1, id.length - 4);
    window[gen].redraw();
});