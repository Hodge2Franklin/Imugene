# Imugene Analysis Project

## Overview

This repository contains a comprehensive analysis website for Imugene (ASX: IMU), including interactive visualizations, technical analysis tools, and educational resources for investors. The project is designed to be accessible for non-programmers while providing sophisticated analysis capabilities.

## Live Deployments

- **Main Website**: [https://xjvfpeyq.manus.space/](https://xjvfpeyq.manus.space/)
- **Enhanced Clinical Trial Timeline**: [https://xjvfpeyq.manus.space/clinical_trial_timeline.html](https://xjvfpeyq.manus.space/clinical_trial_timeline.html)

## Repository Structure

This repository is organized into logical sections for easy navigation:

### Main Directories

- **`/css/`** - All styling files for the website
- **`/js/`** - JavaScript files for interactive functionality
- **`/data/`** - Data files used by visualizations
- **`/documentation/`** - Comprehensive documentation and guides
- **`/graphs/output/`** - Visualization JavaScript files
- **`/visualizations/`** - Organized visualization pages by category
  - **`/clinical_trials/`** - Clinical trial visualizations
  - **`/financial/`** - Financial analysis visualizations
  - **`/technical/`** - Technical analysis visualizations
- **`/backups/`** - Complete project backups for disaster recovery
- **`/img/`** - Images used throughout the website

### Key Files

- **`CONTINUITY_GUIDE.md`** - Essential guide for maintaining continuity between sessions
- **`index.html`** - Main entry point for the website
- **`technical_analysis.html`** - Technical analysis tools and charts
- **`interactive_visualizations.html`** - Collection of interactive visualizations
- **`documentation/project_state.md`** - Current state of the project and recent changes

## Interactive Visualizations

The project includes several interactive visualizations:

1. **Cash Flow Projection Tool** - Project future cash flows and runway
2. **Institutional Ownership Tracker** - Track changes in institutional ownership
3. **Dilution Impact Calculator** - Understand potential impact of capital raises
4. **Clinical Trial Timeline** - Interactive Gantt chart of clinical trials
5. **Success Probability Calculator** - Calculate trial success probabilities
6. **Advanced Technical Chart** - Customizable technical analysis chart
7. **Volume Profile Analysis** - Analyze trading volume distribution
8. **Competitor Comparison Tool** - Compare Imugene with competitors

## Enhanced Clinical Trial Timeline

The recently enhanced clinical trial timeline visualization includes:

- Interactive Gantt chart with color-coded phases
- Filtering options by phase, status, and view type
- Future projections with scenario analysis
- Educational tooltips explaining trial terminology
- Comprehensive trial data with patient, cost, and results information
- Responsive design for all device sizes

## For Non-Programmers

This repository is designed to be accessible for non-programmers:

- Documentation is written in plain language without technical jargon
- Files are logically organized by function
- Regular backups ensure no work is ever lost
- Step-by-step instructions are provided for common tasks
- Visual guides are included where possible

## Maintaining Continuity Between Sessions

To ensure work is never lost between conversation threads:

1. **Reference Documentation**: Begin new sessions by asking the assistant to review:
   ```
   Please review the project state documentation at /home/ubuntu/Imugene/documentation/project_state.md to continue work on the Imugene analysis website.
   ```

2. **Update Documentation**: After making changes, run:
   ```
   /home/ubuntu/Imugene/documentation/update_documentation.sh
   ```

3. **Push to GitHub**: Regularly push changes to GitHub:
   ```
   git add .
   git commit -m "Description of changes"
   git push
   ```

4. **Thread Limit Persistence**: When reaching thread limits, use:
   ```
   This task inherits files and context from an original task. The GitHub repository is at https://github.com/Hodge2Franklin/Imugene
   ```

## Backup and Recovery

All project backups are stored in the `/backups/` directory:

- Each backup is a complete snapshot of the project at a specific point in time
- Backups are named with version numbers (e.g., Imugene_backup_v8)
- To restore from a backup, simply copy the files from the backup directory

## Getting Started

To begin working with this repository:

1. Review the CONTINUITY_GUIDE.md file for essential information
2. Explore the documentation directory for detailed guides
3. Check the project_state.md file for the current status and recent changes
4. Use the live deployment links to view the current website

## Contributing

When making changes to this repository:

1. Always create documentation for new features
2. Update the project_state.md file with your changes
3. Run the update_documentation.sh script after making changes
4. Commit and push your changes to GitHub
5. Create a backup if making significant changes

## License

This project is proprietary and confidential. All rights reserved.
