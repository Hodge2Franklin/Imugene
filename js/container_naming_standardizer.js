// Container Naming Standardizer
// This script standardizes container naming conventions across all visualizations

document.addEventListener('DOMContentLoaded', function() {
    console.log("Container Naming Standardizer: Initializing");
    
    // Define standard container naming conventions
    const containerMappings = {
        // Original ID → Standard ID
        'institutional-ownership-chart': 'institutional-ownership-container',
        'dilution-calculator-chart': 'dilution-impact-container',
        'clinical-timeline-chart': 'clinical-trial-timeline-container',
        'success-probability-chart': 'success-probability-container',
        'technical-chart': 'advanced-technical-chart-container',
        'volume-profile-chart': 'volume-profile-container',
        'competitor-comparison-chart': 'competitor-comparison-container',
        'cash-flow-projection': 'cash-flow-projection-container'
    };
    
    // Standardize container IDs
    standardizeContainerIds();
    
    // Create adapter containers for backward compatibility
    createAdapterContainers();
    
    // Function to standardize container IDs
    function standardizeContainerIds() {
        console.log("Container Naming Standardizer: Standardizing container IDs");
        
        // Loop through container mappings
        Object.entries(containerMappings).forEach(([originalId, standardId]) => {
            const container = document.getElementById(originalId);
            if (container) {
                // Add data attribute with original ID for reference
                container.dataset.originalId = originalId;
                
                // Update container ID to standard ID
                container.id = standardId;
                
                console.log(`Container Naming Standardizer: Renamed container from ${originalId} to ${standardId}`);
            } else {
                console.log(`Container Naming Standardizer: Container with ID ${originalId} not found`);
            }
        });
    }
    
    // Function to create adapter containers for backward compatibility
    function createAdapterContainers() {
        console.log("Container Naming Standardizer: Creating adapter containers");
        
        // Loop through container mappings
        Object.entries(containerMappings).forEach(([originalId, standardId]) => {
            const standardContainer = document.getElementById(standardId);
            if (standardContainer) {
                // Create adapter container with original ID
                const adapterContainer = document.createElement('div');
                adapterContainer.id = originalId;
                adapterContainer.className = 'adapter-container';
                adapterContainer.style.width = '100%';
                adapterContainer.style.height = '100%';
                
                // Add data attribute to indicate this is an adapter
                adapterContainer.dataset.isAdapter = 'true';
                adapterContainer.dataset.forContainer = standardId;
                
                // Insert adapter container before standard container
                standardContainer.parentNode.insertBefore(adapterContainer, standardContainer);
                
                // Move standard container inside adapter container
                adapterContainer.appendChild(standardContainer);
                
                console.log(`Container Naming Standardizer: Created adapter container ${originalId} for ${standardId}`);
            }
        });
    }
    
    // Function to get container by either original or standard ID
    window.getVisualizationContainer = function(containerId) {
        // Try to get container directly
        let container = document.getElementById(containerId);
        
        if (!container) {
            // If not found, check if it's a standard ID
            const originalId = Object.entries(containerMappings).find(([_, standardId]) => standardId === containerId)?.[0];
            if (originalId) {
                container = document.getElementById(originalId);
            }
            
            // If still not found, check if it's an original ID
            if (!container && containerMappings[containerId]) {
                container = document.getElementById(containerMappings[containerId]);
            }
        }
        
        return container;
    };
    
    // Add container ID resolver to window object
    window.resolveContainerId = function(containerId) {
        // If it's a standard ID, return it
        if (Object.values(containerMappings).includes(containerId)) {
            return containerId;
        }
        
        // If it's an original ID, return the standard ID
        if (containerMappings[containerId]) {
            return containerMappings[containerId];
        }
        
        // If it's neither, return the original ID
        return containerId;
    };
    
    // Add container validation to window object
    window.validateContainer = function(containerId) {
        const container = window.getVisualizationContainer(containerId);
        
        if (!container) {
            console.error(`Container Naming Standardizer: Container with ID ${containerId} not found`);
            return false;
        }
        
        return true;
    };
    
    // Patch Chart.js to work with standardized containers
    patchChartJsForStandardizedContainers();
    
    // Function to patch Chart.js to work with standardized containers
    function patchChartJsForStandardizedContainers() {
        if (typeof Chart === 'undefined') {
            console.log("Container Naming Standardizer: Chart.js not found, skipping patch");
            return;
        }
        
        console.log("Container Naming Standardizer: Patching Chart.js for standardized containers");
        
        // Store reference to original Chart constructor
        const OriginalChart = window.Chart;
        
        // Create patched Chart constructor
        window.Chart = function(ctx, config) {
            // If ctx is a string (container ID), resolve it
            if (typeof ctx === 'string') {
                const containerId = window.resolveContainerId(ctx);
                const container = window.getVisualizationContainer(containerId);
                
                if (container) {
                    // Get canvas element inside container
                    let canvas = container.querySelector('canvas');
                    
                    // If canvas doesn't exist, create it
                    if (!canvas) {
                        canvas = document.createElement('canvas');
                        canvas.id = `${containerId}-canvas`;
                        container.appendChild(canvas);
                    }
                    
                    // Get 2D context from canvas
                    ctx = canvas.getContext('2d');
                }
            }
            
            // Call original Chart constructor
            return new OriginalChart(ctx, config);
        };
        
        // Copy all properties from original Chart
        for (const prop in OriginalChart) {
            if (OriginalChart.hasOwnProperty(prop)) {
                window.Chart[prop] = OriginalChart[prop];
            }
        }
    }
    
    // Monitor for dynamically added containers
    observeContainerAdditions();
    
    // Function to observe container additions
    function observeContainerAdditions() {
        // Create mutation observer
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Check for added nodes
                mutation.addedNodes.forEach(function(node) {
                    // Check if node is an element
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if node has an ID
                        if (node.id) {
                            // Check if ID is in container mappings
                            if (containerMappings[node.id]) {
                                console.log(`Container Naming Standardizer: Detected dynamically added container with ID ${node.id}`);
                                
                                // Standardize container ID
                                node.dataset.originalId = node.id;
                                node.id = containerMappings[node.id];
                                
                                console.log(`Container Naming Standardizer: Renamed container to ${node.id}`);
                            }
                        }
                        
                        // Check for child elements with IDs
                        const childrenWithIds = node.querySelectorAll('[id]');
                        childrenWithIds.forEach(function(child) {
                            // Check if ID is in container mappings
                            if (containerMappings[child.id]) {
                                console.log(`Container Naming Standardizer: Detected dynamically added container with ID ${child.id}`);
                                
                                // Standardize container ID
                                child.dataset.originalId = child.id;
                                child.id = containerMappings[child.id];
                                
                                console.log(`Container Naming Standardizer: Renamed container to ${child.id}`);
                            }
                        });
                    }
                });
            });
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log("Container Naming Standardizer: Monitoring for dynamically added containers");
    }
    
    console.log("Container Naming Standardizer: Initialization complete");
});
