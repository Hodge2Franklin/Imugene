# GitHub Repository and Deployment Guide

This document provides comprehensive instructions for maintaining the Imugene project repository and deploying updates to the website.

## Repository Structure

The GitHub repository is organized as follows:

- **Root Directory**: Contains all HTML pages and main project files
- **css/**: Contains all styling files including unified-style.css
- **js/**: Contains JavaScript files for interactive functionality
- **documentation/**: Contains project documentation and update history
- **graphs/output/**: Contains visualization JavaScript files
- **technical_analysis_enhancement/**: Contains enhanced technical analysis files
- **backups/**: Contains project backups for disaster recovery

## Latest Deployment

The most recent version of the website is deployed at:
https://xjvfpeyq.manus.space/

The enhanced clinical trial timeline visualization is available at:
https://xjvfpeyq.manus.space/clinical_trial_timeline.html

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

3. **Push to GitHub**: Regularly push changes to GitHub to maintain a complete history:
   ```
   git add .
   git commit -m "Description of changes"
   git push
   ```

## Fixed Visualizations

All previously blank chart areas have been fixed and implemented:

1. Institutional Ownership Tracker
2. Dilution Impact Calculator
3. Clinical Trial Timeline - Enhanced with interactive Gantt chart, educational tooltips, and future projections
4. Success Probability Calculator
5. Advanced Technical Chart
6. Volume Profile Analysis
7. Competitor Comparison Tool

## Enhanced Clinical Trial Timeline

The clinical trial timeline visualization has been significantly enhanced with:

1. **Interactive Gantt Chart**: Displays all trials with color-coded phases and milestone markers
2. **Filtering Options**: Filter by phase, status, and view type
3. **Future Projections**: Scenario analysis with adjustable parameters
4. **Educational Components**: Tooltips explaining trial phases and terminology
5. **Comprehensive Data**: Detailed information on patients, costs, and results
6. **Responsive Design**: Works on all device sizes

Full documentation is available at `/home/ubuntu/Imugene/documentation/clinical_trial_timeline_documentation.md`

## Thread Limit Persistence Instructions

To maintain continuity when reaching thread limits:

1. Always reference the GitHub repository in new conversations:
   ```
   This task inherits files and context from an original task. The GitHub repository is at https://github.com/Hodge2Franklin/Imugene
   ```

2. Mention the latest deployment URL:
   ```
   The latest version of the website is deployed at: https://qftnazcb.manus.space/
   ```

3. Ask the assistant to review the project_state.md documentation:
   ```
   Please review the project state documentation at /home/ubuntu/Imugene/documentation/project_state.md to continue work on the Imugene analysis website.
   ```

4. Provide context about the most recent changes or issues being addressed:
   ```
   We were previously working on [specific task/issue]. Please continue from where we left off.
   ```

## For Non-Programmers

This repository is organized to be accessible for non-programmers:

- **Documentation is written in plain language** - No technical jargon without explanation
- **File structure is logically organized by function** - Related files are kept together
- **Backups are maintained for disaster recovery** - Nothing is ever permanently lost
- **All visualizations are properly documented** - Each feature has clear descriptions
- **README.md provides a high-level overview** - Start here to understand the project
- **No programming knowledge is required** - Everything is explained in simple terms
- **Visual guides are provided where possible** - Screenshots help explain features
- **Step-by-step instructions for common tasks** - Follow numbered lists for any process

## Deployment Process

When deploying updates to the website:

1. Test all changes locally first
2. Use the deployment tool to push to production
3. Verify all functionality on the live site
4. Update documentation with new deployment URL:
   ```
   /home/ubuntu/Imugene/documentation/update_documentation.sh "https://new-url.manus.space"
   ```
5. Push all changes to GitHub

## Backup and Recovery

All project backups are stored in the `/home/ubuntu/Imugene/backups/` directory:

- Each backup is a complete snapshot of the project at a specific point in time
- Backups are named with version numbers (e.g., Imugene_backup_v8)
- To restore from a backup, simply copy the files from the backup directory

By following these guidelines, you'll ensure that no work is ever lost between conversation threads and that the project maintains continuity across multiple sessions.
