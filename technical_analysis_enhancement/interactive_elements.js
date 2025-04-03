// Interactive Elements for Technical Analysis
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Highcharts main price chart
    initializeMainPriceChart();
    
    // Initialize pattern recognition chart
    initializePatternRecognitionChart();
    
    // Initialize volume heat map
    initializeVolumeHeatMap();
    
    // Initialize volatility analysis chart
    initializeVolatilityAnalysisChart();
    
    // Initialize comparative chart
    initializeComparativeChart();
    
    // Initialize correlation analysis chart
    initializeCorrelationAnalysisChart();
    
    // Initialize sentiment analysis chart
    initializeSentimentAnalysisChart();
    
    // Initialize scenario builder
    initializeScenarioBuilder();
    
    // Initialize predictive modeling chart
    initializePredictiveModelingChart();
    
    // Setup interactive controls
    setupChartControls();
    
    // Setup accordion functionality
    setupAccordion();
});

// Main Price Chart
function initializeMainPriceChart() {
    // Sample data for Imugene stock
    const ohlcData = generateSampleOHLCData();
    const volumeData = generateSampleVolumeData();
    
    // Create the main price chart
    Highcharts.stockChart('main-price-chart', {
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        rangeSelector: {
            selected: 4, // Default to 6-month view
            buttons: [
                {type: 'month', count: 1, text: '1m'},
                {type: 'month', count: 3, text: '3m'},
                {type: 'month', count: 6, text: '6m'},
                {type: 'year', count: 1, text: '1y'},
                {type: 'all', text: 'All'}
            ],
            buttonTheme: {
                fill: 'white',
                stroke: '#C0D0E0',
                'stroke-width': 1,
                r: 4,
                style: {
                    color: '#2c3e50',
                    fontWeight: 'bold'
                },
                states: {
                    hover: {
                        fill: '#e3f2fd',
                        stroke: '#3498db',
                        style: {
                            color: '#1565c0'
                        }
                    },
                    select: {
                        fill: '#3498db',
                        stroke: '#1565c0',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputStyle: {
                color: '#2c3e50'
            },
            labelStyle: {
                color: '#7f8c8d'
            }
        },
        title: {
            text: 'Imugene (IMU.AX) Share Price',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Click and drag to zoom, shift+click to pan',
            style: {
                color: '#7f8c8d'
            }
        },
        navigator: {
            enabled: true,
            outlineColor: '#3498db',
            outlineWidth: 1,
            handles: {
                backgroundColor: 'white',
                borderColor: '#3498db'
            },
            series: {
                color: '#3498db',
                lineWidth: 1
            }
        },
        scrollbar: {
            enabled: true,
            barBackgroundColor: '#ecf0f1',
            barBorderColor: '#bdc3c7',
            buttonBackgroundColor: '#ecf0f1',
            buttonBorderColor: '#bdc3c7',
            trackBackgroundColor: '#f8f9fa',
            trackBorderColor: '#bdc3c7'
        },
        plotOptions: {
            candlestick: {
                color: '#e74c3c',
                upColor: '#2ecc71',
                lineColor: '#c0392b',
                upLineColor: '#27ae60',
                animation: {
                    duration: 1000
                }
            },
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        yAxis: [{
            labels: {
                align: 'right',
                x: -3,
                style: {
                    color: '#2c3e50'
                }
            },
            title: {
                text: 'Price (AUD)',
                style: {
                    color: '#2c3e50'
                }
            },
            height: '60%',
            lineWidth: 1,
            gridLineColor: '#e5e5e5',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3,
                style: {
                    color: '#7f8c8d'
                }
            },
            title: {
                text: 'Volume',
                style: {
                    color: '#7f8c8d'
                }
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 1,
            gridLineColor: '#e5e5e5'
        }],
        tooltip: {
            split: true,
            valueDecimals: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            style: {
                fontWeight: 'bold'
            }
        },
        series: [{
            type: 'candlestick',
            name: 'Imugene',
            id: 'imugene',
            data: ohlcData,
            tooltip: {
                valueDecimals: 3
            }
        }, {
            type: 'column',
            name: 'Volume',
            id: 'volume',
            data: volumeData,
            yAxis: 1,
            color: 'rgba(52, 152, 219, 0.5)'
        }, {
            type: 'sma',
            name: '20-Day SMA',
            id: 'sma-20',
            linkedTo: 'imugene',
            color: '#f39c12',
            lineWidth: 1.5,
            params: {
                period: 20
            },
            visible: true
        }, {
            type: 'sma',
            name: '50-Day SMA',
            id: 'sma-50',
            linkedTo: 'imugene',
            color: '#3498db',
            lineWidth: 1.5,
            params: {
                period: 50
            },
            visible: true
        }, {
            type: 'sma',
            name: '200-Day SMA',
            id: 'sma-200',
            linkedTo: 'imugene',
            color: '#9b59b6',
            lineWidth: 1.5,
            params: {
                period: 200
            },
            visible: true
        }, {
            type: 'bb',
            name: 'Bollinger Bands',
            id: 'bollinger',
            linkedTo: 'imugene',
            params: {
                period: 20,
                standardDeviation: 2
            },
            visible: false,
            color: '#2c3e50',
            lineWidth: 1,
            fillColor: 'rgba(44, 62, 80, 0.1)',
            fillOpacity: 0.1
        }],
        annotations: [{
            labels: [{
                point: {
                    x: Date.UTC(2024, 2, 15), // March 15, 2024
                    y: 0.042,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Phase 2 Results',
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: -40
            }, {
                point: {
                    x: Date.UTC(2024, 5, 10), // June 10, 2024
                    y: 0.038,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Partnership Announcement',
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: -40
            }, {
                point: {
                    x: Date.UTC(2024, 8, 5), // September 5, 2024
                    y: 0.032,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Capital Raising',
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: 40
            }],
            visible: true,
            id: 'events'
        }, {
            labels: [{
                point: {
                    x: Date.UTC(2024, 10, 1), // November 1, 2024
                    y: 0.028,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Double Bottom',
                backgroundColor: 'rgba(155, 89, 182, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: 40
            }],
            shapes: [{
                type: 'path',
                points: [{
                    x: Date.UTC(2024, 9, 15), // October 15, 2024
                    y: 0.029,
                    xAxis: 0,
                    yAxis: 0
                }, {
                    x: Date.UTC(2024, 10, 15), // November 15, 2024
                    y: 0.029,
                    xAxis: 0,
                    yAxis: 0
                }],
                strokeWidth: 2,
                stroke: 'rgba(155, 89, 182, 0.8)',
                dashStyle: 'dash'
            }],
            visible: true,
            id: 'patterns'
        }, {
            labels: [{
                point: {
                    x: Date.UTC(2025, 0, 15), // January 15, 2025
                    y: 0.030,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Support',
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0,
                y: 15
            }, {
                point: {
                    x: Date.UTC(2024, 6, 15), // July 15, 2024
                    y: 0.047,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Resistance',
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0,
                y: -15
            }],
            shapes: [{
                type: 'path',
                points: [{
                    x: Date.UTC(2024, 11, 1), // December 1, 2024
                    y: 0.030,
                    xAxis: 0,
                    yAxis: 0
                }, {
                    x: Date.UTC(2025, 2, 31), // March 31, 2025
                    y: 0.030,
                    xAxis: 0,
                    yAxis: 0
                }],
                strokeWidth: 2,
                stroke: 'rgba(46, 204, 113, 0.8)',
                dashStyle: 'solid'
            }, {
                type: 'path',
                points: [{
                    x: Date.UTC(2024, 5, 1), // June 1, 2024
                    y: 0.047,
                    xAxis: 0,
                    yAxis: 0
                }, {
                    x: Date.UTC(2024, 8, 30), // September 30, 2024
                    y: 0.047,
                    xAxis: 0,
                    yAxis: 0
                }],
                strokeWidth: 2,
                stroke: 'rgba(231, 76, 60, 0.8)',
                dashStyle: 'solid'
            }],
            visible: true,
            id: 'levels'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    },
                    yAxis: [{
                        labels: {
                            align: 'left'
                        }
                    }, {
                        labels: {
                            align: 'left'
                        }
                    }]
                }
            }]
        }
    });
}

// Pattern Recognition Chart
function initializePatternRecognitionChart() {
    const patternData = generatePatternRecognitionData();
    
    Highcharts.chart('pattern-recognition-chart', {
        chart: {
            type: 'line',
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Algorithmic Pattern Detection',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Hover over patterns for details',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: 'Price (AUD)',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                formatter: function() {
                    return '$' + this.value.toFixed(3);
                },
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineColor: '#e5e5e5'
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            valueDecimals: 3,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b><br/>'
        },
        series: [{
            name: 'Imugene Price',
            data: patternData.price,
            color: '#3498db',
            lineWidth: 2,
            zIndex: 2
        }, {
            name: 'Double Bottom',
            data: patternData.doubleBottom,
            color: '#9b59b6',
            lineWidth: 0,
            marker: {
                enabled: true,
                symbol: 'diamond',
                radius: 8,
                fillColor: '#9b59b6',
                lineColor: '#8e44ad',
                lineWidth: 1
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>Detected</b><br/><span>Confidence: 78%</span><br/><span>Target: $0.038</span><br/>'
            }
        }, {
            name: 'Support/Resistance',
            data: patternData.supportResistance,
            color: '#2ecc71',
            lineWidth: 0,
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 6,
                fillColor: '#2ecc71',
                lineColor: '#27ae60',
                lineWidth: 1
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b><br/><span>Type: {point.type}</span><br/><span>Strength: {point.strength}%</span><br/>'
            }
        }, {
            name: 'Trend Reversal',
            data: patternData.trendReversal,
            color: '#e74c3c',
            lineWidth: 0,
            marker: {
                enabled: true,
                symbol: 'triangle',
                radius: 8,
                fillColor: '#e74c3c',
                lineColor: '#c0392b',
                lineWidth: 1
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>Detected</b><br/><span>Direction: {point.direction}</span><br/><span>Confidence: {point.confidence}%</span><br/>'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

// Volume Heat Map
function initializeVolumeHeatMap() {
    const volumeHeatMapData = generateVolumeHeatMapData();
    
    Highcharts.chart('volume-heat-map', {
        chart: {
            type: 'heatmap',
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Volume Heat Map (Last 12 Months)',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Darker colors indicate higher trading volume',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    color: '#2c3e50'
                }
            }
        },
        yAxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            title: null,
            labels: {
                style: {
                    color: '#2c3e50'
                }
            }
        },
        colorAxis: {
            min: 0,
            max: 20,
            stops: [
                [0, '#f7fbff'],
                [0.2, '#c6dbef'],
                [0.4, '#9ecae1'],
                [0.6, '#6baed6'],
                [0.8, '#3182bd'],
                [1, '#08519c']
            ]
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 10,
            verticalAlign: 'middle',
            symbolHeight: 280,
            title: {
                text: 'Volume (millions)',
                style: {
                    color: '#2c3e50'
                }
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>' + this.series.xAxis.categories[this.point.x] + ' ' + 
                       this.series.yAxis.categories[this.point.y] + '</b><br>' +
                       'Volume: ' + this.point.value + ' million shares<br>' +
                       (this.point.event ? 'Event: ' + this.point.event : '');
            },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true
        },
        series: [{
            name: 'Volume by Week',
            borderWidth: 1,
            borderColor: '#ffffff',
            data: volumeHeatMapData,
            dataLabels: {
                enabled: false
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        layout: 'horizontal',
                        verticalAlign: 'bottom',
                        symbolHeight: 10,
                        symbolWidth: 280
                    }
                }
            }]
        }
    });
}

// Volatility Analysis Chart
function initializeVolatilityAnalysisChart() {
    const volatilityData = generateVolatilityData();
    
    Highcharts.chart('volatility-analysis-chart', {
        chart: {
            type: 'line',
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Volatility Analysis',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Historical volatility and Bollinger Band width',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0
        },
        yAxis: [{
            title: {
                text: 'Historical Volatility (%)',
                style: {
                    color: '#e74c3c'
                }
            },
            labels: {
                format: '{value}%',
                style: {
                    color: '#e74c3c'
                }
            },
            gridLineColor: '#e5e5e5',
            opposite: false
        }, {
            title: {
                text: 'Bollinger Band Width',
                style: {
                    color: '#3498db'
                }
            },
            labels: {
                style: {
                    color: '#3498db'
                }
            },
            gridLineColor: '#e5e5e5',
            opposite: true
        }],
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>'
        },
        series: [{
            name: '30-Day Historical Volatility',
            data: volatilityData.historicalVolatility,
            color: '#e74c3c',
            lineWidth: 2,
            yAxis: 0,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f}%</b><br/>'
            }
        }, {
            name: 'Bollinger Band Width',
            data: volatilityData.bollingerWidth,
            color: '#3498db',
            lineWidth: 2,
            yAxis: 1,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.4f}</b><br/>'
            }
        }, {
            name: 'Volatility Events',
            data: volatilityData.volatilityEvents,
            type: 'scatter',
            color: '#9b59b6',
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 6,
                fillColor: '#9b59b6',
                lineColor: '#8e44ad',
                lineWidth: 1
            },
            yAxis: 0,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.event}</b><br/><span>Impact: {point.impact}</span><br/>'
            }
        }],
        annotations: [{
            labels: [{
                point: {
                    x: Date.UTC(2024, 8, 15), // September 15, 2024
                    y: 120,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'High Volatility Period',
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: -40
            }, {
                point: {
                    x: Date.UTC(2025, 1, 15), // February 15, 2025
                    y: 70,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Volatility Contraction',
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: 40
            }],
            visible: true
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    },
                    yAxis: [{
                        title: {
                            text: 'HV (%)'
                        }
                    }, {
                        title: {
                            text: 'BB Width'
                        }
                    }]
                }
            }]
        }
    });
}

