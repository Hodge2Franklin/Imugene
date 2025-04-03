// SWOT Analysis Interactive Charts
document.addEventListener('DOMContentLoaded', function() {
    // Load Chart.js library directly in the HTML
    const chartScript = document.createElement('script');
    chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
    document.head.appendChild(chartScript);
    
    // Initialize immediately and also on load to ensure it works
    initSwotComponents();
    
    chartScript.onload = function() {
        initSwotComponents();
    };
    
    function initSwotComponents() {
        // Get all SWOT analysis components
        const swotComponents = document.querySelectorAll('.swot-analysis-component');
        
        swotComponents.forEach(component => {
            const tabs = component.querySelectorAll('.swot-tab');
            const views = component.querySelectorAll('.swot-view');
            
            // Tab switching functionality
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs and views
                    tabs.forEach(t => t.classList.remove('active'));
                    views.forEach(v => v.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Show corresponding view
                    const viewType = this.getAttribute('data-view');
                    component.querySelector(`.${viewType}-view`).classList.add('active');
                    
                    // Initialize charts if needed
                    if (viewType === 'radar' && !component.querySelector('.radar-chart canvas')) {
                        initRadarChart(component);
                    } else if (viewType === 'bar' && !component.querySelector('.bar-chart canvas')) {
                        initBarChart(component);
                    }
                });
            });
            
            // Chart controls functionality
            const chartControls = component.querySelectorAll('.chart-control');
            chartControls.forEach(control => {
                control.addEventListener('click', function() {
                    const controlsContainer = this.parentElement;
                    controlsContainer.querySelectorAll('.chart-control').forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update chart based on selected factor
                    const factor = this.getAttribute('data-factor');
                    const viewType = controlsContainer.closest('.swot-view').classList.contains('radar-view') ? 'radar' : 'bar';
                    
                    if (viewType === 'radar') {
                        updateRadarChart(component, factor);
                    } else if (viewType === 'bar') {
                        updateBarChart(component, factor);
                    }
                });
            });
        });
    };
    
    // Initialize Radar Chart
    function initRadarChart(component) {
        const radarContainer = component.querySelector('.radar-chart');
        
        // Clear any existing content
        radarContainer.innerHTML = '';
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        radarContainer.appendChild(canvas);
        
        // Define data for radar chart
        const data = {
            labels: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
            datasets: [{
                label: 'Overall SWOT Analysis',
                data: [80, 60, 75, 55],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        };
        
        // Create radar chart
        new Chart(canvas, {
            type: 'radar',
            data: data,
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Update Radar Chart based on selected factor
    function updateRadarChart(component, factor) {
        const canvas = component.querySelector('.radar-view canvas');
        if (!canvas) return;
        
        const chart = Chart.getChart(canvas);
        if (!chart) return;
        
        // Define different data sets based on factor
        let data;
        switch (factor) {
            case 'technology':
                data = [90, 50, 85, 45];
                chart.data.datasets[0].label = 'Technology SWOT Analysis';
                chart.data.datasets[0].backgroundColor = 'rgba(75, 192, 192, 0.2)';
                chart.data.datasets[0].borderColor = 'rgb(75, 192, 192)';
                break;
            case 'financial':
                data = [65, 75, 60, 70];
                chart.data.datasets[0].label = 'Financial SWOT Analysis';
                chart.data.datasets[0].backgroundColor = 'rgba(255, 159, 64, 0.2)';
                chart.data.datasets[0].borderColor = 'rgb(255, 159, 64)';
                break;
            case 'market':
                data = [70, 55, 80, 60];
                chart.data.datasets[0].label = 'Market SWOT Analysis';
                chart.data.datasets[0].backgroundColor = 'rgba(153, 102, 255, 0.2)';
                chart.data.datasets[0].borderColor = 'rgb(153, 102, 255)';
                break;
            default: // overall
                data = [80, 60, 75, 55];
                chart.data.datasets[0].label = 'Overall SWOT Analysis';
                chart.data.datasets[0].backgroundColor = 'rgba(54, 162, 235, 0.2)';
                chart.data.datasets[0].borderColor = 'rgb(54, 162, 235)';
                break;
        }
        
        chart.data.datasets[0].data = data;
        chart.update();
    }
    
    // Initialize Bar Chart
    function initBarChart(component) {
        const barContainer = component.querySelector('.radar-chart'); // Using same container class
        
        // Clear any existing content
        barContainer.innerHTML = '';
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        barContainer.appendChild(canvas);
        
        // Define data for bar chart
        const data = {
            labels: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
            datasets: [{
                label: 'Count of Factors',
                data: [6, 6, 6, 6],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.6)',
                    'rgba(231, 76, 60, 0.6)',
                    'rgba(52, 152, 219, 0.6)',
                    'rgba(241, 196, 15, 0.6)'
                ],
                borderColor: [
                    'rgb(46, 204, 113)',
                    'rgb(231, 76, 60)',
                    'rgb(52, 152, 219)',
                    'rgb(241, 196, 15)'
                ],
                borderWidth: 1
            }]
        };
        
        // Create bar chart
        new Chart(canvas, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    }
                }
            }
        });
    }
    
    // Update Bar Chart based on selected factor
    function updateBarChart(component, factor) {
        const canvas = component.querySelector('.bar-view canvas');
        if (!canvas) return;
        
        const chart = Chart.getChart(canvas);
        if (!chart) return;
        
        // Define different data sets based on factor
        let data, label;
        switch (factor) {
            case 'impact':
                data = [85, 65, 75, 70];
                label = 'Impact Score (0-100)';
                break;
            case 'probability':
                data = [90, 80, 60, 50];
                label = 'Probability (%)';
                break;
            case 'timeline':
                data = [3, 6, 12, 9];
                label = 'Timeline (months)';
                break;
            default: // count
                data = [6, 6, 6, 6];
                label = 'Count of Factors';
                break;
        }
        
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].label = label;
        chart.options.scales.y.title.text = label.split(' ')[0];
        chart.update();
    }
});
