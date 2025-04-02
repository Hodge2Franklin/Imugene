import os
import markdown
import re

def convert_markdown_to_html(md_file, html_file, template_type):
    with open(md_file, 'r') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content, extensions=['tables'])
    
    # Create HTML document with proper structure based on template type
    if template_type == "sidebar":
        html_document = create_sidebar_template(os.path.basename(md_file).replace('.md', ''), html_content)
    else:
        html_document = create_basic_template(os.path.basename(md_file).replace('.md', ''), html_content)
    
    with open(html_file, 'w') as f:
        f.write(html_document)

def create_sidebar_template(page_name, content):
    title = page_name.replace('_', ' ').title()
    
    # Determine which sidebar item should be active
    active_classes = {
        'financial_analysis': '',
        'short_selling_analysis': '',
        'market_position': '',
        'investment_recommendations': '',
        'comprehensive_analysis': '',
        'executive_summary': '',
        'company_profile': '',
        'investment_risks_opportunities': '',
        'final_report': '',
        'index': ''
    }
    
    # Set the active class for the current page
    if page_name in active_classes:
        active_classes[page_name] = ' class="active"'
    
    # Map page names to sidebar icons
    icon_map = {
        'financial_analysis': 'chart-line',
        'short_selling_analysis': 'arrow-down',
        'market_position': 'building',
        'investment_recommendations': 'lightbulb',
        'comprehensive_analysis': 'file-alt',
        'executive_summary': 'file-contract',
        'company_profile': 'info-circle',
        'investment_risks_opportunities': 'exclamation-triangle',
        'final_report': 'file',
        'index': 'home'
    }
    
    # Get icon for current page
    icon = icon_map.get(page_name, 'file')
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Imugene (IMU.AX) Stock Analysis - {title}</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-title">
            Imugene Analysis
        </div>
        <ul class="sidebar-nav">
            <li><a href="index.html"{active_classes['index']}><i class="fas fa-home"></i> Overview</a></li>
            <li><a href="financial_analysis.html"{active_classes['financial_analysis']}><i class="fas fa-chart-line"></i> Financial Analysis</a></li>
            <li><a href="company_profile.html"{active_classes['company_profile']}><i class="fas fa-info-circle"></i> Company Profile</a></li>
            <li><a href="technical_analysis.html"><i class="fas fa-chart-bar"></i> Technical Analysis</a></li>
            <li><a href="short_selling_analysis.html"{active_classes['short_selling_analysis']}><i class="fas fa-arrow-down"></i> Short Selling</a></li>
            <li><a href="market_position.html"{active_classes['market_position']}><i class="fas fa-building"></i> Competitor Analysis</a></li>
            <li><a href="investment_recommendations.html"{active_classes['investment_recommendations']}><i class="fas fa-lightbulb"></i> Investment Thesis</a></li>
            <li><a href="investment_risks_opportunities.html"{active_classes['investment_risks_opportunities']}><i class="fas fa-exclamation-triangle"></i> Risks & Opportunities</a></li>
            <li><a href="executive_summary.html"{active_classes['executive_summary']}><i class="fas fa-file-contract"></i> Executive Summary</a></li>
            <li><a href="final_report.html"{active_classes['final_report']}><i class="fas fa-file"></i> Full Report</a></li>
        </ul>
    </div>

    <div class="main-content">
        <div class="page-header">
            <h1 class="page-title">Imugene (IMU) Stock Analysis - {title}</h1>
            <div class="header-actions">
                <button class="btn"><i class="fas fa-share-alt"></i> Share</button>
                <button class="btn"><i class="fas fa-file-export"></i> Export</button>
                <button class="btn btn-primary"><i class="fas fa-calendar-week"></i> This week</button>
            </div>
        </div>

        <section class="section">
            <div class="card">
                {content}
            </div>
        </section>

        <footer>
            <p>Imugene (IMU.AX) Investment Analysis - April 2025</p>
            <p><a href="https://github.com/Hodge2Franklin/Imugene" target="_blank">View on GitHub</a></p>
        </footer>
    </div>
</body>
</html>"""

def create_basic_template(page_name, content):
    title = page_name.replace('_', ' ').title()
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Imugene (IMU.AX) Analysis - {title}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Imugene (IMU.AX) Investment Analysis</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="executive_summary.html">Executive Summary</a></li>
                <li><a href="comprehensive_analysis.html">Comprehensive Analysis</a></li>
                <li><a href="investment_recommendations.html">Investment Recommendations</a></li>
                <li><a href="final_report.html">Full Report</a></li>
            </ul>
        </nav>
    </header>
    <main>
        {content}
    </main>
    <footer>
        <p>Imugene (IMU.AX) Investment Analysis - April 2025</p>
    </footer>
</body>
</html>"""

# Get all markdown files in the Imugene directory
website_dir = '/home/ubuntu/Imugene'
md_files = [f for f in os.listdir(website_dir) if f.endswith('.md') and f != 'todo.md']

# Convert each markdown file to HTML with the sidebar template
for md_file in md_files:
    md_path = os.path.join(website_dir, md_file)
    html_path = os.path.join(website_dir, md_file.replace('.md', '.html'))
    convert_markdown_to_html(md_path, html_path, "sidebar")
    print(f"Converted {md_file} to {md_file.replace('.md', '.html')} with sidebar template")

print("All markdown files converted to HTML with sidebar template successfully!")
