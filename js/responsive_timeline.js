/* Responsive Design for Clinical Trial Timeline Visualization */
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('clinical-trial-timeline-container');
    if (!container) return;
    
    // Initialize responsive design module
    initializeResponsiveDesign();
    
    // Function to initialize responsive design
    function initializeResponsiveDesign() {
        // Add responsive class to container
        container.classList.add('responsive-timeline');
        
        // Add viewport meta tag if not present
        ensureViewportMetaTag();
        
        // Add responsive styles
        addResponsiveStyles();
        
        // Add resize handler
        window.addEventListener('resize', handleResize);
        
        // Initial resize handling
        handleResize();
        
        // Add touch support for mobile devices
        addTouchSupport();
        
        // Add responsive navigation for mobile
        addResponsiveNavigation();
    }
    
    // Function to ensure viewport meta tag is present
    function ensureViewportMetaTag() {
        if (!document.querySelector('meta[name="viewport"]')) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(meta);
        }
    }
    
    // Function to add responsive styles
    function addResponsiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Base responsive styles */
            .responsive-timeline {
                width: 100%;
                overflow-x: hidden;
            }
            
            /* Responsive controls */
            @media (max-width: 768px) {
                .timeline-controls {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .filter-section {
                    flex-direction: column;
                    width: 100%;
                    margin-bottom: 15px;
                }
                
                .filter-group, .option-group {
                    margin-bottom: 10px;
                    width: 100%;
                }
                
                .filter-group select {
                    width: 100%;
                }
                
                .projection-controls {
                    padding: 10px;
                }
                
                .projection-options {
                    flex-direction: column;
                }
                
                .projection-option {
                    margin-bottom: 10px;
                    width: 100%;
                }
                
                .parameter-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            /* Responsive visualization */
            @media (max-width: 768px) {
                .chart-container {
                    height: 300px;
                }
                
                .cost-container {
                    height: 200px;
                }
                
                .cash-flow-container {
                    height: 250px;
                }
                
                /* Adjust tooltip positioning for mobile */
                .educational-tooltip {
                    max-width: 250px;
                    left: 50% !important;
                    transform: translateX(-50%);
                }
            }
            
            /* Small screens */
            @media (max-width: 480px) {
                .chart-container {
                    height: 250px;
                }
                
                .timeline-header h2 {
                    font-size: 18px;
                }
                
                .timeline-header p {
                    font-size: 12px;
                }
                
                /* Adjust detail panel for mobile */
                .detail-panel {
                    width: 85%;
                    right: -85%;
                }
                
                .detail-panel.active {
                    right: 0;
                }
                
                /* Adjust educational modal for mobile */
                .educational-modal-content {
                    width: 95%;
                    padding: 15px;
                }
                
                /* Adjust summary grid for mobile */
                .summary-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            /* Touch-friendly controls */
            @media (pointer: coarse) {
                .filter-group select,
                .projection-option select,
                .checkbox-group input[type="checkbox"],
                .parameter-group input[type="range"],
                .view-details-btn,
                .action-button {
                    min-height: 44px;
                    min-width: 44px;
                }
                
                .educational-icon {
                    padding: 8px;
                    margin: 0 5px;
                }
                
                .close-modal {
                    padding: 10px;
                    font-size: 28px;
                }
            }
            
            /* Print styles */
            @media print {
                .timeline-controls,
                .projection-controls,
                .detail-panel,
                .educational-tooltip,
                .summary-actions {
                    display: none !important;
                }
                
                .chart-container,
                .cost-container,
                .cash-flow-container {
                    break-inside: avoid;
                    page-break-inside: avoid;
                    height: auto !important;
                }
                
                .visualization-container {
                    width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                
                .timeline-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .summary-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
            }
            
            /* Mobile navigation */
            .mobile-nav-toggle {
                display: none;
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background-color: #3498db;
                border-radius: 50%;
                color: white;
                text-align: center;
                line-height: 50px;
                font-size: 24px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                cursor: pointer;
            }
            
            .mobile-nav {
                display: none;
                position: fixed;
                bottom: 80px;
                right: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                z-index: 999;
                overflow: hidden;
            }
            
            .mobile-nav.active {
                display: block;
            }
            
            .mobile-nav-item {
                padding: 12px 15px;
                border-bottom: 1px solid #eee;
                cursor: pointer;
            }
            
            .mobile-nav-item:last-child {
                border-bottom: none;
            }
            
            .mobile-nav-item:hover {
                background-color: #f8f9fa;
            }
            
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Function to handle resize events
    function handleResize() {
        const width = window.innerWidth;
        
        // Get chart containers
        const chartContainer = document.getElementById('gantt-chart-container');
        const costContainer = document.getElementById('cost-projection-container');
        const cashFlowContainer = document.getElementById('cash-flow-container');
        
        // Adjust chart heights based on screen width
        if (chartContainer) {
            if (width <= 480) {
                chartContainer.style.height = '250px';
            } else if (width <= 768) {
                chartContainer.style.height = '300px';
            } else {
                chartContainer.style.height = '400px';
            }
        }
        
        if (costContainer) {
            if (width <= 768) {
                costContainer.style.height = '200px';
            } else {
                costContainer.style.height = '250px';
            }
        }
        
        if (cashFlowContainer) {
            if (width <= 768) {
                cashFlowContainer.style.height = '250px';
            } else {
                cashFlowContainer.style.height = '300px';
            }
        }
        
        // Adjust detail panel width
        const detailPanel = document.querySelector('.detail-panel');
        if (detailPanel) {
            if (width <= 480) {
                detailPanel.style.width = '85%';
                detailPanel.style.right = '-85%';
            } else {
                detailPanel.style.width = '320px';
                detailPanel.style.right = '-320px';
            }
        }
        
        // Redraw charts if they exist
        redrawCharts();
    }
    
    // Function to redraw charts
    function redrawCharts() {
        // Check if Chart.js is available
        if (typeof Chart !== 'undefined') {
            // Redraw Gantt chart
            if (window.ganttChart) {
                window.ganttChart.resize();
            }
            
            // Redraw cost projection chart
            if (window.costChart) {
                window.costChart.resize();
            }
            
            // Redraw cash flow chart
            if (window.cashFlowChart) {
                window.cashFlowChart.resize();
            }
        }
    }
    
    // Function to add touch support for mobile devices
    function addTouchSupport() {
        // Add touch event handlers for educational icons
        document.body.addEventListener('touchstart', function(e) {
            const target = e.target.closest('.educational-icon');
            if (target) {
                // Prevent default to avoid both touch and click events
                e.preventDefault();
                
                // Trigger tooltip
                const mouseenterEvent = new MouseEvent('mouseenter', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                
                target.dispatchEvent(mouseenterEvent);
            }
        }, { passive: false });
        
        // Handle touch events for detail panel
        const detailPanel = document.querySelector('.detail-panel');
        if (detailPanel) {
            // Add swipe to close functionality
            let touchStartX = 0;
            let touchEndX = 0;
            
            detailPanel.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            detailPanel.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                // If swiping left when panel is open, close it
                if (detailPanel.classList.contains('active') && touchEndX < touchStartX - 50) {
                    detailPanel.classList.remove('active');
                }
            }
        }
    }
    
    // Function to add responsive navigation for mobile
    function addResponsiveNavigation() {
        // Create mobile navigation toggle button
        const navToggle = document.createElement('div');
        navToggle.className = 'mobile-nav-toggle';
        navToggle.innerHTML = '<i>≡</i>';
        
        // Create mobile navigation menu
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Add navigation items
        mobileNav.innerHTML = `
            <div class="mobile-nav-item" data-action="filter">Filter Trials</div>
            <div class="mobile-nav-item" data-action="view">Change View</div>
            <div class="mobile-nav-item" data-action="project">Projections</div>
            <div class="mobile-nav-item" data-action="export">Export Data</div>
            <div class="mobile-nav-item" data-action="help">Help</div>
        `;
        
        // Add to document
        document.body.appendChild(navToggle);
        document.body.appendChild(mobileNav);
        
        // Add toggle functionality
        navToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
        
        // Add navigation item functionality
        mobileNav.addEventListener('click', function(e) {
            const item = e.target.closest('.mobile-nav-item');
            if (!item) return;
            
            const action = item.dataset.action;
            
            // Hide menu
            mobileNav.classList.remove('active');
            
            // Perform action
            switch (action) {
                case 'filter':
                    scrollToElement('.filter-section');
                    break;
                case 'view':
                    scrollToElement('.option-group');
                    break;
                case 'project':
                    scrollToElement('.projection-controls');
                    break;
                case 'export':
                    // Trigger export if available
                    const exportBtn = document.getElementById('export-projection');
                    if (exportBtn) {
                        exportBtn.click();
                    } else {
                        alert('Export functionality is not available yet.');
                    }
                    break;
                case 'help':
                    showHelpOverlay();
                    break;
            }
        });
        
        // Function to scroll to element
        function scrollToElement(selector) {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Function to show help overlay
        function showHelpOverlay() {
            // Create help overlay
            const helpOverlay = document.createElement('div');
            helpOverlay.className = 'help-overlay';
            helpOverlay.innerHTML = `
                <div class="help-content">
                    <div class="help-header">
                        <h3>Clinical Trial Timeline Help</h3>
                        <button class="close-help">&times;</button>
                    </div>
                    <div class="help-body">
                        <h4>Basic Navigation</h4>
                        <ul>
                            <li><strong>Filter Trials:</strong> Use the filters at the top to show specific trials by phase, indication, or drug.</li>
                            <li><strong>Change View:</strong> Switch between Gantt chart, timeline view, or milestone table.</li>
                            <li><strong>Hover for Details:</strong> Hover over any trial or milestone to see detailed information.</li>
                            <li><strong>Click for More:</strong> Click on a trial to open a detailed side panel.</li>
                        </ul>
                        
                        <h4>Projections</h4>
                        <ul>
                            <li><strong>Scenario Selection:</strong> Choose between base case, optimistic, or pessimistic scenarios.</li>
                            <li><strong>Custom Parameters:</strong> Adjust success probability, duration, cost, and market potential.</li>
                            <li><strong>Cash Flow Analysis:</strong> View projected costs, revenues, and cash balance.</li>
                        </ul>
                        
                        <h4>Educational Content</h4>
                        <ul>
                            <li><strong>Info Icons:</strong> Click on <span class="inline-info-icon">i</span> icons to learn about clinical trial terminology.</li>
                            <li><strong>Related Terms:</strong> Explore related concepts through linked terms.</li>
                        </ul>
                    </div>
                </div>
            `;
            
            // Add styles
            helpOverlay.style.position = 'fixed';
            helpOverlay.style.top = '0';
            helpOverlay.style.left = '0';
            helpOverlay.style.width = '100%';
            helpOverlay.style.height = '100%';
            helpOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            helpOverlay.style.display = 'flex';
            helpOverlay.style.justifyContent = 'center';
            helpOverlay.style.alignItems = 'center';
            helpOverlay.style.zIndex = '2000';
            
            const helpContent = helpOverlay.querySelector('.help-content');
            helpContent.style.backgroundColor = 'white';
            helpContent.style.borderRadius = '8px';
            helpContent.style.padding = '20px';
            helpContent.style.width = '90%';
            helpContent.style.maxWidth = '500px';
            helpContent.style.maxHeight = '80vh';
            helpContent.style.overflow = 'auto';
            helpContent.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            
            const helpHeader = helpOverlay.querySelector('.help-header');
            helpHeader.style.display = 'flex';
            helpHeader.style.justifyContent = 'space-between';
            helpHeader.style.alignItems = 'center';
            helpHeader.style.borderBottom = '1px solid #eee';
            helpHeader.style.paddingBottom = '10px';
            helpHeader.style.marginBottom = '15px';
            
            const closeButton = helpOverlay.querySelector('.close-help');
            closeButton.style.background = 'none';
            closeButton.style.border = 'none';
            closeButton.style.fontSize = '24px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.color = '#999';
            
            const inlineIcon = helpOverlay.querySelector('.inline-info-icon');
            inlineIcon.style.display = 'inline-flex';
            inlineIcon.style.justifyContent = 'center';
            inlineIcon.style.alignItems = 'center';
            inlineIcon.style.width = '16px';
            inlineIcon.style.height = '16px';
            inlineIcon.style.borderRadius = '50%';
            inlineIcon.style.backgroundColor = '#3498db';
            inlineIcon.style.color = 'white';
            inlineIcon.style.fontSize = '12px';
            inlineIcon.style.fontWeight = 'bold';
            
            // Add to document
            document.body.appendChild(helpOverlay);
            
            // Add event listener to close button
            closeButton.addEventListener('click', () => {
                document.body.removeChild(helpOverlay);
            });
            
            // Close overlay when clicking outside content
            helpOverlay.addEventListener('click', (e) => {
                if (e.target === helpOverlay) {
                    document.body.removeChild(helpOverlay);
                }
            });
        }
    }
});
