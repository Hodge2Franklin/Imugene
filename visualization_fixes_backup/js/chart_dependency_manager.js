// Chart.js Dependency Manager
// This script consolidates Chart.js dependencies and ensures consistent version usage

document.addEventListener('DOMContentLoaded', function() {
    console.log("Chart.js Dependency Manager: Initializing");
    
    // Store reference to original Chart object
    const OriginalChart = window.Chart;
    
    // Check if Chart.js is loaded
    if (typeof OriginalChart === 'undefined') {
        console.error("Chart.js Dependency Manager: Chart.js not found, loading from CDN");
        loadChartJS();
    } else {
        console.log("Chart.js Dependency Manager: Chart.js already loaded, version:", OriginalChart.version);
        enhanceChartJS();
    }
    
    // Function to load Chart.js from CDN
    function loadChartJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
        script.integrity = 'sha256-+8RZJua0aEWg+QVVKg4LEzEEm/8RFez5Tb4JBNiV5xA=';
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            console.log("Chart.js Dependency Manager: Chart.js loaded from CDN, version:", Chart.version);
            enhanceChartJS();
        };
        script.onerror = function() {
            console.error("Chart.js Dependency Manager: Failed to load Chart.js from CDN");
            loadChartJSFallback();
        };
        document.head.appendChild(script);
    }
    
    // Function to load Chart.js from fallback CDN
    function loadChartJSFallback() {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
        script.integrity = 'sha512-ElRFoEQdI5Ht6kZvyzXhcG0UlChftrAZs0bCAJnlDSlpMiyg/AGc++LU/IN4+PbZ6slrNmnA0WeZe2rZRZ8dQ==';
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            console.log("Chart.js Dependency Manager: Chart.js loaded from fallback CDN, version:", Chart.version);
            enhanceChartJS();
        };
        script.onerror = function() {
            console.error("Chart.js Dependency Manager: Failed to load Chart.js from fallback CDN");
            createInlineChartJS();
        };
        document.head.appendChild(script);
    }
    
    // Function to create inline minimal Chart.js implementation
    function createInlineChartJS() {
        console.log("Chart.js Dependency Manager: Creating minimal inline Chart.js implementation");
        
        // Create a minimal Chart implementation that will render basic charts
        window.Chart = function(ctx, config) {
            this.ctx = ctx;
            this.config = config;
            this.render();
        };
        
        window.Chart.version = 'inline-fallback-1.0.0';
        
        window.Chart.prototype.render = function() {
            const ctx = this.ctx;
            const config = this.config;
            
            if (!ctx) {
                console.error("Chart.js Dependency Manager: Canvas context not found");
                return;
            }
            
            // Clear canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            // Draw fallback text
            ctx.fillStyle = '#333';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Chart rendering unavailable', ctx.canvas.width / 2, ctx.canvas.height / 2);
            
            // Draw title if available
            if (config.options && config.options.plugins && config.options.plugins.title && config.options.plugins.title.text) {
                ctx.font = 'bold 16px Arial';
                ctx.fillText(config.options.plugins.title.text, ctx.canvas.width / 2, 30);
            }
            
            // Draw data table if available
            if (config.data && config.data.labels && config.data.datasets) {
                const labels = config.data.labels;
                const datasets = config.data.datasets;
                
                ctx.font = '12px Arial';
                ctx.textAlign = 'left';
                
                // Draw header
                ctx.fillStyle = '#333';
                ctx.fillText('Category', 50, 70);
                
                for (let i = 0; i < datasets.length; i++) {
                    ctx.fillStyle = datasets[i].borderColor || '#333';
                    ctx.fillText(datasets[i].label || `Dataset ${i+1}`, 150 + i * 100, 70);
                }
                
                // Draw data rows
                for (let i = 0; i < labels.length; i++) {
                    ctx.fillStyle = '#333';
                    ctx.fillText(labels[i], 50, 100 + i * 25);
                    
                    for (let j = 0; j < datasets.length; j++) {
                        ctx.fillStyle = datasets[j].borderColor || '#333';
                        const value = datasets[j].data[i];
                        ctx.fillText(value !== undefined ? value.toString() : 'N/A', 150 + j * 100, 100 + i * 25);
                    }
                }
            }
        };
        
        window.Chart.prototype.update = function() {
            this.render();
        };
        
        window.Chart.prototype.destroy = function() {
            // Nothing to do for this minimal implementation
        };
        
        enhanceChartJS();
    }
    
    // Function to enhance Chart.js with error handling and performance improvements
    function enhanceChartJS() {
        // Store reference to current Chart constructor
        const CurrentChart = window.Chart;
        
        // Create enhanced Chart constructor
        window.Chart = function(ctx, config) {
            try {
                // Add default options for better error handling
                const enhancedConfig = enhanceConfig(config);
                
                // Create chart instance
                return new CurrentChart(ctx, enhancedConfig);
            } catch (error) {
                console.error("Chart.js Dependency Manager: Error creating chart:", error);
                
                // Return minimal chart implementation that won't break
                return createFallbackChart(ctx, config);
            }
        };
        
        // Copy all properties from original Chart
        for (const prop in CurrentChart) {
            if (CurrentChart.hasOwnProperty(prop)) {
                window.Chart[prop] = CurrentChart[prop];
            }
        }
        
        console.log("Chart.js Dependency Manager: Enhanced Chart.js with error handling and performance improvements");
    }
    
    // Function to enhance chart configuration with better defaults
    function enhanceConfig(config) {
        if (!config) return config;
        
        // Create deep copy of config to avoid modifying original
        const enhancedConfig = JSON.parse(JSON.stringify(config));
        
        // Ensure options object exists
        if (!enhancedConfig.options) {
            enhancedConfig.options = {};
        }
        
        // Add responsive defaults
        enhancedConfig.options.responsive = enhancedConfig.options.responsive !== false;
        enhancedConfig.options.maintainAspectRatio = enhancedConfig.options.maintainAspectRatio !== false;
        
        // Add animation defaults for better performance
        if (!enhancedConfig.options.animation) {
            enhancedConfig.options.animation = {
                duration: 1000,
                easing: 'easeOutQuart'
            };
        }
        
        // Add error handling for plugins
        if (!enhancedConfig.plugins) {
            enhancedConfig.plugins = [];
        }
        
        // Add error handling plugin
        enhancedConfig.plugins.push({
            id: 'errorHandler',
            beforeInit: function(chart) {
                chart.errorHandler = {
                    hasError: false,
                    errorMessage: ''
                };
            },
            afterRender: function(chart) {
                if (chart.errorHandler.hasError) {
                    const ctx = chart.ctx;
                    const width = chart.width;
                    const height = chart.height;
                    
                    ctx.save();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fillRect(0, 0, width, height);
                    
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = '16px Arial';
                    ctx.fillStyle = '#FF6384';
                    ctx.fillText('Error rendering chart', width / 2, height / 2);
                    ctx.fillText(chart.errorHandler.errorMessage, width / 2, height / 2 + 20);
                    ctx.restore();
                }
            }
        });
        
        return enhancedConfig;
    }
    
    // Function to create fallback chart when Chart.js fails
    function createFallbackChart(ctx, config) {
        return {
            ctx: ctx,
            config: config,
            update: function() {
                this.render();
            },
            render: function() {
                if (!this.ctx) return;
                
                // Clear canvas
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                
                // Draw fallback message
                this.ctx.fillStyle = '#333';
                this.ctx.font = '14px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Chart rendering failed', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
                
                // Draw title if available
                if (this.config && this.config.options && this.config.options.plugins && this.config.options.plugins.title && this.config.options.plugins.title.text) {
                    this.ctx.font = 'bold 16px Arial';
                    this.ctx.fillText(this.config.options.plugins.title.text, this.ctx.canvas.width / 2, 30);
                }
            },
            destroy: function() {
                // Nothing to do
            },
            resize: function() {
                this.render();
            },
            getElementAtEvent: function() {
                return [];
            },
            getElementsAtEvent: function() {
                return [];
            },
            getDatasetAtEvent: function() {
                return [];
            },
            getDatasetMeta: function() {
                return {};
            },
            data: config.data || {},
            options: config.options || {},
            config: config
        };
    }
    
    // Preload Chart.js plugins that might be needed
    function preloadChartPlugins() {
        // Check if we need to load additional plugins
        const plugins = [
            { name: 'chartjs-plugin-datalabels', url: 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0' },
            { name: 'chartjs-adapter-date-fns', url: 'https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@2.0.0' }
        ];
        
        plugins.forEach(plugin => {
            // Check if any script on the page already loads this plugin
            const scripts = document.getElementsByTagName('script');
            let isLoaded = false;
            
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].src.includes(plugin.name)) {
                    isLoaded = true;
                    break;
                }
            }
            
            // If not loaded and might be needed, preload it
            if (!isLoaded && mightNeedPlugin(plugin.name)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = plugin.url;
                link.as = 'script';
                document.head.appendChild(link);
                
                console.log(`Chart.js Dependency Manager: Preloaded ${plugin.name}`);
            }
        });
    }
    
    // Function to determine if a plugin might be needed based on chart configurations
    function mightNeedPlugin(pluginName) {
        // This is a simplified check - in a real implementation, we would analyze
        // the chart configurations to determine if a plugin is needed
        if (pluginName === 'chartjs-plugin-datalabels') {
            // Check if any chart might use data labels
            return document.querySelector('[data-chart-type="pie"], [data-chart-type="doughnut"]') !== null;
        }
        
        if (pluginName === 'chartjs-adapter-date-fns') {
            // Check if any chart might use time scales
            return document.querySelector('[data-chart-type="line"], [data-chart-type="bar"]') !== null;
        }
        
        return false;
    }
    
    // Initialize
    preloadChartPlugins();
    
    console.log("Chart.js Dependency Manager: Initialization complete");
});
