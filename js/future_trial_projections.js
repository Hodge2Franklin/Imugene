// Enhanced Clinical Trial Timeline - Future Projections Module
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('clinical-trial-timeline-container');
    if (!container) return;
    
    // Initialize the future projections module
    initializeFutureProjectionsModule();
    
    // Function to initialize future projections module
    function initializeFutureProjectionsModule() {
        // Create projection controls
        const projectionControls = document.createElement('div');
        projectionControls.className = 'projection-controls';
        projectionControls.innerHTML = `
            <h3>Future Projections</h3>
            <div class="projection-options">
                <div class="projection-option">
                    <label for="projection-scenario">Scenario:</label>
                    <select id="projection-scenario">
                        <option value="base">Base Case</option>
                        <option value="optimistic">Optimistic</option>
                        <option value="pessimistic">Pessimistic</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div class="projection-option">
                    <label for="projection-timeframe">Timeframe:</label>
                    <select id="projection-timeframe">
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3" selected>3 Years</option>
                        <option value="5">5 Years</option>
                        <option value="10">10 Years</option>
                    </select>
                </div>
                <div class="projection-option">
                    <label for="show-cash-flow">Show Cash Flow:</label>
                    <input type="checkbox" id="show-cash-flow" checked>
                </div>
            </div>
            <div id="custom-parameters" style="display: none;">
                <h4>Custom Parameters</h4>
                <div class="parameter-grid">
                    <div class="parameter-group">
                        <label for="success-probability">Trial Success Probability:</label>
                        <input type="range" id="success-probability" min="0" max="100" value="50">
                        <span id="success-probability-value">50%</span>
                    </div>
                    <div class="parameter-group">
                        <label for="trial-duration">Trial Duration Modifier:</label>
                        <input type="range" id="trial-duration" min="50" max="150" value="100">
                        <span id="trial-duration-value">100% (Standard)</span>
                    </div>
                    <div class="parameter-group">
                        <label for="cost-modifier">Cost Modifier:</label>
                        <input type="range" id="cost-modifier" min="50" max="150" value="100">
                        <span id="cost-modifier-value">100% (Standard)</span>
                    </div>
                    <div class="parameter-group">
                        <label for="market-potential">Market Potential:</label>
                        <input type="range" id="market-potential" min="50" max="150" value="100">
                        <span id="market-potential-value">100% (Standard)</span>
                    </div>
                </div>
            </div>
            <button id="apply-projections" class="apply-button">Apply Projections</button>
        `;
        
        // Insert projection controls after the main controls
        const mainControls = container.querySelector('.timeline-controls');
        if (mainControls) {
            mainControls.parentNode.insertBefore(projectionControls, mainControls.nextSibling);
        } else {
            container.appendChild(projectionControls);
        }
        
        // Add event listeners for projection controls
        document.getElementById('projection-scenario').addEventListener('change', handleScenarioChange);
        document.getElementById('apply-projections').addEventListener('click', applyProjections);
        
        // Add event listeners for custom parameter sliders
        const successSlider = document.getElementById('success-probability');
        const durationSlider = document.getElementById('trial-duration');
        const costSlider = document.getElementById('cost-modifier');
        const marketSlider = document.getElementById('market-potential');
        
        successSlider.addEventListener('input', updateSliderValue);
        durationSlider.addEventListener('input', updateSliderValue);
        costSlider.addEventListener('input', updateSliderValue);
        marketSlider.addEventListener('input', updateSliderValue);
        
        // Function to handle scenario change
        function handleScenarioChange() {
            const scenario = document.getElementById('projection-scenario').value;
            const customParams = document.getElementById('custom-parameters');
            
            if (scenario === 'custom') {
                customParams.style.display = 'block';
            } else {
                customParams.style.display = 'none';
                
                // Set predefined values based on scenario
                switch (scenario) {
                    case 'optimistic':
                        successSlider.value = 75;
                        durationSlider.value = 80;
                        costSlider.value = 90;
                        marketSlider.value = 120;
                        break;
                    case 'pessimistic':
                        successSlider.value = 30;
                        durationSlider.value = 130;
                        costSlider.value = 120;
                        marketSlider.value = 80;
                        break;
                    default: // base case
                        successSlider.value = 50;
                        durationSlider.value = 100;
                        costSlider.value = 100;
                        marketSlider.value = 100;
                        break;
                }
                
                // Update slider value displays
                updateSliderValue({ target: successSlider });
                updateSliderValue({ target: durationSlider });
                updateSliderValue({ target: costSlider });
                updateSliderValue({ target: marketSlider });
            }
        }
        
        // Function to update slider value display
        function updateSliderValue(event) {
            const slider = event.target;
            const valueDisplay = document.getElementById(`${slider.id}-value`);
            
            if (slider.id === 'success-probability') {
                valueDisplay.textContent = `${slider.value}%`;
            } else if (slider.id === 'trial-duration') {
                const value = parseInt(slider.value);
                let description = '(Standard)';
                
                if (value < 80) description = '(Accelerated)';
                else if (value > 120) description = '(Delayed)';
                else if (value < 100) description = '(Faster)';
                else if (value > 100) description = '(Slower)';
                
                valueDisplay.textContent = `${value}% ${description}`;
            } else if (slider.id === 'cost-modifier') {
                const value = parseInt(slider.value);
                let description = '(Standard)';
                
                if (value < 80) description = '(Efficient)';
                else if (value > 120) description = '(Expensive)';
                else if (value < 100) description = '(Lower)';
                else if (value > 100) description = '(Higher)';
                
                valueDisplay.textContent = `${value}% ${description}`;
            } else if (slider.id === 'market-potential') {
                const value = parseInt(slider.value);
                let description = '(Standard)';
                
                if (value < 80) description = '(Limited)';
                else if (value > 120) description = '(Expanded)';
                else if (value < 100) description = '(Reduced)';
                else if (value > 100) description = '(Increased)';
                
                valueDisplay.textContent = `${value}% ${description}`;
            }
        }
        
        // Function to apply projections
        function applyProjections() {
            // Get projection parameters
            const scenario = document.getElementById('projection-scenario').value;
            const timeframe = parseInt(document.getElementById('projection-timeframe').value);
            const showCashFlow = document.getElementById('show-cash-flow').checked;
            
            // Get custom parameters if applicable
            const successProbability = parseInt(document.getElementById('success-probability').value) / 100;
            const durationModifier = parseInt(document.getElementById('trial-duration').value) / 100;
            const costModifier = parseInt(document.getElementById('cost-modifier').value) / 100;
            const marketPotential = parseInt(document.getElementById('market-potential').value) / 100;
            
            // Create projection data
            const projectionData = generateProjectionData(
                scenario, 
                timeframe, 
                successProbability, 
                durationModifier, 
                costModifier, 
                marketPotential
            );
            
            // Update visualization with projections
            updateVisualizationWithProjections(projectionData, showCashFlow);
            
            // Show projection summary
            showProjectionSummary(projectionData, scenario);
        }
        
        // Function to generate projection data
        function generateProjectionData(scenario, timeframe, successProbability, durationModifier, costModifier, marketPotential) {
            // Get current clinical trials data
            const trials = window.enhancedClinicalTrials || [];
            if (!trials.length) return null;
            
            // Create deep copy of trials to avoid modifying original data
            const projectedTrials = JSON.parse(JSON.stringify(trials));
            
            // Calculate end date for projections
            const today = new Date();
            const endDate = new Date(today);
            endDate.setFullYear(today.getFullYear() + timeframe);
            
            // Apply projection parameters to each trial
            projectedTrials.forEach(trial => {
                // Adjust success probabilities
                if (trial.projections && trial.projections.nextPhase) {
                    trial.projections.nextPhase.probabilityOfSuccess *= successProbability;
                    // Cap at 95% maximum
                    trial.projections.nextPhase.probabilityOfSuccess = Math.min(trial.projections.nextPhase.probabilityOfSuccess, 0.95);
                }
                
                if (trial.projections && trial.projections.marketApproval) {
                    trial.projections.marketApproval.probabilityOfSuccess *= successProbability;
                    // Cap at 95% maximum
                    trial.projections.marketApproval.probabilityOfSuccess = Math.min(trial.projections.marketApproval.probabilityOfSuccess, 0.95);
                }
                
                // Adjust trial durations
                if (trial.projections && trial.projections.nextPhase) {
                    const nextPhase = trial.projections.nextPhase;
                    const startDate = new Date(nextPhase.estimatedStartDate);
                    const originalEndDate = new Date(nextPhase.estimatedEndDate);
                    
                    // Calculate original duration in days
                    const originalDuration = (originalEndDate - startDate) / (1000 * 60 * 60 * 24);
                    
                    // Apply duration modifier
                    const newDuration = originalDuration * durationModifier;
                    
                    // Calculate new end date
                    const newEndDate = new Date(startDate);
                    newEndDate.setDate(startDate.getDate() + newDuration);
                    
                    // Update estimated end date
                    nextPhase.estimatedEndDate = newEndDate.toISOString().split('T')[0];
                    
                    // If market approval exists, adjust it based on the new end date
                    if (trial.projections.marketApproval) {
                        const approvalDate = new Date(trial.projections.marketApproval.estimatedDate);
                        const timeDiff = approvalDate - originalEndDate;
                        
                        const newApprovalDate = new Date(newEndDate);
                        newApprovalDate.setTime(newEndDate.getTime() + timeDiff);
                        
                        trial.projections.marketApproval.estimatedDate = newApprovalDate.toISOString().split('T')[0];
                    }
                }
                
                // Adjust costs
                if (trial.financials && trial.financials.phaseCosts) {
                    trial.financials.phaseCosts.forEach(phaseCost => {
                        if (phaseCost.projectedCost) {
                            phaseCost.projectedCost *= costModifier;
                        }
                    });
                }
                
                // Adjust revenue projections
                if (trial.projections && trial.projections.revenueProjections) {
                    trial.projections.revenueProjections.forEach(projection => {
                        projection.amount *= marketPotential;
                    });
                }
                
                // Generate additional future phases if needed
                if (trial.projections && trial.projections.nextPhase) {
                    const nextPhase = trial.projections.nextPhase;
                    const nextPhaseEndDate = new Date(nextPhase.estimatedEndDate);
                    
                    // If next phase ends before our projection timeframe, add another phase
                    if (nextPhaseEndDate < endDate) {
                        // Determine what would come after the next phase
                        let futurePhase = null;
                        if (nextPhase.name === 'Phase 1') {
                            futurePhase = 'Phase 2';
                        } else if (nextPhase.name === 'Phase 2') {
                            futurePhase = 'Phase 3';
                        } else if (nextPhase.name === 'Phase 3') {
                            futurePhase = 'Regulatory Review';
                        }
                        
                        if (futurePhase) {
                            // Create future phase projection
                            const futurePhaseStartDate = new Date(nextPhaseEndDate);
                            futurePhaseStartDate.setMonth(futurePhaseStartDate.getMonth() + 3); // 3 month gap
                            
                            const futurePhaseDuration = getFuturePhaseDuration(futurePhase) * durationModifier;
                            const futurePhaseEndDate = new Date(futurePhaseStartDate);
                            futurePhaseEndDate.setDate(futurePhaseStartDate.getDate() + futurePhaseDuration);
                            
                            // Add future phase to trial projections
                            trial.projections.futurePhases = trial.projections.futurePhases || [];
                            trial.projections.futurePhases.push({
                                name: futurePhase,
                                estimatedStartDate: futurePhaseStartDate.toISOString().split('T')[0],
                                estimatedEndDate: futurePhaseEndDate.toISOString().split('T')[0],
                                estimatedPatientCount: getFuturePhasePatientCount(futurePhase),
                                estimatedCost: getFuturePhaseCost(futurePhase) * costModifier,
                                probabilityOfSuccess: getFuturePhaseSuccessProbability(futurePhase, trial.indication) * successProbability
                            });
                            
                            // Add milestones for future phase
                            const futurePhaseStartMilestone = {
                                date: futurePhaseStartDate.toISOString().split('T')[0],
                                event: `${futurePhase} Start`,
                                completed: false,
                                isProjection: true,
                                details: {
                                    estimatedPatientCount: getFuturePhasePatientCount(futurePhase),
                                    estimatedCost: `$${(getFuturePhaseCost(futurePhase) * costModifier / 1000000).toFixed(1)}M`,
                                    probabilityOfSuccess: `${(getFuturePhaseSuccessProbability(futurePhase, trial.indication) * successProbability * 100).toFixed(0)}%`
                                }
                            };
                            
                            const futurePhaseEndMilestone = {
                                date: futurePhaseEndDate.toISOString().split('T')[0],
                                event: `${futurePhase} Completion`,
                                completed: false,
                                isProjection: true,
                                details: {
                                    estimatedOutcome: getFuturePhaseOutcome(futurePhase, trial.indication),
                                    nextSteps: getFuturePhaseNextSteps(futurePhase)
                                }
                            };
                            
                            trial.milestones.push(futurePhaseStartMilestone);
                            trial.milestones.push(futurePhaseEndMilestone);
                            
                            // Add funding events if needed
                            if (futurePhase === 'Phase 2' || futurePhase === 'Phase 3') {
                                const fundingDate = new Date(futurePhaseStartDate);
                                fundingDate.setMonth(fundingDate.getMonth() - 3); // 3 months before phase start
                                
                                const fundingAmount = getFuturePhaseCost(futurePhase) * 1.2 * costModifier; // 20% buffer
                                
                                const fundingEvent = {
                                    date: fundingDate.toISOString().split('T')[0],
                                    amount: fundingAmount,
                                    type: 'Capital Raise',
                                    probability: getProbabilityLabel(successProbability)
                                };
                                
                                trial.financials.potentialFundingEvents.push(fundingEvent);
                            }
                        }
                    }
                }
            });
            
            // Calculate aggregate financial projections
            const financialProjections = calculateFinancialProjections(projectedTrials, timeframe, costModifier, marketPotential);
            
            return {
                trials: projectedTrials,
                financials: financialProjections,
                parameters: {
                    scenario,
                    timeframe,
                    successProbability,
                    durationModifier,
                    costModifier,
                    marketPotential
                }
            };
        }
        
        // Helper function to get future phase duration in days
        function getFuturePhaseDuration(phase) {
            switch (phase) {
                case 'Phase 1':
                    return 365; // 1 year
                case 'Phase 2':
                    return 548; // 1.5 years
                case 'Phase 3':
                    return 730; // 2 years
                case 'Regulatory Review':
                    return 365; // 1 year
                default:
                    return 365;
            }
        }
        
        // Helper function to get future phase patient count
        function getFuturePhasePatientCount(phase) {
            switch (phase) {
                case 'Phase 1':
                    return 30;
                case 'Phase 2':
                    return 100;
                case 'Phase 3':
                    return 300;
                case 'Regulatory Review':
                    return 0;
                default:
                    return 0;
            }
        }
        
        // Helper function to get future phase cost
        function getFuturePhaseCost(phase) {
            switch (phase) {
                case 'Phase 1':
                    return 5000000; // $5M
                case 'Phase 2':
                    return 15000000; // $15M
                case 'Phase 3':
                    return 40000000; // $40M
                case 'Regulatory Review':
                    return 5000000; // $5M
                default:
                    return 5000000;
            }
        }
        
        // Helper function to get future phase success probability
        function getFuturePhaseSuccessProbability(phase, indication) {
            // Base probabilities by phase
            let baseProbability;
            switch (phase) {
                case 'Phase 1':
                    baseProbability = 0.65;
                    break;
                case 'Phase 2':
                    baseProbability = 0.40;
                    break;
                case 'Phase 3':
                    baseProbability = 0.60;
                    break;
                case 'Regulatory Review':
                    baseProbability = 0.85;
                    break;
                default:
                    baseProbability = 0.50;
            }
            
            // Adjust based on indication
            if (indication.includes('Cancer') || indication.includes('Oncology')) {
                baseProbability *= 0.9; // Cancer trials have lower success rates
            } else if (indication.includes('Rare')) {
                baseProbability *= 0.85; // Rare disease trials have lower success rates
            }
            
            return baseProbability;
        }
        
        // Helper function to get future phase outcome
        function getFuturePhaseOutcome(phase, indication) {
            switch (phase) {
                case 'Phase 1':
                    return 'Safety profile established, optimal dosing determined';
                case 'Phase 2':
                    return 'Efficacy signals detected, safety profile confirmed';
                case 'Phase 3':
                    return 'Primary endpoint met with statistical significance';
                case 'Regulatory Review':
                    return 'Marketing approval granted';
                default:
                    return 'Successful completion';
            }
        }
        
        // Helper function to get future phase next steps
        function getFuturePhaseNextSteps(phase) {
            switch (phase) {
                case 'Phase 1':
                    return 'Proceed to Phase 2 efficacy testing';
                case 'Phase 2':
                    return 'Design and initiate pivotal Phase 3 trial';
                case 'Phase 3':
                    return 'Prepare and submit regulatory filing';
                case 'Regulatory Review':
                    return 'Commercial launch and post-marketing studies';
                default:
                    return 'Continue development pathway';
            }
        }
        
        // Helper function to get probability label
        function getProbabilityLabel(probability) {
            if (probability >= 0.75) return 'High';
            if (probability >= 0.5) return 'Medium';
            return 'Low';
        }
        
        // Function to calculate financial projections
        function calculateFinancialProjections(trials, timeframe, costModifier, marketPotential) {
            const today = new Date();
            const endDate = new Date(today);
            endDate.setFullYear(today.getFullYear() + timeframe);
            
            // Generate quarterly dates for projection period
            const quarters = [];
            let currentDate = new Date(today);
            currentDate.setDate(1); // Start at beginning of month
            
            // Set to beginning of quarter
            const currentMonth = currentDate.getMonth();
            currentDate.setMonth(Math.floor(currentMonth / 3) * 3);
            
            while (currentDate <= endDate) {
                quarters.push(new Date(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 3);
            }
            
            // Initialize financial data arrays
            const researchCosts = Array(quarters.length).fill(0);
            const capitalRaises = Array(quarters.length).fill(0);
            const projectedRevenues = Array(quarters.length).fill(0);
            const cashBalance = Array(quarters.length).fill(0);
            
            // Set initial cash balance (assumption)
            cashBalance[0] = 30000000; // $30M starting cash
            
            // Calculate quarterly financials
            trials.forEach(trial => {
                // Calculate research costs
                if (trial.financials && trial.financials.quarterlyBurnRate) {
                    const burnRate = trial.financials.quarterlyBurnRate * costModifier;
                    
                    // Apply burn rate for active periods
                    const trialStartDate = new Date(trial.startDate);
                    
                    // Find end date (use the latest projected phase end date)
                    let trialEndDate = new Date(trial.estimatedEndDate);
                    
                    if (trial.projections && trial.projections.nextPhase) {
                        const nextPhaseEndDate = new Date(trial.projections.nextPhase.estimatedEndDate);
                        if (nextPhaseEndDate > trialEndDate) {
                            trialEndDate = nextPhaseEndDate;
                        }
                    }
                    
                    if (trial.projections && trial.projections.futurePhases) {
                        trial.projections.futurePhases.forEach(phase => {
                            const phaseEndDate = new Date(phase.estimatedEndDate);
                            if (phaseEndDate > trialEndDate) {
                                trialEndDate = phaseEndDate;
                            }
                        });
                    }
                    
                    // Apply burn rate to each applicable quarter
                    quarters.forEach((quarter, index) => {
                        if (quarter >= trialStartDate && quarter <= trialEndDate) {
                            researchCosts[index] += burnRate;
                        }
                    });
                }
                
                // Add capital raises
                if (trial.financials && trial.financials.potentialFundingEvents) {
                    trial.financials.potentialFundingEvents.forEach(event => {
                        const eventDate = new Date(event.date);
                        
                        // Find the quarter index for this event
                        for (let i = 0; i < quarters.length; i++) {
                            const quarterEnd = new Date(quarters[i]);
                            quarterEnd.setMonth(quarterEnd.getMonth() + 3);
                            
                            if (eventDate >= quarters[i] && eventDate < quarterEnd) {
                                // Apply probability adjustment to funding amount
                                let probabilityFactor = 1.0;
                                if (event.probability === 'Medium') {
                                    probabilityFactor = 0.75;
                                } else if (event.probability === 'Low') {
                                    probabilityFactor = 0.5;
                                }
                                
                                capitalRaises[i] += event.amount * probabilityFactor;
                                break;
                            }
                        }
                    });
                }
                
                // Add projected revenues
                if (trial.projections && trial.projections.revenueProjections) {
                    trial.projections.revenueProjections.forEach(projection => {
                        // Convert year to quarters
                        const projectionYear = projection.year;
                        const yearStart = new Date(projectionYear, 0, 1);
                        
                        // Distribute annual revenue across quarters
                        for (let i = 0; i < quarters.length; i++) {
                            const quarter = quarters[i];
                            if (quarter.getFullYear() === projectionYear) {
                                // Distribute revenue based on quarter
                                const quarterIndex = Math.floor(quarter.getMonth() / 3);
                                let quarterRevenue;
                                
                                // Ramp up revenue throughout the year
                                switch (quarterIndex) {
                                    case 0: // Q1
                                        quarterRevenue = projection.amount * 0.1;
                                        break;
                                    case 1: // Q2
                                        quarterRevenue = projection.amount * 0.2;
                                        break;
                                    case 2: // Q3
                                        quarterRevenue = projection.amount * 0.3;
                                        break;
                                    case 3: // Q4
                                        quarterRevenue = projection.amount * 0.4;
                                        break;
                                    default:
                                        quarterRevenue = projection.amount * 0.25;
                                }
                                
                                projectedRevenues[i] += quarterRevenue * marketPotential;
                            }
                        }
                    });
                }
            });
            
            // Calculate cumulative cash balance
            for (let i = 0; i < quarters.length; i++) {
                if (i > 0) {
                    cashBalance[i] = cashBalance[i-1];
                }
                
                cashBalance[i] += capitalRaises[i] + projectedRevenues[i] - researchCosts[i];
            }
            
            return {
                quarters: quarters,
                researchCosts: researchCosts,
                capitalRaises: capitalRaises,
                projectedRevenues: projectedRevenues,
                cashBalance: cashBalance
            };
        }
        
        // Function to update visualization with projections
        function updateVisualizationWithProjections(projectionData, showCashFlow) {
            if (!projectionData) return;
            
            // Update global clinical trials data with projected data
            window.enhancedClinicalTrials = projectionData.trials;
            
            // Trigger visualization update
            if (typeof updateVisualization === 'function') {
                updateVisualization();
            }
            
            // Update cash flow visualization if enabled
            if (showCashFlow) {
                updateCashFlowVisualization(projectionData.financials);
            }
        }
        
        // Function to update cash flow visualization
        function updateCashFlowVisualization(financials) {
            // Check if cash flow container exists, create if not
            let cashFlowContainer = document.getElementById('cash-flow-container');
            if (!cashFlowContainer) {
                cashFlowContainer = document.createElement('div');
                cashFlowContainer.id = 'cash-flow-container';
                cashFlowContainer.className = 'cash-flow-container';
                
                // Create canvas for cash flow chart
                const canvas = document.createElement('canvas');
                canvas.id = 'cash-flow-chart';
                canvas.height = 250;
                cashFlowContainer.appendChild(canvas);
                
                // Add container after cost projection container
                const costContainer = document.getElementById('cost-projection-container');
                if (costContainer) {
                    costContainer.parentNode.insertBefore(cashFlowContainer, costContainer.nextSibling);
                } else {
                    const visualizationContainer = document.querySelector('.visualization-container');
                    if (visualizationContainer) {
                        visualizationContainer.appendChild(cashFlowContainer);
                    }
                }
            }
            
            // Clear previous chart if it exists
            if (window.cashFlowChart) {
                window.cashFlowChart.destroy();
            }
            
            // Format dates for chart labels
            const labels = financials.quarters.map(quarter => {
                return quarter.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            });
            
            // Create cash flow chart
            const ctx = document.getElementById('cash-flow-chart').getContext('2d');
            window.cashFlowChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Research Costs',
                            data: financials.researchCosts.map(value => -value), // Negative for costs
                            backgroundColor: 'rgba(231, 76, 60, 0.7)',
                            borderColor: 'rgba(192, 57, 43, 1)',
                            borderWidth: 1,
                            stack: 'stack0'
                        },
                        {
                            label: 'Capital Raises',
                            data: financials.capitalRaises,
                            backgroundColor: 'rgba(52, 152, 219, 0.7)',
                            borderColor: 'rgba(41, 128, 185, 1)',
                            borderWidth: 1,
                            stack: 'stack0'
                        },
                        {
                            label: 'Projected Revenues',
                            data: financials.projectedRevenues,
                            backgroundColor: 'rgba(46, 204, 113, 0.7)',
                            borderColor: 'rgba(39, 174, 96, 1)',
                            borderWidth: 1,
                            stack: 'stack0'
                        },
                        {
                            label: 'Cash Balance',
                            data: financials.cashBalance,
                            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent
                            borderColor: 'rgba(44, 62, 80, 1)',
                            borderWidth: 2,
                            type: 'line',
                            yAxisID: 'y1',
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true,
                            title: {
                                display: true,
                                text: 'Timeline'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                                display: true,
                                text: 'Quarterly Cash Flow (USD)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000000).toFixed(1) + 'M';
                                }
                            }
                        },
                        y1: {
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Cash Balance (USD)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000000).toFixed(1) + 'M';
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Projected Cash Flow and Balance',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    let value = context.raw;
                                    if (context.datasetIndex === 0) {
                                        value = -value; // Convert back to positive for display
                                    }
                                    return label + '$' + (value / 1000000).toFixed(1) + 'M';
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Function to show projection summary
        function showProjectionSummary(projectionData, scenario) {
            // Check if summary container exists, create if not
            let summaryContainer = document.getElementById('projection-summary');
            if (!summaryContainer) {
                summaryContainer = document.createElement('div');
                summaryContainer.id = 'projection-summary';
                summaryContainer.className = 'projection-summary';
                
                // Add container after cash flow container
                const cashFlowContainer = document.getElementById('cash-flow-container');
                if (cashFlowContainer) {
                    cashFlowContainer.parentNode.insertBefore(summaryContainer, cashFlowContainer.nextSibling);
                } else {
                    const costContainer = document.getElementById('cost-projection-container');
                    if (costContainer) {
                        costContainer.parentNode.insertBefore(summaryContainer, costContainer.nextSibling);
                    }
                }
            }
            
            // Calculate key metrics
            const financials = projectionData.financials;
            const lastQuarterIndex = financials.quarters.length - 1;
            
            const totalResearchCosts = financials.researchCosts.reduce((sum, value) => sum + value, 0);
            const totalCapitalRaises = financials.capitalRaises.reduce((sum, value) => sum + value, 0);
            const totalRevenues = financials.projectedRevenues.reduce((sum, value) => sum + value, 0);
            const finalCashBalance = financials.cashBalance[lastQuarterIndex];
            
            // Calculate burn rate and runway
            const averageQuarterlyBurn = totalResearchCosts / financials.quarters.length;
            const cashRunway = averageQuarterlyBurn > 0 ? finalCashBalance / averageQuarterlyBurn : 0;
            
            // Count potential approvals
            let potentialApprovals = 0;
            projectionData.trials.forEach(trial => {
                if (trial.projections && trial.projections.marketApproval) {
                    const approvalDate = new Date(trial.projections.marketApproval.estimatedDate);
                    const endDate = new Date(financials.quarters[lastQuarterIndex]);
                    endDate.setMonth(endDate.getMonth() + 3); // End of last quarter
                    
                    if (approvalDate <= endDate) {
                        potentialApprovals++;
                    }
                }
            });
            
            // Create scenario description
            let scenarioDescription = '';
            switch (scenario) {
                case 'optimistic':
                    scenarioDescription = 'Optimistic scenario assumes higher success rates, faster trial completion, and expanded market potential.';
                    break;
                case 'pessimistic':
                    scenarioDescription = 'Pessimistic scenario assumes lower success rates, delayed trials, and limited market potential.';
                    break;
                case 'custom':
                    scenarioDescription = 'Custom scenario with user-defined parameters for success rates, trial duration, costs, and market potential.';
                    break;
                default:
                    scenarioDescription = 'Base case scenario with standard industry assumptions for trial success, duration, costs, and market potential.';
            }
            
            // Create summary content
            summaryContainer.innerHTML = `
                <h3>Projection Summary - ${capitalizeFirstLetter(scenario)} Scenario</h3>
                <p class="scenario-description">${scenarioDescription}</p>
                
                <div class="summary-grid">
                    <div class="summary-section">
                        <h4>Financial Projections</h4>
                        <div class="metric">
                            <span class="metric-label">Total Research Costs:</span>
                            <span class="metric-value">$${(totalResearchCosts / 1000000).toFixed(1)}M</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Total Capital Raises:</span>
                            <span class="metric-value">$${(totalCapitalRaises / 1000000).toFixed(1)}M</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Projected Revenues:</span>
                            <span class="metric-value">$${(totalRevenues / 1000000).toFixed(1)}M</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Final Cash Balance:</span>
                            <span class="metric-value ${finalCashBalance < 0 ? 'negative' : 'positive'}">
                                $${(finalCashBalance / 1000000).toFixed(1)}M
                            </span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Average Quarterly Burn:</span>
                            <span class="metric-value">$${(averageQuarterlyBurn / 1000000).toFixed(1)}M</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Cash Runway:</span>
                            <span class="metric-value">${cashRunway.toFixed(1)} quarters</span>
                        </div>
                    </div>
                    
                    <div class="summary-section">
                        <h4>Development Milestones</h4>
                        <div class="metric">
                            <span class="metric-label">Potential Approvals:</span>
                            <span class="metric-value">${potentialApprovals}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Key Milestones:</span>
                        </div>
                        <ul class="milestone-list">
                            ${generateKeyMilestonesList(projectionData.trials)}
                        </ul>
                    </div>
                </div>
                
                <div class="summary-actions">
                    <button id="export-projection" class="action-button">Export Projection Data</button>
                    <button id="reset-projection" class="action-button secondary">Reset Visualization</button>
                </div>
            `;
            
            // Add event listeners for summary actions
            document.getElementById('export-projection').addEventListener('click', function() {
                exportProjectionData(projectionData);
            });
            
            document.getElementById('reset-projection').addEventListener('click', function() {
                resetVisualization();
            });
        }
        
        // Helper function to generate key milestones list
        function generateKeyMilestonesList(trials) {
            const today = new Date();
            let allMilestones = [];
            
            // Collect all milestones from all trials
            trials.forEach(trial => {
                trial.milestones.forEach(milestone => {
                    if (!milestone.completed && new Date(milestone.date) > today) {
                        allMilestones.push({
                            date: new Date(milestone.date),
                            event: milestone.event,
                            trial: trial.name,
                            isProjection: milestone.isProjection || false
                        });
                    }
                });
            });
            
            // Sort by date
            allMilestones.sort((a, b) => a.date - b.date);
            
            // Take top 5 milestones
            const topMilestones = allMilestones.slice(0, 5);
            
            // Generate HTML
            let html = '';
            topMilestones.forEach(milestone => {
                const dateStr = milestone.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                html += `
                    <li class="${milestone.isProjection ? 'projection' : ''}">
                        <span class="milestone-date">${dateStr}</span>
                        <span class="milestone-event">${milestone.trial}: ${milestone.event}</span>
                    </li>
                `;
            });
            
            return html;
        }
        
        // Function to export projection data
        function exportProjectionData(projectionData) {
            // Create a formatted JSON string
            const dataStr = JSON.stringify(projectionData, null, 2);
            
            // Create a blob from the JSON string
            const blob = new Blob([dataStr], { type: 'application/json' });
            
            // Create a URL for the blob
            const url = URL.createObjectURL(blob);
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            
            // Set the filename
            const scenario = projectionData.parameters.scenario;
            const timeframe = projectionData.parameters.timeframe;
            const date = new Date().toISOString().split('T')[0];
            link.download = `imugene_${scenario}_${timeframe}yr_projection_${date}.json`;
            
            // Append the link to the document
            document.body.appendChild(link);
            
            // Trigger the download
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        
        // Function to reset visualization
        function resetVisualization() {
            // Reset to original data
            if (window.originalClinicalTrials) {
                window.enhancedClinicalTrials = JSON.parse(JSON.stringify(window.originalClinicalTrials));
            }
            
            // Reset projection controls
            document.getElementById('projection-scenario').value = 'base';
            document.getElementById('projection-timeframe').value = '3';
            document.getElementById('show-cash-flow').checked = true;
            document.getElementById('custom-parameters').style.display = 'none';
            
            // Reset sliders
            document.getElementById('success-probability').value = 50;
            document.getElementById('trial-duration').value = 100;
            document.getElementById('cost-modifier').value = 100;
            document.getElementById('market-potential').value = 100;
            
            // Update slider value displays
            updateSliderValue({ target: document.getElementById('success-probability') });
            updateSliderValue({ target: document.getElementById('trial-duration') });
            updateSliderValue({ target: document.getElementById('cost-modifier') });
            updateSliderValue({ target: document.getElementById('market-potential') });
            
            // Remove cash flow chart and summary
            const cashFlowContainer = document.getElementById('cash-flow-container');
            if (cashFlowContainer) {
                cashFlowContainer.remove();
            }
            
            const summaryContainer = document.getElementById('projection-summary');
            if (summaryContainer) {
                summaryContainer.remove();
            }
            
            // Update visualization
            if (typeof updateVisualization === 'function') {
                updateVisualization();
            }
        }
        
        // Helper function to capitalize first letter
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
});
