/* Data file for Clinical Trial Timeline */

// Clinical trial data structure
const clinicalTrialData = {
    // Current trials
    currentTrials: [
        {
            id: "cf33-001",
            name: "CF33-hNIS (VAXINIA)",
            phase: "1",
            indication: "Solid Tumors",
            drugCandidate: "CF33",
            startDate: "2021-06-15",
            estimatedEndDate: "2023-12-31",
            status: "Ongoing",
            description: "Phase 1 dose-escalation study of CF33-hNIS (VAXINIA) in patients with advanced solid tumors",
            patientCount: 100,
            locations: ["United States", "Australia"],
            primaryEndpoint: "Safety and tolerability",
            secondaryEndpoints: ["Preliminary efficacy", "Viral shedding", "Immune response"],
            results: {
                safetyProfile: "Well-tolerated with manageable adverse events",
                efficacy: "Preliminary signs of efficacy in some patients",
                biomarkers: "Increased immune cell infiltration observed in tumor biopsies"
            },
            milestones: [
                { date: "2021-06-15", description: "First patient dosed" },
                { date: "2022-03-10", description: "Dose escalation completed" },
                { date: "2022-08-22", description: "Expansion cohort initiated" },
                { date: "2023-04-15", description: "Interim data presented at AACR" },
                { date: "2023-12-31", description: "Estimated study completion" }
            ],
            costs: {
                total: 15000000,
                perPatient: 150000,
                breakdown: {
                    clinicalOperations: 7500000,
                    drugManufacturing: 3000000,
                    regulatoryAffairs: 1000000,
                    dataManagement: 2000000,
                    other: 1500000
                }
            }
        },
        {
            id: "hervaxx-002",
            name: "HER-Vaxx",
            phase: "2",
            indication: "Gastric Cancer",
            drugCandidate: "HER-Vaxx",
            startDate: "2020-09-01",
            estimatedEndDate: "2023-09-30",
            status: "Ongoing",
            description: "Phase 2 study of HER-Vaxx in patients with HER2-positive gastric cancer",
            patientCount: 68,
            locations: ["Asia", "Eastern Europe"],
            primaryEndpoint: "Overall survival",
            secondaryEndpoints: ["Progression-free survival", "Objective response rate", "Quality of life"],
            results: {
                safetyProfile: "Generally well-tolerated",
                efficacy: "Median overall survival of 14.2 months vs. 8.8 months in control arm",
                biomarkers: "Strong antibody response against HER2"
            },
            milestones: [
                { date: "2020-09-01", description: "First patient enrolled" },
                { date: "2021-05-20", description: "50% enrollment completed" },
                { date: "2022-02-15", description: "Last patient enrolled" },
                { date: "2022-11-10", description: "Interim analysis completed" },
                { date: "2023-09-30", description: "Estimated final analysis" }
            ],
            costs: {
                total: 18000000,
                perPatient: 264706,
                breakdown: {
                    clinicalOperations: 9000000,
                    drugManufacturing: 4000000,
                    regulatoryAffairs: 1500000,
                    dataManagement: 2500000,
                    other: 1000000
                }
            }
        },
        {
            id: "pd1vaxx-001",
            name: "PD1-Vaxx",
            phase: "1",
            indication: "Non-Small Cell Lung Cancer",
            drugCandidate: "PD1-Vaxx",
            startDate: "2020-11-15",
            estimatedEndDate: "2023-06-30",
            status: "Ongoing",
            description: "Phase 1 dose-escalation study of PD1-Vaxx in patients with non-small cell lung cancer",
            patientCount: 32,
            locations: ["United States", "Australia"],
            primaryEndpoint: "Safety and tolerability",
            secondaryEndpoints: ["Immune response", "Preliminary efficacy", "Pharmacokinetics"],
            results: {
                safetyProfile: "Well-tolerated at all dose levels tested",
                efficacy: "Disease control observed in 60% of evaluable patients",
                biomarkers: "Induction of anti-PD1 antibodies in all patients at highest dose level"
            },
            milestones: [
                { date: "2020-11-15", description: "First patient dosed" },
                { date: "2021-08-05", description: "First cohort completed" },
                { date: "2022-03-18", description: "Dose escalation completed" },
                { date: "2022-09-22", description: "Expansion cohort initiated" },
                { date: "2023-06-30", description: "Estimated study completion" }
            ],
            costs: {
                total: 12000000,
                perPatient: 375000,
                breakdown: {
                    clinicalOperations: 6000000,
                    drugManufacturing: 2500000,
                    regulatoryAffairs: 1000000,
                    dataManagement: 1500000,
                    other: 1000000
                }
            }
        },
        {
            id: "cf33-002",
            name: "CF33-hNIS + Pembrolizumab",
            phase: "1/2",
            indication: "Advanced Solid Tumors",
            drugCandidate: "CF33",
            startDate: "2022-02-10",
            estimatedEndDate: "2024-08-31",
            status: "Ongoing",
            description: "Phase 1/2 study of CF33-hNIS in combination with pembrolizumab in patients with advanced solid tumors",
            patientCount: 75,
            locations: ["United States", "Australia", "Europe"],
            primaryEndpoint: "Safety and recommended Phase 2 dose",
            secondaryEndpoints: ["Objective response rate", "Duration of response", "Progression-free survival"],
            results: {
                safetyProfile: "Preliminary data shows manageable safety profile",
                efficacy: "Early signs of synergistic activity in checkpoint inhibitor-resistant tumors",
                biomarkers: "Increased T-cell infiltration and PD-L1 expression in tumor microenvironment"
            },
            milestones: [
                { date: "2022-02-10", description: "First patient dosed" },
                { date: "2022-09-15", description: "Phase 1 portion completed" },
                { date: "2022-11-30", description: "Phase 2 portion initiated" },
                { date: "2023-10-15", description: "Interim analysis planned" },
                { date: "2024-08-31", description: "Estimated study completion" }
            ],
            costs: {
                total: 22000000,
                perPatient: 293333,
                breakdown: {
                    clinicalOperations: 10000000,
                    drugManufacturing: 5000000,
                    regulatoryAffairs: 2000000,
                    dataManagement: 3000000,
                    other: 2000000
                }
            }
        },
        {
            id: "hervaxx-003",
            name: "HER-Vaxx + Chemotherapy",
            phase: "2/3",
            indication: "Gastric Cancer",
            drugCandidate: "HER-Vaxx",
            startDate: "2022-05-20",
            estimatedEndDate: "2025-06-30",
            status: "Ongoing",
            description: "Phase 2/3 study of HER-Vaxx in combination with standard chemotherapy in patients with HER2-positive gastric cancer",
            patientCount: 120,
            locations: ["Asia", "Eastern Europe", "Australia"],
            primaryEndpoint: "Overall survival",
            secondaryEndpoints: ["Progression-free survival", "Objective response rate", "Duration of response", "Quality of life"],
            results: {
                safetyProfile: "Enrollment ongoing, safety monitoring continues",
                efficacy: "Too early to assess",
                biomarkers: "Analysis pending"
            },
            milestones: [
                { date: "2022-05-20", description: "First patient enrolled" },
                { date: "2023-02-15", description: "25% enrollment completed" },
                { date: "2023-11-30", description: "50% enrollment target" },
                { date: "2024-08-15", description: "Interim analysis planned" },
                { date: "2025-06-30", description: "Estimated final analysis" }
            ],
            costs: {
                total: 35000000,
                perPatient: 291667,
                breakdown: {
                    clinicalOperations: 18000000,
                    drugManufacturing: 7000000,
                    regulatoryAffairs: 3000000,
                    dataManagement: 4000000,
                    other: 3000000
                }
            }
        }
    ],
    
    // Planned trials (not yet started)
    plannedTrials: [
        {
            id: "cf33-003",
            name: "CF33-hNIS Neoadjuvant Study",
            phase: "2",
            indication: "Breast Cancer",
            drugCandidate: "CF33",
            plannedStartDate: "2023-09-01",
            estimatedDuration: 24, // months
            status: "Planned",
            description: "Phase 2 neoadjuvant study of CF33-hNIS in patients with triple-negative breast cancer",
            estimatedPatientCount: 50,
            plannedLocations: ["United States", "Australia", "Europe"],
            primaryEndpoint: "Pathological complete response rate",
            secondaryEndpoints: ["Safety", "Disease-free survival", "Overall survival"],
            estimatedCosts: {
                total: 20000000,
                perPatient: 400000,
                breakdown: {
                    clinicalOperations: 10000000,
                    drugManufacturing: 4000000,
                    regulatoryAffairs: 2000000,
                    dataManagement: 2500000,
                    other: 1500000
                }
            }
        },
        {
            id: "pd1vaxx-002",
            name: "PD1-Vaxx Combination Study",
            phase: "2",
            indication: "Non-Small Cell Lung Cancer",
            drugCandidate: "PD1-Vaxx",
            plannedStartDate: "2023-10-15",
            estimatedDuration: 30, // months
            status: "Planned",
            description: "Phase 2 study of PD1-Vaxx in combination with standard of care in patients with non-small cell lung cancer",
            estimatedPatientCount: 80,
            plannedLocations: ["United States", "Europe", "Australia", "Asia"],
            primaryEndpoint: "Progression-free survival",
            secondaryEndpoints: ["Overall survival", "Objective response rate", "Duration of response", "Quality of life"],
            estimatedCosts: {
                total: 28000000,
                perPatient: 350000,
                breakdown: {
                    clinicalOperations: 14000000,
                    drugManufacturing: 6000000,
                    regulatoryAffairs: 2000000,
                    dataManagement: 3500000,
                    other: 2500000
                }
            }
        }
    ],
    
    // Completed trials
    completedTrials: [
        {
            id: "hervaxx-001",
            name: "HER-Vaxx Phase 1b/2",
            phase: "1b/2",
            indication: "Gastric Cancer",
            drugCandidate: "HER-Vaxx",
            startDate: "2018-03-15",
            endDate: "2020-06-30",
            status: "Completed",
            description: "Phase 1b/2 study of HER-Vaxx in patients with HER2-positive gastric cancer",
            patientCount: 36,
            locations: ["Asia"],
            primaryEndpoint: "Safety and immunogenicity",
            secondaryEndpoints: ["Preliminary efficacy", "Pharmacokinetics"],
            results: {
                safetyProfile: "Well-tolerated with no dose-limiting toxicities",
                efficacy: "Median overall survival of 14.2 months",
                biomarkers: "Strong antibody response against HER2 in all evaluable patients"
            },
            milestones: [
                { date: "2018-03-15", description: "First patient enrolled" },
                { date: "2018-09-20", description: "Phase 1b portion completed" },
                { date: "2019-01-10", description: "Phase 2 portion initiated" },
                { date: "2020-02-15", description: "Last patient last visit" },
                { date: "2020-06-30", description: "Final study report" }
            ],
            costs: {
                total: 10000000,
                perPatient: 277778,
                breakdown: {
                    clinicalOperations: 5000000,
                    drugManufacturing: 2000000,
                    regulatoryAffairs: 1000000,
                    dataManagement: 1500000,
                    other: 500000
                }
            }
        }
    ],
    
    // Financial data
    financialData: {
        currentCashPosition: 25000000, // as of latest quarter
        burnRate: {
            monthly: 2500000,
            quarterly: 7500000
        },
        projectedFinancing: [
            { date: "2023-09-30", amount: 30000000, type: "Capital Raising", probability: 0.8 },
            { date: "2024-06-30", amount: 15000000, type: "Partnership Milestone", probability: 0.6 }
        ],
        historicalFinancing: [
            { date: "2022-05-15", amount: 40000000, type: "Capital Raising" },
            { date: "2021-03-10", amount: 25000000, type: "Capital Raising" },
            { date: "2020-08-22", amount: 10000000, type: "Partnership Milestone" }
        ]
    },
    
    // Market data
    marketData: {
        indications: {
            "Gastric Cancer": {
                incidence: 1033701, // annual global cases
                prevalence: 1500000,
                fiveYearSurvival: 0.32,
                marketSize: 2500000000, // USD
                competitors: [
                    { name: "Herceptin", company: "Roche", annualSales: 1200000000 },
                    { name: "Keytruda", company: "Merck", annualSales: 800000000 }
                ]
            },
            "Non-Small Cell Lung Cancer": {
                incidence: 1800000,
                prevalence: 2200000,
                fiveYearSurvival: 0.25,
                marketSize: 8500000000,
                competitors: [
                    { name: "Keytruda", company: "Merck", annualSales: 4500000000 },
                    { name: "Opdivo", company: "Bristol Myers Squibb", annualSales: 2800000000 },
                    { name: "Tecentriq", company: "Roche", annualSales: 1200000000 }
                ]
            },
            "Breast Cancer": {
                incidence: 2300000,
                prevalence: 7800000,
                fiveYearSurvival: 0.90,
                marketSize: 13500000000,
                competitors: [
                    { name: "Herceptin", company: "Roche", annualSales: 3500000000 },
                    { name: "Ibrance", company: "Pfizer", annualSales: 5200000000 },
                    { name: "Kisqali", company: "Novartis", annualSales: 950000000 }
                ]
            },
            "Solid Tumors": {
                incidence: 10000000,
                prevalence: 25000000,
                fiveYearSurvival: 0.50,
                marketSize: 45000000000,
                competitors: [
                    { name: "Keytruda", company: "Merck", annualSales: 17000000000 },
                    { name: "Opdivo", company: "Bristol Myers Squibb", annualSales: 7500000000 },
                    { name: "Tecentriq", company: "Roche", annualSales: 3200000000 }
                ]
            }
        },
        drugCandidates: {
            "CF33": {
                mechanism: "Oncolytic virus",
                peakSalesPotential: 2500000000,
                probabilityOfSuccess: {
                    phase1: 0.85,
                    phase2: 0.50,
                    phase3: 0.35,
                    regulatory: 0.85
                }
            },
            "HER-Vaxx": {
                mechanism: "B-cell peptide cancer vaccine",
                peakSalesPotential: 1200000000,
                probabilityOfSuccess: {
                    phase1: 0.90,
                    phase2: 0.55,
                    phase3: 0.40,
                    regulatory: 0.80
                }
            },
            "PD1-Vaxx": {
                mechanism: "B-cell peptide cancer vaccine",
                peakSalesPotential: 1800000000,
                probabilityOfSuccess: {
                    phase1: 0.85,
                    phase2: 0.45,
                    phase3: 0.30,
                    regulatory: 0.80
                }
            }
        }
    },
    
    // Projection scenarios
    projectionScenarios: {
        base: {
            trialSuccessProbability: {
                phase1: 0.85,
                phase2: 0.50,
                phase3: 0.35,
                regulatory: 0.85
            },
            trialDuration: {
                phase1: 18, // months
                phase2: 24,
                phase3: 36,
                regulatory: 12
            },
            trialCost: {
                phase1: { base: 12000000, perPatient: 150000 },
                phase2: { base: 20000000, perPatient: 200000 },
                phase3: { base: 40000000, perPatient: 250000 },
                regulatory: { base: 5000000, perPatient: 0 }
            },
            marketPotential: {
                penetration: 0.15, // peak market share
                rampUp: 3, // years to peak sales
                tailOff: 5, // years of peak sales before decline
                decline: 0.15 // annual decline rate after peak
            }
        },
        optimistic: {
            trialSuccessProbability: {
                phase1: 0.90,
                phase2: 0.65,
                phase3: 0.50,
                regulatory: 0.90
            },
            trialDuration: {
                phase1: 15,
                phase2: 20,
                phase3: 30,
                regulatory: 10
            },
            trialCost: {
                phase1: { base: 10000000, perPatient: 140000 },
                phase2: { base: 18000000, perPatient: 180000 },
                phase3: { base: 35000000, perPatient: 220000 },
                regulatory: { base: 4500000, perPatient: 0 }
            },
            marketPotential: {
                penetration: 0.25,
                rampUp: 2,
                tailOff: 7,
                decline: 0.10
            }
        },
        pessimistic: {
            trialSuccessProbability: {
                phase1: 0.80,
                phase2: 0.40,
                phase3: 0.25,
                regulatory: 0.75
            },
            trialDuration: {
                phase1: 24,
                phase2: 30,
                phase3: 42,
                regulatory: 15
            },
            trialCost: {
                phase1: { base: 15000000, perPatient: 180000 },
                phase2: { base: 25000000, perPatient: 250000 },
                phase3: { base: 50000000, perPatient: 300000 },
                regulatory: { base: 6000000, perPatient: 0 }
            },
            marketPotential: {
                penetration: 0.10,
                rampUp: 4,
                tailOff: 3,
                decline: 0.20
            }
        }
    }
};
