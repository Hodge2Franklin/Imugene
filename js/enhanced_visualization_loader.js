// Enhanced Visualization Loader Script
// This script loads all visualization JavaScript files and fixes container ID mismatches

document.addEventListener('DOMContentLoaded', function() {
    console.log("Enhanced visualization loader initialized");
    
    // Container ID mapping from what JS files expect to what exists in HTML
    const containerMapping = {
        'institutional-ownership-container': 'institutional-ownership-chart',
        'dilution-impact-container': 'dilution-calculator-chart',
        'clinical-trial-timeline-container': 'clinical-timeline-chart',
        'success-probability-container': 'success-probability-chart',
        'advanced-technical-chart-container': 'technical-chart',
        'volume-profile-container': 'volume-profile-chart',
        'competitor-comparison-container': 'competitor-comparison-chart'
    };
    
    // Create container adapters before loading visualization scripts
    createContainerAdapters(containerMapping);
    
    // Function to create adapter containers that the JS files expect
    function createContainerAdapters(mapping) {
        console.log("Creating container adapters");
        
        for (const [expectedId, actualId] of Object.entries(mapping)) {
            const actualElement = document.getElementById(actualId);
            
            if (actualElement && !document.getElementById(expectedId)) {
                console.log(`Creating adapter: ${expectedId} -> ${actualId}`);
                
                // Create a wrapper div with the ID that the JS file expects
                const adapterContainer = document.createElement('div');
                adapterContainer.id = expectedId;
                
                // Move the actual element's content inside the adapter
                const parent = actualElement.parentNode;
                parent.insertBefore(adapterContainer, actualElement);
                adapterContainer.appendChild(actualElement);
                
                // Style the adapter to maintain layout
                adapterContainer.style.width = '100%';
                adapterContainer.style.height = 'auto';
            }
        }
    }
    
    // Function to dynamically load JavaScript files
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = callback || function() {};
        document.body.appendChild(script);
    }
    
    // Load all visualization scripts with error handling
    function loadVisualizationScript(scriptPath, name) {
        loadScript(scriptPath, function() {
            console.log(`${name} loaded successfully`);
        });
    }
    
    // Load all visualization scripts
    loadVisualizationScript('graphs/output/institutional_ownership_tracker.js', 'Institutional Ownership Tracker');
    loadVisualizationScript('graphs/output/dilution_impact_calculator.js', 'Dilution Impact Calculator');
    loadVisualizationScript('graphs/output/clinical_trial_timeline.js', 'Clinical Trial Timeline');
    loadVisualizationScript('graphs/output/success_probability_calculator.js', 'Success Probability Calculator');
    loadVisualizationScript('graphs/output/advanced_technical_chart.js', 'Advanced Technical Chart');
    loadVisualizationScript('graphs/output/volume_profile_analysis.js', 'Volume Profile Analysis');
    loadVisualizationScript('graphs/output/competitor_comparison_tool.js', 'Competitor Comparison Tool');
});
