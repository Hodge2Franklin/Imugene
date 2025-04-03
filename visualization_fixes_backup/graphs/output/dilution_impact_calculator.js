// Fixed Dilution Impact Calculator Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('dilution-impact-container');
    if (!container) return;

    console.log("Dilution Impact Calculator: Container found, initializing");
    
    // Sample data for dilution impact calculator
    const dilutionData = {
        currentShares: 2400000000,
        currentPrice: 0.030,
        currentMarketCap: 72000000,
        currentCash: 53000000,
        burnRate: 17000000,
        scenarios: [
            { name: 'Base Case', raiseAmount: 30000000, discount: 15, date: 'Q3 2025' },
            { name: 'Moderate Case', raiseAmount: 50000000, discount: 20, date: 'Q4 2025' },
            { name: 'Worst Case', raiseAmount: 70000000, discount: 25, date: 'Q1 2026' }
        ]
    };

    // Create calculator container
    const calculatorContainer = document.createElement('div');
    calculatorContainer.className = 'calculator-container';
    calculatorContainer.style.display = 'flex';
    calculatorContainer.style.flexWrap = 'wrap';
    calculatorContainer.style.gap = '20px';
    container.appendChild(calculatorContainer);

    // Create inputs section
    const inputsSection = document.createElement('div');
    inputsSection.className = 'inputs-section';
    inputsSection.style.flex = '1';
    inputsSection.style.minWidth = '300px';
    calculatorContainer.appendChild(inputsSection);

    // Create results section
    const resultsSection = document.createElement('div');
    resultsSection.className = 'results-section';
    resultsSection.style.flex = '2';
    resultsSection.style.minWidth = '500px';
    calculatorContainer.appendChild(resultsSection);

    // Create chart container with canvas element
    const chartContainer = document.createElement('div');
    chartContainer.id = 'dilution-calculator-chart-container';
    chartContainer.style.height = '400px';
    chartContainer.style.marginBottom = '20px';
    resultsSection.appendChild(chartContainer);
    
    // Create canvas element - THIS WAS MISSING IN THE ORIGINAL SCRIPT
    const canvas = document.createElement('canvas');
    canvas.id = 'dilution-calculator-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    chartContainer.appendChild(canvas);

    // Create results table container
    const resultsTableContainer = document.createElement('div');
    resultsTableContainer.className = 'results-table-container';
    resultsSection.appendChild(resultsTableContainer);

    // Create input fields
    createInputFields();

    // Initialize chart
    let dilutionChart;

    // Function to create input fields
    function createInputFields() {
        // Create input group for current state
        const currentStateGroup = document.createElement('div');
        currentStateGroup.className = 'input-group';
        currentStateGroup.innerHTML = `
            <h4>Current State</h4>
            <div class="input-field">
                <label>Current Shares Outstanding:</label>
                <input type="number" id="current-shares" value="${dilutionData.currentShares / 1000000}" step="1" min="1">
                <span class="unit">million</span>
            </div>
            <div class="input-field">
                <label>Current Share Price:</label>
                <input type="number" id="current-price" value="${dilutionData.currentPrice}" step="0.001" min="0.001">
                <span class="unit">$</span>
            </div>
            <div class="input-field">
                <label>Current Cash Position:</label>
                <input type="number" id="current-cash" value="${dilutionData.currentCash / 1000000}" step="1" min="0">
                <span class="unit">million $</span>
            </div>
            <div class="input-field">
                <label>Quarterly Burn Rate:</label>
                <input type="number" id="burn-rate" value="${dilutionData.burnRate / 1000000}" step="1" min="1">
                <span class="unit">million $ / quarter</span>
            </div>
        `;
        inputsSection.appendChild(currentStateGroup);

        // Create input group for capital raise scenarios
        const scenariosGroup = document.createElement('div');
        scenariosGroup.className = 'input-group';
        scenariosGroup.innerHTML = `
            <h4>Capital Raise Scenarios</h4>
        `;
        
        // Add scenario inputs
        dilutionData.scenarios.forEach((scenario, index) => {
            const scenarioDiv = document.createElement('div');
            scenarioDiv.className = 'scenario-input';
            scenarioDiv.innerHTML = `
                <h5>${scenario.name}</h5>
                <div class="input-field">
                    <label>Raise Amount:</label>
                    <input type="number" id="raise-amount-${index}" value="${scenario.raiseAmount / 1000000}" step="1" min="1">
                    <span class="unit">million $</span>
                </div>
                <div class="input-field">
                    <label>Discount to Market:</label>
                    <input type="number" id="discount-${index}" value="${scenario.discount}" step="1" min="0" max="50">
                    <span class="unit">%</span>
                </div>
                <div class="input-field">
                    <label>Expected Date:</label>
                    <input type="text" id="date-${index}" value="${scenario.date}">
                </div>
            `;
            scenariosGroup.appendChild(scenarioDiv);
        });

        // Add calculate button
        const calculateButton = document.createElement('button');
        calculateButton.id = 'calculate-button';
        calculateButton.textContent = 'Calculate Dilution Impact';
        calculateButton.className = 'calculate-button';
        calculateButton.style.marginTop = '20px';
        calculateButton.style.padding = '10px 15px';
        calculateButton.style.backgroundColor = '#4CAF50';
        calculateButton.style.color = 'white';
        calculateButton.style.border = 'none';
        calculateButton.style.borderRadius = '4px';
        calculateButton.style.cursor = 'pointer';
        calculateButton.onclick = calculateDilutionImpact;
        
        scenariosGroup.appendChild(calculateButton);
        inputsSection.appendChild(scenariosGroup);

        // Add event listeners to inputs
        document.getElementById('current-shares').addEventListener('change', calculateDilutionImpact);
        document.getElementById('current-price').addEventListener('change', calculateDilutionImpact);
        document.getElementById('current-cash').addEventListener('change', calculateDilutionImpact);
        document.getElementById('burn-rate').addEventListener('change', calculateDilutionImpact);
        
        dilutionData.scenarios.forEach((_, index) => {
            document.getElementById(`raise-amount-${index}`).addEventListener('change', calculateDilutionImpact);
            document.getElementById(`discount-${index}`).addEventListener('change', calculateDilutionImpact);
        });
    }

    // Function to calculate dilution impact
    function calculateDilutionImpact() {
        // Get input values
        const currentShares = parseFloat(document.getElementById('current-shares').value) * 1000000;
        const currentPrice = parseFloat(document.getElementById('current-price').value);
        const currentCash = parseFloat(document.getElementById('current-cash').value) * 1000000;
        const burnRate = parseFloat(document.getElementById('burn-rate').value) * 1000000;
        
        // Calculate current market cap
        const currentMarketCap = currentShares * currentPrice;
        
        // Get scenario inputs
        const scenarios = [];
        dilutionData.scenarios.forEach((scenario, index) => {
            const raiseAmount = parseFloat(document.getElementById(`raise-amount-${index}`).value) * 1000000;
            const discount = parseFloat(document.getElementById(`discount-${index}`).value);
            const date = document.getElementById(`date-${index}`).value;
            
            // Calculate issue price
            const issuePrice = currentPrice * (1 - discount / 100);
            
            // Calculate new shares issued
            const newShares = raiseAmount / issuePrice;
            
            // Calculate total shares after raise
            const totalShares = currentShares + newShares;
            
            // Calculate ownership dilution
            const ownershipDilution = (newShares / totalShares) * 100;
            
            // Calculate new market cap
            const newMarketCap = currentMarketCap + raiseAmount;
            
            // Calculate theoretical new share price
            const theoreticalPrice = newMarketCap / totalShares;
            
            // Calculate price dilution
            const priceDilution = ((currentPrice - theoreticalPrice) / currentPrice) * 100;
            
            scenarios.push({
                name: scenario.name,
                raiseAmount,
                discount,
                date,
                issuePrice,
                newShares,
                totalShares,
                ownershipDilution,
                theoreticalPrice,
                priceDilution
            });
        });
        
        // Update results
        updateResults(scenarios);
    }

    // Function to update results
    function updateResults(scenarios) {
        // Update chart
        updateChart(scenarios);
        
        // Update results table
        updateResultsTable(scenarios);
    }

    // Function to update chart
    function updateChart(scenarios) {
        // Get canvas context
        const ctx = document.getElementById('dilution-calculator-canvas').getContext('2d');
        
        // Prepare data for chart
        const labels = scenarios.map(s => s.name);
        const ownershipDilutionData = scenarios.map(s => s.ownershipDilution);
        const priceDilutionData = scenarios.map(s => s.priceDilution);
        
        // Destroy previous chart if exists
        if (dilutionChart) {
            dilutionChart.destroy();
        }
        
        try {
            // Create new chart
            dilutionChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Ownership Dilution (%)',
                            data: ownershipDilutionData,
                            backgroundColor: 'rgba(54, 162, 235, 0.8)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Price Dilution (%)',
                            data: priceDilutionData,
                            backgroundColor: 'rgba(255, 99, 132, 0.8)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Dilution Percentage (%)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.dataset.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value.toFixed(1)}%`;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log("Dilution Impact Calculator: Chart rendered successfully");
        } catch (e) {
            console.error("Error rendering dilution chart:", e);
            showFallbackVisualization(scenarios);
        }
    }

    // Function to update results table
    function updateResultsTable(scenarios) {
        // Clear previous content
        resultsTableContainer.innerHTML = '';
        
        // Create table
        const table = document.createElement('table');
        table.className = 'results-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        // Create table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Scenario</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Issue Price</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">New Shares</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Total Shares</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Ownership Dilution</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Theoretical Price</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price Dilution</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Add rows for each scenario
        scenarios.forEach(scenario => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = scenario.name;
            nameCell.style.padding = '8px';
            nameCell.style.borderBottom = '1px solid #ddd';
            nameCell.style.textAlign = 'left';
            row.appendChild(nameCell);
            
            const issuePriceCell = document.createElement('td');
            issuePriceCell.textContent = `$${scenario.issuePrice.toFixed(4)}`;
            issuePriceCell.style.padding = '8px';
            issuePriceCell.style.borderBottom = '1px solid #ddd';
            issuePriceCell.style.textAlign = 'right';
            row.appendChild(issuePriceCell);
            
            const newSharesCell = document.createElement('td');
            newSharesCell.textContent = `${(scenario.newShares / 1000000).toFixed(1)}M`;
            newSharesCell.style.padding = '8px';
            newSharesCell.style.borderBottom = '1px solid #ddd';
            newSharesCell.style.textAlign = 'right';
            row.appendChild(newSharesCell);
            
            const totalSharesCell = document.createElement('td');
            totalSharesCell.textContent = `${(scenario.totalShares / 1000000).toFixed(1)}M`;
            totalSharesCell.style.padding = '8px';
            totalSharesCell.style.borderBottom = '1px solid #ddd';
            totalSharesCell.style.textAlign = 'right';
            row.appendChild(totalSharesCell);
            
            const ownershipDilutionCell = document.createElement('td');
            ownershipDilutionCell.textContent = `${scenario.ownershipDilution.toFixed(1)}%`;
            ownershipDilutionCell.style.padding = '8px';
            ownershipDilutionCell.style.borderBottom = '1px solid #ddd';
            ownershipDilutionCell.style.textAlign = 'right';
            row.appendChild(ownershipDilutionCell);
            
            const theoreticalPriceCell = document.createElement('td');
            theoreticalPriceCell.textContent = `$${scenario.theoreticalPrice.toFixed(4)}`;
            theoreticalPriceCell.style.padding = '8px';
            theoreticalPriceCell.style.borderBottom = '1px solid #ddd';
            theoreticalPriceCell.style.textAlign = 'right';
            row.appendChild(theoreticalPriceCell);
            
            const priceDilutionCell = document.createElement('td');
            priceDilutionCell.textContent = `${scenario.priceDilution.toFixed(1)}%`;
            priceDilutionCell.style.padding = '8px';
            priceDilutionCell.style.borderBottom = '1px solid #ddd';
            priceDilutionCell.style.textAlign = 'right';
            row.appendChild(priceDilutionCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        resultsTableContainer.appendChild(table);
    }

    // Fallback visualization function
    function showFallbackVisualization(scenarios) {
        // Clear the chart container
        const chartContainer = document.getElementById('dilution-calculator-chart-container');
        chartContainer.innerHTML = '';
        
        // Create fallback visualization
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-visualization';
        fallbackDiv.style.height = '400px';
        fallbackDiv.style.display = 'flex';
        fallbackDiv.style.flexDirection = 'column';
        fallbackDiv.style.justifyContent = 'center';
        fallbackDiv.style.alignItems = 'center';
        fallbackDiv.style.backgroundColor = '#f8f9fa';
        fallbackDiv.style.border = '1px solid #ddd';
        fallbackDiv.style.borderRadius = '4px';
        fallbackDiv.style.padding = '20px';
        
        // Create fallback title
        const fallbackTitle = document.createElement('h4');
        fallbackTitle.textContent = 'Dilution Impact Results';
        fallbackTitle.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Create a simple table for dilution data
        const table = document.createElement('table');
        table.style.width = '80%';
        table.style.borderCollapse = 'collapse';
        
        // Add header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const scenarioHeader = document.createElement('th');
        scenarioHeader.textContent = 'Scenario';
        scenarioHeader.style.padding = '8px';
        scenarioHeader.style.borderBottom = '1px solid #ddd';
        scenarioHeader.style.textAlign = 'left';
        headerRow.appendChild(scenarioHeader);
        
        const ownershipHeader = document.createElement('th');
        ownershipHeader.textContent = 'Ownership Dilution';
        ownershipHeader.style.padding = '8px';
        ownershipHeader.style.borderBottom = '1px solid #ddd';
        ownershipHeader.style.textAlign = 'right';
        headerRow.appendChild(ownershipHeader);
        
        const priceHeader = document.createElement('th');
        priceHeader.textContent = 'Price Dilution';
        priceHeader.style.padding = '8px';
        priceHeader.style.borderBottom = '1px solid #ddd';
        priceHeader.style.textAlign = 'right';
        headerRow.appendChild(priceHeader);
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Add body
        const tbody = document.createElement('tbody');
        
        scenarios.forEach(scenario => {
            const row = document.createElement('tr');
            
            const scenarioCell = document.createElement('td');
            scenarioCell.textContent = scenario.name;
            scenarioCell.style.padding = '8px';
            scenarioCell.style.borderBottom = '1px solid #ddd';
            scenarioCell.style.textAlign = 'left';
            row.appendChild(scenarioCell);
            
            const ownershipCell = document.createElement('td');
            ownershipCell.textContent = `${scenario.ownershipDilution.toFixed(1)}%`;
            ownershipCell.style.padding = '8px';
            ownershipCell.style.borderBottom = '1px solid #ddd';
            ownershipCell.style.textAlign = 'right';
            row.appendChild(ownershipCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = `${scenario.priceDilution.toFixed(1)}%`;
            priceCell.style.padding = '8px';
            priceCell.style.borderBottom = '1px solid #ddd';
            priceCell.style.textAlign = 'right';
            row.appendChild(priceCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        fallbackDiv.appendChild(table);
        
        chartContainer.appendChild(fallbackDiv);
    }

    // Initialize the calculator
    calculateDilutionImpact();
    
    console.log("Dilution Impact Calculator: Initialization complete");
});
