// Updated main.js for unified interface
document.addEventListener('DOMContentLoaded', function() {
    // Share button functionality
    const shareButtons = document.querySelectorAll('.btn .fa-share-alt, .btn .fas.fa-share-alt');
    shareButtons.forEach(button => {
        const parentButton = button.closest('.btn');
        if (parentButton) {
            parentButton.addEventListener('click', function() {
                alert('Share functionality would be implemented here. This would allow sharing the analysis via email, social media, or generating a shareable link.');
            });
        }
    });
    
    // Export button functionality
    const exportButtons = document.querySelectorAll('.btn .fa-file-export, .btn .fas.fa-file-export');
    exportButtons.forEach(button => {
        const parentButton = button.closest('.btn');
        if (parentButton) {
            parentButton.addEventListener('click', function() {
                alert('Export functionality would be implemented here. This would allow exporting the analysis as PDF, Excel, or other formats.');
            });
        }
    });
    
    // Timeframe dropdown functionality
    const timeframeButtons = document.querySelectorAll('.btn .fa-calendar-week, .btn .fas.fa-calendar-week');
    timeframeButtons.forEach(button => {
        const parentButton = button.closest('.btn');
        if (parentButton) {
            parentButton.addEventListener('click', function() {
                // Create dropdown if it doesn't exist
                let dropdown = document.querySelector('.timeframe-dropdown');
                if (!dropdown) {
                    dropdown = document.createElement('div');
                    dropdown.className = 'timeframe-dropdown';
                    dropdown.style.position = 'absolute';
                    dropdown.style.backgroundColor = 'white';
                    dropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    dropdown.style.borderRadius = '6px';
                    dropdown.style.zIndex = '1000';
                    dropdown.style.display = 'none';
                    dropdown.style.overflow = 'hidden';
                    dropdown.style.border = '1px solid #e5e7eb';
                    
                    const options = ['This week', 'This month', '3 months', '6 months', '1 year', 'All time'];
                    options.forEach(option => {
                        const item = document.createElement('div');
                        item.textContent = option;
                        item.style.padding = '10px 15px';
                        item.style.cursor = 'pointer';
                        item.style.transition = 'background-color 0.2s ease';
                        item.addEventListener('mouseover', function() {
                            this.style.backgroundColor = '#f9fafb';
                        });
                        item.addEventListener('mouseout', function() {
                            this.style.backgroundColor = 'white';
                        });
                        item.addEventListener('click', function() {
                            parentButton.innerHTML = `<i class="fas fa-calendar-week"></i> ${option}`;
                            dropdown.style.display = 'none';
                            
                            // Show notification
                            const notification = document.createElement('div');
                            notification.textContent = `Timeframe changed to ${option}`;
                            notification.style.position = 'fixed';
                            notification.style.top = '20px';
                            notification.style.right = '20px';
                            notification.style.backgroundColor = '#3b82f6';
                            notification.style.color = 'white';
                            notification.style.padding = '10px 20px';
                            notification.style.borderRadius = '6px';
                            notification.style.zIndex = '2000';
                            notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
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
                const rect = parentButton.getBoundingClientRect();
                dropdown.style.top = `${rect.bottom + window.scrollY + 5}px`;
                dropdown.style.left = `${rect.left + window.scrollX}px`;
                dropdown.style.minWidth = `${rect.width}px`;
                
                // Toggle display
                dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                
                // Close dropdown when clicking outside
                const closeDropdown = function(e) {
                    if (!dropdown.contains(e.target) && e.target !== parentButton) {
                        dropdown.style.display = 'none';
                        document.removeEventListener('click', closeDropdown);
                    }
                };
                
                document.addEventListener('click', closeDropdown);
            });
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add responsive table handling
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        wrapper.style.overflowX = 'auto';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // Add active class to current page in sidebar
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === filename || 
            (filename === '' && linkHref === 'index.html') ||
            (filename === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});
