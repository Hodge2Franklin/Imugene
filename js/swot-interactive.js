// SWOT Analysis Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all SWOT analysis components
    const swotComponents = document.querySelectorAll('.swot-analysis-component');
    
    swotComponents.forEach(component => {
        const tabs = component.querySelectorAll('.swot-tab');
        const views = component.querySelectorAll('.swot-view');
        
        // Tab switching functionality
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and views
                tabs.forEach(t => t.classList.remove('active'));
                views.forEach(v => v.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding view
                const viewType = this.getAttribute('data-view');
                component.querySelector(`.${viewType}-view`).classList.add('active');
            });
        });
        
        // Chart controls functionality
        const chartControls = component.querySelectorAll('.chart-control');
        chartControls.forEach(control => {
            control.addEventListener('click', function() {
                chartControls.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // In a real implementation, this would update the chart data
                // For now, we'll just simulate a change
                const factor = this.getAttribute('data-factor');
                console.log(`Changing chart to show ${factor}`);
                
                // Here you would update the chart based on the selected factor
            });
        });
    });
    
    // Initialize SWOT Analysis if not already present
    initializeSWOTAnalysis();
});

function initializeSWOTAnalysis() {
    // Check if we need to create the SWOT analysis component
    if (!document.querySelector('.swot-analysis-component')) {
        const swotContainer = document.getElementById('swot-analysis-container');
        if (swotContainer) {
            swotContainer.innerHTML = createSWOTAnalysisHTML();
            
            // Initialize the component after creating it
            const swotComponents = document.querySelectorAll('.swot-analysis-component');
            swotComponents.forEach(component => {
                const tabs = component.querySelectorAll('.swot-tab');
                const views = component.querySelectorAll('.swot-view');
                
                // Tab switching functionality
                tabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        // Remove active class from all tabs and views
                        tabs.forEach(t => t.classList.remove('active'));
                        views.forEach(v => v.classList.remove('active'));
                        
                        // Add active class to clicked tab
                        this.classList.add('active');
                        
                        // Show corresponding view
                        const viewType = this.getAttribute('data-view');
                        component.querySelector(`.${viewType}-view`).classList.add('active');
                    });
                });
            });
        }
    }
}

