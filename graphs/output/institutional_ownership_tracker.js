// Institutional Ownership Tracker Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('institutional-ownership-container');
    if (!container) return;

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

    // Create chart container
    const chartContainer = document.createElement('div');
    chartContainer.id = 'institutional-ownership-chart';
    chartContainer.style.height = '400px';
    visualizationContainer.appendChild(chartContainer);

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
        const ctx = document.getElementById('institutional-ownership-chart').getContext('2d');
        
        const data = institutionalData.current;
        const labels = Object.keys(data);
        const values = Object.values(data);
        
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

        // Render data table
        renderTopInstitutionsTable();
    }

    // Render historical trend chart
    function renderHistoricalTrend() {
        const ctx = document.getElementById('institutional-ownership-chart').getContext('2d');
        
        const data = institutionalData.historical;
        const quarters = data.map(item => item.quarter);
        
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
                            text: 'Percentage (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
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

        // Render quarterly change table
        renderQuarterlyChangeTable();
    }

    // Render peer comparison chart
    function renderPeerComparison() {
        const ctx = document.getElementById('institutional-ownership-chart').getContext('2d');
        
        const data = institutionalData.peerComparison;
        const companies = data.map(item => item.company);
        
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
                            text: 'Percentage (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
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

        // Render peer comparison table
        renderPeerComparisonTable();
    }

    // Render top institutions table
    function renderTopInstitutionsTable() {
        const dataTableContainer = document.querySelector('.data-table-container');
        dataTableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'data-table';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Institution', 'Shares Held', 'Percent Owned', 'Quarterly Change'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        institutionalData.topInstitutions.forEach(institution => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = institution.name;
            row.appendChild(nameCell);
            
            const sharesCell = document.createElement('td');
            sharesCell.textContent = institution.shares.toLocaleString();
            row.appendChild(sharesCell);
            
            const percentCell = document.createElement('td');
            percentCell.textContent = institution.percentOwned.toFixed(1) + '%';
            row.appendChild(percentCell);
            
            const changeCell = document.createElement('td');
            const change = institution.quarterlyChange;
            changeCell.textContent = (change >= 0 ? '+' : '') + change.toFixed(1) + '%';
            changeCell.style.color = change >= 0 ? 'green' : 'red';
            row.appendChild(changeCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        dataTableContainer.appendChild(table);
    }

    // Render quarterly change table
    function renderQuarterlyChangeTable() {
        const dataTableContainer = document.querySelector('.data-table-container');
        dataTableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'data-table';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Quarter', 'Institutional', 'Retail', 'Insiders', 'Strategic Partners'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        institutionalData.historical.forEach(quarter => {
            const row = document.createElement('tr');
            
            const quarterCell = document.createElement('td');
            quarterCell.textContent = quarter.quarter;
            row.appendChild(quarterCell);
            
            const institutionalCell = document.createElement('td');
            institutionalCell.textContent = quarter.institutional.toFixed(1) + '%';
            row.appendChild(institutionalCell);
            
            const retailCell = document.createElement('td');
            retailCell.textContent = quarter.retail.toFixed(1) + '%';
            row.appendChild(retailCell);
            
            const insidersCell = document.createElement('td');
            insidersCell.textContent = quarter.insiders.toFixed(1) + '%';
            row.appendChild(insidersCell);
            
            const strategicCell = document.createElement('td');
            strategicCell.textContent = quarter.strategic.toFixed(1) + '%';
            row.appendChild(strategicCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        dataTableContainer.appendChild(table);
    }

    // Render peer comparison table
    function renderPeerComparisonTable() {
        const dataTableContainer = document.querySelector('.data-table-container');
        dataTableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'data-table';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Company', 'Institutional', 'Retail', 'Insiders', 'Strategic Partners'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        institutionalData.peerComparison.forEach(company => {
            const row = document.createElement('tr');
            
            const companyCell = document.createElement('td');
            companyCell.textContent = company.company;
            if (company.company === 'Imugene') {
                companyCell.style.fontWeight = 'bold';
                row.style.backgroundColor = 'rgba(54, 162, 235, 0.1)';
            }
            row.appendChild(companyCell);
            
            const institutionalCell = document.createElement('td');
            institutionalCell.textContent = company.institutional.toFixed(1) + '%';
            row.appendChild(institutionalCell);
            
            const retailCell = document.createElement('td');
            retailCell.textContent = company.retail.toFixed(1) + '%';
            row.appendChild(retailCell);
            
            const insidersCell = document.createElement('td');
            insidersCell.textContent = company.insiders.toFixed(1) + '%';
            row.appendChild(insidersCell);
            
            const strategicCell = document.createElement('td');
            strategicCell.textContent = company.strategic.toFixed(1) + '%';
            row.appendChild(strategicCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        dataTableContainer.appendChild(table);
    }

    // Add event listeners for toggles
    document.getElementById('percentage-toggle').addEventListener('change', function() {
        // Implementation for percentage toggle
        updateVisualization();
    });

    document.getElementById('change-toggle').addEventListener('change', function() {
        // Implementation for change toggle
        if (currentTabIndex === 0) {
            renderTopInstitutionsTable();
        }
    });

    // Initialize the visualization
    updateVisualization();
});
