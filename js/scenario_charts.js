// Scenario Builder Chart Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create the scenario builder chart
    const scenarioBuilderChart = document.getElementById('scenario-builder-chart');
    
    if (scenarioBuilderChart) {
        // Chart configuration
        const options = {
            chart: {
                height: 450,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true
                    }
                },
                background: '#fff'
            },
            colors: ['#2E93fA', '#66DA26', '#FF4560'],
            stroke: {
                curve: 'smooth',
                width: 3
            },
            series: [
                {
                    name: 'Bullish Scenario',
                    data: [0.032, 0.034, 0.038, 0.045, 0.055, 0.068, 0.075, 0.082, 0.090, 0.098, 0.105, 0.115]
                },
                {
                    name: 'Base Case',
                    data: [0.032, 0.031, 0.033, 0.035, 0.036, 0.038, 0.040, 0.042, 0.043, 0.045, 0.047, 0.050]
                },
                {
                    name: 'Bearish Scenario',
                    data: [0.032, 0.030, 0.028, 0.026, 0.025, 0.024, 0.023, 0.022, 0.021, 0.020, 0.019, 0.018]
                }
            ],
            title: {
                text: 'Price Scenarios (12-Month Projection)',
                align: 'center',
                style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#263238'
                }
            },
            subtitle: {
                text: 'Drag sliders below to adjust scenario parameters',
                align: 'center',
                style: {
                    fontSize: '14px',
                    color: '#607D8B'
                }
            },
            markers: {
                size: 5,
                hover: {
                    size: 7
                }
            },
            xaxis: {
                categories: ['Current', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
                title: {
                    text: 'Months',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Share Price (AUD)',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    formatter: function(value) {
                        return '$' + value.toFixed(3);
                    },
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                floating: false,
                fontSize: '14px'
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function(value) {
                        return '$' + value.toFixed(3);
                    }
                }
            },
            annotations: {
                points: [
                    {
                        x: 'Current',
                        y: 0.032,
                        marker: {
                            size: 6,
                            fillColor: '#FFF',
                            strokeColor: '#2E93fA',
                            strokeWidth: 2
                        },
                        label: {
                            text: 'Current Price: $0.032',
                            borderColor: '#2E93fA',
                            style: {
                                fontSize: '12px',
                                background: '#2E93fA',
                                color: '#fff',
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 5,
                                    bottom: 5
                                }
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#e0e0e0',
                row: {
                    colors: ['#f5f5f5', 'transparent'],
                    opacity: 0.5
                }
            }
        };

        // Create the chart
        const chart = new ApexCharts(scenarioBuilderChart, options);
        chart.render();

        // Add interactive controls
        const controlsContainer = document.getElementById('scenario-controls');
        if (controlsContainer) {
            controlsContainer.innerHTML = `
                <div class="scenario-sliders">
                    <div class="slider-container">
                        <label for="clinical-success">Clinical Trial Success Impact:</label>
                        <input type="range" id="clinical-success" min="0" max="100" value="50" class="slider">
                        <span id="clinical-success-value">50%</span>
                    </div>
                    <div class="slider-container">
                        <label for="market-sentiment">Market Sentiment:</label>
                        <input type="range" id="market-sentiment" min="0" max="100" value="50" class="slider">
                        <span id="market-sentiment-value">Neutral</span>
                    </div>
                    <div class="slider-container">
                        <label for="cash-runway">Cash Runway Concern:</label>
                        <input type="range" id="cash-runway" min="0" max="100" value="50" class="slider">
                        <span id="cash-runway-value">Moderate</span>
                    </div>
                </div>
            `;

            // Add event listeners to sliders
            document.getElementById('clinical-success').addEventListener('input', updateScenarios);
            document.getElementById('market-sentiment').addEventListener('input', updateScenarios);
            document.getElementById('cash-runway').addEventListener('input', updateScenarios);

            function updateScenarios() {
                const clinicalSuccess = parseInt(document.getElementById('clinical-success').value);
                const marketSentiment = parseInt(document.getElementById('market-sentiment').value);
                const cashRunway = parseInt(document.getElementById('cash-runway').value);

                // Update display values
                document.getElementById('clinical-success-value').textContent = clinicalSuccess + '%';
                
                let sentimentText = 'Neutral';
                if (marketSentiment < 30) sentimentText = 'Bearish';
                else if (marketSentiment > 70) sentimentText = 'Bullish';
                document.getElementById('market-sentiment-value').textContent = sentimentText;
                
                let runwayText = 'Moderate';
                if (cashRunway < 30) runwayText = 'High Concern';
                else if (cashRunway > 70) runwayText = 'Low Concern';
                document.getElementById('cash-runway-value').textContent = runwayText;

                // Calculate new scenario values based on slider inputs
                const bullishMultiplier = 1 + (clinicalSuccess / 100) * 0.5 + (marketSentiment / 100) * 0.3 + ((100 - cashRunway) / 100) * -0.2;
                const baseMultiplier = 1 + (clinicalSuccess / 100) * 0.2 + ((marketSentiment - 50) / 100) * 0.1 + ((cashRunway - 50) / 100) * 0.1;
                const bearishMultiplier = 1 - (clinicalSuccess / 100) * 0.1 - (marketSentiment / 100) * 0.2 + ((100 - cashRunway) / 100) * 0.3;

                // Update chart data
                const baseData = [0.032, 0.031, 0.033, 0.035, 0.036, 0.038, 0.040, 0.042, 0.043, 0.045, 0.047, 0.050];
                const bullishData = baseData.map((val, i) => (val * (1 + (i * 0.05 * bullishMultiplier))).toFixed(3) * 1);
                const baseCaseData = baseData.map((val, i) => (val * (1 + (i * 0.02 * baseMultiplier))).toFixed(3) * 1);
                const bearishData = baseData.map((val, i) => (val * (1 - (i * 0.03 * bearishMultiplier))).toFixed(3) * 1);

                // First value should always be current price
                bullishData[0] = 0.032;
                baseCaseData[0] = 0.032;
                bearishData[0] = 0.032;

                chart.updateSeries([
                    { name: 'Bullish Scenario', data: bullishData },
                    { name: 'Base Case', data: baseCaseData },
                    { name: 'Bearish Scenario', data: bearishData }
                ]);
            }
        }
    }

    // Create the predictive modeling chart
    const predictiveModelingChart = document.getElementById('predictive-modeling-chart');
    
    if (predictiveModelingChart) {
        // Chart configuration
        const options = {
            chart: {
                height: 450,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true
                },
                background: '#fff'
            },
            colors: ['#2E93fA', '#66DA26', '#FF4560', '#775DD0', '#FEB019'],
            stroke: {
                width: [4, 2, 2, 2, 2],
                curve: 'smooth',
                dashArray: [0, 0, 5, 5, 0]
            },
            series: [
                {
                    name: 'Price',
                    type: 'line',
                    data: [0.032, 0.033, 0.031, 0.034, 0.032, 0.030, 0.029, 0.031, 0.033, 0.032, 0.034, 0.035]
                },
                {
                    name: 'Linear Regression',
                    type: 'line',
                    data: [0.032, 0.0322, 0.0324, 0.0326, 0.0328, 0.033, 0.0332, 0.0334, 0.0336, 0.0338, 0.034, 0.0342]
                },
                {
                    name: 'Upper Bound (95%)',
                    type: 'line',
                    data: [0.032, 0.0335, 0.035, 0.0365, 0.038, 0.0395, 0.041, 0.0425, 0.044, 0.0455, 0.047, 0.0485]
                },
                {
                    name: 'Lower Bound (95%)',
                    type: 'line',
                    data: [0.032, 0.0305, 0.029, 0.0275, 0.026, 0.0245, 0.023, 0.0215, 0.02, 0.0185, 0.017, 0.0155]
                },
                {
                    name: 'Moving Average (20-day)',
                    type: 'line',
                    data: [0.0315, 0.0318, 0.032, 0.0322, 0.0325, 0.0327, 0.033, 0.0332, 0.0335, 0.0337, 0.034, 0.0342]
                }
            ],
            fill: {
                opacity: [1, 0.5, 0.25, 0.25, 0.5]
            },
            title: {
                text: 'Statistical Price Projections (12-Month)',
                align: 'center',
                style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#263238'
                }
            },
            subtitle: {
                text: 'Based on historical volatility and regression analysis',
                align: 'center',
                style: {
                    fontSize: '14px',
                    color: '#607D8B'
                }
            },
            markers: {
                size: [5, 0, 0, 0, 0],
                hover: {
                    size: 7
                }
            },
            xaxis: {
                categories: ['Current', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
                title: {
                    text: 'Months',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Share Price (AUD)',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    formatter: function(value) {
                        return '$' + value.toFixed(3);
                    },
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                floating: false,
                fontSize: '14px'
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function(value) {
                        return '$' + value.toFixed(3);
                    }
                }
            },
            annotations: {
                points: [
                    {
                        x: 'Current',
                        y: 0.032,
                        marker: {
                            size: 6,
                            fillColor: '#FFF',
                            strokeColor: '#2E93fA',
                            strokeWidth: 2
                        },
                        label: {
                            text: 'Current Price: $0.032',
                            borderColor: '#2E93fA',
                            style: {
                                fontSize: '12px',
                                background: '#2E93fA',
                                color: '#fff',
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 5,
                                    bottom: 5
                                }
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#e0e0e0',
                row: {
                    colors: ['#f5f5f5', 'transparent'],
                    opacity: 0.5
                }
            }
        };

        // Create the chart
        const chart = new ApexCharts(predictiveModelingChart, options);
        chart.render();

        // Add interactive controls
        const controlsContainer = document.getElementById('predictive-controls');
        if (controlsContainer) {
            controlsContainer.innerHTML = `
                <div class="predictive-controls">
                    <div class="control-container">
                        <label for="confidence-interval">Confidence Interval:</label>
                        <select id="confidence-interval" class="control-select">
                            <option value="95">95% (Default)</option>
                            <option value="90">90%</option>
                            <option value="80">80%</option>
                            <option value="70">70%</option>
                        </select>
                    </div>
                    <div class="control-container">
                        <label for="regression-type">Regression Type:</label>
                        <select id="regression-type" class="control-select">
                            <option value="linear">Linear (Default)</option>
                            <option value="polynomial">Polynomial</option>
                            <option value="exponential">Exponential</option>
                        </select>
                    </div>
                    <div class="control-container">
                        <label for="volatility-factor">Volatility Factor:</label>
                        <select id="volatility-factor" class="control-select">
                            <option value="1">Normal (Default)</option>
                            <option value="1.5">High</option>
                            <option value="0.5">Low</option>
                        </select>
                    </div>
                </div>
            `;

            // Add event listeners to controls
            document.getElementById('confidence-interval').addEventListener('change', updatePredictiveModel);
            document.getElementById('regression-type').addEventListener('change', updatePredictiveModel);
            document.getElementById('volatility-factor').addEventListener('change', updatePredictiveModel);

            function updatePredictiveModel() {
                const confidenceInterval = parseInt(document.getElementById('confidence-interval').value);
                const regressionType = document.getElementById('regression-type').value;
                const volatilityFactor = parseFloat(document.getElementById('volatility-factor').value);

                // Base linear regression line
                let regressionLine = [0.032, 0.0322, 0.0324, 0.0326, 0.0328, 0.033, 0.0332, 0.0334, 0.0336, 0.0338, 0.034, 0.0342];
                
                // Adjust based on regression type
                if (regressionType === 'polynomial') {
                    regressionLine = [0.032, 0.0315, 0.031, 0.0305, 0.031, 0.0315, 0.032, 0.0325, 0.033, 0.0335, 0.034, 0.0345];
                } else if (regressionType === 'exponential') {
                    regressionLine = [0.032, 0.0322, 0.0325, 0.033, 0.0335, 0.034, 0.0345, 0.035, 0.0355, 0.036, 0.0365, 0.037];
                }

                // Calculate confidence intervals based on selected parameters
                const confidenceFactor = (confidenceInterval === 95) ? 1.96 : 
                                        (confidenceInterval === 90) ? 1.645 : 
                                        (confidenceInterval === 80) ? 1.28 : 1.04;
                
                // Base volatility
                const baseVolatility = 0.0015;
                const adjustedVolatility = baseVolatility * volatilityFactor;

                // Calculate upper and lower bounds
                const upperBound = regressionLine.map((val, i) => {
                    const spread = adjustedVolatility * Math.sqrt(i + 1) * confidenceFactor;
                    return val + spread;
                });
                
                const lowerBound = regressionLine.map((val, i) => {
                    const spread = adjustedVolatility * Math.sqrt(i + 1) * confidenceFactor;
                    return val - spread;
                });

                // First value should always be current price
                upperBound[0] = 0.032;
                lowerBound[0] = 0.032;

                // Update chart
                chart.updateSeries([
                    { name: 'Price', data: [0.032, 0.033, 0.031, 0.034, 0.032, 0.030, 0.029, 0.031, 0.033, 0.032, 0.034, 0.035] },
                    { name: 'Linear Regression', data: regressionLine },
                    { name: `Upper Bound (${confidenceInterval}%)`, data: upperBound },
                    { name: `Lower Bound (${confidenceInterval}%)`, data: lowerBound },
                    { name: 'Moving Average (20-day)', data: [0.0315, 0.0318, 0.032, 0.0322, 0.0325, 0.0327, 0.033, 0.0332, 0.0335, 0.0337, 0.034, 0.0342] }
                ]);
            }
        }
    }
});
