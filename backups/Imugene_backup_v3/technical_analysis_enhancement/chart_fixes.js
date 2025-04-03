// Combine both fixes into a single file for easier integration
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
