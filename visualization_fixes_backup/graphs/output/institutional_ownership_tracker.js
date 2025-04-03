// Fixed Institutional Ownership Tracker Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('institutional-ownership-container');
    if (!container) return;

    console.log("Institutional Ownership Tracker: Container found, initializing");
    
    // Sample data for institutional ownership
    const institutionalData = {
        current: {
            'Institutional Investors': 42.3,
            'Retail Investors': 31.7,
            'Insiders': 15.5,
            'Strategic Partners': 10.5
        },
        historical: [
            { quarter: 'Q1 2024', institutional: 38.2, retail: 35.3, insiders: 16.0, strategic: 10.5 },
            { quarter: 'Q2 2024', institutional: 39.5, retail: 34.0, insiders: 16.0, strategic: 10.5 },
            { quarter: 'Q3 2024', institutional: 40.8, retail: 33.2, insiders: 15.5, strategic: 10.5 },
            { quarter: 'Q4 2024', institutional: 42.3, retail: 31.7, insiders: 15.5, strategic: 10.5 }
        ],
        peerComparison: [
            { company: 'Imugene', institutional: 42.3, retail: 31.7, insiders: 15.5, strategic: 10.5 },
            { company: 'Peer 1', institutional: 65.2, retail: 20.3, insiders: 8.5, strategic: 6.0 },
            { company: 'Peer 2', institutional: 58.7, retail: 25.8, insiders: 10.2, strategic: 5.3 },
            { company: 'Peer 3', institutional: 47.5, retail: 30.5, insiders: 12.0, strategic: 10.0 },
            { company: 'Industry Avg', institutional: 55.0, retail: 25.0, insiders: 12.0, strategic: 8.0 }
        ],
        topInstitutions: [
            { name: 'BlackRock Fund Advisors', shares: 12500000, percentOwned: 5.2, quarterlyChange: 0.8 },
            { name: 'Vanguard Group', shares: 10200000, percentOwned: 4.3, quarterlyChange: 0.3 },
            { name: 'State Street Corporation', shares: 8700000, percentOwned: 3.6, quarterlyChange: -0.2 },
            { name: 'Fidelity Management', shares: 7500000, percentOwned: 3.1, quarterlyChange: 1.2 },
            { name: 'Morgan Stanley', shares: 6200000, percentOwned: 2.6, quarterlyChange: 0.5 },
            { name: 'UBS Asset Management', shares: 5800000, percentOwned: 2.4, quarterlyChange: -0.1 },
            { name: 'Goldman Sachs Group', shares: 4900000, percentOwned: 2.0, quarterlyChange: 0.4 },
            { name: 'Wellington Management', shares: 4200000, percentOwned: 1.8, quarterlyChange: 0.0 }
        ]
    };

    // Create tabs for different views
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';
    container.appendChild(tabsContainer);

    const tabs = ['Current Breakdown', 'Historical Trend', 'Peer Comparison'];
    tabs.forEach((tab, index) => {
        const tabButton = document.createElement('button');
        tabButton.className = index === 0 ? 'tab-button active' : 'tab-button';
        tabButton.textContent = tab;
        tabButton.onclick = () => switchTab(index);
        tabsContainer.appendChild(tabButton);
    });

    // Create visualization container
    const visualizationContainer = document.createElement('div');
    visualizationContainer.className = 'visualization-container';
    container.appendChild(visualizationContainer);

    // Create chart container with canvas element
    const chartContainer = document.createElement('div');
    chartContainer.id = 'institutional-ownership-chart-container';
    chartContainer.style.height = '400px';
    visualizationContainer.appendChild(chartContainer);
    
    // Create canvas element - THIS WAS MISSING IN THE ORIGINAL SCRIPT
    const canvas = document.createElement('canvas');
    canvas.id = 'institutional-ownership-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    chartContainer.appendChild(canvas);

    // Create data table container
    const dataTableContainer = document.createElement('div');
    dataTableContainer.className = 'data-table-container';
    dataTableContainer.style.marginTop = '20px';
    visualizationContainer.appendChild(dataTableContainer);

    // Create toggle options
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'toggle-container';
    toggleContainer.style.marginTop = '20px';
    container.appendChild(toggleContainer);

    const percentageToggle = document.createElement('div');
    percentageToggle.className = 'toggle-option';
    percentageToggle.innerHTML = `
        <label class="switch">
            <input type="checkbox" id="percentage-toggle" checked>
            <span class="slider round"></span>
        </label>
        <span>Show as Percentage</span>
    `;
    toggleContainer.appendChild(percentageToggle);

    const changeToggle = document.createElement('div');
    changeToggle.className = 'toggle-option';
    changeToggle.innerHTML = `
        <label class="switch">
            <input type="checkbox" id="change-toggle">
            <span class="slider round"></span>
        </label>
        <span>Show Quarterly Change</span>
    `;
    toggleContainer.appendChild(changeToggle);

    // Initialize chart
    let currentChart;
    let currentTabIndex = 0;

    // Function to switch between tabs
    function switchTab(tabIndex) {
        // Update active tab
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach((button, index) => {
            if (index === tabIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        currentTabIndex = tabIndex;
        updateVisualization();
    }

    // Function to update visualization based on current tab
    function updateVisualization() {
        if (currentChart) {
            currentChart.destroy();
        }

        switch (currentTabIndex) {
            case 0:
                renderCurrentBreakdown();
                break;
            case 1:
                renderHistoricalTrend();
                break;
            case 2:
                renderPeerComparison();
                break;
        }
    }

    // Render current breakdown pie chart
    function renderCurrentBreakdown() {
        // Use the canvas we created
        const ctx = document.getElementById('institutional-ownership-canvas').getContext('2d');
        
        const data = institutionalData.current;
        const labels = Object.keys(data);
        const values = Object.values(data);
        
        try {
            currentChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)'
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
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value.toFixed(1)}%`;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log("Institutional Ownership Tracker: Pie chart rendered successfully");
        } catch (e) {
            console.error("Error rendering pie chart:", e);
            showFallbackVisualization('pie', data);
        }

        // Render data table
        renderTopInstitutionsTable();
    }

    // Render historical trend chart
    function renderHistoricalTrend() {
        // Use the canvas we created
        const ctx = document.getElementById('institutional-ownership-canvas').getContext('2d');
        
        const data = institutionalData.historical;
        const quarters = data.map(item => item.quarter);
        
        try {
            currentChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: quarters,
                    datasets: [
                        {
                            label: 'Institutional Investors',
                            data: data.map(item => item.institutional),
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            tension: 0.1,
                            fill: false
                        },
                        {
                            label: 'Retail Investors',
                            data: data.map(item => item.retail),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.1,
                            fill: false
                        },
                        {
                            label: 'Insiders',
                            data: data.map(item => item.insiders),
                            borderColor: 'rgba(255, 206, 86, 1)',
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            tension: 0.1,
                            fill: false
                        },
                        {
                            label: 'Strategic Partners',
                            data: data.map(item => item.strategic),
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            tension: 0.1,
                            fill: false
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
                                text: 'Ownership Percentage'
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
            
            console.log("Institutional Ownership Tracker: Line chart rendered successfully");
        } catch (e) {
            console.error("Error rendering line chart:", e);
            showFallbackVisualization('line', data);
        }

        // Clear data table
        dataTableContainer.innerHTML = '';
    }

    // Render peer comparison chart
    function renderPeerComparison() {
        // Use the canvas we created
        const ctx = document.getElementById('institutional-ownership-canvas').getContext('2d');
        
        const data = institutionalData.peerComparison;
        const companies = data.map(item => item.company);
        
        try {
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: companies,
                    datasets: [
                        {
                            label: 'Institutional Investors',
                            data: data.map(item => item.institutional),
                            backgroundColor: 'rgba(54, 162, 235, 0.8)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Retail Investors',
                            data: data.map(item => item.retail),
                            backgroundColor: 'rgba(75, 192, 192, 0.8)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Insiders',
                            data: data.map(item => item.insiders),
                            backgroundColor: 'rgba(255, 206, 86, 0.8)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Strategic Partners',
                            data: data.map(item => item.strategic),
                            backgroundColor: 'rgba(153, 102, 255, 0.8)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: false,
                        },
                        y: {
                            stacked: false,
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Ownership Percentage'
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
            
            console.log("Institutional Ownership Tracker: Bar chart rendered successfully");
        } catch (e) {
            console.error("Error rendering bar chart:", e);
            showFallbackVisualization('bar', data);
        }

        // Clear data table
        dataTableContainer.innerHTML = '';
    }

    // Render top institutions table
    function renderTopInstitutionsTable() {
        const data = institutionalData.topInstitutions;
        
        // Clear previous content
        dataTableContainer.innerHTML = '';
        
        // Create table
        const table = document.createElement('table');
        table.className = 'data-table';
        
        // Create table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Institution</th>
                <th>Shares Held</th>
                <th>% Ownership</th>
                <th>Quarterly Change</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Add rows for each institution
        data.forEach(institution => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = institution.name;
            row.appendChild(nameCell);
            
            const sharesCell = document.createElement('td');
            sharesCell.textContent = institution.shares.toLocaleString();
            row.appendChild(sharesCell);
            
            const percentCell = document.createElement('td');
            percentCell.textContent = `${institution.percentOwned.toFixed(1)}%`;
            row.appendChild(percentCell);
            
            const changeCell = document.createElement('td');
            const change = institution.quarterlyChange;
            changeCell.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
            changeCell.style.color = change >= 0 ? 'green' : 'red';
            row.appendChild(changeCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        dataTableContainer.appendChild(table);
    }

    // Fallback visualization function
    function showFallbackVisualization(chartType, data) {
        // Clear the chart container
        const chartContainer = document.getElementById('institutional-ownership-chart-container');
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
        fallbackTitle.textContent = 'Institutional Ownership Data';
        fallbackTitle.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Create fallback content based on chart type
        if (chartType === 'pie') {
            // Create a simple table for pie chart data
            const table = document.createElement('table');
            table.style.width = '80%';
            table.style.borderCollapse = 'collapse';
            
            // Add header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            const categoryHeader = document.createElement('th');
            categoryHeader.textContent = 'Category';
            categoryHeader.style.padding = '8px';
            categoryHeader.style.borderBottom = '1px solid #ddd';
            categoryHeader.style.textAlign = 'left';
            headerRow.appendChild(categoryHeader);
            
            const valueHeader = document.createElement('th');
            valueHeader.textContent = 'Percentage';
            valueHeader.style.padding = '8px';
            valueHeader.style.borderBottom = '1px solid #ddd';
            valueHeader.style.textAlign = 'right';
            headerRow.appendChild(valueHeader);
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Add body
            const tbody = document.createElement('tbody');
            
            Object.entries(data).forEach(([category, value], index) => {
                const row = document.createElement('tr');
                
                const categoryCell = document.createElement('td');
                categoryCell.textContent = category;
                categoryCell.style.padding = '8px';
                categoryCell.style.borderBottom = '1px solid #ddd';
                row.appendChild(categoryCell);
                
                const valueCell = document.createElement('td');
                valueCell.textContent = `${value.toFixed(1)}%`;
                valueCell.style.padding = '8px';
                valueCell.style.borderBottom = '1px solid #ddd';
                valueCell.style.textAlign = 'right';
                row.appendChild(valueCell);
                
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            fallbackDiv.appendChild(table);
        } else if (chartType === 'line' || chartType === 'bar') {
            // Create a simple table for line or bar chart data
            const table = document.createElement('table');
            table.style.width = '80%';
            table.style.borderCollapse = 'collapse';
            
            // Add header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            // First column header (quarter or company)
            const firstHeader = document.createElement('th');
            firstHeader.textContent = chartType === 'line' ? 'Quarter' : 'Company';
            firstHeader.style.padding = '8px';
            firstHeader.style.borderBottom = '1px solid #ddd';
            firstHeader.style.textAlign = 'left';
            headerRow.appendChild(firstHeader);
            
            // Category headers
            const categories = ['Institutional', 'Retail', 'Insiders', 'Strategic'];
            categories.forEach(category => {
                const header = document.createElement('th');
                header.textContent = category;
                header.style.padding = '8px';
                header.style.borderBottom = '1px solid #ddd';
                header.style.textAlign = 'right';
                headerRow.appendChild(header);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Add body
            const tbody = document.createElement('tbody');
            
            data.forEach(item => {
                const row = document.createElement('tr');
                
                // First column (quarter or company)
                const firstCell = document.createElement('td');
                firstCell.textContent = chartType === 'line' ? item.quarter : item.company;
                firstCell.style.padding = '8px';
                firstCell.style.borderBottom = '1px solid #ddd';
                row.appendChild(firstCell);
                
                // Category values
                const keys = chartType === 'line' 
                    ? ['institutional', 'retail', 'insiders', 'strategic']
                    : ['institutional', 'retail', 'insiders', 'strategic'];
                
                keys.forEach(key => {
                    const cell = document.createElement('td');
                    cell.textContent = `${item[key].toFixed(1)}%`;
                    cell.style.padding = '8px';
                    cell.style.borderBottom = '1px solid #ddd';
                    cell.style.textAlign = 'right';
                    row.appendChild(cell);
                });
                
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            fallbackDiv.appendChild(table);
        }
        
        chartContainer.appendChild(fallbackDiv);
    }

    // Initialize the visualization
    updateVisualization();
    
    console.log("Institutional Ownership Tracker: Initialization complete");
});
