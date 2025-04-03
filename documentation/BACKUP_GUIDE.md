# Imugene Project Backup Guide

This document provides information about the backup system for the Imugene website project.

## Backup Structure

All project backups are stored in the `/home/ubuntu/Imugene/backups/` directory:

- Each backup is a complete snapshot of the project at a specific point in time
- Backups are named with version numbers (e.g., Imugene_backup_v8)

## Available Backups

The following backups are currently available:

- **Imugene_backup_v2**: Enhanced Version Backup
- **Imugene_backup_v3**: Pre-Chart-Fix Backup
- **Imugene_backup_v4**: Pre-Scenario-Chart-Fix Backup
- **Imugene_backup_v5**: Pre-Highcharts-Module-Fix Backup
- **Imugene_backup_v6**: Pre-Final-Deployment Backup
- **Imugene_backup_v7**: Pre-Coming-Soon-Features Backup
- **Imugene_backup_v8**: Pre-Unified-Interface Backup
- **Imugene_backup_v9**: Latest Complete Backup

## Restoration Process

To restore from a backup:

1. Identify the appropriate backup version you wish to restore
2. Copy the files from the backup directory to the main project directory:
   ```
   cp -r /home/ubuntu/Imugene/backups/Imugene_backup_v[NUMBER]/* /home/ubuntu/Imugene/
   ```
3. Test the restored version locally
4. Update the documentation to reflect the restoration

## Backup Creation

When making significant changes to the project, it's recommended to create a new backup:

1. Create a new backup directory:
   ```
   mkdir -p /home/ubuntu/Imugene/backups/Imugene_backup_v[NEXT_NUMBER]
   ```
2. Copy the current project files to the new backup directory:
   ```
   cp -r /home/ubuntu/Imugene/* /home/ubuntu/Imugene/backups/Imugene_backup_v[NEXT_NUMBER]/
   ```
3. Update the project_state.md documentation to include the new backup

## Backup Maintenance

Periodically review the backups to ensure they remain relevant:

- Consider removing very old backups if disk space becomes an issue
- Always maintain at least the three most recent backups
- Document any changes to the backup structure in the project_state.md file

This backup system ensures that you can always recover from any issues and never lose your work.
