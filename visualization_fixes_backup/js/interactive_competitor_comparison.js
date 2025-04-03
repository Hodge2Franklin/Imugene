// Interactive Competitor Comparison Dashboard
// This visualization allows users to explore Imugene's position within the broader immuno-oncology landscape

document.addEventListener('DOMContentLoaded', function() {
  // Configuration
  const config = {
    container: '#competitor-comparison-container',
    detailsContainer: '#company-details-container',
    radarContainer: '#radar-chart-container',
    companies: [
      {
        id: 'imugene',
        name: 'Imugene',
        ticker: 'ASX:IMU',
        marketCap: 150, // $150M
        cashPosition: 53, // $53M
        burnRate: 17, // $17M quarterly
        pipelineStage: 0.7, // 0-1 scale (Phase 1-2)
        platforms: ['Oncolytic Viruses', 'B-cell Immunotherapies', 'Checkpoint Inhibitors'],
        focus: ['Solid Tumors'],
        description: 'Imugene is developing a range of immunotherapies that seek to activate the immune system of cancer patients to identify and eradicate tumors. The company has multiple platforms including oncolytic viruses (CF33/VAXINIA), B-cell immunotherapies (HER-Vaxx), and checkpoint inhibitors (PD1-Vaxx).',
        metrics: {
          pipelineValue: 0.65,
          managementExperience: 0.7,
          cashRunway: 0.5,
          clinicalProgress: 0.6,
          partnershipPotential: 0.8
        }
      },
      {
        id: 'prescient',
        name: 'Prescient Therapeutics',
        ticker: 'ASX:PTX',
        marketCap: 60, // $60M
        cashPosition: 18, // $18M
        burnRate: 3, // $3M quarterly
        pipelineStage: 0.5, // 0-1 scale (Preclinical/Phase 1)
        platforms: ['CAR-T', 'Targeted Therapies'],
        focus: ['Leukemia', 'Solid Tumors'],
        description: 'Prescient Therapeutics is a clinical-stage oncology company developing personalized medicine approaches to cancer, including targeted and cellular therapies. Their OmniCAR platform is a next-generation CAR-T therapy system designed to overcome the challenges of current CAR-T therapies.',
        metrics: {
          pipelineValue: 0.6,
          managementExperience: 0.65,
          cashRunway: 0.8,
          clinicalProgress: 0.4,
          partnershipPotential: 0.7
        }
      },
      {
        id: 'immutep',
        name: 'Immutep',
        ticker: 'ASX:IMM',
        marketCap: 350, // $350M
        cashPosition: 80, // $80M
        burnRate: 10, // $10M quarterly
        pipelineStage: 0.8, // 0-1 scale (Phase 2-3)
        platforms: ['LAG-3 Immunotherapy'],
        focus: ['Solid Tumors', 'Autoimmune Disease'],
        description: 'Immutep is a biotechnology company developing novel immunotherapy treatments for cancer and autoimmune diseases, with operations in Australia, Europe and the U.S. The company is the global leader in understanding and developing therapeutics that modulate Lymphocyte Activation Gene-3 (LAG-3).',
        metrics: {
          pipelineValue: 0.8,
          managementExperience: 0.85,
          cashRunway: 0.7,
          clinicalProgress: 0.75,
          partnershipPotential: 0.9
        }
      },
      {
        id: 'chimeric',
        name: 'Chimeric Therapeutics',
        ticker: 'ASX:CHM',
        marketCap: 30, // $30M
        cashPosition: 15, // $15M
        burnRate: 4, // $4M quarterly
        pipelineStage: 0.6, // 0-1 scale (Phase 1)
        platforms: ['CAR-T', 'NK Cell Therapy'],
        focus: ['Brain Cancer', 'Solid Tumors'],
        description: 'Chimeric Therapeutics is a clinical-stage cell therapy company focused on bringing the promise of cell therapy to life for more patients with cancer. The company has an innovative portfolio of cell therapy assets including CLTX CAR T for glioblastoma and CDH17 CAR T for solid tumors.',
        metrics: {
          pipelineValue: 0.55,
          managementExperience: 0.6,
          cashRunway: 0.6,
          clinicalProgress: 0.5,
          partnershipPotential: 0.65
        }
      },
      {
        id: 'kazia',
        name: 'Kazia Therapeutics',
        ticker: 'ASX:KZA',
        marketCap: 40, // $40M
        cashPosition: 12, // $12M
        burnRate: 5, // $5M quarterly
        pipelineStage: 0.75, // 0-1 scale (Phase 2-3)
        platforms: ['Small Molecule Inhibitors'],
        focus: ['Brain Cancer', 'Solid Tumors'],
        description: 'Kazia Therapeutics is an oncology-focused biotechnology company developing pharmaceutical products for the treatment of cancer. Their lead program is paxalisib, a brain-penetrant inhibitor of the PI3K / Akt / mTOR pathway, which is being developed to treat glioblastoma multiforme.',
        metrics: {
          pipelineValue: 0.7,
          managementExperience: 0.75,
          cashRunway: 0.4,
          clinicalProgress: 0.65,
          partnershipPotential: 0.6
        }
      },
      {
        id: 'race',
        name: 'Race Oncology',
        ticker: 'ASX:RAC',
        marketCap: 200, // $200M
        cashPosition: 40, // $40M
        burnRate: 6, // $6M quarterly
        pipelineStage: 0.65, // 0-1 scale (Phase 1-2)
        platforms: ['Small Molecule Drugs'],
        focus: ['Leukemia', 'Solid Tumors'],
        description: 'Race Oncology is a precision oncology company with a Phase II/III cancer drug called Zantrene®. The company is pursuing the dual strategy of clinical trials and a named patient program to create value for shareholders.',
        metrics: {
          pipelineValue: 0.75,
          managementExperience: 0.7,
          cashRunway: 0.65,
          clinicalProgress: 0.6,
          partnershipPotential: 0.7
        }
      }
    ]
  };

  // Create technology filter
  const filterContainer = document.getElementById('technology-filter-container');
  if (filterContainer) {
    // Get unique platforms
    const allPlatforms = config.companies.flatMap(company => company.platforms);
    const uniquePlatforms = [...new Set(allPlatforms)];
    
    filterContainer.innerHTML = `
      <div class="control-group">
        <label>Filter by Technology:</label>
        <label class="checkbox-label">
          <input type="checkbox" data-filter="platform" value="all" checked> All Technologies
        </label>
        ${uniquePlatforms.map(platform => `
          <label class="checkbox-label">
            <input type="checkbox" data-filter="platform" value="${platform}"> ${platform}
          </label>
        `).join('')}
      </div>
    `;
    
    // Add event listeners to filter checkboxes
    const allTechCheckbox = document.querySelector('input[value="all"]');
    const platformCheckboxes = document.querySelectorAll('input[data-filter="platform"]:not([value="all"])');
    
    allTechCheckbox.addEventListener('change', function() {
      if (this.checked) {
        platformCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        createComparisonChart();
      }
    });
    
    platformCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          allTechCheckbox.checked = false;
        } else if ([...platformCheckboxes].every(cb => !cb.checked)) {
          allTechCheckbox.checked = true;
        }
        createComparisonChart();
      });
    });
  }

  // Initialize comparison chart
  const createComparisonChart = () => {
    const container = document.getElementById(config.container.substring(1));
    if (!container) return;

    // Clear previous chart if any
    container.innerHTML = '';

    // Get selected filters
    const allTechSelected = document.querySelector('input[value="all"]').checked;
    const selectedPlatforms = [];
    
    if (!allTechSelected) {
      document.querySelectorAll('input[data-filter="platform"]:checked').forEach(checkbox => {
        selectedPlatforms.push(checkbox.value);
      });
    }

    // Filter companies based on selected platforms
    const filteredCompanies = allTechSelected ? 
      config.companies : 
      config.companies.filter(company => 
        company.platforms.some(platform => selectedPlatforms.includes(platform))
      );

    // If no companies match filters, show message
    if (filteredCompanies.length === 0) {
      container.innerHTML = '<div class="no-data-message">No companies match the selected filters.</div>';
      return;
    }

    // Calculate chart dimensions
    const margin = { top: 50, right: 50, bottom: 70, left: 70 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set scales
    const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height, 0]);

    const size = d3.scaleLinear()
      .domain([d3.min(filteredCompanies, d => d.marketCap), d3.max(filteredCompanies, d => d.marketCap)])
      .range([10, 40]);

    const color = d3.scaleOrdinal()
      .domain(filteredCompanies.map(d => d.id))
      .range(d3.schemeCategory10);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${d * 100}%`));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d * 100}%`));

    // Add X axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Pipeline Stage Progress');

    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .text('Cash Runway (Quarters)');

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .ticks(5)
        .tickSize(-height)
        .tickFormat('')
      );

    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-width)
        .tickFormat('')
      );

    // Add bubbles
    const bubbles = svg.selectAll('.bubble')
      .data(filteredCompanies)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', d => x(d.pipelineStage))
      .attr('cy', d => y(d.cashPosition / d.burnRate / 4)) // Convert to 0-1 scale (normalized by 4 years max)
      .attr('r', d => size(d.marketCap))
      .attr('fill', d => color(d.id))
      .attr('fill-opacity', 0.7)
      .attr('stroke', d => color(d.id))
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d) {
        // Highlight bubble
        d3.select(this)
          .attr('fill-opacity', 1)
          .attr('stroke-width', 3);
        
        // Show tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `
          <h4>${d.name} (${d.ticker})</h4>
          <p><strong>Market Cap:</strong> $${d.marketCap}M</p>
          <p><strong>Cash Position:</strong> $${d.cashPosition}M</p>
          <p><strong>Cash Runway:</strong> ${(d.cashPosition / d.burnRate).toFixed(1)} quarters</p>
          <p><strong>Platforms:</strong> ${d.platforms.join(', ')}</p>
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
        
        // Show company details
        showCompanyDetails(d);
        
        // Remove tooltip on mouseout
        this.onmouseout = function() {
          document.body.removeChild(tooltip);
          d3.select(this)
            .attr('fill-opacity', 0.7)
            .attr('stroke-width', 2);
        };
      })
      .on('click', function(event, d) {
        // Highlight selected company
        svg.selectAll('.bubble')
          .attr('fill-opacity', 0.3)
          .attr('stroke-width', 1);
        
        d3.select(this)
          .attr('fill-opacity', 1)
          .attr('stroke-width', 3);
        
        // Show company details
        showCompanyDetails(d);
      });

    // Add labels
    svg.selectAll('.label')
      .data(filteredCompanies)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.pipelineStage))
      .attr('y', d => y(d.cashPosition / d.burnRate / 4) - size(d.marketCap) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d => d.name);

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, 10)`);
    
    legend.append('text')
      .attr('x', 0)
      .attr('y', -5)
      .attr('font-weight', 'bold')
      .text('Market Cap');
    
    const legendItems = [
      { label: '$50M', value: 50 },
      { label: '$150M', value: 150 },
      { label: '$300M', value: 300 }
    ];
    
    legendItems.forEach((item, i) => {
      legend.append('circle')
        .attr('cx', 10)
        .attr('cy', i * 25 + 15)
        .attr('r', size(item.value))
        .attr('fill', '#999')
        .attr('fill-opacity', 0.5)
        .attr('stroke', '#999');
      
      legend.append('text')
        .attr('x', 30)
        .attr('y', i * 25 + 20)
        .text(item.label);
    });

    // Show Imugene details by default
    const imugene = config.companies.find(company => company.id === 'imugene');
    if (imugene) {
      showCompanyDetails(imugene);
    }
  };

  // Show company details
  const showCompanyDetails = (company) => {
    const detailsContainer = document.getElementById(config.detailsContainer.substring(1));
    const radarContainer = document.getElementById(config.radarContainer.substring(1));
    
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <h3>${company.name} <span style="font-size: 14px; color: #666;">(${company.ticker})</span></h3>
        <p><strong>Market Cap:</strong> $${company.marketCap}M</p>
        <p><strong>Cash Position:</strong> $${company.cashPosition}M</p>
        <p><strong>Quarterly Burn Rate:</strong> $${company.burnRate}M</p>
        <p><strong>Cash Runway:</strong> ${(company.cashPosition / company.burnRate).toFixed(1)} quarters</p>
        <p><strong>Technology Platforms:</strong> ${company.platforms.join(', ')}</p>
        <p><strong>Focus Areas:</strong> ${company.focus.join(', ')}</p>
        <p>${company.description}</p>
      `;
    }
    
    if (radarContainer) {
      // Clear previous chart
      radarContainer.innerHTML = '';
      
      // Create radar chart
      const metrics = [
        { name: 'Pipeline Value', key: 'pipelineValue' },
        { name: 'Management', key: 'managementExperience' },
        { name: 'Cash Runway', key: 'cashRunway' },
        { name: 'Clinical Progress', key: 'clinicalProgress' },
        { name: 'Partnership Potential', key: 'partnershipPotential' }
      ];
      
      const radarData = metrics.map(metric => ({
        axis: metric.name,
        value: company.metrics[metric.key]
      }));
      
      // Calculate chart dimensions
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = radarContainer.clientWidth - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
      const radius = Math.min(width, height) / 2;
      
      // Create SVG
      const svg = d3.select(radarContainer)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);
      
      // Create scales
      const angleScale = d3.scaleLinear()
        .domain([0, metrics.length])
        .range([0, 2 * Math.PI]);
      
      const radiusScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, radius]);
      
      // Create axes
      const axes = svg.selectAll('.axis')
        .data(metrics)
        .enter()
        .append('g')
        .attr('class', 'axis');
      
      axes.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (d, i) => radiusScale(1) * Math.cos(angleScale(i) - Math.PI / 2))
        .attr('y2', (d, i) => radiusScale(1) * Math.sin(angleScale(i) - Math.PI / 2))
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1);
      
      axes.append('text')
        .attr('x', (d, i) => radiusScale(1.1) * Math.cos(angleScale(i) - Math.PI / 2))
        .attr('y', (d, i) => radiusScale(1.1) * Math.sin(angleScale(i) - Math.PI / 2))
        .attr('text-anchor', (d, i) => {
          const angle = angleScale(i);
          if (angle === 0 || angle === Math.PI) return 'middle';
          return angle < Math.PI ? 'start' : 'end';
        })
        .attr('dominant-baseline', (d, i) => {
          const angle = angleScale(i);
          if (angle === Math.PI / 2 || angle === 3 * Math.PI / 2) return 'middle';
          return angle < Math.PI / 2 || angle > 3 * Math.PI / 2 ? 'hanging' : 'auto';
        })
        .attr('font-size', '12px')
        .text(d => d.name);
      
      // Create radar rings
      const rings = [0.2, 0.4, 0.6, 0.8, 1];
      
      rings.forEach(ring => {
        svg.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', radiusScale(ring))
          .attr('fill', 'none')
          .attr('stroke', '#ddd')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', ring === 1 ? 'none' : '2,2');
      });
      
      // Create radar path
      const radarLine = d3.lineRadial()
        .radius(d => radiusScale(d.value))
        .angle((d, i) => angleScale(i) - Math.PI / 2)
        .curve(d3.curveLinearClosed);
      
      svg.append('path')
        .datum(radarData)
        .attr('d', radarLine)
        .attr('fill', d3.schemeCategory10[config.companies.findIndex(c => c.id === company.id)])
        .attr('fill-opacity', 0.5)
        .attr('stroke', d3.schemeCategory10[config.companies.findIndex(c => c.id === company.id)])
        .attr('stroke-width', 2);
      
      // Add value points
      svg.selectAll('.value-point')
        .data(radarData)
        .enter()
        .append('circle')
        .attr('class', 'value-point')
        .attr('cx', (d, i) => radiusScale(d.value) * Math.cos(angleScale(i) - Math.PI / 2))
        .attr('cy', (d, i) => radiusScale(d.value) * Math.sin(angleScale(i) - Math.PI / 2))
        .attr('r', 4)
        .attr('fill', d3.schemeCategory10[config.companies.findIndex(c => c.id === company.id)]);
      
      // Add title
      svg.append('text')
        .attr('x', 0)
        .attr('y', -radius - 20)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .text('Company Metrics');
    }
  };

  // Initialize chart
  createComparisonChart();

  // Handle window resize
  window.addEventListener('resize', createComparisonChart);
});