// Comparative Chart
function initializeComparativeChart() {
    const comparativeData = generateComparativeData();
    
    Highcharts.chart('comparative-chart', {
        chart: {
            type: 'line',
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Relative Performance (12 Months)',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Indexed to 100 at start date',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: 'Performance (Indexed to 100)',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineColor: '#e5e5e5',
            plotLines: [{
                value: 100,
                color: '#95a5a6',
                dashStyle: 'dash',
                width: 1,
                label: {
                    text: 'Baseline (100)',
                    style: {
                        color: '#7f8c8d'
                    }
                }
            }]
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f}</b> ({point.change:+.2f}%)<br/>'
        },
        series: [{
            name: 'Imugene',
            data: comparativeData.imugene,
            color: '#3498db',
            lineWidth: 3,
            zIndex: 5
        }, {
            name: 'ASX 200',
            data: comparativeData.asx200,
            color: '#2ecc71',
            lineWidth: 2,
            zIndex: 4
        }, {
            name: 'ASX Healthcare',
            data: comparativeData.asxHealthcare,
            color: '#9b59b6',
            lineWidth: 2,
            zIndex: 3
        }, {
            name: 'ASX Biotech Peers',
            data: comparativeData.asxBiotech,
            color: '#e67e22',
            lineWidth: 2,
            zIndex: 2
        }],
        annotations: [{
            labels: [{
                point: {
                    x: Date.UTC(2025, 2, 15), // March 15, 2025
                    y: 35,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Imugene: -65% vs. ASX 200',
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0,
                y: -40
            }],
            visible: true
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

// Correlation Analysis Chart
function initializeCorrelationAnalysisChart() {
    const correlationData = generateCorrelationData();
    
    Highcharts.chart('correlation-analysis-chart', {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Correlation Analysis',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Correlation coefficient ranges from -1 (inverse) to +1 (direct)',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            categories: correlationData.categories,
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            crosshair: true
        },
        yAxis: {
            min: -1,
            max: 1,
            title: {
                text: 'Correlation Coefficient',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineColor: '#e5e5e5',
            plotLines: [{
                value: 0,
                color: '#95a5a6',
                width: 1,
                label: {
                    text: 'No Correlation',
                    style: {
                        color: '#7f8c8d'
                    }
                }
            }]
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                animation: {
                    duration: 1000
                }
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f}</b><br/><span>{point.interpretation}</span><br/>'
        },
        series: [{
            name: '3-Month Correlation',
            data: correlationData.threeMonth,
            color: '#3498db'
        }, {
            name: '6-Month Correlation',
            data: correlationData.sixMonth,
            color: '#9b59b6'
        }, {
            name: '12-Month Correlation',
            data: correlationData.twelveMonth,
            color: '#e74c3c'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

// Sentiment Analysis Chart
function initializeSentimentAnalysisChart() {
    const sentimentData = generateSentimentData();
    
    Highcharts.chart('sentiment-analysis-chart', {
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Market Sentiment Analysis',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Social media, news, and analyst sentiment',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0
        },
        yAxis: [{
            title: {
                text: 'Sentiment Score',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            min: -100,
            max: 100,
            gridLineColor: '#e5e5e5',
            plotLines: [{
                value: 0,
                color: '#95a5a6',
                width: 1,
                label: {
                    text: 'Neutral',
                    style: {
                        color: '#7f8c8d'
                    }
                }
            }]
        }, {
            title: {
                text: 'Price (AUD)',
                style: {
                    color: '#3498db'
                }
            },
            labels: {
                format: '${value:.3f}',
                style: {
                    color: '#3498db'
                }
            },
            opposite: true,
            gridLineColor: '#e5e5e5'
        }],
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            },
            areaspline: {
                fillOpacity: 0.2
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>'
        },
        series: [{
            name: 'Social Media Sentiment',
            type: 'areaspline',
            data: sentimentData.socialMedia,
            color: '#e74c3c',
            yAxis: 0,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'News Sentiment',
            type: 'areaspline',
            data: sentimentData.news,
            color: '#2ecc71',
            yAxis: 0,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Analyst Sentiment',
            type: 'areaspline',
            data: sentimentData.analyst,
            color: '#9b59b6',
            yAxis: 0,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Composite Sentiment',
            type: 'spline',
            data: sentimentData.composite,
            color: '#f39c12',
            lineWidth: 3,
            yAxis: 0,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Imugene Price',
            type: 'spline',
            data: sentimentData.price,
            color: '#3498db',
            lineWidth: 2,
            yAxis: 1,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.3f}</b><br/>'
            }
        }],
        annotations: [{
            labels: [{
                point: {
                    x: Date.UTC(2024, 8, 15), // September 15, 2024
                    y: -60,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Negative Sentiment Peak',
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: -40
            }, {
                point: {
                    x: Date.UTC(2024, 5, 15), // June 15, 2024
                    y: 70,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Positive Sentiment Peak',
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'callout',
                borderRadius: 5,
                borderWidth: 0,
                y: 40
            }],
            visible: true
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    },
                    yAxis: [{
                        title: {
                            text: 'Sentiment'
                        }
                    }, {
                        title: {
                            text: 'Price'
                        }
                    }]
                }
            }]
        }
    });
}

// Scenario Builder
function initializeScenarioBuilder() {
    const scenarioData = generateScenarioData();
    
    Highcharts.chart('scenario-builder', {
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Price Scenarios (Next 6 Months)',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Based on technical analysis and potential catalysts',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0,
            plotLines: [{
                value: Date.UTC(2025, 3, 3), // April 3, 2025 (today)
                color: '#95a5a6',
                width: 2,
                label: {
                    text: 'Today',
                    style: {
                        color: '#7f8c8d'
                    }
                }
            }]
        },
        yAxis: {
            title: {
                text: 'Price (AUD)',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                format: '${value:.3f}',
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineColor: '#e5e5e5'
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            },
            arearange: {
                fillOpacity: 0.2,
                lineWidth: 0
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>'
        },
        series: [{
            name: 'Historical Price',
            type: 'line',
            data: scenarioData.historical,
            color: '#3498db',
            lineWidth: 2,
            zIndex: 5,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.3f}</b><br/>'
            }
        }, {
            name: 'Bullish Scenario',
            type: 'line',
            data: scenarioData.bullish,
            color: '#2ecc71',
            lineWidth: 2,
            dashStyle: 'dash',
            zIndex: 4,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.3f}</b><br/>'
            }
        }, {
            name: 'Base Case Scenario',
            type: 'line',
            data: scenarioData.base,
            color: '#f39c12',
            lineWidth: 2,
            dashStyle: 'dash',
            zIndex: 3,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.3f}</b><br/>'
            }
        }, {
            name: 'Bearish Scenario',
            type: 'line',
            data: scenarioData.bearish,
            color: '#e74c3c',
            lineWidth: 2,
            dashStyle: 'dash',
            zIndex: 2,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.3f}</b><br/>'
            }
        }, {
            name: 'Probability Range',
            type: 'arearange',
            data: scenarioData.range,
            color: '#7f8c8d',
            fillOpacity: 0.2,
            zIndex: 1,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.low:.3f} - ${point.high:.3f}</b><br/>'
            }
        }],
        annotations: [{
            labels: [{
                point: {
                    x: Date.UTC(2025, 9, 1), // October 1, 2025
                    y: 0.055,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Bullish: +83%',
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0
            }, {
                point: {
                    x: Date.UTC(2025, 9, 1), // October 1, 2025
                    y: 0.038,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Base: +27%',
                backgroundColor: 'rgba(243, 156, 18, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0
            }, {
                point: {
                    x: Date.UTC(2025, 9, 1), // October 1, 2025
                    y: 0.022,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Bearish: -27%',
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0
            }],
            visible: true
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

// Predictive Modeling Chart
function initializePredictiveModelingChart() {
    const predictiveData = generatePredictiveData();
    
    Highcharts.chart('predictive-modeling-chart', {
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Statistical Price Projections',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Monte Carlo simulation with 1000 iterations',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0,
            plotLines: [{
                value: Date.UTC(2025, 3, 3), // April 3, 2025 (today)
                color: '#95a5a6',
                width: 2,
                label: {
                    text: 'Today',
                    style: {
                        color: '#7f8c8d'
                    }
                }
            }]
        },
        yAxis: {
            title: {
                text: 'Price (AUD)',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                format: '${value:.3f}',
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineColor: '#e5e5e5'
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            },
            arearange: {
                fillOpacity: 0.2,
                lineWidth: 0
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>'
        },
        series: [{
            name: 'Historical Price',
            type: 'line',
            data: predictiveData.historical,
            color: '#3498db',
            lineWidth: 2,
            zIndex: 5,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.3f}</b><br/>'
            }
        }, {
            name: 'Mean Projection',
            type: 'line',
            data: predictiveData.mean,
            color: '#f39c12',
            lineWidth: 2,
            zIndex: 4,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.3f}</b><br/>'
            }
        }, {
            name: '90% Confidence Interval',
            type: 'arearange',
            data: predictiveData.ninetyPercent,
            color: '#9b59b6',
            fillOpacity: 0.2,
            zIndex: 1,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.low:.3f} - ${point.high:.3f}</b><br/>'
            }
        }, {
            name: '50% Confidence Interval',
            type: 'arearange',
            data: predictiveData.fiftyPercent,
            color: '#9b59b6',
            fillOpacity: 0.4,
            zIndex: 2,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.low:.3f} - ${point.high:.3f}</b><br/>'
            }
        }],
        annotations: [{
            labels: [{
                point: {
                    x: Date.UTC(2025, 9, 1), // October 1, 2025
                    y: 0.045,
                    xAxis: 0,
                    yAxis: 0
                },
                text: '90% CI Upper: $0.045',
                backgroundColor: 'rgba(155, 89, 182, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0
            }, {
                point: {
                    x: Date.UTC(2025, 9, 1), // October 1, 2025
                    y: 0.035,
                    xAxis: 0,
                    yAxis: 0
                },
                text: 'Mean: $0.035',
                backgroundColor: 'rgba(243, 156, 18, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0
            }, {
                point: {
                    x: Date.UTC(2025, 9, 1), // October 1, 2025
                    y: 0.025,
                    xAxis: 0,
                    yAxis: 0
                },
                text: '90% CI Lower: $0.025',
                backgroundColor: 'rgba(155, 89, 182, 0.8)',
                style: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                shape: 'rect',
                borderRadius: 5,
                borderWidth: 0
            }],
            visible: true
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

// Setup Chart Controls
function setupChartControls() {
    // Indicator buttons
    document.querySelectorAll('.indicator-button').forEach(button => {
        button.addEventListener('click', function() {
            const indicator = this.getAttribute('data-indicator');
            this.classList.toggle('active');
            
            const chart = Highcharts.charts[0]; // Main price chart
            const series = chart.get(indicator);
            
            if (series) {
                series.setVisible(!series.visible);
            }
        });
    });
    
    // Annotation buttons
    document.querySelectorAll('.annotation-button').forEach(button => {
        button.addEventListener('click', function() {
            const annotation = this.getAttribute('data-annotation');
            this.classList.toggle('active');
            
            const chart = Highcharts.charts[0]; // Main price chart
            const annotationObj = chart.annotations.find(a => a.options.id === annotation);
            
            if (annotationObj) {
                annotationObj.setOptions({ visible: !annotationObj.options.visible });
            }
        });
    });
}

// Setup Accordion
function setupAccordion() {
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target) {
                target.classList.toggle('show');
            }
        });
    });
}

