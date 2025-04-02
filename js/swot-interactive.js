// SWOT Analysis Interactive Component
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with SWOT analysis
  const swotContainer = document.getElementById('swot-analysis-container');
  if (!swotContainer) return;
  
  // Initialize the view state
  let currentView = 'quadrant';
  
  // SWOT data structure
  const swotData = {
    strengths: [
      {
        title: "Proprietary Immunotherapy Technology",
        description: "Targeting multiple cancer pathways simultaneously with unique mechanisms of action"
      },
      {
        title: "Strong Leadership Team",
        description: "Industry veterans with proven track record in biotech development and exits"
      },
      {
        title: "Diverse Pipeline",
        description: "Multiple drug candidates across different technology platforms"
      },
      {
        title: "Positive Early Clinical Data",
        description: "Encouraging efficacy and safety signals from lead candidates"
      },
      {
        title: "Substantial Cash Position",
        description: "$100M provides runway through multiple value-creating milestones"
      },
      {
        title: "Improving Sentiment",
        description: "Recent data and presentations have been well-received by market"
      }
    ],
    weaknesses: [
      {
        title: "Significant Cash Burn Rate",
        description: "$50M annually requires careful cash management"
      },
      {
        title: "History of Dilutive Capital Raises",
        description: "Previous financing rounds have diluted existing shareholders"
      },
      {
        title: "No Approved Products",
        description: "Lack of revenue streams creates dependency on capital markets"
      },
      {
        title: "Clinical Trial Dependency",
        description: "Future value heavily dependent on clinical trial outcomes"
      },
      {
        title: "Management Concerns",
        description: "Some investors have raised questions about financing practices"
      },
      {
        title: "Sector Valuation Compression",
        description: "Biotech sector experiencing general valuation pressure"
      }
    ],
    opportunities: [
      {
        title: "Positive Clinical Trial Results",
        description: "Could drive significant revaluation"
      },
      {
        title: "Acquisition Interest",
        description: "Potential target for larger pharmaceutical companies"
      },
      {
        title: "Partnership Deals",
        description: "Could provide non-dilutive funding"
      },
      {
        title: "Multiple Catalysts",
        description: "Expected in next 12-24 months"
      },
      {
        title: "Increasing Interest in Immunotherapies",
        description: "Growing market for novel cancer treatments"
      },
      {
        title: "Expanded Indications",
        description: "Could open larger market opportunities"
      }
    ],
    threats: [
      {
        title: "Market Skepticism",
        description: "About commercial viability of novel therapies"
      },
      {
        title: "Competitive Landscape",
        description: "Well-funded rivals pursuing similar approaches"
      },
      {
        title: "Clinical Trial Failures",
        description: "Could severely impact valuation"
      },
      {
        title: "Dilutive Financing",
        description: "Potential for further share dilution"
      },
      {
        title: "Regulatory Hurdles",
        description: "Approval delays could impact timeline"
      },
      {
        title: "Market Sentiment",
        description: "Toward small-cap biotech remains cautious"
      }
    ]
  };
  
  // Create the UI elements
  function createSwotUI() {
    // Create header
    const header = document.createElement('h1');
    header.textContent = 'SWOT Analysis';
    swotContainer.appendChild(header);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = 'This interactive SWOT analysis highlights Imugene\'s key strategic position in the biotech market:';
    swotContainer.appendChild(description);
    
    // Create view selector buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'swot-buttons';
    buttonContainer.innerHTML = `
      <button id="quadrant-view" class="active">Quadrant View</button>
      <button id="radar-chart">Radar Chart</button>
      <button id="bar-chart">Bar Chart</button>
      <button id="competitor-comparison">Competitor Comparison</button>
    `;
    swotContainer.appendChild(buttonContainer);
    
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.id = 'swot-content';
    swotContainer.appendChild(contentContainer);
    
    // Add event listeners to buttons
    document.getElementById('quadrant-view').addEventListener('click', () => {
      setActiveButton('quadrant-view');
      renderQuadrantView();
    });
    
    document.getElementById('radar-chart').addEventListener('click', () => {
      setActiveButton('radar-chart');
      renderRadarChart();
    });
    
    document.getElementById('bar-chart').addEventListener('click', () => {
      setActiveButton('bar-chart');
      renderBarChart();
    });
    
    document.getElementById('competitor-comparison').addEventListener('click', () => {
      setActiveButton('competitor-comparison');
      renderCompetitorComparison();
    });
    
    // Initial render
    renderQuadrantView();
  }
  
  // Helper function to set active button
  function setActiveButton(buttonId) {
    document.querySelectorAll('.swot-buttons button').forEach(button => {
      button.classList.remove('active');
    });
    document.getElementById(buttonId).classList.add('active');
  }
  
  // Render quadrant view
  function renderQuadrantView() {
    currentView = 'quadrant';
    const contentContainer = document.getElementById('swot-content');
    
    let html = `
      <div class="swot-quadrant">
        <div class="swot-row">
          <div class="swot-cell strengths">
            <h3>Strengths</h3>
            <ul>
    `;
    
    swotData.strengths.forEach(item => {
      html += `
        <li>
          <strong>${item.title}</strong>
          <p>${item.description}</p>
        </li>
      `;
    });
    
    html += `
            </ul>
          </div>
          <div class="swot-cell weaknesses">
            <h3>Weaknesses</h3>
            <ul>
    `;
    
    swotData.weaknesses.forEach(item => {
      html += `
        <li>
          <strong>${item.title}</strong>
          <p>${item.description}</p>
        </li>
      `;
    });
    
    html += `
            </ul>
          </div>
        </div>
        <div class="swot-row">
          <div class="swot-cell opportunities">
            <h3>Opportunities</h3>
            <ul>
    `;
    
    swotData.opportunities.forEach(item => {
      html += `
        <li>
          <strong>${item.title}</strong>
          <p>${item.description}</p>
        </li>
      `;
    });
    
    html += `
            </ul>
          </div>
          <div class="swot-cell threats">
            <h3>Threats</h3>
            <ul>
    `;
    
    swotData.threats.forEach(item => {
      html += `
        <li>
          <strong>${item.title}</strong>
          <p>${item.description}</p>
        </li>
      `;
    });
    
    html += `
            </ul>
          </div>
        </div>
      </div>
    `;
    
    contentContainer.innerHTML = html;
  }
  
  // Render radar chart (placeholder - would use a charting library in production)
  function renderRadarChart() {
    currentView = 'radar';
    const contentContainer = document.getElementById('swot-content');
    
    contentContainer.innerHTML = `
      <div class="chart-container">
        <p>Radar chart visualization would be implemented here using a charting library like Chart.js.</p>
        <p>This would show the relative strengths of each SWOT category in a radar/spider chart format.</p>
        <img src="img/swot_analysis.png" alt="SWOT Analysis" class="placeholder-image">
      </div>
    `;
  }
  
  // Render bar chart (placeholder - would use a charting library in production)
  function renderBarChart() {
    currentView = 'bar';
    const contentContainer = document.getElementById('swot-content');
    
    contentContainer.innerHTML = `
      <div class="chart-container">
        <p>Bar chart visualization would be implemented here using a charting library like Chart.js.</p>
        <p>This would show the count and relative importance of items in each SWOT category.</p>
        <img src="img/swot_analysis.png" alt="SWOT Analysis" class="placeholder-image">
      </div>
    `;
  }
  
  // Render competitor comparison (placeholder)
  function renderCompetitorComparison() {
    currentView = 'competitor';
    const contentContainer = document.getElementById('swot-content');
    
    contentContainer.innerHTML = `
      <div class="comparison-container">
        <p>Competitor comparison would be implemented here, showing how Imugene's SWOT profile compares to key competitors.</p>
        <p>This would include a side-by-side comparison of strengths and weaknesses relative to peers.</p>
        <img src="img/market_cap_comparison_ex_csl.png" alt="Market Cap Comparison" class="placeholder-image">
      </div>
    `;
  }
  
  // Initialize the component
  createSwotUI();
});
