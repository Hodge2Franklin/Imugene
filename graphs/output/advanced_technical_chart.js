// Advanced Technical Chart Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('advanced-technical-chart-container');
    if (!container) return;

    // Create the chart interface
    createChartInterface(container);

    // Sample data for stock price history
    const stockData = generateSampleStockData();

    // Initialize the chart with sample data
    initializeChart(stockData);

    // Function to create chart interface
    function createChartInterface(container) {
        // Create controls section
        const controlsSection = document.createElement('div');
        controlsSection.className = 'chart-controls';
        container.appendChild(controlsSection);

        // Create time range selector
        const timeRangeSelector = document.createElement('div');
        timeRangeSelector.className = 'control-group';
        timeRangeSelector.innerHTML = `
            <label>Time Range:</label>
            <div class="button-group">
                <button class="time-button" data-range="1M">1M</button>
                <button class="time-button" data-range="3M">3M</button>
                <button class="time-button active" data-range="6M">6M</button>
                <button class="time-button" data-range="1Y">1Y</button>
                <button class="time-button" data-range="2Y">2Y</button>
                <button class="time-button" data-range="5Y">5Y</button>
                <button class="time-button" data-range="ALL">ALL</button>
            </div>
        `;
        controlsSection.appendChild(timeRangeSelector);

        // Create indicator selector
        const indicatorSelector = document.createElement('div');
        indicatorSelector.className = 'control-group';
        indicatorSelector.innerHTML = `
            <label>Indicators:</label>
            <div class="checkbox-group">
                <label><input type="checkbox" id="sma-checkbox" checked> SMA</label>
                <label><input type="checkbox" id="ema-checkbox"> EMA</label>
                <label><input type="checkbox" id="bollinger-checkbox"> Bollinger Bands</label>
                <label><input type="checkbox" id="rsi-checkbox"> RSI</label>
                <label><input type="checkbox" id="macd-checkbox"> MACD</label>
                <label><input type="checkbox" id="volume-checkbox" checked> Volume</label>
            </div>
        `;
        controlsSection.appendChild(indicatorSelector);

        // Create chart type selector
        const chartTypeSelector = document.createElement('div');
        chartTypeSelector.className = 'control-group';
        chartTypeSelector.innerHTML = `
            <label>Chart Type:</label>
            <select id="chart-type-selector">
                <option value="candlestick">Candlestick</option>
                <option value="line">Line</option>
                <option value="ohlc">OHLC</option>
                <option value="area">Area</option>
            </select>
        `;
        controlsSection.appendChild(chartTypeSelector);

        // Create comparison selector
        const comparisonSelector = document.createElement('div');
        comparisonSelector.className = 'control-group';
        comparisonSelector.innerHTML = `
            <label>Compare With:</label>
            <select id="comparison-selector">
                <option value="none">None</option>
                <option value="XBI">S&P Biotech ETF (XBI)</option>
                <option value="IBB">NASDAQ Biotech ETF (IBB)</option>
                <option value="ASX200">ASX 200</option>
                <option value="NASDAQ">NASDAQ</option>
            </select>
        `;
        controlsSection.appendChild(comparisonSelector);

        // Create chart container
        const chartContainer = document.createElement('div');
        chartContainer.id = 'stock-chart-container';
        chartContainer.style.height = '500px';
        container.appendChild(chartContainer);

        // Create secondary chart container for indicators
        const indicatorContainer = document.createElement('div');
        indicatorContainer.id = 'indicator-chart-container';
        indicatorContainer.style.height = '150px';
        indicatorContainer.style.marginTop = '20px';
        container.appendChild(indicatorContainer);

        // Add event listeners to controls
        document.querySelectorAll('.time-button').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.time-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update chart with selected time range
                updateChartTimeRange(this.dataset.range);
            });
        });

        document.getElementById('chart-type-selector').addEventListener('change', function() {
            updateChartType(this.value);
        });

        document.getElementById('comparison-selector').addEventListener('change', function() {
            updateChartComparison(this.value);
        });

        // Add event listeners to indicator checkboxes
        document.getElementById('sma-checkbox').addEventListener('change', function() {
            toggleIndicator('sma', this.checked);
        });

        document.getElementById('ema-checkbox').addEventListener('change', function() {
            toggleIndicator('ema', this.checked);
        });

        document.getElementById('bollinger-checkbox').addEventListener('change', function() {
            toggleIndicator('bollinger', this.checked);
        });

        document.getElementById('rsi-checkbox').addEventListener('change', function() {
            toggleIndicator('rsi', this.checked);
        });

        document.getElementById('macd-checkbox').addEventListener('change', function() {
            toggleIndicator('macd', this.checked);
        });

        document.getElementById('volume-checkbox').addEventListener('change', function() {
            toggleIndicator('volume', this.checked);
        });
    }

    // Function to initialize chart with data
    function initializeChart(data) {
        // Create stock chart
        Highcharts.stockChart('stock-chart-container', {
            rangeSelector: {
                enabled: false
            },
            navigator: {
                enabled: true
            },
            scrollbar: {
                enabled: false
            },
            title: {
                text: 'Imugene (IMU.AX) Stock Price'
            },
            subtitle: {
                text: 'Interactive Technical Analysis Chart'
            },
            plotOptions: {
                series: {
                    showInLegend: true
                },
                candlestick: {
                    color: '#f44336',
                    upColor: '#4CAF50'
                }
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Price (AUD)'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],
            tooltip: {
                split: true
            },
            series: [{
                type: 'candlestick',
                name: 'IMU.AX',
                id: 'imu',
                data: data,
                tooltip: {
                    valueDecimals: 3
                }
            }, {
                type: 'sma',
                name: 'SMA (20)',
                linkedTo: 'imu',
                zIndex: 1,
                marker: {
                    enabled: false
                },
                params: {
                    period: 20
                }
            }, {
                type: 'column',
                name: 'Volume',
                data: calculateVolumeData(data),
                yAxis: 1,
                color: 'rgba(100, 100, 255, 0.5)'
            }]
        });
    }

    // Function to update chart time range
    function updateChartTimeRange(range) {
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'stock-chart-container');
        if (!chart) return;

        const now = new Date();
        let startDate;

        switch (range) {
            case '1M':
                startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                break;
            case '3M':
                startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                break;
            case '6M':
                startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                break;
            case '1Y':
                startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                break;
            case '2Y':
                startDate = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
                break;
            case '5Y':
                startDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
                break;
            case 'ALL':
                startDate = new Date(2010, 0, 1); // Assuming data starts from 2010
                break;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        }

        chart.xAxis[0].setExtremes(startDate.getTime(), now.getTime());
    }

    // Function to update chart type
    function updateChartType(type) {
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'stock-chart-container');
        if (!chart) return;

        const mainSeries = chart.series[0];
        mainSeries.update({
            type: type
        });
    }

    // Function to update chart comparison
    function updateChartComparison(comparison) {
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'stock-chart-container');
        if (!chart) return;

        // Remove any existing comparison series
        chart.series.forEach(series => {
            if (series.options.isComparison) {
                series.remove();
            }
        });

        // Add new comparison series if selected
        if (comparison !== 'none') {
            const comparisonData = generateComparisonData(comparison);
            
            chart.addSeries({
                type: 'line',
                name: comparison,
                data: comparisonData,
                isComparison: true,
                color: getComparisonColor(comparison),
                tooltip: {
                    valueDecimals: 2
                }
            });
        }
    }

    // Function to toggle technical indicators
    function toggleIndicator(indicator, show) {
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'stock-chart-container');
        if (!chart) return;

        switch (indicator) {
            case 'sma':
                toggleSMA(chart, show);
                break;
            case 'ema':
                toggleEMA(chart, show);
                break;
            case 'bollinger':
                toggleBollingerBands(chart, show);
                break;
            case 'rsi':
                toggleRSI(chart, show);
                break;
            case 'macd':
                toggleMACD(chart, show);
                break;
            case 'volume':
                toggleVolume(chart, show);
                break;
        }
    }

    // Function to toggle SMA indicator
    function toggleSMA(chart, show) {
        // Find existing SMA series
        const smaSeries = chart.series.find(series => series.options.type === 'sma');
        
        if (show && !smaSeries) {
            // Add SMA series
            chart.addSeries({
                type: 'sma',
                name: 'SMA (20)',
                linkedTo: 'imu',
                zIndex: 1,
                marker: {
                    enabled: false
                },
                params: {
                    period: 20
                }
            });
        } else if (!show && smaSeries) {
            // Remove SMA series
            smaSeries.remove();
        }
    }

    // Function to toggle EMA indicator
    function toggleEMA(chart, show) {
        // Find existing EMA series
        const emaSeries = chart.series.find(series => series.options.type === 'ema');
        
        if (show && !emaSeries) {
            // Add EMA series
            chart.addSeries({
                type: 'ema',
                name: 'EMA (20)',
                linkedTo: 'imu',
                zIndex: 1,
                marker: {
                    enabled: false
                },
                params: {
                    period: 20
                },
                color: '#9C27B0'
            });
        } else if (!show && emaSeries) {
            // Remove EMA series
            emaSeries.remove();
        }
    }

    // Function to toggle Bollinger Bands indicator
    function toggleBollingerBands(chart, show) {
        // Find existing Bollinger Bands series
        const bbSeries = chart.series.find(series => series.options.type === 'bb');
        
        if (show && !bbSeries) {
            // Add Bollinger Bands series
            chart.addSeries({
                type: 'bb',
                name: 'Bollinger Bands (20, 2)',
                linkedTo: 'imu',
                zIndex: 0,
                marker: {
                    enabled: false
                },
                params: {
                    period: 20,
                    standardDeviation: 2
                },
                bottomLine: {
                    styles: {
                        lineColor: '#FF9800'
                    }
                },
                topLine: {
                    styles: {
                        lineColor: '#FF9800'
                    }
                },
                lineWidth: 1
            });
        } else if (!show && bbSeries) {
            // Remove Bollinger Bands series
            bbSeries.remove();
        }
    }

    // Function to toggle RSI indicator
    function toggleRSI(chart, show) {
        // Check if indicator chart exists
        let indicatorChart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'indicator-chart-container');
        
        if (show) {
            if (!indicatorChart) {
                // Create indicator chart
                indicatorChart = Highcharts.stockChart('indicator-chart-container', {
                    rangeSelector: {
                        enabled: false
                    },
                    navigator: {
                        enabled: false
                    },
                    scrollbar: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true
                    },
                    yAxis: {
                        height: '100%',
                        lineWidth: 2,
                        plotLines: [{
                            value: 30,
                            color: '#FF9800',
                            dashStyle: 'shortdash',
                            width: 1,
                            label: {
                                text: 'Oversold'
                            }
                        }, {
                            value: 70,
                            color: '#FF9800',
                            dashStyle: 'shortdash',
                            width: 1,
                            label: {
                                text: 'Overbought'
                            }
                        }]
                    },
                    tooltip: {
                        shared: true
                    },
                    series: [{
                        type: 'rsi',
                        name: 'RSI (14)',
                        linkedTo: 'imu',
                        yAxis: 0,
                        marker: {
                            enabled: false
                        },
                        params: {
                            period: 14
                        },
                        color: '#E91E63'
                    }]
                });
                
                // Synchronize charts
                syncCharts(chart, indicatorChart);
            } else {
                // Add RSI series if it doesn't exist
                const rsiSeries = indicatorChart.series.find(series => series.options.type === 'rsi');
                if (!rsiSeries) {
                    indicatorChart.addSeries({
                        type: 'rsi',
                        name: 'RSI (14)',
                        linkedTo: 'imu',
                        yAxis: 0,
                        marker: {
                            enabled: false
                        },
                        params: {
                            period: 14
                        },
                        color: '#E91E63'
                    });
                }
                
                // Show indicator chart
                document.getElementById('indicator-chart-container').style.display = 'block';
            }
        } else if (indicatorChart) {
            // Remove RSI series
            const rsiSeries = indicatorChart.series.find(series => series.options.type === 'rsi');
            if (rsiSeries) {
                rsiSeries.remove();
            }
            
            // Hide indicator chart if no series left
            if (indicatorChart.series.length === 0) {
                document.getElementById('indicator-chart-container').style.display = 'none';
            }
        }
    }

    // Function to toggle MACD indicator
    function toggleMACD(chart, show) {
        // Check if indicator chart exists
        let indicatorChart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'indicator-chart-container');
        
        if (show) {
            if (!indicatorChart) {
                // Create indicator chart
                indicatorChart = Highcharts.stockChart('indicator-chart-container', {
                    rangeSelector: {
                        enabled: false
                    },
                    navigator: {
                        enabled: false
                    },
                    scrollbar: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true
                    },
                    yAxis: {
                        height: '100%',
                        lineWidth: 2
                    },
                    tooltip: {
                        shared: true
                    },
                    series: [{
                        type: 'macd',
                        name: 'MACD',
                        linkedTo: 'imu',
                        yAxis: 0,
                        params: {
                            shortPeriod: 12,
                            longPeriod: 26,
                            signalPeriod: 9
                        }
                    }]
                });
                
                // Synchronize charts
                syncCharts(chart, indicatorChart);
            } else {
                // Add MACD series if it doesn't exist
                const macdSeries = indicatorChart.series.find(series => series.options.type === 'macd');
                if (!macdSeries) {
                    indicatorChart.addSeries({
                        type: 'macd',
                        name: 'MACD',
                        linkedTo: 'imu',
                        yAxis: 0,
                        params: {
                            shortPeriod: 12,
                            longPeriod: 26,
                            signalPeriod: 9
                        }
                    });
                }
                
                // Show indicator chart
                document.getElementById('indicator-chart-container').style.display = 'block';
            }
        } else if (indicatorChart) {
            // Remove MACD series
            const macdSeries = indicatorChart.series.find(series => series.options.type === 'macd');
            if (macdSeries) {
                macdSeries.remove();
            }
            
            // Hide indicator chart if no series left
            if (indicatorChart.series.length === 0) {
                document.getElementById('indicator-chart-container').style.display = 'none';
            }
        }
    }

    // Function to toggle Volume indicator
    function toggleVolume(chart, show) {
        // Find existing Volume series
        const volumeSeries = chart.series.find(series => series.options.name === 'Volume');
        
        if (show && !volumeSeries) {
            // Add Volume series
            chart.addSeries({
                type: 'column',
                name: 'Volume',
                data: calculateVolumeData(chart.series[0].options.data),
                yAxis: 1,
                color: 'rgba(100, 100, 255, 0.5)'
            });
        } else if (!show && volumeSeries) {
            // Remove Volume series
            volumeSeries.remove();
        }
    }

    // Function to synchronize charts
    function syncCharts(mainChart, indicatorChart) {
        // Synchronize extremes
        function syncExtremes(e) {
            const thisChart = this.chart;
            
            if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                Highcharts.charts.forEach(function (chart) {
                    if (chart !== thisChart && chart) {
                        if (chart.xAxis[0].setExtremes) { // Check if it's a Highcharts chart
                            chart.xAxis[0].setExtremes(
                                e.min,
                                e.max,
                                undefined,
                                false,
                                { trigger: 'syncExtremes' }
                            );
                        }
                    }
                });
            }
        }
        
        // Add event listeners to both charts
        mainChart.xAxis[0].events.setExtremes = syncExtremes;
        indicatorChart.xAxis[0].events.setExtremes = syncExtremes;
        
        // Force sync of initial view
        mainChart.xAxis[0].setExtremes();
    }

    // Function to calculate volume data from OHLC data
    function calculateVolumeData(ohlcData) {
        return ohlcData.map(point => [
            point[0], // Date
            Math.round(Math.random() * 10000000) // Random volume for sample data
        ]);
    }

    // Function to generate sample stock data
    function generateSampleStockData() {
        const data = [];
        const today = new Date();
        let price = 0.032; // Starting price
        
        // Generate 5 years of daily data
        for (let i = 0; i < 5 * 252; i++) { // Approximately 252 trading days per year
            const date = new Date(today);
            date.setDate(today.getDate() - (5 * 252 - i));
            
            // Skip weekends
            if (date.getDay() === 0 || date.getDay() === 6) {
                continue;
            }
            
            // Random price movement
            const volatility = 0.03; // 3% daily volatility
            const change = price * volatility * (Math.random() - 0.5);
            
            const open = price;
            const close = Math.max(0.001, price + change);
            const high = Math.max(open, close) * (1 + Math.random() * 0.01);
            const low = Math.min(open, close) * (1 - Math.random() * 0.01);
            
            data.push([
                date.getTime(),
                parseFloat(open.toFixed(3)),
                parseFloat(high.toFixed(3)),
                parseFloat(low.toFixed(3)),
                parseFloat(close.toFixed(3))
            ]);
            
            price = close;
        }
        
        return data;
    }

    // Function to generate comparison data
    function generateComparisonData(symbol) {
        const data = [];
        const today = new Date();
        let price = getComparisonStartPrice(symbol);
        
        // Generate 5 years of daily data
        for (let i = 0; i < 5 * 252; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - (5 * 252 - i));
            
            // Skip weekends
            if (date.getDay() === 0 || date.getDay() === 6) {
                continue;
            }
            
            // Random price movement with trend
            const volatility = 0.015; // 1.5% daily volatility
            const trend = getComparisonTrend(symbol);
            const change = price * (volatility * (Math.random() - 0.5) + trend);
            
            price = Math.max(0.1, price + change);
            
            data.push([
                date.getTime(),
                parseFloat(price.toFixed(2))
            ]);
        }
        
        return data;
    }

    // Function to get starting price for comparison symbol
    function getComparisonStartPrice(symbol) {
        switch (symbol) {
            case 'XBI':
                return 80.0;
            case 'IBB':
                return 120.0;
            case 'ASX200':
                return 6000.0;
            case 'NASDAQ':
                return 10000.0;
            default:
                return 100.0;
        }
    }

    // Function to get trend for comparison symbol
    function getComparisonTrend(symbol) {
        switch (symbol) {
            case 'XBI':
                return 0.0002; // Slight uptrend
            case 'IBB':
                return 0.0003; // Moderate uptrend
            case 'ASX200':
                return 0.0001; // Very slight uptrend
            case 'NASDAQ':
                return 0.0004; // Strong uptrend
            default:
                return 0.0;
        }
    }

    // Function to get color for comparison symbol
    function getComparisonColor(symbol) {
        switch (symbol) {
            case 'XBI':
                return '#2196F3'; // Blue
            case 'IBB':
                return '#9C27B0'; // Purple
            case 'ASX200':
                return '#FF9800'; // Orange
            case 'NASDAQ':
                return '#4CAF50'; // Green
            default:
                return '#999999'; // Gray
        }
    }
});