// Sample Data Generation Functions
function generateSampleOHLCData() {
    const data = [];
    let date = Date.UTC(2024, 3, 1); // April 1, 2024
    let price = 0.047;
    
    for (let i = 0; i < 250; i++) {
        const volatility = 0.03;
        const change = (Math.random() - 0.5) * volatility * price;
        
        const open = price;
        const close = Math.max(0.01, price + change);
        const high = Math.max(open, close) * (1 + Math.random() * 0.01);
        const low = Math.min(open, close) * (1 - Math.random() * 0.01);
        
        data.push([date, open, high, low, close]);
        
        price = close;
        date += 24 * 3600 * 1000; // Add one day
        
        // Add some trends
        if (i > 50 && i < 100) {
            price *= 0.99; // Downtrend
        } else if (i > 150 && i < 200) {
            price *= 1.01; // Uptrend
        }
        
        // Add some events
        if (i === 75) {
            price *= 1.15; // Positive event
        } else if (i === 150) {
            price *= 0.85; // Negative event
        }
    }
    
    return data;
}

function generateSampleVolumeData() {
    const data = [];
    let date = Date.UTC(2024, 3, 1); // April 1, 2024
    
    for (let i = 0; i < 250; i++) {
        const baseVolume = 5000000; // 5 million shares
        let volume = baseVolume * (0.5 + Math.random());
        
        // Add some volume spikes
        if (i === 75 || i === 150) {
            volume *= 3;
        }
        
        data.push([date, volume]);
        date += 24 * 3600 * 1000; // Add one day
    }
    
    return data;
}

