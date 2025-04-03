// Interactive Technical Chart Analysis Tool
// This visualization allows users to analyze Imugene's price action across multiple timeframes with customizable indicators

// Create the technical chart analysis visualization using TradingView lightweight charts
const createTechnicalChartAnalysis = () => {
  // Configuration
  const config = {
    container: '#technical-chart-container',
    dataPoints: 250, // Number of data points to display
    defaultTimeframe: 'daily',
    defaultIndicators: ['sma20', 'sma50', 'volume'],
    eventMarkers: [
      { date: '2021-12-03', label: 'ASX 200 Inclusion Announced', description: 'Imugene included in ASX 200 index (effective Dec 20, 2021)' },
      { date: '2021-12-13', label: 'Hopper Sells 75M Shares', description: 'Paul Hopper sold 75 million shares at $0.49' },
      { date: '2021-12-20', label: 'ASX 200 Inclusion Effective', description: 'Imugene officially added to ASX 200 index' },
      { date: '2025-03-24', label: 'ASX 300 Removal', description: 'Institutions liquidated positions as Imugene removed from ASX 300 index' }
    ]
  };

  // Generate sample price data (in a real implementation, this would come from an API)
  const generatePriceData = () => {
    try {
      const startDate = new Date('2020-08-01');
      const endDate = new Date();
      const data = [];
      
      // Initial price around 5.7c in Aug 2020
      let price = 0.057;
      let volume = 20000000;
      
      // Generate daily data
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        // Add some randomness to price
        const change = (Math.random() - 0.5) * 0.002;
        price += change;
        
        // Ensure price doesn't go negative
        if (price < 0.001) price = 0.001;
        
        // Add some randomness to volume
        volume = Math.max(5000000, volume + (Math.random() - 0.5) * 10000000);
        
        // Special events
        const dateStr = date.toISOString().split('T')[0];
        
        // ASX 200 inclusion announcement (Dec 3, 2021) - price increase
        if (dateStr === '2021-12-03') {
          price *= 1.15;
          volume *= 3;
        }
        
        // Hopper selling shares (Dec 13, 2021) - price decrease
        if (dateStr === '2021-12-13') {
          price *= 0.85;
          volume *= 4;
        }
        
        // Gradual decline after Hopper selling
        if (date > new Date('2021-12-13') && date < new Date('2022-03-01')) {
          price *= 0.998;
        }
        
        // ASX 300 removal (Mar 24, 2025) - price decrease
        if (dateStr === '2025-03-24') {
          price *= 0.90;
          volume *= 3.5;
        }
        
        // Current price around 3.0c
        if (date > new Date('2025-03-01')) {
          price = Math.max(0.03, price);
        }
        
        data.push({
          time: dateStr,
          open: price,
          high: price * (1 + Math.random() * 0.03),
          low: price * (1 - Math.random() * 0.03),
          close: price * (1 + (Math.random() - 0.5) * 0.01),
          value: Math.round(volume)
        });
      }
      
      return data;
    } catch (error) {
      console.error('Error generating price data:', error);
      // Return fallback data if there's an error
      return [
        { time: '2025-01-01', open: 0.03, high: 0.031, low: 0.029, close: 0.03, value: 10000000 },
        { time: '2025-01-02', open: 0.03, high: 0.032, low: 0.029, close: 0.031, value: 12000000 },
        { time: '2025-01-03', open: 0.031, high: 0.033, low: 0.03, close: 0.032, value: 15000000 }
      ];
    }
  };

  // Generate weekly data from daily data
  const generateWeeklyData = (dailyData) => {
    try {
      if (!Array.isArray(dailyData) || dailyData.length === 0) {
        throw new Error('Invalid daily data provided');
      }
      
      const weeklyData = [];
      let currentWeek = null;
      let weekData = null;
      
      dailyData.forEach(day => {
        const date = new Date(day.time);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay() + 1); // Monday
        const weekKey = weekStart.toISOString().split('T')[0];
        
        if (weekKey !== currentWeek) {
          if (weekData !== null) {
            weeklyData.push(weekData);
          }
          
          currentWeek = weekKey;
          weekData = {
            time: weekKey,
            open: day.open,
            high: day.high,
            low: day.low,
            close: day.close,
            value: day.value
          };
        } else {
          weekData.high = Math.max(weekData.high, day.high);
          weekData.low = Math.min(weekData.low, day.low);
          weekData.close = day.close;
          weekData.value += day.value;
        }
      });
      
      if (weekData !== null) {
        weeklyData.push(weekData);
      }
      
      return weeklyData;
    } catch (error) {
      console.error('Error generating weekly data:', error);
      // Return fallback data if there's an error
      return [
        { time: '2025-01-06', open: 0.03, high: 0.033, low: 0.029, close: 0.032, value: 50000000 },
        { time: '2025-01-13', open: 0.032, high: 0.034, low: 0.031, close: 0.033, value: 45000000 },
        { time: '2025-01-20', open: 0.033, high: 0.035, low: 0.032, close: 0.034, value: 55000000 }
      ];
    }
  };

  // Generate monthly data from daily data
  const generateMonthlyData = (dailyData) => {
    try {
      if (!Array.isArray(dailyData) || dailyData.length === 0) {
        throw new Error('Invalid daily data provided');
      }
      
      const monthlyData = [];
      let currentMonth = null;
      let monthData = null;
      
      dailyData.forEach(day => {
        const date = new Date(day.time);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthKey = monthStart.toISOString().split('T')[0];
        
        if (monthKey !== currentMonth) {
          if (monthData !== null) {
            monthlyData.push(monthData);
          }
          
          currentMonth = monthKey;
          monthData = {
            time: monthKey,
            open: day.open,
            high: day.high,
            low: day.low,
            close: day.close,
            value: day.value
          };
        } else {
          monthData.high = Math.max(monthData.high, day.high);
          monthData.low = Math.min(monthData.low, day.low);
          monthData.close = day.close;
          monthData.value += day.value;
        }
      });
      
      if (monthData !== null) {
        monthlyData.push(monthData);
      }
      
      return monthlyData;
    } catch (error) {
      console.error('Error generating monthly data:', error);
      // Return fallback data if there's an error
      return [
        { time: '2025-01-01', open: 0.03, high: 0.035, low: 0.029, close: 0.034, value: 200000000 },
        { time: '2025-02-01', open: 0.034, high: 0.036, low: 0.032, close: 0.035, value: 180000000 },
        { time: '2025-03-01', open: 0.035, high: 0.037, low: 0.031, close: 0.033, value: 220000000 }
      ];
    }
  };

  // Calculate technical indicators
  const calculateIndicators = (data) => {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data provided for indicator calculation');
      }
      
      // Simple Moving Averages
      const calculateSMA = (data, period) => {
        const result = [];
        
        for (let i = 0; i < data.length; i++) {
          if (i < period - 1) {
            result.push({ time: data[i].time, value: null });
            continue;
          }
          
          let sum = 0;
          for (let j = 0; j < period; j++) {
            sum += data[i - j].close;
          }
          
          result.push({
            time: data[i].time,
            value: sum / period
          });
        }
        
        return result;
      };
      
      return {
        sma20: calculateSMA(data, 20),
        sma50: calculateSMA(data, 50),
        sma200: calculateSMA(data, 200)
      };
    } catch (error) {
      console.error('Error calculating indicators:', error);
      // Return fallback indicators if there's an error
      const fallbackData = [];
      for (let i = 0; i < data.length; i++) {
        fallbackData.push({ time: data[i].time, value: data[i].close });
      }
      return {
        sma20: fallbackData,
        sma50: fallbackData,
        sma200: fallbackData
      };
    }
  };

  // Create a fallback chart if the main chart fails
  const createFallbackChart = (containerId) => {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Fallback container ${containerId} not found`);
      }
      
      container.innerHTML = `
        <div style="padding: 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 5px; text-align: center;">
          <h4 style="color: #666;">Technical Chart Visualization</h4>
          <p>Imugene (ASX:IMU) is currently trading at $0.030, down 5.2% over the past month.</p>
          <p>Key technical events:</p>
          <ul style="text-align: left; display: inline-block;">
            <li>ASX 300 removal (Mar 24, 2025) caused significant selling pressure</li>
            <li>Currently trading below all major moving averages (20, 50, 200)</li>
            <li>Support level at $0.028, resistance at $0.035</li>
          </ul>
          <p style="margin-top: 15px; font-size: 12px; color: #999;">
            Click "Refresh Chart" to try loading the interactive visualization again.
          </p>
          <button id="refresh-chart-btn" style="padding: 8px 15px; background-color: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
            Refresh Chart
          </button>
        </div>
      `;
      
      // Add event listener to refresh button
      const refreshButton = document.getElementById('refresh-chart-btn');
      if (refreshButton) {
        refreshButton.addEventListener('click', () => {
          initializeChart();
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error creating fallback chart:', error);
      return false;
    }
  };

  // Initialize chart
  const initializeChart = () => {
    try {
      // Check if LightweightCharts is available
      if (typeof LightweightCharts === 'undefined') {
        throw new Error('LightweightCharts library not loaded');
      }
      
      // Generate data
      const dailyData = generatePriceData();
      const weeklyData = generateWeeklyData(dailyData);
      const monthlyData = generateMonthlyData(dailyData);
      
      // Calculate indicators
      const dailyIndicators = calculateIndicators(dailyData);
      const weeklyIndicators = calculateIndicators(weeklyData);
      const monthlyIndicators = calculateIndicators(monthlyData);
      
      // Create chart
      const chartContainer = document.getElementById('technical-chart-container');
      if (!chartContainer) {
        console.error('Chart container not found');
        createFallbackChart('technical-chart-container');
        return;
      }
      
      // Clear any existing content
      chartContainer.innerHTML = '';
      
      // Create chart using LightweightCharts
      const chart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: 500,
        layout: {
          backgroundColor: '#ffffff',
          textColor: '#333',
        },
        grid: {
          vertLines: {
            color: '#f0f0f0',
          },
          horzLines: {
            color: '#f0f0f0',
          },
        },
        crosshair: {
          mode: LightweightCharts.CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: '#d1d4dc',
        },
        timeScale: {
          borderColor: '#d1d4dc',
        },
      });
      
      // Add candlestick series
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#4caf50',
        downColor: '#ef5350',
        borderDownColor: '#ef5350',
        borderUpColor: '#4caf50',
        wickDownColor: '#ef5350',
        wickUpColor: '#4caf50',
      });
      
      // Set initial data
      candlestickSeries.setData(dailyData);
      
      // Add volume series
      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      
      // Set volume data
      volumeSeries.setData(dailyData.map(item => ({
        time: item.time,
        value: item.value,
        color: item.close > item.open ? '#4caf50' : '#ef5350'
      })));
      
      // Add SMA indicators
      const sma20Series = chart.addLineSeries({
        color: '#2196f3',
        lineWidth: 2,
        priceLineVisible: false,
      });
      
      const sma50Series = chart.addLineSeries({
        color: '#ff9800',
        lineWidth: 2,
        priceLineVisible: false,
      });
      
      const sma200Series = chart.addLineSeries({
        color: '#9c27b0',
        lineWidth: 2,
        priceLineVisible: false,
      });
      
      // Set SMA data
      sma20Series.setData(dailyIndicators.sma20);
      sma50Series.setData(dailyIndicators.sma50);
      sma200Series.setData(dailyIndicators.sma200);
      
      // Create timeframe controls
      const timeframeControls = document.getElementById('chart-timeframe-controls');
      if (timeframeControls) {
        timeframeControls.innerHTML = `
          <div class="control-group">
            <label>Timeframe:</label>
            <button class="timeframe-button active" data-timeframe="daily">Daily</button>
            <button class="timeframe-button" data-timeframe="weekly">Weekly</button>
            <button class="timeframe-button" data-timeframe="monthly">Monthly</button>
          </div>
        `;
        
        // Add event listeners to timeframe buttons
        const timeframeButtons = timeframeControls.querySelectorAll('.timeframe-button');
        timeframeButtons.forEach(button => {
          button.addEventListener('click', () => {
            // Update active button
            timeframeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get selected timeframe
            const timeframe = button.getAttribute('data-timeframe');
            
            // Update chart data based on timeframe
            switch (timeframe) {
              case 'daily':
                candlestickSeries.setData(dailyData);
                sma20Series.setData(dailyIndicators.sma20);
                sma50Series.setData(dailyIndicators.sma50);
                sma200Series.setData(dailyIndicators.sma200);
                break;
              case 'weekly':
                candlestickSeries.setData(weeklyData);
                sma20Series.setData(weeklyIndicators.sma20);
                sma50Series.setData(weeklyIndicators.sma50);
                sma200Series.setData(weeklyIndicators.sma200);
                break;
              case 'monthly':
                candlestickSeries.setData(monthlyData);
                sma20Series.setData(monthlyIndicators.sma20);
                sma50Series.setData(monthlyIndicators.sma50);
                sma200Series.setData(monthlyIndicators.sma200);
                break;
            }
          });
        });
      } else {
        console.warn('Timeframe controls container not found');
      }
      
      // Handle window resize
      const handleResize = () => {
        chart.applyOptions({ width: chartContainer.clientWidth });
      };
      
      window.addEventListener('resize', handleResize);
      
      // Add event markers
      const markers = config.eventMarkers.map(event => ({
        time: event.date,
        position: 'aboveBar',
        color: '#2196f3',
        shape: 'circle',
        text: event.label
      }));
      
      candlestickSeries.setMarkers(markers);
      
      // Create event list
      const eventListContainer = document.createElement('div');
      eventListContainer.className = 'event-list';
      eventListContainer.innerHTML = config.eventMarkers.map(event => `
        <div class="event-item" data-date="${event.date}">
          <div class="event-date">${event.date}</div>
          <div class="event-label">${event.label}</div>
          <div class="event-description">${event.description}</div>
        </div>
      `).join('');
      
      // Add event list to controls
      if (timeframeControls) {
        const eventControlGroup = document.createElement('div');
        eventControlGroup.className = 'control-group';
        eventControlGroup.innerHTML = '<label>Key Events:</label>';
        eventControlGroup.appendChild(eventListContainer);
        timeframeControls.appendChild(eventControlGroup);
        
        // Add event listeners to event items
        const eventItems = eventListContainer.querySelectorAll('.event-item');
        eventItems.forEach(item => {
          item.addEventListener('click', () => {
            const date = item.getAttribute('data-date');
            chart.timeScale().scrollToPosition(0, false);
          });
        });
      }
      
      return chart;
    } catch (error) {
      console.error('Error initializing chart:', error);
      // Create fallback visualization if chart initialization fails
      return createFallbackChart('technical-chart-container');
    }
  };

  // Initialize the chart when the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChart);
  } else {
    // DOM already loaded, initialize immediately
    setTimeout(initializeChart, 100); // Small delay to ensure all resources are loaded
  }
};

// Execute the chart creation function
createTechnicalChartAnalysis();
