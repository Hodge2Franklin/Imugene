// Fixed Clinical Trial Timeline Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('clinical-trial-timeline-container');
    if (!container) return;

    console.log("Clinical Trial Timeline: Container found, initializing");
    
    // Sample data for clinical trials
    const clinicalTrialData = {
        trials: [
            {
                id: 'HER-Vaxx',
                name: 'HER-Vaxx',
                indication: 'Gastric Cancer',
                phase: 'Phase 2',
                start: '2022-01-15',
                end: '2025-06-30',
                status: 'Ongoing',
                milestones: [
                    { date: '2022-07-01', description: 'Interim Analysis' },
                    { date: '2023-12-15', description: 'Primary Endpoint Data' },
                    { date: '2025-06-30', description: 'Final Analysis' }
                ]
            },
            {
                id: 'CF33-hNIS',
                name: 'CF33-hNIS (VAXINIA)',
                indication: 'Solid Tumors',
                phase: 'Phase 1',
                start: '2021-11-01',
                end: '2024-12-31',
                status: 'Ongoing',
                milestones: [
                    { date: '2022-05-15', description: 'First Patient Dosed' },
                    { date: '2023-08-01', description: 'Dose Escalation Complete' },
                    { date: '2024-12-31', description: 'Study Completion' }
                ]
            },
            {
                id: 'PD1-Vaxx',
                name: 'PD1-Vaxx',
                indication: 'NSCLC',
                phase: 'Phase 1',
                start: '2021-09-15',
                end: '2024-03-31',
                status: 'Ongoing',
                milestones: [
                    { date: '2022-02-01', description: 'Dose Escalation Complete' },
                    { date: '2023-05-15', description: 'Cohort Expansion' },
                    { date: '2024-03-31', description: 'Final Analysis' }
                ]
            },
            {
                id: 'CHECKvacc',
                name: 'CHECKvacc',
                indication: 'Multiple Cancers',
                phase: 'Preclinical',
                start: '2022-06-01',
                end: '2023-12-31',
                status: 'Ongoing',
                milestones: [
                    { date: '2022-12-15', description: 'Animal Studies Complete' },
                    { date: '2023-06-30', description: 'IND-Enabling Studies' },
                    { date: '2023-12-31', description: 'IND Submission' }
                ]
            },
            {
                id: 'CF33-CD19',
                name: 'CF33-CD19',
                indication: 'Solid Tumors',
                phase: 'Preclinical',
                start: '2022-03-01',
                end: '2023-09-30',
                status: 'Ongoing',
                milestones: [
                    { date: '2022-09-15', description: 'Proof of Concept' },
                    { date: '2023-03-31', description: 'Manufacturing Process' },
                    { date: '2023-09-30', description: 'Preclinical Complete' }
                ]
            }
        ]
    };

    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.style.marginBottom = '20px';
    container.appendChild(filterContainer);

    // Create phase filter
    const phaseFilter = document.createElement('div');
    phaseFilter.className = 'filter-group';
    phaseFilter.innerHTML = `
        <label>Phase:</label>
        <select id="phase-filter">
            <option value="all">All Phases</option>
            <option value="Preclinical">Preclinical</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
        </select>
    `;
    filterContainer.appendChild(phaseFilter);

    // Create indication filter
    const indicationFilter = document.createElement('div');
    indicationFilter.className = 'filter-group';
    indicationFilter.innerHTML = `
        <label>Indication:</label>
        <select id="indication-filter">
            <option value="all">All Indications</option>
            <option value="Gastric Cancer">Gastric Cancer</option>
            <option value="Solid Tumors">Solid Tumors</option>
            <option value="NSCLC">NSCLC</option>
            <option value="Multiple Cancers">Multiple Cancers</option>
        </select>
    `;
    filterContainer.appendChild(indicationFilter);

    // Create timeline container with canvas element
    const timelineContainer = document.createElement('div');
    timelineContainer.id = 'clinical-timeline-chart-container';
    timelineContainer.style.height = '500px';
    container.appendChild(timelineContainer);
    
    // Create canvas element - THIS WAS MISSING IN THE ORIGINAL SCRIPT
    const canvas = document.createElement('canvas');
    canvas.id = 'clinical-timeline-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    timelineContainer.appendChild(canvas);

    // Create milestone container
    const milestoneContainer = document.createElement('div');
    milestoneContainer.className = 'milestone-container';
    milestoneContainer.style.marginTop = '30px';
    container.appendChild(milestoneContainer);

    // Initialize chart
    let timelineChart;

    // Add event listeners to filters
    document.getElementById('phase-filter').addEventListener('change', updateTimeline);
    document.getElementById('indication-filter').addEventListener('change', updateTimeline);

    // Function to update timeline based on filters
    function updateTimeline() {
        const phaseFilter = document.getElementById('phase-filter').value;
        const indicationFilter = document.getElementById('indication-filter').value;
        
        // Filter trials based on selected filters
        const filteredTrials = clinicalTrialData.trials.filter(trial => {
            return (phaseFilter === 'all' || trial.phase === phaseFilter) &&
                   (indicationFilter === 'all' || trial.indication === indicationFilter);
        });
        
        // Update chart
        renderTimelineChart(filteredTrials);
        
        // Update milestone list
        renderMilestones(filteredTrials);
    }

    // Function to render timeline chart
    function renderTimelineChart(trials) {
        // Get canvas context
        const ctx = document.getElementById('clinical-timeline-canvas').getContext('2d');
        
        // Destroy previous chart if exists
        if (timelineChart) {
            timelineChart.destroy();
        }
        
        // Prepare data for chart
        const labels = trials.map(trial => `${trial.name} (${trial.phase})`);
        
        // Convert dates to timestamps for chart
        const now = new Date();
        const datasets = [];
        
        trials.forEach((trial, index) => {
            const startDate = new Date(trial.start);
            const endDate = new Date(trial.end);
            
            // Calculate progress
            const totalDuration = endDate - startDate;
            const elapsedDuration = now - startDate;
            const progress = Math.min(Math.max(elapsedDuration / totalDuration, 0), 1) * 100;
            
            // Add dataset for total duration
            datasets.push({
                label: 'Total Duration',
                data: [{ x: startDate, y: index, x2: endDate, y2: index }],
                backgroundColor: 'rgba(200, 200, 200, 0.5)',
                borderColor: 'rgba(200, 200, 200, 1)',
                borderWidth: 1,
                barPercentage: 0.3,
                categoryPercentage: 0.8
            });
            
            // Add dataset for progress
            if (progress > 0) {
                const progressEndDate = new Date(startDate.getTime() + (totalDuration * (progress / 100)));
                
                datasets.push({
                    label: 'Progress',
                    data: [{ x: startDate, y: index, x2: progressEndDate, y2: index }],
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    barPercentage: 0.3,
                    categoryPercentage: 0.8
                });
            }
            
            // Add milestones
            trial.milestones.forEach(milestone => {
                const milestoneDate = new Date(milestone.date);
                
                datasets.push({
                    label: milestone.description,
                    data: [{ x: milestoneDate, y: index }],
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointStyle: 'triangle',
                    pointRadius: 8,
                    pointHoverRadius: 10
                });
            });
        });
        
        try {
            // Create new chart
            timelineChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month',
                                displayFormats: {
                                    month: 'MMM YYYY'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Timeline'
                            }
                        },
                        y: {
                            type: 'category',
                            labels: labels,
                            offset: true,
                            ticks: {
                                padding: 10
                            },
                            title: {
                                display: true,
                                text: 'Clinical Trials'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const datasetLabel = context.dataset.label || '';
                                    const dataPoint = context.raw;
                                    
                                    if (datasetLabel === 'Total Duration') {
                                        const startDate = new Date(dataPoint.x).toLocaleDateString();
                                        const endDate = new Date(dataPoint.x2).toLocaleDateString();
                                        return `${labels[dataPoint.y]}: ${startDate} to ${endDate}`;
                                    } else if (datasetLabel === 'Progress') {
                                        return `Progress: ${Math.round((dataPoint.x2 - dataPoint.x) / (trials[dataPoint.y].end - trials[dataPoint.y].start) * 100)}%`;
                                    } else {
                                        return `${datasetLabel}: ${new Date(dataPoint.x).toLocaleDateString()}`;
                                    }
                                }
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            console.log("Clinical Trial Timeline: Chart rendered successfully");
        } catch (e) {
            console.error("Error rendering timeline chart:", e);
            showFallbackVisualization(trials);
        }
    }

    // Function to render milestones
    function renderMilestones(trials) {
        // Clear previous content
        milestoneContainer.innerHTML = '';
        
        // Create milestone header
        const milestoneHeader = document.createElement('h4');
        milestoneHeader.textContent = 'Upcoming Milestones';
        milestoneContainer.appendChild(milestoneHeader);
        
        // Create milestone list
        const milestoneList = document.createElement('ul');
        milestoneList.className = 'milestone-list';
        milestoneList.style.listStyleType = 'none';
        milestoneList.style.padding = '0';
        
        // Get all milestones from filtered trials
        const allMilestones = [];
        trials.forEach(trial => {
            trial.milestones.forEach(milestone => {
                allMilestones.push({
                    trial: trial.name,
                    date: new Date(milestone.date),
                    description: milestone.description
                });
            });
        });
        
        // Sort milestones by date
        allMilestones.sort((a, b) => a.date - b.date);
        
        // Add milestones to list
        const now = new Date();
        const upcomingMilestones = allMilestones.filter(milestone => milestone.date >= now);
        
        if (upcomingMilestones.length > 0) {
            upcomingMilestones.forEach(milestone => {
                const milestoneItem = document.createElement('li');
                milestoneItem.style.marginBottom = '10px';
                milestoneItem.style.padding = '10px';
                milestoneItem.style.backgroundColor = '#f8f9fa';
                milestoneItem.style.borderLeft = '4px solid #dc3545';
                milestoneItem.style.borderRadius = '4px';
                
                const milestoneDate = document.createElement('div');
                milestoneDate.className = 'milestone-date';
                milestoneDate.textContent = milestone.date.toLocaleDateString();
                milestoneDate.style.fontWeight = 'bold';
                milestoneItem.appendChild(milestoneDate);
                
                const milestoneTrial = document.createElement('div');
                milestoneTrial.className = 'milestone-trial';
                milestoneTrial.textContent = milestone.trial;
                milestoneTrial.style.color = '#666';
                milestoneItem.appendChild(milestoneTrial);
                
                const milestoneDescription = document.createElement('div');
                milestoneDescription.className = 'milestone-description';
                milestoneDescription.textContent = milestone.description;
                milestoneDescription.style.marginTop = '5px';
                milestoneItem.appendChild(milestoneDescription);
                
                milestoneList.appendChild(milestoneItem);
            });
        } else {
            const noMilestoneItem = document.createElement('li');
            noMilestoneItem.textContent = 'No upcoming milestones for the selected filters.';
            noMilestoneItem.style.fontStyle = 'italic';
            noMilestoneItem.style.color = '#666';
            milestoneList.appendChild(noMilestoneItem);
        }
        
        milestoneContainer.appendChild(milestoneList);
    }

    // Fallback visualization function
    function showFallbackVisualization(trials) {
        // Clear the chart container
        const chartContainer = document.getElementById('clinical-timeline-chart-container');
        chartContainer.innerHTML = '';
        
        // Create fallback visualization
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-visualization';
        fallbackDiv.style.height = '500px';
        fallbackDiv.style.overflowY = 'auto';
        fallbackDiv.style.backgroundColor = '#f8f9fa';
        fallbackDiv.style.border = '1px solid #ddd';
        fallbackDiv.style.borderRadius = '4px';
        fallbackDiv.style.padding = '20px';
        
        // Create fallback title
        const fallbackTitle = document.createElement('h4');
        fallbackTitle.textContent = 'Clinical Trial Timeline';
        fallbackTitle.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Create timeline items
        trials.forEach(trial => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.style.marginBottom = '30px';
            timelineItem.style.position = 'relative';
            timelineItem.style.paddingLeft = '20px';
            timelineItem.style.borderLeft = '2px solid #007bff';
            
            // Trial header
            const trialHeader = document.createElement('h5');
            trialHeader.textContent = `${trial.name} (${trial.phase})`;
            trialHeader.style.marginBottom = '10px';
            timelineItem.appendChild(trialHeader);
            
            // Trial details
            const trialDetails = document.createElement('div');
            trialDetails.innerHTML = `
                <div><strong>Indication:</strong> ${trial.indication}</div>
                <div><strong>Status:</strong> ${trial.status}</div>
                <div><strong>Timeline:</strong> ${new Date(trial.start).toLocaleDateString()} to ${new Date(trial.end).toLocaleDateString()}</div>
            `;
            trialDetails.style.marginBottom = '15px';
            timelineItem.appendChild(trialDetails);
            
            // Milestones
            const milestonesTitle = document.createElement('div');
            milestonesTitle.textContent = 'Milestones:';
            milestonesTitle.style.fontWeight = 'bold';
            milestonesTitle.style.marginBottom = '5px';
            timelineItem.appendChild(milestonesTitle);
            
            const milestonesList = document.createElement('ul');
            milestonesList.style.listStyleType = 'none';
            milestonesList.style.padding = '0';
            milestonesList.style.marginLeft = '10px';
            
            trial.milestones.forEach(milestone => {
                const milestoneItem = document.createElement('li');
                milestoneItem.innerHTML = `
                    <span style="color: #dc3545;">●</span> 
                    <strong>${new Date(milestone.date).toLocaleDateString()}:</strong> 
                    ${milestone.description}
                `;
                milestoneItem.style.marginBottom = '5px';
                milestonesList.appendChild(milestoneItem);
            });
            
            timelineItem.appendChild(milestonesList);
            fallbackDiv.appendChild(timelineItem);
        });
        
        chartContainer.appendChild(fallbackDiv);
    }

    // Initialize the timeline
    updateTimeline();
    
    console.log("Clinical Trial Timeline: Initialization complete");
});
