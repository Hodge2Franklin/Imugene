// Fixed Advanced Technical Chart Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('advanced-technical-chart-container');
    if (!container) return;

    console.log("Advanced Technical Chart: Container found, initializing");
    
    // Sample data for technical chart
    const technicalData = {
        dates: Array.from({ length: 180 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (180 - i));
            return date;
        }),
        prices: generatePriceData(180, 0.03, 0.02, 0.05),
        volumes: generateVolumeData(180, 10000000, 50000000)
    };

    // Create chart container with canvas element
    const chartContainer = document.createElement('div');
    chartContainer.id = 'technical-chart-container';
    chartContainer.style.height = '500px';
    chartContainer.style.marginBottom = '20px';
    container.appendChild(chartContainer);
    
    // Create canvas element - THIS WAS MISSING IN THE ORIGINAL SCRIPT
    const canvas = document.createElement('canvas');
    canvas.id = 'technical-chart-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    chartContainer.appendChild(canvas);

    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls-container';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexWrap = 'wrap';
    controlsContainer.style.gap = '15px';
    controlsContainer.style.marginBottom = '20px';
    container.appendChild(controlsContainer);

    // Create time period control
    const timePeriodControl = document.createElement('div');
    timePeriodControl.className = 'control-group';
    timePeriodControl.innerHTML = `
        <label>Time Period:</label>
        <select id="time-period">
            <option value="30">1 Month</option>
            <option value="90">3 Months</option>
            <option value="180" selected>6 Months</option>
            <option value="365">1 Year</option>
        </select>
    `;
    controlsContainer.appendChild(timePeriodControl);

    // Create chart type control
    const chartTypeControl = document.createElement('div');
    chartTypeControl.className = 'control-group';
    chartTypeControl.innerHTML = `
        <label>Chart Type:</label>
        <select id="chart-type">
            <option value="line" selected>Line</option>
            <option value="candlestick">Candlestick</option>
            <option value="ohlc">OHLC</option>
        </select>
    `;
    controlsContainer.appendChild(chartTypeControl);

    // Create indicator control
    const indicatorControl = document.createElement('div');
    indicatorControl.className = 'control-group';
    indicatorControl.innerHTML = `
        <label>Indicators:</label>
        <select id="indicator" multiple>
            <option value="sma" selected>SMA</option>
            <option value="ema">EMA</option>
            <option value="bollinger">Bollinger Bands</option>
            <option value="rsi">RSI</option>
            <option value="macd">MACD</option>
        </select>
    `;
    controlsContainer.appendChild(indicatorControl);

    // Create update button
    const updateButton = document.createElement('button');
    updateButton.id = 'update-chart';
    updateButton.textContent = 'Update Chart';
    updateButton.className = 'update-button';
    updateButton.style.padding = '5px 15px';
    updateButton.style.backgroundColor = '#4CAF50';
    updateButton.style.color = 'white';
    updateButton.style.border = 'none';
    updateButton.style.borderRadius = '4px';
    updateButton.style.cursor = 'pointer';
    updateButton.onclick = updateChart;
    controlsContainer.appendChild(updateButton);

    // Initialize chart
    let technicalChart;

    // Function to generate price data
    function generatePriceData(days, startPrice, volatility, trend) {
        const prices = [];
        let price = startPrice;
        
        for (let i = 0; i < days; i++) {
            // Add random movement
            const change = (Math.random() - 0.5) * volatility;
            // Add trend
            const trendFactor = (i / days) * trend;
            
            price = Math.max(0.001, price * (1 + change + trendFactor));
            prices.push(price);
        }
        
        return prices;
    }

    // Function to generate volume data
    function generateVolumeData(days, minVolume, maxVolume) {
        const volumes = [];
        
        for (let i = 0; i < days; i++) {
            // Random volume between min and max
            const volume = Math.floor(minVolume + Math.random() * (maxVolume - minVolume));
            volumes.push(volume);
        }
        
        return volumes;
    }

    // Function to calculate Simple Moving Average (SMA)
    function calculateSMA(data, period) {
        const sma = [];
        
        for (let i = 0; i < data.length; i++) {
            if (i < period - 1) {
                sma.push(null);
            } else {
                let sum = 0;
                for (let j = 0; j < period; j++) {
                    sum += data[i - j];
                }
                sma.push(sum / period);
            }
        }
        
        return sma;
    }

    // Function to calculate Exponential Moving Average (EMA)
    function calculateEMA(data, period) {
        const ema = [];
        const multiplier = 2 / (period + 1);
        
        // Start with SMA for the first EMA value
        let sum = 0;
        for (let i = 0; i < period; i++) {
            sum += data[i];
        }
        
        ema.push(sum / period);
        
        // Calculate EMA for the rest of the data
        for (let i = period; i < data.length; i++) {
            ema.push((data[i] - ema[ema.length - 1]) * multiplier + ema[ema.length - 1]);
        }
        
        // Pad with nulls for the initial period
        const paddedEMA = Array(period - 1).fill(null).concat(ema);
        
        return paddedEMA;
    }

    // Function to calculate Bollinger Bands
    function calculateBollingerBands(data, period, stdDev) {
        const sma = calculateSMA(data, period);
        const upperBand = [];
        const lowerBand = [];
        
        for (let i = 0; i < data.length; i++) {
            if (i < period - 1) {
                upperBand.push(null);
                lowerBand.push(null);
            } else {
                let sum = 0;
                for (let j = 0; j < period; j++) {
                    sum += Math.pow(data[i - j] - sma[i], 2);
                }
                const std = Math.sqrt(sum / period);
                upperBand.push(sma[i] + (std * stdDev));
                lowerBand.push(sma[i] - (std * stdDev));
            }
        }
        
        return { middle: sma, upper: upperBand, lower: lowerBand };
    }

    // Function to calculate Relative Strength Index (RSI)
    function calculateRSI(data, period) {
        const rsi = [];
        const gains = [];
        const losses = [];
        
        // Calculate gains and losses
        for (let i = 1; i < data.length; i++) {
            const change = data[i] - data[i - 1];
            gains.push(change > 0 ? change : 0);
            losses.push(change < 0 ? -change : 0);
        }
        
        // Calculate average gains and losses
        for (let i = 0; i < data.length; i++) {
            if (i < period) {
                rsi.push(null);
            } else {
                let avgGain = 0;
                let avgLoss = 0;
                
                for (let j = 0; j < period; j++) {
                    avgGain += gains[i - j - 1];
                    avgLoss += losses[i - j - 1];
                }
                
                avgGain /= period;
                avgLoss /= period;
                
                const rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss);
                rsi.push(100 - (100 / (1 + rs)));
            }
        }
        
        return rsi;
    }

    // Function to calculate Moving Average Convergence Divergence (MACD)
    function calculateMACD(data, fastPeriod, slowPeriod, signalPeriod) {
        const fastEMA = calculateEMA(data, fastPeriod);
        const slowEMA = calculateEMA(data, slowPeriod);
        const macdLine = [];
        
        // Calculate MACD line
        for (let i = 0; i < data.length; i++) {
            if (i < slowPeriod - 1) {
                macdLine.push(null);
            } else {
                macdLine.push(fastEMA[i] - slowEMA[i]);
            }
        }
        
        // Calculate signal line (EMA of MACD line)
        const signalLine = [];
        let sum = 0;
        for (let i = slowPeriod - 1; i < slowPeriod - 1 + signalPeriod; i++) {
            sum += macdLine[i];
        }
        
        signalLine.push(sum / signalPeriod);
        
        for (let i = slowPeriod - 1 + signalPeriod; i < data.length; i++) {
            const lastSignal = signalLine[signalLine.length - 1];
            const multiplier = 2 / (signalPeriod + 1);
            signalLine.push((macdLine[i] - lastSignal) * multiplier + lastSignal);
        }
        
        // Pad signal line with nulls
        const paddedSignalLine = Array(slowPeriod - 1 + signalPeriod - 1).fill(null).concat(signalLine);
        
        // Calculate histogram
        const histogram = [];
        for (let i = 0; i < data.length; i++) {
            if (i < slowPeriod - 1 + signalPeriod - 1) {
                histogram.push(null);
            } else {
                histogram.push(macdLine[i] - paddedSignalLine[i]);
            }
        }
        
        return { macdLine, signalLine: paddedSignalLine, histogram };
    }

    // Function to update chart
    function updateChart() {
        // Get selected options
        const timePeriod = parseInt(document.getElementById('time-period').value);
        const chartType = document.getElementById('chart-type').value;
        const indicators = Array.from(document.getElementById('indicator').selectedOptions).map(option => option.value);
        
        // Filter data based on time period
        const startIndex = technicalData.dates.length - timePeriod;
        const filteredDates = technicalData.dates.slice(startIndex);
        const filteredPrices = technicalData.prices.slice(startIndex);
        const filteredVolumes = technicalData.volumes.slice(startIndex);
        
        // Get canvas context
        const ctx = document.getElementById('technical-chart-canvas').getContext('2d');
        
        // Destroy previous chart if exists
        if (technicalChart) {
            technicalChart.destroy();
        }
        
        // Prepare datasets
        const datasets = [];
        
        // Add price dataset
        datasets.push({
            label: 'Price',
            data: filteredPrices,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            fill: false,
            yAxisID: 'y'
        });
        
        // Add volume dataset
        datasets.push({
            label: 'Volume',
            data: filteredVolumes,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderWidth: 1,
            type: 'bar',
            yAxisID: 'y1'
        });
        
        // Add indicators
        if (indicators.includes('sma')) {
            const sma20 = calculateSMA(technicalData.prices, 20).slice(startIndex);
            const sma50 = calculateSMA(technicalData.prices, 50).slice(startIndex);
            
            datasets.push({
                label: 'SMA 20',
                data: sma20,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y'
            });
            
            datasets.push({
                label: 'SMA 50',
                data: sma50,
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y'
            });
        }
        
        if (indicators.includes('ema')) {
            const ema12 = calculateEMA(technicalData.prices, 12).slice(startIndex);
            const ema26 = calculateEMA(technicalData.prices, 26).slice(startIndex);
            
            datasets.push({
                label: 'EMA 12',
                data: ema12,
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y'
            });
            
            datasets.push({
                label: 'EMA 26',
                data: ema26,
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y'
            });
        }
        
        if (indicators.includes('bollinger')) {
            const bollinger = calculateBollingerBands(technicalData.prices, 20, 2);
            const upperBand = bollinger.upper.slice(startIndex);
            const lowerBand = bollinger.lower.slice(startIndex);
            
            datasets.push({
                label: 'Upper Bollinger Band',
                data: upperBand,
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y'
            });
            
            datasets.push({
                label: 'Lower Bollinger Band',
                data: lowerBand,
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y'
            });
        }
        
        try {
            // Create new chart
            technicalChart = new Chart(ctx, {
                type: chartType === 'line' ? 'line' : 'bar', // Simplified for this example
                data: {
                    labels: filteredDates,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: timePeriod <= 30 ? 'day' : timePeriod <= 90 ? 'week' : 'month'
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Price ($)'
                            }
                        },
                        y1: {
                            position: 'right',
                            grid: {
                                drawOnChartArea: false
                            },
                            title: {
                                display: true,
                                text: 'Volume'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        },
                        legend: {
                            position: 'top'
                        }
                    }
                }
            });
            
            console.log("Advanced Technical Chart: Chart rendered successfully");
        } catch (e) {
            console.error("Error rendering technical chart:", e);
            showFallbackVisualization(filteredDates, filteredPrices, filteredVolumes, indicators);
        }
    }

    // Fallback visualization function
    function showFallbackVisualization(dates, prices, volumes, indicators) {
        // Clear the chart container
        const chartContainer = document.getElementById('technical-chart-container');
        chartContainer.innerHTML = '';
        
        // Create fallback visualization
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-visualization';
        fallbackDiv.style.height = '500px';
        fallbackDiv.style.overflowY = 'auto';
        fallbackDiv.style.backgroundColor = '#f8f9fa';
        fallbackDiv.style.border = '1px solid #ddd';
        fallbackDiv.style.borderRadius = '4px';
        fallbackDiv.style.padding = '20px';
        
        // Create fallback title
        const fallbackTitle = document.createElement('h4');
        fallbackTitle.textContent = 'Technical Analysis Data';
        fallbackTitle.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Create a simple table for price and volume data
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        
        // Add header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const dateHeader = document.createElement('th');
        dateHeader.textContent = 'Date';
        dateHeader.style.padding = '8px';
        dateHeader.style.borderBottom = '1px solid #ddd';
        dateHeader.style.textAlign = 'left';
        headerRow.appendChild(dateHeader);
        
        const priceHeader = document.createElement('th');
        priceHeader.textContent = 'Price ($)';
        priceHeader.style.padding = '8px';
        priceHeader.style.borderBottom = '1px solid #ddd';
        priceHeader.style.textAlign = 'right';
        headerRow.appendChild(priceHeader);
        
        const volumeHeader = document.createElement('th');
        volumeHeader.textContent = 'Volume';
        volumeHeader.style.padding = '8px';
        volumeHeader.style.borderBottom = '1px solid #ddd';
        volumeHeader.style.textAlign = 'right';
        headerRow.appendChild(volumeHeader);
        
        // Add indicator headers if selected
        if (indicators.includes('sma')) {
            const sma20Header = document.createElement('th');
            sma20Header.textContent = 'SMA 20';
            sma20Header.style.padding = '8px';
            sma20Header.style.borderBottom = '1px solid #ddd';
            sma20Header.style.textAlign = 'right';
            headerRow.appendChild(sma20Header);
            
            const sma50Header = document.createElement('th');
            sma50Header.textContent = 'SMA 50';
            sma50Header.style.padding = '8px';
            sma50Header.style.borderBottom = '1px solid #ddd';
            sma50Header.style.textAlign = 'right';
            headerRow.appendChild(sma50Header);
        }
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Add body
        const tbody = document.createElement('tbody');
        
        // Calculate indicators if selected
        let sma20 = [];
        let sma50 = [];
        
        if (indicators.includes('sma')) {
            sma20 = calculateSMA(prices, 20);
            sma50 = calculateSMA(prices, 50);
        }
        
        // Add rows for each date (limit to 30 rows for performance)
        const maxRows = Math.min(dates.length, 30);
        for (let i = 0; i < maxRows; i++) {
            const row = document.createElement('tr');
            
            const dateCell = document.createElement('td');
            dateCell.textContent = dates[i].toLocaleDateString();
            dateCell.style.padding = '8px';
            dateCell.style.borderBottom = '1px solid #ddd';
            dateCell.style.textAlign = 'left';
            row.appendChild(dateCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = prices[i].toFixed(4);
            priceCell.style.padding = '8px';
            priceCell.style.borderBottom = '1px solid #ddd';
            priceCell.style.textAlign = 'right';
            row.appendChild(priceCell);
            
            const volumeCell = document.createElement('td');
            volumeCell.textContent = volumes[i].toLocaleString();
            volumeCell.style.padding = '8px';
            volumeCell.style.borderBottom = '1px solid #ddd';
            volumeCell.style.textAlign = 'right';
            row.appendChild(volumeCell);
            
            // Add indicator cells if selected
            if (indicators.includes('sma')) {
                const sma20Cell = document.createElement('td');
                sma20Cell.textContent = sma20[i] ? sma20[i].toFixed(4) : '-';
                sma20Cell.style.padding = '8px';
                sma20Cell.style.borderBottom = '1px solid #ddd';
                sma20Cell.style.textAlign = 'right';
                row.appendChild(sma20Cell);
                
                const sma50Cell = document.createElement('td');
                sma50Cell.textContent = sma50[i] ? sma50[i].toFixed(4) : '-';
                sma50Cell.style.padding = '8px';
                sma50Cell.style.borderBottom = '1px solid #ddd';
                sma50Cell.style.textAlign = 'right';
                row.appendChild(sma50Cell);
            }
            
            tbody.appendChild(row);
        }
        
        // Add note if data is truncated
        if (dates.length > maxRows) {
            const noteRow = document.createElement('tr');
            const noteCell = document.createElement('td');
            noteCell.colSpan = 3 + (indicators.includes('sma') ? 2 : 0);
            noteCell.textContent = `Note: Showing ${maxRows} of ${dates.length} data points`;
            noteCell.style.padding = '8px';
            noteCell.style.fontStyle = 'italic';
            noteCell.style.textAlign = 'center';
            noteRow.appendChild(noteCell);
            tbody.appendChild(noteRow);
        }
        
        table.appendChild(tbody);
        fallbackDiv.appendChild(table);
        
        chartContainer.appendChild(fallbackDiv);
    }

    // Initialize the chart
    updateChart();
    
    console.log("Advanced Technical Chart: Initialization complete");
});
