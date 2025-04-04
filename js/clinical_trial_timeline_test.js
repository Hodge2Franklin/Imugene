// Clinical Trial Timeline Visualization Test Suite
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in test mode
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test') === 'true';
    
    if (!testMode) return;
    
    // Check if the container exists on this page
    const container = document.getElementById('clinical-trial-timeline-container');
    if (!container) {
        console.error('Test failed: Clinical trial timeline container not found');
        return;
    }
    
    // Initialize test suite
    console.log('Initializing Clinical Trial Timeline Visualization Test Suite');
    initializeTestSuite();
    
    // Function to initialize test suite
    function initializeTestSuite() {
        // Create test results container
        createTestResultsContainer();
        
        // Run tests
        setTimeout(() => {
            runAllTests();
        }, 2000); // Wait for visualization to fully load
    }
    
    // Function to create test results container
    function createTestResultsContainer() {
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'test-results-container';
        resultsContainer.style.position = 'fixed';
        resultsContainer.style.top = '10px';
        resultsContainer.style.right = '10px';
        resultsContainer.style.width = '300px';
        resultsContainer.style.maxHeight = '80vh';
        resultsContainer.style.overflowY = 'auto';
        resultsContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        resultsContainer.style.border = '1px solid #ddd';
        resultsContainer.style.borderRadius = '5px';
        resultsContainer.style.padding = '10px';
        resultsContainer.style.zIndex = '9999';
        resultsContainer.style.fontSize = '12px';
        resultsContainer.style.fontFamily = 'monospace';
        
        resultsContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h3 style="margin: 0; font-size: 14px;">Test Results</h3>
                <button id="close-test-results" style="background: none; border: none; cursor: pointer; font-size: 16px;">&times;</button>
            </div>
            <div id="test-summary" style="margin-bottom: 10px; padding: 5px; background-color: #f5f5f5; border-radius: 3px;">
                Running tests...
            </div>
            <div id="test-results" style="font-size: 11px;"></div>
        `;
        
        document.body.appendChild(resultsContainer);
        
        // Add event listener to close button
        document.getElementById('close-test-results').addEventListener('click', function() {
            resultsContainer.style.display = 'none';
        });
    }
    
    // Function to run all tests
    function runAllTests() {
        const tests = [
            testBasicVisualizationRendering,
            testGanttChartFunctionality,
            testHoverFunctionality,
            testDetailPanel,
            testEducationalTooltips,
            testFutureProjections,
            testCashFlowAnalysis,
            testResponsiveDesign,
            testMobileNavigation,
            testAccessibility
        ];
        
        let passedTests = 0;
        let failedTests = 0;
        
        // Run each test
        tests.forEach((test, index) => {
            try {
                const result = test();
                if (result.passed) {
                    passedTests++;
                    logTestResult(result.name, true, result.details);
                } else {
                    failedTests++;
                    logTestResult(result.name, false, result.details);
                }
            } catch (error) {
                failedTests++;
                logTestResult(`Test ${index + 1}`, false, `Error: ${error.message}`);
            }
        });
        
        // Update summary
        updateTestSummary(passedTests, failedTests, tests.length);
    }
    
    // Function to log test result
    function logTestResult(testName, passed, details) {
        const resultsElement = document.getElementById('test-results');
        
        const resultElement = document.createElement('div');
        resultElement.style.marginBottom = '8px';
        resultElement.style.padding = '5px';
        resultElement.style.borderLeft = `3px solid ${passed ? '#2ecc71' : '#e74c3c'}`;
        resultElement.style.backgroundColor = passed ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)';
        
        resultElement.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 3px;">
                ${passed ? '✓' : '✗'} ${testName}
            </div>
            <div style="font-size: 10px; color: #555;">
                ${details || ''}
            </div>
        `;
        
        resultsElement.appendChild(resultElement);
    }
    
    // Function to update test summary
    function updateTestSummary(passed, failed, total) {
        const summaryElement = document.getElementById('test-summary');
        
        const allPassed = failed === 0;
        
        summaryElement.style.backgroundColor = allPassed ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)';
        summaryElement.style.color = allPassed ? '#27ae60' : '#c0392b';
        
        summaryElement.innerHTML = `
            <div style="font-weight: bold;">
                ${allPassed ? 'All tests passed!' : 'Some tests failed'}
            </div>
            <div>
                Passed: ${passed}/${total} (${Math.round(passed/total*100)}%)
            </div>
        `;
    }
    
    // Test functions
    
    // Test 1: Basic Visualization Rendering
    function testBasicVisualizationRendering() {
        const result = {
            name: 'Basic Visualization Rendering',
            passed: false,
            details: ''
        };
        
        // Check if container exists
        const container = document.getElementById('clinical-trial-timeline-container');
        if (!container) {
            result.details = 'Container not found';
            return result;
        }
        
        // Check if header exists
        const header = container.querySelector('.timeline-header');
        if (!header) {
            result.details = 'Header not found';
            return result;
        }
        
        // Check if controls exist
        const controls = container.querySelector('.timeline-controls');
        if (!controls) {
            result.details = 'Controls not found';
            return result;
        }
        
        // Check if visualization container exists
        const visualizationContainer = container.querySelector('.visualization-container');
        if (!visualizationContainer) {
            result.details = 'Visualization container not found';
            return result;
        }
        
        // Check if chart container exists
        const chartContainer = container.querySelector('.chart-container');
        if (!chartContainer) {
            result.details = 'Chart container not found';
            return result;
        }
        
        result.passed = true;
        result.details = 'All basic visualization elements are present';
        return result;
    }
    
    // Test 2: Gantt Chart Functionality
    function testGanttChartFunctionality() {
        const result = {
            name: 'Gantt Chart Functionality',
            passed: false,
            details: ''
        };
        
        // Check if gantt chart exists
        const chartContainer = document.getElementById('gantt-chart-container');
        if (!chartContainer) {
            result.details = 'Gantt chart container not found';
            return result;
        }
        
        // Check if canvas exists
        const canvas = chartContainer.querySelector('canvas');
        if (!canvas) {
            result.details = 'Canvas element not found';
            return result;
        }
        
        // Check if chart instance exists
        if (!window.ganttChart) {
            result.details = 'Gantt chart instance not found';
            return result;
        }
        
        // Check if chart has data
        if (!window.ganttChart.data || !window.ganttChart.data.datasets || window.ganttChart.data.datasets.length === 0) {
            result.details = 'Gantt chart has no data';
            return result;
        }
        
        result.passed = true;
        result.details = 'Gantt chart is properly rendered with data';
        return result;
    }
    
    // Test 3: Hover Functionality
    function testHoverFunctionality() {
        const result = {
            name: 'Hover Functionality',
            passed: false,
            details: ''
        };
        
        // Check if tooltip functionality exists
        if (typeof Chart === 'undefined' || !Chart.Tooltip) {
            result.details = 'Chart.js tooltip functionality not found';
            return result;
        }
        
        // Check if custom tooltip options are set
        if (!window.ganttChart || !window.ganttChart.options || !window.ganttChart.options.plugins || !window.ganttChart.options.plugins.tooltip) {
            result.details = 'Custom tooltip options not found';
            return result;
        }
        
        // Simulate hover event on chart
        try {
            const chartElement = document.querySelector('#gantt-chart-container canvas');
            if (chartElement) {
                const rect = chartElement.getBoundingClientRect();
                const event = new MouseEvent('mousemove', {
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2,
                    bubbles: true,
                    cancelable: true
                });
                
                chartElement.dispatchEvent(event);
            }
        } catch (error) {
            result.details = `Error simulating hover: ${error.message}`;
            return result;
        }
        
        result.passed = true;
        result.details = 'Hover functionality is properly configured';
        return result;
    }
    
    // Test 4: Detail Panel
    function testDetailPanel() {
        const result = {
            name: 'Detail Panel',
            passed: false,
            details: ''
        };
        
        // Check if detail panel exists
        const detailPanel = document.querySelector('.detail-panel');
        if (!detailPanel) {
            result.details = 'Detail panel not found';
            return result;
        }
        
        // Check if panel has header
        const panelHeader = detailPanel.querySelector('.panel-header');
        if (!panelHeader) {
            result.details = 'Panel header not found';
            return result;
        }
        
        // Check if panel has content
        const panelContent = detailPanel.querySelector('.panel-content');
        if (!panelContent) {
            result.details = 'Panel content not found';
            return result;
        }
        
        // Check if panel can be opened
        try {
            // Try to find a trial element to click
            const trialElement = document.querySelector('.trial-bar');
            if (trialElement) {
                trialElement.click();
                
                // Check if panel is active
                if (!detailPanel.classList.contains('active')) {
                    result.details = 'Panel did not open when trial was clicked';
                    return result;
                }
                
                // Close panel
                const closeButton = detailPanel.querySelector('.panel-header button');
                if (closeButton) {
                    closeButton.click();
                }
            }
        } catch (error) {
            result.details = `Error testing panel interaction: ${error.message}`;
            return result;
        }
        
        result.passed = true;
        result.details = 'Detail panel is properly implemented';
        return result;
    }
    
    // Test 5: Educational Tooltips
    function testEducationalTooltips() {
        const result = {
            name: 'Educational Tooltips',
            passed: false,
            details: ''
        };
        
        // Check if tooltip container exists
        const tooltipContainer = document.querySelector('.educational-tooltip');
        if (!tooltipContainer) {
            result.details = 'Educational tooltip container not found';
            return result;
        }
        
        // Check if educational icons exist
        const educationalIcons = document.querySelectorAll('.educational-icon');
        if (!educationalIcons.length) {
            result.details = 'No educational icons found';
            return result;
        }
        
        // Test tooltip functionality
        try {
            // Simulate hover on an educational icon
            const icon = educationalIcons[0];
            
            // Trigger mouseenter event
            const mouseenterEvent = new MouseEvent('mouseenter', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            
            icon.dispatchEvent(mouseenterEvent);
            
            // Check if tooltip is displayed
            if (tooltipContainer.style.display !== 'block') {
                result.details = 'Tooltip did not display on hover';
                return result;
            }
            
            // Trigger mouseleave event
            const mouseleaveEvent = new MouseEvent('mouseleave', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            
            icon.dispatchEvent(mouseleaveEvent);
            
            // Check if tooltip is hidden
            if (tooltipContainer.style.display !== 'none') {
                result.details = 'Tooltip did not hide on mouse leave';
                return result;
            }
        } catch (error) {
            result.details = `Error testing tooltip interaction: ${error.message}`;
            return result;
        }
        
        result.passed = true;
        result.details = 'Educational tooltips are properly implemented';
        return result;
    }
    
    // Test 6: Future Projections
    function testFutureProjections() {
        const result = {
            name: 'Future Projections',
            passed: false,
            details: ''
        };
        
        // Check if projection controls exist
        const projectionControls = document.querySelector('.projection-controls');
        if (!projectionControls) {
            result.details = 'Projection controls not found';
            return result;
        }
        
        // Check if scenario selector exists
        const scenarioSelector = document.getElementById('projection-scenario');
        if (!scenarioSelector) {
            result.details = 'Scenario selector not found';
            return result;
        }
        
        // Check if apply button exists
        const applyButton = document.getElementById('apply-projections');
        if (!applyButton) {
            result.details = 'Apply projections button not found';
            return result;
        }
        
        // Test projection functionality
        try {
            // Select optimistic scenario
            scenarioSelector.value = 'optimistic';
            
            // Trigger change event
            const changeEvent = new Event('change', {
                bubbles: true,
                cancelable: true
            });
            
            scenarioSelector.dispatchEvent(changeEvent);
            
            // Click apply button
            applyButton.click();
            
            // Check if projection was applied (cash flow container should exist)
            const cashFlowContainer = document.getElementById('cash-flow-container');
            if (!cashFlowContainer) {
                result.details = 'Cash flow container not created after applying projections';
                return result;
            }
        } catch (error) {
            result.details = `Error testing projections: ${error.message}`;
            return result;
        }
        
        result.passed = true;
        result.details = 'Future projections functionality is properly implemented';
        return result;
    }
    
    // Test 7: Cash Flow Analysis
    function testCashFlowAnalysis() {
        const result = {
            name: 'Cash Flow Analysis',
            passed: false,
            details: ''
        };
        
        // Check if cash flow container exists (may have been created in previous test)
        let cashFlowContainer = document.getElementById('cash-flow-container');
        
        // If not, try to create it by applying projections
        if (!cashFlowContainer) {
            try {
                // Select base scenario
                const scenarioSelector = document.getElementById('projection-scenario');
                if (scenarioSelector) {
                    scenarioSelector.value = 'base';
                    
                    // Trigger change event
                    const changeEvent = new Event('change', {
                        bubbles: true,
                        cancelable: true
                    });
                    
                    scenarioSelector.dispatchEvent(changeEvent);
                    
                    // Click apply button
                    const applyButton = document.getElementById('apply-projections');
                    if (applyButton) {
                        applyButton.click();
                    }
                    
                    // Check again for cash flow container
                    cashFlowContainer = document.getElementById('cash-flow-container');
                }
            } catch (error) {
                result.details = `Error creating cash flow: ${error.message}`;
                return result;
            }
        }
        
        if (!cashFlowContainer) {
            result.details = 'Cash flow container not found';
            return result;
        }
        
        // Check if cash flow chart exists
        const canvas = cashFlowContainer.querySelector('canvas');
        if (!canvas) {
            result.details = 'Cash flow chart canvas not found';
            return result;
        }
        
        // Check if chart instance exists
        if (!window.cashFlowChart) {
            result.details = 'Cash flow chart instance not found';
            return result;
        }
        
        // Check if chart has data
        if (!window.cashFlowChart.data || !window.cashFlowChart.data.datasets || window.cashFlowChart.data.datasets.length === 0) {
            result.details = 'Cash flow chart has no data';
            return result;
        }
        
        result.passed = true;
        result.details = 'Cash flow analysis is properly implemented';
        return result;
    }
    
    // Test 8: Responsive Design
    function testResponsiveDesign() {
        const result = {
            name: 'Responsive Design',
            passed: false,
            details: ''
        };
        
        // Check if responsive class is added to container
        const container = document.getElementById('clinical-trial-timeline-container');
        if (!container || !container.classList.contains('responsive-timeline')) {
            result.details = 'Responsive class not added to container';
            return result;
        }
        
        // Check if viewport meta tag exists
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            result.details = 'Viewport meta tag not found';
            return result;
        }
        
        // Check if responsive styles are added
        const responsiveStyles = Array.from(document.styleSheets).some(sheet => {
            try {
                return Array.from(sheet.cssRules).some(rule => 
                    rule.cssText && rule.cssText.includes('.responsive-timeline')
                );
            } catch (e) {
                // Cross-origin stylesheet, can't access rules
                return false;
            }
        });
        
        if (!responsiveStyles) {
            result.details = 'Responsive styles not found';
            return result;
        }
        
        // Test resize handling
        try {
            // Save original window dimensions
            const originalWidth = window.innerWidth;
            const originalHeight = window.innerHeight;
            
            // Simulate resize to mobile width
            window.innerWidth = 375;
            window.innerHeight = 667;
            
            // Dispatch resize event
            window.dispatchEvent(new Event('resize'));
            
            // Check if chart container height is adjusted
            const chartContainer = document.querySelector('.chart-container');
            if (chartContainer && chartContainer.style.height !== '250px') {
                result.details = `Chart container height not adjusted for mobile (${chartContainer.style.height})`;
                
                // Restore original dimensions
                window.innerWidth = originalWidth;
                window.innerHeight = originalHeight;
                window.dispatchEvent(new Event('resize'));
                
                return result;
            }
            
            // Restore original dimensions
            window.innerWidth = originalWidth;
            window.innerHeight = originalHeight;
            window.dispatchEvent(new Event('resize'));
        } catch (error) {
            result.details = `Error testing resize handling: ${error.message}`;
            return result;
        }
        
        result.passed = true;
        result.details = 'Responsive design is properly implemented';
        return result;
    }
    
    // Test 9: Mobile Navigation
    function testMobileNavigation() {
        const result = {
            name: 'Mobile Navigation',
            passed: false,
            details: ''
        };
        
        // Check if mobile navigation toggle exists
        const navToggle = document.querySelector('.mobile-nav-toggle');
        if (!navToggle) {
            result.details = 'Mobile navigation toggle not found';
            return result;
        }
        
        // Check if mobile navigation menu exists
        const mobileNav = document.querySelector('.mobile-nav');
        if (!mobileNav) {
            result.details = 'Mobile navigation menu not found';
            return result;
        }
        
        // Test navigation functionality
        try {
            // Click toggle button
            navToggle.click();
            
            // Check if menu is displayed
            if (!mobileNav.classList.contains('active')) {
                result.details = 'Mobile navigation menu did not open when toggle was clicked';
                return result;
            }
            
            // Click toggle button again to close
            navToggle.click();
            
            // Check if menu is hidden
            if (mobileNav.classList.contains('active')) {
                result.details = 'Mobile navigation menu did not close when toggle was clicked again';
                return result;
            }
        } catch (error) {
            result.details = `Error testing mobile navigation: ${error.message}`;
            return result;
        }
        
        result.passed = true;
        result.details = 'Mobile navigation is properly implemented';
        return result;
    }
    
    // Test 10: Accessibility
    function testAccessibility() {
        const result = {
            name: 'Accessibility',
            passed: false,
            details: ''
        };
        
        const accessibilityIssues = [];
        
        // Check for alt text on images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt) {
                accessibilityIssues.push(`Image missing alt text: ${img.src}`);
            }
        });
        
        // Check for proper heading structure
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        let previousLevel = 0;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.substring(1));
            
            if (previousLevel > 0 && level > previousLevel + 1) {
                accessibilityIssues.push(`Heading level skipped from ${previousLevel} to ${level}`);
            }
            
            previousLevel = level;
        });
        
        // Check for sufficient color contrast (simplified check)
        const elements = document.querySelectorAll('.timeline-header, .filter-group, .option-group, .projection-controls');
        elements.forEach(element => {
            const style = window.getComputedStyle(element);
            const backgroundColor = style.backgroundColor;
            const color = style.color;
            
            if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
                // Skip elements with transparent background
                return;
            }
            
            // Very simplified contrast check
            if (backgroundColor === 'rgb(255, 255, 255)' && color === 'rgb(0, 0, 0)') {
                // High contrast, good
            } else if (backgroundColor === 'rgb(0, 0, 0)' && color === 'rgb(255, 255, 255)') {
                // High contrast, good
            } else {
                // This is a very simplified check and not accurate
                // In a real test, we would use WCAG contrast ratio calculations
                // accessibilityIssues.push(`Potential contrast issue: ${element.tagName} with bg=${backgroundColor} and color=${color}`);
            }
        });
        
        // Check for keyboard accessibility
        const interactiveElements = document.querySelectorAll('button, a, select, input');
        interactiveElements.forEach(element => {
            if (element.tabIndex < 0 && !element.disabled) {
                accessibilityIssues.push(`Interactive element not keyboard accessible: ${element.tagName}`);
            }
        });
        
        if (accessibilityIssues.length > 0) {
            result.details = `Found ${accessibilityIssues.length} accessibility issues: ${accessibilityIssues.slice(0, 3).join(', ')}${accessibilityIssues.length > 3 ? '...' : ''}`;
            return result;
        }
        
        result.passed = true;
        result.details = 'No major accessibility issues found';
        return result;
    }
});
