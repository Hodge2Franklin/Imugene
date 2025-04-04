// Enhanced Clinical Trial Timeline Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('clinical-trial-timeline-container');
    if (!container) return;

    // Enhanced data structure for clinical trials
    const enhancedClinicalTrials = [
        {
            id: 'HER-Vaxx',
            name: 'HER-Vaxx (IMU-131)',
            indication: 'HER2+ Gastric Cancer',
            phase: 'Phase 2',
            status: 'Ongoing',
            startDate: '2019-01-15',
            estimatedEndDate: '2025-06-30',
            
            // Detailed trial information
            detailedInfo: {
                mechanism: 'B-cell peptide cancer vaccine targeting HER2/neu receptor',
                patientPopulation: 'HER2+ metastatic gastric cancer patients',
                primaryEndpoint: 'Overall Survival',
                secondaryEndpoints: ['Progression-Free Survival', 'Safety', 'Immunogenicity'],
                trialSites: ['Asia-Pacific Region', 'Eastern Europe'],
                trialPhases: [
                    {
                        name: 'Phase 1',
                        description: 'Dose-finding and safety assessment',
                        completed: true,
                        patientCount: 14,
                        results: 'Well-tolerated with no dose-limiting toxicities'
                    },
                    {
                        name: 'Phase 2',
                        description: 'Efficacy and expanded safety',
                        completed: false,
                        patientCount: 68,
                        results: 'Interim analysis showed promising survival benefit'
                    }
                ]
            },
            
            // Cost and financial projections
            financials: {
                phaseCosts: [
                    { phase: 'Phase 1', actualCost: 2500000, currency: 'USD' },
                    { phase: 'Phase 2', actualCost: 8500000, projectedCost: 12000000, currency: 'USD' },
                    { phase: 'Phase 3', projectedCost: 45000000, currency: 'USD' }
                ],
                quarterlyBurnRate: 1200000,
                fundingStatus: 'Funded through Phase 2',
                potentialFundingEvents: [
                    { date: '2024-07-15', amount: 30000000, type: 'Capital Raise', probability: 'High' }
                ]
            },
            
            // Educational information
            education: {
                phaseDefinitions: {
                    'Phase 1': 'Initial safety testing in small groups of healthy volunteers or patients',
                    'Phase 2': 'Efficacy testing and expanded safety assessment in larger patient groups',
                    'Phase 3': 'Large-scale efficacy testing compared to standard of care'
                },
                keyTerms: {
                    'Overall Survival': 'Length of time patients are alive after starting treatment',
                    'Progression-Free Survival': 'Length of time patients live without disease worsening',
                    'Interim Analysis': 'Preliminary assessment of data before trial completion'
                }
            },
            
            // Future projections
            projections: {
                nextPhase: {
                    name: 'Phase 3',
                    estimatedStartDate: '2024-02-15',
                    estimatedEndDate: '2027-06-30',
                    estimatedPatientCount: 350,
                    estimatedCost: 45000000,
                    probabilityOfSuccess: 0.65
                },
                marketApproval: {
                    estimatedDate: '2028-03-15',
                    territories: ['US', 'EU', 'Asia-Pacific'],
                    probabilityOfSuccess: 0.45
                },
                revenueProjections: [
                    { year: 2028, amount: 15000000, currency: 'USD' },
                    { year: 2029, amount: 120000000, currency: 'USD' },
                    { year: 2030, amount: 350000000, currency: 'USD' }
                ]
            },
            
            // Original milestones
            milestones: [
                { date: '2019-01-15', event: 'First Patient Enrolled', completed: true, 
                  details: { patientCount: 1, location: 'Bangkok, Thailand' } },
                { date: '2020-03-20', event: 'Interim Analysis', completed: true,
                  details: { patientCount: 32, outcomes: 'Positive safety profile and early efficacy signals' } },
                { date: '2021-05-10', event: 'Primary Endpoint Data', completed: true,
                  details: { patientCount: 45, outcomes: 'Met primary endpoint with statistical significance' } },
                { date: '2022-11-15', event: 'Overall Survival Data', completed: true,
                  details: { patientCount: 68, outcomes: 'Demonstrated survival benefit vs standard of care' } },
                { date: '2023-08-01', event: 'Phase 3 Planning', completed: false,
                  details: { activities: 'Protocol development, site selection, regulatory submissions' } },
                { date: '2024-02-15', event: 'Phase 3 Initiation', completed: false,
                  details: { targetPatientCount: 350, sites: 'Global multi-center trial' } },
                { date: '2025-06-30', event: 'Phase 3 Interim Analysis', completed: false,
                  details: { patientCount: 175, activities: 'Safety and preliminary efficacy assessment' } }
            ]
        },
        {
            id: 'CF33-hNIS',
            name: 'CF33-hNIS (VAXINIA)',
            indication: 'Solid Tumors',
            phase: 'Phase 1',
            status: 'Ongoing',
            startDate: '2021-04-10',
            estimatedEndDate: '2024-12-15',
            
            // Detailed trial information
            detailedInfo: {
                mechanism: 'Oncolytic virus engineered to selectively kill cancer cells',
                patientPopulation: 'Advanced solid tumors refractory to standard treatment',
                primaryEndpoint: 'Safety and Maximum Tolerated Dose',
                secondaryEndpoints: ['Tumor Response', 'Viral Replication', 'Immune Response'],
                trialSites: ['United States', 'Australia'],
                trialPhases: [
                    {
                        name: 'Phase 1',
                        description: 'Dose escalation and safety',
                        completed: false,
                        patientCount: 35,
                        results: 'Ongoing, preliminary data shows good safety profile'
                    }
                ]
            },
            
            // Cost and financial projections
            financials: {
                phaseCosts: [
                    { phase: 'Phase 1', actualCost: 5800000, projectedCost: 7500000, currency: 'USD' },
                    { phase: 'Phase 2', projectedCost: 18000000, currency: 'USD' }
                ],
                quarterlyBurnRate: 950000,
                fundingStatus: 'Funded through Phase 1',
                potentialFundingEvents: [
                    { date: '2024-03-10', amount: 20000000, type: 'Partnership Deal', probability: 'Medium' }
                ]
            },
            
            // Educational information
            education: {
                phaseDefinitions: {
                    'Phase 1': 'Initial safety testing in small groups of healthy volunteers or patients',
                    'Phase 2': 'Efficacy testing and expanded safety assessment in larger patient groups'
                },
                keyTerms: {
                    'Maximum Tolerated Dose': 'Highest dose that does not cause unacceptable side effects',
                    'Dose Escalation': 'Gradually increasing the dose to find the optimal level',
                    'Oncolytic Virus': 'Virus that preferentially infects and kills cancer cells'
                }
            },
            
            // Future projections
            projections: {
                nextPhase: {
                    name: 'Phase 2',
                    estimatedStartDate: '2025-01-15',
                    estimatedEndDate: '2027-03-30',
                    estimatedPatientCount: 120,
                    estimatedCost: 18000000,
                    probabilityOfSuccess: 0.55
                },
                marketApproval: {
                    estimatedDate: '2029-06-15',
                    territories: ['US', 'EU'],
                    probabilityOfSuccess: 0.35
                },
                revenueProjections: [
                    { year: 2029, amount: 8000000, currency: 'USD' },
                    { year: 2030, amount: 75000000, currency: 'USD' },
                    { year: 2031, amount: 180000000, currency: 'USD' }
                ]
            },
            
            // Original milestones with enhanced details
            milestones: [
                { date: '2021-04-10', event: 'First Patient Enrolled', completed: true,
                  details: { patientCount: 1, location: 'City of Hope, California' } },
                { date: '2022-02-25', event: 'Dose Escalation Complete', completed: true,
                  details: { patientCount: 18, outcomes: 'Established safe dose levels for expansion' } },
                { date: '2022-09-18', event: 'Cohort Expansion', completed: true,
                  details: { patientCount: 25, tumorTypes: ['Colorectal', 'Lung', 'Breast', 'Pancreatic'] } },
                { date: '2023-07-05', event: 'Safety Data', completed: true,
                  details: { patientCount: 35, outcomes: 'Favorable safety profile, evidence of viral replication' } },
                { date: '2023-12-20', event: 'Preliminary Efficacy Data', completed: false,
                  details: { targetPatientCount: 35, endpoints: ['Tumor response', 'Biomarker changes'] } },
                { date: '2024-06-30', event: 'Final Data Analysis', completed: false,
                  details: { activities: 'Comprehensive analysis of all endpoints' } },
                { date: '2024-12-15', event: 'Phase 2 Planning', completed: false,
                  details: { activities: 'Protocol development, site selection, regulatory submissions' } }
            ]
        },
        {
            id: 'CHECKvacc',
            name: 'CHECKvacc (CF33-hNIS-antiPDL1)',
            indication: 'Triple Negative Breast Cancer',
            phase: 'Phase 1',
            status: 'Ongoing',
            startDate: '2022-03-15',
            estimatedEndDate: '2025-01-20',
            
            // Detailed trial information
            detailedInfo: {
                mechanism: 'Oncolytic virus expressing anti-PD-L1 antibody to enhance immune response',
                patientPopulation: 'Triple negative breast cancer patients',
                primaryEndpoint: 'Safety and Maximum Tolerated Dose',
                secondaryEndpoints: ['Objective Response Rate', 'Immune Activation', 'PD-L1 Expression'],
                trialSites: ['United States', 'Australia'],
                trialPhases: [
                    {
                        name: 'Phase 1',
                        description: 'Dose escalation and safety',
                        completed: false,
                        patientCount: 22,
                        results: 'Ongoing, preliminary data shows promising immune activation'
                    }
                ]
            },
            
            // Cost and financial projections
            financials: {
                phaseCosts: [
                    { phase: 'Phase 1', actualCost: 4200000, projectedCost: 6800000, currency: 'USD' },
                    { phase: 'Phase 2', projectedCost: 15000000, currency: 'USD' }
                ],
                quarterlyBurnRate: 850000,
                fundingStatus: 'Funded through Phase 1',
                potentialFundingEvents: [
                    { date: '2024-09-20', amount: 15000000, type: 'Capital Raise', probability: 'Medium' }
                ]
            },
            
            // Educational information
            education: {
                phaseDefinitions: {
                    'Phase 1': 'Initial safety testing in small groups of healthy volunteers or patients',
                    'Phase 2': 'Efficacy testing and expanded safety assessment in larger patient groups'
                },
                keyTerms: {
                    'Triple Negative Breast Cancer': 'Breast cancer that tests negative for estrogen receptors, progesterone receptors, and HER2',
                    'PD-L1': 'Protein that helps cancer cells evade immune detection',
                    'Objective Response Rate': 'Percentage of patients whose cancer shrinks or disappears after treatment'
                }
            },
            
            // Future projections
            projections: {
                nextPhase: {
                    name: 'Phase 2',
                    estimatedStartDate: '2025-03-15',
                    estimatedEndDate: '2027-06-30',
                    estimatedPatientCount: 100,
                    estimatedCost: 15000000,
                    probabilityOfSuccess: 0.50
                },
                marketApproval: {
                    estimatedDate: '2029-09-15',
                    territories: ['US', 'EU', 'Australia'],
                    probabilityOfSuccess: 0.30
                },
                revenueProjections: [
                    { year: 2029, amount: 5000000, currency: 'USD' },
                    { year: 2030, amount: 60000000, currency: 'USD' },
                    { year: 2031, amount: 150000000, currency: 'USD' }
                ]
            },
            
            // Original milestones with enhanced details
            milestones: [
                { date: '2022-03-15', event: 'IND Clearance', completed: true,
                  details: { agency: 'FDA', specialDesignations: ['Fast Track'] } },
                { date: '2022-08-10', event: 'First Patient Enrolled', completed: true,
                  details: { patientCount: 1, location: 'MD Anderson Cancer Center' } },
                { date: '2023-04-22', event: 'Dose Escalation Initiation', completed: true,
                  details: { patientCount: 12, doseLevel: 'Second cohort' } },
                { date: '2023-11-30', event: 'Preliminary Safety Data', completed: false,
                  details: { targetPatientCount: 22, endpoints: ['Safety', 'Tolerability'] } },
                { date: '2024-05-15', event: 'Cohort Expansion', completed: false,
                  details: { targetPatientCount: 30, biomarkers: ['PD-L1 expression', 'Immune cell infiltration'] } },
                { date: '2024-10-10', event: 'Interim Analysis', completed: false,
                  details: { activities: 'Analysis of safety and preliminary efficacy' } },
                { date: '2025-01-20', event: 'Preliminary Efficacy Data', completed: false,
                  details: { endpoints: ['Objective response rate', 'Disease control rate'] } }
            ]
        },
        {
            id: 'PD1-Vaxx',
            name: 'PD1-Vaxx',
            indication: 'Non-Small Cell Lung Cancer',
            phase: 'Phase 1',
            status: 'Ongoing',
            startDate: '2020-09-08',
            estimatedEndDate: '2024-08-15',
            
            // Detailed trial information
            detailedInfo: {
                mechanism: 'B-cell peptide vaccine targeting PD-1',
                patientPopulation: 'Non-small cell lung cancer patients',
                primaryEndpoint: 'Safety and Tolerability',
                secondaryEndpoints: ['Immune Response', 'Tumor Response', 'Progression-Free Survival'],
                trialSites: ['United States', 'Australia'],
                trialPhases: [
                    {
                        name: 'Phase 1',
                        description: 'Dose escalation and safety',
                        completed: false,
                        patientCount: 40,
                        results: 'Good safety profile, evidence of immune activation'
                    }
                ]
            },
            
            // Cost and financial projections
            financials: {
                phaseCosts: [
                    { phase: 'Phase 1', actualCost: 6500000, projectedCost: 7200000, currency: 'USD' },
                    { phase: 'Phase 2', projectedCost: 14000000, currency: 'USD' }
                ],
                quarterlyBurnRate: 750000,
                fundingStatus: 'Funded through Phase 1',
                potentialFundingEvents: [
                    { date: '2024-05-10', amount: 18000000, type: 'Partnership Deal', probability: 'High' }
                ]
            },
            
            // Educational information
            education: {
                phaseDefinitions: {
                    'Phase 1': 'Initial safety testing in small groups of healthy volunteers or patients',
                    'Phase 2': 'Efficacy testing and expanded safety assessment in larger patient groups'
                },
                keyTerms: {
                    'PD-1': 'Protein on T cells that helps keep immune responses in check',
                    'Non-Small Cell Lung Cancer': 'The most common type of lung cancer',
                    'Immune Response': 'The body\'s defense against foreign substances and cells'
                }
            },
            
            // Future projections
            projections: {
                nextPhase: {
                    name: 'Phase 2',
                    estimatedStartDate: '2024-09-15',
                    estimatedEndDate: '2026-12-30',
                    estimatedPatientCount: 120,
                    estimatedCost: 14000000,
                    probabilityOfSuccess: 0.60
                },
                marketApproval: {
                    estimatedDate: '2028-12-15',
                    territories: ['US', 'EU', 'Australia'],
                    probabilityOfSuccess: 0.40
                },
                revenueProjections: [
                    { year: 2029, amount: 12000000, currency: 'USD' },
                    { year: 2030, amount: 90000000, currency: 'USD' },
                    { year: 2031, amount: 220000000, currency: 'USD' }
                ]
            },
            
            // Original milestones with enhanced details
            milestones: [
                { date: '2020-09-08', event: 'First Patient Enrolled', completed: true,
                  details: { patientCount: 1, location: 'Monash Medical Centre, Australia' } },
                { date: '2021-06-15', event: 'Dose Escalation Complete', completed: true,
                  details: { patientCount: 16, outcomes: 'Established optimal biological dose' } },
                { date: '2022-02-28', event: 'Cohort Expansion', completed: true,
                  details: { patientCount: 24, biomarkers: ['Anti-PD-1 antibodies', 'T-cell activation'] } },
                { date: '2022-11-10', event: 'Safety Data', completed: true,
                  details: { patientCount: 32, outcomes: 'Well-tolerated with manageable side effects' } },
                { date: '2023-05-20', event: 'Preliminary Efficacy Data', completed: true,
                  details: { patientCount: 40, outcomes: 'Evidence of clinical activity in subset of patients' } },
                { date: '2024-01-15', event: 'Final Data Analysis', completed: false,
                  details: { activities: 'Comprehensive analysis of all endpoints' } },
                { date: '2024-08-15', event: 'Phase 2 Planning', completed: false,
                  details: { activities: 'Protocol development, site selection, regulatory submissions' } }
            ]
        }
    ];

    // Create the enhanced timeline interface
    createEnhancedTimelineInterface(container, enhancedClinicalTrials);

    // Function to create enhanced timeline interface
    function createEnhancedTimelineInterface(container, trials) {
        // Create main layout
        container.innerHTML = '';
        container.className = 'enhanced-clinical-trial-timeline';
        
        // Create header section
        const header = document.createElement('div');
        header.className = 'timeline-header';
        header.innerHTML = `
            <h2>Clinical Trial Timeline</h2>
            <p>Interactive visualization of Imugene's clinical trial portfolio with detailed information and projections</p>
        `;
        container.appendChild(header);
        
        // Create filter and controls section
        const controlsSection = document.createElement('div');
        controlsSection.className = 'timeline-controls';
        controlsSection.innerHTML = `
            <div class="filter-section">
                <div class="filter-group">
                    <label>Phase:</label>
                    <select id="phase-filter">
                        <option value="all">All Phases</option>
                        <option value="Phase 1">Phase 1</option>
                        <option value="Phase 2">Phase 2</option>
                        <option value="Phase 3">Phase 3</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Status:</label>
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Planned">Planned</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>View:</label>
                    <select id="view-option">
                        <option value="gantt">Gantt Chart</option>
                        <option value="timeline">Timeline View</option>
                        <option value="milestones">Milestone Table</option>
                    </select>
                </div>
            </div>
            <div class="display-options">
                <div class="option-group">
                    <label>Display Options:</label>
                    <div class="checkbox-group">
                        <input type="checkbox" id="show-projections" checked>
                        <label for="show-projections">Show Projections</label>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="show-costs" checked>
                        <label for="show-costs">Show Costs</label>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="show-educational-info" checked>
                        <label for="show-educational-info">Show Educational Info</label>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(controlsSection);
        
        // Create visualization container
        const visualizationContainer = document.createElement('div');
        visualizationContainer.className = 'visualization-container';
        container.appendChild(visualizationContainer);
        
        // Create main chart container
        const chartContainer = document.createElement('div');
        chartContainer.id = 'gantt-chart-container';
        chartContainer.className = 'chart-container';
        visualizationContainer.appendChild(chartContainer);
        
        // Create canvas for Gantt chart
        const canvas = document.createElement('canvas');
        canvas.id = 'gantt-chart';
        canvas.height = 400;
        chartContainer.appendChild(canvas);
        
        // Create cost projection container
        const costContainer = document.createElement('div');
        costContainer.id = 'cost-projection-container';
        costContainer.className = 'cost-container';
        visualizationContainer.appendChild(costContainer);
        
        // Create canvas for cost projection
        const costCanvas = document.createElement('canvas');
        costCanvas.id = 'cost-projection-chart';
        costCanvas.height = 200;
        costContainer.appendChild(costCanvas);
        
        // Create detail panel
        const detailPanel = document.createElement('div');
        detailPanel.id = 'detail-panel';
        detailPanel.className = 'detail-panel';
        detailPanel.innerHTML = `
            <div class="panel-header">
                <h3>Trial Details</h3>
                <button id="close-panel">×</button>
            </div>
            <div class="panel-content">
                <p>Hover over a trial or milestone to see details</p>
            </div>
        `;
        container.appendChild(detailPanel);
        
        // Create educational tooltip container
        const tooltipContainer = document.createElement('div');
        tooltipContainer.id = 'educational-tooltip';
        tooltipContainer.className = 'educational-tooltip';
        tooltipContainer.style.display = 'none';
        container.appendChild(tooltipContainer);
        
        // Add event listeners to filters and controls
        document.getElementById('phase-filter').addEventListener('change', updateVisualization);
        document.getElementById('status-filter').addEventListener('change', updateVisualization);
        document.getElementById('view-option').addEventListener('change', updateVisualization);
        document.getElementById('show-projections').addEventListener('change', updateVisualization);
        document.getElementById('show-costs').addEventListener('change', updateVisualization);
        document.getElementById('show-educational-info').addEventListener('change', updateVisualization);
        document.getElementById('close-panel').addEventListener('click', function() {
            document.getElementById('detail-panel').classList.remove('active');
        });
        
        // Initialize visualization
        updateVisualization();
        
        // Function to update visualization based on filters
        function updateVisualization() {
            const phaseFilter = document.getElementById('phase-filter').value;
            const statusFilter = document.getElementById('status-filter').value;
            const viewOption = document.getElementById('view-option').value;
            const showProjections = document.getElementById('show-projections').checked;
            const showCosts = document.getElementById('show-costs').checked;
            const showEducationalInfo = document.getElementById('show-educational-info').checked;
            
            // Filter trials based on selected filters
            const filteredTrials = trials.filter(trial => {
                if (phaseFilter !== 'all' && trial.phase !== phaseFilter) return false;
                if (statusFilter !== 'all' && trial.status !== statusFilter) return false;
                return true;
            });
            
            // Update visibility of cost container
            document.getElementById('cost-projection-container').style.display = 
                showCosts && viewOption === 'gantt' ? 'block' : 'none';
            
            // Render selected view
            switch (viewOption) {
                case 'gantt':
                    renderEnhancedGanttChart(filteredTrials, showProjections, showEducationalInfo);
                    if (showCosts) {
                        renderCostProjection(filteredTrials);
                    }
                    break;
                case 'timeline':
                    renderTimelineView(filteredTrials, showProjections, showEducationalInfo);
                    break;
                case 'milestones':
                    renderMilestoneTable(filteredTrials, showProjections, showEducationalInfo);
                    break;
            }
        }
        
        // Function to render enhanced Gantt chart
        function renderEnhancedGanttChart(trials, showProjections, showEducationalInfo) {
            // Clear previous chart if it exists
            if (window.ganttChart) {
                window.ganttChart.destroy();
            }
            
            // Prepare data for Gantt chart
            const labels = trials.map(trial => trial.name);
            
            // Calculate date range for all trials
            let allDates = [];
            trials.forEach(trial => {
                allDates.push(new Date(trial.startDate));
                allDates.push(new Date(trial.estimatedEndDate));
                
                // Add projected dates if showing projections
                if (showProjections && trial.projections && trial.projections.nextPhase) {
                    allDates.push(new Date(trial.projections.nextPhase.estimatedEndDate));
                }
                
                // Add funding event dates if available
                if (trial.financials && trial.financials.potentialFundingEvents) {
                    trial.financials.potentialFundingEvents.forEach(event => {
                        allDates.push(new Date(event.date));
                    });
                }
            });
            
            const minDate = new Date(Math.min(...allDates));
            const maxDate = new Date(Math.max(...allDates));
            
            // Create datasets for actual trial periods
            const actualDatasets = trials.map((trial, index) => {
                const startDate = new Date(trial.startDate);
                const endDate = new Date(trial.estimatedEndDate);
                
                return {
                    label: `${trial.name} (Actual)`,
                    data: [{
                        x: startDate,
                        y: labels.length - 1 - index,
                        x2: endDate,
                        y2: labels.length - 1 - index,
                        trialId: trial.id
                    }],
                    backgroundColor: getPhaseColor(trial.phase),
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    barPercentage: 0.6
                };
            });
            
            // Create datasets for projected trial periods if showing projections
            const projectionDatasets = [];
            if (showProjections) {
                trials.forEach((trial, index) => {
                    if (trial.projections && trial.projections.nextPhase) {
                        const startDate = new Date(trial.projections.nextPhase.estimatedStartDate);
                        const endDate = new Date(trial.projections.nextPhase.estimatedEndDate);
                        
                        projectionDatasets.push({
                            label: `${trial.name} (Projected)`,
                            data: [{
                                x: startDate,
                                y: labels.length - 1 - index,
                                x2: endDate,
                                y2: labels.length - 1 - index,
                                trialId: trial.id,
                                isProjection: true
                            }],
                            backgroundColor: getPhaseColor(trial.projections.nextPhase.name, true),
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                            borderWidth: 1,
                            borderDash: [5, 5],
                            barPercentage: 0.6
                        });
                    }
                });
            }
            
            // Create milestone markers
            const milestoneDatasets = [];
            trials.forEach((trial, trialIndex) => {
                // Actual milestones
                trial.milestones.forEach((milestone) => {
                    milestoneDatasets.push({
                        label: `${trial.name} - ${milestone.event}`,
                        data: [{
                            x: new Date(milestone.date),
                            y: labels.length - 1 - trialIndex,
                            milestone: milestone,
                            trialId: trial.id
                        }],
                        backgroundColor: milestone.completed ? 'rgba(46, 204, 113, 1)' : 'rgba(255, 206, 86, 1)',
                        borderColor: milestone.completed ? 'rgba(39, 174, 96, 1)' : 'rgba(241, 196, 15, 1)',
                        borderWidth: 1,
                        pointStyle: 'rectRot',
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        type: 'scatter'
                    });
                });
                
                // Funding event markers if showing projections
                if (showProjections && trial.financials && trial.financials.potentialFundingEvents) {
                    trial.financials.potentialFundingEvents.forEach((event) => {
                        milestoneDatasets.push({
                            label: `${trial.name} - ${event.type} ($${(event.amount / 1000000).toFixed(1)}M)`,
                            data: [{
                                x: new Date(event.date),
                                y: labels.length - 1 - trialIndex,
                                fundingEvent: event,
                                trialId: trial.id
                            }],
                            backgroundColor: 'rgba(52, 152, 219, 1)',
                            borderColor: 'rgba(41, 128, 185, 1)',
                            borderWidth: 1,
                            pointStyle: 'triangle',
                            pointRadius: 8,
                            pointHoverRadius: 10,
                            type: 'scatter'
                        });
                    });
                }
            });
            
            // Add vertical line for today's date
            const todayDataset = {
                label: 'Today',
                data: [{
                    x: new Date(),
                    y: -0.5
                }, {
                    x: new Date(),
                    y: labels.length - 0.5
                }],
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                type: 'line',
                pointRadius: 0
            };
            
            // Create Gantt chart
            const ctx = document.getElementById('gantt-chart').getContext('2d');
            window.ganttChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [...actualDatasets, ...projectionDatasets, ...milestoneDatasets, todayDataset]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month',
                                displayFormats: {
                                    month: 'MMM yyyy'
                                }
                            },
                            min: minDate,
                            max: maxDate,
                            title: {
                                display: true,
                                text: 'Timeline'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Clinical Trials'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            external: externalTooltipHandler
                        }
                    },
                    onClick: handleChartClick
                }
            });
            
            // Add hover event listener to chart
            const chartElement = document.getElementById('gantt-chart');
            chartElement.addEventListener('mousemove', handleChartHover);
            chartElement.addEventListener('mouseout', handleChartMouseOut);
            
            // Function to handle chart hover
            function handleChartHover(event) {
                const points = window.ganttChart.getElementsAtEventForMode(
                    event, 
                    'nearest', 
                    { intersect: true }, 
                    false
                );
                
                if (points.length) {
                    const firstPoint = points[0];
                    const dataset = window.ganttChart.data.datasets[firstPoint.datasetIndex];
                    const data = dataset.data[firstPoint.index];
                    
                    // Show educational tooltip if enabled
                    if (showEducationalInfo && (data.milestone || data.isProjection)) {
                        showEducationalTooltip(event, data, dataset);
                    }
                    
                    // Update detail panel
                    updateDetailPanel(data, dataset);
                }
            }
            
            // Function to handle chart mouse out
            function handleChartMouseOut() {
                // Hide educational tooltip
                document.getElementById('educational-tooltip').style.display = 'none';
            }
            
            // Function to handle chart click
            function handleChartClick(event) {
                const points = window.ganttChart.getElementsAtEventForMode(
                    event, 
                    'nearest', 
                    { intersect: true }, 
                    false
                );
                
                if (points.length) {
                    const firstPoint = points[0];
                    const dataset = window.ganttChart.data.datasets[firstPoint.datasetIndex];
                    const data = dataset.data[firstPoint.index];
                    
                    // Show detailed view for the trial
                    if (data.trialId) {
                        const trial = trials.find(t => t.id === data.trialId);
                        if (trial) {
                            showDetailedView(trial, data);
                        }
                    }
                }
            }
            
            // Function to handle external tooltips
            function externalTooltipHandler(context) {
                // This function intentionally left empty as we're using custom tooltips
                // The tooltip is disabled in the chart options
            }
            
            // Function to show educational tooltip
            function showEducationalTooltip(event, data, dataset) {
                const tooltip = document.getElementById('educational-tooltip');
                
                // Set tooltip content based on data type
                let content = '';
                
                if (data.milestone) {
                    const milestone = data.milestone;
                    content = `
                        <h4>${milestone.event}</h4>
                        <p><strong>Date:</strong> ${formatDate(milestone.date)}</p>
                        <p><strong>Status:</strong> ${milestone.completed ? 'Completed' : 'Pending'}</p>
                    `;
                    
                    if (milestone.details) {
                        if (milestone.details.patientCount) {
                            content += `<p><strong>Patient Count:</strong> ${milestone.details.patientCount}</p>`;
                        }
                        if (milestone.details.outcomes) {
                            content += `<p><strong>Outcomes:</strong> ${milestone.details.outcomes}</p>`;
                        }
                    }
                } else if (data.isProjection) {
                    const trial = trials.find(t => t.id === data.trialId);
                    if (trial && trial.projections && trial.projections.nextPhase) {
                        const nextPhase = trial.projections.nextPhase;
                        content = `
                            <h4>${nextPhase.name} (Projected)</h4>
                            <p><strong>Timeline:</strong> ${formatDate(nextPhase.estimatedStartDate)} - ${formatDate(nextPhase.estimatedEndDate)}</p>
                            <p><strong>Estimated Patients:</strong> ${nextPhase.estimatedPatientCount}</p>
                            <p><strong>Estimated Cost:</strong> $${(nextPhase.estimatedCost / 1000000).toFixed(1)}M</p>
                            <p><strong>Success Probability:</strong> ${(nextPhase.probabilityOfSuccess * 100).toFixed(0)}%</p>
                        `;
                    }
                } else if (data.fundingEvent) {
                    const event = data.fundingEvent;
                    content = `
                        <h4>${event.type}</h4>
                        <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                        <p><strong>Amount:</strong> $${(event.amount / 1000000).toFixed(1)}M</p>
                        <p><strong>Probability:</strong> ${event.probability}</p>
                    `;
                }
                
                // Set tooltip content and position
                tooltip.innerHTML = content;
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.offsetX + 10}px`;
                tooltip.style.top = `${event.offsetY + 10}px`;
            }
            
            // Function to update detail panel
            function updateDetailPanel(data, dataset) {
                if (!data.trialId) return;
                
                const trial = trials.find(t => t.id === data.trialId);
                if (!trial) return;
                
                const panel = document.getElementById('detail-panel');
                const content = panel.querySelector('.panel-content');
                
                let html = `
                    <h3>${trial.name}</h3>
                    <p><strong>Indication:</strong> ${trial.indication}</p>
                    <p><strong>Phase:</strong> ${trial.phase}</p>
                    <p><strong>Status:</strong> ${trial.status}</p>
                    <p><strong>Timeline:</strong> ${formatDate(trial.startDate)} - ${formatDate(trial.estimatedEndDate)}</p>
                `;
                
                if (trial.detailedInfo) {
                    html += `
                        <h4>Detailed Information</h4>
                        <p><strong>Mechanism:</strong> ${trial.detailedInfo.mechanism}</p>
                        <p><strong>Patient Population:</strong> ${trial.detailedInfo.patientPopulation}</p>
                        <p><strong>Primary Endpoint:</strong> ${trial.detailedInfo.primaryEndpoint}</p>
                    `;
                }
                
                if (data.milestone) {
                    const milestone = data.milestone;
                    html += `
                        <h4>Milestone: ${milestone.event}</h4>
                        <p><strong>Date:</strong> ${formatDate(milestone.date)}</p>
                        <p><strong>Status:</strong> ${milestone.completed ? 'Completed' : 'Pending'}</p>
                    `;
                    
                    if (milestone.details) {
                        html += `<h5>Details</h5>`;
                        Object.entries(milestone.details).forEach(([key, value]) => {
                            html += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
                        });
                    }
                }
                
                if (data.fundingEvent) {
                    const event = data.fundingEvent;
                    html += `
                        <h4>Funding Event: ${event.type}</h4>
                        <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                        <p><strong>Amount:</strong> $${(event.amount / 1000000).toFixed(1)}M</p>
                        <p><strong>Probability:</strong> ${event.probability}</p>
                    `;
                }
                
                html += `<button class="view-details-btn" data-trial-id="${trial.id}">View Full Details</button>`;
                
                content.innerHTML = html;
                panel.classList.add('active');
                
                // Add event listener to the view details button
                const detailsBtn = content.querySelector('.view-details-btn');
                detailsBtn.addEventListener('click', function() {
                    const trialId = this.getAttribute('data-trial-id');
                    const trial = trials.find(t => t.id === trialId);
                    if (trial) {
                        showDetailedView(trial);
                    }
                });
            }
            
            // Function to show detailed view
            function showDetailedView(trial, data) {
                // Create modal container if it doesn't exist
                let modal = document.getElementById('trial-detail-modal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.id = 'trial-detail-modal';
                    modal.className = 'modal';
                    document.body.appendChild(modal);
                }
                
                // Create tabs for different sections
                const tabs = [
                    { id: 'overview', label: 'Overview', active: true },
                    { id: 'milestones', label: 'Milestones', active: false },
                    { id: 'financials', label: 'Financials', active: false },
                    { id: 'projections', label: 'Projections', active: false }
                ];
                
                let tabsHtml = '<div class="modal-tabs">';
                tabs.forEach(tab => {
                    tabsHtml += `<button class="tab-btn ${tab.active ? 'active' : ''}" data-tab="${tab.id}">${tab.label}</button>`;
                });
                tabsHtml += '</div>';
                
                // Create content for each tab
                let tabContentHtml = '<div class="tab-content">';
                
                // Overview tab
                tabContentHtml += `
                    <div id="overview-tab" class="tab-pane ${tabs[0].active ? 'active' : ''}">
                        <h3>${trial.name}</h3>
                        <div class="overview-grid">
                            <div class="overview-section">
                                <h4>Trial Information</h4>
                                <p><strong>Indication:</strong> ${trial.indication}</p>
                                <p><strong>Phase:</strong> ${trial.phase}</p>
                                <p><strong>Status:</strong> ${trial.status}</p>
                                <p><strong>Timeline:</strong> ${formatDate(trial.startDate)} - ${formatDate(trial.estimatedEndDate)}</p>
                                
                                <h4>Detailed Information</h4>
                                <p><strong>Mechanism:</strong> ${trial.detailedInfo.mechanism}</p>
                                <p><strong>Patient Population:</strong> ${trial.detailedInfo.patientPopulation}</p>
                                <p><strong>Primary Endpoint:</strong> ${trial.detailedInfo.primaryEndpoint}</p>
                                <p><strong>Secondary Endpoints:</strong> ${trial.detailedInfo.secondaryEndpoints.join(', ')}</p>
                                <p><strong>Trial Sites:</strong> ${trial.detailedInfo.trialSites.join(', ')}</p>
                            </div>
                            
                            <div class="overview-section">
                                <h4>Trial Phases</h4>
                                <table class="detail-table">
                                    <thead>
                                        <tr>
                                            <th>Phase</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Patients</th>
                                            <th>Results</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                `;
                
                trial.detailedInfo.trialPhases.forEach(phase => {
                    tabContentHtml += `
                        <tr>
                            <td>${phase.name}</td>
                            <td>${phase.description}</td>
                            <td>${phase.completed ? 'Completed' : 'Ongoing'}</td>
                            <td>${phase.patientCount}</td>
                            <td>${phase.results}</td>
                        </tr>
                    `;
                });
                
                tabContentHtml += `
                                    </tbody>
                                </table>
                                
                                <h4>Educational Information</h4>
                                <div class="educational-section">
                                    <h5>Phase Definitions</h5>
                `;
                
                Object.entries(trial.education.phaseDefinitions).forEach(([phase, definition]) => {
                    tabContentHtml += `
                        <div class="term-definition">
                            <span class="term">${phase}:</span>
                            <span class="definition">${definition}</span>
                        </div>
                    `;
                });
                
                tabContentHtml += `
                                    <h5>Key Terms</h5>
                `;
                
                Object.entries(trial.education.keyTerms).forEach(([term, definition]) => {
                    tabContentHtml += `
                        <div class="term-definition">
                            <span class="term">${term}:</span>
                            <span class="definition">${definition}</span>
                        </div>
                    `;
                });
                
                tabContentHtml += `
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Milestones tab
                tabContentHtml += `
                    <div id="milestones-tab" class="tab-pane ${tabs[1].active ? 'active' : ''}">
                        <h3>${trial.name} - Milestones</h3>
                        <table class="detail-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Milestone</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                
                // Sort milestones by date
                const sortedMilestones = [...trial.milestones].sort((a, b) => 
                    new Date(a.date) - new Date(b.date)
                );
                
                sortedMilestones.forEach(milestone => {
                    let detailsHtml = '';
                    if (milestone.details) {
                        Object.entries(milestone.details).forEach(([key, value]) => {
                            detailsHtml += `<div><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</div>`;
                        });
                    }
                    
                    tabContentHtml += `
                        <tr class="${milestone.completed ? 'completed' : 'pending'}">
                            <td>${formatDate(milestone.date)}</td>
                            <td>${milestone.event}</td>
                            <td>${milestone.completed ? 'Completed' : 'Pending'}</td>
                            <td>${detailsHtml}</td>
                        </tr>
                    `;
                });
                
                tabContentHtml += `
                            </tbody>
                        </table>
                    </div>
                `;
                
                // Financials tab
                tabContentHtml += `
                    <div id="financials-tab" class="tab-pane ${tabs[2].active ? 'active' : ''}">
                        <h3>${trial.name} - Financial Information</h3>
                        <div class="financials-grid">
                            <div class="financials-section">
                                <h4>Phase Costs</h4>
                                <table class="detail-table">
                                    <thead>
                                        <tr>
                                            <th>Phase</th>
                                            <th>Actual Cost</th>
                                            <th>Projected Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                `;
                
                trial.financials.phaseCosts.forEach(cost => {
                    tabContentHtml += `
                        <tr>
                            <td>${cost.phase}</td>
                            <td>${cost.actualCost ? '$' + (cost.actualCost / 1000000).toFixed(1) + 'M' : '-'}</td>
                            <td>${cost.projectedCost ? '$' + (cost.projectedCost / 1000000).toFixed(1) + 'M' : '-'}</td>
                        </tr>
                    `;
                });
                
                tabContentHtml += `
                                    </tbody>
                                </table>
                                
                                <h4>Burn Rate</h4>
                                <p>Quarterly Burn Rate: $${(trial.financials.quarterlyBurnRate / 1000000).toFixed(1)}M</p>
                                <p>Funding Status: ${trial.financials.fundingStatus}</p>
                            </div>
                            
                            <div class="financials-section">
                                <h4>Potential Funding Events</h4>
                                <table class="detail-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Probability</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                `;
                
                trial.financials.potentialFundingEvents.forEach(event => {
                    tabContentHtml += `
                        <tr>
                            <td>${formatDate(event.date)}</td>
                            <td>${event.type}</td>
                            <td>$${(event.amount / 1000000).toFixed(1)}M</td>
                            <td>${event.probability}</td>
                        </tr>
                    `;
                });
                
                tabContentHtml += `
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                
                // Projections tab
                tabContentHtml += `
                    <div id="projections-tab" class="tab-pane ${tabs[3].active ? 'active' : ''}">
                        <h3>${trial.name} - Future Projections</h3>
                        <div class="projections-grid">
                            <div class="projections-section">
                                <h4>Next Phase: ${trial.projections.nextPhase.name}</h4>
                                <p><strong>Timeline:</strong> ${formatDate(trial.projections.nextPhase.estimatedStartDate)} - ${formatDate(trial.projections.nextPhase.estimatedEndDate)}</p>
                                <p><strong>Estimated Patient Count:</strong> ${trial.projections.nextPhase.estimatedPatientCount}</p>
                                <p><strong>Estimated Cost:</strong> $${(trial.projections.nextPhase.estimatedCost / 1000000).toFixed(1)}M</p>
                                <p><strong>Probability of Success:</strong> ${(trial.projections.nextPhase.probabilityOfSuccess * 100).toFixed(0)}%</p>
                                
                                <h4>Market Approval</h4>
                                <p><strong>Estimated Date:</strong> ${formatDate(trial.projections.marketApproval.estimatedDate)}</p>
                                <p><strong>Territories:</strong> ${trial.projections.marketApproval.territories.join(', ')}</p>
                                <p><strong>Probability of Success:</strong> ${(trial.projections.marketApproval.probabilityOfSuccess * 100).toFixed(0)}%</p>
                            </div>
                            
                            <div class="projections-section">
                                <h4>Revenue Projections</h4>
                                <table class="detail-table">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Projected Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                `;
                
                trial.projections.revenueProjections.forEach(projection => {
                    tabContentHtml += `
                        <tr>
                            <td>${projection.year}</td>
                            <td>$${(projection.amount / 1000000).toFixed(1)}M</td>
                        </tr>
                    `;
                });
                
                tabContentHtml += `
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                
                tabContentHtml += '</div>';
                
                // Create modal content
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>${trial.name} - Detailed Information</h2>
                            <button class="close-modal">×</button>
                        </div>
                        ${tabsHtml}
                        ${tabContentHtml}
                    </div>
                `;
                
                // Show modal
                modal.style.display = 'block';
                
                // Add event listeners
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
                
                const tabBtns = modal.querySelectorAll('.tab-btn');
                tabBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const tabId = this.getAttribute('data-tab');
                        
                        // Update active tab button
                        tabBtns.forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Update active tab content
                        const tabPanes = modal.querySelectorAll('.tab-pane');
                        tabPanes.forEach(pane => pane.classList.remove('active'));
                        modal.querySelector(`#${tabId}-tab`).classList.add('active');
                    });
                });
                
                // Close modal when clicking outside
                window.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }
        }
        
        // Function to render cost projection
        function renderCostProjection(trials) {
            // Clear previous chart if it exists
            if (window.costChart) {
                window.costChart.destroy();
            }
            
            // Prepare data for cost projection
            const labels = [];
            const actualCostData = [];
            const projectedCostData = [];
            const fundingEvents = [];
            
            // Calculate quarterly dates from min to max date
            const allDates = [];
            trials.forEach(trial => {
                allDates.push(new Date(trial.startDate));
                allDates.push(new Date(trial.estimatedEndDate));
                
                if (trial.projections && trial.projections.nextPhase) {
                    allDates.push(new Date(trial.projections.nextPhase.estimatedEndDate));
                }
                
                if (trial.financials && trial.financials.potentialFundingEvents) {
                    trial.financials.potentialFundingEvents.forEach(event => {
                        allDates.push(new Date(event.date));
                        
                        // Add funding events
                        fundingEvents.push({
                            date: new Date(event.date),
                            amount: event.amount,
                            type: event.type,
                            trialId: trial.id,
                            trialName: trial.name
                        });
                    });
                }
            });
            
            const minDate = new Date(Math.min(...allDates));
            const maxDate = new Date(Math.max(...allDates));
            
            // Generate quarterly dates
            const quarters = [];
            let currentDate = new Date(minDate);
            while (currentDate <= maxDate) {
                quarters.push(new Date(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 3);
            }
            
            // Calculate cumulative costs for each quarter
            quarters.forEach((quarter, index) => {
                labels.push(quarter);
                
                let actualCost = 0;
                let projectedCost = 0;
                
                trials.forEach(trial => {
                    // Calculate actual costs
                    if (trial.financials && trial.financials.phaseCosts) {
                        trial.financials.phaseCosts.forEach(phaseCost => {
                            if (phaseCost.actualCost) {
                                // Distribute actual costs evenly across quarters for the phase
                                const phaseStartDate = getPhaseStartDate(trial, phaseCost.phase);
                                const phaseEndDate = getPhaseEndDate(trial, phaseCost.phase);
                                
                                if (phaseStartDate && phaseEndDate && quarter >= phaseStartDate && quarter <= phaseEndDate) {
                                    const phaseQuarters = getQuartersBetweenDates(phaseStartDate, phaseEndDate);
                                    actualCost += phaseCost.actualCost / phaseQuarters;
                                }
                            }
                        });
                    }
                    
                    // Calculate projected costs
                    if (trial.financials && trial.financials.phaseCosts) {
                        trial.financials.phaseCosts.forEach(phaseCost => {
                            if (phaseCost.projectedCost && !phaseCost.actualCost) {
                                // Distribute projected costs evenly across quarters for the phase
                                const phaseStartDate = getPhaseStartDate(trial, phaseCost.phase);
                                const phaseEndDate = getPhaseEndDate(trial, phaseCost.phase);
                                
                                if (phaseStartDate && phaseEndDate && quarter >= phaseStartDate && quarter <= phaseEndDate) {
                                    const phaseQuarters = getQuartersBetweenDates(phaseStartDate, phaseEndDate);
                                    projectedCost += phaseCost.projectedCost / phaseQuarters;
                                }
                            }
                        });
                    }
                    
                    // Add quarterly burn rate
                    if (trial.financials && trial.financials.quarterlyBurnRate) {
                        const trialStartDate = new Date(trial.startDate);
                        const trialEndDate = trial.projections && trial.projections.nextPhase ? 
                            new Date(trial.projections.nextPhase.estimatedEndDate) : 
                            new Date(trial.estimatedEndDate);
                        
                        if (quarter >= trialStartDate && quarter <= trialEndDate) {
                            actualCost += trial.financials.quarterlyBurnRate;
                        }
                    }
                });
                
                // Add cumulative costs
                if (index === 0) {
                    actualCostData.push(actualCost);
                    projectedCostData.push(projectedCost);
                } else {
                    actualCostData.push(actualCostData[index - 1] + actualCost);
                    projectedCostData.push(projectedCostData[index - 1] + projectedCost);
                }
            });
            
            // Create funding event markers
            const fundingMarkers = fundingEvents.map(event => ({
                x: event.date,
                y: getCumulativeCostAtDate(event.date, quarters, actualCostData, projectedCostData),
                event: event
            }));
            
            // Create cost projection chart
            const ctx = document.getElementById('cost-projection-chart').getContext('2d');
            window.costChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Actual Costs',
                            data: actualCostData,
                            borderColor: 'rgba(231, 76, 60, 1)',
                            backgroundColor: 'rgba(231, 76, 60, 0.1)',
                            borderWidth: 2,
                            fill: true
                        },
                        {
                            label: 'Projected Costs',
                            data: projectedCostData,
                            borderColor: 'rgba(231, 76, 60, 0.5)',
                            backgroundColor: 'rgba(231, 76, 60, 0.05)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: true
                        },
                        {
                            label: 'Funding Events',
                            data: fundingMarkers,
                            backgroundColor: 'rgba(52, 152, 219, 1)',
                            borderColor: 'rgba(41, 128, 185, 1)',
                            borderWidth: 1,
                            pointStyle: 'triangle',
                            pointRadius: 8,
                            pointHoverRadius: 10,
                            type: 'scatter'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'quarter',
                                displayFormats: {
                                    quarter: 'MMM yyyy'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Timeline'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Cumulative Cost (USD)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000000).toFixed(1) + 'M';
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const dataset = context.dataset;
                                    const data = context.raw;
                                    
                                    if (dataset.type === 'scatter') {
                                        const event = data.event;
                                        return [
                                            `${event.trialName} - ${event.type}`,
                                            `Amount: $${(event.amount / 1000000).toFixed(1)}M`,
                                            `Date: ${formatDate(event.date)}`
                                        ];
                                    } else {
                                        return `${dataset.label}: $${(context.parsed.y / 1000000).toFixed(1)}M`;
                                    }
                                }
                            }
                        }
                    }
                }
            });
            
            // Helper function to get phase start date
            function getPhaseStartDate(trial, phaseName) {
                if (phaseName === trial.phase) {
                    return new Date(trial.startDate);
                } else if (trial.projections && trial.projections.nextPhase && phaseName === trial.projections.nextPhase.name) {
                    return new Date(trial.projections.nextPhase.estimatedStartDate);
                }
                return null;
            }
            
            // Helper function to get phase end date
            function getPhaseEndDate(trial, phaseName) {
                if (phaseName === trial.phase) {
                    return new Date(trial.estimatedEndDate);
                } else if (trial.projections && trial.projections.nextPhase && phaseName === trial.projections.nextPhase.name) {
                    return new Date(trial.projections.nextPhase.estimatedEndDate);
                }
                return null;
            }
            
            // Helper function to get quarters between dates
            function getQuartersBetweenDates(startDate, endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                let quarters = 0;
                
                while (start <= end) {
                    quarters++;
                    start.setMonth(start.getMonth() + 3);
                }
                
                return Math.max(1, quarters);
            }
            
            // Helper function to get cumulative cost at date
            function getCumulativeCostAtDate(date, quarters, actualCostData, projectedCostData) {
                for (let i = 0; i < quarters.length; i++) {
                    if (date <= quarters[i]) {
                        return actualCostData[i] + projectedCostData[i];
                    }
                }
                return actualCostData[actualCostData.length - 1] + projectedCostData[projectedCostData.length - 1];
            }
        }
        
        // Function to render timeline view (simplified version)
        function renderTimelineView(trials, showProjections, showEducationalInfo) {
            const container = document.getElementById('gantt-chart-container');
            container.innerHTML = '';
            
            const timelineEl = document.createElement('div');
            timelineEl.className = 'timeline';
            container.appendChild(timelineEl);
            
            // Sort trials by start date
            const sortedTrials = [...trials].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            
            // Create timeline items
            sortedTrials.forEach(trial => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.setAttribute('data-trial-id', trial.id);
                
                const timelineContent = document.createElement('div');
                timelineContent.className = 'timeline-content';
                
                const header = document.createElement('div');
                header.className = 'timeline-header';
                
                const title = document.createElement('h4');
                title.textContent = trial.name;
                header.appendChild(title);
                
                const phase = document.createElement('span');
                phase.className = 'badge';
                phase.textContent = trial.phase;
                phase.style.backgroundColor = getPhaseColor(trial.phase);
                header.appendChild(phase);
                
                timelineContent.appendChild(header);
                
                const details = document.createElement('div');
                details.className = 'timeline-details';
                details.innerHTML = `
                    <p><strong>Indication:</strong> ${trial.indication}</p>
                    <p><strong>Status:</strong> ${trial.status}</p>
                    <p><strong>Start Date:</strong> ${formatDate(trial.startDate)}</p>
                    <p><strong>Estimated End Date:</strong> ${formatDate(trial.estimatedEndDate)}</p>
                `;
                
                if (trial.detailedInfo) {
                    details.innerHTML += `
                        <p><strong>Mechanism:</strong> ${trial.detailedInfo.mechanism}</p>
                        <p><strong>Primary Endpoint:</strong> ${trial.detailedInfo.primaryEndpoint}</p>
                    `;
                }
                
                timelineContent.appendChild(details);
                
                const milestones = document.createElement('div');
                milestones.className = 'timeline-milestones';
                
                const milestonesTitle = document.createElement('h5');
                milestonesTitle.textContent = 'Key Milestones';
                milestones.appendChild(milestonesTitle);
                
                const milestonesList = document.createElement('ul');
                trial.milestones.forEach(milestone => {
                    const milestoneItem = document.createElement('li');
                    milestoneItem.className = milestone.completed ? 'completed' : 'pending';
                    milestoneItem.innerHTML = `
                        <span class="milestone-date">${formatDate(milestone.date)}</span>
                        <span class="milestone-event">${milestone.event}</span>
                        <span class="milestone-status">${milestone.completed ? '✓' : 'Pending'}</span>
                    `;
                    
                    // Add hover event for educational info
                    if (showEducationalInfo && milestone.details) {
                        milestoneItem.setAttribute('data-tooltip', JSON.stringify(milestone.details));
                        milestoneItem.addEventListener('mouseenter', showMilestoneTooltip);
                        milestoneItem.addEventListener('mouseleave', hideMilestoneTooltip);
                    }
                    
                    milestonesList.appendChild(milestoneItem);
                });
                milestones.appendChild(milestonesList);
                
                timelineContent.appendChild(milestones);
                
                // Add projections if enabled
                if (showProjections && trial.projections && trial.projections.nextPhase) {
                    const projections = document.createElement('div');
                    projections.className = 'timeline-projections';
                    
                    const projectionsTitle = document.createElement('h5');
                    projectionsTitle.textContent = 'Future Projections';
                    projections.appendChild(projectionsTitle);
                    
                    const nextPhase = trial.projections.nextPhase;
                    projections.innerHTML += `
                        <div class="projection-item">
                            <p><strong>Next Phase:</strong> ${nextPhase.name}</p>
                            <p><strong>Timeline:</strong> ${formatDate(nextPhase.estimatedStartDate)} - ${formatDate(nextPhase.estimatedEndDate)}</p>
                            <p><strong>Estimated Patients:</strong> ${nextPhase.estimatedPatientCount}</p>
                            <p><strong>Success Probability:</strong> ${(nextPhase.probabilityOfSuccess * 100).toFixed(0)}%</p>
                        </div>
                    `;
                    
                    timelineContent.appendChild(projections);
                }
                
                // Add view details button
                const viewDetailsBtn = document.createElement('button');
                viewDetailsBtn.className = 'view-details-btn';
                viewDetailsBtn.textContent = 'View Full Details';
                viewDetailsBtn.addEventListener('click', function() {
                    const trialId = this.closest('.timeline-item').getAttribute('data-trial-id');
                    const trial = trials.find(t => t.id === trialId);
                    if (trial) {
                        showDetailedView(trial);
                    }
                });
                timelineContent.appendChild(viewDetailsBtn);
                
                timelineItem.appendChild(timelineContent);
                timelineEl.appendChild(timelineItem);
            });
            
            // Function to show milestone tooltip
            function showMilestoneTooltip(event) {
                const tooltip = document.getElementById('educational-tooltip');
                const details = JSON.parse(this.getAttribute('data-tooltip'));
                
                let content = '<h4>Milestone Details</h4>';
                Object.entries(details).forEach(([key, value]) => {
                    content += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
                });
                
                tooltip.innerHTML = content;
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.clientX + 10}px`;
                tooltip.style.top = `${event.clientY + 10}px`;
            }
            
            // Function to hide milestone tooltip
            function hideMilestoneTooltip() {
                document.getElementById('educational-tooltip').style.display = 'none';
            }
        }
        
        // Function to render milestone table (simplified version)
        function renderMilestoneTable(trials, showProjections, showEducationalInfo) {
            const container = document.getElementById('gantt-chart-container');
            container.innerHTML = '';
            
            const tableContainer = document.createElement('div');
            tableContainer.className = 'milestone-table-container';
            container.appendChild(tableContainer);
            
            const table = document.createElement('table');
            table.className = 'milestone-table';
            tableContainer.appendChild(table);
            
            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            const headers = ['Trial', 'Phase', 'Milestone', 'Date', 'Status', 'Details'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Create table body
            const tbody = document.createElement('tbody');
            
            // Collect all milestones from all trials
            const allMilestones = [];
            trials.forEach(trial => {
                trial.milestones.forEach(milestone => {
                    allMilestones.push({
                        trial: trial.name,
                        trialId: trial.id,
                        phase: trial.phase,
                        milestone: milestone.event,
                        date: milestone.date,
                        completed: milestone.completed,
                        details: milestone.details
                    });
                });
                
                // Add projected milestones if enabled
                if (showProjections && trial.projections && trial.projections.nextPhase) {
                    const nextPhase = trial.projections.nextPhase;
                    allMilestones.push({
                        trial: trial.name,
                        trialId: trial.id,
                        phase: nextPhase.name,
                        milestone: `${nextPhase.name} Start`,
                        date: nextPhase.estimatedStartDate,
                        completed: false,
                        isProjection: true,
                        details: {
                            estimatedPatientCount: nextPhase.estimatedPatientCount,
                            estimatedCost: `$${(nextPhase.estimatedCost / 1000000).toFixed(1)}M`,
                            probabilityOfSuccess: `${(nextPhase.probabilityOfSuccess * 100).toFixed(0)}%`
                        }
                    });
                    
                    allMilestones.push({
                        trial: trial.name,
                        trialId: trial.id,
                        phase: nextPhase.name,
                        milestone: `${nextPhase.name} End`,
                        date: nextPhase.estimatedEndDate,
                        completed: false,
                        isProjection: true,
                        details: {
                            estimatedPatientCount: nextPhase.estimatedPatientCount,
                            estimatedCost: `$${(nextPhase.estimatedCost / 1000000).toFixed(1)}M`,
                            probabilityOfSuccess: `${(nextPhase.probabilityOfSuccess * 100).toFixed(0)}%`
                        }
                    });
                }
            });
            
            // Sort milestones by date
            allMilestones.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Create table rows
            allMilestones.forEach(milestone => {
                const row = document.createElement('tr');
                row.className = milestone.isProjection ? 'projection' : (milestone.completed ? 'completed' : 'pending');
                
                const trialCell = document.createElement('td');
                trialCell.textContent = milestone.trial;
                row.appendChild(trialCell);
                
                const phaseCell = document.createElement('td');
                phaseCell.innerHTML = `
                    <span class="phase-badge" style="background-color: ${getPhaseColor(milestone.phase, milestone.isProjection)}">${milestone.phase}</span>
                `;
                
                // Add educational tooltip for phase if enabled
                if (showEducationalInfo) {
                    const trial = trials.find(t => t.id === milestone.trialId);
                    if (trial && trial.education && trial.education.phaseDefinitions[milestone.phase]) {
                        phaseCell.setAttribute('data-tooltip', trial.education.phaseDefinitions[milestone.phase]);
                        phaseCell.addEventListener('mouseenter', showPhaseTooltip);
                        phaseCell.addEventListener('mouseleave', hidePhaseTooltip);
                    }
                }
                
                row.appendChild(phaseCell);
                
                const milestoneCell = document.createElement('td');
                milestoneCell.textContent = milestone.milestone;
                row.appendChild(milestoneCell);
                
                const dateCell = document.createElement('td');
                dateCell.textContent = formatDate(milestone.date);
                row.appendChild(dateCell);
                
                const statusCell = document.createElement('td');
                statusCell.className = milestone.completed ? 'completed-status' : 'pending-status';
                statusCell.textContent = milestone.isProjection ? 'Projected' : (milestone.completed ? 'Completed' : 'Pending');
                row.appendChild(statusCell);
                
                const detailsCell = document.createElement('td');
                if (milestone.details) {
                    const detailsList = document.createElement('ul');
                    detailsList.className = 'details-list';
                    
                    Object.entries(milestone.details).forEach(([key, value]) => {
                        const detailItem = document.createElement('li');
                        detailItem.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}`;
                        detailsList.appendChild(detailItem);
                    });
                    
                    detailsCell.appendChild(detailsList);
                } else {
                    detailsCell.textContent = '-';
                }
                row.appendChild(detailsCell);
                
                // Add click event to show detailed view
                row.addEventListener('click', function() {
                    const trial = trials.find(t => t.id === milestone.trialId);
                    if (trial) {
                        showDetailedView(trial);
                    }
                });
                
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            
            // Function to show phase tooltip
            function showPhaseTooltip(event) {
                const tooltip = document.getElementById('educational-tooltip');
                const definition = this.getAttribute('data-tooltip');
                
                tooltip.innerHTML = `
                    <h4>${this.querySelector('.phase-badge').textContent}</h4>
                    <p>${definition}</p>
                `;
                
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.clientX + 10}px`;
                tooltip.style.top = `${event.clientY + 10}px`;
            }
            
            // Function to hide phase tooltip
            function hidePhaseTooltip() {
                document.getElementById('educational-tooltip').style.display = 'none';
            }
        }
        
        // Helper function to get color based on phase
        function getPhaseColor(phase, isProjection = false) {
            let color;
            switch (phase) {
                case 'Phase 1':
                    color = 'rgba(52, 152, 219, 0.8)'; // Blue
                    break;
                case 'Phase 2':
                    color = 'rgba(155, 89, 182, 0.8)'; // Purple
                    break;
                case 'Phase 3':
                    color = 'rgba(46, 204, 113, 0.8)'; // Green
                    break;
                default:
                    color = 'rgba(149, 165, 166, 0.8)'; // Gray
            }
            
            // Make color more transparent if it's a projection
            if (isProjection) {
                color = color.replace('0.8', '0.4');
            }
            
            return color;
        }
        
        // Helper function to format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    }
});
