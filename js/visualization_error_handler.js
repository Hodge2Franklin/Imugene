// Robust error handling and logging system for visualizations
document.addEventListener('DOMContentLoaded', function() {
    console.log("Error Handler: Initializing visualization error handling system");
    
    // Create global error logging object
    window.VisualizationErrorLogger = {
        errors: [],
        
        // Log an error
        logError: function(component, errorType, errorMessage, errorDetails) {
            const timestamp = new Date().toISOString();
            const error = {
                timestamp: timestamp,
                component: component,
                type: errorType,
                message: errorMessage,
                details: errorDetails,
                userAgent: navigator.userAgent
            };
            
            this.errors.push(error);
            
            // Log to console
            console.error(`[${timestamp}] ${component} Error (${errorType}): ${errorMessage}`, errorDetails);
            
            // Return error ID for reference
            return this.errors.length - 1;
        },
        
        // Get all errors
        getAllErrors: function() {
            return this.errors;
        },
        
        // Get errors for a specific component
        getErrorsByComponent: function(component) {
            return this.errors.filter(error => error.component === component);
        },
        
        // Clear all errors
        clearErrors: function() {
            this.errors = [];
            console.log("Error Handler: All errors cleared");
        },
        
        // Show error summary in console
        showErrorSummary: function() {
            if (this.errors.length === 0) {
                console.log("Error Handler: No errors recorded");
                return;
            }
            
            console.group("Visualization Error Summary");
            console.log(`Total errors: ${this.errors.length}`);
            
            // Group by component
            const componentGroups = {};
            this.errors.forEach(error => {
                if (!componentGroups[error.component]) {
                    componentGroups[error.component] = [];
                }
                componentGroups[error.component].push(error);
            });
            
            // Log component groups
            Object.keys(componentGroups).forEach(component => {
                console.group(`${component} (${componentGroups[component].length} errors)`);
                componentGroups[component].forEach(error => {
                    console.log(`[${error.timestamp}] ${error.type}: ${error.message}`);
                });
                console.groupEnd();
            });
            
            console.groupEnd();
        }
    };
    
    // Create global chart registry to track all chart instances
    window.ChartRegistry = {
        charts: {},
        
        // Register a chart
        register: function(id, chartInstance, component) {
            this.charts[id] = {
                instance: chartInstance,
                component: component,
                createdAt: new Date().toISOString()
            };
            console.log(`Chart Registry: Registered chart '${id}' for ${component}`);
        },
        
        // Get a chart by ID
        get: function(id) {
            return this.charts[id]?.instance || null;
        },
        
        // Remove a chart
        remove: function(id) {
            if (this.charts[id]) {
                delete this.charts[id];
                console.log(`Chart Registry: Removed chart '${id}'`);
                return true;
            }
            return false;
        },
        
        // Get all charts
        getAll: function() {
            return Object.keys(this.charts).map(id => ({
                id: id,
                ...this.charts[id]
            }));
        },
        
        // Get charts by component
        getByComponent: function(component) {
            return Object.keys(this.charts)
                .filter(id => this.charts[id].component === component)
                .map(id => ({
                    id: id,
                    ...this.charts[id]
                }));
        },
        
        // Destroy all charts
        destroyAll: function() {
            Object.keys(this.charts).forEach(id => {
                try {
                    this.charts[id].instance.destroy();
                    console.log(`Chart Registry: Destroyed chart '${id}'`);
                } catch (e) {
                    console.error(`Chart Registry: Failed to destroy chart '${id}'`, e);
                }
            });
            this.charts = {};
            console.log("Chart Registry: All charts destroyed");
        }
    };
    
    // Override Chart constructor to automatically register charts
    if (typeof Chart !== 'undefined') {
        const originalConstructor = Chart.constructor;
        
        Chart.constructor = function(ctx, config) {
            const result = originalConstructor.apply(this, arguments);
            
            // Generate a unique ID for the chart
            const canvasId = ctx.canvas.id || 'unknown-canvas';
            const chartId = `chart-${canvasId}-${Date.now()}`;
            
            // Try to determine the component from the canvas ID
            let component = 'Unknown';
            if (canvasId.includes('institutional-ownership')) {
                component = 'Institutional Ownership Tracker';
            } else if (canvasId.includes('dilution-impact')) {
                component = 'Dilution Impact Calculator';
            } else if (canvasId.includes('clinical-trial')) {
                component = 'Clinical Trial Timeline';
            } else if (canvasId.includes('success-probability')) {
                component = 'Success Probability Calculator';
            } else if (canvasId.includes('technical-chart')) {
                component = 'Advanced Technical Chart';
            } else if (canvasId.includes('volume-profile')) {
                component = 'Volume Profile Analysis';
            } else if (canvasId.includes('competitor-comparison')) {
                component = 'Competitor Comparison Tool';
            }
            
            // Register the chart
            ChartRegistry.register(chartId, this, component);
            
            return result;
        };
    }
    
    // Add global error handler for uncaught errors
    window.addEventListener('error', function(event) {
        // Check if the error is related to visualizations
        const errorSource = event.filename || '';
        if (errorSource.includes('chart.js') || 
            errorSource.includes('graphs/output') || 
            errorSource.includes('visualization')) {
            
            // Log the error
            VisualizationErrorLogger.logError(
                'Global', 
                'Uncaught Exception', 
                event.message, 
                {
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                    error: event.error
                }
            );
            
            // Show error message to user
            showGlobalErrorMessage('An error occurred while rendering visualizations. Some charts may not display correctly.');
            
            // Prevent default browser error handling
            event.preventDefault();
        }
    });
    
    // Add global promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        // Check if the rejection is related to visualizations
        const rejectionReason = event.reason?.toString() || '';
        if (rejectionReason.includes('chart') || 
            rejectionReason.includes('canvas') || 
            rejectionReason.includes('visualization')) {
            
            // Log the rejection
            VisualizationErrorLogger.logError(
                'Global', 
                'Unhandled Promise Rejection', 
                rejectionReason, 
                {
                    reason: event.reason
                }
            );
            
            // Prevent default browser error handling
            event.preventDefault();
        }
    });
    
    // Function to show global error message
    function showGlobalErrorMessage(message) {
        // Check if error message container already exists
        let errorContainer = document.getElementById('visualization-error-container');
        
        if (!errorContainer) {
            // Create error container
            errorContainer = document.createElement('div');
            errorContainer.id = 'visualization-error-container';
            errorContainer.style.position = 'fixed';
            errorContainer.style.bottom = '20px';
            errorContainer.style.right = '20px';
            errorContainer.style.maxWidth = '400px';
            errorContainer.style.zIndex = '9999';
            document.body.appendChild(errorContainer);
        }
        
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'visualization-error-message';
        errorMessage.style.backgroundColor = '#f8d7da';
        errorMessage.style.color = '#721c24';
        errorMessage.style.padding = '10px 15px';
        errorMessage.style.marginBottom = '10px';
        errorMessage.style.borderRadius = '4px';
        errorMessage.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        errorMessage.style.position = 'relative';
        errorMessage.style.animation = 'slideIn 0.3s ease-out forwards';
        
        // Add message text
        errorMessage.innerHTML = `
            <div style="margin-right: 20px;">${message}</div>
            <button style="position: absolute; top: 5px; right: 5px; background: none; border: none; cursor: pointer; font-size: 16px; color: #721c24;">×</button>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            </style>
        `;
        
        // Add close button functionality
        const closeButton = errorMessage.querySelector('button');
        closeButton.addEventListener('click', function() {
            errorMessage.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                errorContainer.removeChild(errorMessage);
                
                // Remove container if empty
                if (errorContainer.children.length === 0) {
                    document.body.removeChild(errorContainer);
                }
            }, 300);
        });
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorContainer.contains(errorMessage)) {
                errorMessage.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (errorContainer.contains(errorMessage)) {
                        errorContainer.removeChild(errorMessage);
                        
                        // Remove container if empty
                        if (errorContainer.children.length === 0 && document.body.contains(errorContainer)) {
                            document.body.removeChild(errorContainer);
                        }
                    }
                }, 300);
            }
        }, 10000);
        
        // Add to container
        errorContainer.appendChild(errorMessage);
    }
    
    // Add diagnostic tools to window for debugging
    window.VisualizationDiagnostics = {
        // Check if Chart.js is loaded correctly
        checkChartJS: function() {
            if (typeof Chart === 'undefined') {
                console.error("Diagnostics: Chart.js is not loaded");
                return false;
            }
            
            console.log("Diagnostics: Chart.js is loaded, version:", Chart.version);
            return true;
        },
        
        // Check if all containers exist
        checkContainers: function() {
            const containers = [
                'institutional-ownership-container',
                'dilution-impact-container',
                'clinical-trial-timeline-container',
                'success-probability-container',
                'advanced-technical-chart-container',
                'volume-profile-container',
                'competitor-comparison-container'
            ];
            
            const results = {};
            
            containers.forEach(containerId => {
                const container = document.getElementById(containerId);
                results[containerId] = !!container;
                console.log(`Diagnostics: Container '${containerId}' ${container ? 'exists' : 'does not exist'}`);
            });
            
            return results;
        },
        
        // Check if all scripts are loaded
        checkScripts: function() {
            const scripts = [
                'institutional_ownership_tracker.js',
                'dilution_impact_calculator.js',
                'clinical_trial_timeline.js',
                'success_probability_calculator.js',
                'advanced_technical_chart.js',
                'volume_profile_analysis.js',
                'competitor_comparison_tool.js'
            ];
            
            const results = {};
            
            scripts.forEach(scriptName => {
                const scriptElements = Array.from(document.getElementsByTagName('script'));
                const scriptLoaded = scriptElements.some(script => script.src.includes(scriptName));
                results[scriptName] = scriptLoaded;
                console.log(`Diagnostics: Script '${scriptName}' ${scriptLoaded ? 'is loaded' : 'is not loaded'}`);
            });
            
            return results;
        },
        
        // Run all diagnostics
        runAll: function() {
            console.group("Visualization Diagnostics");
            
            const chartJSLoaded = this.checkChartJS();
            const containerResults = this.checkContainers();
            const scriptResults = this.checkScripts();
            
            // Check active charts
            const activeCharts = ChartRegistry.getAll();
            console.log(`Diagnostics: ${activeCharts.length} active charts registered`);
            activeCharts.forEach(chart => {
                console.log(`- Chart '${chart.id}' (${chart.component}), created at ${chart.createdAt}`);
            });
            
            // Check errors
            const errors = VisualizationErrorLogger.getAllErrors();
            console.log(`Diagnostics: ${errors.length} errors logged`);
            if (errors.length > 0) {
                VisualizationErrorLogger.showErrorSummary();
            }
            
            console.groupEnd();
            
            return {
                chartJSLoaded,
                containers: containerResults,
                scripts: scriptResults,
                activeCharts: activeCharts.length,
                errors: errors.length
            };
        }
    };
    
    console.log("Error Handler: Visualization error handling system initialized");
});
