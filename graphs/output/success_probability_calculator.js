// Success Probability Calculator Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('success-probability-container');
    if (!container) return;

    // Create the calculator interface
    createCalculatorInterface(container);

    // Sample data for clinical trial success rates by phase and indication
    const successRateData = {
        oncology: {
            'Phase 1 to Phase 2': 0.53,
            'Phase 2 to Phase 3': 0.24,
            'Phase 3 to Approval': 0.34,
            'Overall (Phase 1 to Approval)': 0.043
        },
        immunology: {
            'Phase 1 to Phase 2': 0.63,
            'Phase 2 to Phase 3': 0.29,
            'Phase 3 to Approval': 0.54,
            'Overall (Phase 1 to Approval)': 0.099
        },
        infectious: {
            'Phase 1 to Phase 2': 0.59,
            'Phase 2 to Phase 3': 0.31,
            'Phase 3 to Approval': 0.62,
            'Overall (Phase 1 to Approval)': 0.114
        },
        neurology: {
            'Phase 1 to Phase 2': 0.56,
            'Phase 2 to Phase 3': 0.28,
            'Phase 3 to Approval': 0.46,
            'Overall (Phase 1 to Approval)': 0.072
        },
        cardiovascular: {
            'Phase 1 to Phase 2': 0.64,
            'Phase 2 to Phase 3': 0.32,
            'Phase 3 to Approval': 0.55,
            'Overall (Phase 1 to Approval)': 0.113
        },
        metabolic: {
            'Phase 1 to Phase 2': 0.65,
            'Phase 2 to Phase 3': 0.36,
            'Phase 3 to Approval': 0.58,
            'Overall (Phase 1 to Approval)': 0.136
        },
        rare: {
            'Phase 1 to Phase 2': 0.76,
            'Phase 2 to Phase 3': 0.44,
            'Phase 3 to Approval': 0.66,
            'Overall (Phase 1 to Approval)': 0.221
        }
    };

    // Sample data for Imugene's clinical trials
    const imugeneTrials = [
        {
            id: 'her-vaxx',
            name: 'HER-Vaxx (IMU-131)',
            indication: 'HER2+ Gastric Cancer',
            category: 'oncology',
            currentPhase: 'Phase 2',
            novelty: 'medium',
            complexity: 'medium',
            preliminaryData: 'positive',
            teamExperience: 'high'
        },
        {
            id: 'cf33-hnis',
            name: 'CF33-hNIS (VAXINIA)',
            indication: 'Solid Tumors',
            category: 'oncology',
            currentPhase: 'Phase 1',
            novelty: 'high',
            complexity: 'high',
            preliminaryData: 'promising',
            teamExperience: 'high'
        },
        {
            id: 'checkvacc',
            name: 'CHECKvacc (CF33-hNIS-antiPDL1)',
            indication: 'Triple Negative Breast Cancer',
            category: 'oncology',
            currentPhase: 'Phase 1',
            novelty: 'high',
            complexity: 'high',
            preliminaryData: 'early',
            teamExperience: 'high'
        },
        {
            id: 'pd1-vaxx',
            name: 'PD1-Vaxx',
            indication: 'Non-Small Cell Lung Cancer',
            category: 'oncology',
            currentPhase: 'Phase 1',
            novelty: 'medium',
            complexity: 'medium',
            preliminaryData: 'promising',
            teamExperience: 'high'
        }
    ];

    // Initialize the calculator with the first trial
    initializeCalculator(imugeneTrials[0], successRateData);

    // Function to create calculator interface
    function createCalculatorInterface(container) {
        // Create calculator container
        const calculatorContainer = document.createElement('div');
        calculatorContainer.className = 'calculator-container';
        container.appendChild(calculatorContainer);

        // Create trial selection section
        const trialSection = document.createElement('div');
        trialSection.className = 'calculator-section';
        calculatorContainer.appendChild(trialSection);

        // Create title for trial section
        const trialTitle = document.createElement('h3');
        trialTitle.textContent = 'Select Clinical Trial';
        trialSection.appendChild(trialTitle);

        // Create trial selector
        const trialSelector = document.createElement('select');
        trialSelector.id = 'trial-selector';
        trialSelector.className = 'trial-selector';
        trialSection.appendChild(trialSelector);

        // Add options for each trial
        imugeneTrials.forEach(trial => {
            const option = document.createElement('option');
            option.value = trial.id;
            option.textContent = `${trial.name} (${trial.indication})`;
            trialSelector.appendChild(option);
        });

        // Add event listener to trial selector
        trialSelector.addEventListener('change', function() {
            const selectedTrialId = this.value;
            const selectedTrial = imugeneTrials.find(trial => trial.id === selectedTrialId);
            initializeCalculator(selectedTrial, successRateData);
        });

        // Create input section
        const inputSection = document.createElement('div');
        inputSection.className = 'calculator-section';
        calculatorContainer.appendChild(inputSection);

        // Create title for input section
        const inputTitle = document.createElement('h3');
        inputTitle.textContent = 'Success Factors';
        inputSection.appendChild(inputTitle);

        // Create input form
        const inputForm = document.createElement('form');
        inputForm.id = 'success-calculator-form';
        inputForm.className = 'calculator-form';
        inputSection.appendChild(inputForm);

        // Define input fields
        const inputFields = [
            { id: 'current-phase', label: 'Current Phase', type: 'select', options: ['Phase 1', 'Phase 2', 'Phase 3'] },
            { id: 'indication-category', label: 'Indication Category', type: 'select', options: ['oncology', 'immunology', 'infectious', 'neurology', 'cardiovascular', 'metabolic', 'rare'] },
            { id: 'novelty', label: 'Therapeutic Novelty', type: 'select', options: ['low', 'medium', 'high'] },
            { id: 'complexity', label: 'Trial Complexity', type: 'select', options: ['low', 'medium', 'high'] },
            { id: 'preliminary-data', label: 'Preliminary Data', type: 'select', options: ['negative', 'mixed', 'early', 'promising', 'positive'] },
            { id: 'team-experience', label: 'Team Experience', type: 'select', options: ['low', 'medium', 'high'] }
        ];

        // Create input fields
        inputFields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            formGroup.appendChild(label);
            
            if (field.type === 'select') {
                const select = document.createElement('select');
                select.id = field.id;
                
                field.options.forEach(optionValue => {
                    const option = document.createElement('option');
                    option.value = optionValue;
                    option.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
                    select.appendChild(option);
                });
                
                select.addEventListener('change', calculateSuccessProbability);
                formGroup.appendChild(select);
            } else {
                const input = document.createElement('input');
                input.type = field.type;
                input.id = field.id;
                
                if (field.type === 'number') {
                    input.step = field.step || '0.01';
                    input.min = field.min || '0';
                    if (field.max) input.max = field.max;
                }
                
                input.addEventListener('change', calculateSuccessProbability);
                formGroup.appendChild(input);
            }
            
            inputForm.appendChild(formGroup);
        });

        // Create calculate button
        const calculateButton = document.createElement('button');
        calculateButton.type = 'button';
        calculateButton.className = 'btn btn-primary';
        calculateButton.textContent = 'Calculate Success Probability';
        calculateButton.addEventListener('click', calculateSuccessProbability);
        inputForm.appendChild(calculateButton);

        // Create results section
        const resultsSection = document.createElement('div');
        resultsSection.className = 'calculator-section';
        calculatorContainer.appendChild(resultsSection);

        // Create title for results section
        const resultsTitle = document.createElement('h3');
        resultsTitle.textContent = 'Success Probability Results';
        resultsSection.appendChild(resultsTitle);

        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'success-results';
        resultsContainer.className = 'results-container';
        resultsSection.appendChild(resultsContainer);

        // Create visualization section
        const visualizationSection = document.createElement('div');
        visualizationSection.className = 'calculator-section';
        container.appendChild(visualizationSection);

        // Create title for visualization section
        const visualizationTitle = document.createElement('h3');
        visualizationTitle.textContent = 'Success Probability Visualization';
        visualizationSection.appendChild(visualizationTitle);

        // Create chart container
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        visualizationSection.appendChild(chartContainer);

        // Create probability chart
        const probabilityChartContainer = document.createElement('div');
        probabilityChartContainer.id = 'probability-chart-container';
        probabilityChartContainer.style.height = '300px';
        chartContainer.appendChild(probabilityChartContainer);

        // Create comparison chart
        const comparisonChartContainer = document.createElement('div');
        comparisonChartContainer.id = 'comparison-chart-container';
        comparisonChartContainer.style.height = '300px';
        comparisonChartContainer.style.marginTop = '20px';
        chartContainer.appendChild(comparisonChartContainer);
    }

    // Function to initialize calculator with trial data
    function initializeCalculator(trial, successRateData) {
        // Set input values based on trial data
        document.getElementById('current-phase').value = trial.currentPhase;
        document.getElementById('indication-category').value = trial.category;
        document.getElementById('novelty').value = trial.novelty;
        document.getElementById('complexity').value = trial.complexity;
        document.getElementById('preliminary-data').value = trial.preliminaryData;
        document.getElementById('team-experience').value = trial.teamExperience;

        // Calculate initial results
        calculateSuccessProbability();
    }

    // Function to calculate success probability
    function calculateSuccessProbability() {
        // Get input values
        const currentPhase = document.getElementById('current-phase').value;
        const indicationCategory = document.getElementById('indication-category').value;
        const novelty = document.getElementById('novelty').value;
        const complexity = document.getElementById('complexity').value;
        const preliminaryData = document.getElementById('preliminary-data').value;
        const teamExperience = document.getElementById('team-experience').value;

        // Get base success rates for the selected indication category
        const baseRates = successRateData[indicationCategory];

        // Determine which transition probabilities to use based on current phase
        let phaseTransitions = [];
        let cumulativeProbability = 1.0;

        switch (currentPhase) {
            case 'Phase 1':
                phaseTransitions = ['Phase 1 to Phase 2', 'Phase 2 to Phase 3', 'Phase 3 to Approval'];
                break;
            case 'Phase 2':
                phaseTransitions = ['Phase 2 to Phase 3', 'Phase 3 to Approval'];
                break;
            case 'Phase 3':
                phaseTransitions = ['Phase 3 to Approval'];
                break;
        }

        // Calculate base cumulative probability
        phaseTransitions.forEach(transition => {
            cumulativeProbability *= baseRates[transition];
        });

        // Apply modifiers based on other factors
        const noveltyModifier = getNoveltyModifier(novelty);
        const complexityModifier = getComplexityModifier(complexity);
        const dataModifier = getDataModifier(preliminaryData);
        const teamModifier = getTeamModifier(teamExperience);

        // Apply all modifiers
        const totalModifier = noveltyModifier * complexityModifier * dataModifier * teamModifier;
        const adjustedProbability = Math.min(cumulativeProbability * totalModifier, 1.0);

        // Calculate individual phase probabilities with modifiers
        const phaseProbabilities = {};
        phaseTransitions.forEach(transition => {
            phaseProbabilities[transition] = Math.min(baseRates[transition] * totalModifier, 1.0);
        });

        // Update results container
        updateResultsDisplay(currentPhase, indicationCategory, cumulativeProbability, adjustedProbability, phaseProbabilities, totalModifier);

        // Update charts
        updateProbabilityChart(currentPhase, phaseProbabilities);
        updateComparisonChart(indicationCategory, adjustedProbability);
    }

    // Function to get modifier based on therapeutic novelty
    function getNoveltyModifier(novelty) {
        switch (novelty) {
            case 'low':
                return 1.2; // Less novel approaches often have higher success rates
            case 'medium':
                return 1.0; // Neutral
            case 'high':
                return 0.8; // Highly novel approaches often have lower success rates
            default:
                return 1.0;
        }
    }

    // Function to get modifier based on trial complexity
    function getComplexityModifier(complexity) {
        switch (complexity) {
            case 'low':
                return 1.2; // Less complex trials often have higher success rates
            case 'medium':
                return 1.0; // Neutral
            case 'high':
                return 0.8; // Highly complex trials often have lower success rates
            default:
                return 1.0;
        }
    }

    // Function to get modifier based on preliminary data
    function getDataModifier(data) {
        switch (data) {
            case 'negative':
                return 0.5; // Negative data significantly reduces success probability
            case 'mixed':
                return 0.8; // Mixed data somewhat reduces success probability
            case 'early':
                return 0.9; // Early data (limited) slightly reduces success probability
            case 'promising':
                return 1.2; // Promising data increases success probability
            case 'positive':
                return 1.5; // Positive data significantly increases success probability
            default:
                return 1.0;
        }
    }

    // Function to get modifier based on team experience
    function getTeamModifier(experience) {
        switch (experience) {
            case 'low':
                return 0.8; // Less experienced teams often have lower success rates
            case 'medium':
                return 1.0; // Neutral
            case 'high':
                return 1.2; // Highly experienced teams often have higher success rates
            default:
                return 1.0;
        }
    }

    // Function to update results display
    function updateResultsDisplay(currentPhase, indicationCategory, baseProbability, adjustedProbability, phaseProbabilities, totalModifier) {
        const resultsContainer = document.getElementById('success-results');
        
        // Format probabilities as percentages
        const basePercent = (baseProbability * 100).toFixed(1);
        const adjustedPercent = (adjustedProbability * 100).toFixed(1);
        
        // Create HTML for results
        let resultsHTML = `
            <div class="results-summary">
                <div class="result-item highlight">
                    <div class="result-label">Overall Success Probability</div>
                    <div class="result-value">${adjustedPercent}%</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Base Industry Rate (${indicationCategory})</div>
                    <div class="result-value">${basePercent}%</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Modifier Applied</div>
                    <div class="result-value">${totalModifier.toFixed(2)}x</div>
                </div>
            </div>
            <div class="phase-probabilities">
                <h4>Phase Transition Probabilities</h4>
                <div class="phase-grid">
        `;
        
        // Add each phase transition probability
        Object.entries(phaseProbabilities).forEach(([transition, probability]) => {
            const phasePercent = (probability * 100).toFixed(1);
            resultsHTML += `
                <div class="phase-item">
                    <div class="phase-label">${transition}</div>
                    <div class="phase-value">${phasePercent}%</div>
                </div>
            `;
        });
        
        resultsHTML += `
                </div>
            </div>
            <div class="interpretation">
                <h4>Interpretation</h4>
                <p>Based on the selected parameters, this ${currentPhase} clinical trial in ${indicationCategory} has an estimated ${adjustedPercent}% probability of eventual approval.</p>
                <p>This is ${adjustedProbability > baseProbability ? 'higher' : 'lower'} than the industry average of ${basePercent}% for similar trials, primarily due to the combination of factors you've selected.</p>
            </div>
        `;
        
        // Update the results container
        resultsContainer.innerHTML = resultsHTML;
    }

    // Function to update probability chart
    function updateProbabilityChart(currentPhase, phaseProbabilities) {
        const ctx = document.getElementById('probability-chart-container');
        
        // Destroy existing chart if it exists
        if (window.probabilityChart) {
            window.probabilityChart.destroy();
        }
        
        // Prepare data for chart
        const labels = Object.keys(phaseProbabilities);
        const probabilities = Object.values(phaseProbabilities);
        
        // Calculate cumulative probabilities
        const cumulativeProbabilities = [];
        let cumulative = 1.0;
        
        probabilities.forEach(prob => {
            cumulative *= prob;
            cumulativeProbabilities.push(cumulative);
        });
        
        // Create chart
        window.probabilityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Individual Phase Success Probability',
                        data: probabilities.map(p => p * 100),
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        order: 1
                    },
                    {
                        label: 'Cumulative Success Probability',
                        data: cumulativeProbabilities.map(p => p * 100),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        type: 'line',
                        order: 0
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
                    title: {
                        display: true,
                        text: `Success Probability by Phase (Starting from ${currentPhase})`
                    },
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
    }

    // Function to update comparison chart
    function updateComparisonChart(indicationCategory, adjustedProbability) {
        const ctx = document.getElementById('comparison-chart-container');
        
        // Destroy existing chart if it exists
        if (window.comparisonChart) {
            window.comparisonChart.destroy();
        }
        
        // Get industry averages for all categories
        const industryAverages = {};
        Object.entries(successRateData).forEach(([category, rates]) => {
            industryAverages[category] = rates['Overall (Phase 1 to Approval)'];
        });
        
        // Prepare data for chart
        const categories = Object.keys(industryAverages);
        const averages = Object.values(industryAverages).map(v => v * 100);
        
        // Create data for current trial
        const trialData = Array(categories.length).fill(null);
        const categoryIndex = categories.indexOf(indicationCategory);
        if (categoryIndex !== -1) {
            trialData[categoryIndex] = adjustedProbability * 100;
        }
        
        // Create chart
        window.comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
                datasets: [
                    {
                        label: 'Industry Average',
                        data: averages,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Current Trial',
                        data: trialData,
                        backgroundColor: 'rgba(255, 159, 64, 0.8)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 25, // Most overall probabilities are under 25%
                        title: {
                            display: true,
                            text: 'Overall Success Probability (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparison with Industry Averages (Phase 1 to Approval)'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                if (value === null) return `${label}: N/A`;
                                return `${label}: ${value.toFixed(1)}%`;
                            }
                        }
                    }
                }
            }
        });
    }
});
