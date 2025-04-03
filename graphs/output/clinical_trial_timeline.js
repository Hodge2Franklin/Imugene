// Clinical Trial Timeline Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('clinical-trial-timeline-container');
    if (!container) return;

    // Sample data for clinical trials
    const clinicalTrials = [
        {
            id: 'HER-Vaxx',
            name: 'HER-Vaxx (IMU-131)',
            indication: 'HER2+ Gastric Cancer',
            phase: 'Phase 2',
            status: 'Ongoing',
            startDate: '2019-01-15',
            estimatedEndDate: '2025-06-30',
            milestones: [
                { date: '2019-01-15', event: 'First Patient Enrolled', completed: true },
                { date: '2020-03-20', event: 'Interim Analysis', completed: true },
                { date: '2021-05-10', event: 'Primary Endpoint Data', completed: true },
                { date: '2022-11-15', event: 'Overall Survival Data', completed: true },
                { date: '2023-08-01', event: 'Phase 3 Planning', completed: false },
                { date: '2024-02-15', event: 'Phase 3 Initiation', completed: false },
                { date: '2025-06-30', event: 'Phase 3 Interim Analysis', completed: false }
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
            milestones: [
                { date: '2021-04-10', event: 'First Patient Enrolled', completed: true },
                { date: '2022-02-25', event: 'Dose Escalation Complete', completed: true },
                { date: '2022-09-18', event: 'Cohort Expansion', completed: true },
                { date: '2023-07-05', event: 'Safety Data', completed: true },
                { date: '2023-12-20', event: 'Preliminary Efficacy Data', completed: false },
                { date: '2024-06-30', event: 'Final Data Analysis', completed: false },
                { date: '2024-12-15', event: 'Phase 2 Planning', completed: false }
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
            milestones: [
                { date: '2022-03-15', event: 'IND Clearance', completed: true },
                { date: '2022-08-10', event: 'First Patient Enrolled', completed: true },
                { date: '2023-04-22', event: 'Dose Escalation Initiation', completed: true },
                { date: '2023-11-30', event: 'Preliminary Safety Data', completed: false },
                { date: '2024-05-15', event: 'Cohort Expansion', completed: false },
                { date: '2024-10-10', event: 'Interim Analysis', completed: false },
                { date: '2025-01-20', event: 'Preliminary Efficacy Data', completed: false }
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
            milestones: [
                { date: '2020-09-08', event: 'First Patient Enrolled', completed: true },
                { date: '2021-06-15', event: 'Dose Escalation Complete', completed: true },
                { date: '2022-02-28', event: 'Cohort Expansion', completed: true },
                { date: '2022-11-10', event: 'Safety Data', completed: true },
                { date: '2023-05-20', event: 'Preliminary Efficacy Data', completed: true },
                { date: '2024-01-15', event: 'Final Data Analysis', completed: false },
                { date: '2024-08-15', event: 'Phase 2 Planning', completed: false }
            ]
        }
    ];

    // Create the timeline interface
    createTimelineInterface(container, clinicalTrials);

    // Function to create timeline interface
    function createTimelineInterface(container, trials) {
        // Create filter section
        const filterSection = document.createElement('div');
        filterSection.className = 'filter-section';
        container.appendChild(filterSection);

        // Create filter title
        const filterTitle = document.createElement('h3');
        filterTitle.textContent = 'Filter Clinical Trials';
        filterSection.appendChild(filterTitle);

        // Create filter options
        const filterOptions = document.createElement('div');
        filterOptions.className = 'filter-options';
        filterSection.appendChild(filterOptions);

        // Create phase filter
        const phaseFilter = document.createElement('div');
        phaseFilter.className = 'filter-group';
        phaseFilter.innerHTML = `
            <label>Phase:</label>
            <select id="phase-filter">
                <option value="all">All Phases</option>
                <option value="Phase 1">Phase 1</option>
                <option value="Phase 2">Phase 2</option>
                <option value="Phase 3">Phase 3</option>
            </select>
        `;
        filterOptions.appendChild(phaseFilter);

        // Create status filter
        const statusFilter = document.createElement('div');
        statusFilter.className = 'filter-group';
        statusFilter.innerHTML = `
            <label>Status:</label>
            <select id="status-filter">
                <option value="all">All Statuses</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Planned">Planned</option>
            </select>
        `;
        filterOptions.appendChild(statusFilter);

        // Create view options
        const viewOptions = document.createElement('div');
        viewOptions.className = 'filter-group';
        viewOptions.innerHTML = `
            <label>View:</label>
            <select id="view-option">
                <option value="timeline">Timeline View</option>
                <option value="gantt">Gantt Chart</option>
                <option value="milestones">Milestone Table</option>
            </select>
        `;
        filterOptions.appendChild(viewOptions);

        // Create visualization container
        const visualizationContainer = document.createElement('div');
        visualizationContainer.className = 'visualization-container';
        visualizationContainer.style.marginTop = '20px';
        container.appendChild(visualizationContainer);

        // Create timeline container
        const timelineContainer = document.createElement('div');
        timelineContainer.id = 'timeline-container';
        timelineContainer.style.height = '500px';
        visualizationContainer.appendChild(timelineContainer);

        // Add event listeners to filters
        document.getElementById('phase-filter').addEventListener('change', updateVisualization);
        document.getElementById('status-filter').addEventListener('change', updateVisualization);
        document.getElementById('view-option').addEventListener('change', updateVisualization);

        // Initialize visualization
        updateVisualization();

        // Function to update visualization based on filters
        function updateVisualization() {
            const phaseFilter = document.getElementById('phase-filter').value;
            const statusFilter = document.getElementById('status-filter').value;
            const viewOption = document.getElementById('view-option').value;

            // Filter trials based on selected filters
            const filteredTrials = trials.filter(trial => {
                if (phaseFilter !== 'all' && trial.phase !== phaseFilter) return false;
                if (statusFilter !== 'all' && trial.status !== statusFilter) return false;
                return true;
            });

            // Clear previous visualization
            const timelineContainer = document.getElementById('timeline-container');
            timelineContainer.innerHTML = '';

            // Render selected view
            switch (viewOption) {
                case 'timeline':
                    renderTimelineView(timelineContainer, filteredTrials);
                    break;
                case 'gantt':
                    renderGanttChart(timelineContainer, filteredTrials);
                    break;
                case 'milestones':
                    renderMilestoneTable(timelineContainer, filteredTrials);
                    break;
            }
        }

        // Function to render timeline view
        function renderTimelineView(container, trials) {
            // Create timeline container
            const timelineEl = document.createElement('div');
            timelineEl.className = 'timeline';
            container.appendChild(timelineEl);

            // Sort trials by start date
            const sortedTrials = [...trials].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

            // Create timeline items
            sortedTrials.forEach(trial => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                
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
                    milestonesList.appendChild(milestoneItem);
                });
                milestones.appendChild(milestonesList);
                
                timelineContent.appendChild(milestones);
                timelineItem.appendChild(timelineContent);
                timelineEl.appendChild(timelineItem);
            });
        }

        // Function to render Gantt chart
        function renderGanttChart(container, trials) {
            // Create canvas for Gantt chart
            const canvas = document.createElement('canvas');
            canvas.id = 'gantt-chart';
            container.appendChild(canvas);

            // Prepare data for Gantt chart
            const labels = trials.map(trial => trial.name);
            
            // Calculate date range for all trials
            const allDates = trials.flatMap(trial => [new Date(trial.startDate), new Date(trial.estimatedEndDate)]);
            const minDate = new Date(Math.min(...allDates));
            const maxDate = new Date(Math.max(...allDates));
            
            // Create datasets for each trial
            const datasets = trials.map((trial, index) => {
                const startDate = new Date(trial.startDate);
                const endDate = new Date(trial.estimatedEndDate);
                const duration = (endDate - startDate) / (1000 * 60 * 60 * 24); // Duration in days
                
                return {
                    label: trial.name,
                    data: [{
                        x: startDate,
                        y: labels.length - 1 - index,
                        x2: endDate,
                        y2: labels.length - 1 - index
                    }],
                    backgroundColor: getPhaseColor(trial.phase),
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    barPercentage: 0.5
                };
            });
            
            // Create milestone markers
            const milestoneDatasets = [];
            trials.forEach((trial, trialIndex) => {
                trial.milestones.forEach((milestone, milestoneIndex) => {
                    milestoneDatasets.push({
                        label: `${trial.name} - ${milestone.event}`,
                        data: [{
                            x: new Date(milestone.date),
                            y: labels.length - 1 - trialIndex
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
            });
            
            // Create Gantt chart
            const ctx = document.getElementById('gantt-chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [...datasets, ...milestoneDatasets]
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
                            callbacks: {
                                label: function(context) {
                                    if (context.dataset.type === 'scatter') {
                                        return `${context.dataset.label}: ${formatDate(context.raw.x)}`;
                                    } else {
                                        const startDate = formatDate(context.raw.x);
                                        const endDate = formatDate(context.raw.x2);
                                        return `${context.dataset.label}: ${startDate} to ${endDate}`;
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        // Function to render milestone table
        function renderMilestoneTable(container, trials) {
            // Create table container
            const tableContainer = document.createElement('div');
            tableContainer.className = 'milestone-table-container';
            container.appendChild(tableContainer);

            // Create table
            const table = document.createElement('table');
            table.className = 'milestone-table';
            tableContainer.appendChild(table);

            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            const headers = ['Trial', 'Milestone', 'Date', 'Status'];
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
                        phase: trial.phase,
                        milestone: milestone.event,
                        date: milestone.date,
                        completed: milestone.completed
                    });
                });
            });
            
            // Sort milestones by date
            allMilestones.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Create table rows
            allMilestones.forEach(milestone => {
                const row = document.createElement('tr');
                
                const trialCell = document.createElement('td');
                trialCell.innerHTML = `
                    <div>${milestone.trial}</div>
                    <div class="phase-badge" style="background-color: ${getPhaseColor(milestone.phase)}">${milestone.phase}</div>
                `;
                row.appendChild(trialCell);
                
                const milestoneCell = document.createElement('td');
                milestoneCell.textContent = milestone.milestone;
                row.appendChild(milestoneCell);
                
                const dateCell = document.createElement('td');
                dateCell.textContent = formatDate(milestone.date);
                row.appendChild(dateCell);
                
                const statusCell = document.createElement('td');
                statusCell.className = milestone.completed ? 'completed-status' : 'pending-status';
                statusCell.textContent = milestone.completed ? 'Completed' : 'Pending';
                row.appendChild(statusCell);
                
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
        }

        // Helper function to get color based on phase
        function getPhaseColor(phase) {
            switch (phase) {
                case 'Phase 1':
                    return 'rgba(52, 152, 219, 0.8)'; // Blue
                case 'Phase 2':
                    return 'rgba(155, 89, 182, 0.8)'; // Purple
                case 'Phase 3':
                    return 'rgba(46, 204, 113, 0.8)'; // Green
                default:
                    return 'rgba(149, 165, 166, 0.8)'; // Gray
            }
        }

        // Helper function to format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    }
});