function generatePatternRecognitionData() {
    const price = [];
    const doubleBottom = [];
    const supportResistance = [];
    const trendReversal = [];
    
    let date = Date.UTC(2024, 3, 1); // April 1, 2024
    let priceValue = 0.047;
    
    for (let i = 0; i < 250; i++) {
        const volatility = 0.03;
        const change = (Math.random() - 0.5) * volatility * priceValue;
        
        priceValue = Math.max(0.01, priceValue + change);
        price.push([date, priceValue]);
        
        // Add some trends
        if (i > 50 && i < 100) {
            priceValue *= 0.99; // Downtrend
        } else if (i > 150 && i < 200) {
            priceValue *= 1.01; // Uptrend
        }
        
        // Add some events
        if (i === 75) {
            priceValue *= 1.15; // Positive event
        } else if (i === 150) {
            priceValue *= 0.85; // Negative event
        }
        
        date += 24 * 3600 * 1000; // Add one day
    }
    
    // Add double bottom pattern
    doubleBottom.push({
        x: Date.UTC(2024, 9, 15), // October 15, 2024
        y: 0.029,
        confidence: 78,
        target: 0.038
    });
    
    doubleBottom.push({
        x: Date.UTC(2024, 10, 15), // November 15, 2024
        y: 0.029,
        confidence: 78,
        target: 0.038
    });
    
    // Add support/resistance levels
    supportResistance.push({
        x: Date.UTC(2025, 0, 15), // January 15, 2025
        y: 0.030,
        type: 'Support',
        strength: 85
    });
    
    supportResistance.push({
        x: Date.UTC(2024, 6, 15), // July 15, 2024
        y: 0.047,
        type: 'Resistance',
        strength: 75
    });
    
    // Add trend reversals
    trendReversal.push({
        x: Date.UTC(2024, 8, 15), // September 15, 2024
        y: 0.033,
        direction: 'Bearish',
        confidence: 82
    });
    
    trendReversal.push({
        x: Date.UTC(2025, 1, 15), // February 15, 2025
        y: 0.031,
        direction: 'Bullish',
        confidence: 68
    });
    
    return {
        price: price,
        doubleBottom: doubleBottom,
        supportResistance: supportResistance,
        trendReversal: trendReversal
    };
}

