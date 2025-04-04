// Clinical Trial Educational Tooltips Module
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists on this page
    const container = document.getElementById('clinical-trial-timeline-container');
    if (!container) return;
    
    // Initialize the educational tooltips module
    initializeEducationalTooltips();
    
    // Function to initialize educational tooltips
    function initializeEducationalTooltips() {
        // Create educational content database
        const educationalContent = {
            // Trial phases
            'Phase 1': {
                title: 'Phase 1 Clinical Trial',
                content: 'Phase 1 trials test a drug\'s safety, determine a safe dosage range, and identify side effects. These trials typically involve 20-100 healthy volunteers or people with the disease/condition and last several months. About 70% of drugs move to the next phase.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Phase 1A': {
                title: 'Phase 1A Clinical Trial',
                content: 'Phase 1A is the first part of Phase 1, focusing on single ascending dose (SAD) studies. Researchers give a small group of subjects a single dose, then monitor for side effects and how the drug is processed. If safe, the dose is increased for a new group.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Phase 1B': {
                title: 'Phase 1B Clinical Trial',
                content: 'Phase 1B follows Phase 1A and involves multiple ascending dose (MAD) studies. Subjects receive multiple doses at the same level, then doses are gradually increased for different groups to find the optimal dose range while ensuring safety.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Phase 2': {
                title: 'Phase 2 Clinical Trial',
                content: 'Phase 2 trials test effectiveness and further evaluate safety. These studies involve several hundred people with the disease/condition and last from several months to 2 years. About 33% of drugs move to the next phase.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Phase 2A': {
                title: 'Phase 2A Clinical Trial',
                content: 'Phase 2A is a pilot study to evaluate efficacy (and safety) in selected populations with the disease or condition being studied. These are typically non-randomized, open-label studies with fewer patients than Phase 2B.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Phase 2B': {
                title: 'Phase 2B Clinical Trial',
                content: 'Phase 2B is a more rigorous study designed to demonstrate efficacy in a specific dose range. These are often well-controlled, closely monitored trials that help determine the dose regimen for Phase 3 trials.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Phase 3': {
                title: 'Phase 3 Clinical Trial',
                content: 'Phase 3 trials gather more information about safety and effectiveness, study different populations and dosages, and examine the drug in combination with other drugs. These involve 300-3,000 participants and last 1-4 years. About 25-30% of drugs move to the next phase.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Pivotal Trial': {
                title: 'Pivotal Clinical Trial',
                content: 'A pivotal trial is a clinical trial designed to provide definitive evidence of efficacy for a specific indication. These are typically Phase 3 trials that will form the primary basis for approval by regulatory agencies like the FDA.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Phase 4': {
                title: 'Phase 4 Clinical Trial',
                content: 'Phase 4 trials occur after a drug is approved. These studies gather information on the drug\'s effect in various populations and any side effects associated with long-term use. They may involve thousands of participants.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-3-clinical-research'
            },
            'Regulatory Review': {
                title: 'Regulatory Review',
                content: 'During regulatory review, agencies like the FDA examine all submitted data on a drug to determine if it should be approved. This process typically takes 6-10 months for standard reviews and 4-6 months for priority reviews.',
                learnMore: 'https://www.fda.gov/patients/drug-development-process/step-4-fda-drug-review'
            },
            
            // Study designs
            'Randomized': {
                title: 'Randomized Study',
                content: 'In a randomized study, participants are assigned by chance to different treatment groups. This helps reduce bias and ensures that groups are similar at the start of the study.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/randomized-clinical-trial'
            },
            'Double-Blind': {
                title: 'Double-Blind Study',
                content: 'In a double-blind study, neither the participants nor the researchers know which treatment each participant is receiving. This helps prevent bias in assessing outcomes.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/double-blind-study'
            },
            'Placebo-Controlled': {
                title: 'Placebo-Controlled Study',
                content: 'A placebo-controlled study compares the effects of a drug to a placebo (an inactive substance that looks like the drug). This helps determine if improvements are due to the drug or other factors.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/placebo-controlled-study'
            },
            'Open-Label': {
                title: 'Open-Label Study',
                content: 'In an open-label study, both researchers and participants know which treatment is being administered. This design is often used when blinding is impractical or when the study focuses on safety rather than efficacy.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/open-label-study'
            },
            'Crossover': {
                title: 'Crossover Study',
                content: 'In a crossover study, participants receive one treatment and then switch to another. This allows each participant to serve as their own control, reducing the impact of individual differences.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/crossover-study'
            },
            
            // Endpoints and outcomes
            'Primary Endpoint': {
                title: 'Primary Endpoint',
                content: 'The primary endpoint is the main result measured in a clinical trial to determine whether the treatment being studied is effective. It is defined before the trial begins and is the basis for statistical analysis.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/primary-endpoint'
            },
            'Secondary Endpoint': {
                title: 'Secondary Endpoint',
                content: 'Secondary endpoints are additional outcomes measured in a clinical trial. They may provide supporting evidence for the primary endpoint or address other research questions.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/secondary-endpoint'
            },
            'Overall Survival': {
                title: 'Overall Survival (OS)',
                content: 'Overall survival measures the length of time from either the date of diagnosis or the start of treatment that patients are still alive. It is a common endpoint in cancer clinical trials.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/overall-survival'
            },
            'Progression-Free Survival': {
                title: 'Progression-Free Survival (PFS)',
                content: 'Progression-free survival is the length of time during and after treatment that a patient lives with the disease but it does not get worse. It is commonly used as an endpoint in cancer clinical trials.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/progression-free-survival'
            },
            'Objective Response Rate': {
                title: 'Objective Response Rate (ORR)',
                content: 'Objective response rate is the percentage of patients whose cancer shrinks or disappears after treatment. It includes complete responses (disappearance of all target lesions) and partial responses (≥30% decrease in target lesions).',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/objective-response'
            },
            
            // Regulatory terms
            'IND': {
                title: 'Investigational New Drug (IND)',
                content: 'An IND application is a request for FDA authorization to administer an investigational drug to humans. It includes data from preclinical studies, manufacturing information, clinical protocols, and investigator information.',
                learnMore: 'https://www.fda.gov/drugs/types-applications/investigational-new-drug-ind-application'
            },
            'NDA': {
                title: 'New Drug Application (NDA)',
                content: 'An NDA is a formal request to the FDA to approve a new drug for marketing in the United States. It includes all data on the drug\'s safety and efficacy, proposed labeling, and manufacturing processes.',
                learnMore: 'https://www.fda.gov/drugs/types-applications/new-drug-application-nda'
            },
            'BLA': {
                title: 'Biologics License Application (BLA)',
                content: 'A BLA is a request for permission to introduce a biologic product (like vaccines, blood products, or gene therapies) into interstate commerce. It requires proof of safety, purity, and potency.',
                learnMore: 'https://www.fda.gov/vaccines-blood-biologics/development-approval-process-cber/biologics-license-applications-bla-process-cber'
            },
            'Fast Track': {
                title: 'Fast Track Designation',
                content: 'Fast Track is a process designed to facilitate the development and expedite the review of drugs that treat serious conditions and fill an unmet medical need. It allows for more frequent meetings with the FDA and rolling review of the NDA/BLA.',
                learnMore: 'https://www.fda.gov/patients/fast-track-breakthrough-therapy-accelerated-approval-priority-review/fast-track'
            },
            'Breakthrough Therapy': {
                title: 'Breakthrough Therapy Designation',
                content: 'Breakthrough Therapy designation expedites the development and review of drugs that are intended to treat a serious condition and preliminary clinical evidence indicates substantial improvement over available therapy.',
                learnMore: 'https://www.fda.gov/patients/fast-track-breakthrough-therapy-accelerated-approval-priority-review/breakthrough-therapy'
            },
            'Accelerated Approval': {
                title: 'Accelerated Approval',
                content: 'Accelerated Approval allows drugs for serious conditions that fill an unmet medical need to be approved based on a surrogate endpoint that is reasonably likely to predict clinical benefit. Post-approval confirmatory trials are required.',
                learnMore: 'https://www.fda.gov/patients/fast-track-breakthrough-therapy-accelerated-approval-priority-review/accelerated-approval'
            },
            'Priority Review': {
                title: 'Priority Review',
                content: 'Priority Review designation means the FDA\'s goal is to take action on an application within 6 months (compared to 10 months under standard review). It is given to drugs that would significantly improve the treatment, diagnosis, or prevention of a serious condition.',
                learnMore: 'https://www.fda.gov/patients/fast-track-breakthrough-therapy-accelerated-approval-priority-review/priority-review'
            },
            'Orphan Drug': {
                title: 'Orphan Drug Designation',
                content: 'Orphan Drug designation is given to drugs intended to treat rare diseases (affecting fewer than 200,000 people in the US). Benefits include tax credits for clinical trials, exemption from user fees, and 7 years of market exclusivity upon approval.',
                learnMore: 'https://www.fda.gov/industry/developing-products-rare-diseases-conditions/designating-orphan-product-drugs-and-biological-products'
            },
            
            // Financial terms
            'Burn Rate': {
                title: 'Burn Rate',
                content: 'Burn rate refers to the rate at which a company spends its cash reserves. For biotech companies, this is often expressed as a monthly or quarterly figure and is used to calculate how long the company can operate before needing additional funding.',
                learnMore: 'https://www.investopedia.com/terms/b/burnrate.asp'
            },
            'Cash Runway': {
                title: 'Cash Runway',
                content: 'Cash runway is the amount of time a company can continue operating before it runs out of money. It is calculated by dividing the current cash reserves by the burn rate.',
                learnMore: 'https://www.investopedia.com/terms/r/runway.asp'
            },
            'Capital Raise': {
                title: 'Capital Raise',
                content: 'A capital raise is when a company raises money from investors. For biotech companies, this often occurs before starting expensive clinical trials or when existing cash is running low. Common methods include equity offerings, convertible notes, or partnerships.',
                learnMore: 'https://www.investopedia.com/terms/c/capital-funding.asp'
            },
            'Dilution': {
                title: 'Dilution',
                content: 'Dilution occurs when a company issues new shares, reducing the ownership percentage of existing shareholders. Biotech companies often need multiple rounds of funding, leading to significant dilution over time.',
                learnMore: 'https://www.investopedia.com/terms/d/dilution.asp'
            },
            
            // Oncology-specific terms
            'Oncolytic Virus': {
                title: 'Oncolytic Virus',
                content: 'Oncolytic viruses are viruses that preferentially infect and kill cancer cells. They can be naturally occurring or modified to enhance their cancer-killing abilities while minimizing damage to normal cells. They may also stimulate the immune system against cancer cells.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/oncolytic-virus'
            },
            'Checkpoint Inhibitor': {
                title: 'Checkpoint Inhibitor',
                content: 'Checkpoint inhibitors are drugs that block certain proteins made by immune system cells and some cancer cells. These proteins help keep immune responses in check, but can also prevent T cells from killing cancer cells. When these proteins are blocked, T cells can better kill cancer cells.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/checkpoint-inhibitor'
            },
            'CAR-T Therapy': {
                title: 'CAR-T Cell Therapy',
                content: 'CAR-T (Chimeric Antigen Receptor T-cell) therapy is a type of immunotherapy where a patient\'s T cells are modified in the laboratory to express CARs that recognize and attack cancer cells. The modified T cells are then infused back into the patient.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/car-t-cell-therapy'
            },
            'Monoclonal Antibody': {
                title: 'Monoclonal Antibody',
                content: 'Monoclonal antibodies are laboratory-produced molecules designed to serve as substitute antibodies that can restore, enhance, or mimic the immune system\'s attack on cancer cells. They are designed to bind to specific targets on cancer cells.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/monoclonal-antibody'
            },
            'HER2': {
                title: 'HER2 (Human Epidermal Growth Factor Receptor 2)',
                content: 'HER2 is a protein involved in normal cell growth. Some cancer cells, particularly in breast and gastric cancers, may have higher than normal levels of HER2, which can make the cancer grow and spread more aggressively. Therapies targeting HER2 can be effective for these cancers.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/her2'
            },
            'PD-1/PD-L1': {
                title: 'PD-1/PD-L1',
                content: 'PD-1 (Programmed Death-1) is a protein on T cells that helps keep the body\'s immune responses in check. PD-L1 (Programmed Death-Ligand 1) is a protein that binds to PD-1 to help keep immune responses in check. Some cancer cells have large amounts of PD-L1, which helps them evade immune attack. Drugs that block PD-1 or PD-L1 can boost the immune response against cancer cells.',
                learnMore: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/pd-1'
            },
            
            // Imugene-specific terms
            'CF33': {
                title: 'CF33 Oncolytic Virus',
                content: 'CF33 is Imugene\'s novel chimeric oncolytic virus. It was developed by Professor Yuman Fong at the City of Hope Cancer Center in California. CF33 is designed to selectively kill cancer cells while sparing normal cells, and can be armed with additional therapeutic genes to enhance its anti-cancer effects.',
                learnMore: 'https://www.imugene.com/oncolytic-viruses-1'
            },
            'VAXINIA': {
                title: 'VAXINIA (CF33-hNIS)',
                content: 'VAXINIA is Imugene\'s CF33 oncolytic virus armed with the human sodium iodide symporter (hNIS) gene. This addition allows the virus to be tracked in the body using standard imaging techniques and potentially enhances its therapeutic effect through radioiodine uptake by infected cancer cells.',
                learnMore: 'https://www.imugene.com/oncolytic-viruses-1'
            },
            'CHECKvacc': {
                title: 'CHECKvacc (CF33-antiPDL1)',
                content: 'CHECKvacc is Imugene\'s CF33 oncolytic virus armed with an anti-PD-L1 antibody gene. This combination aims to deliver checkpoint inhibitor therapy directly to the tumor microenvironment, potentially enhancing the immune response against cancer while minimizing systemic side effects.',
                learnMore: 'https://www.imugene.com/oncolytic-viruses-1'
            },
            'HER-Vaxx': {
                title: 'HER-Vaxx',
                content: 'HER-Vaxx is Imugene\'s B-cell peptide cancer vaccine designed to treat tumors that over-express the HER-2/neu receptor, such as gastric, breast, ovarian, lung and pancreatic cancers. It stimulates the patient\'s immune system to produce antibodies against HER-2/neu, which can inhibit tumor growth.',
                learnMore: 'https://www.imugene.com/her-vaxx'
            },
            'PD1-Vaxx': {
                title: 'PD1-Vaxx',
                content: 'PD1-Vaxx is Imugene\'s B-cell peptide cancer vaccine designed to treat tumors by producing antibodies that block PD-1/PD-L1 interactions. It aims to stimulate the production of polyclonal antibodies that can inhibit PD-1 signaling and reactivate the immune system against cancer cells.',
                learnMore: 'https://www.imugene.com/pd1-vaxx'
            }
        };
        
        // Create tooltip container
        const tooltipContainer = document.createElement('div');
        tooltipContainer.className = 'educational-tooltip';
        tooltipContainer.style.display = 'none';
        document.body.appendChild(tooltipContainer);
        
        // Add educational icons to relevant elements
        addEducationalIcons();
        
        // Function to add educational icons to relevant elements
        function addEducationalIcons() {
            // Wait for visualization to be fully loaded
            setTimeout(() => {
                // Add icons to phase headers
                addIconsToElements('.phase-header', 'after');
                
                // Add icons to technical terms in descriptions
                addIconsToTextNodes('.trial-description, .milestone-description, .panel-content');
                
                // Add icons to table headers
                addIconsToElements('th', 'after');
                
                // Add event listeners for dynamic content
                observeDynamicContent();
            }, 1000); // Delay to ensure visualization is loaded
        }
        
        // Function to add icons to specific elements
        function addIconsToElements(selector, position) {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                const text = element.textContent.trim();
                
                // Check if text contains any educational terms
                for (const term in educationalContent) {
                    if (text.includes(term)) {
                        // Create icon element
                        const icon = createEducationalIcon(term);
                        
                        // Add icon to element
                        if (position === 'after') {
                            element.appendChild(icon);
                        } else {
                            element.insertBefore(icon, element.firstChild);
                        }
                        
                        // Break after adding first matching term
                        break;
                    }
                }
            });
        }
        
        // Function to add icons to text nodes
        function addIconsToTextNodes(selector) {
            const containers = document.querySelectorAll(selector);
            
            containers.forEach(container => {
                // Get all text nodes
                const textNodes = getAllTextNodes(container);
                
                textNodes.forEach(textNode => {
                    const text = textNode.nodeValue;
                    
                    // Check for educational terms
                    for (const term in educationalContent) {
                        if (text.includes(term)) {
                            // Split text at the term
                            const parts = text.split(term);
                            
                            // Create elements
                            const fragment = document.createDocumentFragment();
                            fragment.appendChild(document.createTextNode(parts[0]));
                            
                            // Create term span with icon
                            const termSpan = document.createElement('span');
                            termSpan.className = 'educational-term';
                            termSpan.textContent = term;
                            
                            // Create icon
                            const icon = createEducationalIcon(term);
                            termSpan.appendChild(icon);
                            
                            fragment.appendChild(termSpan);
                            
                            // Add remaining text
                            if (parts.length > 1) {
                                fragment.appendChild(document.createTextNode(parts.slice(1).join(term)));
                            }
                            
                            // Replace text node with fragment
                            textNode.parentNode.replaceChild(fragment, textNode);
                            
                            // Only process one term per text node to avoid complications
                            break;
                        }
                    }
                });
            });
        }
        
        // Helper function to get all text nodes
        function getAllTextNodes(element) {
            const textNodes = [];
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue.trim() !== '') {
                    textNodes.push(node);
                }
            }
            
            return textNodes;
        }
        
        // Function to create educational icon
        function createEducationalIcon(term) {
            const icon = document.createElement('span');
            icon.className = 'educational-icon';
            icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
            icon.style.display = 'inline-block';
            icon.style.marginLeft = '4px';
            icon.style.cursor = 'pointer';
            icon.style.color = '#3498db';
            
            // Add data attribute for term
            icon.dataset.term = term;
            
            // Add event listeners
            icon.addEventListener('mouseenter', showTooltip);
            icon.addEventListener('mouseleave', hideTooltip);
            icon.addEventListener('click', openDetailedInfo);
            
            return icon;
        }
        
        // Function to show tooltip
        function showTooltip(event) {
            const icon = event.currentTarget;
            const term = icon.dataset.term;
            const content = educationalContent[term];
            
            if (!content) return;
            
            // Populate tooltip
            tooltipContainer.innerHTML = `
                <h4>${content.title}</h4>
                <p>${content.content}</p>
                <p class="tooltip-footer">Click for more information</p>
            `;
            
            // Position tooltip
            const iconRect = icon.getBoundingClientRect();
            const tooltipWidth = 300;
            
            // Calculate left position to keep tooltip on screen
            let left = iconRect.left + window.scrollX;
            if (left + tooltipWidth > window.innerWidth) {
                left = window.innerWidth - tooltipWidth - 20;
            }
            
            tooltipContainer.style.left = `${left}px`;
            tooltipContainer.style.top = `${iconRect.bottom + window.scrollY + 5}px`;
            tooltipContainer.style.display = 'block';
        }
        
        // Function to hide tooltip
        function hideTooltip() {
            tooltipContainer.style.display = 'none';
        }
        
        // Function to open detailed information
        function openDetailedInfo(event) {
            const icon = event.currentTarget;
            const term = icon.dataset.term;
            const content = educationalContent[term];
            
            if (!content) return;
            
            // Create modal for detailed information
            const modal = document.createElement('div');
            modal.className = 'educational-modal';
            modal.innerHTML = `
                <div class="educational-modal-content">
                    <div class="educational-modal-header">
                        <h3>${content.title}</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="educational-modal-body">
                        <p>${content.content}</p>
                        ${getRelatedTermsHTML(term)}
                        <div class="educational-modal-footer">
                            <a href="${content.learnMore}" target="_blank" class="learn-more-btn">Learn More</a>
                        </div>
                    </div>
                </div>
            `;
            
            // Add styles
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '2000';
            
            const modalContent = modal.querySelector('.educational-modal-content');
            modalContent.style.backgroundColor = 'white';
            modalContent.style.borderRadius = '8px';
            modalContent.style.padding = '20px';
            modalContent.style.width = '80%';
            modalContent.style.maxWidth = '600px';
            modalContent.style.maxHeight = '80vh';
            modalContent.style.overflow = 'auto';
            modalContent.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            
            const modalHeader = modal.querySelector('.educational-modal-header');
            modalHeader.style.display = 'flex';
            modalHeader.style.justifyContent = 'space-between';
            modalHeader.style.alignItems = 'center';
            modalHeader.style.borderBottom = '1px solid #eee';
            modalHeader.style.paddingBottom = '10px';
            modalHeader.style.marginBottom = '15px';
            
            const closeButton = modal.querySelector('.close-modal');
            closeButton.style.background = 'none';
            closeButton.style.border = 'none';
            closeButton.style.fontSize = '24px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.color = '#999';
            
            const learnMoreBtn = modal.querySelector('.learn-more-btn');
            learnMoreBtn.style.display = 'inline-block';
            learnMoreBtn.style.padding = '8px 15px';
            learnMoreBtn.style.backgroundColor = '#3498db';
            learnMoreBtn.style.color = 'white';
            learnMoreBtn.style.textDecoration = 'none';
            learnMoreBtn.style.borderRadius = '4px';
            learnMoreBtn.style.marginTop = '15px';
            
            // Add to document
            document.body.appendChild(modal);
            
            // Add event listener to close button
            closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close modal when clicking outside content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Hide tooltip
            hideTooltip();
        }
        
        // Function to get related terms HTML
        function getRelatedTermsHTML(currentTerm) {
            // Define related term groups
            const termGroups = {
                'Phase 1': ['Phase 1A', 'Phase 1B', 'Phase 2', 'IND'],
                'Phase 1A': ['Phase 1', 'Phase 1B', 'IND'],
                'Phase 1B': ['Phase 1', 'Phase 1A', 'Phase 2'],
                'Phase 2': ['Phase 1', 'Phase 2A', 'Phase 2B', 'Phase 3'],
                'Phase 2A': ['Phase 2', 'Phase 2B', 'Phase 3'],
                'Phase 2B': ['Phase 2', 'Phase 2A', 'Phase 3'],
                'Phase 3': ['Phase 2', 'Pivotal Trial', 'Phase 4', 'NDA', 'BLA'],
                'Pivotal Trial': ['Phase 3', 'Primary Endpoint', 'NDA', 'BLA'],
                'Phase 4': ['Phase 3', 'NDA', 'BLA'],
                'Regulatory Review': ['NDA', 'BLA', 'Fast Track', 'Priority Review'],
                'IND': ['Phase 1', 'Fast Track', 'Breakthrough Therapy'],
                'NDA': ['BLA', 'Regulatory Review', 'Fast Track', 'Priority Review'],
                'BLA': ['NDA', 'Regulatory Review', 'Fast Track', 'Priority Review'],
                'Fast Track': ['Breakthrough Therapy', 'Accelerated Approval', 'Priority Review'],
                'Breakthrough Therapy': ['Fast Track', 'Accelerated Approval', 'Priority Review'],
                'Accelerated Approval': ['Fast Track', 'Breakthrough Therapy', 'Priority Review'],
                'Priority Review': ['Fast Track', 'Breakthrough Therapy', 'Accelerated Approval'],
                'Orphan Drug': ['Fast Track', 'Priority Review'],
                'Primary Endpoint': ['Secondary Endpoint', 'Overall Survival', 'Progression-Free Survival'],
                'Secondary Endpoint': ['Primary Endpoint', 'Overall Survival', 'Progression-Free Survival'],
                'Overall Survival': ['Progression-Free Survival', 'Objective Response Rate'],
                'Progression-Free Survival': ['Overall Survival', 'Objective Response Rate'],
                'Objective Response Rate': ['Overall Survival', 'Progression-Free Survival'],
                'Burn Rate': ['Cash Runway', 'Capital Raise'],
                'Cash Runway': ['Burn Rate', 'Capital Raise'],
                'Capital Raise': ['Burn Rate', 'Cash Runway', 'Dilution'],
                'Dilution': ['Capital Raise'],
                'Oncolytic Virus': ['CF33', 'VAXINIA', 'CHECKvacc'],
                'CF33': ['Oncolytic Virus', 'VAXINIA', 'CHECKvacc'],
                'VAXINIA': ['CF33', 'Oncolytic Virus', 'CHECKvacc'],
                'CHECKvacc': ['CF33', 'Oncolytic Virus', 'PD-1/PD-L1'],
                'Checkpoint Inhibitor': ['PD-1/PD-L1', 'CHECKvacc', 'PD1-Vaxx'],
                'CAR-T Therapy': ['Monoclonal Antibody', 'Checkpoint Inhibitor'],
                'Monoclonal Antibody': ['HER2', 'PD-1/PD-L1', 'CAR-T Therapy'],
                'HER2': ['Monoclonal Antibody', 'HER-Vaxx'],
                'PD-1/PD-L1': ['Checkpoint Inhibitor', 'PD1-Vaxx', 'CHECKvacc'],
                'HER-Vaxx': ['HER2', 'PD1-Vaxx'],
                'PD1-Vaxx': ['PD-1/PD-L1', 'HER-Vaxx']
            };
            
            // Get related terms for current term
            const relatedTerms = termGroups[currentTerm] || [];
            
            // Filter out terms that don't have content
            const validRelatedTerms = relatedTerms.filter(term => educationalContent[term]);
            
            if (validRelatedTerms.length === 0) {
                return '';
            }
            
            // Create HTML for related terms
            let html = '<div class="related-terms"><h4>Related Terms</h4><ul>';
            
            validRelatedTerms.forEach(term => {
                html += `<li><a href="#" class="related-term" data-term="${term}">${educationalContent[term].title}</a></li>`;
            });
            
            html += '</ul></div>';
            
            return html;
        }
        
        // Function to observe dynamic content
        function observeDynamicContent() {
            // Create mutation observer
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check if any added nodes are elements that might contain educational terms
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Add icons to new elements
                                if (node.matches('.phase-header, th')) {
                                    addIconsToElements(node.tagName.toLowerCase(), 'after');
                                }
                                
                                // Add icons to text nodes in new elements
                                if (node.matches('.trial-description, .milestone-description, .panel-content') || 
                                    node.querySelector('.trial-description, .milestone-description, .panel-content')) {
                                    addIconsToTextNodes(node.tagName.toLowerCase());
                                }
                            }
                        });
                    }
                });
            });
            
            // Start observing
            observer.observe(container, {
                childList: true,
                subtree: true
            });
            
            // Add event delegation for related terms
            document.body.addEventListener('click', event => {
                const target = event.target;
                
                if (target.classList.contains('related-term')) {
                    event.preventDefault();
                    
                    // Get term and show detailed info
                    const term = target.dataset.term;
                    if (term && educationalContent[term]) {
                        // Close current modal
                        const currentModal = target.closest('.educational-modal');
                        if (currentModal) {
                            document.body.removeChild(currentModal);
                        }
                        
                        // Create fake icon with term data
                        const fakeIcon = document.createElement('span');
                        fakeIcon.dataset.term = term;
                        
                        // Open new modal
                        openDetailedInfo({ currentTarget: fakeIcon });
                    }
                }
            });
        }
    }
});
