// Institutional Ownership Breakdown Visualization
document.addEventListener('DOMContentLoaded', function() {
  // Check if the container exists
  const container = document.getElementById('institutional-breakdown-chart');
  if (!container) return;

  // Remove the coming soon placeholder if it exists
  const placeholder = container.querySelector('.coming-soon-placeholder');
  if (placeholder) {
    container.removeChild(placeholder);
  }

  // Sample data for institutional ownership
  const institutionalData = [
    { institution: 'Vanguard Group', shares: 78500000, percentOwnership: 3.92, changeQuarter: -20.0 },
    { institution: 'BlackRock Inc.', shares: 65300000, percentOwnership: 3.26, changeQuarter: -5.2 },
    { institution: 'State Street Corporation', shares: 42100000, percentOwnership: 2.10, changeQuarter: -12.5 },
    { institution: 'Dimensional Fund Advisors', shares: 28700000, percentOwnership: 1.43, changeQuarter: -8.3 },
    { institution: 'Geode Capital Management', shares: 22500000, percentOwnership: 1.12, changeQuarter: -3.1 },
    { institution: 'Northern Trust Corporation', shares: 18200000, percentOwnership: 0.91, changeQuarter: -7.6 },
    { institution: 'Charles Schwab Investment', shares: 15800000, percentOwnership: 0.79, changeQuarter: -4.8 },
    { institution: 'Morgan Stanley', shares: 12400000, percentOwnership: 0.62, changeQuarter: 2.5 },
    { institution: 'Fidelity Management', shares: 10900000, percentOwnership: 0.54, changeQuarter: 1.8 },
    { institution: 'Other Institutions', shares: 98600000, percentOwnership: 4.93, changeQuarter: -15.2 }
  ];

  // Historical data for institutional ownership trend
  const historicalData = [
    { date: '2023-Q2', totalInstitutionalOwnership: 25.8 },
    { date: '2023-Q3', totalInstitutionalOwnership: 23.2 },
    { date: '2023-Q4', totalInstitutionalOwnership: 21.5 },
    { date: '2024-Q1', totalInstitutionalOwnership: 19.8 },
    { date: '2024-Q2', totalInstitutionalOwnership: 19.6 }
  ];

  // Create controls
  const controlsContainer = document.getElementById('institutional-breakdown-controls');
  if (controlsContainer) {
    controlsContainer.innerHTML = `
      <div class="control-group">
        <label>View Type:</label>
        <div class="button-group">
          <button id="view-breakdown" class="control-button active">Current Breakdown</button>
          <button id="view-historical" class="control-button">Historical Trend</button>
          <button id="view-comparison" class="control-button">Peer Comparison</button>
        </div>
      </div>
      <div class="control-group">
        <label>Display Options:</label>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" id="show-percentage" checked> Show as Percentage
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="show-changes" checked> Show Quarterly Changes
          </label>
        </div>
      </div>
    `;
  }

  // Create the visualization container
  container.innerHTML = `
    <div id="ownership-chart-container" style="height: 400px;"></div>
    <div id="ownership-details" class="details-panel">
      <h4>Institutional Ownership Summary</h4>
      <div class="summary-stats">
        <div class="stat-item">
          <div class="stat-value">19.6%</div>
          <div class="stat-label">Total Institutional Ownership</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">-2.1%</div>
          <div class="stat-label">Change from Previous Quarter</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">10</div>
          <div class="stat-label">Major Institutions</div>
        </div>
      </div>
      <div class="ownership-table-container">
        <table class="ownership-table">
          <thead>
            <tr>
              <th>Institution</th>
              <th>Shares</th>
              <th>% Ownership</th>
              <th>Quarterly Change</th>
            </tr>
          </thead>
          <tbody>
            ${institutionalData.map(item => `
              <tr>
                <td>${item.institution}</td>
                <td>${(item.shares / 1000000).toFixed(1)}M</td>
                <td>${item.percentOwnership.toFixed(2)}%</td>
                <td class="${item.changeQuarter >= 0 ? 'positive' : 'negative'}">${item.changeQuarter >= 0 ? '+' : ''}${item.changeQuarter.toFixed(1)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Create the pie chart using Chart.js
  const ctx = document.createElement('canvas');
  ctx.id = 'ownership-pie-chart';
  document.getElementById('ownership-chart-container').appendChild(ctx);

  const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: institutionalData.map(item => item.institution),
      datasets: [{
        data: institutionalData.map(item => item.percentOwnership),
        backgroundColor: [
          '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
          '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const institution = institutionalData[context.dataIndex];
              return [
                `${label}: ${value.toFixed(2)}%`,
                `Shares: ${(institution.shares / 1000000).toFixed(1)}M`,
                `Change: ${institution.changeQuarter >= 0 ? '+' : ''}${institution.changeQuarter.toFixed(1)}%`
              ];
            }
          }
        }
      }
    }
  });

  // Add event listeners for controls
  const viewBreakdownBtn = document.getElementById('view-breakdown');
  const viewHistoricalBtn = document.getElementById('view-historical');
  const viewComparisonBtn = document.getElementById('view-comparison');
  const showPercentageCheckbox = document.getElementById('show-percentage');
  const showChangesCheckbox = document.getElementById('show-changes');

  if (viewBreakdownBtn && viewHistoricalBtn && viewComparisonBtn) {
    // View type buttons
    viewBreakdownBtn.addEventListener('click', function() {
      setActiveButton(this);
      showPieChart();
    });

    viewHistoricalBtn.addEventListener('click', function() {
      setActiveButton(this);
      showHistoricalChart();
    });

    viewComparisonBtn.addEventListener('click', function() {
      setActiveButton(this);
      showComparisonChart();
    });

    // Helper function to set active button
    function setActiveButton(button) {
      [viewBreakdownBtn, viewHistoricalBtn, viewComparisonBtn].forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
    }

    // Show pie chart (default view)
    function showPieChart() {
      const container = document.getElementById('ownership-chart-container');
      container.innerHTML = '';
      const canvas = document.createElement('canvas');
      canvas.id = 'ownership-pie-chart';
      container.appendChild(canvas);

      new Chart(canvas, {
        type: 'pie',
        data: {
          labels: institutionalData.map(item => item.institution),
          datasets: [{
            data: showPercentageCheckbox && showPercentageCheckbox.checked ? 
              institutionalData.map(item => item.percentOwnership) :
              institutionalData.map(item => item.shares),
            backgroundColor: [
              '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
              '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 15,
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const institution = institutionalData[context.dataIndex];
                  if (showPercentageCheckbox && showPercentageCheckbox.checked) {
                    return [
                      `${label}: ${value.toFixed(2)}%`,
                      `Shares: ${(institution.shares / 1000000).toFixed(1)}M`,
                      `Change: ${institution.changeQuarter >= 0 ? '+' : ''}${institution.changeQuarter.toFixed(1)}%`
                    ];
                  } else {
                    return [
                      `${label}: ${(value / 1000000).toFixed(1)}M shares`,
                      `Ownership: ${institution.percentOwnership.toFixed(2)}%`,
                      `Change: ${institution.changeQuarter >= 0 ? '+' : ''}${institution.changeQuarter.toFixed(1)}%`
                    ];
                  }
                }
              }
            }
          }
        }
      });
    }

    // Show historical trend chart
    function showHistoricalChart() {
      const container = document.getElementById('ownership-chart-container');
      container.innerHTML = '';
      const canvas = document.createElement('canvas');
      canvas.id = 'ownership-historical-chart';
      container.appendChild(canvas);

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: historicalData.map(item => item.date),
          datasets: [{
            label: 'Total Institutional Ownership (%)',
            data: historicalData.map(item => item.totalInstitutionalOwnership),
            borderColor: '#4e79a7',
            backgroundColor: 'rgba(78, 121, 167, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Ownership Percentage'
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
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Institutional Ownership: ${context.raw}%`;
                }
              }
            }
          }
        }
      });

      // Update details panel for historical view
      document.getElementById('ownership-details').innerHTML = `
        <h4>Institutional Ownership Trend Analysis</h4>
        <p>Institutional ownership has been steadily declining over the past year, dropping from 25.8% in Q2 2023 to 19.6% in Q2 2024. This represents a 6.2 percentage point decrease over the period.</p>
        <p>The decline accelerated following Imugene's removal from the ASX300 index in March 2024, which triggered automatic selling from index-tracking funds.</p>
        <h4>Key Events Affecting Institutional Ownership</h4>
        <ul>
          <li><strong>Q3 2023:</strong> Vanguard reduced position by 12% following disappointing trial results</li>
          <li><strong>Q4 2023:</strong> BlackRock reduced position by 8% amid broader biotech sector rotation</li>
          <li><strong>Q1 2024:</strong> ASX300 index removal triggered selling from index funds</li>
          <li><strong>Q2 2024:</strong> Morgan Stanley and Fidelity increased positions slightly, potentially indicating value opportunity</li>
        </ul>
      `;
    }

    // Show peer comparison chart
    function showComparisonChart() {
      const container = document.getElementById('ownership-chart-container');
      container.innerHTML = '';
      const canvas = document.createElement('canvas');
      canvas.id = 'ownership-comparison-chart';
      container.appendChild(canvas);

      // Sample peer comparison data
      const peerData = [
        { company: 'Imugene', institutionalOwnership: 19.6 },
        { company: 'Immutep', institutionalOwnership: 28.4 },
        { company: 'Telix', institutionalOwnership: 42.3 },
        { company: 'Kazia', institutionalOwnership: 15.8 },
        { company: 'Prescient', institutionalOwnership: 22.1 },
        { company: 'Race Oncology', institutionalOwnership: 18.7 },
        { company: 'Sector Average', institutionalOwnership: 31.5 }
      ];

      new Chart(canvas, {
        type: 'bar',
        data: {
          labels: peerData.map(item => item.company),
          datasets: [{
            label: 'Institutional Ownership (%)',
            data: peerData.map(item => item.institutionalOwnership),
            backgroundColor: peerData.map(item => 
              item.company === 'Imugene' ? '#e15759' : 
              item.company === 'Sector Average' ? '#4e79a7' : '#76b7b2'
            ),
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
                text: 'Ownership Percentage'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Company'
              }
            }
          }
        }
      });

      // Update details panel for comparison view
      document.getElementById('ownership-details').innerHTML = `
        <h4>Peer Comparison Analysis</h4>
        <p>Imugene's institutional ownership (19.6%) is below the sector average of 31.5% for ASX-listed biotechnology companies. This positions Imugene in the lower quartile of institutional investment among its peers.</p>
        <p>Companies with more advanced clinical programs or commercial products, such as Telix Pharmaceuticals, attract significantly higher institutional investment (42.3%).</p>
        <h4>Factors Affecting Relative Institutional Interest</h4>
        <ul>
          <li><strong>Clinical Stage:</strong> Imugene's programs are primarily in Phase 1/2, while peers with Phase 3 or commercial assets attract more institutional capital</li>
          <li><strong>Cash Runway:</strong> Imugene's shorter cash runway (3 quarters) compared to some peers creates uncertainty for institutional investors</li>
          <li><strong>Index Inclusion:</strong> Telix and Immutep remain in key indices, supporting higher institutional ownership</li>
          <li><strong>Analyst Coverage:</strong> Imugene has fewer covering analysts than larger peers, reducing institutional visibility</li>
        </ul>
      `;
    }
  }

  // Add event listeners for display options
  if (showPercentageCheckbox && showChangesCheckbox) {
    showPercentageCheckbox.addEventListener('change', function() {
      if (viewBreakdownBtn.classList.contains('active')) {
        showPieChart();
      }
    });

    showChangesCheckbox.addEventListener('change', function() {
      const changeColumn = document.querySelectorAll('.ownership-table th:last-child, .ownership-table td:last-child');
      changeColumn.forEach(cell => {
        cell.style.display = this.checked ? '' : 'none';
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
    
    .ownership-table-container {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    .ownership-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .ownership-table th, .ownership-table td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    .ownership-table th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    
    .ownership-table tr:hover {
      background-color: #f9f9f9;
    }
    
    .positive {
      color: #4caf50;
    }
    
    .negative {
      color: #f44336;
    }
  `;
  document.head.appendChild(style);
});
