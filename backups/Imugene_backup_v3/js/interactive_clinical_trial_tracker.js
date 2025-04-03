// Interactive Clinical Trial Tracker
// This visualization shows Imugene's clinical trials with real-time status updates and projected milestones

document.addEventListener('DOMContentLoaded', function() {
  // Configuration
  const config = {
    container: '#clinical-trial-timeline',
    trials: [
      {
        id: 'oncarlytics-mono',
        name: 'onCARlytics Monotherapy',
        phase: 'Phase 1',
        status: 'Recruiting',
        start: '2023-06-01',
        end: '2025-12-31',
        milestones: [
          { date: '2023-06-01', label: 'First Patient Dosed' },
          { date: '2023-12-15', label: 'Dose Level 1 Cleared' },
          { date: '2024-05-20', label: 'Dose Level 2 Cleared' },
          { date: '2024-11-10', label: 'Dose Level 3 Cleared' },
          { date: '2025-03-15', label: 'Preliminary Efficacy Data' },
          { date: '2025-12-31', label: 'Final Data' }
        ],
        description: 'Phase 1 dose escalation study of CF33-hNIS (onCARlytics) as monotherapy in patients with advanced solid tumors.'
      },
      {
        id: 'oncarlytics-combo',
        name: 'onCARlytics + Checkpoint Inhibitor',
        phase: 'Phase 1',
        status: 'Recruiting',
        start: '2023-09-15',
        end: '2026-03-31',
        milestones: [
          { date: '2023-09-15', label: 'First Patient Dosed' },
          { date: '2024-02-28', label: 'Dose Level 1 Cleared' },
          { date: '2024-08-15', label: 'Dose Level 2 Cleared' },
          { date: '2025-02-01', label: 'Dose Level 3 Cleared' },
          { date: '2025-07-15', label: 'Preliminary Efficacy Data' },
          { date: '2026-03-31', label: 'Final Data' }
        ],
        description: 'Phase 1 dose escalation study of CF33-hNIS (onCARlytics) in combination with anti-PD-1 therapy in patients with advanced solid tumors.'
      },
      {
        id: 'oncarlytics-iv',
        name: 'onCARlytics IV Combination Arm',
        phase: 'Phase 1',
        status: 'Recruiting',
        start: '2024-01-10',
        end: '2026-06-30',
        milestones: [
          { date: '2024-01-10', label: 'First Patient Dosed' },
          { date: '2024-03-25', label: 'Dose Level 1 Cleared' },
          { date: '2024-09-15', label: 'Dose Level 2 Cleared (Projected)' },
          { date: '2025-03-01', label: 'Dose Level 3 Cleared (Projected)' },
          { date: '2025-09-15', label: 'Preliminary Efficacy Data (Projected)' },
          { date: '2026-06-30', label: 'Final Data (Projected)' }
        ],
        description: 'Phase 1 dose escalation study of intravenous CF33-hNIS (onCARlytics) in combination with anti-PD-1 therapy in patients with advanced solid tumors. First dose level has been cleared as of March 2024.'
      },
      {
        id: 'vaxinia',
        name: 'VAXINIA (CF33-hNIS)',
        phase: 'Phase 1',
        status: 'Active',
        start: '2022-05-01',
        end: '2024-12-31',
        milestones: [
          { date: '2022-05-01', label: 'First Patient Dosed' },
          { date: '2022-11-15', label: 'Dose Level 1 Cleared' },
          { date: '2023-04-20', label: 'Dose Level 2 Cleared' },
          { date: '2023-09-10', label: 'Dose Level 3 Cleared' },
          { date: '2024-02-15', label: 'Dose Level 4 Cleared' },
          { date: '2024-06-30', label: 'Preliminary Efficacy Data (Projected)' },
          { date: '2024-12-31', label: 'Final Data (Projected)' }
        ],
        description: 'Phase 1 dose escalation study of CF33-hNIS (VAXINIA) as monotherapy and in combination with pembrolizumab in patients with advanced solid tumors.'
      },
      {
        id: 'herpecad',
        name: 'HER-Vaxx (HERpecad)',
        phase: 'Phase 2',
        status: 'Completed',
        start: '2019-03-01',
        end: '2023-06-30',
        milestones: [
          { date: '2019-03-01', label: 'First Patient Dosed' },
          { date: '2020-12-15', label: 'Interim Analysis' },
          { date: '2021-04-30', label: 'Last Patient Dosed' },
          { date: '2022-01-15', label: 'Primary Endpoint Data' },
          { date: '2023-06-30', label: 'Final OS Data' }
        ],
        description: 'Phase 2 study of HER-Vaxx (HERpecad) immunotherapy in patients with HER2+ gastric cancer. Final overall survival data showed median OS of 13.9 months vs. 8.3 months for standard of care.'
      }
    ]
  };

  // Create controls
  const controlsContainer = document.getElementById('clinical-trial-controls');
  if (controlsContainer) {
    controlsContainer.innerHTML = `
      <div class="control-group">
        <label>Filter by Phase:</label>
        <label class="checkbox-label">
          <input type="checkbox" data-filter="phase" value="Phase 1" checked> Phase 1
        </label>
        <label class="checkbox-label">
          <input type="checkbox" data-filter="phase" value="Phase 2" checked> Phase 2
        </label>
      </div>
      <div class="control-group">
        <label>Filter by Status:</label>
        <label class="checkbox-label">
          <input type="checkbox" data-filter="status" value="Recruiting" checked> Recruiting
        </label>
        <label class="checkbox-label">
          <input type="checkbox" data-filter="status" value="Active" checked> Active
        </label>
        <label class="checkbox-label">
          <input type="checkbox" data-filter="status" value="Completed" checked> Completed
        </label>
      </div>
    `;
  }

  // Initialize timeline
  const createTimeline = () => {
    const container = document.getElementById(config.container.substring(1));
    if (!container) return;

    // Clear previous timeline if any
    container.innerHTML = '';

    // Get selected filters
    const selectedPhases = [];
    const selectedStatuses = [];
    
    document.querySelectorAll('input[data-filter="phase"]:checked').forEach(checkbox => {
      selectedPhases.push(checkbox.value);
    });
    
    document.querySelectorAll('input[data-filter="status"]:checked').forEach(checkbox => {
      selectedStatuses.push(checkbox.value);
    });

    // Filter trials based on selected filters
    const filteredTrials = config.trials.filter(trial => {
      return selectedPhases.includes(trial.phase) && selectedStatuses.includes(trial.status);
    });

    // If no trials match filters, show message
    if (filteredTrials.length === 0) {
      container.innerHTML = '<div class="no-data-message">No clinical trials match the selected filters.</div>';
      return;
    }

    // Calculate timeline dimensions
    const margin = { top: 50, right: 30, bottom: 50, left: 200 };
    const width = container.clientWidth - margin.left - margin.right;
    const rowHeight = 50;
    const height = filteredTrials.length * rowHeight * 2 + margin.top + margin.bottom;

    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse dates
    const parseDate = d3.timeParse('%Y-%m-%d');
    const formatDate = d3.timeFormat('%b %Y');
    
    // Set time scale
    const minDate = d3.min(filteredTrials, d => parseDate(d.start));
    const maxDate = d3.max(filteredTrials, d => parseDate(d.end));
    
    const x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(formatDate));

    // Add vertical grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x)
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat('')
      );

    // Add today's date line
    const today = new Date();
    if (today >= minDate && today <= maxDate) {
      svg.append('line')
        .attr('x1', x(today))
        .attr('x2', x(today))
        .attr('y1', 0)
        .attr('y2', height - margin.bottom)
        .attr('stroke', '#f44336')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
      
      svg.append('text')
        .attr('x', x(today))
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .attr('fill', '#f44336')
        .text('Today');
    }

    // Draw timeline for each trial
    filteredTrials.forEach((trial, i) => {
      const y = i * rowHeight * 2 + 20;
      
      // Trial name and phase
      svg.append('text')
        .attr('x', -margin.left + 10)
        .attr('y', y + rowHeight / 2)
        .attr('dominant-baseline', 'middle')
        .attr('font-weight', 'bold')
        .text(trial.name);
      
      svg.append('text')
        .attr('x', -margin.left + 10)
        .attr('y', y + rowHeight / 2 + 20)
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '12px')
        .text(`${trial.phase} | ${trial.status}`);
      
      // Timeline bar
      const startDate = parseDate(trial.start);
      const endDate = parseDate(trial.end);
      
      // Background bar
      svg.append('rect')
        .attr('x', x(startDate))
        .attr('y', y)
        .attr('width', x(endDate) - x(startDate))
        .attr('height', rowHeight)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', '#e0e0e0');
      
      // Progress bar
      const progressEnd = today < endDate ? today : endDate;
      const progressWidth = x(progressEnd) - x(startDate);
      
      if (progressWidth > 0) {
        svg.append('rect')
          .attr('x', x(startDate))
          .attr('y', y)
          .attr('width', progressWidth)
          .attr('height', rowHeight)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('fill', getStatusColor(trial.status));
      }
      
      // Add milestones
      trial.milestones.forEach(milestone => {
        const milestoneDate = parseDate(milestone.date);
        
        // Skip if milestone is outside the visible range
        if (milestoneDate < minDate || milestoneDate > maxDate) return;
        
        // Milestone marker
        svg.append('circle')
          .attr('cx', x(milestoneDate))
          .attr('cy', y + rowHeight / 2)
          .attr('r', 5)
          .attr('fill', milestoneDate <= today ? '#2196f3' : '#9e9e9e');
        
        // Milestone label
        svg.append('text')
          .attr('x', x(milestoneDate))
          .attr('y', y + rowHeight + 15)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('transform', `rotate(45, ${x(milestoneDate)}, ${y + rowHeight + 15})`)
          .text(milestone.label);
      });
      
      // Add tooltip area
      svg.append('rect')
        .attr('x', x(startDate))
        .attr('y', y)
        .attr('width', x(endDate) - x(startDate))
        .attr('height', rowHeight)
        .attr('fill', 'transparent')
        .attr('class', 'tooltip-trigger')
        .on('mouseover', function(event) {
          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.innerHTML = `
            <h4>${trial.name}</h4>
            <p><strong>Phase:</strong> ${trial.phase}</p>
            <p><strong>Status:</strong> ${trial.status}</p>
            <p><strong>Start:</strong> ${formatDate(startDate)}</p>
            <p><strong>End:</strong> ${formatDate(endDate)}</p>
            <p>${trial.description}</p>
          `;
          
          tooltip.style.position = 'absolute';
          tooltip.style.left = `${event.pageX + 10}px`;
          tooltip.style.top = `${event.pageY + 10}px`;
          tooltip.style.backgroundColor = 'white';
          tooltip.style.padding = '10px';
          tooltip.style.border = '1px solid #ddd';
          tooltip.style.borderRadius = '5px';
          tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
          tooltip.style.zIndex = '1000';
          
          document.body.appendChild(tooltip);
          
          this.onmouseout = function() {
            document.body.removeChild(tooltip);
          };
        });
    });

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 200}, 10)`);
    
    const legendItems = [
      { label: 'Recruiting', color: getStatusColor('Recruiting') },
      { label: 'Active', color: getStatusColor('Active') },
      { label: 'Completed', color: getStatusColor('Completed') },
      { label: 'Milestone (Completed)', color: '#2196f3' },
      { label: 'Milestone (Projected)', color: '#9e9e9e' }
    ];
    
    legendItems.forEach((item, i) => {
      legend.append('rect')
        .attr('x', 0)
        .attr('y', i * 20)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', item.color);
      
      legend.append('text')
        .attr('x', 20)
        .attr('y', i * 20 + 12)
        .text(item.label);
    });
  };

  // Helper function to get color based on trial status
  function getStatusColor(status) {
    switch (status) {
      case 'Recruiting':
        return '#4caf50'; // Green
      case 'Active':
        return '#2196f3'; // Blue
      case 'Completed':
        return '#9c27b0'; // Purple
      default:
        return '#9e9e9e'; // Grey
    }
  }

  // Add event listeners to filters
  const filterCheckboxes = document.querySelectorAll('input[data-filter]');
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', createTimeline);
  });

  // Export button functionality
  const exportButton = document.getElementById('export-timeline-button');
  if (exportButton) {
    exportButton.addEventListener('click', function() {
      const container = document.getElementById(config.container.substring(1));
      if (!container) return;

      const svg = container.querySelector('svg');
      if (!svg) return;

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      
      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      // Create image from SVG
      const img = new Image();
      img.onload = function() {
        // Draw image on canvas
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        
        // Convert canvas to data URL and trigger download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'imugene_clinical_trial_timeline.png';
        link.href = dataUrl;
        link.click();
        
        // Clean up
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
  }

  // Initialize timeline
  createTimeline();

  // Handle window resize
  window.addEventListener('resize', createTimeline);
});