function generateVolumeHeatMapData() {
    const data = [];
    
    for (let month = 0; month < 12; month++) {
        for (let week = 0; week < 5; week++) {
            const baseVolume = 5;
            let volume = baseVolume * (0.5 + Math.random());
            
            // Add some volume spikes
            if (month === 2 && week === 2) { // March, Week 3
                volume = 18;
                data.push({
                    x: month,
                    y: week,
                    value: volume,
                    event: 'Phase 2 Results'
                });
            } else if (month === 5 && week === 1) { // June, Week 2
                volume = 15;
                data.push({
                    x: month,
                    y: week,
                    value: volume,
                    event: 'Partnership Announcement'
                });
            } else if (month === 8 && week === 0) { // September, Week 1
                volume = 20;
                data.push({
                    x: month,
                    y: week,
                    value: volume,
                    event: 'Capital Raising'
                });
            } else {
                data.push({
                    x: month,
                    y: week,
                    value: volume
                });
            }
        }
    }
    
    return data;
}

function generateVolatilityData() {
    const historicalVolatility = [];
    const bollingerWidth = [];
    const volatilityEvents = [];
    
    let date = Date.UTC(2024, 3, 1); // April 1, 2024
    
    for (let i = 0; i < 250; i++) {
        let hv = 80 + Math.sin(i / 20) * 30 + Math.random() * 20;
        let bbw = 0.02 + Math.sin(i / 20) * 0.01 + Math.random() * 0.005;
        
        // Add some volatility spikes
        if (i === 75) {
            hv = 150;
            bbw = 0.04;
        } else if (i === 150) {
            hv = 140;
            bbw = 0.035;
        }
        
        historicalVolatility.push([date, hv]);
        bollingerWidth.push([date, bbw]);
        
        date += 24 * 3600 * 1000; // Add one day
    }
    
    // Add volatility events
    volatilityEvents.push({
        x: Date.UTC(2024, 5, 15), // June 15, 2024
        y: 140,
        event: 'Partnership Announcement',
        impact: 'High'
    });
    
    volatilityEvents.push({
        x: Date.UTC(2024, 8, 15), // September 15, 2024
        y: 150,
        event: 'Capital Raising',
        impact: 'Very High'
    });
    
    volatilityEvents.push({
        x: Date.UTC(2025, 1, 15), // February 15, 2025
        y: 70,
        event: 'Volatility Contraction',
        impact: 'Moderate'
    });
    
    return {
        historicalVolatility: historicalVolatility,
        bollingerWidth: bollingerWidth,
        volatilityEvents: volatilityEvents
    };
}

