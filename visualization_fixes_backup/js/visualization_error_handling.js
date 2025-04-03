// Error handling and logging enhancements for visualization scripts

// Global error handler for visualization scripts
window.addEventListener('error', function(event) {
    console.error('Visualization Error:', event.message, 'at', event.filename, 'line', event.lineno);
    
    // Find the container element related to the error if possible
    const errorSource = event.filename.split('/').pop();
    let errorContainer = null;
    
    // Map error sources to potential container IDs
    if (errorSource.includes('institutional_ownership')) {
        errorContainer = document.getElementById('institutional-ownership-chart');
    } else if (errorSource.includes('dilution_impact')) {
        errorContainer = document.getElementById('dilution-calculator-chart');
    } else if (errorSource.includes('clinical_trial')) {
        errorContainer = document.getElementById('clinical-timeline-chart');
    } else if (errorSource.includes('success_probability')) {
        errorContainer = document.getElementById('success-probability-chart');
    } else if (errorSource.includes('technical_chart')) {
        errorContainer = document.getElementById('technical-chart');
    } else if (errorSource.includes('volume_profile')) {
        errorContainer = document.getElementById('volume-profile-chart');
    } else if (errorSource.includes('competitor_comparison')) {
        errorContainer = document.getElementById('competitor-comparison-chart');
    }
    
    // Display error message in the container if found
    if (errorContainer) {
        errorContainer.innerHTML = `
            <div class="visualization-error">
                <i class="fas fa-exclamation-triangle" style="color: #e74c3c; font-size: 24px; margin-bottom: 10px;"></i>
                <p>Error loading visualization: ${event.message}</p>
                <p>Please try refreshing the page or contact support if the issue persists.</p>
            </div>
        `;
        
        // Style the error message
        const errorStyle = document.createElement('style');
        errorStyle.textContent = `
            .visualization-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 300px;
                background-color: #f8f9fa;
                border-radius: 8px;
                color: #333;
                text-align: center;
                padding: 20px;
                border: 1px solid #e74c3c;
            }
        `;
        document.head.appendChild(errorStyle);
    }
    
    // Log to console for debugging
    console.debug('Error details:', {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error,
        container: errorContainer ? errorContainer.id : 'unknown'
    });
});

// Add visualization loading status indicators
document.addEventListener('DOMContentLoaded', function() {
    // Find all chart containers
    const chartContainers = document.querySelectorAll('.chart-container');
    
    // Add loading indicators to each container
    chartContainers.forEach(container => {
        // Skip the cash flow projection which is already working
        if (container.id === 'cash-flow-projection') return;
        
        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = `
            <div class="spinner"></div>
            <p>Loading visualization...</p>
        `;
        container.appendChild(loadingIndicator);
    });
    
    // Add styles for loading indicators
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            background-color: #f8f9fa;
            border-radius: 8px;
            color: #666;
            text-align: center;
            padding: 20px;
        }
        
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid #3498db;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // Set timeout to remove loading indicators after visualization scripts have had time to load
    setTimeout(function() {
        document.querySelectorAll('.loading-indicator').forEach(indicator => {
            // Only remove if the parent container has other content
            if (indicator.parentNode.children.length > 1) {
                indicator.remove();
            } else {
                // If no content was added, show an error instead
                indicator.innerHTML = `
                    <i class="fas fa-exclamation-triangle" style="color: #e74c3c; font-size: 24px; margin-bottom: 10px;"></i>
                    <p>Visualization could not be loaded</p>
                    <p>Please try refreshing the page or contact support if the issue persists.</p>
                `;
                indicator.style.border = '1px solid #e74c3c';
            }
        });
    }, 10000); // 10 seconds timeout
});

console.log('Error handling and loading indicators initialized');