function createSWOTAnalysisHTML() {
    return `
    <div class="swot-analysis-component">
        <h2>SWOT Analysis</h2>
        <p>This interactive SWOT analysis highlights Imugene's key strategic position in the biotech market:</p>
        
        <div class="swot-tabs">
            <div class="swot-tab active" data-view="quadrant">Quadrant View</div>
            <div class="swot-tab" data-view="radar">Radar Chart</div>
            <div class="swot-tab" data-view="bar">Bar Chart</div>
            <div class="swot-tab" data-view="comparison">Competitor Comparison</div>
        </div>
        
        <!-- Quadrant View -->
        <div class="swot-view quadrant-view active">
            <div class="swot-grid">
                <div class="swot-quadrant strengths-quadrant">
                    <h3>Strengths</h3>
                    <ul>
                        <li>
                            <strong>Proprietary Immunotherapy Technology</strong>
                            Targeting multiple cancer pathways simultaneously with unique mechanisms of action
                        </li>
                        <li>
                            <strong>Strong Leadership Team</strong>
                            Industry veterans with proven track record in biotech development and exits
                        </li>
                        <li>
                            <strong>Diverse Pipeline</strong>
                            Multiple drug candidates across different technology platforms
                        </li>
                        <li>
                            <strong>Positive Early Clinical Data</strong>
                            Encouraging efficacy and safety signals from lead candidates
                        </li>
                        <li>
                            <strong>Substantial Cash Position</strong>
                            $100M provides runway through multiple value-creating milestones
                        </li>
                        <li>
                            <strong>Improving Sentiment</strong>
                            Recent data and presentations have been well-received by market
                        </li>
                    </ul>
                </div>
                
                <div class="swot-quadrant weaknesses-quadrant">
                    <h3>Weaknesses</h3>
                    <ul>
                        <li>
                            <strong>Significant Cash Burn Rate</strong>
                            $50M annually requires careful cash management
                        </li>
                        <li>
                            <strong>History of Dilutive Capital Raises</strong>
                            Previous financing rounds have diluted existing shareholders
                        </li>
                        <li>
                            <strong>No Approved Products</strong>
                            Lack of revenue streams creates dependency on capital markets
                        </li>
                        <li>
                            <strong>Clinical Trial Dependency</strong>
                            Future value heavily dependent on clinical trial outcomes
                        </li>
                        <li>
                            <strong>Management Concerns</strong>
                            Some investors have raised questions about financing practices
                        </li>
                        <li>
                            <strong>Sector Valuation Compression</strong>
                            Biotech sector experiencing general valuation pressure
                        </li>
                    </ul>
                </div>
                
                <div class="swot-quadrant opportunities-quadrant">
                    <h3>Opportunities</h3>
                    <ul>
                        <li>
                            <strong>Positive Clinical Trial Results</strong>
                            Could drive significant revaluation
                        </li>
                        <li>
                            <strong>Acquisition Interest</strong>
                            Potential target for larger pharmaceutical companies
                        </li>
                        <li>
                            <strong>Partnership Deals</strong>
                            Could provide non-dilutive funding
                        </li>
                        <li>
                            <strong>Multiple Catalysts</strong>
                            Expected in next 12-24 months
                        </li>
                        <li>
                            <strong>Increasing Interest in Immunotherapies</strong>
                            Growing market for novel cancer treatments
                        </li>
                        <li>
                            <strong>Expanded Indications</strong>
                            Could open larger market opportunities
                        </li>
                    </ul>
                </div>
                
                <div class="swot-quadrant threats-quadrant">
                    <h3>Threats</h3>
                    <ul>
                        <li>
                            <strong>Market Skepticism</strong>
                            About commercial viability of novel therapies
                        </li>
                        <li>
                            <strong>Competitive Landscape</strong>
                            Well-funded rivals pursuing similar approaches
                        </li>
                        <li>
                            <strong>Clinical Trial Failures</strong>
                            Could severely impact valuation
                        </li>
                        <li>
                            <strong>Dilutive Financing</strong>
                            Potential for further share dilution
                        </li>
                        <li>
                            <strong>Regulatory Hurdles</strong>
                            Approval delays could impact timeline
                        </li>
                        <li>
                            <strong>Market Sentiment</strong>
                            Toward small-cap biotech remains cautious
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Radar Chart View -->
        <div class="swot-view radar-view">
            <div class="radar-chart-container">
                <div class="radar-chart">
                    <p>Radar chart visualization would be implemented here using a charting library like Chart.js.</p>
                    <p>This would show the relative strengths of each SWOT category in a radar/spider chart format.</p>
                </div>
                <div class="chart-controls">
                    <div class="chart-control active" data-factor="overall">Overall</div>
                    <div class="chart-control" data-factor="technology">Technology</div>
                    <div class="chart-control" data-factor="financial">Financial</div>
                    <div class="chart-control" data-factor="market">Market</div>
                </div>
            </div>
        </div>
        
        <!-- Bar Chart View -->
        <div class="swot-view bar-view">
            <div class="radar-chart-container">
                <div class="radar-chart">
                    <p>Bar chart visualization would be implemented here using a charting library like Chart.js.</p>
                    <p>This would show the count and relative importance of items in each SWOT category.</p>
                </div>
                <div class="chart-controls">
                    <div class="chart-control active" data-factor="count">Count</div>
                    <div class="chart-control" data-factor="impact">Impact</div>
                    <div class="chart-control" data-factor="probability">Probability</div>
                    <div class="chart-control" data-factor="timeline">Timeline</div>
                </div>
            </div>
        </div>
        
        <!-- Competitor Comparison View -->
        <div class="swot-view comparison-view">
            <div class="comparison-table-container">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Factor</th>
                            <th>Imugene</th>
                            <th>Competitor A</th>
                            <th>Competitor B</th>
                            <th>Competitor C</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Technology Platform</td>
                            <td class="highlight-positive">Multiple platforms</td>
                            <td>Single platform</td>
                            <td>Dual platforms</td>
                            <td>Single platform</td>
                        </tr>
                        <tr>
                            <td>Cash Position</td>
                            <td class="highlight-positive">$100M</td>
                            <td>$45M</td>
                            <td class="highlight-positive">$120M</td>
                            <td>$30M</td>
                        </tr>
                        <tr>
                            <td>Burn Rate</td>
                            <td class="highlight-negative">$50M/year</td>
                            <td>$20M/year</td>
                            <td class="highlight-negative">$60M/year</td>
                            <td>$15M/year</td>
                        </tr>
                        <tr>
                            <td>Clinical Stage</td>
                            <td>Phase 1/2</td>
                            <td>Phase 1</td>
                            <td class="highlight-positive">Phase 2/3</td>
                            <td>Phase 1</td>
                        </tr>
                        <tr>
                            <td>Market Cap</td>
                            <td>$220M</td>
                            <td>$150M</td>
                            <td class="highlight-positive">$450M</td>
                            <td>$100M</td>
                        </tr>
                        <tr>
                            <td>Partnerships</td>
                            <td>Limited</td>
                            <td>None</td>
                            <td class="highlight-positive">Multiple</td>
                            <td>One major</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
}