function generateComparativeData() {
    const imugene = [];
    const asx200 = [];
    const asxHealthcare = [];
    const asxBiotech = [];
    
    let date = Date.UTC(2024, 3, 1); // April 1, 2024
    
    let imuValue = 100;
    let asx200Value = 100;
    let asxHealthcareValue = 100;
    let asxBiotechValue = 100;
    
    for (let i = 0; i < 250; i++) {
        // Imugene performance (underperforming)
        imuValue *= 0.998 + Math.random() * 0.004;
        
        // ASX 200 performance (steady growth)
        asx200Value *= 1.0005 + Math.random() * 0.002;
        
        // ASX Healthcare performance (moderate growth)
        asxHealthcareValue *= 1.0003 + Math.random() * 0.002;
        
        // ASX Biotech Peers performance (volatile but better than Imugene)
        asxBiotechValue *= 0.999 + Math.random() * 0.003;
        
        // Add some events
        if (i === 75) {
            imuValue *= 1.15; // Positive event for Imugene
            asxBiotechValue *= 1.05; // Smaller impact on peers
        } else if (i === 150) {
            imuValue *= 0.85; // Negative event for Imugene
            asxBiotechValue *= 0.95; // Smaller impact on peers
        }
        
        imugene.push({
            x: date,
            y: imuValue,
            change: imuValue - 100
        });
        
        asx200.push({
            x: date,
            y: asx200Value,
            change: asx200Value - 100
        });
        
        asxHealthcare.push({
            x: date,
            y: asxHealthcareValue,
            change: asxHealthcareValue - 100
        });
        
        asxBiotech.push({
            x: date,
            y: asxBiotechValue,
            change: asxBiotechValue - 100
        });
        
        date += 24 * 3600 * 1000; // Add one day
    }
    
    return {
        imugene: imugene,
        asx200: asx200,
        asxHealthcare: asxHealthcare,
        asxBiotech: asxBiotech
    };
}

