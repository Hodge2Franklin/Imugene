#!/bin/bash

# Script to update the project state documentation
# This should be run whenever significant changes are made to the project

# Set variables
DOC_FILE="/home/ubuntu/Imugene/documentation/project_state.md"
TIMESTAMP=$(date "+%B %d, %Y")

# Update the version history section
echo "Updating version history in $DOC_FILE"
sed -i "/^## Version History/a - **$TIMESTAMP**: $(git log -1 --pretty=%B 2>/dev/null || echo "Manual update")" "$DOC_FILE"

# Check if there's a new deployment URL to add
if [ ! -z "$1" ]; then
  echo "Updating deployment URL to $1"
  sed -i "s|^- \*\*Live URL\*\*: .*$|- **Live URL**: $1|" "$DOC_FILE"
fi

echo "Documentation updated successfully!"
echo "Remember to reference this file in new conversation threads with:"
echo "Please review the project state documentation at /home/ubuntu/Imugene/documentation/project_state.md to continue work on the Imugene analysis website."
