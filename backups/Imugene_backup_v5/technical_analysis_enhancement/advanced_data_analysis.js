// Advanced Data Analysis Features for Technical Analysis Section

/**
 * This file contains advanced data analysis features for the Imugene Technical Analysis section.
 * It implements:
 * 1. Pattern Recognition Algorithm
 * 2. Volatility Analysis
 * 3. Correlation Analysis
 * 4. Sentiment Analysis Visualization
 * 5. Statistical Indicators
 * 6. Predictive Modeling
 */

// Initialize advanced analysis features when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for main charts to be initialized
  setTimeout(() => {
    if (window.mainPriceChart) {
      initializeAdvancedAnalysis();
    } else {
      console.warn('Main price chart not initialized, waiting...');
      // Try again after a delay
      setTimeout(() => {
        if (window.mainPriceChart) {
          initializeAdvancedAnalysis();
        } else {
          console.error('Main price chart not available, advanced analysis features disabled');
        }
      }, 2000);
    }
  }, 1000);
});

/**
 * Initialize all advanced analysis features
 */
function initializeAdvancedAnalysis() {
  // Create pattern recognition visualization
  createPatternRecognitionChart();
  
  // Create volatility analysis
  createVolatilityAnalysis();
  
  // Create correlation analysis
  createCorrelationAnalysis();
  
  // Create sentiment analysis visualization
  createSentimentAnalysis();
  
  // Add statistical indicators
  addStatisticalIndicators();
  
  // Create predictive modeling visualization
  createPredictiveModeling();
  
  // Initialize advanced analysis controls
  initializeAdvancedControls();
}

/**
 * Create pattern recognition visualization
 */
function createPatternRecognitionChart() {
  const chartContainer = document.getElementById('pattern-recognition-chart');
  if (!chartContainer) {
    console.error('Pattern recognition chart container not found');
    return;
  }
  
  // Fetch historical data
  fetchHistoricalData()
    .then(data => {
      // Analyze patterns in the data
      const patterns = analyzePatterns(data.ohlc);
      
      // Create the chart
      const chart = Highcharts.stockChart(chartContainer, {
        chart: {
          height: 400,
          backgroundColor: '#f8f9fa'
        },
        title: {
          text: 'Automated Pattern Recognition',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50'
          }
        },
        subtitle: {
          text: 'Algorithmic detection of technical patterns',
          style: {
            color: '#7f8c8d'
          }
        },
        rangeSelector: {
          buttons: [
            {
              type: 'month',
              count: 3,
              text: '3M'
            },
            {
              type: 'month',
              count: 6,
              text: '6M'
            },
            {
              type: 'year',
              count: 1,
              text: '1Y'
            }
          ],
          selected: 1, // Default to 6M view
          inputEnabled: false
        },
        navigator: {
          enabled: true,
          height: 30
        },
        scrollbar: {
          enabled: false
        },
        yAxis: {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Price (AUD)'
          },
          height: '100%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        },
        tooltip: {
          split: false,
          shared: true,
          valueDecimals: 4
        },
        series: [
          {
            type: 'candlestick',
            name: 'IMU.AX',
            id: 'imu-patterns',
            data: data.ohlc,
            color: '#e74c3c',
            upColor: '#2ecc71',
            lineColor: '#e74c3c',
            upLineColor: '#2ecc71'
          }
        ]
      });
      
      // Add pattern annotations
      patterns.forEach(pattern => {
        chart.addAnnotation({
          labels: [{
            point: {
              x: pattern.end,
              y: pattern.y,
              xAxis: 0,
              yAxis: 0
            },
            text: pattern.name,
            shape: 'callout',
            backgroundColor: pattern.bullish ? 'rgba(46, 204, 113, 0.8)' : 'rgba(231, 76, 60, 0.8)',
            borderColor: pattern.bullish ? '#27ae60' : '#c0392b',
            borderWidth: 1,
            borderRadius: 5,
            style: {
              color: 'white',
              fontSize: '11px'
            }
          }],
          shapes: [{
            type: 'path',
            points: pattern.points,
            stroke: pattern.bullish ? '#2ecc71' : '#e74c3c',
            strokeWidth: 2,
            dashStyle: 'solid'
          }]
        });
      });
      
      // Add pattern statistics
      const bullishPatterns = patterns.filter(p => p.bullish).length;
      const bearishPatterns = patterns.filter(p => !p.bullish).length;
      
      const statsContainer = document.createElement('div');
      statsContainer.className = 'pattern-stats';
      statsContainer.innerHTML = `
        <div class="pattern-stat">
          <div class="stat-title">Bullish Patterns</div>
          <div class="stat-value" style="color: #2ecc71;">${bullishPatterns}</div>
        </div>
        <div class="pattern-stat">
          <div class="stat-title">Bearish Patterns</div>
          <div class="stat-value" style="color: #e74c3c;">${bearishPatterns}</div>
        </div>
        <div class="pattern-stat">
          <div class="stat-title">Pattern Strength</div>
          <div class="stat-value" style="color: ${bullishPatterns > bearishPatterns ? '#2ecc71' : '#e74c3c'};">
            ${bullishPatterns > bearishPatterns ? 'Bullish' : 'Bearish'}
          </div>
        </div>
      `;
      
      chartContainer.appendChild(statsContainer);
      
      // Store chart reference
      window.patternRecognitionChart = chart;
    })
    .catch(error => {
      console.error('Error creating pattern recognition chart:', error);
      chartContainer.innerHTML = `
        <div class="chart-error">
          <p>Unable to load pattern recognition data. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    });
}

/**
 * Create volatility analysis visualization
 */
function createVolatilityAnalysis() {
  const chartContainer = document.getElementById('volatility-analysis-chart');
  if (!chartContainer) {
    console.error('Volatility analysis chart container not found');
    return;
  }
  
  // Fetch historical data
  fetchHistoricalData()
    .then(data => {
      // Calculate volatility metrics
      const volatilityData = calculateVolatility(data.ohlc);
      
      // Create the chart
      const chart = Highcharts.chart(chartContainer, {
        chart: {
          height: 400,
          backgroundColor: '#f8f9fa'
        },
        title: {
          text: 'Volatility Analysis',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50'
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
            format: '{value:%b %Y}'
          }
        },
        yAxis: [
          {
            // Historical volatility axis
            title: {
              text: 'Historical Volatility (%)',
              style: {
                color: '#9b59b6'
              }
            },
            labels: {
              format: '{value}%',
              style: {
                color: '#9b59b6'
              }
            },
            opposite: false
          },
          {
            // Bollinger Band width axis
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
            opposite: true
          }
        ],
        tooltip: {
          shared: true,
          crosshairs: true
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          },
          areaspline: {
            fillOpacity: 0.2
          }
        },
        series: [
          {
            name: 'Historical Volatility (20-day)',
            type: 'line',
            data: volatilityData.historicalVolatility,
            color: '#9b59b6',
            yAxis: 0,
            tooltip: {
              valueSuffix: '%'
            }
          },
          {
            name: 'Bollinger Band Width',
            type: 'areaspline',
            data: volatilityData.bbandsWidth,
            color: '#3498db',
            yAxis: 1
          },
          {
            name: 'Average True Range (ATR)',
            type: 'line',
            data: volatilityData.atr,
            color: '#e67e22',
            yAxis: 0,
            visible: false
          }
        ]
      });
      
      // Add volatility zones
      const volatilityZones = document.createElement('div');
      volatilityZones.className = 'volatility-zones';
      volatilityZones.innerHTML = `
        <div class="zone-title">Volatility Zones</div>
        <div class="zone-container">
          <div class="zone high">
            <div class="zone-label">High Volatility</div>
            <div class="zone-value">> 80%</div>
            <div class="zone-description">Extreme price movements, potential for reversals</div>
          </div>
          <div class="zone medium">
            <div class="zone-label">Medium Volatility</div>
            <div class="zone-value">40% - 80%</div>
            <div class="zone-description">Normal trading conditions</div>
          </div>
          <div class="zone low">
            <div class="zone-label">Low Volatility</div>
            <div class="zone-value">< 40%</div>
            <div class="zone-description">Consolidation, potential for breakout</div>
          </div>
        </div>
        <div class="current-volatility">
          <div class="current-label">Current Volatility:</div>
          <div class="current-value" style="color: ${getVolatilityColor(volatilityData.currentVolatility)};">
            ${volatilityData.currentVolatility.toFixed(2)}%
          </div>
          <div class="current-description">
            ${getVolatilityDescription(volatilityData.currentVolatility)}
          </div>
        </div>
      `;
      
      chartContainer.appendChild(volatilityZones);
      
      // Store chart reference
      window.volatilityChart = chart;
    })
    .catch(error => {
      console.error('Error creating volatility analysis chart:', error);
      chartContainer.innerHTML = `
        <div class="chart-error">
          <p>Unable to load volatility data. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    });
}

