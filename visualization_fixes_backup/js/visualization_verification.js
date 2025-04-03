// Visualization Rendering Verification
// This script verifies that all visualizations render correctly and provides detailed diagnostics

document.addEventListener('DOMContentLoaded', function() {
    console.log("Visualization Rendering Verification: Initializing");
    
    // Define all visualization containers to verify
    const visualizationContainers = [
        'cash-flow-projection-container',
        'institutional-ownership-container',
        'dilution-impact-container',
        'clinical-trial-timeline-container',
        'success-probability-container',
        'advanced-technical-chart-container',
        'volume-profile-container',
        'competitor-comparison-container'
    ];
    
    // Create verification status panel
    createVerificationPanel();
    
    // Start verification process after a delay to allow other scripts to initialize
    setTimeout(verifyAllVisualizations, 2000);
    
    // Function to create verification status panel
    function createVerificationPanel() {
        console.log("Visualization Rendering Verification: Creating verification panel");
        
        // Create panel container
        const panel = document.createElement('div');
        panel.id = 'visualization-verification-panel';
        panel.style.position = 'fixed';
        panel.style.bottom = '20px';
        panel.style.right = '20px';
        panel.style.width = '300px';
        panel.style.maxHeight = '400px';
        panel.style.overflowY = 'auto';
        panel.style.backgroundColor = '#f8f9fa';
        panel.style.border = '1px solid #ddd';
        panel.style.borderRadius = '4px';
        panel.style.padding = '15px';
        panel.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        panel.style.zIndex = '9999';
        panel.style.display = 'none'; // Hidden by default
        
        // Add panel header
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '10px';
        
        const title = document.createElement('h4');
        title.textContent = 'Visualization Status';
        title.style.margin = '0';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            panel.style.display = 'none';
        };
        
        header.appendChild(title);
        header.appendChild(closeButton);
        panel.appendChild(header);
        
        // Add status list
        const statusList = document.createElement('ul');
        statusList.id = 'visualization-status-list';
        statusList.style.listStyle = 'none';
        statusList.style.padding = '0';
        statusList.style.margin = '0';
        
        // Add placeholder items for each visualization
        visualizationContainers.forEach(containerId => {
            const item = document.createElement('li');
            item.id = `status-${containerId}`;
            item.style.padding = '8px 0';
            item.style.borderBottom = '1px solid #eee';
            
            const name = containerId.replace(/-container$/, '').replace(/-/g, ' ');
            item.innerHTML = `<span style="font-weight: bold; text-transform: capitalize;">${name}</span>: <span class="status">Pending...</span>`;
            
            statusList.appendChild(item);
        });
        
        panel.appendChild(statusList);
        
        // Add action buttons
        const actions = document.createElement('div');
        actions.style.marginTop = '15px';
        actions.style.display = 'flex';
        actions.style.justifyContent = 'space-between';
        
        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Refresh All';
        refreshButton.style.padding = '8px 12px';
        refreshButton.style.backgroundColor = '#4CAF50';
        refreshButton.style.color = 'white';
        refreshButton.style.border = 'none';
        refreshButton.style.borderRadius = '4px';
        refreshButton.style.cursor = 'pointer';
        refreshButton.onclick = function() {
            verifyAllVisualizations();
        };
        
        const fallbackButton = document.createElement('button');
        fallbackButton.textContent = 'Show Fallbacks';
        fallbackButton.style.padding = '8px 12px';
        fallbackButton.style.backgroundColor = '#2196F3';
        fallbackButton.style.color = 'white';
        fallbackButton.style.border = 'none';
        fallbackButton.style.borderRadius = '4px';
        fallbackButton.style.cursor = 'pointer';
        fallbackButton.onclick = function() {
            if (typeof window.triggerFallbacks === 'function') {
                window.triggerFallbacks();
                updateAllStatuses('Using Fallback');
            }
        };
        
        actions.appendChild(refreshButton);
        actions.appendChild(fallbackButton);
        panel.appendChild(actions);
        
        // Add toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'toggle-verification-panel';
        toggleButton.textContent = 'Show Visualization Status';
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '20px';
        toggleButton.style.right = '20px';
        toggleButton.style.padding = '8px 12px';
        toggleButton.style.backgroundColor = '#333';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '4px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.zIndex = '9998';
        toggleButton.onclick = function() {
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                toggleButton.style.display = 'none';
            }
        };
        
        // Add to document
        document.body.appendChild(panel);
        document.body.appendChild(toggleButton);
        
        console.log("Visualization Rendering Verification: Verification panel created");
    }
    
    // Function to verify all visualizations
    function verifyAllVisualizations() {
        console.log("Visualization Rendering Verification: Starting verification of all visualizations");
        
        // Show verification panel
        const panel = document.getElementById('visualization-verification-panel');
        if (panel) {
            panel.style.display = 'block';
            
            // Hide toggle button
            const toggleButton = document.getElementById('toggle-verification-panel');
            if (toggleButton) {
                toggleButton.style.display = 'none';
            }
        }
        
        // Reset all statuses to "Checking..."
        updateAllStatuses('Checking...');
        
        // Verify each visualization
        visualizationContainers.forEach(containerId => {
            setTimeout(() => {
                verifyVisualization(containerId);
            }, 500); // Stagger verification to avoid overwhelming the browser
        });
    }
    
    // Function to update all status indicators
    function updateAllStatuses(status) {
        visualizationContainers.forEach(containerId => {
            updateStatus(containerId, status);
        });
    }
    
    // Function to verify a single visualization
    function verifyVisualization(containerId) {
        console.log(`Visualization Rendering Verification: Verifying ${containerId}`);
        
        // Get container using standardized naming if available
        const container = typeof window.getVisualizationContainer === 'function' 
            ? window.getVisualizationContainer(containerId)
            : document.getElementById(containerId);
        
        if (!container) {
            updateStatus(containerId, 'Container Not Found', 'error');
            console.error(`Visualization Rendering Verification: Container ${containerId} not found`);
            return;
        }
        
        // Check if container has any content
        if (container.children.length === 0) {
            updateStatus(containerId, 'Empty Container', 'error');
            console.error(`Visualization Rendering Verification: Container ${containerId} is empty`);
            return;
        }
        
        // Check for canvas element
        const canvas = container.querySelector('canvas');
        if (!canvas) {
            updateStatus(containerId, 'No Canvas Element', 'error');
            console.error(`Visualization Rendering Verification: No canvas element found in ${containerId}`);
            return;
        }
        
        // Check canvas dimensions
        if (canvas.width === 0 || canvas.height === 0) {
            updateStatus(containerId, 'Zero-sized Canvas', 'error');
            console.error(`Visualization Rendering Verification: Canvas in ${containerId} has zero width or height`);
            return;
        }
        
        // Check if canvas has content (non-scientific approach, but works in most cases)
        try {
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Check if all pixels are transparent (alpha = 0)
            let allTransparent = true;
            for (let i = 3; i < data.length; i += 4) {
                if (data[i] !== 0) {
                    allTransparent = false;
                    break;
                }
            }
            
            if (allTransparent) {
                updateStatus(containerId, 'Empty Canvas', 'warning');
                console.warn(`Visualization Rendering Verification: Canvas in ${containerId} appears to be empty`);
                return;
            }
        } catch (error) {
            // CORS or other security error when trying to read canvas data
            console.warn(`Visualization Rendering Verification: Could not check canvas content for ${containerId}:`, error);
        }
        
        // Check for error messages in container
        const errorMessages = container.querySelectorAll('.error-message, .chart-error');
        if (errorMessages.length > 0) {
            updateStatus(containerId, 'Error Detected', 'error');
            console.error(`Visualization Rendering Verification: Error message found in ${containerId}`);
            return;
        }
        
        // Check for loading indicators that haven't been removed
        const loadingIndicators = container.querySelectorAll('.loading-indicator, .chart-loading');
        if (loadingIndicators.length > 0) {
            updateStatus(containerId, 'Still Loading', 'warning');
            console.warn(`Visualization Rendering Verification: Loading indicator still present in ${containerId}`);
            return;
        }
        
        // If we got here, the visualization appears to be rendered correctly
        updateStatus(containerId, 'Rendered Successfully', 'success');
        console.log(`Visualization Rendering Verification: ${containerId} rendered successfully`);
    }
    
    // Function to update status for a visualization
    function updateStatus(containerId, status, type = 'info') {
        const statusItem = document.getElementById(`status-${containerId}`);
        if (!statusItem) return;
        
        const statusSpan = statusItem.querySelector('.status');
        if (!statusSpan) return;
        
        // Set status text
        statusSpan.textContent = status;
        
        // Set status color based on type
        switch (type) {
            case 'success':
                statusSpan.style.color = '#4CAF50';
                break;
            case 'error':
                statusSpan.style.color = '#F44336';
                break;
            case 'warning':
                statusSpan.style.color = '#FF9800';
                break;
            default:
                statusSpan.style.color = '#2196F3';
        }
    }
    
    // Add verification API to window object
    window.visualizationVerifier = {
        verifyAll: verifyAllVisualizations,
        verify: verifyVisualization,
        showPanel: function() {
            const panel = document.getElementById('visualization-verification-panel');
            if (panel) {
                panel.style.display = 'block';
                
                // Hide toggle button
                const toggleButton = document.getElementById('toggle-verification-panel');
                if (toggleButton) {
                    toggleButton.style.display = 'none';
                }
            }
        },
        hidePanel: function() {
            const panel = document.getElementById('visualization-verification-panel');
            if (panel) {
                panel.style.display = 'none';
                
                // Show toggle button
                const toggleButton = document.getElementById('toggle-verification-panel');
                if (toggleButton) {
                    toggleButton.style.display = 'block';
                }
            }
        },
        getStatus: function() {
            const result = {};
            visualizationContainers.forEach(containerId => {
                const statusItem = document.getElementById(`status-${containerId}`);
                if (statusItem) {
                    const statusSpan = statusItem.querySelector('.status');
                    if (statusSpan) {
                        result[containerId] = statusSpan.textContent;
                    }
                }
            });
            return result;
        }
    };
    
    console.log("Visualization Rendering Verification: Initialization complete");
});
