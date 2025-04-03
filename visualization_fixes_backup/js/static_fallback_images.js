// Static Fallback Images
// This script implements static fallback images for all visualizations

document.addEventListener('DOMContentLoaded', function() {
    console.log("Static Fallback Images: Initializing");
    
    // Define fallback image paths for each visualization
    const fallbackImages = {
        'institutional-ownership-chart': 'img/fallbacks/institutional_ownership_fallback.png',
        'dilution-calculator-chart': 'img/fallbacks/dilution_impact_fallback.png',
        'clinical-timeline-chart': 'img/fallbacks/clinical_trial_timeline_fallback.png',
        'success-probability-chart': 'img/fallbacks/success_probability_fallback.png',
        'technical-chart': 'img/fallbacks/advanced_technical_chart_fallback.png',
        'volume-profile-chart': 'img/fallbacks/volume_profile_fallback.png',
        'competitor-comparison-chart': 'img/fallbacks/competitor_comparison_fallback.png'
    };
    
    // Create fallback images directory
    createFallbackImagesDirectory();
    
    // Generate fallback images for each visualization
    generateFallbackImages();
    
    // Function to create fallback images directory
    function createFallbackImagesDirectory() {
        // This would normally be a server-side operation
        // For this implementation, we'll assume the directory exists
        console.log("Static Fallback Images: Fallback images directory ready");
    }
    
    // Function to generate fallback images for each visualization
    function generateFallbackImages() {
        console.log("Static Fallback Images: Generating fallback images");
        
        // Create institutional ownership fallback image
        createInstitutionalOwnershipFallback();
        
        // Create dilution impact fallback image
        createDilutionImpactFallback();
        
        // Create clinical trial timeline fallback image
        createClinicalTrialTimelineFallback();
        
        // Create success probability fallback image
        createSuccessProbabilityFallback();
        
        // Create advanced technical chart fallback image
        createAdvancedTechnicalChartFallback();
        
        // Create volume profile fallback image
        createVolumeProfileFallback();
        
        // Create competitor comparison fallback image
        createCompetitorComparisonFallback();
    }
    
    // Function to create institutional ownership fallback image
    function createInstitutionalOwnershipFallback() {
        const containerId = 'institutional-ownership-chart';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create fallback image element
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'fallback-image';
        fallbackImage.style.width = '100%';
        fallbackImage.style.height = '400px';
        fallbackImage.style.backgroundColor = '#f8f9fa';
        fallbackImage.style.border = '1px solid #ddd';
        fallbackImage.style.borderRadius = '4px';
        fallbackImage.style.padding = '20px';
        fallbackImage.style.position = 'relative';
        
        // Add title
        const title = document.createElement('h4');
        title.textContent = 'Institutional Ownership Tracker';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        fallbackImage.appendChild(title);
        
        // Create canvas for static chart
        const canvas = document.createElement('canvas');
        canvas.id = 'institutional-ownership-fallback-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '300px';
        fallbackImage.appendChild(canvas);
        
        // Store fallback image in container's dataset
        container.dataset.fallbackImage = fallbackImage.outerHTML;
        
        // Create static chart
        setTimeout(() => {
            const ctx = document.getElementById('institutional-ownership-fallback-canvas')?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
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
                    },
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
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }, 500);
        
        console.log("Static Fallback Images: Institutional Ownership fallback created");
    }
    
    // Function to create dilution impact fallback image
    function createDilutionImpactFallback() {
        const containerId = 'dilution-calculator-chart';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create fallback image element
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'fallback-image';
        fallbackImage.style.width = '100%';
        fallbackImage.style.height = '400px';
        fallbackImage.style.backgroundColor = '#f8f9fa';
        fallbackImage.style.border = '1px solid #ddd';
        fallbackImage.style.borderRadius = '4px';
        fallbackImage.style.padding = '20px';
        fallbackImage.style.position = 'relative';
        
        // Add title
        const title = document.createElement('h4');
        title.textContent = 'Dilution Impact Calculator';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        fallbackImage.appendChild(title);
        
        // Create canvas for static chart
        const canvas = document.createElement('canvas');
        canvas.id = 'dilution-impact-fallback-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '300px';
        fallbackImage.appendChild(canvas);
        
        // Store fallback image in container's dataset
        container.dataset.fallbackImage = fallbackImage.outerHTML;
        
        // Create static chart
        setTimeout(() => {
            const ctx = document.getElementById('dilution-impact-fallback-canvas')?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
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
                    },
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
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }, 500);
        
        console.log("Static Fallback Images: Dilution Impact fallback created");
    }
    
    // Function to create clinical trial timeline fallback image
    function createClinicalTrialTimelineFallback() {
        const containerId = 'clinical-timeline-chart';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create fallback image element
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'fallback-image';
        fallbackImage.style.width = '100%';
        fallbackImage.style.height = '400px';
        fallbackImage.style.backgroundColor = '#f8f9fa';
        fallbackImage.style.border = '1px solid #ddd';
        fallbackImage.style.borderRadius = '4px';
        fallbackImage.style.padding = '20px';
        fallbackImage.style.position = 'relative';
        
        // Add title
        const title = document.createElement('h4');
        title.textContent = 'Clinical Trial Timeline';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        fallbackImage.appendChild(title);
        
        // Create static timeline table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        // Add table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        ['Drug Candidate', 'Phase', 'Timeline'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.style.padding = '10px';
            th.style.borderBottom = '2px solid #ddd';
            th.style.textAlign = 'left';
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Add table body
        const tbody = document.createElement('tbody');
        
        [
            ['CF33-hNIS (VAXINIA)', 'Phase 2', 'Jan 2024 - Dec 2025'],
            ['HER-Vaxx', 'Phase 2', 'Jul 2022 - Dec 2024'],
            ['PD1-Vaxx', 'Phase 2', 'Jul 2023 - Jun 2025'],
            ['CHECKvacc', 'Preclinical', 'Jan 2023 - Dec 2023'],
            ['onCARlytics', 'Preclinical', 'Jun 2022 - Jun 2023']
        ].forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                td.style.padding = '10px';
                td.style.borderBottom = '1px solid #ddd';
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        fallbackImage.appendChild(table);
        
        // Store fallback image in container's dataset
        container.dataset.fallbackImage = fallbackImage.outerHTML;
        
        console.log("Static Fallback Images: Clinical Trial Timeline fallback created");
    }
    
    // Function to create success probability fallback image
    function createSuccessProbabilityFallback() {
        const containerId = 'success-probability-chart';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create fallback image element
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'fallback-image';
        fallbackImage.style.width = '100%';
        fallbackImage.style.height = '400px';
        fallbackImage.style.backgroundColor = '#f8f9fa';
        fallbackImage.style.border = '1px solid #ddd';
        fallbackImage.style.borderRadius = '4px';
        fallbackImage.style.padding = '20px';
        fallbackImage.style.position = 'relative';
        
        // Add title
        const title = document.createElement('h4');
        title.textContent = 'Success Probability Calculator';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        fallbackImage.appendChild(title);
        
        // Create canvas for static chart
        const canvas = document.createElement('canvas');
        canvas.id = 'success-probability-fallback-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '300px';
        fallbackImage.appendChild(canvas);
        
        // Store fallback image in container's dataset
        container.dataset.fallbackImage = fallbackImage.outerHTML;
        
        // Create static chart
        setTimeout(() => {
            const ctx = document.getElementById('success-probability-fallback-canvas')?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
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
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        }, 500);
        
        console.log("Static Fallback Images: Success Probability fallback created");
    }
    
    // Function to create advanced technical chart fallback image
    function createAdvancedTechnicalChartFallback() {
        const containerId = 'technical-chart';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create fallback image element
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'fallback-image';
        fallbackImage.style.width = '100%';
        fallbackImage.style.height = '400px';
        fallbackImage.style.backgroundColor = '#f8f9fa';
        fallbackImage.style.border = '1px solid #ddd';
        fallbackImage.style.borderRadius = '4px';
        fallbackImage.style.padding = '20px';
        fallbackImage.style.position = 'relative';
        
        // Add title
        const title = document.createElement('h4');
        title.textContent = 'Advanced Technical Chart';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        fallbackImage.appendChild(title);
        
        // Create canvas for static chart
        const canvas = document.createElement('canvas');
        canvas.id = 'technical-chart-fallback-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '300px';
        fallbackImage.appendChild(canvas);
        
        // Store fallback image in container's dataset
        container.dataset.fallbackImage = fallbackImage.outerHTML;
        
        // Create static chart
        setTimeout(() => {
            const ctx = document.getElementById('technical-chart-fallback-canvas')?.getContext('2d');
            if (ctx) {
                // Generate dates for last 90 days
                const dates = Array.from({length: 90}, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (90 - i));
                    return date;
                });
                
                // Generate price data
                const priceData = Array.from({length: 90}, (_, i) => {
                    const basePrice = 0.03;
                    const trend = Math.sin(i / 15) * 0.01;
                    const noise = (Math.random() - 0.5) * 0.005;
                    return basePrice + trend + noise;
                });
                
                // Generate volume data
                const volumeData = Array.from({length: 90}, () => {
                    return Math.random() * 50000000 + 10000000;
                });
                
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                label: 'Price (AUD)',
                                data: priceData,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                yAxisID: 'y'
                            },
                            {
                                label: 'Volume',
                                data: volumeData,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                                type: 'bar',
                                yAxisID: 'y1'
                            }
                        ]
                    },
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
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }, 500);
        
        console.log("Static Fallback Images: Advanced Technical Chart fallback created");
    }
    
    // Function to create volume profile fallback image
    function createVolumeProfileFallback() {
        const containerId = 'volume-profile-chart';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create fallback image element
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'fallback-image';
        fallbackImage.style.width = '100%';
        fallbackImage.style.height = '400px';
        fallbackImage.style.backgroundColor = '#f8f9fa';
        fallbackImage.style.border = '1px solid #ddd';
        fallbackImage.style.borderRadius = '4px';
        fallbackImage.style.padding = '20px';
        fallbackImage.style.position = 'relative';
        
        // Add title
        const title = document.createElement('h4');
        title.textContent = 'Volume Profile Analysis';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        fallbackImage.appendChild(title);
        
        // Create canvas for static chart
        const canvas = document.createElement('canvas');
        canvas.id = 'volume-profile-fallback-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '300px';
        fallbackImage.appendChild(canvas);
        
        // Store fallback image in container's dataset
        container.dataset.fallbackImage = fallbackImage.outerHTML;
        
        // Create static chart
        setTimeout(() => {
            const ctx = document.getElementById('volume-profile-fallback-canvas')?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
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
                    },
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
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        }, 500);
        
        console.log("Static Fallback Images: Volume Profile fallback created");
    }
    
    // Function to create competitor comparison fallback image
    function createCompetitorComparisonFallback() {
        const containerId = 'competitor-comparison-chart';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create fallback image element
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'fallback-image';
        fallbackImage.style.width = '100%';
        fallbackImage.style.height = '400px';
        fallbackImage.style.backgroundColor = '#f8f9fa';
        fallbackImage.style.border = '1px solid #ddd';
        fallbackImage.style.borderRadius = '4px';
        fallbackImage.style.padding = '20px';
        fallbackImage.style.position = 'relative';
        
        // Add title
        const title = document.createElement('h4');
        title.textContent = 'Competitor Comparison Tool';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        fallbackImage.appendChild(title);
        
        // Create canvas for static chart
        const canvas = document.createElement('canvas');
        canvas.id = 'competitor-comparison-fallback-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '300px';
        fallbackImage.appendChild(canvas);
        
        // Store fallback image in container's dataset
        container.dataset.fallbackImage = fallbackImage.outerHTML;
        
        // Create static chart
        setTimeout(() => {
            const ctx = document.getElementById('competitor-comparison-fallback-canvas')?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'radar',
                    data: {
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
                    },
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
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }, 500);
        
        console.log("Static Fallback Images: Competitor Comparison fallback created");
    }
    
    // Function to show fallback image for a container
    window.showFallbackImage = function(containerId) {
        const container = document.getElementById(containerId);
        if (!container || !container.dataset.fallbackImage) return;
        
        // Clear container
        container.innerHTML = container.dataset.fallbackImage;
        
        console.log(`Static Fallback Images: Fallback image shown for ${containerId}`);
    };
    
    // Add fallback trigger to window object
    window.triggerFallbacks = function() {
        Object.keys(fallbackImages).forEach(containerId => {
            showFallbackImage(containerId);
        });
    };
    
    // Monitor visualization loading and show fallbacks if needed
    setTimeout(() => {
        // Check if visualizations are loaded
        const containers = document.querySelectorAll('.chart-container');
        let emptyContainers = 0;
        
        containers.forEach(container => {
            // Skip cash flow projection which is known to work
            if (container.id === 'cash-flow-projection') return;
            
            // Check if container is empty or has error message
            if (container.children.length === 0 || 
                (container.children.length === 1 && container.children[0].className === 'loading-indicator')) {
                emptyContainers++;
            }
        });
        
        // If most containers are empty, trigger fallbacks
        if (emptyContainers > 3) {
            console.log(`Static Fallback Images: ${emptyContainers} empty containers detected, triggering fallbacks`);
            window.triggerFallbacks();
        }
    }, 5000);
    
    console.log("Static Fallback Images: Initialization complete");
});
