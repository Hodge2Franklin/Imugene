// Volume Profile Analysis Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('volume-profile-container');
    if (!container) return;

    // Create the chart interface
    createChartInterface(container);

    // Sample data for stock price and volume history
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
            </div>
        `;
        controlsSection.appendChild(timeRangeSelector);

        // Create profile type selector
        const profileTypeSelector = document.createElement('div');
        profileTypeSelector.className = 'control-group';
        profileTypeSelector.innerHTML = `
            <label>Profile Type:</label>
            <select id="profile-type-selector">
                <option value="fixed">Fixed Range</option>
                <option value="session">Session</option>
                <option value="developing">Developing</option>
            </select>
        `;
        controlsSection.appendChild(profileTypeSelector);

        // Create profile settings
        const profileSettings = document.createElement('div');
        profileSettings.className = 'control-group';
        profileSettings.innerHTML = `
            <label>Profile Settings:</label>
            <div class="settings-group">
                <label>Row Size: <input type="number" id="row-size" min="5" max="100" value="20" step="5"></label>
                <label>Value Area %: <input type="number" id="value-area" min="50" max="90" value="70" step="5"></label>
                <label><input type="checkbox" id="show-poc" checked> Show POC</label>
                <label><input type="checkbox" id="show-value-area" checked> Show Value Area</label>
            </div>
        `;
        controlsSection.appendChild(profileSettings);

        // Create chart container
        const chartContainer = document.createElement('div');
        chartContainer.id = 'volume-chart-container';
        chartContainer.style.height = '600px';
        container.appendChild(chartContainer);

        // Create analysis section
        const analysisSection = document.createElement('div');
        analysisSection.className = 'analysis-section';
        container.appendChild(analysisSection);

        // Create title for analysis section
        const analysisTitle = document.createElement('h3');
        analysisTitle.textContent = 'Volume Profile Analysis';
        analysisSection.appendChild(analysisTitle);

        // Create analysis container
        const analysisContainer = document.createElement('div');
        analysisContainer.id = 'volume-analysis';
        analysisContainer.className = 'analysis-container';
        analysisSection.appendChild(analysisContainer);

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

        document.getElementById('profile-type-selector').addEventListener('change', function() {
            updateProfileType(this.value);
        });

        document.getElementById('row-size').addEventListener('change', function() {
            updateProfileSettings();
        });

        document.getElementById('value-area').addEventListener('change', function() {
            updateProfileSettings();
        });

        document.getElementById('show-poc').addEventListener('change', function() {
            updateProfileSettings();
        });

        document.getElementById('show-value-area').addEventListener('change', function() {
            updateProfileSettings();
        });
    }

    // Function to initialize chart with data
    function initializeChart(data) {
        // Create stock chart with volume profile
        Highcharts.stockChart('volume-chart-container', {
            chart: {
                type: 'line',
                zoomType: 'xy'
            },
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
                text: 'Imugene (IMU.AX) Volume Profile Analysis'
            },
            subtitle: {
                text: 'Analyze price action through volume distribution'
            },
            plotOptions: {
                series: {
                    showInLegend: true
                }
            },
            xAxis: {
                type: 'datetime',
                crosshair: true
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
                data: data.ohlc,
                tooltip: {
                    valueDecimals: 3
                }
            }, {
                type: 'column',
                name: 'Volume',
                data: data.volume,
                yAxis: 1,
                color: 'rgba(100, 100, 255, 0.5)'
            }]
        }, function(chart) {
            // After chart is loaded, add volume profile
            addVolumeProfile(chart, data);
            
            // Update analysis text
            updateAnalysisText(data);
        });
    }

    // Function to add volume profile to chart
    function addVolumeProfile(chart, data) {
        // Calculate volume profile data
        const profileData = calculateVolumeProfile(data, 20); // 20 rows
        
        // Get price axis extremes
        const yAxis = chart.yAxis[0];
        const min = yAxis.min;
        const max = yAxis.max;
        const height = max - min;
        
        // Calculate row height
        const rowHeight = height / profileData.length;
        
        // Find point of control (POC) - row with maximum volume
        const poc = profileData.reduce((max, row) => row.volume > max.volume ? row : max, { volume: 0 });
        
        // Calculate value area (70% of total volume)
        const totalVolume = profileData.reduce((sum, row) => sum + row.volume, 0);
        const valueAreaVolume = totalVolume * 0.7;
        
        // Sort rows by volume in descending order
        const sortedRows = [...profileData].sort((a, b) => b.volume - a.volume);
        
        // Find rows that make up the value area
        let cumulativeVolume = 0;
        const valueAreaRows = [];
        
        for (const row of sortedRows) {
            cumulativeVolume += row.volume;
            valueAreaRows.push(row);
            if (cumulativeVolume >= valueAreaVolume) break;
        }
        
        // Find value area high and low
        const valueAreaPrices = valueAreaRows.map(row => row.price);
        const valueAreaHigh = Math.max(...valueAreaPrices);
        const valueAreaLow = Math.min(...valueAreaPrices);
        
        // Add volume profile as custom shapes
        profileData.forEach(row => {
            // Calculate normalized volume width (0-1)
            const maxVolume = poc.volume;
            const normalizedWidth = row.volume / maxVolume;
            
            // Calculate position
            const y = row.price;
            const x = chart.xAxis[0].max - (chart.xAxis[0].max - chart.xAxis[0].min) * 0.05; // Position at 5% from right edge
            
            // Add volume bar
            chart.renderer.rect(
                chart.plotLeft + chart.plotWidth * 0.95, // X position (95% from left)
                yAxis.toPixels(y - rowHeight / 2), // Y position
                chart.plotWidth * 0.05 * normalizedWidth, // Width based on volume
                yAxis.toPixels(y + rowHeight / 2) - yAxis.toPixels(y - rowHeight / 2), // Height
                1 // Corner radius
            )
            .attr({
                fill: row.price === poc.price ? 'rgba(255, 0, 0, 0.5)' : // POC in red
                      (row.price <= valueAreaHigh && row.price >= valueAreaLow) ? 'rgba(0, 128, 0, 0.5)' : // Value area in green
                      'rgba(100, 100, 100, 0.5)', // Other rows in gray
                zIndex: 0
            })
            .add();
        });
        
        // Add POC line
        chart.renderer.path(['M', chart.plotLeft, yAxis.toPixels(poc.price), 'L', chart.plotLeft + chart.plotWidth, yAxis.toPixels(poc.price)])
            .attr({
                'stroke-width': 1,
                stroke: 'red',
                dashstyle: 'dash',
                zIndex: 1
            })
            .add();
        
        // Add value area lines
        chart.renderer.path(['M', chart.plotLeft, yAxis.toPixels(valueAreaHigh), 'L', chart.plotLeft + chart.plotWidth, yAxis.toPixels(valueAreaHigh)])
            .attr({
                'stroke-width': 1,
                stroke: 'green',
                dashstyle: 'dash',
                zIndex: 1
            })
            .add();
            
        chart.renderer.path(['M', chart.plotLeft, yAxis.toPixels(valueAreaLow), 'L', chart.plotLeft + chart.plotWidth, yAxis.toPixels(valueAreaLow)])
            .attr({
                'stroke-width': 1,
                stroke: 'green',
                dashstyle: 'dash',
                zIndex: 1
            })
            .add();
            
        // Add annotations
        chart.renderer.text('POC: $' + poc.price.toFixed(3), chart.plotLeft + chart.plotWidth - 80, yAxis.toPixels(poc.price) - 5)
            .attr({
                zIndex: 2
            })
            .css({
                color: 'red',
                fontSize: '10px',
                fontWeight: 'bold'
            })
            .add();
            
        chart.renderer.text('VAH: $' + valueAreaHigh.toFixed(3), chart.plotLeft + chart.plotWidth - 80, yAxis.toPixels(valueAreaHigh) - 5)
            .attr({
                zIndex: 2
            })
            .css({
                color: 'green',
                fontSize: '10px',
                fontWeight: 'bold'
            })
            .add();
            
        chart.renderer.text('VAL: $' + valueAreaLow.toFixed(3), chart.plotLeft + chart.plotWidth - 80, yAxis.toPixels(valueAreaLow) - 5)
            .attr({
                zIndex: 2
            })
            .css({
                color: 'green',
                fontSize: '10px',
                fontWeight: 'bold'
            })
            .add();
    }

    // Function to calculate volume profile
    function calculateVolumeProfile(data, rowCount) {
        // Find price range
        const prices = data.ohlc.map(candle => [candle[2], candle[3]]); // High and low prices
        const allPrices = prices.flat();
        const minPrice = Math.min(...allPrices);
        const maxPrice = Math.max(...allPrices);
        const priceRange = maxPrice - minPrice;
        
        // Calculate row height
        const rowHeight = priceRange / rowCount;
        
        // Initialize rows
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            const rowPrice = minPrice + rowHeight * (i + 0.5); // Center of the row
            rows.push({
                price: rowPrice,
                volume: 0
            });
        }
        
        // Distribute volume to rows
        data.ohlc.forEach((candle, index) => {
            const open = candle[1];
            const high = candle[2];
            const low = candle[3];
            const close = candle[4];
            const volume = data.volume[index][1];
            
            // Calculate price range covered by this candle
            const candleRange = high - low;
            
            // Distribute volume to rows proportionally
            rows.forEach(row => {
                const rowLow = row.price - rowHeight / 2;
                const rowHigh = row.price + rowHeight / 2;
                
                // Check if candle overlaps with this row
                if (high >= rowLow && low <= rowHigh) {
                    // Calculate overlap
                    const overlapLow = Math.max(low, rowLow);
                    const overlapHigh = Math.min(high, rowHigh);
                    const overlapRange = overlapHigh - overlapLow;
                    
                    // Distribute volume proportionally to overlap
                    const volumeForRow = volume * (overlapRange / candleRange);
                    row.volume += volumeForRow;
                }
            });
        });
        
        return rows;
    }

    // Function to update analysis text
    function updateAnalysisText(data) {
        // Calculate volume profile data
        const profileData = calculateVolumeProfile(data, 20);
        
        // Find point of control (POC) - row with maximum volume
        const poc = profileData.reduce((max, row) => row.volume > max.volume ? row : max, { volume: 0 });
        
        // Calculate value area (70% of total volume)
        const totalVolume = profileData.reduce((sum, row) => sum + row.volume, 0);
        const valueAreaVolume = totalVolume * 0.7;
        
        // Sort rows by volume in descending order
        const sortedRows = [...profileData].sort((a, b) => b.volume - a.volume);
        
        // Find rows that make up the value area
        let cumulativeVolume = 0;
        const valueAreaRows = [];
        
        for (const row of sortedRows) {
            cumulativeVolume += row.volume;
            valueAreaRows.push(row);
            if (cumulativeVolume >= valueAreaVolume) break;
        }
        
        // Find value area high and low
        const valueAreaPrices = valueAreaRows.map(row => row.price);
        const valueAreaHigh = Math.max(...valueAreaPrices);
        const valueAreaLow = Math.min(...valueAreaPrices);
        
        // Get current price (last close)
        const currentPrice = data.ohlc[data.ohlc.length - 1][4];
        
        // Determine price position relative to volume profile
        let pricePosition;
        if (currentPrice > valueAreaHigh) {
            pricePosition = 'above the Value Area High';
        } else if (currentPrice < valueAreaLow) {
            pricePosition = 'below the Value Area Low';
        } else if (Math.abs(currentPrice - poc.price) < 0.001) {
            pricePosition = 'at the Point of Control';
        } else if (currentPrice > poc.price) {
            pricePosition = 'between the Point of Control and Value Area High';
        } else {
            pricePosition = 'between the Point of Control and Value Area Low';
        }
        
        // Calculate volume distribution
        const aboveValueAreaVolume = profileData
            .filter(row => row.price > valueAreaHigh)
            .reduce((sum, row) => sum + row.volume, 0);
            
        const belowValueAreaVolume = profileData
            .filter(row => row.price < valueAreaLow)
            .reduce((sum, row) => sum + row.volume, 0);
            
        const abovePercentage = (aboveValueAreaVolume / totalVolume * 100).toFixed(1);
        const belowPercentage = (belowValueAreaVolume / totalVolume * 100).toFixed(1);
        const valueAreaPercentage = (100 - parseFloat(abovePercentage) - parseFloat(belowPercentage)).toFixed(1);
        
        // Generate analysis text
        const analysisContainer = document.getElementById('volume-analysis');
        analysisContainer.innerHTML = `
            <div class="analysis-grid">
                <div class="analysis-item">
                    <div class="analysis-label">Point of Control (POC)</div>
                    <div class="analysis-value">$${poc.price.toFixed(3)}</div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">Value Area High (VAH)</div>
                    <div class="analysis-value">$${valueAreaHigh.toFixed(3)}</div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">Value Area Low (VAL)</div>
                    <div class="analysis-value">$${valueAreaLow.toFixed(3)}</div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">Current Price</div>
                    <div class="analysis-value">$${currentPrice.toFixed(3)}</div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">Price Position</div>
                    <div class="analysis-value">${pricePosition}</div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">Value Area Range</div>
                    <div class="analysis-value">${((valueAreaHigh - valueAreaLow) / valueAreaLow * 100).toFixed(1)}%</div>
                </div>
            </div>
            
            <h4>Volume Distribution</h4>
            <div class="volume-distribution">
                <div class="distribution-bar">
                    <div class="distribution-segment above" style="width: ${abovePercentage}%;">${abovePercentage}%</div>
                    <div class="distribution-segment value-area" style="width: ${valueAreaPercentage}%;">${valueAreaPercentage}%</div>
                    <div class="distribution-segment below" style="width: ${belowPercentage}%;">${belowPercentage}%</div>
                </div>
                <div class="distribution-labels">
                    <div>Above VAH</div>
                    <div>Value Area</div>
                    <div>Below VAL</div>
                </div>
            </div>
            
            <h4>Interpretation</h4>
            <div class="interpretation">
                <p>The Point of Control at $${poc.price.toFixed(3)} represents the price level with the highest traded volume, indicating strong interest from market participants at this price.</p>
                
                <p>The Value Area ($${valueAreaLow.toFixed(3)} to $${valueAreaHigh.toFixed(3)}) contains approximately 70% of the total trading volume, suggesting this is the price range where most trading activity has occurred.</p>
                
                <p>The current price is ${pricePosition}, which ${
                    currentPrice > valueAreaHigh ? 'may indicate bullish sentiment as prices are trading above the area of highest volume.' :
                    currentPrice < valueAreaLow ? 'may indicate bearish sentiment as prices are trading below the area of highest volume.' :
                    'suggests the price is currently trading within its fair value range based on historical volume.'
                }</p>
                
                <p>Volume distribution shows ${abovePercentage}% of volume above VAH, ${valueAreaPercentage}% within the Value Area, and ${belowPercentage}% below VAL.</p>
            </div>
        `;
        
        // Add CSS for volume distribution
        const style = document.createElement('style');
        style.textContent = `
            .volume-distribution {
                margin: 15px 0;
            }
            .distribution-bar {
                display: flex;
                height: 30px;
                width: 100%;
                border-radius: 4px;
                overflow: hidden;
            }
            .distribution-segment {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
            }
            .above {
                background-color: #FF9800;
            }
            .value-area {
                background-color: #4CAF50;
            }
            .below {
                background-color: #F44336;
            }
            .distribution-labels {
                display: flex;
                justify-content: space-between;
                margin-top: 5px;
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);
    }

    // Function to update chart time range
    function updateChartTimeRange(range) {
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'volume-chart-container');
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
            default:
                startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        }

        chart.xAxis[0].setExtremes(startDate.getTime(), now.getTime());
        
        // Redraw chart to update volume profile
        chart.redraw();
        
        // Remove old volume profile elements
        chart.renderer.boxWrapper.element.querySelectorAll('rect, path, text').forEach(el => {
            if (!el.classList.contains('highcharts-background')) {
                el.remove();
            }
        });
        
        // Add new volume profile
        addVolumeProfile(chart, {
            ohlc: chart.series[0].options.data,
            volume: chart.series[1].options.data
        });
        
        // Update analysis text
        updateAnalysisText({
            ohlc: chart.series[0].options.data,
            volume: chart.series[1].options.data
        });
    }

    // Function to update profile type
    function updateProfileType(type) {
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'volume-chart-container');
        if (!chart) return;
        
        // Implementation would depend on the specific requirements for each profile type
        // For this example, we'll just update the subtitle
        chart.setSubtitle({
            text: `Analyze price action through volume distribution (${type} profile)`
        });
        
        // In a real implementation, this would recalculate the volume profile based on the selected type
        // For example, "session" would calculate separate profiles for each trading session
        // "developing" would show how the profile develops over time
    }

    // Function to update profile settings
    function updateProfileSettings() {
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo.id === 'volume-chart-container');
        if (!chart) return;
        
        const rowSize = parseInt(document.getElementById('row-size').value);
        const valueArea = parseInt(document.getElementById('value-area').value);
        const showPoc = document.getElementById('show-poc').checked;
        const showValueArea = document.getElementById('show-value-area').checked;
        
        // In a real implementation, this would update the volume profile based on the new settings
        // For this example, we'll just update the subtitle
        chart.setSubtitle({
            text: `Analyze price action through volume distribution (Rows: ${rowSize}, VA: ${valueArea}%)`
        });
    }

    // Function to generate sample stock data
    function generateSampleStockData() {
        const ohlcData = [];
        const volumeData = [];
        const today = new Date();
        let price = 0.032; // Starting price
        
        // Generate 2 years of daily data
        for (let i = 0; i < 2 * 252; i++) { // Approximately 252 trading days per year
            const date = new Date(today);
            date.setDate(today.getDate() - (2 * 252 - i));
            
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
            
            ohlcData.push([
                date.getTime(),
                parseFloat(open.toFixed(3)),
                parseFloat(high.toFixed(3)),
                parseFloat(low.toFixed(3)),
                parseFloat(close.toFixed(3))
            ]);
            
            // Generate random volume
            const volume = Math.round(Math.random() * 10000000);
            volumeData.push([
                date.getTime(),
                volume
            ]);
            
            price = close;
        }
        
        return {
            ohlc: ohlcData,
            volume: volumeData
        };
    }
});
