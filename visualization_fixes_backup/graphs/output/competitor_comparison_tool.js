// Competitor Comparison Tool Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('competitor-comparison-container');
    if (!container) return;

    console.log("Competitor Comparison Tool: Container found, initializing");
    
    // Sample data for competitor comparison
    const competitorData = {
        companies: [
            {
                name: 'Imugene',
                marketCap: 72000000,
                cashPosition: 53000000,
                burnRate: 17000000,
                pipelineValue: 120000000,
                clinicalTrials: 5,
                phaseDistribution: { 'Preclinical': 2, 'Phase 1': 2, 'Phase 2': 1, 'Phase 3': 0 }
            },
            {
                name: 'Prescient Therapeutics',
                marketCap: 45000000,
                cashPosition: 28000000,
                burnRate: 9000000,
                pipelineValue: 80000000,
                clinicalTrials: 3,
                phaseDistribution: { 'Preclinical': 1, 'Phase 1': 2, 'Phase 2': 0, 'Phase 3': 0 }
            },
            {
                name: 'Immutep',
                marketCap: 210000000,
                cashPosition: 87000000,
                burnRate: 22000000,
                pipelineValue: 350000000,
                clinicalTrials: 7,
                phaseDistribution: { 'Preclinical': 1, 'Phase 1': 2, 'Phase 2': 3, 'Phase 3': 1 }
            },
            {
                name: 'Chimeric Therapeutics',
                marketCap: 38000000,
                cashPosition: 19000000,
                burnRate: 8000000,
                pipelineValue: 65000000,
                clinicalTrials: 2,
                phaseDistribution: { 'Preclinical': 1, 'Phase 1': 1, 'Phase 2': 0, 'Phase 3': 0 }
            },
            {
                name: 'Kazia Therapeutics',
                marketCap: 95000000,
                cashPosition: 42000000,
                burnRate: 15000000,
                pipelineValue: 180000000,
                clinicalTrials: 4,
                phaseDistribution: { 'Preclinical': 0, 'Phase 1': 1, 'Phase 2': 2, 'Phase 3': 1 }
            }
        ],
        metrics: [
            { id: 'marketCap', name: 'Market Cap ($M)', format: 'currency' },
            { id: 'cashPosition', name: 'Cash Position ($M)', format: 'currency' },
            { id: 'burnRate', name: 'Annual Burn Rate ($M)', format: 'currency' },
            { id: 'pipelineValue', name: 'Est. Pipeline Value ($M)', format: 'currency' },
            { id: 'clinicalTrials', name: 'Clinical Trials', format: 'number' },
            { id: 'cashRunway', name: 'Cash Runway (Years)', format: 'decimal', 
              calculate: (company) => company.cashPosition / company.burnRate }
        ]
    };

    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls-container';
    controlsContainer.style.marginBottom = '20px';
    container.appendChild(controlsContainer);

    // Create company selection
    const companySelection = document.createElement('div');
    companySelection.className = 'company-selection';
    companySelection.innerHTML = `
        <label>Select Companies to Compare:</label>
        <div class="checkbox-group" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 15px;">
            ${competitorData.companies.map((company, index) => `
                <div class="checkbox-item">
                    <input type="checkbox" id="company-${index}" value="${company.name}" ${index < 3 ? 'checked' : ''}>
                    <label for="company-${index}">${company.name}</label>
                </div>
            `).join('')}
        </div>
    `;
    controlsContainer.appendChild(companySelection);

    // Create metric selection
    const metricSelection = document.createElement('div');
    metricSelection.className = 'metric-selection';
    metricSelection.style.marginTop = '15px';
    metricSelection.innerHTML = `
        <label>Select Metrics to Compare:</label>
        <div class="checkbox-group" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 15px;">
            ${competitorData.metrics.map((metric, index) => `
                <div class="checkbox-item">
                    <input type="checkbox" id="metric-${index}" value="${metric.id}" ${index < 4 ? 'checked' : ''}>
                    <label for="metric-${index}">${metric.name}</label>
                </div>
            `).join('')}
        </div>
    `;
    controlsContainer.appendChild(metricSelection);

    // Create chart type selection
    const chartTypeSelection = document.createElement('div');
    chartTypeSelection.className = 'chart-type-selection';
    chartTypeSelection.style.marginTop = '15px';
    chartTypeSelection.innerHTML = `
        <label>Chart Type:</label>
        <select id="chart-type" style="margin-left: 10px;">
            <option value="bar" selected>Bar Chart</option>
            <option value="radar">Radar Chart</option>
            <option value="polarArea">Polar Area Chart</option>
        </select>
        
        <button id="update-comparison" style="margin-left: 20px; padding: 5px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Update Comparison
        </button>
    `;
    controlsContainer.appendChild(chartTypeSelection);

    // Create chart container with canvas element
    const chartContainer = document.createElement('div');
    chartContainer.id = 'competitor-chart-container';
    chartContainer.style.height = '500px';
    chartContainer.style.marginBottom = '20px';
    container.appendChild(chartContainer);
    
    // Create canvas element - THIS WAS MISSING IN THE ORIGINAL SCRIPT
    const canvas = document.createElement('canvas');
    canvas.id = 'competitor-chart-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    chartContainer.appendChild(canvas);

    // Create table container
    const tableContainer = document.createElement('div');
    tableContainer.id = 'competitor-table-container';
    tableContainer.style.marginTop = '30px';
    container.appendChild(tableContainer);

    // Initialize chart
    let comparisonChart;

    // Add event listener to update button
    document.getElementById('update-comparison').addEventListener('click', updateComparison);

    // Function to update comparison
    function updateComparison() {
        // Get selected companies
        const selectedCompanies = [];
        competitorData.companies.forEach((company, index) => {
            const checkbox = document.getElementById(`company-${index}`);
            if (checkbox.checked) {
                selectedCompanies.push(company);
            }
        });
        
        // Get selected metrics
        const selectedMetrics = [];
        competitorData.metrics.forEach((metric, index) => {
            const checkbox = document.getElementById(`metric-${index}`);
            if (checkbox.checked) {
                selectedMetrics.push(metric);
            }
        });
        
        // Get selected chart type
        const chartType = document.getElementById('chart-type').value;
        
        // Update chart
        updateChart(selectedCompanies, selectedMetrics, chartType);
        
        // Update table
        updateTable(selectedCompanies, selectedMetrics);
    }

    // Function to update chart
    function updateChart(companies, metrics, chartType) {
        // Get canvas context
        const ctx = document.getElementById('competitor-chart-canvas').getContext('2d');
        
        // Destroy previous chart if exists
        if (comparisonChart) {
            comparisonChart.destroy();
        }
        
        // Prepare data for chart
        const labels = metrics.map(metric => metric.name);
        const datasets = companies.map(company => {
            // Generate a consistent color based on company name
            const hash = company.name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
            const hue = hash % 360;
            
            return {
                label: company.name,
                data: metrics.map(metric => {
                    if (metric.calculate) {
                        return metric.calculate(company);
                    }
                    return company[metric.id] / (metric.format === 'currency' ? 1000000 : 1);
                }),
                backgroundColor: `hsla(${hue}, 70%, 60%, 0.2)`,
                borderColor: `hsla(${hue}, 70%, 60%, 1)`,
                borderWidth: 2,
                pointBackgroundColor: `hsla(${hue}, 70%, 60%, 1)`,
                pointRadius: 4
            };
        });
        
        try {
            // Create new chart
            comparisonChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: chartType === 'bar' ? {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Value'
                            }
                        }
                    } : {},
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.dataset.label || '';
                                    const value = context.raw || 0;
                                    const metric = metrics[context.dataIndex];
                                    
                                    if (metric.format === 'currency') {
                                        return `${label}: $${value.toFixed(1)}M`;
                                    } else if (metric.format === 'decimal') {
                                        return `${label}: ${value.toFixed(1)}`;
                                    } else {
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        }
                    },
                    radar: chartType === 'radar' ? {
                        elements: {
                            line: {
                                tension: 0.1
                            }
                        }
                    } : {}
                }
            });
            
            console.log("Competitor Comparison Tool: Chart rendered successfully");
        } catch (e) {
            console.error("Error rendering competitor comparison chart:", e);
            showFallbackVisualization(companies, metrics);
        }
    }

    // Function to update table
    function updateTable(companies, metrics) {
        // Clear previous content
        const tableContainer = document.getElementById('competitor-table-container');
        tableContainer.innerHTML = '';
        
        // Create table
        const table = document.createElement('table');
        table.className = 'comparison-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Add empty cell for metric names
        const emptyHeader = document.createElement('th');
        emptyHeader.style.padding = '10px';
        emptyHeader.style.borderBottom = '2px solid #ddd';
        emptyHeader.style.textAlign = 'left';
        headerRow.appendChild(emptyHeader);
        
        // Add company headers
        companies.forEach(company => {
            const companyHeader = document.createElement('th');
            companyHeader.textContent = company.name;
            companyHeader.style.padding = '10px';
            companyHeader.style.borderBottom = '2px solid #ddd';
            companyHeader.style.textAlign = 'right';
            headerRow.appendChild(companyHeader);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Add rows for each metric
        metrics.forEach(metric => {
            const row = document.createElement('tr');
            
            // Add metric name
            const metricCell = document.createElement('td');
            metricCell.textContent = metric.name;
            metricCell.style.padding = '10px';
            metricCell.style.borderBottom = '1px solid #ddd';
            metricCell.style.fontWeight = 'bold';
            metricCell.style.textAlign = 'left';
            row.appendChild(metricCell);
            
            // Add company values
            companies.forEach(company => {
                const valueCell = document.createElement('td');
                
                // Calculate value
                let value;
                if (metric.calculate) {
                    value = metric.calculate(company);
                } else {
                    value = company[metric.id];
                }
                
                // Format value
                if (metric.format === 'currency') {
                    valueCell.textContent = `$${(value / 1000000).toFixed(1)}M`;
                } else if (metric.format === 'decimal') {
                    valueCell.textContent = value.toFixed(1);
                } else {
                    valueCell.textContent = value;
                }
                
                valueCell.style.padding = '10px';
                valueCell.style.borderBottom = '1px solid #ddd';
                valueCell.style.textAlign = 'right';
                
                // Highlight Imugene's values
                if (company.name === 'Imugene') {
                    valueCell.style.backgroundColor = 'rgba(54, 162, 235, 0.1)';
                    valueCell.style.fontWeight = 'bold';
                }
                
                row.appendChild(valueCell);
            });
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }

    // Fallback visualization function
    function showFallbackVisualization(companies, metrics) {
        // Clear the chart container
        const chartContainer = document.getElementById('competitor-chart-container');
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
        fallbackTitle.textContent = 'Competitor Comparison';
        fallbackTitle.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Create company cards
        const cardsContainer = document.createElement('div');
        cardsContainer.style.display = 'flex';
        cardsContainer.style.flexWrap = 'wrap';
        cardsContainer.style.gap = '20px';
        cardsContainer.style.justifyContent = 'center';
        
        companies.forEach(company => {
            const card = document.createElement('div');
            card.className = 'company-card';
            card.style.flex = '1';
            card.style.minWidth = '250px';
            card.style.maxWidth = '300px';
            card.style.padding = '15px';
            card.style.border = '1px solid #ddd';
            card.style.borderRadius = '4px';
            card.style.backgroundColor = company.name === 'Imugene' ? 'rgba(54, 162, 235, 0.1)' : 'white';
            
            // Company name
            const companyName = document.createElement('h5');
            companyName.textContent = company.name;
            companyName.style.marginTop = '0';
            companyName.style.marginBottom = '15px';
            companyName.style.textAlign = 'center';
            card.appendChild(companyName);
            
            // Metrics list
            const metricsList = document.createElement('ul');
            metricsList.style.listStyleType = 'none';
            metricsList.style.padding = '0';
            
            metrics.forEach(metric => {
                const listItem = document.createElement('li');
                listItem.style.marginBottom = '10px';
                listItem.style.display = 'flex';
                listItem.style.justifyContent = 'space-between';
                
                const metricName = document.createElement('span');
                metricName.textContent = metric.name + ':';
                metricName.style.fontWeight = 'bold';
                listItem.appendChild(metricName);
                
                const metricValue = document.createElement('span');
                
                // Calculate value
                let value;
                if (metric.calculate) {
                    value = metric.calculate(company);
                } else {
                    value = company[metric.id];
                }
                
                // Format value
                if (metric.format === 'currency') {
                    metricValue.textContent = `$${(value / 1000000).toFixed(1)}M`;
                } else if (metric.format === 'decimal') {
                    metricValue.textContent = value.toFixed(1);
                } else {
                    metricValue.textContent = value;
                }
                
                listItem.appendChild(metricValue);
                metricsList.appendChild(listItem);
            });
            
            card.appendChild(metricsList);
            cardsContainer.appendChild(card);
        });
        
        fallbackDiv.appendChild(cardsContainer);
        chartContainer.appendChild(fallbackDiv);
    }

    // Initialize the comparison
    updateComparison();
    
    console.log("Competitor Comparison Tool: Initialization complete");
});
