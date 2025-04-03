import matplotlib.pyplot as plt
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
import os

# Output directory
output_dir = '/home/ubuntu/website/img'
os.makedirs(output_dir, exist_ok=True)

# Set extremely high DPI and font sizes for maximum legibility
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['font.size'] = 24  # Base font size
plt.rcParams['axes.labelsize'] = 28
plt.rcParams['axes.titlesize'] = 32
plt.rcParams['xtick.labelsize'] = 24
plt.rcParams['ytick.labelsize'] = 24
plt.rcParams['legend.fontsize'] = 24
plt.rcParams['figure.titlesize'] = 36

# Function to create a maximally legible SWOT analysis
def create_ultra_legible_swot():
    # Create a new figure with very large size
    fig = plt.figure(figsize=(24, 18))
    
    # Create a 2x2 grid for the SWOT quadrants
    ax1 = plt.subplot2grid((2, 2), (0, 0))
    ax2 = plt.subplot2grid((2, 2), (0, 1))
    ax3 = plt.subplot2grid((2, 2), (1, 0))
    ax4 = plt.subplot2grid((2, 2), (1, 1))
    
    # Set titles with extremely large font
    ax1.set_title('STRENGTHS', fontsize=36, fontweight='bold', color='darkgreen')
    ax2.set_title('WEAKNESSES', fontsize=36, fontweight='bold', color='darkred')
    ax3.set_title('OPPORTUNITIES', fontsize=36, fontweight='bold', color='darkblue')
    ax4.set_title('THREATS', fontsize=36, fontweight='bold', color='darkorange')
    
    # Remove all axes for cleaner look
    for ax in [ax1, ax2, ax3, ax4]:
        ax.axis('off')
    
    # Add text with extremely large font and high contrast background
    # Strengths
    strengths_text = """• Proprietary ImmuGene technology 
  targeting multiple cancer pathways

• Positive clinical data and 
  improving sentiment"""
    ax1.text(0.5, 0.5, strengths_text, 
             ha='center', va='center', fontsize=28, 
             bbox=dict(facecolor='lightgreen', alpha=0.4, boxstyle='round,pad=1'))
    
    # Weaknesses
    weaknesses_text = """• Significant cash burn and 
  ongoing capital raises

• Management credibility issues 
  with biotech investors"""
    ax2.text(0.5, 0.5, weaknesses_text, 
             ha='center', va='center', fontsize=28, 
             bbox=dict(facecolor='mistyrose', alpha=0.4, boxstyle='round,pad=1'))
    
    # Opportunities
    opportunities_text = """• Positive clinical trial results 
  could drive significant revaluation

• Potential acquisition or 
  partnership possibilities"""
    ax3.text(0.5, 0.5, opportunities_text, 
             ha='center', va='center', fontsize=28, 
             bbox=dict(facecolor='lightblue', alpha=0.4, boxstyle='round,pad=1'))
    
    # Threats
    threats_text = """• Significant competition in 
  immuno-oncology space

• Market skepticism about commercial 
  viability of novel therapeutics"""
    ax4.text(0.5, 0.5, threats_text, 
             ha='center', va='center', fontsize=28, 
             bbox=dict(facecolor='bisque', alpha=0.4, boxstyle='round,pad=1'))
    
    # Add a super title
    plt.suptitle('IMUGENE (IMU.AX) SWOT ANALYSIS', fontsize=42, fontweight='bold', y=0.98)
    
    # Adjust layout and save
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    plt.savefig(os.path.join(output_dir, 'swot_analysis.png'), bbox_inches='tight')
    plt.close()
    print("Created ultra-legible SWOT analysis")

# Function to create maximally legible share price scenarios chart
def create_ultra_legible_share_price():
    # Create a new figure with very large size
    plt.figure(figsize=(24, 16))
    
    # Data
    scenarios = ['Current', 'IP\nRevaluation', 'Partnership\nDeal', 
                 'Multiple\nPartnerships', 'Acquisition\nInterest', 'Nobel Prize\nNomination']
    prices = [0.03, 0.048, 0.068, 0.102, 0.136, 0.204]
    
    # Create bar chart with extra wide bars
    bars = plt.bar(scenarios, prices, color='forestgreen', width=0.6, edgecolor='black', linewidth=1.5)
    
    # Add current price line with clear label
    plt.axhline(y=0.03, color='red', linestyle='--', linewidth=3, label='Current Price: $0.03')
    
    # Customize chart with extra large fonts
    plt.title('IMUGENE (IMU.AX) POTENTIAL SHARE PRICE SCENARIOS', fontsize=36, fontweight='bold', pad=20)
    plt.ylabel('SHARE PRICE (AUD)', fontsize=32, fontweight='bold', labelpad=20)
    plt.ylim(0, 0.24)
    
    # Add value labels on top of bars with very large font
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.008,
                f'${height:.3f}', ha='center', va='bottom', fontsize=28, fontweight='bold')
    
    # Add legend with large font
    plt.legend(fontsize=28, loc='upper right')
    
    # Add grid for better readability
    plt.grid(axis='y', linestyle='--', alpha=0.3)
    
    # Adjust tick parameters for better visibility
    plt.tick_params(axis='both', which='major', labelsize=28, width=2, length=10)
    plt.tick_params(axis='x', rotation=0)
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'share_price_scenarios.png'), bbox_inches='tight')
    plt.close()
    print("Created ultra-legible share price scenarios chart")

