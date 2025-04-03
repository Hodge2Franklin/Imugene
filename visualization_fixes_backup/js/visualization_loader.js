// Visualization Loader Script
// This script loads all the visualization JavaScript files for the interactive visualizations page

document.addEventListener('DOMContentLoaded', function() {
    console.log("Visualization loader initialized");
    
    // Function to dynamically load JavaScript files
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = callback || function() {};
        document.body.appendChild(script);
    }
    
    // Load all visualization scripts
    loadScript('graphs/output/institutional_ownership_tracker.js', function() {
        console.log("Institutional Ownership Tracker loaded");
    });
    
    loadScript('graphs/output/dilution_impact_calculator.js', function() {
        console.log("Dilution Impact Calculator loaded");
    });
    
    loadScript('graphs/output/clinical_trial_timeline.js', function() {
        console.log("Clinical Trial Timeline loaded");
    });
    
    loadScript('graphs/output/success_probability_calculator.js', function() {
        console.log("Success Probability Calculator loaded");
    });
    
    loadScript('graphs/output/advanced_technical_chart.js', function() {
        console.log("Advanced Technical Chart loaded");
    });
    
    loadScript('graphs/output/volume_profile_analysis.js', function() {
        console.log("Volume Profile Analysis loaded");
    });
    
    loadScript('graphs/output/competitor_comparison_tool.js', function() {
        console.log("Competitor Comparison Tool loaded");
    });
});