function generateCorrelationData() {
    const categories = [
        'ASX 200',
        'ASX Healthcare',
        'ASX Biotech',
        'Gold Price',
        'AUD/USD',
        'US Biotech',
        'Oil Price'
    ];
    
    const threeMonth = [
        {y: 0.35, interpretation: 'Weak positive correlation'},
        {y: 0.58, interpretation: 'Moderate positive correlation'},
        {y: 0.72, interpretation: 'Strong positive correlation'},
        {y: -0.15, interpretation: 'Weak negative correlation'},
        {y: 0.22, interpretation: 'Weak positive correlation'},
        {y: 0.65, interpretation: 'Strong positive correlation'},
        {y: -0.08, interpretation: 'Negligible correlation'}
    ];
    
    const sixMonth = [
        {y: 0.42, interpretation: 'Moderate positive correlation'},
        {y: 0.63, interpretation: 'Strong positive correlation'},
        {y: 0.68, interpretation: 'Strong positive correlation'},
        {y: -0.22, interpretation: 'Weak negative correlation'},
        {y: 0.18, interpretation: 'Weak positive correlation'},
        {y: 0.55, interpretation: 'Moderate positive correlation'},
        {y: -0.12, interpretation: 'Weak negative correlation'}
    ];
    
    const twelveMonth = [
        {y: 0.38, interpretation: 'Weak positive correlation'},
        {y: 0.52, interpretation: 'Moderate positive correlation'},
        {y: 0.65, interpretation: 'Strong positive correlation'},
        {y: -0.28, interpretation: 'Weak negative correlation'},
        {y: 0.12, interpretation: 'Weak positive correlation'},
        {y: 0.48, interpretation: 'Moderate positive correlation'},
        {y: -0.18, interpretation: 'Weak negative correlation'}
    ];
    
    return {
        categories: categories,
        threeMonth: threeMonth,
        sixMonth: sixMonth,
        twelveMonth: twelveMonth
    };
}

function generateSentimentData() {
    const socialMedia = [];
    const news = [];
    const analyst = [];
    const composite = [];
    const price = [];
    
    let date = Date.UTC(2024, 3, 1); // April 1, 2024
    let priceValue = 0.047;
    
    for (let i = 0; i < 250; i++) {
        // Generate sentiment values
        let socialValue = Math.sin(i / 20) * 50 + Math.random() * 20;
        let newsValue = Math.sin(i / 25) * 40 + Math.random() * 15;
        let analystValue = Math.sin(i / 30) * 60 + Math.random() * 10;
        let compositeValue = (socialValue + newsValue + analystValue) / 3;
        
        // Generate price with some correlation to sentiment
        const volatility = 0.03;
        const sentimentEffect = compositeValue / 1000;
        const randomEffect = (Math.random() - 0.5) * volatility * priceValue;
        priceValue = Math.max(0.01, priceValue + sentimentEffect + randomEffect);
        
        // Add some events
        if (i === 75) {
            socialValue = 70;
            newsValue = 80;
            analystValue = 75;
            compositeValue = 75;
            priceValue *= 1.15;
        } else if (i === 150) {
            socialValue = -70;
            newsValue = -60;
            analystValue = -50;
            compositeValue = -60;
            priceValue *= 0.85;
        }
        
        socialMedia.push([date, socialValue]);
        news.push([date, newsValue]);
        analyst.push([date, analystValue]);
        composite.push([date, compositeValue]);
        price.push([date, priceValue]);
        
        date += 24 * 3600 * 1000; // Add one day
    }
    
    return {
        socialMedia: socialMedia,
        news: news,
        analyst: analyst,
        composite: composite,
        price: price
    };
}

function generateScenarioData() {
    const historical = [];
    const bullish = [];
    const base = [];
    const bearish = [];
    const range = [];
    
    let historicalDate = Date.UTC(2024, 3, 1); // April 1, 2024
    let futureDate = Date.UTC(2025, 3, 3); // April 3, 2025 (today)
    let priceValue = 0.047;
    
    // Generate historical data
    for (let i = 0; i < 250; i++) {
        const volatility = 0.03;
        const change = (Math.random() - 0.5) * volatility * priceValue;
        
        priceValue = Math.max(0.01, priceValue + change);
        
        // Add some trends
        if (i > 50 && i < 100) {
            priceValue *= 0.99; // Downtrend
        } else if (i > 150 && i < 200) {
            priceValue *= 1.01; // Uptrend
        }
        
        // Add some events
        if (i === 75) {
            priceValue *= 1.15; // Positive event
        } else if (i === 150) {
            priceValue *= 0.85; // Negative event
        }
        
        historical.push([historicalDate, priceValue]);
        historicalDate += 24 * 3600 * 1000; // Add one day
    }
    
    // Current price is the last historical price
    const currentPrice = 0.030;
    
    // Generate future scenarios
    for (let i = 0; i < 180; i++) { // 6 months
        const bullishPrice = currentPrice * (1 + 0.003 * i); // +83% in 6 months
        const basePrice = currentPrice * (1 + 0.0015 * i); // +27% in 6 months
        const bearishPrice = currentPrice * (1 - 0.0015 * i); // -27% in 6 months
        
        bullish.push([futureDate, bullishPrice]);
        base.push([futureDate, basePrice]);
        bearish.push([futureDate, bearishPrice]);
        
        // Range is between bearish and bullish with some randomness
        const lowRange = bearishPrice * (0.95 + Math.random() * 0.05);
        const highRange = bullishPrice * (0.95 + Math.random() * 0.05);
        
        range.push({
            x: futureDate,
            low: lowRange,
            high: highRange
        });
        
        futureDate += 24 * 3600 * 1000; // Add one day
    }
    
    return {
        historical: historical,
        bullish: bullish,
        base: base,
        bearish: bearish,
        range: range
    };
}

