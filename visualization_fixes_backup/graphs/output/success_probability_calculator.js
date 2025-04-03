// Fixed Success Probability Calculator Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('success-probability-container');
    if (!container) return;

    console.log("Success Probability Calculator: Container found, initializing");
    
    // Sample data for success probability calculator
    const probabilityData = {
        phases: {
            'Preclinical': { success: 0.35, next: 'Phase 1' },
            'Phase 1': { success: 0.65, next: 'Phase 2' },
            'Phase 2': { success: 0.40, next: 'Phase 3' },
            'Phase 3': { success: 0.60, next: 'Approval' },
            'Approval': { success: 0.85, next: 'Market' }
        },
        indications: {
            'Gastric Cancer': { modifier: -0.05, description: 'Historically difficult indication with lower success rates' },
            'Solid Tumors': { modifier: 0.00, description: 'Average success rates for oncology indications' },
            'NSCLC': { modifier: -0.03, description: 'Slightly below average success rates' },
            'Multiple Cancers': { modifier: -0.08, description: 'Complex indication with lower success rates' },
            'Breast Cancer': { modifier: 0.05, description: 'Well-studied indication with higher success rates' },
            'Colorectal Cancer': { modifier: -0.02, description: 'Slightly below average success rates' },
            'Melanoma': { modifier: 0.02, description: 'Slightly above average success rates' },
            'Pancreatic Cancer': { modifier: -0.10, description: 'Difficult indication with lower success rates' },
            'Ovarian Cancer': { modifier: -0.04, description: 'Below average success rates' },
            'Prostate Cancer': { modifier: 0.03, description: 'Above average success rates' }
        },
        platforms: {
            'Oncolytic Viruses': { modifier: -0.02, description: 'Emerging platform with some clinical validation' },
            'B-cell Immunotherapies': { modifier: 0.03, description: 'Well-established platform with multiple approvals' },
            'Checkpoint Inhibitors': { modifier: 0.05, description: 'Highly successful platform with multiple approvals' },
            'CAR-T': { modifier: 0.00, description: 'Established platform with some approvals' },
            'Cancer Vaccines': { modifier: -0.05, description: 'Historically challenging platform' },
            'ADCs': { modifier: 0.02, description: 'Growing platform with recent successes' },
            'Small Molecules': { modifier: 0.04, description: 'Traditional platform with high success rates' },
            'Monoclonal Antibodies': { modifier: 0.06, description: 'Very successful platform with many approvals' }
        }
    };

    // Create calculator container
    const calculatorContainer = document.createElement('div');
    calculatorContainer.className = 'calculator-container';
    calculatorContainer.style.display = 'flex';
    calculatorContainer.style.flexWrap = 'wrap';
    calculatorContainer.style.gap = '20px';
    container.appendChild(calculatorContainer);

    // Create inputs section
    const inputsSection = document.createElement('div');
    inputsSection.className = 'inputs-section';
    inputsSection.style.flex = '1';
    inputsSection.style.minWidth = '300px';
    calculatorContainer.appendChild(inputsSection);

    // Create results section
    const resultsSection = document.createElement('div');
    resultsSection.className = 'results-section';
    resultsSection.style.flex = '2';
    resultsSection.style.minWidth = '500px';
    calculatorContainer.appendChild(resultsSection);

    // Create chart container with canvas element
    const chartContainer = document.createElement('div');
    chartContainer.id = 'success-probability-chart-container';
    chartContainer.style.height = '400px';
    chartContainer.style.marginBottom = '20px';
    resultsSection.appendChild(chartContainer);
    
    // Create canvas element - THIS WAS MISSING IN THE ORIGINAL SCRIPT
    const canvas = document.createElement('canvas');
    canvas.id = 'success-probability-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    chartContainer.appendChild(canvas);

    // Create results table container
    const resultsTableContainer = document.createElement('div');
    resultsTableContainer.className = 'results-table-container';
    resultsSection.appendChild(resultsTableContainer);

    // Create input fields
    createInputFields();

    // Initialize chart
    let probabilityChart;

    // Function to create input fields
    function createInputFields() {
        // Create input group for trial details
        const trialDetailsGroup = document.createElement('div');
        trialDetailsGroup.className = 'input-group';
        trialDetailsGroup.innerHTML = `
            <h4>Trial Details</h4>
            <div class="input-field">
                <label>Drug Candidate:</label>
                <select id="drug-candidate">
                    <option value="HER-Vaxx">HER-Vaxx</option>
                    <option value="CF33-hNIS">CF33-hNIS (VAXINIA)</option>
                    <option value="PD1-Vaxx">PD1-Vaxx</option>
                    <option value="CHECKvacc">CHECKvacc</option>
                    <option value="CF33-CD19">CF33-CD19</option>
                </select>
            </div>
            <div class="input-field">
                <label>Current Phase:</label>
                <select id="current-phase">
                    <option value="Preclinical">Preclinical</option>
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                </select>
            </div>
            <div class="input-field">
                <label>Indication:</label>
                <select id="indication">
                    <option value="Gastric Cancer">Gastric Cancer</option>
                    <option value="Solid Tumors">Solid Tumors</option>
                    <option value="NSCLC">NSCLC</option>
                    <option value="Multiple Cancers">Multiple Cancers</option>
                    <option value="Breast Cancer">Breast Cancer</option>
                    <option value="Colorectal Cancer">Colorectal Cancer</option>
                    <option value="Melanoma">Melanoma</option>
                    <option value="Pancreatic Cancer">Pancreatic Cancer</option>
                    <option value="Ovarian Cancer">Ovarian Cancer</option>
                    <option value="Prostate Cancer">Prostate Cancer</option>
                </select>
            </div>
            <div class="input-field">
                <label>Platform:</label>
                <select id="platform">
                    <option value="Oncolytic Viruses">Oncolytic Viruses</option>
                    <option value="B-cell Immunotherapies">B-cell Immunotherapies</option>
                    <option value="Checkpoint Inhibitors">Checkpoint Inhibitors</option>
                    <option value="CAR-T">CAR-T</option>
                    <option value="Cancer Vaccines">Cancer Vaccines</option>
                    <option value="ADCs">ADCs</option>
                    <option value="Small Molecules">Small Molecules</option>
                    <option value="Monoclonal Antibodies">Monoclonal Antibodies</option>
                </select>
            </div>
        `;
        inputsSection.appendChild(trialDetailsGroup);

        // Create input group for custom modifiers
        const modifiersGroup = document.createElement('div');
        modifiersGroup.className = 'input-group';
        modifiersGroup.innerHTML = `
            <h4>Custom Modifiers</h4>
            <div class="input-field">
                <label>Quality of Preclinical Data:</label>
                <select id="preclinical-data">
                    <option value="0.05">Excellent (+5%)</option>
                    <option value="0.03">Good (+3%)</option>
                    <option value="0" selected>Average (0%)</option>
                    <option value="-0.03">Below Average (-3%)</option>
                    <option value="-0.05">Poor (-5%)</option>
                </select>
            </div>
            <div class="input-field">
                <label>Team Experience:</label>
                <select id="team-experience">
                    <option value="0.05">Highly Experienced (+5%)</option>
                    <option value="0.03">Experienced (+3%)</option>
                    <option value="0" selected>Average (0%)</option>
                    <option value="-0.03">Limited (-3%)</option>
                    <option value="-0.05">Inexperienced (-5%)</option>
                </select>
            </div>
            <div class="input-field">
                <label>Funding Status:</label>
                <select id="funding-status">
                    <option value="0.03">Well-funded (+3%)</option>
                    <option value="0" selected>Adequate (0%)</option>
                    <option value="-0.03">Limited (-3%)</option>
                    <option value="-0.05">Insufficient (-5%)</option>
                </select>
            </div>
            <div class="input-field">
                <label>Competitive Landscape:</label>
                <select id="competitive-landscape">
                    <option value="0.03">Favorable (+3%)</option>
                    <option value="0" selected>Neutral (0%)</option>
                    <option value="-0.03">Competitive (-3%)</option>
                    <option value="-0.05">Highly Competitive (-5%)</option>
                </select>
            </div>
        `;
        inputsSection.appendChild(modifiersGroup);

        // Add calculate button
        const calculateButton = document.createElement('button');
        calculateButton.id = 'calculate-button';
        calculateButton.textContent = 'Calculate Success Probability';
        calculateButton.className = 'calculate-button';
        calculateButton.style.marginTop = '20px';
        calculateButton.style.padding = '10px 15px';
        calculateButton.style.backgroundColor = '#4CAF50';
        calculateButton.style.color = 'white';
        calculateButton.style.border = 'none';
        calculateButton.style.borderRadius = '4px';
        calculateButton.style.cursor = 'pointer';
        calculateButton.onclick = calculateProbability;
        
        inputsSection.appendChild(calculateButton);

        // Add event listeners to inputs
        document.getElementById('drug-candidate').addEventListener('change', calculateProbability);
        document.getElementById('current-phase').addEventListener('change', calculateProbability);
        document.getElementById('indication').addEventListener('change', calculateProbability);
        document.getElementById('platform').addEventListener('change', calculateProbability);
        document.getElementById('preclinical-data').addEventListener('change', calculateProbability);
        document.getElementById('team-experience').addEventListener('change', calculateProbability);
        document.getElementById('funding-status').addEventListener('change', calculateProbability);
        document.getElementById('competitive-landscape').addEventListener('change', calculateProbability);
    }

    // Function to calculate success probability
    function calculateProbability() {
        // Get input values
        const drugCandidate = document.getElementById('drug-candidate').value;
        const currentPhase = document.getElementById('current-phase').value;
        const indication = document.getElementById('indication').value;
        const platform = document.getElementById('platform').value;
        const preclinicalData = parseFloat(document.getElementById('preclinical-data').value);
        const teamExperience = parseFloat(document.getElementById('team-experience').value);
        const fundingStatus = parseFloat(document.getElementById('funding-status').value);
        const competitiveLandscape = parseFloat(document.getElementById('competitive-landscape').value);
        
        // Get base probabilities for each phase
        const phases = Object.keys(probabilityData.phases);
        const currentPhaseIndex = phases.indexOf(currentPhase);
        
        // Calculate probabilities for each phase
        const probabilities = [];
        let cumulativeProbability = 1.0;
        
        for (let i = currentPhaseIndex; i < phases.length; i++) {
            const phase = phases[i];
            const baseProb = probabilityData.phases[phase].success;
            
            // Apply modifiers
            let modifiedProb = baseProb;
            
            if (i === currentPhaseIndex) {
                // Apply indication modifier
                if (probabilityData.indications[indication]) {
                    modifiedProb += probabilityData.indications[indication].modifier;
                }
                
                // Apply platform modifier
                if (probabilityData.platforms[platform]) {
                    modifiedProb += probabilityData.platforms[platform].modifier;
                }
                
                // Apply custom modifiers
                modifiedProb += preclinicalData + teamExperience + fundingStatus + competitiveLandscape;
                
                // Ensure probability is between 0 and 1
                modifiedProb = Math.min(Math.max(modifiedProb, 0), 1);
            }
            
            // Calculate cumulative probability
            cumulativeProbability *= modifiedProb;
            
            probabilities.push({
                phase: phase,
                baseProbability: baseProb,
                modifiedProbability: i === currentPhaseIndex ? modifiedProb : baseProb,
                cumulativeProbability: cumulativeProbability
            });
        }
        
        // Update results
        updateResults(probabilities, indication, platform);
    }

    // Function to update results
    function updateResults(probabilities, indication, platform) {
        // Update chart
        updateChart(probabilities);
        
        // Update results table
        updateResultsTable(probabilities, indication, platform);
    }

    // Function to update chart
    function updateChart(probabilities) {
        // Get canvas context
        const ctx = document.getElementById('success-probability-canvas').getContext('2d');
        
        // Prepare data for chart
        const labels = probabilities.map(p => p.phase);
        const cumulativeData = probabilities.map(p => p.cumulativeProbability * 100);
        const phaseData = probabilities.map(p => p.modifiedProbability * 100);
        
        // Destroy previous chart if exists
        if (probabilityChart) {
            probabilityChart.destroy();
        }
        
        try {
            // Create new chart
            probabilityChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cumulative Probability (%)',
                            data: cumulativeData,
                            backgroundColor: 'rgba(54, 162, 235, 0.8)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            type: 'line',
                            yAxisID: 'y'
                        },
                        {
                            label: 'Phase Success Probability (%)',
                            data: phaseData,
                            backgroundColor: 'rgba(255, 99, 132, 0.8)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            yAxisID: 'y'
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
                                text: 'Probability (%)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.dataset.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value.toFixed(1)}%`;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log("Success Probability Calculator: Chart rendered successfully");
        } catch (e) {
            console.error("Error rendering probability chart:", e);
            showFallbackVisualization(probabilities);
        }
    }

    // Function to update results table
    function updateResultsTable(probabilities, indication, platform) {
        // Clear previous content
        resultsTableContainer.innerHTML = '';
        
        // Create summary section
        const summarySection = document.createElement('div');
        summarySection.className = 'summary-section';
        summarySection.style.marginBottom = '20px';
        summarySection.style.padding = '15px';
        summarySection.style.backgroundColor = '#f8f9fa';
        summarySection.style.borderRadius = '4px';
        summarySection.style.border = '1px solid #ddd';
        
        // Calculate overall probability of approval
        const approvalProb = probabilities.find(p => p.phase === 'Approval');
        const approvalProbValue = approvalProb ? approvalProb.cumulativeProbability * 100 : 0;
        
        // Create summary content
        const summaryTitle = document.createElement('h4');
        summaryTitle.textContent = 'Summary';
        summaryTitle.style.marginTop = '0';
        summarySection.appendChild(summaryTitle);
        
        const summaryContent = document.createElement('div');
        summaryContent.innerHTML = `
            <p><strong>Overall Probability of Approval:</strong> ${approvalProbValue.toFixed(1)}%</p>
            <p><strong>Indication Impact:</strong> ${probabilityData.indications[indication].description}</p>
            <p><strong>Platform Impact:</strong> ${probabilityData.platforms[platform].description}</p>
        `;
        summarySection.appendChild(summaryContent);
        
        resultsTableContainer.appendChild(summarySection);
        
        // Create table
        const table = document.createElement('table');
        table.className = 'results-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        
        // Create table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Phase</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Base Probability</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Modified Probability</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Cumulative Probability</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Add rows for each phase
        probabilities.forEach(prob => {
            const row = document.createElement('tr');
            
            const phaseCell = document.createElement('td');
            phaseCell.textContent = prob.phase;
            phaseCell.style.padding = '8px';
            phaseCell.style.borderBottom = '1px solid #ddd';
            phaseCell.style.textAlign = 'left';
            row.appendChild(phaseCell);
            
            const baseProbCell = document.createElement('td');
            baseProbCell.textContent = `${(prob.baseProbability * 100).toFixed(1)}%`;
            baseProbCell.style.padding = '8px';
            baseProbCell.style.borderBottom = '1px solid #ddd';
            baseProbCell.style.textAlign = 'right';
            row.appendChild(baseProbCell);
            
            const modifiedProbCell = document.createElement('td');
            modifiedProbCell.textContent = `${(prob.modifiedProbability * 100).toFixed(1)}%`;
            modifiedProbCell.style.padding = '8px';
            modifiedProbCell.style.borderBottom = '1px solid #ddd';
            modifiedProbCell.style.textAlign = 'right';
            row.appendChild(modifiedProbCell);
            
            const cumulativeProbCell = document.createElement('td');
            cumulativeProbCell.textContent = `${(prob.cumulativeProbability * 100).toFixed(1)}%`;
            cumulativeProbCell.style.padding = '8px';
            cumulativeProbCell.style.borderBottom = '1px solid #ddd';
            cumulativeProbCell.style.textAlign = 'right';
            row.appendChild(cumulativeProbCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        resultsTableContainer.appendChild(table);
    }

    // Fallback visualization function
    function showFallbackVisualization(probabilities) {
        // Clear the chart container
        const chartContainer = document.getElementById('success-probability-chart-container');
        chartContainer.innerHTML = '';
        
        // Create fallback visualization
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-visualization';
        fallbackDiv.style.height = '400px';
        fallbackDiv.style.display = 'flex';
        fallbackDiv.style.flexDirection = 'column';
        fallbackDiv.style.justifyContent = 'center';
        fallbackDiv.style.alignItems = 'center';
        fallbackDiv.style.backgroundColor = '#f8f9fa';
        fallbackDiv.style.border = '1px solid #ddd';
        fallbackDiv.style.borderRadius = '4px';
        fallbackDiv.style.padding = '20px';
        
        // Create fallback title
        const fallbackTitle = document.createElement('h4');
        fallbackTitle.textContent = 'Success Probability Results';
        fallbackTitle.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Create a simple table for probability data
        const table = document.createElement('table');
        table.style.width = '80%';
        table.style.borderCollapse = 'collapse';
        
        // Add header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const phaseHeader = document.createElement('th');
        phaseHeader.textContent = 'Phase';
        phaseHeader.style.padding = '8px';
        phaseHeader.style.borderBottom = '1px solid #ddd';
        phaseHeader.style.textAlign = 'left';
        headerRow.appendChild(phaseHeader);
        
        const probHeader = document.createElement('th');
        probHeader.textContent = 'Phase Probability';
        probHeader.style.padding = '8px';
        probHeader.style.borderBottom = '1px solid #ddd';
        probHeader.style.textAlign = 'right';
        headerRow.appendChild(probHeader);
        
        const cumHeader = document.createElement('th');
        cumHeader.textContent = 'Cumulative Probability';
        cumHeader.style.padding = '8px';
        cumHeader.style.borderBottom = '1px solid #ddd';
        cumHeader.style.textAlign = 'right';
        headerRow.appendChild(cumHeader);
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Add body
        const tbody = document.createElement('tbody');
        
        probabilities.forEach(prob => {
            const row = document.createElement('tr');
            
            const phaseCell = document.createElement('td');
            phaseCell.textContent = prob.phase;
            phaseCell.style.padding = '8px';
            phaseCell.style.borderBottom = '1px solid #ddd';
            phaseCell.style.textAlign = 'left';
            row.appendChild(phaseCell);
            
            const probCell = document.createElement('td');
            probCell.textContent = `${(prob.modifiedProbability * 100).toFixed(1)}%`;
            probCell.style.padding = '8px';
            probCell.style.borderBottom = '1px solid #ddd';
            probCell.style.textAlign = 'right';
            row.appendChild(probCell);
            
            const cumCell = document.createElement('td');
            cumCell.textContent = `${(prob.cumulativeProbability * 100).toFixed(1)}%`;
            cumCell.style.padding = '8px';
            cumCell.style.borderBottom = '1px solid #ddd';
            cumCell.style.textAlign = 'right';
            row.appendChild(cumCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        fallbackDiv.appendChild(table);
        
        chartContainer.appendChild(fallbackDiv);
    }

    // Initialize the calculator
    calculateProbability();
    
    console.log("Success Probability Calculator: Initialization complete");
});
