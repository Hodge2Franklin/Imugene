// Main JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Timeframe dropdown functionality
    const timeframeButton = document.querySelector('.btn-info');
    if (timeframeButton) {
        timeframeButton.addEventListener('click', function() {
            // Create dropdown if it doesn't exist
            let dropdown = document.querySelector('.timeframe-dropdown');
            if (!dropdown) {
                dropdown = document.createElement('div');
                dropdown.className = 'timeframe-dropdown';
                dropdown.style.position = 'absolute';
                dropdown.style.backgroundColor = 'white';
                dropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                dropdown.style.borderRadius = '4px';
                dropdown.style.zIndex = '1000';
                dropdown.style.display = 'none';
                
                const options = ['This week', 'This month', '3 months', '6 months', '1 year', 'All time'];
                options.forEach(option => {
                    const item = document.createElement('div');
                    item.textContent = option;
                    item.style.padding = '10px 15px';
                    item.style.cursor = 'pointer';
                    item.addEventListener('mouseover', function() {
                        this.style.backgroundColor = '#f5f5f5';
                    });
                    item.addEventListener('mouseout', function() {
                        this.style.backgroundColor = 'white';
                    });
                    item.addEventListener('click', function() {
                        timeframeButton.textContent = option;
                        dropdown.style.display = 'none';
                        
                        // Show notification
                        const notification = document.createElement('div');
                        notification.textContent = `Timeframe changed to ${option}`;
                        notification.style.position = 'fixed';
                        notification.style.top = '20px';
                        notification.style.right = '20px';
                        notification.style.backgroundColor = '#2c3e50';
                        notification.style.color = 'white';
                        notification.style.padding = '10px 20px';
                        notification.style.borderRadius = '4px';
                        notification.style.zIndex = '2000';
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                            notification.style.opacity = '0';
                            notification.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => {
                                document.body.removeChild(notification);
                            }, 500);
                        }, 3000);
                    });
                    dropdown.appendChild(item);
                });
                
                document.body.appendChild(dropdown);
            }
            
            // Position dropdown
            const rect = timeframeButton.getBoundingClientRect();
            dropdown.style.top = `${rect.bottom + window.scrollY}px`;
            dropdown.style.left = `${rect.left + window.scrollX}px`;
            
            // Toggle display
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            
            // Close dropdown when clicking outside
            const closeDropdown = function(e) {
                if (!dropdown.contains(e.target) && e.target !== timeframeButton) {
                    dropdown.style.display = 'none';
                    document.removeEventListener('click', closeDropdown);
                }
            };
            
            document.addEventListener('click', closeDropdown);
        });
    }
    
    // Share button functionality
    const shareButton = document.querySelector('.btn-primary');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            alert('Share functionality would be implemented here. This would allow sharing the analysis via email, social media, or generating a shareable link.');
        });
    }
    
    // Export button functionality
    const exportButton = document.querySelector('.btn-success');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            alert('Export functionality would be implemented here. This would allow exporting the analysis as PDF, Excel, or other formats.');
        });
    }
});