/**
 * Create correlation analysis visualization
 */
function createCorrelationAnalysis() {
  const chartContainer = document.getElementById('correlation-analysis-chart');
  if (!chartContainer) {
    console.error('Correlation analysis chart container not found');
    return;
  }
  
  // Fetch data for multiple assets
  Promise.all([
    fetchHistoricalData('IMU.AX'),
    fetchHistoricalData('^AXJO'),  // ASX 200
    fetchHistoricalData('XHJ.AX'),  // ASX Healthcare
    fetchHistoricalData('AUDUSD=X')  // AUD/USD
  ])
    .then(([imuData, asx200Data, healthcareData, audusdData]) => {
      // Calculate correlations
      const correlations = calculateCorrelations(
        imuData.close,
        asx200Data.close,
        healthcareData.close,
        audusdData.close
      );
      
      // Create the heatmap
      const chart = Highcharts.chart(chartContainer, {
        chart: {
          type: 'heatmap',
          height: 400,
          backgroundColor: '#f8f9fa'
        },
        title: {
          text: 'Correlation Analysis',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50'
          }
        },
        subtitle: {
          text: 'Price correlation between Imugene and market factors',
          style: {
            color: '#7f8c8d'
          }
        },
        xAxis: {
          categories: ['IMU.AX', 'ASX 200', 'ASX Healthcare', 'AUD/USD'],
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 'bold'
            }
          }
        },
        yAxis: {
          categories: ['IMU.AX', 'ASX 200', 'ASX Healthcare', 'AUD/USD'],
          title: null,
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 'bold'
            }
          }
        },
        colorAxis: {
          min: -1,
          max: 1,
          stops: [
            [0, '#e74c3c'],    // Strong negative correlation - red
            [0.5, '#f8f9fa'],  // No correlation - white
            [1, '#2ecc71']     // Strong positive correlation - green
          ]
        },
        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280,
          title: {
            text: 'Correlation<br>Coefficient'
          }
        },
        tooltip: {
          formatter: function() {
            const value = this.point.value;
            let correlationStrength;
            
            if (Math.abs(value) > 0.7) {
              correlationStrength = 'Strong';
            } else if (Math.abs(value) > 0.3) {
              correlationStrength = 'Moderate';
            } else {
              correlationStrength = 'Weak';
            }
            
            const correlationType = value > 0 ? 'positive' : value < 0 ? 'negative' : 'no';
            
            return `<b>${this.series.xAxis.categories[this.point.x]}</b> and <b>${this.series.yAxis.categories[this.point.y]}</b><br>
                    Correlation: <b>${value.toFixed(2)}</b><br>
                    <i>${correlationStrength} ${correlationType} correlation</i>`;
          }
        },
        series: [{
          name: 'Correlation Coefficient',
          borderWidth: 1,
          data: correlations,
          dataLabels: {
            enabled: true,
            color: '#000000',
            style: {
              textOutline: 'none',
              fontWeight: 'bold'
            },
            formatter: function() {
              return this.point.value.toFixed(2);
            }
          }
        }]
      });
      
      // Add correlation insights
      const insightsContainer = document.createElement('div');
      insightsContainer.className = 'correlation-insights';
      insightsContainer.innerHTML = `
        <div class="insights-title">Correlation Insights</div>
        <div class="insights-content">
          <p>Imugene shows a <strong>${getCorrelationDescription(correlations[1].value)}</strong> correlation with the broader ASX 200 index (${correlations[1].value.toFixed(2)}), indicating that ${correlations[1].value > 0.3 ? 'the stock tends to move with the broader market' : correlations[1].value < -0.3 ? 'the stock tends to move against the broader market' : 'the stock moves largely independently of the broader market'}.</p>
          
          <p>The <strong>${getCorrelationDescription(correlations[2].value)}</strong> correlation with the ASX Healthcare sector (${correlations[2].value.toFixed(2)}) suggests that ${correlations[2].value > 0.7 ? 'Imugene is strongly influenced by sector-specific factors' : correlations[2].value > 0.3 ? 'Imugene is moderately influenced by sector trends' : 'Imugene moves independently of its sector, likely driven by company-specific factors'}.</p>
          
          <p>The <strong>${getCorrelationDescription(correlations[3].value)}</strong> correlation with AUD/USD (${correlations[3].value.toFixed(2)}) indicates that ${Math.abs(correlations[3].value) > 0.3 ? 'currency movements may impact Imugene\'s stock price' : 'currency fluctuations have minimal impact on Imugene\'s stock price'}.</p>
        </div>
      `;
      
      chartContainer.appendChild(insightsContainer);
      
      // Store chart reference
      window.correlationChart = chart;
    })
    .catch(error => {
      console.error('Error creating correlation analysis chart:', error);
      chartContainer.innerHTML = `
        <div class="chart-error">
          <p>Unable to load correlation data. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    });
}

/**
 * Create sentiment analysis visualization
 */
function createSentimentAnalysis() {
  const chartContainer = document.getElementById('sentiment-analysis-chart');
  if (!chartContainer) {
    console.error('Sentiment analysis chart container not found');
    return;
  }
  
  // Fetch sentiment data
  fetchSentimentData()
    .then(data => {
      // Create the chart
      const chart = Highcharts.chart(chartContainer, {
        chart: {
          height: 400,
          backgroundColor: '#f8f9fa'
        },
        title: {
          text: 'Market Sentiment Analysis',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50'
          }
        },
        subtitle: {
          text: 'Social media and news sentiment with price overlay',
          style: {
            color: '#7f8c8d'
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%b %Y}'
          }
        },
        yAxis: [
          {
            // Price axis
            title: {
              text: 'Price (AUD)',
              style: {
                color: '#3498db'
              }
            },
            labels: {
              style: {
                color: '#3498db'
              }
            },
            opposite: false
          },
          {
            // Sentiment axis
            title: {
              text: 'Sentiment Score',
              style: {
                color: '#9b59b6'
              }
            },
            min: -100,
            max: 100,
            labels: {
              style: {
                color: '#9b59b6'
              }
            },
            opposite: true,
            plotLines: [
              {
                value: 0,
                color: '#7f8c8d',
                dashStyle: 'shortdash',
                width: 1,
                label: {
                  text: 'Neutral',
                  align: 'right',
                  style: {
                    color: '#7f8c8d'
                  }
                }
              }
            ]
          }
        ],
        tooltip: {
          shared: true,
          crosshairs: true
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },
        series: [
          {
            name: 'IMU.AX Price',
            type: 'line',
            data: data.price,
            color: '#3498db',
            yAxis: 0,
            zIndex: 2,
            tooltip: {
              valueDecimals: 4,
              valuePrefix: '$'
            }
          },
          {
            name: 'Social Media Sentiment',
            type: 'areaspline',
            data: data.socialSentiment,
            color: '#9b59b6',
            fillOpacity: 0.2,
            yAxis: 1,
            zIndex: 1,
            tooltip: {
              valueSuffix: ' points'
            }
          },
          {
            name: 'News Sentiment',
            type: 'areaspline',
            data: data.newsSentiment,
            color: '#e67e22',
            fillOpacity: 0.2,
            yAxis: 1,
            zIndex: 0,
            tooltip: {
              valueSuffix: ' points'
            }
          }
        ]
      });
      
      // Add sentiment summary
      const sentimentSummary = document.createElement('div');
      sentimentSummary.className = 'sentiment-summary';
      sentimentSummary.innerHTML = `
        <div class="summary-title">Sentiment Summary</div>
        <div class="summary-metrics">
          <div class="summary-metric">
            <div class="metric-title">Current Social Sentiment</div>
            <div class="metric-value" style="color: ${getSentimentColor(data.currentSocialSentiment)};">
              ${data.currentSocialSentiment > 0 ? '+' : ''}${data.currentSocialSentiment}
            </div>
            <div class="metric-description">${getSentimentDescription(data.currentSocialSentiment)}</div>
          </div>
          <div class="summary-metric">
            <div class="metric-title">Current News Sentiment</div>
            <div class="metric-value" style="color: ${getSentimentColor(data.currentNewsSentiment)};">
              ${data.currentNewsSentiment > 0 ? '+' : ''}${data.currentNewsSentiment}
            </div>
            <div class="metric-description">${getSentimentDescription(data.currentNewsSentiment)}</div>
          </div>
          <div class="summary-metric">
            <div class="metric-title">Sentiment Trend</div>
            <div class="metric-value" style="color: ${getSentimentColor(data.sentimentTrend)};">
              ${data.sentimentTrend > 0 ? 'Improving' : data.sentimentTrend < 0 ? 'Deteriorating' : 'Stable'}
            </div>
            <div class="metric-description">
              ${data.sentimentTrend > 10 ? 'Rapidly improving sentiment suggests growing market optimism' : 
                data.sentimentTrend > 0 ? 'Gradually improving sentiment indicates cautious optimism' :
                data.sentimentTrend < -10 ? 'Rapidly deteriorating sentiment suggests increasing market concerns' :
                data.sentimentTrend < 0 ? 'Gradually deteriorating sentiment indicates growing caution' :
                'Stable sentiment suggests market equilibrium'}
            </div>
          </div>
        </div>
        <div class="sentiment-insight">
          <div class="insight-title">Key Insight</div>
          <div class="insight-content">
            ${data.currentSocialSentiment > 30 && data.currentNewsSentiment > 30 ? 
              'Strong positive sentiment across both social media and news sources suggests a favorable market perception that could support price appreciation.' :
              data.currentSocialSentiment < -30 && data.currentNewsSentiment < -30 ?
              'Strong negative sentiment across both social media and news sources indicates significant market concerns that could pressure prices.' :
              Math.abs(data.currentSocialSentiment - data.currentNewsSentiment) > 50 ?
              'The significant divergence between social media and news sentiment suggests conflicting market narratives, which often precedes increased volatility.' :
              'Current sentiment levels are moderate, suggesting balanced market perception without extreme optimism or pessimism.'}
          </div>
        </div>
      `;
      
      chartContainer.appendChild(sentimentSummary);
      
      // Store chart reference
      window.sentimentChart = chart;
    })
    .catch(error => {
      console.error('Error creating sentiment analysis chart:', error);
      chartContainer.innerHTML = `
        <div class="chart-error">
          <p>Unable to load sentiment data. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    });
}

