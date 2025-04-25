import { ChartType } from './dashboard.model';

const transactions = [
    {
        id: '#MT1001',
        name: 'Luis Hernández',
        date: '07 Abr, 2025',
        total: '$850',
        status: 'Pagado',
        payment: ['fa-cc-mastercard', 'Mastercard'],
        index: 1
    },
    {
        id: '#MT1002',
        name: 'Sandra López',
        date: '06 Abr, 2025',
        total: '$620',
        status: 'Cancelada',
        payment: ['fa-cc-visa', 'Visa'],
        index: 2
    },
    {
        id: '#MT1003',
        name: 'Carlos Ramírez',
        date: '06 Abr, 2025',
        total: '$730',
        status: 'Pagado',
        payment: ['fa fa-money', 'Efectivo'],
        index: 3
    },
    {
        id: '#MT1004',
        name: 'María Torres',
        date: '05 Abr, 2025',
        total: '$910',
        status: 'Pagado',
        payment: ['fa-cc-mastercard', 'Mastercard'],
        index: 4
    },
    {
        id: '#MT1005',
        name: 'Ricardo Gómez',
        date: '04 Abr, 2025',
        total: '$770',
        status: 'Pendiente',
        payment: ['fa-cc-visa', 'Visa'],
        index: 5
    },
    {
        id: '#MT1006',
        name: 'Ana Martínez',
        date: '03 Abr, 2025',
        total: '$695',
        status: 'Pagado',
        payment: ['fa fa-money', 'Efectivo'],
        index: 6
    }
];


const lineColumAreaChart: ChartType = {
    chart: {
        height: 327,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false
        }
    },
    stroke: {
        width: [0, 2, 4],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '30%'
        }
    },
    colors: ['#556ee6', '#f1b44c', '#ab0033', '#51ca9e'],
    series: [{
        name: 'Multas Leves',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
        name: 'Multas Moderadas',
        type: 'column',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'Multas Graves',
        type: 'column',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    },{
        name: 'Multas Especiales',
        type: 'column',
        data: [35, 15, 22, 17, 45, 30, 70, 42, 50, 46, 39]
    } ],
    fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
    markers: {
        size: 0
    },
    legend: {
        offsetY: 5,
    },
    xaxis: {
        type: 'datetime',
    },
    yaxis: {
        title: {
            text: 'Multas',
        },
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter(y) {
                if (typeof y !== 'undefined') {
                    return y.toFixed(0) + ' Multas';
                }
                return y;
            }
        }
    },
    grid: {
        borderColor: '#f1f1f1'
    }
};

const revenueColumnChart: ChartType = {
    chart: {
        width: 80,
        height: 40,
        type: 'bar',
        toolbar: {
            show: false
        },
        sparkline: {
            enabled: true,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '100%'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 3,
        colors: ['transparent']
    },
    colors: ['#556ee6'],
    series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 44, 54]
    }],
    fill: {
        opacity: 0.9
    },
    grid: {
        borderColor: '#f1f1f1'
    },
    tooltip: {
        enabled: true,
        y: {
            formatter: (val) => {
                return val;
            }
        },
    }
};

const customerRadialBarChart: ChartType = {
    series: ['55'],
    chart: {
        type: 'radialBar',
        width: 45,
        height: 45,
        sparkline: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#556ee6'],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '60%'
            },
            track: {
                margin: 0
            },
            dataLabels: {
                show: false
            }
        }
    }
};

const orderRadialBarChart: ChartType = {
    series: ['70'],
    chart: {
        type: 'radialBar',
        width: 45,
        height: 45,
        sparkline: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#34c38f'],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '60%'
            },
            track: {
                margin: 0
            },
            dataLabels: {
                show: false
            }
        }
    }
};

const growthColumnChart: ChartType = {
    chart: {
        width: 80,
        height: 40,
        type: 'bar',
        toolbar: {
            show: false
        },
        sparkline: {
            enabled: true,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '100%'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 3,
        colors: ['transparent']
    },
    colors: ['#f1b44c'],
    series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    }],
    fill: {
        opacity: 0.9
    },
    grid: {
        borderColor: '#f1f1f1'
    },
    tooltip: {
        enabled: true,
        y: {
            formatter: (val) => {
                return val;
            }
        },
    }
};

export { transactions, lineColumAreaChart, revenueColumnChart, customerRadialBarChart, orderRadialBarChart, growthColumnChart };

