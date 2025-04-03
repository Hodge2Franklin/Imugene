// Dilution Impact Calculator Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('dilution-impact-container');
    if (!container) return;

    // Create the calculator interface
    createCalculatorInterface(container);

    // Sample data for initial state
    const initialData = {
        currentShares: 2400000000,
        currentPrice: 0.032,
        marketCap: 76800000,
        cashPosition: 25000000,
        burnRate: 2500000,
        plannedRaise: 30000000,
        discountRate: 15,
        optionsOutstanding: 120000000,
        optionExercisePrice: 0.05
    };

    // Initialize the calculator with sample data
    initializeCalculator(initialData);

    // Function to create calculator interface
    function createCalculatorInterface(container) {
        // Create calculator container
        const calculatorContainer = document.createElement('div');
        calculatorContainer.className = 'calculator-container';
        container.appendChild(calculatorContainer);

        // Create input section
        const inputSection = document.createElement('div');
        inputSection.className = 'calculator-section';
        calculatorContainer.appendChild(inputSection);

        // Create title for input section
        const inputTitle = document.createElement('h3');
        inputTitle.textContent = 'Input Parameters';
        inputSection.appendChild(inputTitle);

        // Create input form
        const inputForm = document.createElement('form');
        inputForm.id = 'dilution-calculator-form';
        inputForm.className = 'calculator-form';
        inputSection.appendChild(inputForm);

        // Define input fields
        const inputFields = [
            { id: 'current-shares', label: 'Current Shares Outstanding', value: '2,400,000,000', type: 'text', suffix: 'shares' },
            { id: 'current-price', label: 'Current Share Price', value: '0.032', type: 'number', step: '0.001', min: '0.001', suffix: 'AUD' },
            { id: 'cash-position', label: 'Current Cash Position', value: '25,000,000', type: 'text', suffix: 'AUD' },
            { id: 'burn-rate', label: 'Monthly Burn Rate', value: '2,500,000', type: 'text', suffix: 'AUD/month' },
            { id: 'planned-raise', label: 'Planned Capital Raise', value: '30,000,000', type: 'text', suffix: 'AUD' },
            { id: 'discount-rate', label: 'Discount to Market Price', value: '15', type: 'number', step: '1', min: '0', max: '50', suffix: '%' },
            { id: 'options-outstanding', label: 'Options Outstanding', value: '120,000,000', type: 'text', suffix: 'options' },
            { id: 'option-exercise-price', label: 'Option Exercise Price', value: '0.05', type: 'number', step: '0.001', min: '0.001', suffix: 'AUD' }
        ];

        // Create input fields
        inputFields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            formGroup.appendChild(label);
            
            const inputWrapper = document.createElement('div');
            inputWrapper.className = 'input-wrapper';
            
            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;
            input.value = field.value;
            
            if (field.type === 'number') {
                input.step = field.step;
                input.min = field.min;
                if (field.max) input.max = field.max;
            }
            
            input.addEventListener('change', calculateDilutionImpact);
            inputWrapper.appendChild(input);
            
            if (field.suffix) {
                const suffix = document.createElement('span');
                suffix.className = 'input-suffix';
                suffix.textContent = field.suffix;
                inputWrapper.appendChild(suffix);
            }
            
            formGroup.appendChild(inputWrapper);
            inputForm.appendChild(formGroup);
        });

        // Create calculate button
        const calculateButton = document.createElement('button');
        calculateButton.type = 'button';
        calculateButton.className = 'btn btn-primary';
        calculateButton.textContent = 'Calculate Dilution Impact';
        calculateButton.addEventListener('click', calculateDilutionImpact);
        inputForm.appendChild(calculateButton);

        // Create results section
        const resultsSection = document.createElement('div');
        resultsSection.className = 'calculator-section';
        calculatorContainer.appendChild(resultsSection);

        // Create title for results section
        const resultsTitle = document.createElement('h3');
        resultsTitle.textContent = 'Dilution Impact Results';
        resultsSection.appendChild(resultsTitle);

        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'dilution-results';
        resultsContainer.className = 'results-container';
        resultsSection.appendChild(resultsContainer);

        // Create visualization section
        const visualizationSection = document.createElement('div');
        visualizationSection.className = 'calculator-section';
        container.appendChild(visualizationSection);

        // Create title for visualization section
        const visualizationTitle = document.createElement('h3');
        visualizationTitle.textContent = 'Dilution Visualization';
        visualizationSection.appendChild(visualizationTitle);

        // Create chart container
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        visualizationSection.appendChild(chartContainer);

        // Create ownership chart
        const ownershipChartContainer = document.createElement('div');
        ownershipChartContainer.id = 'ownership-chart-container';
        ownershipChartContainer.style.height = '300px';
        ownershipChartContainer.style.width = '48%';
        ownershipChartContainer.style.display = 'inline-block';
        chartContainer.appendChild(ownershipChartContainer);

        // Create price impact chart
        const priceChartContainer = document.createElement('div');
        priceChartContainer.id = 'price-chart-container';
        priceChartContainer.style.height = '300px';
        priceChartContainer.style.width = '48%';
        priceChartContainer.style.display = 'inline-block';
        priceChartContainer.style.marginLeft = '2%';
        chartContainer.appendChild(priceChartContainer);

        // Create runway chart
        const runwayChartContainer = document.createElement('div');
        runwayChartContainer.id = 'runway-chart-container';
        runwayChartContainer.style.height = '300px';
        runwayChartContainer.style.marginTop = '20px';
        chartContainer.appendChild(runwayChartContainer);
    }

    // Function to initialize calculator with data
    function initializeCalculator(data) {
        // Set input values
        document.getElementById('current-shares').value = formatNumber(data.currentShares);
        document.getElementById('current-price').value = data.currentPrice.toFixed(3);
        document.getElementById('cash-position').value = formatNumber(data.cashPosition);
        document.getElementById('burn-rate').value = formatNumber(data.burnRate);
        document.getElementById('planned-raise').value = formatNumber(data.plannedRaise);
        document.getElementById('discount-rate').value = data.discountRate;
        document.getElementById('options-outstanding').value = formatNumber(data.optionsOutstanding);
        document.getElementById('option-exercise-price').value = data.optionExercisePrice.toFixed(3);

        // Calculate initial results
        calculateDilutionImpact();
    }

    // Function to calculate dilution impact
    function calculateDilutionImpact() {
        // Get input values
        const currentShares = parseFloat(document.getElementById('current-shares').value.replace(/,/g, ''));
        const currentPrice = parseFloat(document.getElementById('current-price').value);
        const cashPosition = parseFloat(document.getElementById('cash-position').value.replace(/,/g, ''));
        const burnRate = parseFloat(document.getElementById('burn-rate').value.replace(/,/g, ''));
        const plannedRaise = parseFloat(document.getElementById('planned-raise').value.replace(/,/g, ''));
        const discountRate = parseFloat(document.getElementById('discount-rate').value);
        const optionsOutstanding = parseFloat(document.getElementById('options-outstanding').value.replace(/,/g, ''));
        const optionExercisePrice = parseFloat(document.getElementById('option-exercise-price').value);

        // Calculate current market cap
        const currentMarketCap = currentShares * currentPrice;

        // Calculate placement price
        const placementPrice = currentPrice * (1 - discountRate / 100);

        // Calculate new shares to be issued
        const newShares = plannedRaise / placementPrice;

        // Calculate total shares after placement
        const totalSharesAfterPlacement = currentShares + newShares;

        // Calculate ownership dilution
        const ownershipDilution = (newShares / totalSharesAfterPlacement) * 100;

        // Calculate theoretical ex-rights price (TERP)
        const terp = ((currentShares * currentPrice) + (newShares * placementPrice)) / totalSharesAfterPlacement;

        // Calculate price impact
        const priceImpact = ((terp - currentPrice) / currentPrice) * 100;

        // Calculate current cash runway in months
        const currentRunway = cashPosition / burnRate;

        // Calculate new cash position
        const newCashPosition = cashPosition + plannedRaise;

        // Calculate new cash runway in months
        const newRunway = newCashPosition / burnRate;

        // Calculate runway extension
        const runwayExtension = newRunway - currentRunway;

        // Calculate potential dilution from options
        const potentialOptionDilution = (optionsOutstanding / (totalSharesAfterPlacement + optionsOutstanding)) * 100;

        // Update results container
        const resultsContainer = document.getElementById('dilution-results');
        resultsContainer.innerHTML = `
            <div class="results-grid">
                <div class="result-item">
                    <div class="result-label">Current Market Cap</div>
                    <div class="result-value">$${formatNumber(currentMarketCap.toFixed(0))} AUD</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Placement Price</div>
                    <div class="result-value">$${placementPrice.toFixed(4)} AUD</div>
                </div>
                <div class="result-item">
                    <div class="result-label">New Shares Issued</div>
                    <div class="result-value">${formatNumber(newShares.toFixed(0))}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Total Shares After</div>
                    <div class="result-value">${formatNumber(totalSharesAfterPlacement.toFixed(0))}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Ownership Dilution</div>
                    <div class="result-value">${ownershipDilution.toFixed(2)}%</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Theoretical Ex-Rights Price</div>
                    <div class="result-value">$${terp.toFixed(4)} AUD</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Price Impact</div>
                    <div class="result-value">${priceImpact.toFixed(2)}%</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Current Cash Runway</div>
                    <div class="result-value">${currentRunway.toFixed(1)} months</div>
                </div>
                <div class="result-item">
                    <div class="result-label">New Cash Runway</div>
                    <div class="result-value">${newRunway.toFixed(1)} months</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Runway Extension</div>
                    <div class="result-value">+${runwayExtension.toFixed(1)} months</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Potential Option Dilution</div>
                    <div class="result-value">${potentialOptionDilution.toFixed(2)}%</div>
                </div>
            </div>
        `;

        // Update charts
        updateOwnershipChart(currentShares, newShares);
        updatePriceChart(currentPrice, terp, placementPrice);
        updateRunwayChart(currentRunway, newRunway);
    }

    // Function to update ownership chart
    function updateOwnershipChart(currentShares, newShares) {
        const ctx = document.getElementById('ownership-chart-container');
        
        // Destroy existing chart if it exists
        if (window.ownershipChart) {
            window.ownershipChart.destroy();
        }
        
        window.ownershipChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Existing Shareholders', 'New Investors'],
                datasets: [{
                    data: [currentShares, newShares],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
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
                    },
                    title: {
                        display: true,
                        text: 'Ownership Structure After Placement'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${percentage}% (${formatNumber(value.toFixed(0))} shares)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Function to update price chart
    function updatePriceChart(currentPrice, terp, placementPrice) {
        const ctx = document.getElementById('price-chart-container');
        
        // Destroy existing chart if it exists
        if (window.priceChart) {
            window.priceChart.destroy();
        }
        
        window.priceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Current Price', 'Placement Price', 'TERP'],
                datasets: [{
                    label: 'Share Price (AUD)',
                    data: [currentPrice, placementPrice, terp],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 206, 86, 0.8)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
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
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Price Impact Analysis'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                return `${label}: $${value.toFixed(4)} AUD`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Function to update runway chart
    function updateRunwayChart(currentRunway, newRunway) {
        const ctx = document.getElementById('runway-chart-container');
        
        // Destroy existing chart if it exists
        if (window.runwayChart) {
            window.runwayChart.destroy();
        }
        
        // Create labels for months
        const labels = [];
        const maxRunway = Math.ceil(Math.max(currentRunway, newRunway));
        for (let i = 0; i <= maxRunway; i++) {
            labels.push(`Month ${i}`);
        }
        
        // Create data for current cash position
        const currentCashData = [];
        for (let i = 0; i <= maxRunway; i++) {
            if (i <= currentRunway) {
                currentCashData.push(100 * (1 - i / currentRunway));
            } else {
                currentCashData.push(0);
            }
        }
        
        // Create data for new cash position
        const newCashData = [];
        for (let i = 0; i <= maxRunway; i++) {
            if (i <= newRunway) {
                newCashData.push(100 * (1 - i / newRunway));
            } else {
                newCashData.push(0);
            }
        }
        
        window.runwayChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Current Cash Runway',
                        data: currentCashData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.1
                    },
                    {
                        label: 'New Cash Runway',
                        data: newCashData,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Remaining Cash (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Cash Runway Comparison'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value.toFixed(1)}% remaining`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Helper function to format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});
