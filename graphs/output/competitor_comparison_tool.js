// Competitor Comparison Tool Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('competitor-comparison-container');
    if (!container) return;

    // Create the comparison interface
    createComparisonInterface(container);

    // Sample data for Imugene and competitors
    const companyData = generateSampleCompanyData();

    // Initialize the comparison tool with sample data
    initializeComparisonTool(companyData);

    // Function to create comparison interface
    function createComparisonInterface(container) {
        // Create controls section
        const controlsSection = document.createElement('div');
        controlsSection.className = 'comparison-controls';
        container.appendChild(controlsSection);

        // Create competitor selector
        const competitorSelector = document.createElement('div');
        competitorSelector.className = 'control-group';
        competitorSelector.innerHTML = `
            <label>Select Competitors to Compare:</label>
            <div class="checkbox-group">
                <label><input type="checkbox" id="imugene-checkbox" checked disabled> Imugene (IMU.AX)</label>
                <label><input type="checkbox" id="prescient-checkbox" checked> Prescient Therapeutics (PTX.AX)</label>
                <label><input type="checkbox" id="immutep-checkbox" checked> Immutep (IMM.AX)</label>
                <label><input type="checkbox" id="kazia-checkbox"> Kazia Therapeutics (KZA.AX)</label>
                <label><input type="checkbox" id="race-checkbox"> Race Oncology (RAC.AX)</label>
                <label><input type="checkbox" id="telix-checkbox"> Telix Pharmaceuticals (TLX.AX)</label>
            </div>
        `;
        controlsSection.appendChild(competitorSelector);

        // Create metric selector
        const metricSelector = document.createElement('div');
        metricSelector.className = 'control-group';
        metricSelector.innerHTML = `
            <label>Select Metrics to Compare:</label>
            <div class="checkbox-group">
                <label><input type="checkbox" id="market-cap-checkbox" checked> Market Cap</label>
                <label><input type="checkbox" id="cash-position-checkbox" checked> Cash Position</label>
                <label><input type="checkbox" id="burn-rate-checkbox" checked> Cash Burn Rate</label>
                <label><input type="checkbox" id="pipeline-checkbox"> Pipeline Assets</label>
                <label><input type="checkbox" id="valuation-checkbox"> Valuation Metrics</label>
                <label><input type="checkbox" id="performance-checkbox"> YTD Performance</label>
            </div>
        `;
        controlsSection.appendChild(metricSelector);

        // Create view type selector
        const viewTypeSelector = document.createElement('div');
        viewTypeSelector.className = 'control-group';
        viewTypeSelector.innerHTML = `
            <label>View Type:</label>
            <select id="view-type-selector">
                <option value="table">Table View</option>
                <option value="chart" selected>Chart View</option>
                <option value="radar">Radar Chart</option>
                <option value="combined">Combined View</option>
            </select>
        `;
        controlsSection.appendChild(viewTypeSelector);

        // Create chart container
        const chartContainer = document.createElement('div');
        chartContainer.id = 'comparison-chart-container';
        chartContainer.style.height = '400px';
        chartContainer.style.marginTop = '20px';
        container.appendChild(chartContainer);

        // Create table container
        const tableContainer = document.createElement('div');
        tableContainer.id = 'comparison-table-container';
        tableContainer.style.marginTop = '20px';
        tableContainer.style.display = 'none'; // Hidden by default
        container.appendChild(tableContainer);

        // Create radar chart container
        const radarContainer = document.createElement('div');
        radarContainer.id = 'comparison-radar-container';
        radarContainer.style.height = '500px';
        radarContainer.style.marginTop = '20px';
        radarContainer.style.display = 'none'; // Hidden by default
        container.appendChild(radarContainer);

        // Create analysis section
        const analysisSection = document.createElement('div');
        analysisSection.className = 'analysis-section';
        analysisSection.style.marginTop = '30px';
        container.appendChild(analysisSection);

        // Create title for analysis section
        const analysisTitle = document.createElement('h3');
        analysisTitle.textContent = 'Competitive Analysis';
        analysisSection.appendChild(analysisTitle);

        // Create analysis container
        const analysisContainer = document.createElement('div');
        analysisContainer.id = 'competitive-analysis';
        analysisContainer.className = 'analysis-container';
        analysisSection.appendChild(analysisContainer);

        // Add event listeners to controls
        document.querySelectorAll('#competitor-comparison-container .checkbox-group input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateComparisonView();
            });
        });

        document.getElementById('view-type-selector').addEventListener('change', function() {
            updateViewType(this.value);
        });
    }

    // Function to initialize comparison tool with data
    function initializeComparisonTool(data) {
        // Create initial chart view
        createComparisonChart(data);
        
        // Create table view (hidden initially)
        createComparisonTable(data);
        
        // Create radar chart (hidden initially)
        createRadarChart(data);
        
        // Update analysis text
        updateAnalysisText(data);
    }

    // Function to create comparison chart
    function createComparisonChart(data) {
        // Get selected metrics
        const selectedMetrics = getSelectedMetrics();
        if (selectedMetrics.length === 0) return;
        
        // Get selected companies
        const selectedCompanies = getSelectedCompanies();
        if (selectedCompanies.length === 0) return;
        
        // Filter data for selected companies and metrics
        const filteredData = data.filter(company => selectedCompanies.includes(company.ticker));
        
        // Prepare series data for each metric
        const series = selectedMetrics.map(metric => {
            return {
                name: getMetricLabel(metric),
                data: filteredData.map(company => ({
                    name: company.name,
                    y: company[metric],
                    color: company.ticker === 'IMU.AX' ? '#FF5722' : undefined // Highlight Imugene
                }))
            };
        });
        
        // Create chart
        Highcharts.chart('comparison-chart-container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Competitor Comparison'
            },
            subtitle: {
                text: 'Compare Imugene with selected competitors'
            },
            xAxis: {
                categories: filteredData.map(company => company.name),
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Value'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: series
        });
    }

    // Function to create comparison table
    function createComparisonTable(data) {
        // Get selected metrics
        const selectedMetrics = getSelectedMetrics();
        if (selectedMetrics.length === 0) return;
        
        // Get selected companies
        const selectedCompanies = getSelectedCompanies();
        if (selectedCompanies.length === 0) return;
        
        // Filter data for selected companies
        const filteredData = data.filter(company => selectedCompanies.includes(company.ticker));
        
        // Create table
        const tableContainer = document.getElementById('comparison-table-container');
        
        // Create table HTML
        let tableHTML = '<table class="comparison-table">';
        
        // Add header row
        tableHTML += '<thead><tr><th>Metric</th>';
        filteredData.forEach(company => {
            tableHTML += `<th>${company.name}</th>`;
        });
        tableHTML += '</tr></thead>';
        
        // Add body rows
        tableHTML += '<tbody>';
        selectedMetrics.forEach(metric => {
            tableHTML += `<tr><td>${getMetricLabel(metric)}</td>`;
            filteredData.forEach(company => {
                const value = formatMetricValue(metric, company[metric]);
                const isImugene = company.ticker === 'IMU.AX';
                tableHTML += `<td class="${isImugene ? 'highlight' : ''}">${value}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody>';
        
        // Close table
        tableHTML += '</table>';
        
        // Add table to container
        tableContainer.innerHTML = tableHTML;
        
        // Add CSS for table
        const style = document.createElement('style');
        style.textContent = `
            .comparison-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            .comparison-table th, .comparison-table td {
                padding: 10px;
                text-align: center;
                border: 1px solid #ddd;
            }
            .comparison-table th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            .comparison-table tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            .comparison-table .highlight {
                background-color: #FFF3E0;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }

    // Function to create radar chart
    function createRadarChart(data) {
        // Get selected metrics
        const selectedMetrics = getSelectedMetrics();
        if (selectedMetrics.length === 0) return;
        
        // Get selected companies
        const selectedCompanies = getSelectedCompanies();
        if (selectedCompanies.length === 0) return;
        
        // Filter data for selected companies
        const filteredData = data.filter(company => selectedCompanies.includes(company.ticker));
        
        // Normalize data for radar chart (0-100 scale)
        const normalizedData = normalizeData(filteredData, selectedMetrics);
        
        // Prepare series data
        const series = normalizedData.map(company => {
            return {
                name: company.name,
                data: selectedMetrics.map(metric => company[metric]),
                pointPlacement: 'on',
                color: company.ticker === 'IMU.AX' ? '#FF5722' : undefined // Highlight Imugene
            };
        });
        
        // Create radar chart
        Highcharts.chart('comparison-radar-container', {
            chart: {
                polar: true,
                type: 'line'
            },
            title: {
                text: 'Competitor Comparison - Radar View'
            },
            subtitle: {
                text: 'Normalized scale (higher is better)'
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: selectedMetrics.map(metric => getMetricLabel(metric)),
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },
            series: series,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        pane: {
                            size: '70%'
                        }
                    }
                }]
            }
        });
    }

    // Function to update analysis text
    function updateAnalysisText(data) {
        // Get selected companies
        const selectedCompanies = getSelectedCompanies();
        if (selectedCompanies.length === 0) return;
        
        // Filter data for selected companies
        const filteredData = data.filter(company => selectedCompanies.includes(company.ticker));
        
        // Get Imugene data
        const imugene = filteredData.find(company => company.ticker === 'IMU.AX');
        if (!imugene) return;
        
        // Calculate rankings
        const rankings = calculateRankings(filteredData);
        
        // Generate analysis text
        const analysisContainer = document.getElementById('competitive-analysis');
        
        let analysisHTML = '<div class="analysis-content">';
        
        // Add market position summary
        analysisHTML += '<h4>Market Position Summary</h4>';
        analysisHTML += '<p>Imugene is positioned as a ' + 
            (imugene.marketCap > 100 ? 'mid-cap' : 'small-cap') + 
            ' oncology biotech company with a market capitalization of $' + 
            formatNumber(imugene.marketCap) + 'M, ';
        
        // Compare market cap
        const marketCapRank = rankings.marketCap.findIndex(ticker => ticker === 'IMU.AX') + 1;
        const totalCompanies = filteredData.length;
        
        if (marketCapRank === 1) {
            analysisHTML += 'making it the largest company among the selected peers. ';
        } else if (marketCapRank === totalCompanies) {
            analysisHTML += 'making it the smallest company among the selected peers. ';
        } else {
            analysisHTML += 'ranking #' + marketCapRank + ' out of ' + totalCompanies + ' selected peers. ';
        }
        
        // Cash position and runway
        analysisHTML += 'With a cash position of $' + formatNumber(imugene.cashPosition) + 'M and a quarterly burn rate of $' + 
            formatNumber(imugene.burnRate) + 'M, Imugene has an estimated cash runway of ' + 
            Math.round(imugene.cashPosition / imugene.burnRate) + ' quarters.</p>';
        
        // Add pipeline comparison
        analysisHTML += '<h4>Pipeline Comparison</h4>';
        analysisHTML += '<p>Imugene\'s pipeline consists of ' + imugene.pipeline + ' clinical-stage assets, ';
        
        const pipelineRank = rankings.pipeline.findIndex(ticker => ticker === 'IMU.AX') + 1;
        
        if (pipelineRank === 1) {
            analysisHTML += 'which is the most diverse portfolio among the selected peers. ';
        } else if (pipelineRank === totalCompanies) {
            analysisHTML += 'which is the least diverse portfolio among the selected peers. ';
        } else {
            analysisHTML += 'ranking #' + pipelineRank + ' in portfolio diversity among the selected peers. ';
        }
        
        // Add valuation comparison
        analysisHTML += 'In terms of valuation, Imugene\'s market cap to pipeline asset ratio is $' + 
            formatNumber(imugene.marketCap / imugene.pipeline) + 'M per asset, ';
        
        const valuationRank = rankings.valuation.findIndex(ticker => ticker === 'IMU.AX') + 1;
        
        if (valuationRank === 1) {
            analysisHTML += 'suggesting it may be undervalued relative to peers.</p>';
        } else if (valuationRank === totalCompanies) {
            analysisHTML += 'suggesting it may be overvalued relative to peers.</p>';
        } else {
            analysisHTML += 'placing it in the middle of the peer group in terms of valuation.</p>';
        }
        
        // Add performance comparison
        analysisHTML += '<h4>Performance Comparison</h4>';
        analysisHTML += '<p>Year-to-date, Imugene\'s stock has ' + 
            (imugene.performance >= 0 ? 'gained ' : 'lost ') + 
            Math.abs(imugene.performance) + '%, ';
        
        const performanceRank = rankings.performance.findIndex(ticker => ticker === 'IMU.AX') + 1;
        
        if (performanceRank === 1) {
            analysisHTML += 'outperforming all selected peers. ';
        } else if (performanceRank === totalCompanies) {
            analysisHTML += 'underperforming all selected peers. ';
        } else {
            analysisHTML += 'ranking #' + performanceRank + ' in performance among the selected peers. ';
        }
        
        // Add industry context
        analysisHTML += 'For context, the broader biotech sector (XBI) has ' + 
            (imugene.sectorPerformance >= 0 ? 'gained ' : 'lost ') + 
            Math.abs(imugene.sectorPerformance) + '% over the same period.</p>';
        
        // Add competitive advantages/disadvantages
        analysisHTML += '<h4>Competitive Advantages & Disadvantages</h4>';
        analysisHTML += '<div class="advantages-disadvantages">';
        
        // Advantages
        analysisHTML += '<div class="advantages">';
        analysisHTML += '<h5>Advantages</h5>';
        analysisHTML += '<ul>';
        
        // Dynamically determine advantages based on rankings
        if (marketCapRank <= Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Stronger market capitalization providing greater financial flexibility</li>';
        }
        
        if (rankings.cashPosition.findIndex(ticker => ticker === 'IMU.AX') + 1 <= Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Above-average cash position relative to peers</li>';
        }
        
        if (rankings.burnRate.findIndex(ticker => ticker === 'IMU.AX') + 1 <= Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>More efficient cash utilization with lower burn rate</li>';
        }
        
        if (pipelineRank <= Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Diverse clinical pipeline with multiple shots on goal</li>';
        }
        
        if (valuationRank <= Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Favorable valuation metrics compared to peers</li>';
        }
        
        if (performanceRank <= Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Strong stock performance indicating positive market sentiment</li>';
        }
        
        // Add at least one advantage if none were found
        if (analysisHTML.endsWith('<ul>')) {
            analysisHTML += '<li>Novel oncolytic virus and cell therapy approaches</li>';
            analysisHTML += '<li>Partnerships with leading research institutions</li>';
        }
        
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        
        // Disadvantages
        analysisHTML += '<div class="disadvantages">';
        analysisHTML += '<h5>Disadvantages</h5>';
        analysisHTML += '<ul>';
        
        // Dynamically determine disadvantages based on rankings
        if (marketCapRank > Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Smaller market capitalization limiting financial flexibility</li>';
        }
        
        if (rankings.cashPosition.findIndex(ticker => ticker === 'IMU.AX') + 1 > Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Below-average cash position relative to peers</li>';
        }
        
        if (rankings.burnRate.findIndex(ticker => ticker === 'IMU.AX') + 1 > Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Higher cash burn rate potentially leading to earlier financing needs</li>';
        }
        
        if (pipelineRank > Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Less diverse clinical pipeline compared to peers</li>';
        }
        
        if (valuationRank > Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Less favorable valuation metrics compared to peers</li>';
        }
        
        if (performanceRank > Math.ceil(totalCompanies / 2)) {
            analysisHTML += '<li>Weaker stock performance indicating cautious market sentiment</li>';
        }
        
        // Add at least one disadvantage if none were found
        if (analysisHTML.endsWith('<ul>')) {
            analysisHTML += '<li>Competitive landscape in immuno-oncology</li>';
            analysisHTML += '<li>Early-stage pipeline with significant clinical risk</li>';
        }
        
        analysisHTML += '</ul>';
        analysisHTML += '</div>';
        analysisHTML += '</div>'; // Close advantages-disadvantages
        
        analysisHTML += '</div>'; // Close analysis-content
        
        // Add analysis to container
        analysisContainer.innerHTML = analysisHTML;
        
        // Add CSS for analysis
        const style = document.createElement('style');
        style.textContent = `
            .analysis-content {
                margin-top: 20px;
            }
            .advantages-disadvantages {
                display: flex;
                gap: 20px;
                margin-top: 10px;
            }
            .advantages, .disadvantages {
                flex: 1;
                padding: 15px;
                border-radius: 5px;
            }
            .advantages {
                background-color: #E8F5E9;
                border: 1px solid #A5D6A7;
            }
            .disadvantages {
                background-color: #FFEBEE;
                border: 1px solid #FFCDD2;
            }
            .advantages h5, .disadvantages h5 {
                margin-top: 0;
                margin-bottom: 10px;
            }
            .advantages ul, .disadvantages ul {
                margin: 0;
                padding-left: 20px;
            }
            .advantages li, .disadvantages li {
                margin-bottom: 5px;
            }
            @media (max-width: 768px) {
                .advantages-disadvantages {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Function to calculate rankings
    function calculateRankings(companies) {
        const rankings = {
            marketCap: [],
            cashPosition: [],
            burnRate: [],
            pipeline: [],
            valuation: [],
            performance: []
        };
        
        // Market Cap (higher is better)
        rankings.marketCap = companies
            .sort((a, b) => b.marketCap - a.marketCap)
            .map(company => company.ticker);
        
        // Cash Position (higher is better)
        rankings.cashPosition = companies
            .sort((a, b) => b.cashPosition - a.cashPosition)
            .map(company => company.ticker);
        
        // Burn Rate (lower is better)
        rankings.burnRate = companies
            .sort((a, b) => a.burnRate - b.burnRate)
            .map(company => company.ticker);
        
        // Pipeline (higher is better)
        rankings.pipeline = companies
            .sort((a, b) => b.pipeline - a.pipeline)
            .map(company => company.ticker);
        
        // Valuation (lower market cap per pipeline asset is better)
        rankings.valuation = companies
            .sort((a, b) => (a.marketCap / a.pipeline) - (b.marketCap / b.pipeline))
            .map(company => company.ticker);
        
        // Performance (higher is better)
        rankings.performance = companies
            .sort((a, b) => b.performance - a.performance)
            .map(company => company.ticker);
        
        return rankings;
    }

    // Function to update comparison view based on selections
    function updateComparisonView() {
        // Get current view type
        const viewType = document.getElementById('view-type-selector').value;
        
        // Update view based on type
        updateViewType(viewType);
    }

    // Function to update view type
    function updateViewType(viewType) {
        // Get containers
        const chartContainer = document.getElementById('comparison-chart-container');
        const tableContainer = document.getElementById('comparison-table-container');
        const radarContainer = document.getElementById('comparison-radar-container');
        
        // Hide all containers
        chartContainer.style.display = 'none';
        tableContainer.style.display = 'none';
        radarContainer.style.display = 'none';
        
        // Show selected container and update view
        switch (viewType) {
            case 'table':
                tableContainer.style.display = 'block';
                createComparisonTable(generateSampleCompanyData());
                break;
            case 'chart':
                chartContainer.style.display = 'block';
                createComparisonChart(generateSampleCompanyData());
                break;
            case 'radar':
                radarContainer.style.display = 'block';
                createRadarChart(generateSampleCompanyData());
                break;
            case 'combined':
                chartContainer.style.display = 'block';
                tableContainer.style.display = 'block';
                createComparisonChart(generateSampleCompanyData());
                createComparisonTable(generateSampleCompanyData());
                break;
        }
        
        // Update analysis text
        updateAnalysisText(generateSampleCompanyData());
    }

    // Function to get selected metrics
    function getSelectedMetrics() {
        const metrics = [];
        
        if (document.getElementById('market-cap-checkbox').checked) {
            metrics.push('marketCap');
        }
        
        if (document.getElementById('cash-position-checkbox').checked) {
            metrics.push('cashPosition');
        }
        
        if (document.getElementById('burn-rate-checkbox').checked) {
            metrics.push('burnRate');
        }
        
        if (document.getElementById('pipeline-checkbox').checked) {
            metrics.push('pipeline');
        }
        
        if (document.getElementById('valuation-checkbox').checked) {
            metrics.push('valuation');
        }
        
        if (document.getElementById('performance-checkbox').checked) {
            metrics.push('performance');
        }
        
        return metrics;
    }

    // Function to get selected companies
    function getSelectedCompanies() {
        const companies = [];
        
        // Imugene is always included
        companies.push('IMU.AX');
        
        if (document.getElementById('prescient-checkbox').checked) {
            companies.push('PTX.AX');
        }
        
        if (document.getElementById('immutep-checkbox').checked) {
            companies.push('IMM.AX');
        }
        
        if (document.getElementById('kazia-checkbox').checked) {
            companies.push('KZA.AX');
        }
        
        if (document.getElementById('race-checkbox').checked) {
            companies.push('RAC.AX');
        }
        
        if (document.getElementById('telix-checkbox').checked) {
            companies.push('TLX.AX');
        }
        
        return companies;
    }

    // Function to get metric label
    function getMetricLabel(metric) {
        switch (metric) {
            case 'marketCap':
                return 'Market Cap ($M)';
            case 'cashPosition':
                return 'Cash Position ($M)';
            case 'burnRate':
                return 'Quarterly Burn Rate ($M)';
            case 'pipeline':
                return 'Pipeline Assets';
            case 'valuation':
                return 'Market Cap per Asset ($M)';
            case 'performance':
                return 'YTD Performance (%)';
            default:
                return metric;
        }
    }

    // Function to format metric value
    function formatMetricValue(metric, value) {
        switch (metric) {
            case 'marketCap':
            case 'cashPosition':
            case 'burnRate':
            case 'valuation':
                return '$' + formatNumber(value) + 'M';
            case 'pipeline':
                return value;
            case 'performance':
                return value + '%';
            default:
                return value;
        }
    }

    // Function to format number with commas
    function formatNumber(number) {
        return number.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Function to normalize data for radar chart
    function normalizeData(companies, metrics) {
        // Create a copy of the data
        const normalizedCompanies = JSON.parse(JSON.stringify(companies));
        
        // For each metric, find min and max values
        metrics.forEach(metric => {
            const values = companies.map(company => company[metric]);
            const min = Math.min(...values);
            const max = Math.max(...values);
            const range = max - min;
            
            // Normalize values to 0-100 scale
            normalizedCompanies.forEach(company => {
                // For burn rate, lower is better, so invert the scale
                if (metric === 'burnRate' || metric === 'valuation') {
                    company[metric] = range === 0 ? 50 : 100 - ((company[metric] - min) / range * 100);
                } else {
                    company[metric] = range === 0 ? 50 : (company[metric] - min) / range * 100;
                }
            });
        });
        
        return normalizedCompanies;
    }

    // Function to generate sample company data
    function generateSampleCompanyData() {
        return [
            {
                name: 'Imugene',
                ticker: 'IMU.AX',
                marketCap: 85.2,
                cashPosition: 32.5,
                burnRate: 6.8,
                pipeline: 5,
                valuation: 17.0,
                performance: -15.3,
                sectorPerformance: -8.2
            },
            {
                name: 'Prescient Therapeutics',
                ticker: 'PTX.AX',
                marketCap: 42.7,
                cashPosition: 18.3,
                burnRate: 3.2,
                pipeline: 3,
                valuation: 14.2,
                performance: -22.1,
                sectorPerformance: -8.2
            },
            {
                name: 'Immutep',
                ticker: 'IMM.AX',
                marketCap: 210.5,
                cashPosition: 87.6,
                burnRate: 9.5,
                pipeline: 4,
                valuation: 52.6,
                performance: 12.8,
                sectorPerformance: -8.2
            },
            {
                name: 'Kazia Therapeutics',
                ticker: 'KZA.AX',
                marketCap: 31.8,
                cashPosition: 12.4,
                burnRate: 4.1,
                pipeline: 2,
                valuation: 15.9,
                performance: -35.6,
                sectorPerformance: -8.2
            },
            {
                name: 'Race Oncology',
                ticker: 'RAC.AX',
                marketCap: 38.5,
                cashPosition: 15.2,
                burnRate: 3.8,
                pipeline: 1,
                valuation: 38.5,
                performance: -28.3,
                sectorPerformance: -8.2
            },
            {
                name: 'Telix Pharmaceuticals',
                ticker: 'TLX.AX',
                marketCap: 1250.0,
                cashPosition: 185.3,
                burnRate: 22.7,
                pipeline: 6,
                valuation: 208.3,
                performance: 5.2,
                sectorPerformance: -8.2
            }
        ];
    }
});
