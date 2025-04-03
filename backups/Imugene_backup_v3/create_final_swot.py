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
plt.rcParams['font.size'] = 36  # Increased base font size
plt.rcParams['axes.labelsize'] = 40
plt.rcParams['axes.titlesize'] = 44
plt.rcParams['xtick.labelsize'] = 36
plt.rcParams['ytick.labelsize'] = 36
plt.rcParams['legend.fontsize'] = 36
plt.rcParams['figure.titlesize'] = 48

# Function to create an extremely simplified SWOT analysis with maximum legibility
def create_final_swot():
    # Create a new figure with very large size
    fig = plt.figure(figsize=(30, 24))
    
    # Set a white background for maximum contrast
    fig.patch.set_facecolor('white')
    
    # Create a 2x2 grid for the SWOT quadrants with more space between them
    ax1 = plt.subplot2grid((2, 2), (0, 0), fig=fig)
    ax2 = plt.subplot2grid((2, 2), (0, 1), fig=fig)
    ax3 = plt.subplot2grid((2, 2), (1, 0), fig=fig)
    ax4 = plt.subplot2grid((2, 2), (1, 1), fig=fig)
    
    # Set titles with extremely large font
    ax1.set_title('STRENGTHS', fontsize=48, fontweight='bold', color='darkgreen')
    ax2.set_title('WEAKNESSES', fontsize=48, fontweight='bold', color='darkred')
    ax3.set_title('OPPORTUNITIES', fontsize=48, fontweight='bold', color='darkblue')
    ax4.set_title('THREATS', fontsize=48, fontweight='bold', color='darkorange')
    
    # Remove all axes for cleaner look
    for ax in [ax1, ax2, ax3, ax4]:
        ax.axis('off')
    
    # Add text with extremely large font and high contrast background
    # Strengths - simplified to just a few words per line
    strengths_text = """• Proprietary ImmuGene technology

• Multiple cancer pathways

• Positive clinical data

• Improving sentiment"""
    ax1.text(0.5, 0.5, strengths_text, 
             ha='center', va='center', fontsize=40, fontweight='bold',
             bbox=dict(facecolor='lightgreen', alpha=0.6, boxstyle='round,pad=1.5', edgecolor='darkgreen', linewidth=3))
    
    # Weaknesses - simplified to just a few words per line
    weaknesses_text = """• Significant cash burn

• Ongoing capital raises

• Management credibility issues

• Biotech investor skepticism"""
    ax2.text(0.5, 0.5, weaknesses_text, 
             ha='center', va='center', fontsize=40, fontweight='bold',
             bbox=dict(facecolor='mistyrose', alpha=0.6, boxstyle='round,pad=1.5', edgecolor='darkred', linewidth=3))
    
    # Opportunities - simplified to just a few words per line
    opportunities_text = """• Positive clinical results

• Significant revaluation potential

• Acquisition possibilities

• Partnership opportunities"""
    ax3.text(0.5, 0.5, opportunities_text, 
             ha='center', va='center', fontsize=40, fontweight='bold',
             bbox=dict(facecolor='lightblue', alpha=0.6, boxstyle='round,pad=1.5', edgecolor='darkblue', linewidth=3))
    
    # Threats - simplified to just a few words per line
    threats_text = """• Immuno-oncology competition

• Market skepticism

• Commercial viability concerns

• Novel therapeutics challenges"""
    ax4.text(0.5, 0.5, threats_text, 
             ha='center', va='center', fontsize=40, fontweight='bold',
             bbox=dict(facecolor='bisque', alpha=0.6, boxstyle='round,pad=1.5', edgecolor='darkorange', linewidth=3))
    
    # Add a super title
    plt.suptitle('IMUGENE (IMU.AX) SWOT ANALYSIS', fontsize=56, fontweight='bold', y=0.98)
    
    # Adjust layout and save with maximum quality
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    plt.subplots_adjust(hspace=0.3, wspace=0.3)  # Add more space between subplots
    plt.savefig(os.path.join(output_dir, 'swot_analysis.png'), 
                bbox_inches='tight', 
                dpi=300,
                facecolor='white')
    plt.close()
    print("Created final ultra-legible SWOT analysis with maximum text clarity")

# Execute the function to create the final SWOT chart
create_final_swot()

print("Final SWOT chart created with maximum legibility!")