/**
 * Add statistical indicators to the main chart
 */
function addStatisticalIndicators() {
  if (!window.mainPriceChart) {
    console.error('Main price chart not initialized');
    return;
  }
  
  // Add statistical indicators to the controls
  const controlsContainer = document.querySelector('.chart-controls');
  if (!controlsContainer) {
    console.error('Chart controls container not found');
    return;
  }
  
  const statisticalControls = document.createElement('div');
  statisticalControls.className = 'control-group statistical-controls';
  statisticalControls.innerHTML = `
    <span class="control-label">Statistical Indicators:</span>
    <div class="indicator-buttons">
      <button class="indicator-button" data-indicator="linear-regression" style="border-color: #1abc9c;">Linear Regression</button>
      <button class="indicator-button" data-indicator="standard-deviation" style="border-color: #f39c12;">Standard Deviation</button>
      <button class="indicator-button" data-indicator="fibonacci" style="border-color: #9b59b6;">Fibonacci Levels</button>
    </div>
  `;
  
  controlsContainer.appendChild(statisticalControls);
  
  // Add event listeners
  const statisticalButtons = statisticalControls.querySelectorAll('.indicator-button');
  statisticalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const indicator = this.getAttribute('data-indicator');
      this.classList.toggle('active');
      
      // Toggle the indicator
      toggleStatisticalIndicator(window.mainPriceChart, indicator, this.classList.contains('active'));
    });
  });
}

/**
 * Create predictive modeling visualization
 */
