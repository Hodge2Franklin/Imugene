// Update the HTML file to include all the new JavaScript files
document.addEventListener('DOMContentLoaded', function() {
    // Load all visualization scripts
    loadScript('/graphs/output/institutional_ownership_tracker.js');
    loadScript('/graphs/output/dilution_impact_calculator.js');
    loadScript('/graphs/output/clinical_trial_timeline.js');
    loadScript('/graphs/output/success_probability_calculator.js');
    loadScript('/graphs/output/advanced_technical_chart.js');
    loadScript('/graphs/output/volume_profile_analysis.js');
    loadScript('/graphs/output/competitor_comparison_tool.js');
    
    // Function to dynamically load a script
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    }
});
