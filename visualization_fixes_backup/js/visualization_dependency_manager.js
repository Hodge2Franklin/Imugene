// Comprehensive dependency management for all visualizations
document.addEventListener('DOMContentLoaded', function() {
    console.log("Dependency Manager: Initializing");
    
    // Check if Chart.js is already loaded
    if (typeof Chart === 'undefined') {
        console.log("Dependency Manager: Chart.js not found, loading it now");
        loadChartJS();
    } else {
        console.log("Dependency Manager: Chart.js already loaded, version:", Chart.version);
        initializeVisualizations();
    }
    
    // Function to load Chart.js
    function loadChartJS() {
        console.log("Dependency Manager: Loading Chart.js");
        
        // Create script element for Chart.js
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
        chartScript.integrity = 'sha256-+8RZJua0aEWg+QVVKg4LEzEEm/8RFez5Tb4JBNiV5xA=';
        chartScript.crossOrigin = 'anonymous';
        
        // Add load event listener
        chartScript.addEventListener('load', function() {
            console.log("Dependency Manager: Chart.js loaded successfully, version:", Chart.version);
            
            // Load additional Chart.js plugins
            loadChartPlugins();
        });
        
        // Add error event listener
        chartScript.addEventListener('error', function() {
            console.error("Dependency Manager: Failed to load Chart.js");
            showErrorMessage("Failed to load Chart.js library. Please check your internet connection and try again.");
        });
        
        // Append script to document
        document.head.appendChild(chartScript);
    }
    
    // Function to load Chart.js plugins
    function loadChartPlugins() {
        console.log("Dependency Manager: Loading Chart.js plugins");
        
        // Create script element for Chart.js Adapter
        const adapterScript = document.createElement('script');
        adapterScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@2.0.0/dist/chartjs-adapter-date-fns.bundle.min.js';
        
        // Add load event listener
        adapterScript.addEventListener('load', function() {
            console.log("Dependency Manager: Chart.js date adapter loaded successfully");
            
            // Initialize visualizations after all dependencies are loaded
            initializeVisualizations();
        });
        
        // Add error event listener
        adapterScript.addEventListener('error', function() {
            console.error("Dependency Manager: Failed to load Chart.js date adapter");
            // Continue anyway, as this is not critical
            initializeVisualizations();
        });
        
        // Append script to document
        document.head.appendChild(adapterScript);
    }
    
    // Function to initialize visualizations
    function initializeVisualizations() {
        console.log("Dependency Manager: Initializing visualizations");
        
        // Set default Chart.js options for consistent styling
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
            Chart.defaults.font.size = 12;
            Chart.defaults.color = '#666';
            Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            Chart.defaults.plugins.legend.labels.usePointStyle = true;
            
            console.log("Dependency Manager: Chart.js default options set");
        }
        
        // Load visualization scripts
        loadVisualizationScripts();
    }
    
    // Function to load visualization scripts
    function loadVisualizationScripts() {
        console.log("Dependency Manager: Loading visualization scripts");
        
        // List of visualization scripts to load
        const scripts = [
            'graphs/output/institutional_ownership_tracker.js',
            'graphs/output/dilution_impact_calculator.js',
            'graphs/output/clinical_trial_timeline.js',
            'graphs/output/success_probability_calculator.js',
            'graphs/output/advanced_technical_chart.js',
            'graphs/output/volume_profile_analysis.js',
            'graphs/output/competitor_comparison_tool.js'
        ];
        
        // Track loaded scripts
        let loadedScripts = 0;
        let failedScripts = 0;
        
        // Load each script
        scripts.forEach(function(scriptPath) {
            const scriptName = scriptPath.split('/').pop().replace('.js', '');
            
            // Check if the corresponding container exists on the page
            const containerId = scriptName.replace(/_/g, '-') + '-container';
            if (!document.getElementById(containerId)) {
                console.log(`Dependency Manager: Container for ${scriptName} not found, skipping script`);
                loadedScripts++;
                checkAllLoaded();
                return;
            }
            
            console.log(`Dependency Manager: Loading ${scriptName}`);
            
            // Create script element
            const script = document.createElement('script');
            script.src = scriptPath;
            
            // Add load event listener
            script.addEventListener('load', function() {
                console.log(`Dependency Manager: ${scriptName} loaded successfully`);
                loadedScripts++;
                checkAllLoaded();
            });
            
            // Add error event listener
            script.addEventListener('error', function() {
                console.error(`Dependency Manager: Failed to load ${scriptName}`);
                failedScripts++;
                loadedScripts++;
                
                // Show error message in the container
                const container = document.getElementById(containerId);
                if (container) {
                    showComponentError(container, `Failed to load ${scriptName.replace(/_/g, ' ')} visualization.`);
                }
                
                checkAllLoaded();
            });
            
            // Append script to document
            document.body.appendChild(script);
        });
        
        // Function to check if all scripts are loaded
        function checkAllLoaded() {
            if (loadedScripts === scripts.length) {
                console.log(`Dependency Manager: All scripts processed. ${loadedScripts - failedScripts} loaded, ${failedScripts} failed.`);
                
                // Remove loading indicators
                const loadingIndicators = document.querySelectorAll('.visualization-loading');
                loadingIndicators.forEach(function(indicator) {
                    indicator.style.display = 'none';
                });
            }
        }
    }
    
    // Function to show error message
    function showErrorMessage(message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.padding = '20px';
        errorDiv.style.margin = '20px 0';
        errorDiv.style.backgroundColor = '#f8d7da';
        errorDiv.style.color = '#721c24';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.border = '1px solid #f5c6cb';
        errorDiv.style.textAlign = 'center';
        errorDiv.innerHTML = `
            <h3 style="margin-top: 0;">Error</h3>
            <p>${message}</p>
            <p>Please try refreshing the page. If the problem persists, contact support.</p>
        `;
        
        // Insert at the top of the body
        document.body.insertBefore(errorDiv, document.body.firstChild);
    }
    
    // Function to show component-specific error
    function showComponentError(container, message) {
        // Clear container
        container.innerHTML = '';
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'component-error';
        errorDiv.style.padding = '20px';
        errorDiv.style.backgroundColor = '#f8d7da';
        errorDiv.style.color = '#721c24';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.border = '1px solid #f5c6cb';
        errorDiv.style.textAlign = 'center';
        errorDiv.innerHTML = `
            <h4 style="margin-top: 0;">Visualization Error</h4>
            <p>${message}</p>
            <p>Please try refreshing the page.</p>
        `;
        
        // Append to container
        container.appendChild(errorDiv);
    }
    
    // Add loading indicators to all visualization containers
    const containers = document.querySelectorAll('[id$="-container"]');
    containers.forEach(function(container) {
        // Skip if it's not a visualization container
        if (!container.id.match(/^(institutional-ownership|dilution-impact|clinical-trial-timeline|success-probability|advanced-technical-chart|volume-profile|competitor-comparison)-container$/)) {
            return;
        }
        
        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'visualization-loading';
        loadingIndicator.style.padding = '20px';
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
        
        // Append to container
        container.appendChild(loadingIndicator);
    });
});
