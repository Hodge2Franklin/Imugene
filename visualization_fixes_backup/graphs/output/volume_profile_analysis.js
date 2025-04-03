// Fixed Volume Profile Analysis Interactive Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('volume-profile-container');
    if (!container) return;

    console.log("Volume Profile Analysis: Container found, initializing");
    
    // Sample data for volume profile
    const volumeProfileData = {
        prices: generatePriceData(180, 0.03, 0.02, 0.05),
        volumes: generateVolumeData(180, 10000000, 50000000)
    };

    // Create chart container with canvas element
    const chartContainer = document.createElement('div');
    chartContainer.id = 'volume-profile-chart-container';
    chartContainer.style.height = '500px';
    chartContainer.style.marginBottom = '20px';
    container.appendChild(chartContainer);
    
    // Create canvas element - THIS WAS MISSING IN THE ORIGINAL SCRIPT
    const canvas = document.createElement('canvas');
    canvas.id = 'volume-profile-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    chartContainer.appendChild(canvas);

    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls-container';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexWrap = 'wrap';
    controlsContainer.style.gap = '15px';
    controlsContainer.style.marginBottom = '20px';
    container.appendChild(controlsContainer);

    // Create time period control
    const timePeriodControl = document.createElement('div');
    timePeriodControl.className = 'control-group';
    timePeriodControl.innerHTML = `
        <label>Time Period:</label>
        <select id="vp-time-period">
            <option value="30">1 Month</option>
            <option value="90">3 Months</option>
            <option value="180" selected>6 Months</option>
        </select>
    `;
    controlsContainer.appendChild(timePeriodControl);

    // Create number of bins control
    const binsControl = document.createElement('div');
    binsControl.className = 'control-group';
    binsControl.innerHTML = `
        <label>Price Levels:</label>
        <select id="vp-bins">
            <option value="10">10 Levels</option>
            <option value="15" selected>15 Levels</option>
            <option value="20">20 Levels</option>
        </select>
    `;
    controlsContainer.appendChild(binsControl);

    // Create update button
    const updateButton = document.createElement('button');
    updateButton.id = 'update-vp-chart';
    updateButton.textContent = 'Update Chart';
    updateButton.className = 'update-button';
    updateButton.style.padding = '5px 15px';
    updateButton.style.backgroundColor = '#4CAF50';
    updateButton.style.color = 'white';
    updateButton.style.border = 'none';
    updateButton.style.borderRadius = '4px';
    updateButton.style.cursor = 'pointer';
    updateButton.onclick = updateVolumeProfile;
    controlsContainer.appendChild(updateButton);

    // Create analysis container
    const analysisContainer = document.createElement('div');
    analysisContainer.id = 'volume-profile-analysis';
    analysisContainer.className = 'analysis-container';
    analysisContainer.style.marginTop = '20px';
    container.appendChild(analysisContainer);

    // Initialize chart
    let volumeProfileChart;

    // Function to generate price data
    function generatePriceData(days, startPrice, volatility, trend) {
        const prices = [];
        let price = startPrice;
        
        for (let i = 0; i < days; i++) {
            // Add random movement
            const change = (Math.random() - 0.5) * volatility;
            // Add trend
            const trendFactor = (i / days) * trend;
            
            price = Math.max(0.001, price * (1 + change + trendFactor));
            prices.push(price);
        }
        
        return prices;
    }

    // Function to generate volume data
    function generateVolumeData(days, minVolume, maxVolume) {
        const volumes = [];
        
        for (let i = 0; i < days; i++) {
            // Random volume between min and max
            const volume = Math.floor(minVolume + Math.random() * (maxVolume - minVolume));
            volumes.push(volume);
        }
        
        return volumes;
    }

    // Function to calculate volume profile
    function calculateVolumeProfile(prices, volumes, bins) {
        // Find min and max prices
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        // Calculate bin size
        const binSize = (maxPrice - minPrice) / bins;
        
        // Initialize bins
        const volumeBins = Array(bins).fill(0);
        const priceLevels = [];
        
        // Calculate price level for each bin
        for (let i = 0; i < bins; i++) {
            priceLevels.push(minPrice + (i + 0.5) * binSize);
        }
        
        // Distribute volumes into bins
        for (let i = 0; i < prices.length; i++) {
            const binIndex = Math.min(Math.floor((prices[i] - minPrice) / binSize), bins - 1);
            volumeBins[binIndex] += volumes[i];
        }
        
        return { priceLevels, volumeBins, minPrice, maxPrice };
    }

    // Function to identify support and resistance levels
    function identifySupportResistance(priceLevels, volumeBins) {
        // Find high volume nodes
        const meanVolume = volumeBins.reduce((sum, vol) => sum + vol, 0) / volumeBins.length;
        const highVolumeThreshold = meanVolume * 1.5;
        
        const supportResistance = [];
        
        for (let i = 0; i < volumeBins.length; i++) {
            if (volumeBins[i] > highVolumeThreshold) {
                supportResistance.push({
                    price: priceLevels[i],
                    volume: volumeBins[i],
                    type: i < volumeBins.length / 2 ? 'Support' : 'Resistance'
                });
            }
        }
        
        // Sort by volume (highest first)
        supportResistance.sort((a, b) => b.volume - a.volume);
        
        return supportResistance.slice(0, 3); // Return top 3
    }

    // Function to update volume profile
    function updateVolumeProfile() {
        // Get selected options
        const timePeriod = parseInt(document.getElementById('vp-time-period').value);
        const bins = parseInt(document.getElementById('vp-bins').value);
        
        // Filter data based on time period
        const startIndex = volumeProfileData.prices.length - timePeriod;
        const filteredPrices = volumeProfileData.prices.slice(startIndex);
        const filteredVolumes = volumeProfileData.volumes.slice(startIndex);
        
        // Calculate volume profile
        const profile = calculateVolumeProfile(filteredPrices, filteredVolumes, bins);
        
        // Identify support and resistance levels
        const supportResistance = identifySupportResistance(profile.priceLevels, profile.volumeBins);
        
        // Get canvas context
        const ctx = document.getElementById('volume-profile-canvas').getContext('2d');
        
        // Destroy previous chart if exists
        if (volumeProfileChart) {
            volumeProfileChart.destroy();
        }
        
        try {
            // Create new chart
            volumeProfileChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: profile.priceLevels.map(price => price.toFixed(4)),
                    datasets: [{
                        label: 'Volume',
                        data: profile.volumeBins,
                        backgroundColor: profile.priceLevels.map(price => {
                            // Color based on support/resistance
                            const isSupport = supportResistance.some(sr => sr.price === price && sr.type === 'Support');
                            const isResistance = supportResistance.some(sr => sr.price === price && sr.type === 'Resistance');
                            
                            if (isSupport) return 'rgba(75, 192, 192, 0.8)'; // Teal for support
                            if (isResistance) return 'rgba(255, 99, 132, 0.8)'; // Red for resistance
                            return 'rgba(54, 162, 235, 0.5)'; // Blue for normal
                        }),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Volume'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price ($)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const price = parseFloat(context.label);
                                    const volume = context.raw;
                                    return `Price: $${price.toFixed(4)}, Volume: ${volume.toLocaleString()}`;
                                }
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            // Update analysis
            updateAnalysis(profile, supportResistance, filteredPrices[filteredPrices.length - 1]);
            
            console.log("Volume Profile Analysis: Chart rendered successfully");
        } catch (e) {
            console.error("Error rendering volume profile chart:", e);
            showFallbackVisualization(profile, supportResistance, filteredPrices[filteredPrices.length - 1]);
        }
    }

    // Function to update analysis
    function updateAnalysis(profile, supportResistance, currentPrice) {
        // Clear previous content
        const analysisContainer = document.getElementById('volume-profile-analysis');
        analysisContainer.innerHTML = '';
        
        // Create analysis header
        const analysisHeader = document.createElement('h4');
        analysisHeader.textContent = 'Volume Profile Analysis';
        analysisContainer.appendChild(analysisHeader);
        
        // Create current price section
        const currentPriceSection = document.createElement('div');
        currentPriceSection.className = 'analysis-section';
        currentPriceSection.innerHTML = `
            <p><strong>Current Price:</strong> $${currentPrice.toFixed(4)}</p>
        `;
        analysisContainer.appendChild(currentPriceSection);
        
        // Create support and resistance section
        const srSection = document.createElement('div');
        srSection.className = 'analysis-section';
        
        // Support and resistance header
        const srHeader = document.createElement('h5');
        srHeader.textContent = 'Key Support and Resistance Levels';
        srSection.appendChild(srHeader);
        
        // Support and resistance table
        const srTable = document.createElement('table');
        srTable.style.width = '100%';
        srTable.style.borderCollapse = 'collapse';
        srTable.style.marginTop = '10px';
        
        // Table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Type</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price Level</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Volume</th>
                <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Strength</th>
            </tr>
        `;
        srTable.appendChild(thead);
        
        // Table body
        const tbody = document.createElement('tbody');
        
        // Add rows for each support/resistance level
        supportResistance.forEach((level, index) => {
            const row = document.createElement('tr');
            
            const typeCell = document.createElement('td');
            typeCell.textContent = level.type;
            typeCell.style.padding = '8px';
            typeCell.style.borderBottom = '1px solid #ddd';
            typeCell.style.textAlign = 'left';
            typeCell.style.color = level.type === 'Support' ? '#4CAF50' : '#F44336';
            row.appendChild(typeCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${level.price.toFixed(4)}`;
            priceCell.style.padding = '8px';
            priceCell.style.borderBottom = '1px solid #ddd';
            priceCell.style.textAlign = 'right';
            row.appendChild(priceCell);
            
            const volumeCell = document.createElement('td');
            volumeCell.textContent = level.volume.toLocaleString();
            volumeCell.style.padding = '8px';
            volumeCell.style.borderBottom = '1px solid #ddd';
            volumeCell.style.textAlign = 'right';
            row.appendChild(volumeCell);
            
            const strengthCell = document.createElement('td');
            const strength = index === 0 ? 'Strong' : index === 1 ? 'Moderate' : 'Weak';
            strengthCell.textContent = strength;
            strengthCell.style.padding = '8px';
            strengthCell.style.borderBottom = '1px solid #ddd';
            strengthCell.style.textAlign = 'left';
            row.appendChild(strengthCell);
            
            tbody.appendChild(row);
        });
        
        srTable.appendChild(tbody);
        srSection.appendChild(srTable);
        
        analysisContainer.appendChild(srSection);
        
        // Create analysis summary
        const summarySection = document.createElement('div');
        summarySection.className = 'analysis-section';
        summarySection.style.marginTop = '20px';
        
        // Determine if price is near support or resistance
        let nearLevel = null;
        const threshold = 0.05; // 5% threshold
        
        for (const level of supportResistance) {
            const priceDiff = Math.abs(currentPrice - level.price) / level.price;
            if (priceDiff < threshold) {
                nearLevel = level;
                break;
            }
        }
        
        // Create summary content
        const summaryContent = document.createElement('div');
        summaryContent.innerHTML = `
            <h5>Analysis Summary</h5>
            <p>The volume profile shows the distribution of trading volume across price levels, highlighting areas of high trading activity.</p>
            ${nearLevel ? 
                `<p>The current price ($${currentPrice.toFixed(4)}) is near a ${nearLevel.type.toLowerCase()} level at $${nearLevel.price.toFixed(4)}. This suggests potential ${nearLevel.type === 'Support' ? 'buying interest' : 'selling pressure'} at this level.</p>` : 
                `<p>The current price ($${currentPrice.toFixed(4)}) is not near any significant support or resistance levels.</p>`
            }
            <p>High volume nodes often act as support or resistance levels as they represent prices where significant trading has occurred.</p>
        `;
        summarySection.appendChild(summaryContent);
        
        analysisContainer.appendChild(summarySection);
    }

    // Fallback visualization function
    function showFallbackVisualization(profile, supportResistance, currentPrice) {
        // Clear the chart container
        const chartContainer = document.getElementById('volume-profile-chart-container');
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
        fallbackTitle.textContent = 'Volume Profile Analysis';
        fallbackTitle.style.marginBottom = '20px';
        fallbackDiv.appendChild(fallbackTitle);
        
        // Create current price section
        const currentPriceSection = document.createElement('div');
        currentPriceSection.innerHTML = `<p><strong>Current Price:</strong> $${currentPrice.toFixed(4)}</p>`;
        fallbackDiv.appendChild(currentPriceSection);
        
        // Create support and resistance section
        const srSection = document.createElement('div');
        srSection.style.marginTop = '20px';
        srSection.style.marginBottom = '20px';
        
        // Support and resistance header
        const srHeader = document.createElement('h5');
        srHeader.textContent = 'Key Support and Resistance Levels';
        srSection.appendChild(srHeader);
        
        // Support and resistance list
        const srList = document.createElement('ul');
        srList.style.paddingLeft = '20px';
        
        supportResistance.forEach((level, index) => {
            const strength = index === 0 ? 'Strong' : index === 1 ? 'Moderate' : 'Weak';
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span style="color: ${level.type === 'Support' ? '#4CAF50' : '#F44336'};">${level.type}</span>: 
                $${level.price.toFixed(4)} (Volume: ${level.volume.toLocaleString()}, Strength: ${strength})
            `;
            listItem.style.marginBottom = '5px';
            srList.appendChild(listItem);
        });
        
        srSection.appendChild(srList);
        fallbackDiv.appendChild(srSection);
        
        // Create volume profile table
        const tableSection = document.createElement('div');
        tableSection.style.marginTop = '20px';
        
        const tableHeader = document.createElement('h5');
        tableHeader.textContent = 'Volume Profile Data';
        tableSection.appendChild(tableHeader);
        
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '10px';
        
        // Table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const priceHeader = document.createElement('th');
        priceHeader.textContent = 'Price Level';
        priceHeader.style.padding = '8px';
        priceHeader.style.borderBottom = '1px solid #ddd';
        priceHeader.style.textAlign = 'left';
        headerRow.appendChild(priceHeader);
        
        const volumeHeader = document.createElement('th');
        volumeHeader.textContent = 'Volume';
        volumeHeader.style.padding = '8px';
        volumeHeader.style.borderBottom = '1px solid #ddd';
        volumeHeader.style.textAlign = 'right';
        headerRow.appendChild(volumeHeader);
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Table body
        const tbody = document.createElement('tbody');
        
        // Add rows for each price level (limit to 15 rows for performance)
        const maxRows = Math.min(profile.priceLevels.length, 15);
        for (let i = 0; i < maxRows; i++) {
            const row = document.createElement('tr');
            
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${profile.priceLevels[i].toFixed(4)}`;
            priceCell.style.padding = '8px';
            priceCell.style.borderBottom = '1px solid #ddd';
            priceCell.style.textAlign = 'left';
            row.appendChild(priceCell);
            
            const volumeCell = document.createElement('td');
            volumeCell.textContent = profile.volumeBins[i].toLocaleString();
            volumeCell.style.padding = '8px';
            volumeCell.style.borderBottom = '1px solid #ddd';
            volumeCell.style.textAlign = 'right';
            row.appendChild(volumeCell);
            
            tbody.appendChild(row);
        }
        
        table.appendChild(tbody);
        tableSection.appendChild(table);
        
        fallbackDiv.appendChild(tableSection);
        chartContainer.appendChild(fallbackDiv);
        
        // Update analysis
        updateAnalysis(profile, supportResistance, currentPrice);
    }

    // Initialize the volume profile
    updateVolumeProfile();
    
    console.log("Volume Profile Analysis: Initialization complete");
});
