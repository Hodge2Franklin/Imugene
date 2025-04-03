// Interactive Cash Flow Visualization
// This visualization allows users to adjust parameters to see how they affect Imugene's cash runway

document.addEventListener('DOMContentLoaded', function() {
  // Configuration
  const config = {
    container: '#cash-flow-projection',
    initialCash: 53000000, // $53M current cash position
    quarterlyBurnRate: 17000000, // ~$17M quarterly burn rate
    quarters: 8, // Number of quarters to project
    capitalRaiseOptions: [
      { quarter: 3, amount: 30000000, label: 'Q3 2025 - $30M' },
      { quarter: 4, amount: 50000000, label: 'Q4 2025 - $50M' },
      { quarter: 5, amount: 70000000, label: 'Q1 2026 - $70M' }
    ]
  };

  // Create controls
  const controlsContainer = document.getElementById('cash-flow-controls');
  if (controlsContainer) {
    controlsContainer.innerHTML = `
      <div class="control-group">
        <label for="burn-rate-slider">Quarterly Burn Rate: $<span id="burn-rate-value">${(config.quarterlyBurnRate / 1000000).toFixed(1)}</span>M</label>
        <input type="range" id="burn-rate-slider" min="10" max="25" step="0.5" value="${config.quarterlyBurnRate / 1000000}">
      </div>
      <div class="control-group">
        <label>Capital Raise Scenarios:</label>
        ${config.capitalRaiseOptions.map((option, index) => `
          <label class="checkbox-label">
            <input type="checkbox" data-index="${index}" class="capital-raise-checkbox"> ${option.label}
          </label>
        `).join('')}
      </div>
    `;
  }

  // Initialize chart
  const createCashFlowChart = () => {
    const container = document.getElementById(config.container.substring(1));
    if (!container) return;

    // Clear previous chart if any
    container.innerHTML = '';

    // Get current values from controls
    const burnRateSlider = document.getElementById('burn-rate-slider');
    const burnRateValue = burnRateSlider ? parseFloat(burnRateSlider.value) * 1000000 : config.quarterlyBurnRate;
    
    const selectedCapitalRaises = [];
    const checkboxes = document.querySelectorAll('.capital-raise-checkbox');
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        selectedCapitalRaises.push(config.capitalRaiseOptions[index]);
      }
    });

    // Calculate cash flow projection
    const quarters = [];
    const cashValues = [];
    let currentCash = config.initialCash;

    for (let i = 0; i < config.quarters; i++) {
      // Add capital raises if any
      const capitalRaise = selectedCapitalRaises.find(raise => raise.quarter === i);
      if (capitalRaise) {
        currentCash += capitalRaise.amount;
      }

      // Add to data arrays
      quarters.push(`Q${(i % 4) + 1} ${Math.floor(i / 4) + 2025}`);
      cashValues.push(currentCash);

      // Subtract burn rate for next quarter
      currentCash -= burnRateValue;
      if (currentCash < 0) currentCash = 0;
    }

    // Create chart using D3.js
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(quarters)
      .range([0, width])
      .padding(0.2);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(cashValues) * 1.1])
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d => `$${d / 1000000}M`));

    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Cash Position');

    // Add bars
    svg.selectAll('.bar')
      .data(cashValues)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(quarters[i]))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d))
      .attr('height', d => height - y(d))
      .attr('fill', (d, i) => {
        // Color bars based on cash position
        if (d < burnRateValue) return '#ef5350'; // Red for critical
        if (d < burnRateValue * 2) return '#ff9800'; // Orange for warning
        return '#4caf50'; // Green for healthy
      });

    // Add value labels on top of bars
    svg.selectAll('.label')
      .data(cashValues)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d, i) => x(quarters[i]) + x.bandwidth() / 2)
      .attr('y', d => y(d) - 5)
      .attr('text-anchor', 'middle')
      .text(d => `$${(d / 1000000).toFixed(1)}M`);

    // Add capital raise markers
    selectedCapitalRaises.forEach(raise => {
      const quarterIndex = raise.quarter;
      if (quarterIndex < quarters.length) {
        svg.append('line')
          .attr('x1', x(quarters[quarterIndex]) + x.bandwidth() / 2)
          .attr('x2', x(quarters[quarterIndex]) + x.bandwidth() / 2)
          .attr('y1', y(cashValues[quarterIndex]))
          .attr('y2', y(cashValues[quarterIndex] - raise.amount))
          .attr('stroke', '#2196f3')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '5,5');

        svg.append('text')
          .attr('x', x(quarters[quarterIndex]) + x.bandwidth() / 2)
          .attr('y', y(cashValues[quarterIndex] - raise.amount / 2))
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'middle')
          .attr('fill', '#2196f3')
          .text(`+$${raise.amount / 1000000}M`);
      }
    });

    // Add threshold line for minimum cash position
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(burnRateValue))
      .attr('y2', y(burnRateValue))
      .attr('stroke', '#ef5350')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    svg.append('text')
      .attr('x', width)
      .attr('y', y(burnRateValue) - 5)
      .attr('text-anchor', 'end')
      .attr('fill', '#ef5350')
      .text('Minimum Cash Position');

    // Calculate cash runway
    const cashRunway = Math.floor(config.initialCash / burnRateValue);
    const cashRunwayText = cashRunway <= 0 ? 'Less than 1 quarter' : 
                          cashRunway === 1 ? '1 quarter' : 
                          `${cashRunway} quarters`;

    // Add cash runway text
    svg.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('fill', '#333')
      .text(`Cash Runway: ${cashRunwayText} at current burn rate`);
  };

  // Add event listeners
  const burnRateSlider = document.getElementById('burn-rate-slider');
  const burnRateValue = document.getElementById('burn-rate-value');
  
  if (burnRateSlider && burnRateValue) {
    burnRateSlider.addEventListener('input', function() {
      burnRateValue.textContent = parseFloat(this.value).toFixed(1);
      createCashFlowChart();
    });
  }

  const capitalRaiseCheckboxes = document.querySelectorAll('.capital-raise-checkbox');
  capitalRaiseCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', createCashFlowChart);
  });

  // Export button functionality
  const exportButton = document.getElementById('export-button');
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
        link.download = 'imugene_cash_flow_projection.png';
        link.href = dataUrl;
        link.click();
        
        // Clean up
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
  }

  // Initialize chart
  createCashFlowChart();

  // Handle window resize
  window.addEventListener('resize', createCashFlowChart);
});
