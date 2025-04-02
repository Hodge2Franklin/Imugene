// Main JavaScript file for Imugene website
document.addEventListener('DOMContentLoaded', function() {
  // Initialize interactive elements
  initializeShareButton();
  initializeExportButton();
  initializeTimeframeSelector();
  
  // Add Font Awesome if not already included
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(fontAwesome);
  }
});

// Share button functionality
function initializeShareButton() {
  const shareButtons = document.querySelectorAll('.btn:has(.fa-share-alt)');
  shareButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get current page URL
      const url = window.location.href;
      const title = document.title;
      
      // Create a temporary input to copy the URL
      const tempInput = document.createElement('input');
      document.body.appendChild(tempInput);
      tempInput.value = url;
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      // Show a notification
      showNotification('URL copied to clipboard!');
      
      // If Web Share API is available, use it
      if (navigator.share) {
        navigator.share({
          title: title,
          url: url
        }).catch(err => {
          console.error('Error sharing:', err);
        });
      }
    });
  });
}

// Export button functionality
function initializeExportButton() {
  const exportButtons = document.querySelectorAll('.btn:has(.fa-file-export)');
  exportButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Show export options
      const options = ['PDF', 'PNG', 'CSV'];
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'export-options';
      
      options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.className = 'export-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', function() {
          // Simulate export functionality
          showNotification(`Exporting as ${option}...`);
          setTimeout(() => {
            showNotification(`Export as ${option} complete!`);
          }, 1500);
          
          // Remove options container
          document.body.removeChild(optionsContainer);
        });
        
        optionsContainer.appendChild(optionElement);
      });
      
      // Position the options container
      const buttonRect = button.getBoundingClientRect();
      optionsContainer.style.position = 'absolute';
      optionsContainer.style.top = `${buttonRect.bottom + window.scrollY + 5}px`;
      optionsContainer.style.left = `${buttonRect.left + window.scrollX}px`;
      
      // Add close functionality
      document.addEventListener('click', function closeOptions(e) {
        if (!optionsContainer.contains(e.target) && e.target !== button) {
          if (document.body.contains(optionsContainer)) {
            document.body.removeChild(optionsContainer);
          }
          document.removeEventListener('click', closeOptions);
        }
      });
      
      document.body.appendChild(optionsContainer);
    });
  });
}

// Timeframe selector functionality
function initializeTimeframeSelector() {
  const timeframeButtons = document.querySelectorAll('.btn:has(.fa-calendar-week)');
  timeframeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Show timeframe options
      const options = ['This week', 'This month', '3 months', '6 months', '1 year', 'All time'];
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'timeframe-options';
      
      options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.className = 'timeframe-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', function() {
          // Update button text
          button.innerHTML = `<i class="fas fa-calendar-week"></i> ${option}`;
          
          // Simulate timeframe change
          showNotification(`Timeframe changed to ${option}`);
          
          // Remove options container
          document.body.removeChild(optionsContainer);
        });
        
        optionsContainer.appendChild(optionElement);
      });
      
      // Position the options container
      const buttonRect = button.getBoundingClientRect();
      optionsContainer.style.position = 'absolute';
      optionsContainer.style.top = `${buttonRect.bottom + window.scrollY + 5}px`;
      optionsContainer.style.left = `${buttonRect.left + window.scrollX}px`;
      
      // Add close functionality
      document.addEventListener('click', function closeOptions(e) {
        if (!optionsContainer.contains(e.target) && e.target !== button) {
          if (document.body.contains(optionsContainer)) {
            document.body.removeChild(optionsContainer);
          }
          document.removeEventListener('click', closeOptions);
        }
      });
      
      document.body.appendChild(optionsContainer);
    });
  });
}

// Helper function to show notifications
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
