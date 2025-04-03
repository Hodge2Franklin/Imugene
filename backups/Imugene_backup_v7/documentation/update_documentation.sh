#!/bin/bash

# Imugene Documentation Update Script
# This script updates the project_state.md file with the latest information

# Set variables
PROJECT_DIR="/home/ubuntu/Imugene"
DOC_DIR="$PROJECT_DIR/documentation"
DOC_FILE="$DOC_DIR/project_state.md"
CURRENT_DATE=$(date +"%B %d, %Y")

# Check if a new deployment URL was provided
if [ $# -eq 1 ]; then
  NEW_URL=$1
  echo "Updating documentation with new deployment URL: $NEW_URL"
  
  # Update the deployment URL in the documentation
  sed -i "s|^- \*\*Current Production URL\*\*: .*$|- **Current Production URL**: $NEW_URL|" $DOC_FILE
  sed -i "s|^- \*\*Technical Analysis Enhanced Page\*\*: .*$|- **Technical Analysis Enhanced Page**: $NEW_URL/technical_analysis_enhanced.html|" $DOC_FILE
  
  # Add the previous URL if it doesn't exist
  if ! grep -q "Previous Production URL" $DOC_FILE; then
    CURRENT_URL=$(grep "Current Production URL" $DOC_FILE | sed 's/^- \*\*Current Production URL\*\*: //')
    sed -i "/^- \*\*Technical Analysis Enhanced Page\*\*/a - **Previous Production URL**: $CURRENT_URL" $DOC_FILE
  fi
fi

# Update the last updated date
sed -i "s|Last Updated: .*$|Last Updated: $CURRENT_DATE|" $DOC_FILE

echo "Documentation updated successfully at $DOC_FILE"
echo "Last updated: $CURRENT_DATE"
