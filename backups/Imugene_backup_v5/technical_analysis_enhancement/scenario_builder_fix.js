// Scenario Builder Chart Fix
document.addEventListener('DOMContentLoaded', function() {
    // Generate scenario data function
    function generateScenarioData() {
        const today = new Date();
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(today.getMonth() + 6);
        
        // Historical data (last 3 months)
        const historical = [];
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        
        for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 5)) {
            // Generate some realistic historical data
            const volatility = 0.005;
            const trend = -0.0001;
            const randomWalk = (Math.random() - 0.5) * volatility;
            const daysSince = Math.floor((d - threeMonthsAgo) / (1000 * 60 * 60 * 24));
            
            let price = 0.045 + trend * daysSince + randomWalk;
            if (d >= today) {
                price = 0.032; // Current price
            }
            
            historical.push([d.getTime(), parseFloat(price.toFixed(3))]);
        }
        
        // Future projections
        const bullish = [];
        const base = [];
        const bearish = [];
        const range = [];
        
        for (let d = new Date(today); d <= sixMonthsLater; d.setDate(d.getDate() + 5)) {
            const daysSince = Math.floor((d - today) / (1000 * 60 * 60 * 24));
            
            // Base case: slight uptrend
            const basePrice = 0.032 * (1 + daysSince * 0.0008);
            
            // Bullish case: stronger uptrend
            const bullishPrice = 0.032 * (1 + daysSince * 0.0025);
            
            // Bearish case: downtrend
            const bearishPrice = 0.032 * (1 - daysSince * 0.0006);
            
            // Range: increases over time to show increasing uncertainty
            const uncertainty = 0.0005 * Math.sqrt(daysSince);
            const rangeLow = basePrice * (1 - uncertainty);
            const rangeHigh = basePrice * (1 + uncertainty);
            
            if (d.getTime() === today.getTime()) {
                // Start all projections from current price
                bullish.push([d.getTime(), 0.032]);
                base.push([d.getTime(), 0.032]);
                bearish.push([d.getTime(), 0.032]);
            } else {
                bullish.push([d.getTime(), parseFloat(bullishPrice.toFixed(3))]);
                base.push([d.getTime(), parseFloat(basePrice.toFixed(3))]);
                bearish.push([d.getTime(), parseFloat(bearishPrice.toFixed(3))]);
            }
            
            range.push([
                d.getTime(),
                parseFloat(rangeLow.toFixed(3)),
                parseFloat(rangeHigh.toFixed(3))
            ]);
        }
        
        return {
            historical: historical,
            bullish: bullish,
            base: base,
            bearish: bearish,
            range: range
        };
    }

    // Check if the scenario-builder-chart element exists (using the correct ID from HTML)
    if (document.getElementById('scenario-builder-chart')) {
        // Generate scenario data
        const scenarioData = generateScenarioData();
        
        // Create the scenario builder chart
        Highcharts.chart('scenario-builder-chart', {
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
        
        // Set up interactive controls for the scenario chart
        const controlsContainer = document.getElementById('scenario-controls');
        if (controlsContainer) {
            // The controls are already in the HTML, we just need to add event listeners
            const clinicalSuccessSlider = document.getElementById('clinical-success');
            const marketSentimentSlider = document.getElementById('market-sentiment');
            const cashRunwaySlider = document.getElementById('cash-runway');
            
            if (clinicalSuccessSlider && marketSentimentSlider && cashRunwaySlider) {
                // Add event listeners to update the chart when sliders change
                clinicalSuccessSlider.addEventListener('input', updateScenarioDisplay);
                marketSentimentSlider.addEventListener('input', updateScenarioDisplay);
                cashRunwaySlider.addEventListener('input', updateScenarioDisplay);
                
                function updateScenarioDisplay() {
                    // Update display values based on slider positions
                    const clinicalSuccess = parseInt(clinicalSuccessSlider.value);
                    const marketSentiment = parseInt(marketSentimentSlider.value);
                    const cashRunway = parseInt(cashRunwaySlider.value);
                    
                    // Update text displays
                    const clinicalSuccessValue = document.getElementById('clinical-success-value');
                    const marketSentimentValue = document.getElementById('market-sentiment-value');
                    const cashRunwayValue = document.getElementById('cash-runway-value');
                    
                    if (clinicalSuccessValue) clinicalSuccessValue.textContent = clinicalSuccess + '%';
                    
                    if (marketSentimentValue) {
                        let sentimentText = 'Neutral';
                        if (marketSentiment < 30) sentimentText = 'Bearish';
                        else if (marketSentiment > 70) sentimentText = 'Bullish';
                        marketSentimentValue.textContent = sentimentText;
                    }
                    
                    if (cashRunwayValue) {
                        let runwayText = 'Moderate';
                        if (cashRunway < 30) runwayText = 'High Concern';
                        else if (cashRunway > 70) runwayText = 'Low Concern';
                        cashRunwayValue.textContent = runwayText;
                    }
                }
                
                // Initialize displays
                updateScenarioDisplay();
            }
        }
    } else {
        console.error('Scenario builder chart container not found');
    }
});
