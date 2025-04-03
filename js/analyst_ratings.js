// Analyst Ratings & Price Targets Visualization
document.addEventListener('DOMContentLoaded', function() {
  // Check if the container exists
  const container = document.getElementById('analyst-ratings-chart');
  if (!container) return;

  // Remove the coming soon placeholder if it exists
  const placeholder = container.querySelector('.coming-soon-placeholder');
  if (placeholder) {
    container.removeChild(placeholder);
  }

  // Sample data for analyst ratings
  const analystData = [
    { firm: 'Bell Potter', analyst: 'John Smith', rating: 'Buy', priceTarget: 0.12, date: '2025-03-15', previousRating: 'Buy', previousTarget: 0.15 },
    { firm: 'Wilsons', analyst: 'Sarah Johnson', rating: 'Outperform', priceTarget: 0.09, date: '2025-03-10', previousRating: 'Outperform', previousTarget: 0.11 },
    { firm: 'Morgans', analyst: 'David Chen', rating: 'Hold', priceTarget: 0.06, date: '2025-02-28', previousRating: 'Buy', previousTarget: 0.10 },
    { firm: 'Canaccord Genuity', analyst: 'Emma Williams', rating: 'Buy', priceTarget: 0.11, date: '2025-02-15', previousRating: 'Buy', previousTarget: 0.12 },
    { firm: 'Shaw and Partners', analyst: 'Michael Taylor', rating: 'Hold', priceTarget: 0.05, date: '2025-02-05', previousRating: 'Hold', previousTarget: 0.07 },
    { firm: 'Ord Minnett', analyst: 'Jessica Brown', rating: 'Buy', priceTarget: 0.08, date: '2025-01-20', previousRating: 'Buy', previousTarget: 0.09 },
    { firm: 'Macquarie', analyst: 'Robert Lee', rating: 'Neutral', priceTarget: 0.06, date: '2025-01-10', previousRating: 'Outperform', previousTarget: 0.08 }
  ];

  // Historical price target data
  const historicalTargets = [
    { date: '2024-Q2', averageTarget: 0.15, highTarget: 0.20, lowTarget: 0.12, actualPrice: 0.08 },
    { date: '2024-Q3', averageTarget: 0.12, highTarget: 0.18, lowTarget: 0.09, actualPrice: 0.06 },
    { date: '2024-Q4', averageTarget: 0.10, highTarget: 0.15, lowTarget: 0.07, actualPrice: 0.05 },
    { date: '2025-Q1', averageTarget: 0.08, highTarget: 0.12, lowTarget: 0.05, actualPrice: 0.03 }
  ];

  // Calculate consensus data
  const ratingCounts = {
    'Buy': 0,
    'Outperform': 0,
    'Hold': 0,
    'Neutral': 0,
    'Underperform': 0,
    'Sell': 0
  };

  analystData.forEach(analyst => {
    ratingCounts[analyst.rating]++;
  });

  const currentPriceTargets = analystData.map(a => a.priceTarget);
  const averagePriceTarget = currentPriceTargets.reduce((a, b) => a + b, 0) / currentPriceTargets.length;
  const highPriceTarget = Math.max(...currentPriceTargets);
  const lowPriceTarget = Math.min(...currentPriceTargets);
  const currentPrice = 0.03; // Current share price
  const upside = ((averagePriceTarget / currentPrice) - 1) * 100;

  // Create controls
  const controlsContainer = document.getElementById('analyst-ratings-controls');
  if (controlsContainer) {
    controlsContainer.innerHTML = `
      <div class="control-group">
        <label>View Type:</label>
        <div class="button-group">
          <button id="view-consensus" class="control-button active">Consensus View</button>
          <button id="view-historical" class="control-button">Historical Targets</button>
          <button id="view-individual" class="control-button">Individual Ratings</button>
        </div>
      </div>
      <div class="control-group">
        <label>Display Options:</label>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" id="show-current-price" checked> Show Current Price
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="show-upside" checked> Show Upside Potential
          </label>
        </div>
      </div>
    `;
  }

  // Create the visualization container
  container.innerHTML = `
    <div id="ratings-chart-container" style="height: 400px;"></div>
    <div id="ratings-details" class="details-panel">
      <h4>Analyst Consensus Summary</h4>
      <div class="summary-stats">
        <div class="stat-item">
          <div class="stat-value">$${averagePriceTarget.toFixed(2)}</div>
          <div class="stat-label">Average Price Target</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${upside.toFixed(0)}%</div>
          <div class="stat-label">Upside Potential</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${analystData.length}</div>
          <div class="stat-label">Covering Analysts</div>
        </div>
      </div>
      <div class="ratings-table-container">
        <table class="ratings-table">
          <thead>
            <tr>
              <th>Firm</th>
              <th>Analyst</th>
              <th>Rating</th>
              <th>Price Target</th>
              <th>Date</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            ${analystData.map(item => `
              <tr>
                <td>${item.firm}</td>
                <td>${item.analyst}</td>
                <td class="${getRatingClass(item.rating)}">${item.rating}</td>
                <td>$${item.priceTarget.toFixed(2)}</td>
                <td>${formatDate(item.date)}</td>
                <td>${getPriceTargetChange(item)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Helper functions for table formatting
  function getRatingClass(rating) {
    switch(rating) {
      case 'Buy':
      case 'Outperform':
        return 'positive';
      case 'Hold':
      case 'Neutral':
        return 'neutral';
      case 'Underperform':
      case 'Sell':
        return 'negative';
      default:
        return '';
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function getPriceTargetChange(item) {
    const change = item.priceTarget - item.previousTarget;
    const percentChange = (change / item.previousTarget) * 100;
    const changeClass = change >= 0 ? 'positive' : 'negative';
    const changeSymbol = change >= 0 ? '+' : '';
    return `<span class="${changeClass}">${changeSymbol}$${change.toFixed(2)} (${changeSymbol}${percentChange.toFixed(1)}%)</span>`;
  }

  // Create the consensus chart (default view)
  function createConsensusChart() {
    const container = document.getElementById('ratings-chart-container');
    container.innerHTML = '';

    // Create two chart areas - one for ratings distribution and one for price targets
    const ratingsContainer = document.createElement('div');
    ratingsContainer.style.width = '50%';
    ratingsContainer.style.height = '100%';
    ratingsContainer.style.float = 'left';
    ratingsContainer.id = 'ratings-distribution';

    const targetsContainer = document.createElement('div');
    targetsContainer.style.width = '50%';
    targetsContainer.style.height = '100%';
    targetsContainer.style.float = 'left';
    targetsContainer.id = 'price-targets';

    container.appendChild(ratingsContainer);
    container.appendChild(targetsContainer);

    // Create ratings distribution chart
    const ratingsCanvas = document.createElement('canvas');
    ratingsCanvas.id = 'ratings-distribution-chart';
    ratingsContainer.appendChild(ratingsCanvas);

    new Chart(ratingsCanvas, {
      type: 'pie',
      data: {
        labels: Object.keys(ratingCounts).filter(key => ratingCounts[key] > 0),
        datasets: [{
          data: Object.values(ratingCounts).filter(count => count > 0),
          backgroundColor: [
            '#4caf50', // Buy
            '#8bc34a', // Outperform
            '#ffc107', // Hold
            '#ff9800', // Neutral
            '#ff5722', // Underperform
            '#f44336'  // Sell
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          title: {
            display: true,
            text: 'Analyst Ratings Distribution',
            font: {
              size: 16
            }
          }
        }
      }
    });

    // Create price targets chart
    const targetsCanvas = document.createElement('canvas');
    targetsCanvas.id = 'price-targets-chart';
    targetsContainer.appendChild(targetsCanvas);

    const showCurrentPrice = document.getElementById('show-current-price') && 
                            document.getElementById('show-current-price').checked;

    const ctx = targetsCanvas.getContext('2d');
    const priceTargetsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Low', 'Average', 'High'],
        datasets: [{
          label: 'Price Target',
          data: [lowPriceTarget, averagePriceTarget, highPriceTarget],
          backgroundColor: ['#ff9800', '#4caf50', '#2196f3'],
          borderColor: ['#f57c00', '#388e3c', '#1976d2'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Price (AUD)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Price Target Range',
            font: {
              size: 16
            }
          },
          annotation: showCurrentPrice ? {
            annotations: {
              line1: {
                type: 'line',
                yMin: currentPrice,
                yMax: currentPrice,
                borderColor: '#f44336',
                borderWidth: 2,
                label: {
                  content: `Current: $${currentPrice.toFixed(2)}`,
                  enabled: true,
                  position: 'start'
                }
              }
            }
          } : {}
        }
      }
    });

    // Add current price line if option is checked
    if (showCurrentPrice) {
      const yScale = priceTargetsChart.scales.y;
      const ctx = priceTargetsChart.ctx;
      const currentPriceY = yScale.getPixelForValue(currentPrice);
      
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(yScale.left, currentPriceY);
      ctx.lineTo(yScale.right, currentPriceY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f44336';
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      
      ctx.fillStyle = '#f44336';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`Current: $${currentPrice.toFixed(2)}`, yScale.right + 5, currentPriceY);
      ctx.restore();
    }
  }

  // Create historical price targets chart
  function createHistoricalChart() {
    const container = document.getElementById('ratings-chart-container');
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'historical-targets-chart';
    container.appendChild(canvas);

    const showCurrentPrice = document.getElementById('show-current-price') && 
                            document.getElementById('show-current-price').checked;

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: historicalTargets.map(item => item.date),
        datasets: [
          {
            label: 'Average Target',
            data: historicalTargets.map(item => item.averageTarget),
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          },
          {
            label: 'High Target',
            data: historicalTargets.map(item => item.highTarget),
            borderColor: '#2196f3',
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4
          },
          {
            label: 'Low Target',
            data: historicalTargets.map(item => item.lowTarget),
            borderColor: '#ff9800',
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4
          },
          {
            label: 'Actual Price',
            data: historicalTargets.map(item => item.actualPrice),
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Price (AUD)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Quarter'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Historical Price Targets vs. Actual Price',
            font: {
              size: 16
            }
          }
        }
      }
    });

    // Update details panel for historical view
    document.getElementById('ratings-details').innerHTML = `
      <h4>Historical Price Target Analysis</h4>
      <p>Analyst price targets for Imugene have been steadily declining over the past year, with the average target dropping from $0.15 in Q2 2024 to $0.08 in Q1 2025. This represents a 47% decrease in expected valuation.</p>
      <p>The actual share price has consistently traded below analyst targets, with the gap widening in recent quarters. This suggests analysts have been overly optimistic about Imugene's near-term prospects.</p>
      <h4>Key Events Affecting Analyst Targets</h4>
      <ul>
        <li><strong>Q3 2024:</strong> Multiple analysts lowered targets following slower-than-expected patient recruitment in key trials</li>
        <li><strong>Q4 2024:</strong> Cash runway concerns prompted further target reductions</li>
        <li><strong>Q1 2025:</strong> ASX300 index removal and broader biotech sector weakness led to additional downgrades</li>
      </ul>
      <h4>Target Accuracy Analysis</h4>
      <p>On average, analyst price targets have been 87% higher than the actual trading price over the past year. This significant discrepancy highlights the challenges in valuing early-stage biotech companies with multiple clinical programs but limited near-term catalysts.</p>
    `;
  }

  // Create individual analyst ratings chart
  function createIndividualChart() {
    const container = document.getElementById('ratings-chart-container');
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'individual-ratings-chart';
    container.appendChild(canvas);

    // Sort analysts by price target (descending)
    const sortedAnalysts = [...analystData].sort((a, b) => b.priceTarget - a.priceTarget);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: sortedAnalysts.map(item => item.firm),
        datasets: [{
          label: 'Price Target',
          data: sortedAnalysts.map(item => item.priceTarget),
          backgroundColor: sortedAnalysts.map(item => {
            switch(item.rating) {
              case 'Buy':
              case 'Outperform':
                return '#4caf50';
              case 'Hold':
              case 'Neutral':
                return '#ffc107';
              case 'Underperform':
              case 'Sell':
                return '#f44336';
              default:
                return '#9e9e9e';
            }
          }),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Price Target (AUD)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Analyst Firm'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Individual Analyst Price Targets',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const analyst = sortedAnalysts[context.dataIndex];
                return [
                  `Price Target: $${analyst.priceTarget.toFixed(2)}`,
                  `Rating: ${analyst.rating}`,
                  `Analyst: ${analyst.analyst}`,
                  `Date: ${formatDate(analyst.date)}`
                ];
              }
            }
          }
        }
      }
    });

    // Add current price line if option is checked
    const showCurrentPrice = document.getElementById('show-current-price') && 
                            document.getElementById('show-current-price').checked;
    
    if (showCurrentPrice) {
      const chartInstance = Chart.getChart('individual-ratings-chart');
      const yScale = chartInstance.scales.y;
      const ctx = chartInstance.ctx;
      const currentPriceY = yScale.getPixelForValue(currentPrice);
      
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(yScale.left, currentPriceY);
      ctx.lineTo(yScale.right, currentPriceY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f44336';
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      
      ctx.fillStyle = '#f44336';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`Current: $${currentPrice.toFixed(2)}`, yScale.right + 5, currentPriceY);
      ctx.restore();
    }
  }

  // Add event listeners for controls
  const viewConsensusBtn = document.getElementById('view-consensus');
  const viewHistoricalBtn = document.getElementById('view-historical');
  const viewIndividualBtn = document.getElementById('view-individual');
  const showCurrentPriceCheckbox = document.getElementById('show-current-price');
  const showUpsideCheckbox = document.getElementById('show-upside');

  if (viewConsensusBtn && viewHistoricalBtn && viewIndividualBtn) {
    // View type buttons
    viewConsensusBtn.addEventListener('click', function() {
      setActiveButton(this);
      createConsensusChart();
    });

    viewHistoricalBtn.addEventListener('click', function() {
      setActiveButton(this);
      createHistoricalChart();
    });

    viewIndividualBtn.addEventListener('click', function() {
      setActiveButton(this);
      createIndividualChart();
    });

    // Helper function to set active button
    function setActiveButton(button) {
      [viewConsensusBtn, viewHistoricalBtn, viewIndividualBtn].forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
    }
  }

  // Add event listeners for display options
  if (showCurrentPriceCheckbox) {
    showCurrentPriceCheckbox.addEventListener('change', function() {
      if (viewConsensusBtn.classList.contains('active')) {
        createConsensusChart();
      } else if (viewHistoricalBtn.classList.contains('active')) {
        createHistoricalChart();
      } else if (viewIndividualBtn.classList.contains('active')) {
        createIndividualChart();
      }
    });
  }

  if (showUpsideCheckbox) {
    showUpsideCheckbox.addEventListener('change', function() {
      const upsideElements = document.querySelectorAll('.upside-potential');
      upsideElements.forEach(el => {
        el.style.display = this.checked ? 'block' : 'none';
      });
    });
  }

  // Add styles for the visualization
  const style = document.createElement('style');
  style.textContent = `
    .control-button {
      padding: 8px 12px;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 5px;
      font-size: 14px;
    }
    
    .control-button.active {
      background-color: #4e79a7;
      color: white;
      border-color: #4e79a7;
    }
    
    .button-group {
      display: flex;
      margin-bottom: 10px;
    }
    
    .checkbox-group {
      display: flex;
      margin-bottom: 10px;
    }
    
    .checkbox-label {
      margin-right: 15px;
      display: flex;
      align-items: center;
    }
    
    .checkbox-label input {
      margin-right: 5px;
    }
    
    .details-panel {
      margin-top: 20px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 5px;
      border: 1px solid #eee;
    }
    
    .summary-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    
    .stat-item {
      text-align: center;
      padding: 10px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      flex: 1;
      margin: 0 5px;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 14px;
      color: #666;
    }
    
    .ratings-table-container {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    .ratings-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .ratings-table th, .ratings-table td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    .ratings-table th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    
    .ratings-table tr:hover {
      background-color: #f9f9f9;
    }
    
    .positive {
      color: #4caf50;
    }
    
    .neutral {
      color: #ffc107;
    }
    
    .negative {
      color: #f44336;
    }
    
    .upside-potential {
      display: block;
      margin-top: 5px;
      font-size: 14px;
    }
  `;
  document.head.appendChild(style);

  // Initialize default view
  createConsensusChart();
});
