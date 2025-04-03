// Update the image paths in the HTML files to use the new ultra-legible charts
const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
  '/home/ubuntu/website/index.html',
  '/home/ubuntu/website/financial_analysis.html',
  '/home/ubuntu/website/short_selling_analysis.html',
  '/home/ubuntu/website/technical_analysis.html',
  '/home/ubuntu/website/clinical_trials.html'
];

// Process each HTML file
htmlFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace image paths with the new ultra-legible versions
    content = content.replace(/swot_analysis\.png/g, 'swot_analysis.png?v=2');
    content = content.replace(/share_price_scenarios\.png/g, 'share_price_scenarios.png?v=2');
    content = content.replace(/short_interest_vs_price\.png/g, 'short_interest_vs_price.png?v=2');
    content = content.replace(/market_cap_comparison_ex_csl\.png/g, 'market_cap_comparison_ex_csl.png?v=2');
    
    // Add CSS to ensure images display at full size and quality
    if (!content.includes('img.ultra-legible')) {
      const cssAddition = `
    <style>
      img.chart-image, .card img {
        max-width: 100%;
        height: auto;
        margin: 15px 0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      .card {
        margin-bottom: 30px;
      }
    </style>
    </head>`;
      
      content = content.replace('</head>', cssAddition);
    }
    
    // Add class to images for better styling
    content = content.replace(/<img src="img\/swot_analysis\.png/g, '<img class="chart-image" src="img/swot_analysis.png');
    content = content.replace(/<img src="img\/share_price_scenarios\.png/g, '<img class="chart-image" src="img/share_price_scenarios.png');
    content = content.replace(/<img src="img\/short_interest_vs_price\.png/g, '<img class="chart-image" src="img/short_interest_vs_price.png');
    content = content.replace(/<img src="img\/market_cap_comparison_ex_csl\.png/g, '<img class="chart-image" src="img/market_cap_comparison_ex_csl.png');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('All HTML files updated with ultra-legible chart references');
