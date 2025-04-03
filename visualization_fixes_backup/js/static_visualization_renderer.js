// Static Visualization Renderer
// This script implements a static visualization approach that works regardless of container naming conventions

document.addEventListener('DOMContentLoaded', function() {
    console.log("Static Visualization Renderer: Initializing");
    
    // Define container ID mappings between what scripts expect and what exists in HTML
    const containerMappings = {
        'institutional-ownership-container': 'institutional-ownership-chart',
        'dilution-impact-container': 'dilution-calculator-chart',
        'clinical-trial-timeline-container': 'clinical-timeline-chart',
        'success-probability-container': 'success-probability-chart',
        'advanced-technical-chart-container': 'technical-chart',
        'volume-profile-container': 'volume-profile-chart',
        'competitor-comparison-container': 'competitor-comparison-chart'
    };
    
    // Create adapter containers for each visualization
    Object.keys(containerMappings).forEach(function(expectedId) {
        const actualId = containerMappings[expectedId];
        const actualContainer = document.getElementById(actualId);
        
        if (actualContainer) {
            console.log(`Static Visualization Renderer: Creating adapter for ${expectedId} -> ${actualId}`);
            
            // Create adapter container
            const adapterContainer = document.createElement('div');
            adapterContainer.id = expectedId;
            adapterContainer.style.width = '100%';
            adapterContainer.style.height = '100%';
            
            // Create canvas element inside adapter
            const canvas = document.createElement('canvas');
            canvas.id = `${expectedId}-canvas`;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            adapterContainer.appendChild(canvas);
            
            // Clear actual container and append adapter
            actualContainer.innerHTML = '';
            actualContainer.appendChild(adapterContainer);
            
            // Add loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.style.position = 'absolute';
            loadingIndicator.style.top = '50%';
            loadingIndicator.style.left = '50%';
            loadingIndicator.style.transform = 'translate(-50%, -50%)';
            loadingIndicator.style.textAlign = 'center';
            loadingIndicator.innerHTML = `
                <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 2s linear infinite;"></div>
                <p style="margin-top: 10px;">Loading visualization...</p>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            actualContainer.appendChild(loadingIndicator);
            
            // Store reference to loading indicator for later removal
            adapterContainer.loadingIndicator = loadingIndicator;
        } else {
            console.warn(`Static Visualization Renderer: Container ${actualId} not found`);
        }
    });
    
    // Render static visualizations after a short delay to allow scripts to load
    setTimeout(renderStaticVisualizations, 1000);
    
    // Function to render static visualizations
    function renderStaticVisualizations() {
        console.log("Static Visualization Renderer: Rendering static visualizations");
        
        // Render Institutional Ownership Tracker
        renderInstitutionalOwnershipTracker();
        
        // Render Dilution Impact Calculator
        renderDilutionImpactCalculator();
        
        // Render Clinical Trial Timeline
        renderClinicalTrialTimeline();
        
        // Render Success Probability Calculator
        renderSuccessProbabilityCalculator();
        
        // Render Advanced Technical Chart
        renderAdvancedTechnicalChart();
        
        // Render Volume Profile Analysis
        renderVolumeProfileAnalysis();
        
        // Render Competitor Comparison Tool
        renderCompetitorComparisonTool();
    }
    
    // Render Institutional Ownership Tracker
    function renderInstitutionalOwnershipTracker() {
        const containerId = 'institutional-ownership-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Sample data for institutional ownership
            const data = {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                datasets: [
                    {
                        label: 'Vanguard ETF',
                        data: [98116864, 98116864, 98116864, 0, 0],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Other Institutions',
                        data: [156000000, 148000000, 142000000, 138000000, 125000000],
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Retail Investors',
                        data: [3745883136, 3753883136, 3759883136, 3862000000, 3875000000],
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            };
            
            // Get canvas context
            const canvas = document.getElementById(`${containerId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Create chart
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true,
                            title: {
                                display: true,
                                text: 'Quarter'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                                display: true,
                                text: 'Number of Shares'
                            },
                            ticks: {
                                callback: function(value) {
                                    if (value >= 1000000) {
                                        return (value / 1000000).toFixed(1) + 'M';
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Institutional Ownership Over Time',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat().format(context.parsed.y) + ' shares';
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            console.log("Static Visualization Renderer: Institutional Ownership Tracker rendered successfully");
            
            // Remove loading indicator
            if (container.loadingIndicator) {
                container.loadingIndicator.remove();
            }
        } catch (error) {
            console.error("Static Visualization Renderer: Error rendering Institutional Ownership Tracker", error);
            showFallbackVisualization(containerId, 'Institutional Ownership Tracker');
        }
    }
    
    // Render Dilution Impact Calculator
    function renderDilutionImpactCalculator() {
        const containerId = 'dilution-impact-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Sample data for dilution impact
            const data = {
                labels: ['Current', '+$30M Raise', '+$50M Raise', '+$70M Raise'],
                datasets: [
                    {
                        label: 'Share Price (cents)',
                        data: [3.0, 2.7, 2.5, 2.3],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Shares Outstanding (billions)',
                        data: [4.0, 4.5, 4.8, 5.2],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        yAxisID: 'y1'
                    }
                ]
            };
            
            // Get canvas context
            const canvas = document.getElementById(`${containerId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Create chart
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Share Price (cents)'
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false
                            },
                            title: {
                                display: true,
                                text: 'Shares Outstanding (billions)'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Dilution Impact on Share Price and Outstanding Shares',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        if (context.dataset.yAxisID === 'y') {
                                            label += context.parsed.y.toFixed(1) + ' cents';
                                        } else {
                                            label += context.parsed.y.toFixed(1) + ' billion shares';
                                        }
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            console.log("Static Visualization Renderer: Dilution Impact Calculator rendered successfully");
            
            // Remove loading indicator
            if (container.loadingIndicator) {
                container.loadingIndicator.remove();
            }
        } catch (error) {
            console.error("Static Visualization Renderer: Error rendering Dilution Impact Calculator", error);
            showFallbackVisualization(containerId, 'Dilution Impact Calculator');
        }
    }
    
    // Render Clinical Trial Timeline
    function renderClinicalTrialTimeline() {
        const containerId = 'clinical-trial-timeline-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Sample data for clinical trial timeline
            const data = {
                labels: ['CF33-hNIS (VAXINIA)', 'HER-Vaxx', 'PD1-Vaxx', 'CHECKvacc', 'onCARlytics'],
                datasets: [
                    {
                        label: 'Preclinical',
                        data: [
                            ['2022-01', '2022-06'],
                            null,
                            null,
                            ['2023-01', '2023-12'],
                            ['2022-06', '2023-06']
                        ],
                        backgroundColor: 'rgba(201, 203, 207, 0.5)',
                        borderColor: 'rgba(201, 203, 207, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Phase 1',
                        data: [
                            ['2022-07', '2023-12'],
                            ['2021-01', '2022-06'],
                            ['2021-06', '2023-06'],
                            null,
                            null
                        ],
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Phase 2',
                        data: [
                            ['2024-01', '2025-12'],
                            ['2022-07', '2024-12'],
                            ['2023-07', '2025-06'],
                            null,
                            null
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            };
            
            // Get canvas context
            const canvas = document.getElementById(`${containerId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Create chart
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month',
                                displayFormats: {
                                    month: 'MMM yyyy'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Timeline'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Drug Candidate'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Clinical Trial Timeline',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.raw && Array.isArray(context.raw)) {
                                        const startDate = new Date(context.raw[0]);
                                        const endDate = new Date(context.raw[1]);
                                        label += `${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            console.log("Static Visualization Renderer: Clinical Trial Timeline rendered successfully");
            
            // Remove loading indicator
            if (container.loadingIndicator) {
                container.loadingIndicator.remove();
            }
        } catch (error) {
            console.error("Static Visualization Renderer: Error rendering Clinical Trial Timeline", error);
            showFallbackVisualization(containerId, 'Clinical Trial Timeline');
        }
    }
    
    // Render Success Probability Calculator
    function renderSuccessProbabilityCalculator() {
        const containerId = 'success-probability-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Sample data for success probability
            const data = {
                labels: ['CF33-hNIS (VAXINIA)', 'HER-Vaxx', 'PD1-Vaxx', 'CHECKvacc', 'onCARlytics'],
                datasets: [
                    {
                        label: 'Probability of Success (%)',
                        data: [15, 22, 18, 8, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            };
            
            // Get canvas context
            const canvas = document.getElementById(`${containerId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Create chart
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Probability of Success (%)'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Estimated Probability of Success for Clinical Trials',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + '%';
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            console.log("Static Visualization Renderer: Success Probability Calculator rendered successfully");
            
            // Remove loading indicator
            if (container.loadingIndicator) {
                container.loadingIndicator.remove();
            }
        } catch (error) {
            console.error("Static Visualization Renderer: Error rendering Success Probability Calculator", error);
            showFallbackVisualization(containerId, 'Success Probability Calculator');
        }
    }
    
    // Render Advanced Technical Chart
    function renderAdvancedTechnicalChart() {
        const containerId = 'advanced-technical-chart-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Sample data for technical chart
            const data = {
                labels: Array.from({length: 90}, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (90 - i));
                    return date;
                }),
                datasets: [
                    {
                        label: 'Price (AUD)',
                        data: Array.from({length: 90}, (_, i) => {
                            // Generate a realistic price pattern
                            const basePrice = 0.03;
                            const trend = Math.sin(i / 15) * 0.01;
                            const noise = (Math.random() - 0.5) * 0.005;
                            return basePrice + trend + noise;
                        }),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Volume',
                        data: Array.from({length: 90}, () => {
                            // Generate random volume data
                            return Math.random() * 50000000 + 10000000;
                        }),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        type: 'bar',
                        yAxisID: 'y1'
                    }
                ]
            };
            
            // Get canvas context
            const canvas = document.getElementById(`${containerId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Create chart
            new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'MMM d'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Price (AUD)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toFixed(3);
                                }
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false
                            },
                            title: {
                                display: true,
                                text: 'Volume'
                            },
                            ticks: {
                                callback: function(value) {
                                    if (value >= 1000000) {
                                        return (value / 1000000).toFixed(1) + 'M';
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Imugene (IMU.AX) Price and Volume - 90 Day History',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.dataset.yAxisID === 'y') {
                                        label += '$' + context.parsed.y.toFixed(3);
                                    } else {
                                        label += new Intl.NumberFormat().format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            console.log("Static Visualization Renderer: Advanced Technical Chart rendered successfully");
            
            // Remove loading indicator
            if (container.loadingIndicator) {
                container.loadingIndicator.remove();
            }
        } catch (error) {
            console.error("Static Visualization Renderer: Error rendering Advanced Technical Chart", error);
            showFallbackVisualization(containerId, 'Advanced Technical Chart');
        }
    }
    
    // Render Volume Profile Analysis
    function renderVolumeProfileAnalysis() {
        const containerId = 'volume-profile-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Sample data for volume profile
            const data = {
                labels: ['0.020-0.025', '0.025-0.030', '0.030-0.035', '0.035-0.040', '0.040-0.045', '0.045-0.050'],
                datasets: [
                    {
                        label: 'Volume Distribution',
                        data: [25000000, 120000000, 180000000, 75000000, 40000000, 15000000],
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            };
            
            // Get canvas context
            const canvas = document.getElementById(`${containerId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Create chart
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Volume'
                            },
                            ticks: {
                                callback: function(value) {
                                    if (value >= 1000000) {
                                        return (value / 1000000).toFixed(0) + 'M';
                                    }
                                    return value;
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price Range (AUD)'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Volume Profile Analysis - Last 6 Months',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.x !== null) {
                                        label += new Intl.NumberFormat().format(context.parsed.x) + ' shares';
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            display: false
                        },
                        annotation: {
                            annotations: {
                                line1: {
                                    type: 'line',
                                    yMin: 2,
                                    yMax: 2,
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 2,
                                    label: {
                                        content: 'Current Price: $0.030',
                                        enabled: true,
                                        position: 'end'
                                    }
                                }
                            }
                        }
                    }
                }
            });
            
            console.log("Static Visualization Renderer: Volume Profile Analysis rendered successfully");
            
            // Remove loading indicator
            if (container.loadingIndicator) {
                container.loadingIndicator.remove();
            }
        } catch (error) {
            console.error("Static Visualization Renderer: Error rendering Volume Profile Analysis", error);
            showFallbackVisualization(containerId, 'Volume Profile Analysis');
        }
    }
    
    // Render Competitor Comparison Tool
    function renderCompetitorComparisonTool() {
        const containerId = 'competitor-comparison-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Sample data for competitor comparison
            const data = {
                labels: ['Market Cap ($M)', 'Cash Position ($M)', 'Cash Runway (Years)', 'Pipeline Value ($M)', 'Clinical Trials'],
                datasets: [
                    {
                        label: 'Imugene',
                        data: [150, 53, 0.8, 120, 5],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Prescient Therapeutics',
                        data: [45, 28, 3.1, 80, 3],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Immutep',
                        data: [210, 87, 4.0, 350, 7],
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kazia Therapeutics',
                        data: [95, 42, 2.8, 180, 4],
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            };
            
            // Get canvas context
            const canvas = document.getElementById(`${containerId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Create chart
            new Chart(ctx, {
                type: 'radar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Competitor Comparison',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.r !== null) {
                                        const metric = context.label;
                                        if (metric.includes('($M)')) {
                                            label += '$' + context.parsed.r + 'M';
                                        } else if (metric.includes('(Years)')) {
                                            label += context.parsed.r.toFixed(1) + ' years';
                                        } else {
                                            label += context.parsed.r;
                                        }
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            console.log("Static Visualization Renderer: Competitor Comparison Tool rendered successfully");
            
            // Remove loading indicator
            if (container.loadingIndicator) {
                container.loadingIndicator.remove();
            }
        } catch (error) {
            console.error("Static Visualization Renderer: Error rendering Competitor Comparison Tool", error);
            showFallbackVisualization(containerId, 'Competitor Comparison Tool');
        }
    }
    
    // Function to show fallback visualization
    function showFallbackVisualization(containerId, title) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Remove loading indicator
        if (container.loadingIndicator) {
            container.loadingIndicator.remove();
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Create fallback visualization
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-visualization';
        fallbackDiv.style.width = '100%';
        fallbackDiv.style.height = '300px';
        fallbackDiv.style.backgroundColor = '#f8f9fa';
        fallbackDiv.style.border = '1px solid #ddd';
        fallbackDiv.style.borderRadius = '4px';
        fallbackDiv.style.padding = '20px';
        fallbackDiv.style.display = 'flex';
        fallbackDiv.style.flexDirection = 'column';
        fallbackDiv.style.alignItems = 'center';
        fallbackDiv.style.justifyContent = 'center';
        
        // Add title
        const fallbackTitle = document.createElement('h4');
        fallbackTitle.textContent = title;
        fallbackTitle.style.marginBottom = '15px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Add message
        const fallbackMessage = document.createElement('p');
        fallbackMessage.textContent = 'Static visualization data is displayed below:';
        fallbackMessage.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackMessage);
        
        // Add table with sample data
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '10px';
        
        // Add table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Add header cells based on visualization type
        if (title === 'Institutional Ownership Tracker') {
            ['Quarter', 'Vanguard ETF', 'Other Institutions', 'Retail Investors'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.style.padding = '8px';
                th.style.borderBottom = '2px solid #ddd';
                th.style.textAlign = 'left';
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Add table body
            const tbody = document.createElement('tbody');
            
            // Add data rows
            [
                ['Q1 2024', '98,116,864', '156,000,000', '3,745,883,136'],
                ['Q2 2024', '98,116,864', '148,000,000', '3,753,883,136'],
                ['Q3 2024', '98,116,864', '142,000,000', '3,759,883,136'],
                ['Q4 2024', '0', '138,000,000', '3,862,000,000'],
                ['Q1 2025', '0', '125,000,000', '3,875,000,000']
            ].forEach(rowData => {
                const row = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    td.style.padding = '8px';
                    td.style.borderBottom = '1px solid #ddd';
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
        } else if (title === 'Dilution Impact Calculator') {
            ['Scenario', 'Share Price (cents)', 'Shares Outstanding (billions)'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.style.padding = '8px';
                th.style.borderBottom = '2px solid #ddd';
                th.style.textAlign = 'left';
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Add table body
            const tbody = document.createElement('tbody');
            
            // Add data rows
            [
                ['Current', '3.0', '4.0'],
                ['+$30M Raise', '2.7', '4.5'],
                ['+$50M Raise', '2.5', '4.8'],
                ['+$70M Raise', '2.3', '5.2']
            ].forEach(rowData => {
                const row = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    td.style.padding = '8px';
                    td.style.borderBottom = '1px solid #ddd';
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
        } else {
            // Generic table for other visualizations
            ['Metric', 'Value'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.style.padding = '8px';
                th.style.borderBottom = '2px solid #ddd';
                th.style.textAlign = 'left';
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Add table body
            const tbody = document.createElement('tbody');
            
            // Add generic data rows based on visualization type
            let dataRows = [];
            
            if (title === 'Clinical Trial Timeline') {
                dataRows = [
                    ['CF33-hNIS (VAXINIA)', 'Phase 2 (2024-2025)'],
                    ['HER-Vaxx', 'Phase 2 (2022-2024)'],
                    ['PD1-Vaxx', 'Phase 2 (2023-2025)'],
                    ['CHECKvacc', 'Preclinical (2023)'],
                    ['onCARlytics', 'Preclinical (2022-2023)']
                ];
            } else if (title === 'Success Probability Calculator') {
                dataRows = [
                    ['CF33-hNIS (VAXINIA)', '15%'],
                    ['HER-Vaxx', '22%'],
                    ['PD1-Vaxx', '18%'],
                    ['CHECKvacc', '8%'],
                    ['onCARlytics', '5%']
                ];
            } else if (title === 'Advanced Technical Chart') {
                dataRows = [
                    ['Current Price', '$0.030'],
                    ['52-Week High', '$0.048'],
                    ['52-Week Low', '$0.022'],
                    ['Average Volume (3M)', '15.2M shares'],
                    ['Market Cap', '$150M']
                ];
            } else if (title === 'Volume Profile Analysis') {
                dataRows = [
                    ['Price Range $0.020-0.025', '25M shares'],
                    ['Price Range $0.025-0.030', '120M shares'],
                    ['Price Range $0.030-0.035', '180M shares'],
                    ['Price Range $0.035-0.040', '75M shares'],
                    ['Price Range $0.040-0.045', '40M shares'],
                    ['Price Range $0.045-0.050', '15M shares']
                ];
            } else if (title === 'Competitor Comparison Tool') {
                dataRows = [
                    ['Imugene - Market Cap', '$150M'],
                    ['Imugene - Cash Position', '$53M'],
                    ['Imugene - Cash Runway', '0.8 years'],
                    ['Prescient Therapeutics - Market Cap', '$45M'],
                    ['Immutep - Market Cap', '$210M'],
                    ['Kazia Therapeutics - Market Cap', '$95M']
                ];
            }
            
            dataRows.forEach(rowData => {
                const row = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    td.style.padding = '8px';
                    td.style.borderBottom = '1px solid #ddd';
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
        }
        
        fallbackDiv.appendChild(table);
        container.appendChild(fallbackDiv);
        
        console.log(`Static Visualization Renderer: Fallback visualization shown for ${title}`);
    }
    
    console.log("Static Visualization Renderer: Initialization complete");
});