function createPredictiveModeling() {
  const chartContainer = document.getElementById('predictive-modeling-chart');
  if (!chartContainer) {
    console.error('Predictive modeling chart container not found');
    return;
  }
  
  // Fetch historical data
  fetchHistoricalData()
    .then(data => {
      // Generate predictive models
      const predictions = generatePredictions(data.ohlc);
      
      // Create the chart
      const chart = Highcharts.stockChart(chartContainer, {
        chart: {
          height: 400,
          backgroundColor: '#f8f9fa'
        },
        title: {
          text: 'Price Projection Models',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50'
          }
        },
        subtitle: {
          text: 'Statistical projections based on historical patterns',
          style: {
            color: '#7f8c8d'
          }
        },
        rangeSelector: {
          buttons: [
            {
              type: 'month',
              count: 3,
              text: '3M'
            },
            {
              type: 'month',
              count: 6,
              text: '6M'
            },
            {
              type: 'year',
              count: 1,
              text: '1Y'
            },
            {
              type: 'all',
              text: 'All'
            }
          ],
          selected: 2, // Default to 1Y view
          inputEnabled: false
        },
        navigator: {
          enabled: true,
          height: 30
        },
        scrollbar: {
          enabled: false
        },
        xAxis: {
          type: 'datetime',
          plotLines: [
            {
              value: predictions.currentDate,
              color: '#7f8c8d',
              width: 2,
              dashStyle: 'shortdash',
              label: {
                text: 'Current',
                style: {
                  color: '#7f8c8d'
                }
              }
            }
          ]
        },
        yAxis: {
          title: {
            text: 'Price (AUD)'
          },
          labels: {
            formatter: function() {
              return '$' + this.value.toFixed(3);
            }
          },
          plotLines: [
            {
              value: predictions.currentPrice,
              color: '#7f8c8d',
              width: 1,
              dashStyle: 'shortdash',
              label: {
                text: 'Current: $' + predictions.currentPrice.toFixed(3),
                align: 'right',
                style: {
                  color: '#7f8c8d'
                }
              }
            }
          ]
        },
        tooltip: {
          split: false,
          shared: true,
          valueDecimals: 4,
          valuePrefix: '$'
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },
        series: [
          {
            name: 'Historical Price',
            data: data.close,
            color: '#3498db',
            id: 'price',
            zIndex: 5
          },
          {
            name: 'Linear Regression',
            data: predictions.linearRegression,
            color: '#1abc9c',
            dashStyle: 'shortdash',
            zIndex: 4
          },
          {
            name: 'Moving Average Projection',
            data: predictions.movingAverage,
            color: '#f39c12',
            dashStyle: 'shortdash',
            zIndex: 3
          },
          {
            name: 'Bollinger Upper Band',
            data: predictions.bollingerUpper,
            color: '#2ecc71',
            dashStyle: 'shortdot',
            zIndex: 2
          },
          {
            name: 'Bollinger Lower Band',
            data: predictions.bollingerLower,
            color: '#e74c3c',
            dashStyle: 'shortdot',
            zIndex: 1
          }
        ]
      });
      
      // Add prediction summary
      const predictionSummary = document.createElement('div');
      predictionSummary.className = 'prediction-summary';
      predictionSummary.innerHTML = `
        <div class="summary-title">Projection Summary (3 Months)</div>
        <div class="summary-metrics">
          <div class="summary-metric">
            <div class="metric-title">Linear Regression</div>
            <div class="metric-value" style="color: ${predictions.linearRegressionChange >= 0 ? '#2ecc71' : '#e74c3c'};">
              $${predictions.linearRegressionTarget.toFixed(3)}
              <span class="metric-change">(${predictions.linearRegressionChange >= 0 ? '+' : ''}${predictions.linearRegressionChange.toFixed(2)}%)</span>
            </div>
          </div>
          <div class="summary-metric">
            <div class="metric-title">Moving Average Projection</div>
            <div class="metric-value" style="color: ${predictions.movingAverageChange >= 0 ? '#2ecc71' : '#e74c3c'};">
              $${predictions.movingAverageTarget.toFixed(3)}
              <span class="metric-change">(${predictions.movingAverageChange >= 0 ? '+' : ''}${predictions.movingAverageChange.toFixed(2)}%)</span>
            </div>
          </div>
          <div class="summary-metric">
            <div class="metric-title">Potential Range</div>
            <div class="metric-value">
              <span style="color: #e74c3c;">$${predictions.lowerTarget.toFixed(3)}</span> - 
              <span style="color: #2ecc71;">$${predictions.upperTarget.toFixed(3)}</span>
            </div>
          </div>
        </div>
        <div class="prediction-insight">
          <div class="insight-title">Model Consensus</div>
          <div class="insight-content">
            ${predictions.consensusDirection > 0 ? 
              'The majority of statistical models suggest a <strong style="color: #2ecc71;">positive price trajectory</strong> over the next 3 months.' :
              predictions.consensusDirection < 0 ?
              'The majority of statistical models suggest a <strong style="color: #e74c3c;">negative price trajectory</strong> over the next 3 months.' :
              'Statistical models show <strong>mixed signals</strong> regarding the price trajectory over the next 3 months.'}
            ${predictions.consensusStrength === 'strong' ?
              ' There is <strong>strong agreement</strong> between the different projection methods.' :
              predictions.consensusStrength === 'moderate' ?
              ' There is <moderate agreement</strong> between the different projection methods.' :
              ' There is <weak agreement</strong> between the different projection methods, suggesting higher uncertainty.'}
          </div>
        </div>
        <div class="prediction-disclaimer">
          <strong>Disclaimer:</strong> These projections are based solely on statistical analysis of historical price patterns and do not account for fundamental factors, market sentiment, or external events. They should not be used as the sole basis for investment decisions.
        </div>
      `;
      
      chartContainer.appendChild(predictionSummary);
      
      // Store chart reference
      window.predictiveModelingChart = chart;
    })
    .catch(error => {
      console.error('Error creating predictive modeling chart:', error);
      chartContainer.innerHTML = `
        <div class="chart-error">
          <p>Unable to load predictive modeling data. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    });
}

/**
 * Initialize advanced analysis controls
 */
function initializeAdvancedControls() {
  // Add time period selector for correlation analysis
  const correlationContainer = document.getElementById('correlation-analysis-chart');
  if (correlationContainer) {
    const periodSelector = document.createElement('div');
    periodSelector.className = 'period-selector';
    periodSelector.innerHTML = `
      <label for="correlation-period">Time Period:</label>
      <select id="correlation-period">
        <option value="1M">1 Month</option>
        <option value="3M">3 Months</option>
        <option value="6M" selected>6 Months</option>
        <option value="1Y">1 Year</option>
      </select>
    `;
    
    correlationContainer.insertBefore(periodSelector, correlationContainer.firstChild);
    
    // Add event listener
    document.getElementById('correlation-period').addEventListener('change', function() {
      // In a real implementation, this would update the correlation data
      // For this example, we'll just show a message
      const insightsContent = correlationContainer.querySelector('.insights-content');
      if (insightsContent) {
        insightsContent.innerHTML += `<p><em>Correlation data updated for ${this.value} time period.</em></p>`;
      }
    });
  }
  
  // Add sentiment source selector
  const sentimentContainer = document.getElementById('sentiment-analysis-chart');
  if (sentimentContainer && window.sentimentChart) {
    const sourceSelector = document.createElement('div');
    sourceSelector.className = 'source-selector';
    sourceSelector.innerHTML = `
      <label>Data Sources:</label>
      <div class="source-checkboxes">
        <label><input type="checkbox" checked data-source="social"> Social Media</label>
        <label><input type="checkbox" checked data-source="news"> News</label>
        <label><input type="checkbox" data-source="analyst"> Analyst Ratings</label>
      </div>
    `;
    
    sentimentContainer.insertBefore(sourceSelector, sentimentContainer.firstChild);
    
    // Add event listeners
    const checkboxes = sourceSelector.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const source = this.getAttribute('data-source');
        
        // Toggle visibility of corresponding series
        if (source === 'social') {
          window.sentimentChart.series[1].setVisible(this.checked);
        } else if (source === 'news') {
          window.sentimentChart.series[2].setVisible(this.checked);
        } else if (source === 'analyst') {
          // In a real implementation, this would show/hide analyst ratings
          // For this example, we'll just show a message
          const summaryContent = sentimentContainer.querySelector('.sentiment-summary');
          if (summaryContent) {
            if (this.checked) {
              summaryContent.innerHTML += `
                <div class="summary-metric">
                  <div class="metric-title">Analyst Sentiment</div>
                  <div class="metric-value" style="color: #2ecc71;">+45</div>
                  <div class="metric-description">Moderately Bullish</div>
                </div>
              `;
            } else {
              // Remove analyst sentiment if unchecked
              const analystMetric = summaryContent.querySelector('.summary-metric:last-child');
              if (analystMetric && analystMetric.querySelector('.metric-title').textContent === 'Analyst Sentiment') {
                analystMetric.remove();
              }
            }
          }
        }
      });
    });
  }
}

/**
 * Helper function to toggle statistical indicators
 */
function toggleStatisticalIndicator(chart, indicator, visible) {
  if (!chart) {
    console.error('Chart not provided');
    return;
  }
  
  // Remove existing indicator if it exists
  const existingSeries = chart.get(indicator);
  if (existingSeries) {
    existingSeries.remove();
  }
  
  // If not visible, we're done
  if (!visible) {
    return;
  }
  
  // Add the indicator based on type
  switch(indicator) {
    case 'linear-regression':
      addLinearRegression(chart);
      break;
    case 'standard-deviation':
      addStandardDeviation(chart);
      break;
    case 'fibonacci':
      addFibonacciLevels(chart);
      break;
    default:
      console.warn(`Unknown statistical indicator: ${indicator}`);
  }
}

/**
 * Add linear regression to chart
 */
function addLinearRegression(chart) {
  if (!chart) {
    console.error('Chart not provided');
    return;
  }
  
  // Get price data
  const series = chart.get('imu');
  if (!series) {
    console.error('Price series not found');
    return;
  }
  
  const data = series.options.data;
  
  // Calculate linear regression
  const xValues = data.map((point, index) => index);
  const yValues = data.map(point => point[4]); // Close price
  
  const regression = calculateLinearRegression(xValues, yValues);
  
  // Create regression line data
  const regressionData = xValues.map((x, index) => {
    return [data[index][0], regression.slope * x + regression.intercept];
  });
  
  // Add regression line to chart
  chart.addSeries({
    type: 'line',
    name: 'Linear Regression',
    id: 'linear-regression',
    data: regressionData,
    color: '#1abc9c',
    dashStyle: 'shortdash',
    lineWidth: 2,
    marker: {
      enabled: false
    },
    enableMouseTracking: true,
    showInLegend: true
  });
}

/**
 * Add standard deviation bands to chart
 */
function addStandardDeviation(chart) {
  if (!chart) {
    console.error('Chart not provided');
    return;
  }
  
  // Get price data
  const series = chart.get('imu');
  if (!series) {
    console.error('Price series not found');
    return;
  }
  
  const data = series.options.data;
  
  // Calculate standard deviation
  const prices = data.map(point => point[4]); // Close price
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
  const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / squaredDiffs.length;
  const stdDev = Math.sqrt(variance);
  
  // Create standard deviation bands
  const upperBand1 = data.map(point => [point[0], mean + stdDev]);
  const upperBand2 = data.map(point => [point[0], mean + 2 * stdDev]);
  const lowerBand1 = data.map(point => [point[0], mean - stdDev]);
  const lowerBand2 = data.map(point => [point[0], mean - 2 * stdDev]);
  const meanLine = data.map(point => [point[0], mean]);
  
  // Add bands to chart
  chart.addSeries({
    type: 'line',
    name: 'Mean',
    id: 'standard-deviation',
    data: meanLine,
    color: '#f39c12',
    dashStyle: 'solid',
    lineWidth: 2,
    marker: {
      enabled: false
    },
    enableMouseTracking: true,
    showInLegend: true
  });
  
  chart.addSeries({
    type: 'line',
    name: '+1 StdDev',
    id: 'upper-band-1',
    data: upperBand1,
    color: '#f39c12',
    dashStyle: 'shortdash',
    lineWidth: 1,
    marker: {
      enabled: false
    },
    enableMouseTracking: true,
    showInLegend: false,
    linkedTo: 'standard-deviation'
  });
  
  chart.addSeries({
    type: 'line',
    name: '+2 StdDev',
    id: 'upper-band-2',
    data: upperBand2,
    color: '#f39c12',
    dashStyle: 'shortdot',
    lineWidth: 1,
    marker: {
      enabled: false
    },
    enableMouseTracking: true,
    showInLegend: false,
    linkedTo: 'standard-deviation'
  });
  
  chart.addSeries({
    type: 'line',
    name: '-1 StdDev',
    id: 'lower-band-1',
    data: lowerBand1,
    color: '#f39c12',
    dashStyle: 'shortdash',
    lineWidth: 1,
    marker: {
      enabled: false
    },
    enableMouseTracking: true,
    showInLegend: false,
    linkedTo: 'standard-deviation'
  });
  
  chart.addSeries({
    type: 'line',
    name: '-2 StdDev',
    id: 'lower-band-2',
    data: lowerBand2,
    color: '#f39c12',
    dashStyle: 'shortdot',
    lineWidth: 1,
    marker: {
      enabled: false
    },
    enableMouseTracking: true,
    showInLegend: false,
    linkedTo: 'standard-deviation'
  });
}

/**
 * Add Fibonacci levels to chart
 */
function addFibonacciLevels(chart) {
  if (!chart) {
    console.error('Chart not provided');
    return;
  }
  
  // Get price data
  const series = chart.get('imu');
  if (!series) {
    console.error('Price series not found');
    return;
  }
  
  const data = series.options.data;
  
  // Find high and low points
  let highPoint = data[0];
  let lowPoint = data[0];
  
  data.forEach(point => {
    if (point[2] > highPoint[2]) { // High price
      highPoint = point;
    }
    if (point[3] < lowPoint[3]) { // Low price
      lowPoint = point;
    }
  });
  
  // Ensure high point is before low point for retracement
  let startPoint, endPoint;
  if (highPoint[0] < lowPoint[0]) {
    // Downtrend - retracement from high to low
    startPoint = highPoint;
    endPoint = lowPoint;
  } else {
    // Uptrend - retracement from low to high
    startPoint = lowPoint;
    endPoint = highPoint;
  }
  
  const range = Math.abs(startPoint[startPoint === highPoint ? 2 : 3] - endPoint[endPoint === highPoint ? 2 : 3]);
  const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  
  // Create Fibonacci level data
  const fibData = {};
  fibLevels.forEach(level => {
    const levelPrice = startPoint === highPoint ?
      startPoint[2] - range * level :
      startPoint[3] + range * level;
    
    fibData[level] = data.map(point => {
      // Only show levels after the end point
      return [point[0], point[0] >= endPoint[0] ? levelPrice : null];
    });
  });
  
  // Add Fibonacci levels to chart
  const fibColors = {
    0: '#9b59b6',
    0.236: '#3498db',
    0.382: '#2ecc71',
    0.5: '#f1c40f',
    0.618: '#e67e22',
    0.786: '#e74c3c',
    1: '#9b59b6'
  };
  
  fibLevels.forEach(level => {
    chart.addSeries({
      type: 'line',
      name: `Fibonacci ${level * 100}%`,
      id: `fibonacci-${level}`,
      data: fibData[level],
      color: fibColors[level],
      dashStyle: level === 0 || level === 1 ? 'solid' : 'shortdash',
      lineWidth: level === 0 || level === 1 ? 2 : 1,
      marker: {
        enabled: false
      },
      enableMouseTracking: true,
      showInLegend: level === 0,
      linkedTo: level === 0 ? null : 'fibonacci-0'
    });
  });
  
  // Add annotation to show the range
  chart.addAnnotation({
    labels: [{
      point: {
        x: (startPoint[0] + endPoint[0]) / 2,
        y: (startPoint[startPoint === highPoint ? 2 : 3] + endPoint[endPoint === highPoint ? 2 : 3]) / 2,
        xAxis: 0,
        yAxis: 0
      },
      text: 'Fibonacci Retracement',
      backgroundColor: 'rgba(155, 89, 182, 0.8)',
      borderColor: '#8e44ad',
      borderWidth: 1,
      borderRadius: 5,
      style: {
        color: 'white',
        fontSize: '11px'
      }
    }]
  });
}

/**
 * Helper function to analyze patterns in price data
 */
function analyzePatterns(data) {
  // This is a simplified pattern recognition algorithm
  // In a real implementation, this would be more sophisticated
  
  const patterns = [];
  
  // Look for double bottoms
  for (let i = 20; i < data.length - 20; i++) {
    // Check if current point is a local minimum
    if (isLocalMinimum(data, i, 10)) {
      // Look for another minimum within 20-40 bars
      for (let j = i + 20; j < Math.min(i + 40, data.length - 10); j++) {
        if (isLocalMinimum(data, j, 10)) {
          // Check if the two minimums are at similar price levels
          const priceDiff = Math.abs(data[i][3] - data[j][3]) / data[i][3]; // Difference in low prices
          
          if (priceDiff < 0.05) { // Less than 5% difference
            // Found a double bottom pattern
            patterns.push({
              name: 'Double Bottom',
              start: data[i - 10][0],
              end: data[j + 10][0],
              y: data[j][3] * 0.95, // Position label below the pattern
              bullish: true,
              points: [
                { x: data[i - 10][0], y: data[i - 10][4] }, // Start point
                { x: data[i][0], y: data[i][3] },           // First bottom
                { x: data[(i + j) / 2][0], y: data[(i + j) / 2][2] }, // Middle peak
                { x: data[j][0], y: data[j][3] },           // Second bottom
                { x: data[j + 10][0], y: data[j + 10][4] }  // End point
              ]
            });
            
            // Skip ahead to avoid duplicate patterns
            i = j + 10;
            break;
          }
        }
      }
    }
  }
  
  // Look for head and shoulders
  for (let i = 20; i < data.length - 40; i++) {
    // Check if current point is a local maximum (left shoulder)
    if (isLocalMaximum(data, i, 10)) {
      // Look for a higher maximum within 10-20 bars (head)
      for (let j = i + 10; j < Math.min(i + 20, data.length - 20); j++) {
        if (isLocalMaximum(data, j, 10) && data[j][2] > data[i][2]) {
          // Look for another maximum within 10-20 bars (right shoulder)
          for (let k = j + 10; k < Math.min(j + 20, data.length - 10); k++) {
            if (isLocalMaximum(data, k, 10)) {
              // Check if the shoulders are at similar price levels
              const shoulderDiff = Math.abs(data[i][2] - data[k][2]) / data[i][2]; // Difference in high prices
              
              if (shoulderDiff < 0.1 && data[k][2] < data[j][2]) { // Less than 10% difference and lower than head
                // Found a head and shoulders pattern
                patterns.push({
                  name: 'Head & Shoulders',
                  start: data[i - 10][0],
                  end: data[k + 10][0],
                  y: data[j][2] * 1.05, // Position label above the pattern
                  bullish: false,
                  points: [
                    { x: data[i - 10][0], y: data[i - 10][4] }, // Start point
                    { x: data[i][0], y: data[i][2] },           // Left shoulder
                    { x: data[j][0], y: data[j][2] },           // Head
                    { x: data[k][0], y: data[k][2] },           // Right shoulder
                    { x: data[k + 10][0], y: data[k + 10][4] }  // End point
                  ]
                });
                
                // Skip ahead to avoid duplicate patterns
                i = k + 10;
                break;
              }
            }
          }
        }
      }
    }
  }
  
  // Look for bullish engulfing patterns
  for (let i = 1; i < data.length; i++) {
    // Check for a bearish candle followed by a bullish candle
    const prevCandle = data[i - 1];
    const currCandle = data[i];
    
    const prevBearish = prevCandle[4] < prevCandle[1]; // Close < Open
    const currBullish = currCandle[4] > currCandle[1]; // Close > Open
    
    if (prevBearish && currBullish) {
      // Check if current candle engulfs previous candle
      const currEngulfs = currCandle[1] <= prevCandle[4] && currCandle[4] >= prevCandle[1];
      
      if (currEngulfs) {
        // Found a bullish engulfing pattern
        patterns.push({
          name: 'Bullish Engulfing',
          start: prevCandle[0],
          end: currCandle[0],
          y: currCandle[3] * 0.95, // Position label below the pattern
          bullish: true,
          points: [
            { x: prevCandle[0], y: prevCandle[3] }, // Previous low
            { x: prevCandle[0], y: prevCandle[2] }, // Previous high
            { x: currCandle[0], y: currCandle[2] }, // Current high
            { x: currCandle[0], y: currCandle[3] }  // Current low
          ]
        });
      }
    }
  }
  
  return patterns;
}

/**
 * Helper function to check if a point is a local minimum
 */
function isLocalMinimum(data, index, range) {
  const currentLow = data[index][3]; // Low price
  
  // Check if it's the lowest point within the range
  for (let i = Math.max(0, index - range); i <= Math.min(data.length - 1, index + range); i++) {
    if (i !== index && data[i][3] < currentLow) {
      return false;
    }
  }
  
  return true;
}

/**
 * Helper function to check if a point is a local maximum
 */
function isLocalMaximum(data, index, range) {
  const currentHigh = data[index][2]; // High price
  
  // Check if it's the highest point within the range
  for (let i = Math.max(0, index - range); i <= Math.min(data.length - 1, index + range); i++) {
    if (i !== index && data[i][2] > currentHigh) {
      return false;
    }
  }
  
  return true;
}

/**
 * Helper function to calculate volatility metrics
 */
function calculateVolatility(data) {
  const result = {
    historicalVolatility: [],
    bbandsWidth: [],
    atr: [],
    currentVolatility: 0
  };
  
  // Calculate daily returns
  const returns = [];
  for (let i = 1; i < data.length; i++) {
    const prevClose = data[i - 1][4];
    const currClose = data[i][4];
    returns.push((currClose - prevClose) / prevClose);
  }
  
  // Calculate 20-day historical volatility
  const period = 20;
  for (let i = period; i < data.length; i++) {
    const periodReturns = returns.slice(i - period, i);
    const mean = periodReturns.reduce((sum, ret) => sum + ret, 0) / period;
    const variance = periodReturns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    const annualizedVolatility = stdDev * Math.sqrt(252) * 100; // Annualized and converted to percentage
    
    result.historicalVolatility.push([data[i][0], annualizedVolatility]);
  }
  
  // Calculate Bollinger Band width
  for (let i = period; i < data.length; i++) {
    const periodPrices = data.slice(i - period, i).map(d => d[4]); // Close prices
    const mean = periodPrices.reduce((sum, price) => sum + price, 0) / period;
    const variance = periodPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    const upperBand = mean + 2 * stdDev;
    const lowerBand = mean - 2 * stdDev;
    const width = (upperBand - lowerBand) / mean;
    
    result.bbandsWidth.push([data[i][0], width]);
  }
  
  // Calculate Average True Range (ATR)
  for (let i = 1; i < data.length; i++) {
    const tr = Math.max(
      data[i][2] - data[i][3], // High - Low
      Math.abs(data[i][2] - data[i - 1][4]), // High - Previous Close
      Math.abs(data[i][3] - data[i - 1][4])  // Low - Previous Close
    );
    
    if (i === 1) {
      result.atr.push([data[i][0], tr]);
    } else {
      const prevAtr = result.atr[result.atr.length - 1][1];
      const newAtr = (prevAtr * 13 + tr) / 14; // 14-day ATR
      result.atr.push([data[i][0], newAtr]);
    }
  }
  
  // Set current volatility
  if (result.historicalVolatility.length > 0) {
    result.currentVolatility = result.historicalVolatility[result.historicalVolatility.length - 1][1];
  }
  
  return result;
}

/**
 * Helper function to calculate correlations between assets
 */
function calculateCorrelations(imuData, asx200Data, healthcareData, audusdData) {
  // Ensure all data arrays have the same length
  const minLength = Math.min(
    imuData.length,
    asx200Data.length,
    healthcareData.length,
    audusdData.length
  );
  
  // Extract prices and align by date
  const prices = {
    imu: imuData.slice(-minLength).map(d => d[1]),
    asx200: asx200Data.slice(-minLength).map(d => d[1]),
    healthcare: healthcareData.slice(-minLength).map(d => d[1]),
    audusd: audusdData.slice(-minLength).map(d => d[1])
  };
  
  // Calculate correlations
  const correlations = [];
  const assets = ['imu', 'asx200', 'healthcare', 'audusd'];
  
  for (let i = 0; i < assets.length; i++) {
    for (let j = 0; j < assets.length; j++) {
      correlations.push({
        x: i,
        y: j,
        value: i === j ? 1 : calculateCorrelation(prices[assets[i]], prices[assets[j]])
      });
    }
  }
  
  return correlations;
}

/**
 * Helper function to calculate correlation between two arrays
 */
function calculateCorrelation(x, y) {
  const n = x.length;
  
  // Calculate means
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate covariance and variances
  let covariance = 0;
  let xVariance = 0;
  let yVariance = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - xMean;
    const yDiff = y[i] - yMean;
    covariance += xDiff * yDiff;
    xVariance += xDiff * xDiff;
    yVariance += yDiff * yDiff;
  }
  
  // Calculate correlation coefficient
  return covariance / (Math.sqrt(xVariance) * Math.sqrt(yVariance));
}

/**
 * Helper function to fetch sentiment data
 * In a real implementation, this would fetch from an API
 * For this example, we generate mock data
 */
function fetchSentimentData() {
  return new Promise((resolve, reject) => {
    try {
      // Generate mock data
      const today = new Date();
      const data = {
        price: [],
        socialSentiment: [],
        newsSentiment: [],
        currentSocialSentiment: 0,
        currentNewsSentiment: 0,
        sentimentTrend: 0
      };
      
      // Generate 180 days of data
      for (let i = 180; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const timestamp = date.getTime();
        
        // Generate price data
        const basePrice = 0.05;
        const priceFactor = 1 + Math.sin(i / 30) * 0.1 + (Math.random() - 0.5) * 0.02;
        const price = basePrice * priceFactor;
        
        // Generate sentiment data
        // Social sentiment leads price by ~5 days
        const socialSentimentBase = Math.sin((i + 5) / 30) * 50;
        const socialSentiment = socialSentimentBase + (Math.random() - 0.5) * 20;
        
        // News sentiment is more volatile
        const newsSentimentBase = Math.sin((i + 2) / 20) * 40;
        const newsSentiment = newsSentimentBase + (Math.random() - 0.5) * 30;
        
        // Add special events
        let socialEvent = 0;
        let newsEvent = 0;
        
        // Clinical trial results - March 15, 2024
        if (date.getMonth() === 2 && date.getDate() === 15) {
          socialEvent = 40;
          newsEvent = 60;
        }
        // FDA fast track - June 10, 2024
        else if (date.getMonth() === 5 && date.getDate() === 10) {
          socialEvent = 50;
          newsEvent = 70;
        }
        // Capital raising - September 5, 2024
        else if (date.getMonth() === 8 && date.getDate() === 5) {
          socialEvent = -30;
          newsEvent = -20;
        }
        
        // Add data points
        data.price.push([timestamp, price]);
        data.socialSentiment.push([timestamp, socialSentiment + socialEvent]);
        data.newsSentiment.push([timestamp, newsSentiment + newsEvent]);
      }
      
      // Set current sentiment values
      data.currentSocialSentiment = Math.round(data.socialSentiment[data.socialSentiment.length - 1][1]);
      data.currentNewsSentiment = Math.round(data.newsSentiment[data.newsSentiment.length - 1][1]);
      
      // Calculate sentiment trend (change over last 30 days)
      const currentSocialSentiment = data.socialSentiment[data.socialSentiment.length - 1][1];
      const previousSocialSentiment = data.socialSentiment[data.socialSentiment.length - 30][1];
      const currentNewsSentiment = data.newsSentiment[data.newsSentiment.length - 1][1];
      const previousNewsSentiment = data.newsSentiment[data.newsSentiment.length - 30][1];
      
      data.sentimentTrend = ((currentSocialSentiment - previousSocialSentiment) + (currentNewsSentiment - previousNewsSentiment)) / 2;
      
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Helper function to generate price predictions
 */
function generatePredictions(data) {
  const result = {
    currentDate: data[data.length - 1][0],
    currentPrice: data[data.length - 1][4],
    linearRegression: [],
    movingAverage: [],
    bollingerUpper: [],
    bollingerLower: [],
    linearRegressionTarget: 0,
    movingAverageTarget: 0,
    upperTarget: 0,
    lowerTarget: 0,
    linearRegressionChange: 0,
    movingAverageChange: 0,
    consensusDirection: 0,
    consensusStrength: 'moderate'
  };
  
  // Calculate linear regression
  const xValues = [];
  const yValues = [];
  
  // Use last 90 days for regression
  const regressionPeriod = 90;
  const startIndex = Math.max(0, data.length - regressionPeriod);
  
  for (let i = startIndex; i < data.length; i++) {
    xValues.push(i - startIndex);
    yValues.push(data[i][4]); // Close price
  }
  
  const regression = calculateLinearRegression(xValues, yValues);
  
  // Generate historical regression line
  for (let i = startIndex; i < data.length; i++) {
    const x = i - startIndex;
    const y = regression.slope * x + regression.intercept;
    result.linearRegression.push([data[i][0], y]);
  }
  
  // Project future regression line
  const futureDays = 90; // 3 months
  const lastDate = data[data.length - 1][0];
  const dayInMs = 24 * 60 * 60 * 1000;
  
  for (let i = 1; i <= futureDays; i++) {
    const x = regressionPeriod + i - 1;
    const y = regression.slope * x + regression.intercept;
    const date = lastDate + i * dayInMs;
    result.linearRegression.push([date, y]);
  }
  
  // Calculate moving average projection
  const maPeriod = 50;
  const maStartIndex = Math.max(0, data.length - maPeriod);
  let maSum = 0;
  
  for (let i = maStartIndex; i < data.length; i++) {
    maSum += data[i][4]; // Close price
  }
  
  const ma = maSum / maPeriod;
  
  // Generate historical MA line
  for (let i = maStartIndex; i < data.length; i++) {
    result.movingAverage.push([data[i][0], ma]);
  }
  
  // Project future MA line with slight trend
  const maTrend = regression.slope * 20; // Adjust MA by a fraction of the regression slope
  
  for (let i = 1; i <= futureDays; i++) {
    const y = ma + maTrend * i;
    const date = lastDate + i * dayInMs;
    result.movingAverage.push([date, y]);
  }
  
  // Calculate Bollinger Bands
  const bbPeriod = 20;
  const bbStartIndex = Math.max(0, data.length - bbPeriod);
  let bbSum = 0;
  const bbPrices = [];
  
  for (let i = bbStartIndex; i < data.length; i++) {
    const price = data[i][4]; // Close price
    bbSum += price;
    bbPrices.push(price);
  }
  
  const bbMa = bbSum / bbPeriod;
  let bbVariance = 0;
  
  for (let i = 0; i < bbPrices.length; i++) {
    bbVariance += Math.pow(bbPrices[i] - bbMa, 2);
  }
  
  const bbStdDev = Math.sqrt(bbVariance / bbPeriod);
  const bbUpper = bbMa + 2 * bbStdDev;
  const bbLower = bbMa - 2 * bbStdDev;
  
  // Generate historical Bollinger Bands
  for (let i = bbStartIndex; i < data.length; i++) {
    result.bollingerUpper.push([data[i][0], bbUpper]);
    result.bollingerLower.push([data[i][0], bbLower]);
  }
  
  // Project future Bollinger Bands with widening
  const widening = 0.0001; // Bands widen slightly over time to reflect increasing uncertainty
  
  for (let i = 1; i <= futureDays; i++) {
    const upperY = bbUpper + regression.slope * i + widening * i * bbUpper;
    const lowerY = bbLower + regression.slope * i - widening * i * bbLower;
    const date = lastDate + i * dayInMs;
    result.bollingerUpper.push([date, upperY]);
    result.bollingerLower.push([date, lowerY]);
  }
  
  // Set target prices (3 months out)
  const targetIndex = result.linearRegression.length - 1;
  result.linearRegressionTarget = result.linearRegression[targetIndex][1];
  result.movingAverageTarget = result.movingAverage[targetIndex][1];
  result.upperTarget = result.bollingerUpper[targetIndex][1];
  result.lowerTarget = result.bollingerLower[targetIndex][1];
  
  // Calculate percentage changes
  result.linearRegressionChange = (result.linearRegressionTarget / result.currentPrice - 1) * 100;
  result.movingAverageChange = (result.movingAverageTarget / result.currentPrice - 1) * 100;
  
  // Determine consensus direction
  let positiveCount = 0;
  let negativeCount = 0;
  
  if (result.linearRegressionChange > 0) positiveCount++;
  else if (result.linearRegressionChange < 0) negativeCount++;
  
  if (result.movingAverageChange > 0) positiveCount++;
  else if (result.movingAverageChange < 0) negativeCount++;
  
  if (result.upperTarget / result.currentPrice - 1 > Math.abs(result.lowerTarget / result.currentPrice - 1)) {
    positiveCount++;
  } else {
    negativeCount++;
  }
  
  result.consensusDirection = positiveCount > negativeCount ? 1 : negativeCount > positiveCount ? -1 : 0;
  
  // Determine consensus strength
  if (positiveCount === 3 || negativeCount === 3) {
    result.consensusStrength = 'strong';
  } else if (positiveCount === 2 || negativeCount === 2) {
    result.consensusStrength = 'moderate';
  } else {
    result.consensusStrength = 'weak';
  }
  
  return result;
}

/**
 * Helper function to calculate linear regression
 */
function calculateLinearRegression(x, y) {
  const n = x.length;
  
  // Calculate means
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean);
    denominator += Math.pow(x[i] - xMean, 2);
  }
  
  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;
  
  return { slope, intercept };
}

/**
 * Helper function to get volatility color
 */
function getVolatilityColor(volatility) {
  if (volatility > 80) {
    return '#e74c3c'; // High volatility - red
  } else if (volatility > 40) {
    return '#f39c12'; // Medium volatility - orange
  } else {
    return '#3498db'; // Low volatility - blue
  }
}

/**
 * Helper function to get volatility description
 */
function getVolatilityDescription(volatility) {
  if (volatility > 80) {
    return 'Extremely High - Potential for sharp price movements';
  } else if (volatility > 60) {
    return 'High - Above average price fluctuations';
  } else if (volatility > 40) {
    return 'Medium - Normal trading conditions';
  } else if (volatility > 20) {
    return 'Low - Reduced price fluctuations';
  } else {
    return 'Very Low - Minimal price movement';
  }
}

/**
 * Helper function to get correlation description
 */
function getCorrelationDescription(correlation) {
  const absCorrelation = Math.abs(correlation);
  
  if (absCorrelation > 0.7) {
    return correlation > 0 ? 'strong positive' : 'strong negative';
  } else if (absCorrelation > 0.3) {
    return correlation > 0 ? 'moderate positive' : 'moderate negative';
  } else {
    return 'weak';
  }
}

/**
 * Helper function to get sentiment color
 */
function getSentimentColor(sentiment) {
  if (sentiment > 50) {
    return '#2ecc71'; // Strong positive - green
  } else if (sentiment > 0) {
    return '#27ae60'; // Positive - dark green
  } else if (sentiment > -50) {
    return '#e74c3c'; // Negative - red
  } else {
    return '#c0392b'; // Strong negative - dark red
  }
}

/**
 * Helper function to get sentiment description
 */
function getSentimentDescription(sentiment) {
  if (sentiment > 70) {
    return 'Extremely Bullish';
  } else if (sentiment > 50) {
    return 'Strongly Bullish';
  } else if (sentiment > 30) {
    return 'Moderately Bullish';
  } else if (sentiment > 10) {
    return 'Slightly Bullish';
  } else if (sentiment > -10) {
    return 'Neutral';
  } else if (sentiment > -30) {
    return 'Slightly Bearish';
  } else if (sentiment > -50) {
    return 'Moderately Bearish';
  } else if (sentiment > -70) {
    return 'Strongly Bearish';
  } else {
    return 'Extremely Bearish';
  }
}