# Function to create maximally legible short interest vs price chart
def create_ultra_legible_short_interest():
    # Create a new figure with very large size
    plt.figure(figsize=(24, 16))
    
    # Data - simplified for maximum clarity
    dates = ['Feb 17', 'Feb 25', 'Mar 5', 'Mar 13', 'Mar 17', 'Mar 25']
    
    # Convert to numerical for plotting
    x = np.arange(len(dates))
    
    # Simplified data for better clarity
    short_interest = [6.4, 6.5, 6.3, 6.2, 5.8, 4.7]
    price = [0.039, 0.036, 0.035, 0.034, 0.040, 0.034]
    
    # Create figure with two y-axes
    fig, ax1 = plt.subplots(figsize=(24, 16))
    ax2 = ax1.twinx()
    
    # Plot short interest on left axis with thick line
    line1 = ax1.plot(x, short_interest, 'b-', linewidth=6, label='Short Interest (%)')
    ax1.set_ylabel('SHORT INTEREST (%)', color='blue', fontsize=32, fontweight='bold', labelpad=20)
    ax1.set_ylim(4.5, 6.7)
    ax1.tick_params(axis='y', labelcolor='blue', labelsize=28, width=2, length=10)
    
    # Plot price on right axis with thick line
    line2 = ax2.plot(x, price, 'r-', linewidth=6, label='Price (AUD)')
    ax2.set_ylabel('PRICE (AUD)', color='red', fontsize=32, fontweight='bold', labelpad=20)
    ax2.set_ylim(0.033, 0.041)
    ax2.tick_params(axis='y', labelcolor='red', labelsize=28, width=2, length=10)
    
    # Set x-axis labels with large font
    plt.xticks(x, dates, rotation=0, fontsize=28, fontweight='bold')
    ax1.set_xlabel('DATE (2025)', fontsize=32, fontweight='bold', labelpad=20)
    
    # Add title with very large font
    plt.title('IMUGENE (IMU.AX) SHORT INTEREST vs STOCK PRICE', fontsize=36, fontweight='bold', pad=20)
    
    # Add grid for better readability
    ax1.grid(True, linestyle='--', alpha=0.3)
    
    # Add legend with large font
    lines = line1 + line2
    labels = [l.get_label() for l in lines]
    ax1.legend(lines, labels, loc='upper right', fontsize=28, frameon=True, framealpha=0.8)
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'short_interest_vs_price.png'), bbox_inches='tight')
    plt.close()
    print("Created ultra-legible short interest vs price chart")

# Function to create maximally legible market cap comparison chart
def create_ultra_legible_market_cap():
    # Create a new figure with very large size
    plt.figure(figsize=(24, 16))
    
    # Simplified data for maximum clarity
    companies = ['Mesoblast', 'Aroa\nBiosurgery', 'Telix\nPharm', 'Imugene', 'Chimeric\nTherap', 'PAR\'TG']
    market_caps = [0.85, 0.32, 3.15, 0.22, 0.08, 0.04]
    
    # Create bar chart with extra wide bars
    bars = plt.bar(companies, market_caps, color='royalblue', width=0.6, edgecolor='black', linewidth=1.5)
    
    # Highlight Imugene bar
    bars[3].set_color('darkblue')
    
    # Customize chart with extra large fonts
    plt.title('MARKET CAPITALIZATION COMPARISON (AUD BILLIONS)', fontsize=36, fontweight='bold', pad=20)
    plt.ylabel('MARKET CAP (AUD BILLIONS)', fontsize=32, fontweight='bold', labelpad=20)
    plt.ylim(0, 3.5)
    
    # Add value labels on top of bars with very large font
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                f'${height:.2f}B', ha='center', va='bottom', fontsize=28, fontweight='bold')
    
    # Add grid for better readability
    plt.grid(axis='y', linestyle='--', alpha=0.3)
    
    # Adjust tick parameters for better visibility
    plt.tick_params(axis='both', which='major', labelsize=28, width=2, length=10)
    plt.tick_params(axis='x', rotation=0)
    
    # Add note about Imugene
    plt.annotate('Imugene', xy=(3, 0.22), xytext=(3, 0.5),
                arrowprops=dict(facecolor='black', shrink=0.05, width=2),
                fontsize=28, ha='center')
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'market_cap_comparison_ex_csl.png'), bbox_inches='tight')
    plt.close()
    print("Created ultra-legible market cap comparison chart")

# Execute all functions to create ultra-legible charts
create_ultra_legible_swot()
create_ultra_legible_share_price()
create_ultra_legible_short_interest()
create_ultra_legible_market_cap()

print("All charts created with maximum legibility!")