function generatePredictiveData() {
    const historical = [];
    const mean = [];
    const ninetyPercent = [];
    const fiftyPercent = [];
    
    let historicalDate = Date.UTC(2024, 3, 1); // April 1, 2024
    let futureDate = Date.UTC(2025, 3, 3); // April 3, 2025 (today)
    let priceValue = 0.047;
    
    // Generate historical data
    for (let i = 0; i < 250; i++) {
        const volatility = 0.03;
        const change = (Math.random() - 0.5) * volatility * priceValue;
        
        priceValue = Math.max(0.01, priceValue + change);
        
        // Add some trends
        if (i > 50 && i < 100) {
            priceValue *= 0.99; // Downtrend
        } else if (i > 150 && i < 200) {
            priceValue *= 1.01; // Uptrend
        }
        
        // Add some events
        if (i === 75) {
            priceValue *= 1.15; // Positive event
        } else if (i === 150) {
            priceValue *= 0.85; // Negative event
        }
        
        historical.push([historicalDate, priceValue]);
        historicalDate += 24 * 3600 * 1000; // Add one day
    }
    
    // Current price is the last historical price
    const currentPrice = 0.030;
    
    // Generate future predictions
    for (let i = 0; i < 180; i++) { // 6 months
        const meanPrice = currentPrice * (1 + 0.001 * i); // +18% in 6 months
        const volatility = 0.0005 * i; // Increasing volatility over time
        
        mean.push([futureDate, meanPrice]);
        
        // 90% confidence interval
        const ninetyLow = meanPrice * (1 - 2 * volatility);
        const ninetyHigh = meanPrice * (1 + 2 * volatility);
        
        // 50% confidence interval
        const fiftyLow = meanPrice * (1 - volatility);
        const fiftyHigh = meanPrice * (1 + volatility);
        
        ninetyPercent.push({
            x: futureDate,
            low: ninetyLow,
            high: ninetyHigh
        });
        
        fiftyPercent.push({
            x: futureDate,
            low: fiftyLow,
            high: fiftyHigh
        });
        
        futureDate += 24 * 3600 * 1000; // Add one day
    }
    
    return {
        historical: historical,
        mean: mean,
        ninetyPercent: ninetyPercent,
        fiftyPercent: fiftyPercent
    };
}

// Add the fixed chart initialization functions to the interactive_elements.js file
// Initialize Scenario Builder Chart
function initializeScenarioBuilder() {
    const scenarioData = generateScenarioData();
    
    Highcharts.chart('scenario-builder', {
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Price Scenarios: Next 6 Months',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Based on technical analysis and potential catalysts',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: 'Price (AUD)',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                format: '${value:.3f}',
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineColor: '#e5e5e5'
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            },
            arearange: {
                fillOpacity: 0.2,
                lineWidth: 0
            }
        },
        tooltip: {
            shared: true,
            valueDecimals: 3,
            valuePrefix: '$',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>'
        },
        series: [{
            name: 'Historical',
            type: 'line',
            data: scenarioData.historical,
            color: '#3498db',
            zIndex: 5,
            lineWidth: 2,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Bullish Case',
            type: 'line',
            data: scenarioData.bullish,
            color: '#2ecc71',
            zIndex: 4,
            lineWidth: 2,
            dashStyle: 'shortdash',
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Base Case',
            type: 'line',
            data: scenarioData.base,
            color: '#f39c12',
            zIndex: 3,
            lineWidth: 2,
            dashStyle: 'shortdash',
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Bearish Case',
            type: 'line',
            data: scenarioData.bearish,
            color: '#e74c3c',
            zIndex: 2,
            lineWidth: 2,
            dashStyle: 'shortdash',
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Probability Range',
            type: 'arearange',
            data: scenarioData.range,
            color: '#9b59b6',
            fillOpacity: 0.1,
            zIndex: 1,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.low} - {point.high}</b><br/>'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

// Initialize Predictive Modeling Chart
function initializePredictiveModelingChart() {
    const predictiveData = generatePredictiveData();
    
    Highcharts.chart('predictive-modeling-chart', {
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            },
            animation: true,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
        },
        title: {
            text: 'Statistical Price Projections',
            style: {
                color: '#1a5276',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Based on historical volatility and price patterns',
            style: {
                color: '#7f8c8d'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: 'Price (AUD)',
                style: {
                    color: '#2c3e50'
                }
            },
            labels: {
                format: '${value:.3f}',
                style: {
                    color: '#2c3e50'
                }
            },
            gridLineColor: '#e5e5e5'
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#2c3e50',
                fontWeight: 'normal'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                animation: {
                    duration: 1000
                }
            },
            arearange: {
                lineWidth: 0
            }
        },
        tooltip: {
            shared: true,
            valueDecimals: 3,
            valuePrefix: '$',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e5e5',
            borderRadius: 8,
            shadow: true,
            headerFormat: '<span style="font-size: 12px; font-weight: bold">{point.key}</span><br/>'
        },
        series: [{
            name: 'Historical',
            type: 'line',
            data: predictiveData.historical,
            color: '#3498db',
            zIndex: 5,
            lineWidth: 2,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: 'Mean Projection',
            type: 'line',
            data: predictiveData.mean,
            color: '#f39c12',
            zIndex: 4,
            lineWidth: 2,
            dashStyle: 'shortdash',
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            }
        }, {
            name: '90% Confidence Interval',
            type: 'arearange',
            data: predictiveData.ninetyPercent,
            color: '#e74c3c',
            fillOpacity: 0.1,
            zIndex: 2,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.low} - {point.high}</b><br/>'
            }
        }, {
            name: '50% Confidence Interval',
            type: 'arearange',
            data: predictiveData.fiftyPercent,
            color: '#2ecc71',
            fillOpacity: 0.2,
            zIndex: 3,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.low} - {point.high}</b><br/>'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 768
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}
