$(function() {

    

    Morris.Donut({
        element: 'morris-donut-chart',
        formatter: function (y, data) { return y + ' €' },
        data: [{
            label: "Chauffage",
            value: 62
        }, {
            label: "Chauffe-eau",
            value: 11
        }, {
            label: "Cuisson",
            value: 6
        },{
            label: "Electroménager",
            value: 10
        },
        {
            label: "Eclairage",
            value: 4
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        formatter: function (y, data) { return y + ' €' },
        data: [{
            y: 'Juillet',
            a: 100,
            b: 90
        }, {
            y: 'Août',
            a: 75,
            b: 65
        }, {
            y: 'Septembre',
            a: 50,
            b: 40
        }, {
            y: 'Octobre',
            a: 75,
            b: 65
        }, {
            y: 'Novembre',
            a: 50,
            b: 40
        }, {
            y: 'Décembre',
            a: 75,
            b: 65
        }, {
            y: 'Janvier',
            a: 100,
            b: 90
        }, {
            y: 'Février',
            a: 100,
            b: 90
        }, {
            y: 'Mars',
            a: 100,
            b: 90
        }, {
            y: 'Avril',
            a: 100,
            b: 90
        }, {
            y: 'Mai',
            a: 100,
            b: 90
        }, {
            y: 'Juin',
            a: 52,
            b: 200
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Cette année', 'L\'année dernière'],
        hideHover: 'auto',
        resize: true
    });

});
