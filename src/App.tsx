/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Target, 
  Database, 
  Search, 
  Cpu, 
  CheckCircle2, 
  Rocket, 
  ArrowRight, 
  Info, 
  RefreshCw,
  Activity,
  AlertCircle,
  Layers,
  Terminal,
  Settings2,
  Zap,
  RotateCcw,
  BookOpen,
  FlaskConical,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  ShieldAlert,
  Users,
  TrendingDown,
  Globe,
  Github
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'motion/react';

// --- Types ---

type Language = 'en' | 'es';

const translations = {
  en: {
    header: {
      title: "Machine Learning Landscape",
      subtitle: "Analytical Modeling Framework v3.0",
      playground: "Playground",
      maturity: "Maturity",
      framework: "Framework",
      blueprints: "Blueprints",
      lab: "Lab",
      resources: "Resources"
    },
    footer: {
      created: "Created by",
      attribution: "This site was live coded with the help of Google AI Studio.",
      website: "Website",
      github: "GitHub"
    },
    maturity: {
      roadmap: "Strategic Roadmap",
      title: "The Analytics Maturity Road",
      description: "Companies evolve from reactive reporting to proactive decision automation. Each step increases competitive advantage but requires higher intelligence.",
      reactive: "Reactive Phases",
      proactive: "Proactive Phases",
      coreQuestion: "Core Question:",
      advantage: "Competitive Advantage",
      intelligence: "Intelligence Level",
      industryExample: "Industry Example",
      dataHandling: "Data Handling & Processing",
      structured: "Structured Data",
      unstructured: "Unstructured Data",
      evolution: "Maturity Evolution",
      nextStep: "Next Step",
      evolutionText: "Moving up the maturity curve requires not just better algorithms, but a fundamental shift in how the organization values and processes data.",
      relational: "Relational",
      nonRelational: "Non-Relational",
      relationalExample: "Example: SQL queries to extract {stage} metrics from ERP.",
      nonRelationalExample: "Example: Using NLP to parse {stage} insights from customer feedback.",
      causality: {
        subtitle: "The Causality Gap",
        title: "Forecasting vs. Predictive Modeling",
        forecastingTitle: "Forecasting (Correlation)",
        forecastingText: "\"I see a pattern, but I don't know the levers.\"",
        forecastingTrap: "The Trap:",
        forecastingTrapText: "Ice cream sales and shark attacks both rise in summer. They correlate perfectly, but banning ice cream won't stop shark attacks.",
        predictiveTitle: "Predictive Modeling (Causality)",
        predictiveText: "\"I understand the causality at the center.\"",
        predictivePower: "The Power:",
        predictivePowerText: "Increasing the discount rate by 5% causes a 12% increase in conversion because we've isolated the price-sensitivity lever.",
        testingSubtitle: "Testing Causality",
        testingTitle: "How we prove it",
        rctTitle: "RCTs (Randomized Controlled Trials)",
        rctText: "The gold standard of causality. By randomly assigning subjects to treatment or control groups, we eliminate bias and isolate the true effect of a single variable.",
        abTitle: "A/B Testing",
        abText: "The digital version of an RCT. Comparing two versions (A and B) to determine which performs better. Essential for validating predictive models in real-world scenarios.",
        quote: "\"Without causality, you are just guessing based on history. With causality, you are engineering the future. This is the difference between a report and a strategic tool.\""
      }
    },
    maturityStages: {
      descriptive: {
        title: "Descriptive",
        question: "What happened?",
        description: "Standard reports and dashboards summarizing historical data to provide a clear view of the past.",
        advantage: "Low",
        mode: "Reactive",
        industryExample: "Retail: Monthly sales report showing a 10% dip in Q3. Finance: Quarterly budget variance analysis. Logistics: Daily delivery completion rates.",
        structuredFocus: "SQL Databases, ERP Systems, CRM Logs, Sales Transactions",
        unstructuredFocus: "Archived PDF reports, basic server logs, legacy documentation"
      },
      diagnostic: {
        title: "Diagnostic",
        question: "Why did it happen?",
        description: "Ad-hoc reports and query drill-downs to find root causes and hidden patterns in historical data.",
        advantage: "Medium-Low",
        mode: "Reactive",
        industryExample: "Retail: Identifying that the sales dip was due to a supply chain delay in Asia. Healthcare: Analyzing patient readmission rates to find clinical gaps. Manufacturing: Root cause analysis of machine downtime.",
        structuredFocus: "Cross-functional joins, OLAP cubes, data warehouses, correlation matrices",
        unstructuredFocus: "Customer support tickets, social media mentions, call center transcripts"
      },
      forecasting: {
        title: "Forecasting",
        question: "What will happen? (Trends)",
        description: "Extrapolating historical patterns to predict future trends without necessarily understanding causality.",
        advantage: "Medium",
        mode: "Proactive",
        industryExample: "Retail: Seasonal demand forecasting for inventory planning. Energy: Predicting peak load based on historical weather patterns. Finance: Stock market trend analysis based on technical indicators.",
        structuredFocus: "Time-series data, historical trend datasets, seasonal indices",
        unstructuredFocus: "News sentiment trends, macro-economic report summaries"
      },
      predictive: {
        title: "Predictive",
        question: "What will happen? (Causal)",
        description: "Predictive modeling that identifies the causal levers driving future outcomes.",
        advantage: "Medium-High",
        mode: "Proactive",
        industryExample: "Marketing: Predicting individual customer churn based on specific behavioral triggers. Healthcare: Early diagnosis of diseases using biomarker patterns. Insurance: Fraud detection based on anomalous claim characteristics.",
        structuredFocus: "Feature vectors, causal inference models, behavioral logs",
        unstructuredFocus: "Sentiment analysis of reviews, image recognition for quality control, audio analysis"
      },
      prescriptive: {
        title: "Prescriptive",
        question: "How can we make it happen?",
        description: "Optimization and decision automation to drive outcomes and recommend the best course of action.",
        advantage: "High",
        mode: "Proactive",
        industryExample: "Aviation: Real-time dynamic pricing and crew scheduling. Supply Chain: Automated warehouse replenishment and route optimization. E-commerce: Personalized real-time product recommendations and discount targeting.",
        structuredFocus: "Optimization parameters, constraint variables, real-time streaming data",
        unstructuredFocus: "Real-time video feeds, sensor streams, live social media trends"
      }
    },
    framework: {
      title: "CRISP-DM Lifecycle",
      subtitle: "The Standard Process for Data Mining",
      description: "A robust, iterative framework that guides data science projects from business understanding to deployment.",
      effortTitle: "Project Effort Distribution",
      effortDesc: "Where does the time actually go?",
      effortDetail: "Data Preparation is notoriously the most time-consuming part of the lifecycle.",
      challengeTitle: "Knowledge Challenge",
      challengeDesc: "Test your understanding of this phase.",
      correct: "Correct!",
      incorrect: "Incorrect. Try again.",
      next: "Next Phase",
      back: "Back to Start",
      successTitle: "Measuring Success",
      successSubtitle: "Impact Assessment",
      successDesc: "How do we know if a data analytics initiative actually worked? We measure across three critical dimensions.",
      technicalTitle: "Technical Metrics",
      technicalDesc: "Model performance and data health.",
      businessTitle: "Business KPIs",
      businessDesc: "Direct financial and strategic value.",
      operationalTitle: "Operational Impact",
      operationalDesc: "Process efficiency and adoption.",
      techItems: ["Accuracy / F1-Score", "Model Latency", "Data Drift Score"],
      bizItems: ["ROI / Cost Savings", "Conversion Lift", "Churn Reduction"],
      opsItems: ["Automation Rate", "Decision Speed", "User Adoption"],
      frameworkTitle: "Iterative Framework",
      frameworkSubtitle: "The CRISP-DM Cycle",
      frameworkDesc: "Hover over the phases to explore the golden standard for Data Mining.",
      realityTitle: "The 80/20 Reality",
      rule80: "The 80% Rule",
      projectStart: "Project Start",
      deployment: "Deployment",
      dataHub: "Data Hub",
      dataHubDesc: "The central repository where data is stored, cleaned, and transformed throughout the lifecycle.",
      insightTitle: "Industry Insight",
      effortLabel: "Effort",
      tasksLabel: "Operational Tasks",
      effortQuestion: {
        part1: "Where does the",
        part2: "time actually go?"
      },
      kddQuiz: {
        title: "KDD vs CRISP-DM Quiz",
        question: "Question",
        of: "of",
        score: "Framework Mastery Score",
        restart: "Restart Quiz",
        questions: [
          {
            q: "Which step in KDD involves data reduction and projection?",
            options: ["Selection", "Transformation", "Data Mining", "Interpretation"],
            explanation: "Transformation is where data is reduced or projected into forms suitable for mining."
          },
          {
            q: "What is the primary difference between CRISP-DM and KDD?",
            options: ["KDD is faster", "CRISP-DM includes Business Understanding and Deployment", "KDD uses better algorithms", "There is no difference"],
            explanation: "CRISP-DM is business-oriented and covers the full project lifecycle including deployment."
          },
          {
            q: "In KDD, 'Data Mining' is just one step of the whole process. True or False?",
            options: ["True", "False"],
            explanation: "Correct! KDD treats Data Mining as the specific step of pattern extraction within a larger knowledge discovery pipeline."
          }
        ]
      },
      kddVsCrispTitle: "CRISP-DM vs KDD",
      kddVsCrispDesc: "While <strong className=\"text-white\">CRISP-DM</strong> is the industry standard for business projects, academia often references <strong className=\"text-white\">KDD (Knowledge Discovery in Databases)</strong>.",
      whatIsKdd: "What is KDD?",
      kddDesc: "KDD is a multi-step process focused on the technical extraction of knowledge from data. It emphasizes the data transformation pipeline.",
      kddSteps: ["Selection (Target Data)", "Preprocessing (Cleaning)", "Transformation (Reduction)", "Data Mining (Pattern Search)", "Interpretation (Evaluation)"],
      keyDifferences: "Key Differences",
      bizFocusTitle: "Business Focus",
      bizFocusDesc: "CRISP-DM starts with Business Understanding. KDD starts with Data Selection.",
      endGoalTitle: "End Goal",
      endGoalDesc: "CRISP-DM explicitly includes Deployment. KDD ends at Interpretation/Evaluation.",
      iterativityTitle: "Iterativity",
      iterativityDesc: "CRISP-DM is inherently cyclical. KDD is often viewed as a more linear pipeline.",
      playgroundTitle: "Interactive Playground",
      playgroundSubtitle: "The Analytics Lab",
      playgroundDesc: "Put your knowledge to the test with interactive simulations, sorting games, and knowledge checks.",
      resources: {
        title: "References & Resources",
        subtitle: "Knowledge Base",
        desc: "Deepen your understanding with these curated resources on data mining, machine learning, and MLOps.",
        lectures: "Foundational Lectures",
        reading: "Recommended Reading",
        tools: "External Tools & Frameworks",
        learningPathTitle: "Continuous Learning Path",
        learningPathDesc: "The field of Data Science is constantly evolving. Stay updated by following key researchers, attending conferences like NeurIPS or ICML, and contributing to open-source projects.",
        curriculum: "v3.0 Curriculum",
        updated: "Updated: March 2026"
      },
      quiz: {
        title: "Framework Mastery Quiz",
        question: "Question",
        of: "of",
        score: "Framework Mastery Score",
        restart: "Restart Quiz",
        correct: "Correct!",
        incorrect: "Incorrect. Try again.",
        next: "Next Question",
        back: "Finish Quiz",
        verified: "KDD Pipeline Verified!",
        sortingTitle: "KDD Sorting Game",
        sortingDesc: "Sort the KDD pipeline from Selection to Interpretation.",
        phases: {
          selection: "Selection",
          preprocessing: "Pre-processing",
          transformation: "Transformation",
          mining: "Data Mining",
          interpretation: "Interpretation"
        }
      }
    },
    stages: {
      business: {
        title: "Business Understanding",
        description: "Defining the problem, success metrics, and project plan.",
        tasks: ["Define Objectives", "Assess Situation", "Set Goals", "Project Plan"],
        insightText: "A clear business problem is 50% of the solution.",
        insightSub: "Most projects fail not because of the math, but because they solved the wrong problem.",
        challenge: {
          question: "In CRISP-DM, what is the primary goal of this initial phase?",
          options: ["Writing the code", "Understanding project requirements from a business perspective", "Cleaning the data", "Deploying the model"],
          explanation: "Business Understanding is about translating business goals into a data mining problem definition."
        }
      },
      data: {
        title: "Data Understanding",
        description: "Initial data collection, exploration, and quality verification.",
        tasks: ["Initial Collection", "Data Description", "Data Exploration", "Quality Check"],
        insightText: "Data is the new oil, but it's often unrefined and full of impurities.",
        insightSub: "Exploratory Data Analysis (EDA) is where you find the 'why' behind the 'what'.",
        challenge: {
          question: "What happens if data quality is found to be poor in this stage?",
          options: ["Ignore it", "Go back to Business Understanding to redefine scope", "Just train anyway", "Delete the data"],
          explanation: "CRISP-DM is iterative; poor data quality often requires revisiting business goals or data sources."
        }
      },
      prep: {
        title: "Data Preparation",
        description: "Selection, cleaning, construction, and integration of data.",
        tasks: ["Data Selection", "Data Cleaning", "Feature Engineering", "Integration"],
        insightText: "Data Preparation is not a hurdle to the work; it IS the work.",
        insightSub: "Feature engineering is the secret sauce that separates good models from great ones.",
        challenge: {
          question: "Which task consumes roughly 80% of a data scientist's time?",
          options: ["Modeling", "Data Preparation", "Deployment", "Evaluation"],
          explanation: "Data Preparation is notoriously the most time-consuming part of the lifecycle."
        }
      },
      modeling: {
        title: "Modeling",
        description: "Selecting techniques, generating test designs, and building models.",
        tasks: ["Select Technique", "Test Design", "Build Model", "Assess Model"],
        insightText: "All models are wrong, but some are useful.",
        insightSub: "Complexity is the enemy of reliability; start simple and iterate.",
        challenge: {
          question: "Why might you return to Data Preparation from Modeling?",
          options: ["To get more coffee", "To create better features based on model performance", "To change the business goal", "To deploy the model"],
          explanation: "Modeling often reveals that the data needs further transformation or different features."
        }
      },
      evaluation: {
        title: "Evaluation",
        description: "Evaluating results against business objectives and reviewing process.",
        tasks: ["Evaluate Results", "Review Process", "Determine Next Steps"],
        insightText: "Don't mistake high accuracy for business value.",
        insightSub: "A model that doesn't align with business KPIs is just a research project.",
        challenge: {
          question: "What is the key question at the end of the Evaluation phase?",
          options: ["Is the code clean?", "Does the model meet business objectives?", "How fast is the server?", "Can we use a different language?"],
          explanation: "Evaluation determines if the model is ready for deployment based on the original business goals."
        }
      },
      deployment: {
        title: "Deployment",
        description: "Plan deployment, monitoring, maintenance, and final report. This is where the model meets the real world.",
        tasks: ["Plan Deployment", "Monitoring & Drift", "Maintenance", "Final Report"],
        insightText: "Deployment is the beginning, not the end.",
        insightSub: "MLOps is about ensuring that the model continues to provide value in a changing world.",
        challenge: {
          question: "What is 'Model Drift' in the context of Deployment?",
          options: ["The model getting faster", "The model's performance degrading over time due to changing data", "The model moving to a different server", "The model becoming more accurate"],
          explanation: "Model drift occurs when the statistical properties of the target variable, which the model is trying to predict, change over time in unforeseen ways."
        }
      }
    },
    blueprints: {
      title: "Strategic Blueprints",
      subtitle: "Industry-Standard ML Architectures",
      description: "Explore proven technical frameworks for common business challenges.",
      viewTechnical: "View Technical Blueprint",
      modalTitle: "Technical Blueprint",
      modalAlgorithms: "Core Algorithms",
      modalData: "Data Sources",
      modalKPIs: "KPIs & Metrics",
      modalStack: "Tech Stack",
      modalClose: "Close Blueprint",
      selectScenario: "Select Scenario",
      business: "Business Understanding",
      data: "Data & Preparation",
      modeling: "Modeling & Evaluation",
      deployment: "Deployment Strategy",
      readyToImplement: "Ready to Implement?",
      accessTechnical: "Access the technical blueprint to see the recommended architecture, algorithms, and KPIs for this scenario.",
      seeBlueprint: "See Technical Blueprint"
    },
    iceberg: {
      title: "The ML System Iceberg",
      subtitle: "Hidden Complexity",
      description: "Inspired by Google's \"Hidden Technical Debt in Machine Learning Systems\" paper. The actual ML code is only a tiny fraction of the overall system.",
      config: "Configuration",
      dataCollection: "Data Collection",
      featureExtraction: "Feature Extraction",
      dataVerification: "Data Verification",
      mlCode: "ML Code",
      analysisTools: "Analysis Tools",
      processMgmt: "Process Management",
      servingInfra: "Serving Infrastructure",
      monitoring: "Monitoring",
      resourceMgmt: "Resource Mgmt",
      debtTitle: "Technical Debt",
      debtDesc: "ML systems have all the maintenance challenges of traditional code, plus an additional set of ML-specific issues.",
      icebergTitle: {
        part1: "The",
        part2: "ML System",
        part3: "Iceberg"
      },
      infraTitle: "Infrastructure Cost",
      infraDesc: "The cost of building and maintaining the surrounding infrastructure often dwarfs the cost of the actual ML model.",
      rigorTitle: "Operational Rigor",
      rigorDesc: "Success requires robust data pipelines, monitoring, and automated testing, not just a high-accuracy model."
    },
    useCases: {
      segmentation: {
        title: "Customer Segmentation",
        description: "Using clustering to identify high-value customer groups for banks.",
        technical: {
          algorithms: ["K-Means", "DBSCAN", "PCA"],
          dataSources: ["Transaction History", "Demographics", "Web Logs"],
          metrics: ["Silhouette Score", "CLV", "Churn Rate"],
          stack: ["Scikit-Learn", "Pandas", "PostgreSQL"]
        },
        stages: {
          business: "Identify distinct customer groups to personalize marketing and improve retention.",
          data: "Collect transaction history, demographics, and digital channel usage data.",
          prep: "Calculate RFM (Recency, Frequency, Monetary) metrics and normalize features.",
          modeling: "Apply K-Means or DBSCAN to find natural groupings in the customer base.",
          evaluation: "Profile clusters with marketing teams to ensure segments are actionable.",
          deployment: "Integrate segments into CRM for automated, personalized email campaigns."
        }
      },
      "credit-risk": {
        title: "Credit Risk Scoring",
        description: "Predicting the probability of default for loan applicants.",
        technical: {
          algorithms: ["XGBoost", "Logistic Regression", "Random Forest"],
          dataSources: ["Loan History", "Credit Bureau", "Employment"],
          metrics: ["Precision-Recall", "F1-Score", "ROC-AUC"],
          stack: ["XGBoost", "Scikit-Learn", "FastAPI"]
        },
        stages: {
          business: "Minimize financial loss from defaults while maintaining high approval rates.",
          data: "Historical loan data, credit bureau scores, income, and employment history.",
          prep: "Handle missing values, encode categorical variables, and address class imbalance.",
          modeling: "Train XGBoost or Logistic Regression models to predict default probability.",
          evaluation: "Analyze Precision-Recall curves and perform financial stress testing.",
          deployment: "Deploy as a real-time API integrated into the loan application portal."
        }
      },
      churn: {
        title: "Churn Prediction",
        description: "Identifying at-risk customers before they leave the service.",
        technical: {
          algorithms: ["Random Forest", "Survival Analysis", "LGBM"],
          dataSources: ["Subscription Logs", "Support Tickets", "App Usage"],
          metrics: ["Churn Rate", "Recall", "Precision"],
          stack: ["LightGBM", "Pandas", "BigQuery"]
        },
        stages: {
          business: "Reduce attrition rate by proactively offering incentives to at-risk users.",
          data: "Subscription logs, support ticket history, and app engagement metrics.",
          prep: "Create time-series features like 'change in usage over last 30 days'.",
          modeling: "Use Random Forest or Survival Analysis to estimate churn risk scores.",
          evaluation: "Validate with a hold-out set and calculate the ROI of retention offers.",
          deployment: "Daily batch scoring that alerts account managers about high-risk clients."
        }
      },
      "rag-bot": {
        title: "AI Support Bot (RAG)",
        description: "A chatbot powered by LLMs and Retrieval Augmented Generation.",
        technical: {
          algorithms: ["RAG", "Vector Search", "Prompt Engineering"],
          dataSources: ["Knowledge Base", "Manuals", "Chat Logs"],
          metrics: ["Hallucination Rate", "Relevance", "Latency"],
          stack: ["LangChain", "Pinecone", "OpenAI"]
        },
        stages: {
          business: "Automate 70% of support queries with high accuracy using internal docs.",
          data: "Knowledge base, product manuals, and historical chat transcripts.",
          prep: "Chunk documents, generate embeddings, and index into a vector database.",
          modeling: "Configure LLM prompt templates and tune the retrieval (Top-K) parameters.",
          evaluation: "Test for hallucinations and relevance using RAGAS or human review.",
          deployment: "Deploy as a streaming chat interface with safety guardrails."
        }
      }
    },
    lab: {
      title: "The ML Lab",
      subtitle: "Experimental Sandbox",
      description: "Simulate model training and evaluate performance metrics in real-time.",
      train: "Train Model",
      training: "Training...",
      reset: "Reset Lab",
      metrics: "Performance Metrics",
      accuracy: "Accuracy",
      precision: "Precision",
      recall: "Recall",
      f1: "F1 Score",
      logs: "Training Logs",
      maturityLab: {
        title: "Maturity Lab",
        subtitle: "Scenario Challenge",
        correct: "Correct Analysis!",
        incorrect: "Incorrect Interpretation",
        next: "Next Scenario",
        scenarios: [
          {
            text: "A retail chain wants to automatically adjust prices in real-time based on competitor stock levels and weather forecasts to maximize margin.",
            explanation: "This is prescriptive because it's about 'How can we make it happen?' through automated optimization."
          },
          {
            text: "A bank needs to identify which specific customers are likely to churn in the next 30 days based on their recent app usage patterns.",
            explanation: "This is predictive because it's asking 'What will happen?' based on historical patterns."
          },
          {
            text: "A hospital is reviewing last year's patient admission rates to understand seasonal peaks.",
            explanation: "This is descriptive because it's summarizing 'What happened?' in the past."
          },
          {
            text: "An e-commerce site is analyzing why cart abandonment increased by 20% after the last UI update.",
            explanation: "This is diagnostic because it's investigating 'Why did it happen?'"
          }
        ]
      },
      successMetricMatcher: {
        title: "Success Metric Matcher",
        prompt: "Assign the metric to the correct category",
        score: "Score",
        perfect: "Perfect! You understand how to measure impact.",
        keepGoing: "Keep going! Match all metrics.",
        correct: "Correct!",
        incorrect: "Wrong Category",
        gameOver: "Game Over",
        tryAgain: "Try Again",
        categories: {
          technical: "Technical Performance",
          business: "Business KPIs",
          operational: "Operational Impact",
          statistical: "Statistical Accuracy"
        },
        challenges: [
          {
            metric: "Conversion Lift",
            category: "Business KPIs",
            explanation: "Conversion lift directly measures the business value generated by the model's predictions."
          },
          {
            metric: "Model Latency",
            category: "Technical Performance",
            explanation: "Latency measures how fast the model produces a prediction, critical for real-time systems."
          },
          {
            metric: "F1-Score",
            category: "Statistical Accuracy",
            explanation: "F1-score balances precision and recall, providing a robust measure of model quality."
          }
        ]
      },
      phaseSorting: {
        title: "Game: Sort the Lifecycle",
        description: "Drag the phases into the correct CRISP-DM sequence.",
        verified: "Sequence Optimized! 100% Alignment."
      },
      taskMatcher: {
        title: "Game: Task Matcher",
        prompt: "Assign the task to the correct CRISP-DM phase",
        gameOver: "Game Over! You've mastered the lifecycle.",
        accuracy: "Task Assignment Accuracy",
        tryAgain: "Try Again",
        tasks: [
          { task: 'Feature Engineering', phase: 'Data Preparation' },
          { task: 'Success Metrics', phase: 'Business Understanding' },
          { task: 'Data Cleaning', phase: 'Data Preparation' },
          { task: 'Model Assessment', phase: 'Modeling' },
          { task: 'Drift Monitoring', phase: 'Deployment' },
          { task: 'Exploratory Data Analysis', phase: 'Data Understanding' },
          { task: 'Project Plan', phase: 'Business Understanding' },
          { task: 'Review Process', phase: 'Evaluation' }
        ]
      },
      dataTypeClassifier: {
        title: "Data Type Classifier",
        prompt: "Classify this data:",
        correct: "Correct!",
        incorrect: "Incorrect",
        gameOver: "Game Over",
        tryAgain: "Try Again",
        accuracy: "Classification Accuracy",
        itemsLabel: "Items Classified",
        structured: "Structured",
        unstructured: "Unstructured",
        semiStructured: "Semi-structured",
        items: {
          sql: "Customer Age (25, 34, 45...)",
          audio: "Call Center Audio",
          json: "Sensor Readings (JSON)",
          images: "Product Reviews (Text)",
          csv: "Inventory List (CSV)",
          notes: "Doctor's Handwritten Notes",
          logs: "Server Access Logs",
          pdf: "Archived PDF Reports"
        }
      }
    },
    knowledgeValidation: {
      title: "Knowledge Validation",
      correct: "Correct Analysis",
      incorrect: "Incorrect Interpretation"
    },
    continuousLearning: {
      title: "Continuous Learning & MLOps",
      subtitle: "The Infinite Loop",
      description: "Data Science doesn't end at deployment. It's a living cycle where monitoring feeds back into business understanding to ensure the model remains relevant.",
      driftTitle: "The \"Silent Killer\": Data Drift",
      driftDesc: "Imagine a fraud detection model trained on 2020 data. In 2024, spending patterns have completely changed. Without a feedback loop, the model will start missing fraud or blocking legitimate users. This is why we monitor, evaluate, and retrain.",
      monitoringTitle: "Live Monitoring Simulation",
      stable: "MODEL STABLE",
      critical: "CRITICAL DRIFT",
      retraining: "RETRAINING...",
      accuracy: "Model Accuracy",
      drift: "Data Drift",
      trigger: "Trigger Manual Retraining",
      active: "Retraining Pipeline Active",
      concepts: [
        {
          title: "Model Drift",
          desc: "The degradation of model performance over time as real-world data evolves away from training data."
        },
        {
          title: "Continuous Monitoring",
          desc: "Tracking accuracy, latency, and data quality in real-time to detect anomalies early."
        },
        {
          title: "Retraining Loops",
          desc: "Automated pipelines that trigger model updates when performance drops below a threshold."
        },
        {
          title: "Human-in-the-loop",
          desc: "Expert review of edge cases to improve model logic and ensure ethical alignment."
        }
      ]
    },
    resources: {
      title: "References & Resources",
      subtitle: "Knowledge Base",
      description: "Deepen your understanding with curated lectures, industry-standard documentation, and essential tools.",
      learningPath: "Continuous Learning Path",
      learningDesc: "The field of Data Science is constantly evolving. Stay updated by following key researchers, attending conferences like NeurIPS or ICML, and contributing to open-source projects.",
      updated: "Updated: March 2026"
    }
  },
  es: {
    header: {
      title: "Panorama de Machine Learning",
      subtitle: "Marco de Modelado Analítico v3.0",
      playground: "Laboratorio",
      maturity: "Madurez",
      framework: "Marco",
      blueprints: "Planos",
      lab: "Laboratorio",
      resources: "Recursos"
    },
    footer: {
      created: "Creado por",
      attribution: "Este sitio fue programado en vivo con la ayuda de Google AI Studio.",
      website: "Sitio Web",
      github: "GitHub"
    },
    maturity: {
      roadmap: "Hoja de Ruta Estratégica",
      title: "El Camino de la Madurez Analítica",
      description: "Las empresas evolucionan desde informes reactivos hasta la automatización de decisiones proactivas. Cada paso aumenta la ventaja competitiva pero requiere mayor inteligencia.",
      reactive: "Fases Reactivas",
      proactive: "Fases Proactivas",
      coreQuestion: "Pregunta Clave:",
      advantage: "Ventaja Competitiva",
      intelligence: "Nivel de Inteligencia",
      industryExample: "Ejemplo de la Industria",
      dataHandling: "Manejo y Procesamiento de Datos",
      structured: "Datos Estructurados",
      unstructured: "Datos No Estructurados",
      evolution: "Evolución de la Madurez",
      nextStep: "Siguiente Paso",
      evolutionText: "Subir en la curva de madurez requiere no solo mejores algoritmos, sino un cambio fundamental en cómo la organización valora y procesa los datos.",
      relational: "Relacional",
      nonRelational: "No Relacional",
      relationalExample: "Ejemplo: Consultas SQL para extraer métricas de {stage} del ERP.",
      nonRelationalExample: "Ejemplo: Uso de PLN para analizar información de {stage} a partir de los comentarios de los clientes.",
      causality: {
        subtitle: "La Brecha de Causalidad",
        title: "Pronóstico vs. Modelado Predictivo",
        forecastingTitle: "Pronóstico (Correlación)",
        forecastingText: "\"Veo un patrón, pero no conozco las palancas.\"",
        forecastingTrap: "La Trampa:",
        forecastingTrapText: "Las ventas de helados y los ataques de tiburones aumentan en verano. Se correlacionan perfectamente, pero prohibir los helados no detendrá los ataques de tiburones.",
        predictiveTitle: "Modelado Predictivo (Causalidad)",
        predictiveText: "\"Entiendo la causalidad en el centro.\"",
        predictivePower: "El Poder:",
        predictivePowerText: "Aumentar la tasa de descuento en un 5% provoca un aumento del 12% en la conversión porque hemos aislado la palanca de sensibilidad al precio.",
        testingSubtitle: "Probando la Causalidad",
        testingTitle: "Cómo lo probamos",
        rctTitle: "RCTs (Ensayos Controlados Aleatorios)",
        rctText: "El estándar de oro de la causalidad. Al asignar aleatoriamente sujetos a grupos de tratamiento o control, eliminamos el sesgo e aislamos el efecto real de una sola variable.",
        abTitle: "Pruebas A/B",
        abText: "La versión digital de un RCT. Comparar dos versiones (A y B) para determinar cuál funciona mejor. Esencial para validar modelos predictivos en escenarios del mundo real.",
        quote: "\"Sin causalidad, solo estás adivinando basándote en la historia. Con causalidad, estás diseñando el futuro. Esta es la diferencia entre un informe y una herramienta estratégica.\""
      }
    },
    maturityStages: {
      descriptive: {
        title: "Descriptivo",
        question: "¿Qué pasó?",
        description: "Informes y tableros estándar que resumen datos históricos para proporcionar una visión clara del pasado.",
        advantage: "Baja",
        mode: "Reactiva",
        industryExample: "Retail: Informe de ventas mensual que muestra una caída del 10% en el tercer trimestre. Finanzas: Análisis de varianza presupuestaria trimestral. Logística: Tasas de finalización de entregas diarias.",
        structuredFocus: "Bases de datos SQL, sistemas ERP, registros CRM, transacciones de ventas",
        unstructuredFocus: "Informes PDF archivados, registros básicos del servidor, documentación heredada"
      },
      diagnostic: {
        title: "Diagnóstico",
        question: "¿Por qué pasó?",
        description: "Informes ad-hoc y desgloses de consultas para encontrar causas raíz y patrones ocultos en datos históricos.",
        advantage: "Media-Baja",
        mode: "Reactiva",
        industryExample: "Retail: Identificar que la caída de ventas se debió a un retraso en la cadena de suministro en Asia. Salud: Analizar las tasas de reingreso de pacientes para encontrar brechas clínicas. Manufactura: Análisis de causa raíz del tiempo de inactividad de las máquinas.",
        structuredFocus: "Uniones multifuncionales, cubos OLAP, almacenes de datos, matrices de correlación",
        unstructuredFocus: "Tickets de soporte al cliente, menciones en redes sociales, transcripciones de centros de llamadas"
      },
      forecasting: {
        title: "Pronóstico",
        question: "¿Qué pasará? (Tendencias)",
        description: "Extrapolación de patrones históricos para predecir tendencias futuras sin necesariamente entender la causalidad.",
        advantage: "Media",
        mode: "Proactiva",
        industryExample: "Retail: Pronóstico de demanda estacional para la planificación de inventario. Energía: Predicción de carga máxima basada en patrones climáticos históricos. Finanzas: Análisis de tendencias del mercado de valores basado en indicadores técnicos.",
        structuredFocus: "Datos de series temporales, conjuntos de datos de tendencias históricas, índices estacionales",
        unstructuredFocus: "Tendencias de sentimiento de noticias, resúmenes de informes macroeconómicos"
      },
      predictive: {
        title: "Predictivo",
        question: "¿Qué pasará? (Causal)",
        description: "Modelado predictivo que identifica las palancas causales que impulsan los resultados futuros.",
        advantage: "Media-Alta",
        mode: "Proactiva",
        industryExample: "Marketing: Predecir la pérdida de clientes individuales basada en disparadores de comportamiento específicos. Salud: Diagnóstico temprano de enfermedades usando patrones de biomarcadores. Seguros: Detección de fraude basada en características de reclamos anómalos.",
        structuredFocus: "Vectores de características, modelos de inferencia causal, registros de comportamiento",
        unstructuredFocus: "Análisis de sentimiento de reseñas, reconocimiento de imágenes para control de calidad, análisis de audio"
      },
      prescriptive: {
        title: "Prescriptivo",
        question: "¿Cómo podemos hacer que suceda?",
        description: "Optimización y automatización de decisiones para impulsar resultados y recomendar el mejor curso de acción.",
        advantage: "Alta",
        mode: "Proactiva",
        industryExample: "Aviación: Precios dinámicos en tiempo real y programación de tripulaciones. Cadena de Suministro: Reabastecimiento automatizado de almacenes y optimización de rutas. Comercio Electrónico: Recomendaciones de productos personalizadas en tiempo real y segmentación de descuentos.",
        structuredFocus: "Parámetros de optimización, variables de restricción, datos de transmisión en tiempo real",
        unstructuredFocus: "Feeds de video en tiempo real, flujos de sensores, tendencias de redes sociales en vivo"
      }
    },
    framework: {
      title: "Ciclo de Vida CRISP-DM",
      subtitle: "El Proceso Estándar para la Minería de Datos",
      description: "Un marco robusto e iterativo que guía los proyectos de ciencia de datos desde la comprensión del negocio hasta el despliegue.",
      effortTitle: "Distribución del Esfuerzo del Proyecto",
      effortDesc: "¿A dónde va realmente el tiempo?",
      effortDetail: "La preparación de datos es notoriamente la parte que más tiempo consume del ciclo de vida.",
      challengeTitle: "Desafío de Conocimiento",
      challengeDesc: "Pon a prueba tu comprensión de esta fase.",
      correct: "¡Correcto!",
      incorrect: "Incorrecto. Inténtalo de nuevo.",
      next: "Siguiente Fase",
      back: "Volver al Inicio",
      successTitle: "Midiendo el Éxito",
      successSubtitle: "Evaluación de Impacto",
      successDesc: "¿Cómo sabemos si una iniciativa de análisis de datos realmente funcionó? Medimos a través de tres dimensiones críticas.",
      technicalTitle: "Métricas Técnicas",
      technicalDesc: "Rendimiento del modelo y salud de los datos.",
      businessTitle: "KPIs de Negocio",
      businessDesc: "Valor financiero y estratégico directo.",
      operationalTitle: "Impacto Operativo",
      operationalDesc: "Eficiencia del proceso y adopción.",
      techItems: ["Precisión / Puntuación F1", "Latencia del Modelo", "Puntuación de Deriva de Datos"],
      bizItems: ["ROI / Ahorro de Costos", "Aumento de Conversión", "Reducción de Abandono"],
      opsItems: ["Tasa de Automatización", "Velocidad de Decisión", "Adopción de Usuarios"],
      frameworkTitle: "Marco Iterativo",
      frameworkSubtitle: "El Ciclo CRISP-DM",
      frameworkDesc: "Pasa el ratón sobre las fases para explorar el estándar de oro para la Minería de Datos.",
      realityTitle: "La Realidad 80/20",
      rule80: "La Regla del 80%",
      projectStart: "Inicio del Proyecto",
      deployment: "Despliegue",
      dataHub: "Centro de Datos",
      dataHubDesc: "El repositorio central donde los datos se almacenan, limpian y transforman a lo largo del ciclo de vida.",
      insightTitle: "Perspectiva de la Industria",
      effortLabel: "Esfuerzo",
      tasksLabel: "Tareas Operativas",
      effortQuestion: {
        part1: "¿A dónde va",
        part2: "realmente el tiempo?"
      },
      kddQuiz: {
        title: "Quiz KDD vs CRISP-DM",
        question: "Pregunta",
        of: "de",
        score: "Puntuación de Maestría del Marco",
        restart: "Reiniciar Quiz",
        questions: [
          {
            q: "¿Qué paso en KDD implica la reducción y proyección de datos?",
            options: ["Selección", "Transformación", "Minería de Datos", "Interpretación"],
            explanation: "La transformación es donde los datos se reducen o proyectan en formas adecuadas para la minería."
          },
          {
            q: "¿Cuál es la principal diferencia entre CRISP-DM y KDD?",
            options: ["KDD es más rápido", "CRISP-DM incluye Entendimiento del Negocio y Despliegue", "KDD usa mejores algoritmos", "No hay diferencia"],
            explanation: "CRISP-DM está orientado al negocio y cubre el ciclo de vida completo del proyecto, incluyendo el despliegue."
          },
          {
            q: "En KDD, la 'Minería de Datos' es solo un paso de todo el proceso. ¿Verdadero o Falso?",
            options: ["Verdadero", "Falso"],
            explanation: "¡Correcto! KDD trata la Minería de Datos como el paso específico de extracción de patrones dentro de un pipeline de descubrimiento de conocimiento más amplio."
          }
        ]
      },
      kddVsCrispTitle: "CRISP-DM vs KDD",
      kddVsCrispDesc: "Mientras que <strong className=\"text-white\">CRISP-DM</strong> es el estándar de la industria para proyectos de negocios, la academia a menudo hace referencia a <strong className=\"text-white\">KDD (Descubrimiento de Conocimiento en Bases de Datos)</strong>.",
      whatIsKdd: "¿Qué es KDD?",
      kddDesc: "KDD es un proceso de varios pasos centrado en la extracción técnica de conocimiento a partir de datos. Enfatiza el pipeline de transformación de datos.",
      kddSteps: ["Selección (Datos Objetivo)", "Pre-procesamiento (Limpieza)", "Transformación (Reducción)", "Minería de Datos (Búsqueda de Patrones)", "Interpretación (Evaluación)"],
      keyDifferences: "Diferencias Clave",
      bizFocusTitle: "Enfoque de Negocio",
      bizFocusDesc: "CRISP-DM comienza con el Entendimiento del Negocio. KDD comienza con la Selección de Datos.",
      endGoalTitle: "Objetivo Final",
      endGoalDesc: "CRISP-DM incluye explícitamente el Despliegue. KDD termina en la Interpretación/Evaluación.",
      iterativityTitle: "Iteratividad",
      iterativityDesc: "CRISP-DM es inherentemente cíclico. KDD a menudo se ve como un pipeline más lineal.",
      playgroundTitle: "Patio de Juegos Interactivo",
      playgroundSubtitle: "El Laboratorio de Análisis",
      playgroundDesc: "Pon a prueba tus conocimientos con simulaciones interactivas, juegos de ordenación y comprobaciones de conocimientos.",
      resources: {
        title: "Referencias y Recursos",
        subtitle: "Base de Conocimientos",
        desc: "Profundiza tu comprensión con estos recursos seleccionados sobre minería de datos, aprendizaje automático y MLOps.",
        lectures: "Lecciones Fundamentales",
        reading: "Lectura Recomendada",
        tools: "Herramientas y Marcos Externos",
        learningPathTitle: "Ruta de Aprendizaje Continuo",
        learningPathDesc: "El campo de la Ciencia de Datos está en constante evolución. Mantente actualizado siguiendo a investigadores clave, asistiendo a conferencias como NeurIPS o ICML, y contribuyendo a proyectos de código abierto.",
        curriculum: "Currículo v3.0",
        updated: "Actualizado: Marzo 2026"
      },
      quiz: {
        title: "Quiz de Maestría del Marco",
        question: "Pregunta",
        of: "de",
        score: "Puntuación de Maestría del Marco",
        restart: "Reiniciar Quiz",
        correct: "¡Correcto!",
        incorrect: "Incorrecto. Inténtalo de nuevo.",
        next: "Siguiente Pregunta",
        back: "Finalizar Quiz",
        verified: "¡Pipeline KDD Verificado!",
        sortingTitle: "Juego de Ordenación KDD",
        sortingDesc: "Ordena el pipeline KDD desde la Selección hasta la Interpretación.",
        phases: {
          selection: "Selección",
          preprocessing: "Pre-procesamiento",
          transformation: "Transformación",
          mining: "Minería de Datos",
          interpretation: "Interpretación"
        }
      }
    },
    stages: {
      business: {
        title: "Comprensión del Negocio",
        description: "Definición del problema, métricas de éxito y plan del proyecto.",
        tasks: ["Definir Objetivos", "Evaluar Situación", "Establecer Metas", "Plan del Proyecto"],
        insightText: "Un problema de negocio claro es el 50% de la solución.",
        insightSub: "La mayoría de los proyectos fallan no por las matemáticas, sino por resolver el problema equivocado.",
        challenge: {
          question: "En CRISP-DM, ¿cuál es el objetivo principal de esta fase inicial?",
          options: ["Escribir el código", "Comprender los requisitos del proyecto desde una perspectiva empresarial", "Limpiar los datos", "Desplegar el modelo"],
          explanation: "La comprensión del negocio consiste en traducir los objetivos empresariales en una definición de problema de minería de datos."
        }
      },
      data: {
        title: "Comprensión de los Datos",
        description: "Recolección inicial de datos, exploración y verificación de calidad.",
        tasks: ["Recolección Inicial", "Descripción de Datos", "Exploración de Datos", "Control de Calidad"],
        insightText: "Los datos son el nuevo petróleo, pero a menudo están sin refinar y llenos de impurezas.",
        insightSub: "El Análisis Exploratorio de Datos (EDA) es donde encuentras el 'por qué' detrás del 'qué'.",
        challenge: {
          question: "¿Qué sucede si se descubre que la calidad de los datos es deficiente en esta etapa?",
          options: ["Ignorarlo", "Volver a la Comprensión del Negocio para redefinir el alcance", "Entrenar de todos modos", "Eliminar los datos"],
          explanation: "CRISP-DM es iterativo; la mala calidad de los datos a menudo requiere revisar los objetivos comerciales o las fuentes de datos."
        }
      },
      prep: {
        title: "Preparación de Datos",
        description: "Selección, limpieza, construcción e integración de datos.",
        tasks: ["Selección de Datos", "Limpieza de Datos", "Ingeniería de Características", "Integración"],
        insightText: "La preparación de datos no es un obstáculo para el trabajo; ES el trabajo.",
        insightSub: "La ingeniería de características es el ingrediente secreto que separa los modelos buenos de los excelentes.",
        challenge: {
          question: "¿Qué tarea consume aproximadamente el 80% del tiempo de un científico de datos?",
          options: ["Modelado", "Preparación de Datos", "Despliegue", "Evaluación"],
          explanation: "La preparación de datos es notoriamente la parte que más tiempo consume del ciclo de vida."
        }
      },
      modeling: {
        title: "Modelado",
        description: "Selección de técnicas, generación de diseños de prueba y construcción de modelos.",
        tasks: ["Seleccionar Técnica", "Diseño de Pruebas", "Construir Modelo", "Evaluar Modelo"],
        insightText: "Todos los modelos están mal, pero algunos son útiles.",
        insightSub: "La complejidad es el enemigo de la fiabilidad; empieza simple e itera.",
        challenge: {
          question: "¿Por qué podrías volver a la Preparación de Datos desde el Modelado?",
          options: ["Para tomar más café", "Para crear mejores características basadas en el rendimiento del modelo", "Para cambiar el objetivo comercial", "Para desplegar el modelo"],
          explanation: "El modelado a menudo revela que los datos necesitan una mayor transformación o características diferentes."
        }
      },
      evaluation: {
        title: "Evaluación",
        description: "Evaluación de resultados frente a los objetivos comerciales y revisión del proceso.",
        tasks: ["Evaluar Resultados", "Revisar Proceso", "Determinar Siguientes Pasos"],
        insightText: "No confundas una alta precisión con valor de negocio.",
        insightSub: "Un modelo que no se alinea con los KPIs del negocio es solo un proyecto de investigación.",
        challenge: {
          question: "¿Cuál es la pregunta clave al final de la fase de Evaluación?",
          options: ["¿El código está limpio?", "¿El modelo cumple con los objetivos comerciales?", "¿Qué tan rápido es el servidor?", "¿Podemos usar un lenguaje diferente?"],
          explanation: "La evaluación determina si el modelo está listo para el despliegue basándose en los objetivos comerciales originales."
        }
      },
      deployment: {
        title: "Despliegue",
        description: "Planificar el despliegue, monitoreo, mantenimiento e informe final. Aquí es donde el modelo se encuentra con el mundo real.",
        tasks: ["Planificar Despliegue", "Monitoreo y Deriva", "Mantenimiento", "Informe Final"],
        insightText: "El despliegue es el comienzo, no el final.",
        insightSub: "MLOps se trata de asegurar que el modelo continúe aportando valor en un mundo cambiante.",
        challenge: {
          question: "¿Qué es la 'Deriva del Modelo' (Model Drift) en el contexto del Despliegue?",
          options: ["El modelo se vuelve más rápido", "El rendimiento del modelo se degrada con el tiempo debido a cambios en los datos", "El modelo se mueve a un servidor diferente", "El modelo se vuelve más preciso"],
          explanation: "La deriva del modelo ocurre cuando las propiedades estadísticas de la variable objetivo, que el modelo intenta predecir, cambian con el tiempo de formas imprevistas."
        }
      }
    },
    blueprints: {
      title: "Planos Estratégicos",
      subtitle: "Arquitecturas de ML Estándar de la Industria",
      description: "Explora marcos técnicos probados para desafíos comerciales comunes.",
      viewTechnical: "Ver Plano Técnico",
      modalTitle: "Plano Técnico",
      modalAlgorithms: "Algoritmos Principales",
      modalData: "Fuentes de Datos",
      modalKPIs: "KPIs y Métricas",
      modalStack: "Pila Tecnológica",
      modalClose: "Cerrar Plano",
      selectScenario: "Seleccionar Escenario",
      business: "Comprensión del Negocio",
      data: "Datos y Preparación",
      modeling: "Modelado y Evaluación",
      deployment: "Estrategia de Despliegue",
      readyToImplement: "¿Listo para Implementar?",
      accessTechnical: "Accede al plano técnico para ver la arquitectura recomendada, los algoritmos y los KPIs para este escenario.",
      seeBlueprint: "Ver Plano Técnico"
    },
    iceberg: {
      title: "El Iceberg del Sistema de ML",
      subtitle: "Complejidad Oculta",
      description: "Inspirado en el artículo de Google \"Deuda Técnica Oculta en Sistemas de Machine Learning\". El código de ML real es solo una pequeña fracción del sistema general.",
      config: "Configuración",
      dataCollection: "Recolección de Datos",
      featureExtraction: "Extracción de Características",
      dataVerification: "Verificación de Datos",
      mlCode: "Código ML",
      analysisTools: "Herramientas de Análisis",
      processMgmt: "Gestión de Procesos",
      servingInfra: "Infraestructura de Servicio",
      monitoring: "Monitoreo",
      resourceMgmt: "Gestión de Recursos",
      debtTitle: "Deuda Técnica",
      debtDesc: "Los sistemas de ML tienen todos los desafíos de mantenimiento del código tradicional, además de un conjunto adicional de problemas específicos de ML.",
      icebergTitle: {
        part1: "El",
        part2: "Iceberg del Sistema",
        part3: "de ML"
      },
      infraTitle: "Costo de Infraestructura",
      infraDesc: "El costo de construir y mantener la infraestructura circundante a menudo eclipsa el costo del modelo de ML real.",
      rigorTitle: "Rigor Operativo",
      rigorDesc: "El éxito requiere tuberías de datos robustas, monitoreo y pruebas automatizadas, no solo un modelo de alta precisión."
    },
    continuousLearning: {
      title: "Aprendizaje Continuo y MLOps",
      subtitle: "El Bucle Infinito",
      description: "La Ciencia de Datos no termina en el despliegue. Es un ciclo vivo donde el monitoreo retroalimenta la comprensión del negocio para asegurar que el modelo siga siendo relevante.",
      driftTitle: "El \"Asesino Silencioso\": Deriva de Datos",
      driftDesc: "Imagina un modelo de detección de fraude entrenado con datos de 2020. En 2024, los patrones de gasto han cambiado por completo. Sin un bucle de retroalimentación, el modelo comenzará a fallar en el fraude o a bloquear a usuarios legítimos. Por eso monitoreamos, evaluamos y reentrenamos.",
      monitoringTitle: "Simulación de Monitoreo en Vivo",
      stable: "MODELO ESTABLE",
      critical: "DERIVA CRÍTICA",
      retraining: "REENTRENANDO...",
      accuracy: "Precisión del Modelo",
      drift: "Deriva de Datos",
      trigger: "Activar Reentrenamiento Manual",
      active: "Pipeline de Reentrenamiento Activo",
      concepts: [
        {
          title: "Deriva del Modelo",
          desc: "La degradación del rendimiento del modelo con el tiempo a medida que los datos del mundo real evolucionan alejándose de los datos de entrenamiento."
        },
        {
          title: "Monitoreo Continuo",
          desc: "Seguimiento de la precisión, latencia y calidad de los datos en tiempo real para detectar anomalías temprano."
        },
        {
          title: "Bucles de Reentrenamiento",
          desc: "Pipelines automatizados que activan actualizaciones del modelo cuando el rendimiento cae por debajo de un umbral."
        },
        {
          title: "Humano en el bucle",
          desc: "Revisión experta de casos límite para mejorar la lógica del modelo y asegurar la alineación ética."
        }
      ]
    },
    useCases: {
      segmentation: {
        title: "Segmentación de Clientes",
        description: "Uso de clustering para identificar grupos de clientes de alto valor para bancos.",
        technical: {
          algorithms: ["K-Means", "DBSCAN", "PCA"],
          dataSources: ["Historial de Transacciones", "Demografía", "Registros Web"],
          metrics: ["Puntaje de Silueta", "CLV", "Tasa de Abandono"],
          stack: ["Scikit-Learn", "Pandas", "PostgreSQL"]
        },
        stages: {
          business: "Identificar distintos grupos de clientes para personalizar el marketing y mejorar la retención.",
          data: "Recopilar historial de transacciones, demografía y datos de uso de canales digitales.",
          prep: "Calcular métricas RFM (Recencia, Frecuencia, Monetario) y normalizar características.",
          modeling: "Aplicar K-Means o DBSCAN para encontrar agrupaciones naturales en la base de clientes.",
          evaluation: "Perfil de clusters con equipos de marketing para asegurar que los segmentos sean accionables.",
          deployment: "Integrar segmentos en el CRM para campañas de correo electrónico personalizadas y automatizadas."
        }
      },
      "credit-risk": {
        title: "Calificación de Riesgo Crediticio",
        description: "Predicción de la probabilidad de incumplimiento para solicitantes de préstamos.",
        technical: {
          algorithms: ["XGBoost", "Regresión Logística", "Random Forest"],
          dataSources: ["Historial de Préstamos", "Buró de Crédito", "Empleo"],
          metrics: ["Precisión-Recall", "F1-Score", "ROC-AUC"],
          stack: ["XGBoost", "Scikit-Learn", "FastAPI"]
        },
        stages: {
          business: "Minimizar la pérdida financiera por incumplimientos manteniendo altas tasas de aprobación.",
          data: "Datos históricos de préstamos, puntajes de buró de crédito, ingresos e historial de empleo.",
          prep: "Manejar valores faltantes, codificar variables categóricas y abordar el desequilibrio de clases.",
          modeling: "Entrenar modelos XGBoost o Regresión Logística para predecir la probabilidad de incumplimiento.",
          evaluation: "Analizar curvas de Precisión-Recall y realizar pruebas de estrés financiero.",
          deployment: "Desplegar como una API en tiempo real integrada en el portal de solicitud de préstamos."
        }
      },
      churn: {
        title: "Predicción de Abandono",
        description: "Identificación de clientes en riesgo antes de que dejen el servicio.",
        technical: {
          algorithms: ["Random Forest", "Análisis de Supervivencia", "LGBM"],
          dataSources: ["Registros de Suscripción", "Tickets de Soporte", "Uso de App"],
          metrics: ["Tasa de Abandono", "Recall", "Precisión"],
          stack: ["LightGBM", "Pandas", "BigQuery"]
        },
        stages: {
          business: "Reducir la tasa de deserción ofreciendo incentivos proactivos a los usuarios en riesgo.",
          data: "Registros de suscripción, historial de tickets de soporte y métricas de compromiso con la aplicación.",
          prep: "Crear características de series temporales como 'cambio en el uso en los últimos 30 días'.",
          modeling: "Usar Random Forest o Análisis de Supervivencia para estimar puntajes de riesgo de abandono.",
          evaluation: "Validar con un conjunto de datos de reserva y calcular el ROI de las ofertas de retención.",
          deployment: "Puntuación por lotes diaria que alerta a los gerentes de cuenta sobre clientes de alto riesgo."
        }
      },
      "rag-bot": {
        title: "Bot de Soporte IA (RAG)",
        description: "Un chatbot impulsado por LLMs y Generación Aumentada por Recuperación.",
        technical: {
          algorithms: ["RAG", "Búsqueda Vectorial", "Ingeniería de Prompts"],
          dataSources: ["Base de Conocimientos", "Manuales", "Registros de Chat"],
          metrics: ["Tasa de Alucinación", "Relevancia", "Latencia"],
          stack: ["LangChain", "Pinecone", "OpenAI"]
        },
        stages: {
          business: "Automatizar el 70% de las consultas de soporte con alta precisión usando documentos internos.",
          data: "Base de conocimientos, manuales de productos y transcripciones de chat históricas.",
          prep: "Fragmentar documentos, generar embeddings e indexar en una base de datos vectorial.",
          modeling: "Configurar plantillas de prompts de LLM y ajustar los parámetros de recuperación (Top-K).",
          evaluation: "Probar alucinaciones y relevancia usando RAGAS o revisión humana.",
          deployment: "Desplegar como una interfaz de chat de transmisión con barreras de seguridad."
        }
      }
    },
    lab: {
      title: "El Laboratorio de ML",
      subtitle: "Sandbox Experimental",
      description: "Simula el entrenamiento del modelo y evalúa las métricas de rendimiento en tiempo real.",
      train: "Entrenar Modelo",
      training: "Entrenando...",
      reset: "Reiniciar Lab",
      metrics: "Métricas de Rendimiento",
      accuracy: "Precisión (Accuracy)",
      precision: "Precisión (Precision)",
      recall: "Exhaustividad (Recall)",
      f1: "Puntuación F1",
      logs: "Registros de Entrenamiento",
      maturityLab: {
        title: "Laboratorio de Madurez",
        subtitle: "Desafío de Escenarios",
        correct: "¡Análisis Correcto!",
        incorrect: "Interpretación Incorrecta",
        next: "Siguiente Escenario",
        scenarios: [
          {
            text: "Una cadena minorista quiere ajustar automáticamente los precios en tiempo real basándose en los niveles de stock de la competencia y los pronósticos meteorológicos para maximizar el margen.",
            explanation: "Esto es prescriptivo porque se trata de '¿Cómo podemos hacer que suceda?' a través de la optimización automatizada."
          },
          {
            text: "Un banco necesita identificar qué clientes específicos tienen probabilidades de abandonar en los próximos 30 días basándose en sus patrones recientes de uso de la aplicación.",
            explanation: "Esto es predictivo porque pregunta '¿Qué sucederá?' basándose en patrones históricos."
          },
          {
            text: "Un hospital está revisando las tasas de admisión de pacientes del año pasado para comprender los picos estacionales.",
            explanation: "Esto es descriptivo porque está resumiendo '¿Qué sucedió?' en el pasado."
          },
          {
            text: "Un sitio de comercio electrónico está analizando por qué el abandono del carrito aumentó un 20% después de la última actualización de la interfaz de usuario.",
            explanation: "Esto es diagnóstico porque está investigando '¿Por qué sucedió?'"
          }
        ]
      },
      successMetricMatcher: {
        title: "Emparejador de Métricas de Éxito",
        prompt: "Asigna la métrica a la categoría correcta",
        score: "Puntuación",
        perfect: "¡Perfecto! Entiendes cómo medir el impacto.",
        keepGoing: "¡Sigue así! Empareja todas las métricas.",
        correct: "¡Correcto!",
        incorrect: "Categoría Incorrecta",
        gameOver: "Juego Terminado",
        tryAgain: "Intentar de Nuevo",
        categories: {
          technical: "Rendimiento Técnico",
          business: "KPIs de Negocio",
          operational: "Impacto Operativo",
          statistical: "Precisión Estadística"
        },
        challenges: [
          {
            metric: "Incremento de Conversión",
            category: "KPIs de Negocio",
            explanation: "El incremento de conversión mide directamente el valor de negocio generado por las predicciones del modelo."
          },
          {
            metric: "Latencia del Modelo",
            category: "Rendimiento Técnico",
            explanation: "La latencia mide qué tan rápido el modelo produce una predicción, crítico para sistemas en tiempo real."
          },
          {
            metric: "F1-Score",
            category: "Precisión Estadística",
            explanation: "El F1-score equilibra la precisión y la exhaustividad, proporcionando una medida robusta de la calidad del modelo."
          }
        ]
      },
      phaseSorting: {
        title: "Juego: Ordena el Ciclo de Vida",
        description: "Arrastra las fases a la secuencia correcta de CRISP-DM.",
        verified: "¡Secuencia Optimizada! 100% de Alineación."
      },
      taskMatcher: {
        title: "Juego: Emparejador de Tareas",
        prompt: "Asigna la tarea a la fase correcta de CRISP-DM",
        gameOver: "¡Juego Terminado! Has dominado el ciclo de vida.",
        accuracy: "Precisión de Asignación de Tareas",
        tryAgain: "Intentar de Nuevo",
        tasks: [
          { task: 'Ingeniería de Características', phase: 'Preparación de Datos' },
          { task: 'Métricas de Éxito', phase: 'Comprensión del Negocio' },
          { task: 'Limpieza de Datos', phase: 'Preparación de Datos' },
          { task: 'Evaluación del Modelo', phase: 'Modelado' },
          { task: 'Monitoreo de Deriva', phase: 'Despliegue' },
          { task: 'Análisis Exploratorio de Datos', phase: 'Comprensión de Datos' },
          { task: 'Plan de Proyecto', phase: 'Comprensión del Negocio' },
          { task: 'Proceso de Revisión', phase: 'Evaluación' }
        ]
      },
      dataTypeClassifier: {
        title: "Clasificador de Tipos de Datos",
        prompt: "Clasifica estos datos:",
        correct: "¡Correcto!",
        incorrect: "Incorrecto",
        gameOver: "Juego Terminado",
        tryAgain: "Intentar de Nuevo",
        accuracy: "Precisión de Clasificación",
        itemsLabel: "Elementos Clasificados",
        structured: "Estructurado",
        unstructured: "No Estructurado",
        semiStructured: "Semi-estructurado",
        items: {
          sql: "Edad del Cliente (25, 34, 45...)",
          audio: "Audio del Centro de Llamadas",
          json: "Lecturas de Sensores (JSON)",
          images: "Reseñas de Productos (Texto)",
          csv: "Lista de Inventario (CSV)",
          notes: "Notas Manuscritas del Doctor",
          logs: "Registros de Acceso al Servidor",
          pdf: "Informes PDF Archivados"
        }
      }
    },
    knowledgeValidation: {
      title: "Validación de Conocimientos",
      correct: "Análisis Correcto",
      incorrect: "Interpretación Incorrecta"
    },
    resources: {
      title: "Referencias y Recursos",
      subtitle: "Base de Conocimientos",
      description: "Profundiza tu comprensión con conferencias curadas, documentación estándar de la industria y herramientas esenciales.",
      learningPath: "Camino de Aprendizaje Continuo",
      learningDesc: "El campo de la Ciencia de Datos está en constante evolución. Mantente actualizado siguiendo a investigadores clave, asistiendo a conferencias como NeurIPS o ICML, y contribuyendo a proyectos de código abierto.",
      updated: "Actualizado: Marzo 2026"
    }
  }
};

type StageId = 'business' | 'data' | 'prep' | 'modeling' | 'evaluation' | 'deployment';
type ViewMode = 'maturity' | 'framework' | 'blueprints' | 'lab' | 'resources';

interface MaturityStage {
  id: string;
  title: string;
  question: string;
  description: string;
  advantage: string;
  intelligence: number;
  mode: 'Reactive' | 'Proactive';
  industryExample: string;
  structuredFocus: string;
  unstructuredFocus: string;
}

const MATURITY_STAGES: MaturityStage[] = [
  { 
    id: 'descriptive', 
    title: 'Descriptive', 
    question: 'What happened?', 
    description: 'Standard reports and dashboards summarizing historical data to provide a clear view of the past.', 
    advantage: 'Low', 
    intelligence: 1,
    mode: 'Reactive',
    industryExample: 'Retail: Monthly sales report showing a 10% dip in Q3. Finance: Quarterly budget variance analysis. Logistics: Daily delivery completion rates.',
    structuredFocus: 'SQL Databases, ERP Systems, CRM Logs, Sales Transactions',
    unstructuredFocus: 'Archived PDF reports, basic server logs, legacy documentation'
  },
  { 
    id: 'diagnostic', 
    title: 'Diagnostic', 
    question: 'Why did it happen?', 
    description: 'Ad-hoc reports and query drill-downs to find root causes and hidden patterns in historical data.', 
    advantage: 'Medium-Low', 
    intelligence: 2,
    mode: 'Reactive',
    industryExample: 'Retail: Identifying that the sales dip was due to a supply chain delay in Asia. Healthcare: Analyzing patient readmission rates to find clinical gaps. Manufacturing: Root cause analysis of machine downtime.',
    structuredFocus: 'Cross-functional joins, OLAP cubes, data warehouses, correlation matrices',
    unstructuredFocus: 'Customer support tickets, social media mentions, call center transcripts'
  },
  { 
    id: 'forecasting', 
    title: 'Forecasting', 
    question: 'What will happen? (Trends)', 
    description: 'Extrapolating historical patterns to predict future trends without necessarily understanding causality.', 
    advantage: 'Medium', 
    intelligence: 3,
    mode: 'Proactive',
    industryExample: 'Retail: Seasonal demand forecasting for inventory planning. Energy: Predicting peak load based on historical weather patterns. Finance: Stock market trend analysis based on technical indicators.',
    structuredFocus: 'Time-series data, historical trend datasets, seasonal indices',
    unstructuredFocus: 'News sentiment trends, macro-economic report summaries'
  },
  { 
    id: 'predictive', 
    title: 'Predictive', 
    question: 'What will happen? (Causal)', 
    description: 'Predictive modeling that identifies the causal levers driving future outcomes.', 
    advantage: 'Medium-High', 
    intelligence: 4,
    mode: 'Proactive',
    industryExample: 'Marketing: Predicting individual customer churn based on specific behavioral triggers. Healthcare: Early diagnosis of diseases using biomarker patterns. Insurance: Fraud detection based on anomalous claim characteristics.',
    structuredFocus: 'Feature vectors, causal inference models, behavioral logs',
    unstructuredFocus: 'Sentiment analysis of reviews, image recognition for quality control, audio analysis'
  },
  { 
    id: 'prescriptive', 
    title: 'Prescriptive', 
    question: 'How can we make it happen?', 
    description: 'Optimization and decision automation to drive outcomes and recommend the best course of action.', 
    advantage: 'High', 
    intelligence: 5,
    mode: 'Proactive',
    industryExample: 'Aviation: Real-time dynamic pricing and crew scheduling. Supply Chain: Automated warehouse replenishment and route optimization. E-commerce: Personalized real-time product recommendations and discount targeting.',
    structuredFocus: 'Optimization parameters, constraint variables, real-time streaming data',
    unstructuredFocus: 'Real-time video feeds, sensor streams, live social media trends'
  }
];

interface Stage {
  id: StageId;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  tasks: string[];
  effort: number; // Percentage of total project time
  feedbackTo?: StageId;
  feedbackLabel?: string;
  challenge: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

interface UseCase {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  stages: Record<StageId, string>;
  technical: {
    algorithms: string[];
    dataSources: string[];
    metrics: string[];
    stack: string[];
  };
}

// --- Constants ---

const STAGES: Stage[] = [
  {
    id: 'business',
    title: 'Business Understanding',
    icon: Target,
    color: '#ff6b00', // Neon Orange
    description: 'Defining the problem, success metrics, and project plan.',
    tasks: ['Define Objectives', 'Assess Situation', 'Set Goals', 'Project Plan'],
    effort: 15,
    challenge: {
      question: 'In CRISP-DM, what is the primary goal of this initial phase?',
      options: ['Writing the code', 'Understanding project requirements from a business perspective', 'Cleaning the data', 'Deploying the model'],
      correctIndex: 1,
      explanation: 'Business Understanding is about translating business goals into a data mining problem definition.'
    }
  },
  {
    id: 'data',
    title: 'Data Understanding',
    icon: Database,
    color: '#00d1ff', // Neon Cyan
    description: 'Initial data collection, exploration, and quality verification.',
    tasks: ['Initial Collection', 'Data Description', 'Data Exploration', 'Quality Check'],
    effort: 20,
    feedbackTo: 'business',
    feedbackLabel: 'Refine Goals',
    challenge: {
      question: 'What happens if data quality is found to be poor in this stage?',
      options: ['Ignore it', 'Go back to Business Understanding to redefine scope', 'Just train anyway', 'Delete the data'],
      correctIndex: 1,
      explanation: 'CRISP-DM is iterative; poor data quality often requires revisiting business goals or data sources.'
    }
  },
  {
    id: 'prep',
    title: 'Data Preparation',
    icon: Search,
    color: '#a855f7', // Purple
    description: 'Selection, cleaning, construction, and integration of data.',
    tasks: ['Data Selection', 'Data Cleaning', 'Feature Engineering', 'Integration'],
    effort: 45,
    challenge: {
      question: 'Which task consumes roughly 80% of a data scientist\'s time?',
      options: ['Modeling', 'Data Preparation', 'Deployment', 'Evaluation'],
      correctIndex: 1,
      explanation: 'Data Preparation is notoriously the most time-consuming part of the lifecycle.'
    }
  },
  {
    id: 'modeling',
    title: 'Modeling',
    icon: Cpu,
    color: '#f43f5e', // Rose
    description: 'Selecting techniques, generating test designs, and building models.',
    tasks: ['Select Technique', 'Test Design', 'Build Model', 'Assess Model'],
    effort: 10,
    feedbackTo: 'prep',
    feedbackLabel: 'Better Features',
    challenge: {
      question: 'Why might you return to Data Preparation from Modeling?',
      options: ['To get more coffee', 'To create better features based on model performance', 'To change the business goal', 'To deploy the model'],
      correctIndex: 1,
      explanation: 'Modeling often reveals that the data needs further transformation or different features.'
    }
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    icon: CheckCircle2,
    color: '#10b981', // Emerald
    description: 'Evaluating results against business objectives and reviewing process.',
    tasks: ['Evaluate Results', 'Review Process', 'Determine Next Steps'],
    effort: 5,
    feedbackTo: 'business',
    feedbackLabel: 'Re-evaluate Scope',
    challenge: {
      question: 'What is the key question at the end of the Evaluation phase?',
      options: ['Is the code clean?', 'Does the model meet business objectives?', 'How fast is the server?', 'Can we use a different language?'],
      correctIndex: 1,
      explanation: 'Evaluation determines if the model is ready for deployment based on the original business goals.'
    }
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: Rocket,
    color: '#3b82f6', // Blue
    description: 'Plan deployment, monitoring, maintenance, and final report. This is where the model meets the real world.',
    tasks: ['Plan Deployment', 'Monitoring & Drift', 'Maintenance', 'Final Report'],
    effort: 5,
    feedbackTo: 'business',
    feedbackLabel: 'Continuous Learning',
    challenge: {
      question: 'What is "Model Drift" in the context of Deployment?',
      options: ['The model getting faster', 'The model\'s performance degrading over time due to changing data', 'The model moving to a different server', 'The model becoming more accurate'],
      correctIndex: 1,
      explanation: 'Model drift occurs when the statistical properties of the target variable, which the model is trying to predict, change over time in unforeseen ways.'
    }
  }
];

const USE_CASES: UseCase[] = [
  {
    id: 'segmentation',
    title: 'Customer Segmentation',
    icon: Users,
    description: 'Using clustering to identify high-value customer groups for banks.',
    stages: {
      business: 'Identify distinct customer groups to personalize marketing and improve retention.',
      data: 'Collect transaction history, demographics, and digital channel usage data.',
      prep: 'Calculate RFM (Recency, Frequency, Monetary) metrics and normalize features.',
      modeling: 'Apply K-Means or DBSCAN to find natural groupings in the customer base.',
      evaluation: 'Profile clusters with marketing teams to ensure segments are actionable.',
      deployment: 'Integrate segments into CRM for automated, personalized email campaigns.'
    },
    technical: {
      algorithms: ['K-Means', 'DBSCAN', 'Hierarchical Clustering'],
      dataSources: ['Core Banking DB', 'CRM Logs', 'Web Analytics'],
      metrics: ['Silhouette Score', 'Davies-Bouldin Index', 'Cluster Stability'],
      stack: ['Python', 'Scikit-Learn', 'Snowflake', 'Tableau']
    }
  },
  {
    id: 'credit-risk',
    title: 'Credit Risk Scoring',
    icon: ShieldAlert,
    description: 'Predicting the probability of default for loan applicants.',
    stages: {
      business: 'Minimize financial loss from defaults while maintaining high approval rates.',
      data: 'Historical loan data, credit bureau scores, income, and employment history.',
      prep: 'Handle missing values, encode categorical variables, and address class imbalance.',
      modeling: 'Train XGBoost or Logistic Regression models to predict default probability.',
      evaluation: 'Analyze Precision-Recall curves and perform financial stress testing.',
      deployment: 'Deploy as a real-time API integrated into the loan application portal.'
    },
    technical: {
      algorithms: ['XGBoost', 'LightGBM', 'Logistic Regression'],
      dataSources: ['Credit Bureau API', 'Internal Loan History', 'Income Verification'],
      metrics: ['AUC-ROC', 'Gini Coefficient', 'F1-Score'],
      stack: ['Python', 'PyTorch', 'AWS SageMaker', 'FastAPI']
    }
  },
  {
    id: 'churn',
    title: 'Churn Prediction',
    icon: TrendingDown,
    description: 'Identifying at-risk customers before they leave the service.',
    stages: {
      business: 'Reduce attrition rate by proactively offering incentives to at-risk users.',
      data: 'Subscription logs, support ticket history, and app engagement metrics.',
      prep: 'Create time-series features like "change in usage over last 30 days".',
      modeling: 'Use Random Forest or Survival Analysis to estimate churn risk scores.',
      evaluation: 'Validate with a hold-out set and calculate the ROI of retention offers.',
      deployment: 'Daily batch scoring that alerts account managers about high-risk clients.'
    },
    technical: {
      algorithms: ['Random Forest', 'Survival Analysis', 'LSTM (Time-series)'],
      dataSources: ['App Event Logs', 'Zendesk Tickets', 'Billing System'],
      metrics: ['Recall (Churners)', 'Lift Curve', 'Customer Lifetime Value (CLV)'],
      stack: ['Python', 'TensorFlow', 'Google Cloud Vertex AI', 'BigQuery']
    }
  },
  {
    id: 'rag-bot',
    title: 'AI Support Bot (RAG)',
    icon: MessageSquare,
    description: 'A chatbot powered by LLMs and Retrieval Augmented Generation.',
    stages: {
      business: 'Automate 70% of support queries with high accuracy using internal docs.',
      data: 'Knowledge base, product manuals, and historical chat transcripts.',
      prep: 'Chunk documents, generate embeddings, and index into a vector database.',
      modeling: 'Configure LLM prompt templates and tune the retrieval (Top-K) parameters.',
      evaluation: 'Test for hallucinations and relevance using RAGAS or human review.',
      deployment: 'Deploy as a streaming chat interface with safety guardrails.'
    },
    technical: {
      algorithms: ['Transformer (LLM)', 'Cosine Similarity', 'Semantic Search'],
      dataSources: ['Confluence', 'PDF Manuals', 'Slack History'],
      metrics: ['Faithfulness', 'Answer Relevance', 'Context Precision'],
      stack: ['LangChain', 'Pinecone', 'OpenAI API', 'Next.js']
    }
  }
];

// --- Components ---

const BlueprintModal = ({ isOpen, onClose, useCase, language }: { isOpen: boolean, onClose: () => void, useCase: UseCase, language: Language }) => {
  if (!isOpen) return null;

  const t = translations[language].blueprints;
  const caseT = translations[language].useCases[useCase.id as keyof typeof translations.en.useCases];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-zinc-950 border border-emerald-500/30 p-8 relative overflow-hidden rounded-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 -rotate-45 translate-x-16 -translate-y-16" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 text-black rounded-xl">
              <Terminal size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t.modalTitle}</h3>
              <p className="text-emerald-500 text-[10px] font-mono uppercase tracking-widest">
                {caseT.title}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={12} />
                {t.modalAlgorithms}
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseT.technical.algorithms.map(a => (
                  <span key={a} className="px-2 py-1 bg-zinc-900/50 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg">{a}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Database size={12} />
                {t.modalData}
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseT.technical.dataSources.map(d => (
                  <span key={d} className="px-2 py-1 bg-zinc-900/50 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg">{d}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Activity size={12} />
                {t.modalKPIs}
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseT.technical.metrics.map(m => (
                  <span key={m} className="px-2 py-1 bg-zinc-900/50 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Settings2 size={12} />
                {t.modalStack}
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseT.technical.stack.map(s => (
                  <span key={s} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 rounded-lg">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-emerald-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all rounded-xl"
          >
            {t.modalClose}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectEffortSection = ({ language }: { language: Language }) => {
  const t = translations[language].framework;

  return (
    <div className="py-20 px-8 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h3 className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-4">{t.realityTitle}</h3>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight mb-6 leading-none">
              {t.effortQuestion.part1} <br/><span className="text-emerald-500">{t.effortQuestion.part2}</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md">
              {t.effortDetail}
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/50 border border-zinc-800 flex items-start gap-4 rounded-2xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <AlertCircle size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase mb-1">{t.rule80}</p>
                  <p className="text-[11px] text-zinc-500">{t.effortDetail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="space-y-6">
              {STAGES.map((s) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                      {translations[language].stages[s.id as keyof typeof translations.en.stages].title}
                    </span>
                    <span className="text-xs font-bold text-white">{s.effort}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-900 w-full overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.effort}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 flex justify-between text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>{t.projectStart}</span>
                <span>{t.deployment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MLSystemArchitecture = ({ language }: { language: Language }) => {
  const t = translations[language].iceberg;

  return (
    <div className="py-20 px-8 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-4">{t.subtitle}</h3>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
            {t.icebergTitle.part1} <span className="text-emerald-500">{t.icebergTitle.part2}</span> {t.icebergTitle.part3}
          </h2>
          <p className="text-zinc-500 text-xs mt-4 max-w-xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-6 grid-rows-4 gap-2 h-[400px] font-mono text-[9px] uppercase tracking-tighter">
          {/* Configuration */}
          <div className="col-span-1 row-span-1 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.config}</div>
          
          {/* Data Collection */}
          <div className="col-span-2 row-span-1 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.dataCollection}</div>
          
          {/* Feature Extraction */}
          <div className="col-span-1 row-span-2 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.featureExtraction}</div>
          
          {/* Data Verification */}
          <div className="col-span-2 row-span-1 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.dataVerification}</div>

          {/* Machine Learning Code (The Small Box) */}
          <div className="col-span-1 row-span-1 bg-emerald-500 flex items-center justify-center text-black font-bold p-2 text-center shadow-[0_0_30px_rgba(16,185,129,0.3)] rounded-xl">{t.mlCode}</div>

          {/* Analysis Tools */}
          <div className="col-span-1 row-span-2 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.analysisTools}</div>

          {/* Process Management */}
          <div className="col-span-2 row-span-1 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.processMgmt}</div>

          {/* Serving Infrastructure */}
          <div className="col-span-2 row-span-2 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.servingInfra}</div>

          {/* Monitoring */}
          <div className="col-span-2 row-span-1 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.monitoring}</div>
          
          {/* Resource Management */}
          <div className="col-span-1 row-span-1 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 p-2 text-center rounded-xl">{t.resourceMgmt}</div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">{t.debtTitle}</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">{t.debtDesc}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">{t.infraTitle}</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">{t.infraDesc}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">{t.rigorTitle}</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">{t.rigorDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Header = ({ viewMode, setViewMode, language, setLanguage }: { 
  viewMode: ViewMode, 
  setViewMode: (m: ViewMode) => void,
  language: Language,
  setLanguage: (l: Language) => void
}) => {
  const t = translations[language].header;
  
  return (
    <header className="py-6 px-8 border-b border-zinc-800 flex flex-col md:flex-row items-center justify-between bg-zinc-950 gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center rounded-xl">
          <Layers className="text-black" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-2">
            {t.title} <span className="text-emerald-500">{t.playground}</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-all rounded-md ${language === 'en' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('es')}
            className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-all rounded-md ${language === 'es' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            ES
          </button>
        </div>

        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 overflow-x-auto max-w-full">
          <button 
            onClick={() => setViewMode('maturity')}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 rounded-lg whitespace-nowrap ${viewMode === 'maturity' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
          >
            <Activity size={12} />
            {t.maturity}
          </button>
          <button 
            onClick={() => setViewMode('framework')}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 rounded-lg whitespace-nowrap ${viewMode === 'framework' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
          >
            <RotateCcw size={12} />
            {t.framework}
          </button>
          <button 
            onClick={() => setViewMode('blueprints')}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 rounded-lg whitespace-nowrap ${viewMode === 'blueprints' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
          >
            <Terminal size={12} />
            {t.blueprints}
          </button>
          <button 
            onClick={() => setViewMode('lab')}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 rounded-lg whitespace-nowrap ${viewMode === 'lab' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
          >
            <FlaskConical size={12} />
            {t.lab}
          </button>
          <button 
            onClick={() => setViewMode('resources')}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 rounded-lg whitespace-nowrap ${viewMode === 'resources' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
          >
            <BookOpen size={12} />
            {t.resources}
          </button>
        </div>
      </div>
    </header>
  );
};

const CircularVisualizer = ({ activeIndex, onSelect, onHover, language }: { activeIndex: number, onSelect: (id: StageId) => void, onHover: (id: StageId | null) => void, language: Language }) => {
  const [isHubHovered, setIsHubHovered] = useState(false);
  const radius = 140;
  const outerRadius = 185;
  const centerX = 200;
  const centerY = 200;

  const getPos = (idx: number, r: number = radius) => {
    const angle = (idx / STAGES.length) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      angle
    };
  };

  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      <svg className="w-full h-full overflow-visible relative z-10">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Central Data Icon */}
        <g 
          transform={`translate(${centerX - 30}, ${centerY - 40})`}
          className="cursor-help"
          onMouseEnter={() => setIsHubHovered(true)}
          onMouseLeave={() => setIsHubHovered(false)}
        >
          <foreignObject width="60" height="60">
            <motion.div
              animate={isHubHovered ? { 
                scale: [1, 1.15, 1], 
                opacity: [0.6, 1, 0.6],
                filter: ['drop-shadow(0 0 0px rgba(16,185,129,0))', 'drop-shadow(0 0 15px rgba(16,185,129,0.5))', 'drop-shadow(0 0 0px rgba(16,185,129,0))']
              } : { 
                scale: [1, 1.05, 1], 
                opacity: [0.4, 0.6, 0.4],
                filter: ['drop-shadow(0 0 0px rgba(255,255,255,0))', 'drop-shadow(0 0 10px rgba(255,255,255,0.3))', 'drop-shadow(0 0 0px rgba(255,255,255,0))']
              }}
              transition={{ duration: isHubHovered ? 2 : 4, repeat: Infinity }}
              className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${isHubHovered ? 'text-emerald-400' : 'text-white/80'}`}
            >
              <Database size={48} strokeWidth={1.5} />
            </motion.div>
          </foreignObject>
          <text x="30" y="70" fill={isHubHovered ? "rgba(16,185,129,0.8)" : "rgba(255,255,255,0.4)"} fontSize="9" fontWeight="bold" textAnchor="middle" className="font-mono uppercase tracking-[0.3em] transition-colors duration-300">{translations[language].framework.dataHub}</text>
        </g>

        {/* Outer Animated Circle with Arrows */}
        <g>
          <motion.circle 
            cx={centerX} cy={centerY} r={outerRadius} 
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" 
            strokeDasharray="15 15"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
          {[0, 90, 180, 270].map(deg => {
            const a = (deg * Math.PI) / 180;
            const x = centerX + outerRadius * Math.cos(a);
            const y = centerY + outerRadius * Math.sin(a);
            return (
              <path 
                key={deg}
                d={`M ${x} ${y} L ${x + 1 * Math.cos(a + 0.1)} ${y + 1 * Math.sin(a + 0.1)}`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="4"
                transform={`rotate(${deg + 90}, ${x}, ${y})`}
              />
            );
          })}
        </g>

        {/* Forward Cycle Arrows */}
        {STAGES.map((_, i) => {
          if (i === STAGES.length - 1) return null;
          const start = getPos(i, radius + 5);
          const end = getPos(i + 1, radius + 5);
          const isActive = i === activeIndex || i + 1 === activeIndex;
          
          return (
            <path
              key={`forward-${i}`}
              d={`M ${start.x} ${start.y} A ${radius+5} ${radius+5} 0 0 1 ${end.x} ${end.y}`}
              fill="none"
              stroke={isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}
              strokeWidth="2"
              className="transition-all duration-500"
            />
          );
        })}

        {/* Internal Feedback Arrows */}
        {STAGES.map((s, i) => {
          if (!s.feedbackTo) return null;
          const targetIdx = STAGES.findIndex(ts => ts.id === s.feedbackTo);
          const start = getPos(i, radius - 15);
          const end = getPos(targetIdx, radius - 15);
          const isActive = i === activeIndex;
          
          // Subtle curve that doesn't cross the center too aggressively
          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Perpendicular vector for curvature
          const nx = -dy / dist;
          const ny = dx / dist;
          const curvature = 30;
          const cpX = midX + nx * curvature;
          const cpY = midY + ny * curvature;

          const d = `M ${start.x} ${start.y} Q ${cpX} ${cpY} ${end.x} ${end.y}`;

          return (
            <g key={`feedback-${s.id}`}>
              <path 
                d={d}
                fill="none"
                stroke={isActive ? s.color : "rgba(255,255,255,0.05)"}
                strokeWidth={isActive ? "2" : "1"}
                strokeDasharray={isActive ? "none" : "4 4"}
                className="transition-all duration-500"
                style={isActive ? { filter: 'url(#glow)' } : {}}
              />
              {isActive && (
                <motion.circle
                  r="3"
                  fill={s.color}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ 
                    offsetPath: `path('${d}')`,
                    boxShadow: `0 0 10px ${s.color}`
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Stage Bubbles */}
        {STAGES.map((s, i) => {
          const { x, y } = getPos(i);
          const isActive = i === activeIndex;
          const Icon = s.icon;

          return (
            <g 
              key={s.id} 
              className="cursor-pointer group" 
              onClick={() => onSelect(s.id)}
              onMouseEnter={() => onHover(s.id)}
              onMouseLeave={() => onHover(null)}
            >
              <circle cx={x} cy={y} r={35} fill="transparent" />
              <motion.circle
                cx={x} cy={y}
                r={isActive ? 30 : 24}
                fill={isActive ? s.color : "#09090b"}
                stroke={isActive ? "white" : "rgba(255,255,255,0.1)"}
                strokeWidth={isActive ? 3 : 1.5}
                animate={{ r: isActive ? 30 : 24 }}
                className="transition-all duration-300"
              />
              <foreignObject x={x - 12} y={y - 12} width="24" height="24" className="pointer-events-none">
                <div className={`flex items-center justify-center ${isActive ? 'text-black' : 'text-zinc-400'}`}>
                  <Icon size={18} />
                </div>
              </foreignObject>
              
              <text 
                x={x} 
                y={y + (isActive ? 42 : 36)} 
                textAnchor="middle" 
                fill={isActive ? "white" : "rgba(255,255,255,0.4)"}
                fontSize="8"
                className={`font-mono uppercase tracking-tighter transition-all ${isActive ? 'font-bold' : ''}`}
              >
                {translations[language].stages[s.id as keyof typeof translations.en.stages].title.split(' ').map((word, idx) => (
                  <tspan x={x} dy={idx === 0 ? 0 : 9} key={idx}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Data Hub Tooltip */}
      <AnimatePresence>
        {isHubHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 w-48 text-center"
          >
            <div className="bg-zinc-950/90 backdrop-blur-md border border-emerald-500/30 p-3 rounded-xl shadow-2xl">
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">{translations[language].framework.dataHub}</p>
              <p className="text-[10px] text-zinc-400 leading-tight italic">
                {translations[language].framework.dataHubDesc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: '50%', 
            left: '50%', 
            scale: 0,
            rotate: 0,
            opacity: 1 
          }}
          animate={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            scale: [0, 1.5, 0.5],
            rotate: Math.random() * 720,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: 2, 
            ease: "easeOut",
            delay: Math.random() * 0.1
          }}
          className="absolute w-1.5 h-1.5"
          style={{ 
            backgroundColor: ['#ff6b00', '#00d1ff', '#a855f7', '#f43f5e', '#10b981'][Math.floor(Math.random() * 5)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0%'
          }}
        />
      ))}
    </div>
  );
};

const Challenge = ({ stage, language }: { stage: Stage, language: Language }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  React.useEffect(() => { 
    setSelected(null); 
    setShow(false); 
    setIsCorrect(false);
  }, [stage.id]);

  const handleSelect = (i: number) => {
    if (show) return;
    setSelected(i);
    setShow(true);
    if (i === stage.challenge.correctIndex) {
      setIsCorrect(true);
    }
  };

  return (
    <div className="mt-8 border-t border-zinc-800 pt-8 relative">
      <AnimatePresence>
        {isCorrect && <Confetti />}
      </AnimatePresence>
      
      <div className="flex items-center gap-2 mb-6 text-emerald-500 font-mono text-[10px] uppercase tracking-widest">
        <Zap size={14} className={isCorrect ? 'animate-bounce' : ''} />
        {translations[language].knowledgeValidation.title}
      </div>
      <p className="text-white text-sm mb-6 leading-relaxed">{stage.challenge.question}</p>
      <div className="space-y-2">
        {stage.challenge.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full text-left p-4 text-xs font-mono border rounded-xl transition-all relative overflow-hidden ${
              show 
                ? i === stage.challenge.correctIndex 
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                  : i === selected ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-transparent border-zinc-800 opacity-40'
                : 'bg-zinc-900/50 border-zinc-800 hover:border-emerald-500 text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{String.fromCharCode(65 + i)}. {opt}</span>
              {show && i === stage.challenge.correctIndex && <CheckCircle2 size={14} />}
              {show && i === selected && i !== stage.challenge.correctIndex && <AlertCircle size={14} />}
            </div>
          </button>
        ))}
      </div>
      {show && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={`mt-4 p-4 bg-zinc-950 border-l-2 rounded-r-xl ${isCorrect ? 'border-emerald-500' : 'border-rose-500'} text-[11px] leading-relaxed text-zinc-400 italic`}
        >
          <div className="font-bold uppercase text-[9px] mb-1 tracking-widest">
            {isCorrect ? translations[language].knowledgeValidation.correct : translations[language].knowledgeValidation.incorrect}
          </div>
          {stage.challenge.explanation}
        </motion.div>
      )}
    </div>
  );
};

const DriftDetector = ({ language }: { language: Language }) => {
  const t = translations[language].continuousLearning;
  const [driftLevel, setDriftLevel] = useState(0);
  const [isRetraining, setIsRetraining] = useState(false);
  const [accuracy, setAccuracy] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRetraining) {
        setDriftLevel(prev => Math.min(prev + Math.random() * 5, 100));
        setAccuracy(prev => Math.max(prev - Math.random() * 0.5, 70));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRetraining]);

  const handleRetrain = () => {
    setIsRetraining(true);
    setTimeout(() => {
      setDriftLevel(0);
      setAccuracy(98);
      setIsRetraining(false);
    }, 2000);
  };

  const getStatusColor = () => {
    if (driftLevel < 30) return 'text-emerald-500';
    if (driftLevel < 70) return 'text-emerald-500'; // Keep it consistent or use amber
    return 'text-rose-500';
  };

  return (
    <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl mt-8">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          {t.monitoringTitle}
        </h4>
        <div className={`text-xs font-bold font-mono ${getStatusColor()}`}>
          {isRetraining ? t.retraining : driftLevel > 70 ? t.critical : t.stable}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex justify-between text-[10px] uppercase mb-2">
            <span className="text-zinc-500">{t.accuracy}</span>
            <span className={getStatusColor()}>{accuracy.toFixed(1)}%</span>
          </div>
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${accuracy > 85 ? 'bg-emerald-500' : 'bg-rose-500'}`}
              animate={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] uppercase mb-2">
            <span className="text-zinc-500">{t.drift}</span>
            <span className={getStatusColor()}>{driftLevel.toFixed(0)}%</span>
          </div>
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${getStatusColor().replace('text-', 'bg-')}`}
              animate={{ width: `${driftLevel}%` }}
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleRetrain}
        disabled={isRetraining || driftLevel < 20}
        className={`w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all ${
          isRetraining ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' :
          driftLevel > 50 ? 'bg-emerald-500 text-black hover:bg-emerald-400' :
          'bg-zinc-900/50 text-zinc-500 border border-zinc-800'
        }`}
      >
        {isRetraining ? t.active : t.trigger}
      </button>
    </div>
  );
};

const ContinuousLearningSection = ({ language }: { language: Language }) => {
  const t = translations[language].continuousLearning;
  const concepts = [
    {
      title: t.concepts[0].title,
      icon: TrendingDown,
      desc: t.concepts[0].desc,
      color: "text-rose-500"
    },
    {
      title: t.concepts[1].title,
      icon: Activity,
      desc: t.concepts[1].desc,
      color: "text-emerald-500"
    },
    {
      title: t.concepts[2].title,
      icon: RotateCcw,
      desc: t.concepts[2].desc,
      color: "text-emerald-500"
    },
    {
      title: t.concepts[3].title,
      icon: Users,
      desc: t.concepts[3].desc,
      color: "text-emerald-500"
    }
  ];

  return (
    <div className="p-10 bg-zinc-950 border-y border-zinc-800 mt-12">
      <div className="mb-10">
        <h3 className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-2">{t.subtitle}</h3>
        <p className="text-3xl font-bold text-white tracking-tight uppercase">{t.title}</p>
        <p className="text-zinc-500 text-sm mt-4 max-w-2xl leading-relaxed">
          {t.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {concepts.map((c, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl group hover:border-emerald-500/30 transition-all"
          >
            <c.icon className={`${c.color} mb-4 group-hover:scale-110 transition-transform`} size={24} />
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">{c.title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <RotateCcw size={120} className="animate-spin-slow" />
        </div>
        <div className="relative z-10">
          <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldAlert size={14} />
            {t.driftTitle}
          </h4>
          <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
            {t.driftDesc}
          </p>
        </div>
      </div>

      <DriftDetector language={language} />
    </div>
  );
};

const KDDQuiz = ({ language }: { language: Language }) => {
  const t = translations[language];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = t.framework.kddQuiz.questions;

  const handleAnswer = (idx: number) => {
    // The correct indices are 1, 1, 0 based on the original code
    const correctIndices = [1, 1, 0];
    if (idx === correctIndices[current]) setScore(s => s + 1);
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-2xl">
      <h3 className="text-emerald-500 font-bold text-sm mb-6 uppercase tracking-wider flex items-center gap-2">
        <Zap size={14} />
        {t.framework.kddQuiz.title}
      </h3>
      
      {!showResult ? (
        <div className="space-y-6">
          <p className="text-white text-sm leading-relaxed">{questions[current].q}</p>
          <div className="grid gap-2">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left p-4 text-xs font-mono border border-zinc-800 bg-zinc-900/50 rounded-xl hover:border-emerald-500 hover:bg-zinc-900 transition-all text-zinc-400"
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
            {t.framework.kddQuiz.question} {current + 1} {t.framework.kddQuiz.of} {questions.length}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="text-3xl font-bold text-white mb-2">{score} / {questions.length}</div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-6">{t.framework.kddQuiz.score}</p>
          <button 
            onClick={() => {setCurrent(0); setScore(0); setShowResult(false);}}
            className="px-6 py-2 bg-emerald-500 text-black font-bold text-[10px] uppercase tracking-widest rounded-lg"
          >
            {t.framework.kddQuiz.restart}
          </button>
        </div>
      )}
    </div>
  );
};

const KDD_PHASES = [
  { id: 'selection', title: 'Selection', color: '#3b82f6' },
  { id: 'preprocessing', title: 'Pre-processing', color: '#10b981' },
  { id: 'transformation', title: 'Transformation', color: '#a855f7' },
  { id: 'mining', title: 'Data Mining', color: '#f43f5e' },
  { id: 'interpretation', title: 'Interpretation', color: '#eab308' }
];

const KDDSortingGame = ({ language }: { language: Language }) => {
  const t = translations[language];
  const [items, setItems] = useState([...KDD_PHASES].sort(() => Math.random() - 0.5));
  const [isCorrect, setIsCorrect] = useState(false);

  const checkOrder = (newItems: typeof KDD_PHASES) => {
    setItems(newItems);
    const correctOrder = KDD_PHASES.map(s => s.id);
    const currentOrder = newItems.map(s => s.id);
    if (JSON.stringify(correctOrder) === JSON.stringify(currentOrder)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl h-full">
      <h3 className="text-emerald-500 font-bold text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
        <Activity size={14} />
        {t.framework.quiz.sortingTitle}
      </h3>
      <p className="text-xs text-zinc-500 mb-6">{t.framework.quiz.sortingDesc}</p>
      
      <Reorder.Group axis="y" values={items} onReorder={checkOrder} className="space-y-2">
        {items.map((item) => (
          <Reorder.Item 
            key={item.id} 
            value={item}
            className={`p-3 bg-zinc-900/50 border rounded-xl cursor-grab active:cursor-grabbing transition-all flex items-center justify-between ${isCorrect ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-zinc-800 hover:border-emerald-500/50'}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                {(t.framework.quiz.phases as any)[item.id]}
              </span>
            </div>
            <div className="text-zinc-700 font-mono">:::</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {isCorrect && (
        <>
          <Confetti />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500 text-emerald-500 text-center font-bold text-xs uppercase tracking-[0.2em] rounded-xl"
          >
            {t.framework.quiz.verified}
          </motion.div>
        </>
      )}
    </div>
  );
};

const StrategyBlueprints = ({ language }: { language: Language }) => {
  const [selectedCaseId, setSelectedCaseId] = useState(USE_CASES[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedCase = useMemo(() => USE_CASES.find(c => c.id === selectedCaseId)!, [selectedCaseId]);

  return (
    <div className="flex-1 grid lg:grid-cols-[300px_1fr] gap-0">
      {/* Sidebar: Case Selection */}
      <div className="border-r border-white/5 bg-[#080808] p-6 flex flex-col gap-2">
        <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <BookOpen size={12} />
          {translations[language].blueprints.selectScenario}
        </h3>
        {USE_CASES.map((c) => {
          const Icon = c.icon;
          const caseT = translations[language].useCases[c.id as keyof typeof translations.en.useCases];
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`w-full text-left p-4 border transition-all flex items-center gap-4 ${selectedCaseId === c.id ? 'bg-orange-500 border-orange-500 text-black' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}
            >
              <Icon size={20} />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider">{caseT.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main: Case Details */}
      <div className="p-10 bg-[#0a0a0a] overflow-y-auto custom-scrollbar">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-white/5 border border-white/10">
              <selectedCase.icon size={32} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                {translations[language].useCases[selectedCase.id as keyof typeof translations.en.useCases].title}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {translations[language].useCases[selectedCase.id as keyof typeof translations.en.useCases].description}
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {STAGES.map((s) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                      <s.icon size={14} />
                    </div>
                    <div className="w-px h-full bg-white/5 min-h-[40px]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                      {translations[language].stages[s.id as keyof typeof translations.en.stages].title}
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {translations[language].useCases[selectedCase.id as keyof typeof translations.en.useCases].stages[s.id as keyof typeof translations.en.useCases.segmentation.stages]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-orange-500/5 border border-orange-500/20 rounded-none flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500 text-black">
                <ExternalLink size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{translations[language].blueprints.readyToImplement}</p>
                <p className="text-orange-500/70 text-xs">{translations[language].blueprints.accessTechnical}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 border border-orange-500 text-orange-500 text-[10px] font-mono uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all"
            >
              {translations[language].blueprints.seeBlueprint}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <BlueprintModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            useCase={selectedCase} 
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const PhaseSortingGame = ({ language }: { language: Language }) => {
  const t = translations[language].lab.phaseSorting;
  const [items, setItems] = useState([...STAGES].sort(() => Math.random() - 0.5));
  const [isCorrect, setIsCorrect] = useState(false);

  const checkOrder = (newItems: Stage[]) => {
    setItems(newItems);
    const correctOrder = STAGES.map(s => s.id);
    const currentOrder = newItems.map(s => s.id);
    if (JSON.stringify(correctOrder) === JSON.stringify(currentOrder)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-none h-full">
      <h3 className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
        <Zap size={14} />
        {t.title}
      </h3>
      <p className="text-xs text-slate-400 mb-6">{t.description}</p>
      
      <Reorder.Group axis="y" values={items} onReorder={checkOrder} className="space-y-2">
        {items.map((item) => (
          <Reorder.Item 
            key={item.id} 
            value={item}
            className={`p-3 bg-black/40 border cursor-grab active:cursor-grabbing transition-all flex items-center justify-between ${isCorrect ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/10 hover:border-orange-500/50'}`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={14} style={{ color: isCorrect ? '#10b981' : item.color }} />
              <span className="text-[10px] font-mono uppercase tracking-widest">{translations[language].stages[item.id as keyof typeof translations.en.stages].title}</span>
            </div>
            <div className="text-slate-700 font-mono">:::</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {isCorrect && (
        <>
          <Confetti />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-center font-bold text-xs uppercase tracking-[0.2em]"
          >
            {t.verified}
          </motion.div>
        </>
      )}
    </div>
  );
};

const TaskMatcherGame = ({ language }: { language: Language }) => {
  const t = translations[language].lab.taskMatcher;
  const allTasks = useMemo(() => [...t.tasks].sort(() => Math.random() - 0.5), [t.tasks]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleAnswer = (phaseTitle: string) => {
    if (feedback) return;
    if (phaseTitle === allTasks[currentIdx].phase) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    
    setTimeout(() => {
      setFeedback(null);
      setCurrentIdx(c => c + 1);
    }, 1000);
  };

  if (currentIdx >= allTasks.length) {
    return (
      <div className="p-6 bg-white/5 border border-white/10 text-center h-full flex flex-col justify-center relative overflow-hidden">
         {score === allTasks.length && <Confetti />}
         <h3 className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wider">{t.gameOver}</h3>
         <p className="text-3xl font-bold text-white mb-2">{score} / {allTasks.length}</p>
         <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-6">{t.accuracy}</p>
         <button 
           onClick={() => {setCurrentIdx(0); setScore(0);}} 
           className="px-6 py-2 bg-orange-500 text-black font-bold text-[10px] uppercase tracking-widest self-center"
         >
           {t.tryAgain}
         </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/5 border border-white/10 h-full relative overflow-hidden">
      <AnimatePresence>
        {feedback === 'correct' && <Confetti />}
      </AnimatePresence>
      <h3 className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
        <Activity size={14} />
        {t.title}
      </h3>
      <div className="mb-8 p-6 bg-black/40 border border-white/5 text-center">
        <p className="text-[10px] text-slate-500 uppercase mb-3 tracking-widest">{t.prompt}</p>
        <div className="text-lg font-bold text-white border-b-2 border-orange-500 pb-2 inline-block">
          {allTasks[currentIdx].task}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {STAGES.map(s => {
          const stageTitle = translations[language].stages[s.id as keyof typeof translations.en.stages].title;
          return (
            <button 
              key={s.id}
              onClick={() => handleAnswer(stageTitle)}
              className={`p-3 text-[9px] font-mono uppercase border transition-all ${
                feedback === 'correct' && stageTitle === allTasks[currentIdx].phase ? 'bg-emerald-500 border-emerald-500 text-black font-bold' :
                feedback === 'wrong' && stageTitle === allTasks[currentIdx].phase ? 'bg-rose-500 border-rose-500 text-white font-bold' :
                'bg-white/5 border-white/10 hover:border-orange-500 text-slate-400'
              }`}
            >
              {stageTitle}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SuccessMetricMatcher = ({ language }: { language: Language }) => {
  const t = translations[language].lab.successMetricMatcher;
  const [score, setScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const challenges = t.challenges;
  const categories = Object.values(t.categories);

  const handleMatch = (category: string) => {
    if (category === challenges[currentIdx].category) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIdx((prev) => (prev + 1) % challenges.length);
    }, 1500);
  };

  return (
    <div className="mt-8 p-8 bg-white/5 border border-white/10 relative">
      <h3 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
        <Target size={14} />
        {t.title}
      </h3>
      
      <div className="mb-8 text-center">
        <p className="text-[10px] font-mono text-slate-500 uppercase mb-2">{t.prompt}</p>
        <p className="text-2xl font-bold text-white uppercase tracking-tighter">{challenges[currentIdx].metric}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleMatch(cat)}
            disabled={!!feedback}
            className={`p-4 border text-[10px] font-mono uppercase tracking-widest transition-all ${
              feedback === 'correct' && cat === challenges[currentIdx].category ? 'bg-emerald-500 border-emerald-500 text-black font-bold' :
              feedback === 'wrong' && cat !== challenges[currentIdx].category ? 'bg-rose-500/20 border-rose-500/50 text-rose-500' :
              'bg-white/5 border-white/10 hover:border-orange-500 text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          {t.score}: <span className="text-orange-500">{score}</span>
        </div>
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[10px] font-bold uppercase tracking-widest ${feedback === 'correct' ? 'text-emerald-500' : 'text-rose-500'}`}
            >
              {feedback === 'correct' ? t.correct : t.incorrect}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MaturityLab = ({ language }: { language: Language }) => {
  const t = translations[language].lab.maturityLab;
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const scenarios = [
    {
      text: t.scenarios[0].text,
      correctId: "prescriptive",
      explanation: t.scenarios[0].explanation
    },
    {
      text: t.scenarios[1].text,
      correctId: "predictive",
      explanation: t.scenarios[1].explanation
    },
    {
      text: t.scenarios[2].text,
      correctId: "descriptive",
      explanation: t.scenarios[2].explanation
    },
    {
      text: t.scenarios[3].text,
      correctId: "diagnostic",
      explanation: t.scenarios[3].explanation
    }
  ];

  const handleCheck = (id: string) => {
    const isCorrect = id === scenarios[scenarioIdx].correctId;
    setSelectedId(id);
    setFeedback({
      correct: isCorrect,
      message: scenarios[scenarioIdx].explanation
    });
  };

  const nextScenario = () => {
    setScenarioIdx((prev) => (prev + 1) % scenarios.length);
    setSelectedId(null);
    setFeedback(null);
  };

  return (
    <div className="mt-12 p-8 bg-white/5 border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <FlaskConical size={120} />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
          <Zap size={14} />
          {t.title}: {t.subtitle}
        </h3>
        
        <div className="mb-8 p-6 bg-black/40 border border-white/5 min-h-[100px] flex items-center justify-center text-center">
          <p className="text-lg text-white font-medium italic">"{scenarios[scenarioIdx].text}"</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {MATURITY_STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleCheck(s.id)}
              disabled={!!feedback}
              className={`p-4 border text-[10px] font-mono uppercase tracking-widest transition-all ${
                selectedId === s.id
                  ? feedback?.correct
                    ? 'bg-emerald-500 border-emerald-500 text-black font-bold'
                    : 'bg-rose-500 border-rose-500 text-white font-bold'
                  : 'bg-white/5 border-white/10 hover:border-orange-500 text-slate-400'
              }`}
            >
              {translations[language].maturityStages[s.id as keyof typeof translations['en']['maturityStages']].title}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 border-l-4 ${feedback.correct ? 'bg-emerald-500/10 border-emerald-500' : 'bg-rose-500/10 border-rose-500'} mb-6`}
            >
              <p className="text-sm text-white font-bold mb-1">
                {feedback.correct ? t.correct : t.incorrect}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">{feedback.message}</p>
              <button
                onClick={nextScenario}
                className="mt-4 flex items-center gap-2 text-orange-500 text-[10px] font-bold uppercase tracking-widest hover:text-orange-400"
              >
                {t.next} <ArrowRight size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MaturitySection = ({ language }: { language: Language }) => {
  const t = translations[language].maturity;
  const [activeStage, setActiveStage] = useState(MATURITY_STAGES[0].id);
  const current = MATURITY_STAGES.find(s => s.id === activeStage)!;

  return (
    <div className="flex-1 p-10 bg-[#0a0a0a] overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-xs font-mono text-orange-500 uppercase tracking-[0.3em] mb-2">{t.roadmap}</h2>
          <p className="text-4xl font-bold text-white tracking-tighter uppercase">{t.title}</p>
          <p className="text-slate-500 mt-4 max-w-2xl">
            {t.description}
          </p>
        </div>

        {/* The Road Diagram (Literal Road) */}
        <div className="relative py-24 mb-20 perspective-[1000px]">
          {/* Road Surface */}
          <div className="absolute top-1/2 left-0 w-full h-[120px] bg-[#111] -translate-y-1/2 border-y border-white/5 overflow-hidden">
            {/* Road Markings */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 border-t border-dashed border-white/20 -translate-y-1/2" />
            
            {/* Perspective Lines */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-[length:100px_100%] animate-road-flow" />
            </div>
          </div>

          {/* Forward Arrow Head */}
          <div className="absolute top-1/2 right-0 w-0 h-0 border-y-[60px] border-y-transparent border-l-[40px] border-l-[#111] -translate-y-1/2 translate-x-10" />
          <div className="absolute top-1/2 right-0 w-0 h-0 border-y-[60px] border-y-transparent border-l-[40px] border-l-white/5 -translate-y-1/2 translate-x-11" />

          {/* Phase Labels */}
          <div className="absolute top-0 left-0 w-1/2 h-full flex items-start justify-center pt-2">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em] mb-1">{t.reactive}</span>
              <div className="w-16 h-0.5 bg-slate-800" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full flex items-start justify-center pt-2">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-orange-500/50 uppercase tracking-[0.2em] mb-1">{t.proactive}</span>
              <div className="w-16 h-0.5 bg-orange-500/20" />
            </div>
          </div>

          {/* Stages on the Road */}
          <div className="relative z-10 flex justify-between items-center px-10">
            {MATURITY_STAGES.map((s, i) => {
              const stageT = translations[language].maturityStages[s.id as keyof typeof translations['en']['maturityStages']];
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(s.id)}
                  className="relative flex flex-col items-center group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-20 ${
                      activeStage === s.id 
                        ? 'bg-orange-500 border-white shadow-[0_0_30px_rgba(249,115,22,0.6)]' 
                        : 'bg-[#0a0a0a] border-white/20 group-hover:border-orange-500/50'
                    }`}
                  >
                    <span className={`text-lg font-bold ${activeStage === s.id ? 'text-black' : 'text-slate-500'}`}>0{i+1}</span>
                  </motion.div>
                  
                  <div className={`mt-6 text-center transition-all duration-300 ${activeStage === s.id ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}>
                    <div className="text-[9px] font-mono text-slate-500 uppercase mb-1 tracking-widest">{stageT.mode}</div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">{stageT.title}</div>
                  </div>

                  {activeStage === s.id && (
                    <motion.div 
                      layoutId="maturity-glow"
                      className="absolute inset-0 -m-4 bg-orange-500/10 blur-2xl rounded-full z-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Details Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Core Info */}
          <div className="space-y-8">
            <div className="p-8 bg-white/5 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={120} />
              </div>
              <h3 className="text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-4">{t.coreQuestion}</h3>
              <p className="text-4xl font-bold text-white mb-6 italic leading-tight tracking-tighter">"{translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].question}"</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].description}</p>
              
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                <div>
                  <div className="text-[10px] font-mono text-slate-600 uppercase mb-2">{t.intelligence}</div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <div 
                        key={lvl} 
                        className={`h-2 flex-1 rounded-full ${lvl <= current.intelligence ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-white/5'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-600 uppercase mb-2">{t.advantage}</div>
                  <div className="text-white font-bold text-sm uppercase tracking-widest">{translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].advantage}</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-orange-500/5 border border-orange-500/20 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                <Zap size={100} />
              </div>
              <h3 className="text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={12} />
                {t.industryExample}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed italic relative z-10">
                {translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].industryExample}
              </p>
            </div>
          </div>

          {/* Right: Data Focus Comparison */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white uppercase flex items-center gap-3 tracking-tight">
              <Database className="text-orange-500" size={24} />
              {t.dataHandling}
            </h3>
            
            <div className="grid gap-4">
              <div className="p-6 bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">{t.structured}</h4>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 uppercase">{t.relational}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].structuredFocus}</p>
                <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 text-[10px] text-cyan-400/80 italic">
                  {t.relationalExample.replace('{stage}', translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].title.toLowerCase())}
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">{t.unstructured}</h4>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 uppercase">{t.nonRelational}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].unstructuredFocus}</p>
                <div className="p-3 bg-purple-500/5 border border-purple-500/10 text-[10px] text-purple-400/80 italic">
                  {t.nonRelationalExample.replace('{stage}', translations[language].maturityStages[activeStage as keyof typeof translations['en']['maturityStages']].title.toLowerCase())}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Causality Section */}
        <div className="py-24 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h3 className="text-xs font-mono text-orange-500 uppercase tracking-[0.3em] mb-4">{t.causality.subtitle}</h3>
              <h2 className="text-4xl font-bold text-white uppercase tracking-tighter mb-8 leading-none">
                {t.causality.title.split(' vs. ')[0]} vs. <br/><span className="text-orange-500">{t.causality.title.split(' vs. ')[1]}</span>
              </h2>
              <div className="space-y-6">
                <div className="p-8 bg-white/5 border border-white/10 relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingDown size={40} />
                  </div>
                  <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-widest">{t.causality.forecastingTitle}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{t.causality.forecastingText}</p>
                  <div className="p-4 bg-black/40 border border-white/5 rounded-sm">
                    <p className="text-[11px] text-slate-500 italic">
                      <span className="text-orange-500 font-bold not-italic mr-2">{t.causality.forecastingTrap}</span> 
                      {t.causality.forecastingTrapText}
                    </p>
                  </div>
                </div>
                
                <div className="p-8 bg-orange-500/10 border border-orange-500/30 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Zap size={40} />
                  </div>
                  <h4 className="text-orange-500 font-bold mb-3 uppercase text-xs tracking-widest">{t.causality.predictiveTitle}</h4>
                  <p className="text-sm text-orange-100 leading-relaxed mb-4">{t.causality.predictiveText}</p>
                  <div className="p-4 bg-orange-500/10 border border-orange-500/10 rounded-sm">
                    <p className="text-[11px] text-orange-300/70 italic">
                      <span className="text-white font-bold not-italic mr-2">{t.causality.predictivePower}</span> 
                      {t.causality.predictivePowerText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">{t.causality.testingSubtitle}</h3>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tighter mb-8">{t.causality.testingTitle}</h2>
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0 group-hover:border-orange-500/50 transition-colors">
                    <FlaskConical size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase mb-2 tracking-tight">{t.causality.rctTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.causality.rctText}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-cyan-500 shrink-0 group-hover:border-cyan-500/50 transition-colors">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase mb-2 tracking-tight">{t.causality.abTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.causality.abText}
                    </p>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    {t.causality.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Measuring Success Section */}
        <div className="py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h3 className="text-xs font-mono text-orange-500 uppercase tracking-[0.3em] mb-4">{translations[language].framework.successSubtitle}</h3>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">{translations[language].framework.successTitle}</h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto">
              {translations[language].framework.successDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: translations[language].framework.technicalTitle,
                icon: Cpu,
                desc: translations[language].framework.technicalDesc,
                items: translations[language].framework.techItems
              },
              {
                title: translations[language].framework.businessTitle,
                icon: Target,
                desc: translations[language].framework.businessDesc,
                items: translations[language].framework.bizItems
              },
              {
                title: translations[language].framework.operationalTitle,
                icon: RefreshCw,
                desc: translations[language].framework.operationalDesc,
                items: translations[language].framework.opsItems
              }
            ].map((cat, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 text-center group hover:border-orange-500/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/20 group-hover:bg-orange-500 transition-colors" />
                <cat.icon className="mx-auto text-orange-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h4 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">{cat.title}</h4>
                <p className="text-[10px] text-slate-600 uppercase mb-8 tracking-wider">{cat.desc}</p>
                <ul className="space-y-4">
                  {cat.items.map((item: string, j: number) => (
                    <li key={j} className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
                      <div className="w-1 h-1 bg-orange-500/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};


const FrameworkSection = ({ activeId, setActiveId, onHover, language }: { activeId: StageId, setActiveId: (id: StageId) => void, onHover: (id: StageId | null) => void, language: Language }) => {
  const t = translations[language];
  const activeStage = useMemo(() => STAGES.find(s => s.id === activeId)!, [activeId]);
  const activeIndex = STAGES.indexOf(activeStage);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-y-auto custom-scrollbar">
      {/* Top Section: Diagram & Info */}
      <div className="grid lg:grid-cols-[1fr_450px] border-b border-zinc-800">
        {/* Left: Interactive Diagram */}
        <div className="p-10 flex flex-col items-center border-r border-zinc-800 bg-zinc-950">
          <div className="mb-12 text-center w-full">
            <h2 className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-2">{t.framework.frameworkTitle}</h2>
            <p className="text-2xl font-bold text-white tracking-tight uppercase">{t.framework.frameworkSubtitle}</p>
            <p className="text-zinc-500 text-sm mt-4 max-w-xl mx-auto">
              {t.framework.frameworkDesc}
            </p>
          </div>
          
          <CircularVisualizer activeIndex={activeIndex} onSelect={setActiveId} onHover={onHover} language={language} />
        </div>

        {/* Right: Detailed Info (Updates on Hover) */}
        <div className="bg-zinc-900/20 p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-500">
                    PHASE_0{activeIndex + 1}
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">{translations[language].stages[activeId as keyof typeof translations.en.stages].title}</h2>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                  <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">{t.framework.effortLabel}</span>
                  <span className="text-[10px] font-bold text-emerald-500">{activeStage.effort}%</span>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                {translations[language].stages[activeId as keyof typeof translations.en.stages].description}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Activity size={12} />
                    {t.framework.tasksLabel}
                  </h3>
                  <div className="grid gap-2">
                    {translations[language].stages[activeId as keyof typeof translations.en.stages].tasks.map((t, i) => (
                      <div key={i} className="p-3 bg-zinc-900/50 border border-zinc-800 text-xs flex items-center gap-3 group hover:border-emerald-500/50 transition-colors rounded-xl">
                        <div className="w-1 h-1 bg-emerald-500" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tip / Insight */}
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t.framework.insightTitle}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                    "{translations[language].stages[activeId as keyof typeof translations.en.stages].insightText}" 
                    <span className="block mt-1 text-zinc-500">— {translations[language].stages[activeId as keyof typeof translations.en.stages].insightSub}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* NEW: Project Effort Visualization */}
      <ProjectEffortSection language={language} />

      {/* NEW: ML System Architecture (Hidden Costs) */}
      <MLSystemArchitecture language={language} />

      {/* NEW: Continuous Learning Section (Full Width) */}
      <div className="border-b border-white/5">
        <ContinuousLearningSection language={language} />
      </div>

      {/* Middle Section: Framework Comparison Expansion */}
      <div className="p-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-2xl font-bold text-white uppercase mb-6 flex items-center gap-3">
              <BookOpen className="text-emerald-500" size={24} />
              {t.framework.kddVsCrispTitle}
            </h3>
            <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t.framework.kddVsCrispDesc }} />
              <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-4">
                <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-widest">{t.framework.whatIsKdd}</h4>
                <p>{t.framework.kddDesc}</p>
                <ul className="space-y-2 text-[11px] font-mono">
                  {t.framework.kddSteps.map((step: string, i: number) => (
                    <li key={i} className="flex gap-2"><span className="text-emerald-500">0{i + 1}.</span> {step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 border border-zinc-800 bg-zinc-900/50 rounded-2xl">
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{t.framework.keyDifferences}</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <Target size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase mb-1">{t.framework.bizFocusTitle}</p>
                    <p className="text-[11px] text-zinc-500">{t.framework.bizFocusDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <Rocket size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase mb-1">{t.framework.endGoalTitle}</p>
                    <p className="text-[11px] text-zinc-500">{t.framework.endGoalDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <RefreshCw size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase mb-1">{t.framework.iterativityTitle}</p>
                    <p className="text-[11px] text-zinc-500">{t.framework.iterativityDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Validation */}
      <div className="p-16 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h3 className="text-xs font-mono text-orange-500 uppercase tracking-[0.3em] mb-2">{translations[language].knowledgeValidation.title}</h3>
            <p className="text-3xl font-bold text-white tracking-tight">{translations[language].knowledgeValidation.title}</p>
          </div>

          <div className="max-w-2xl">
            <div className="p-8 bg-white/5 border border-white/10">
              <Challenge stage={activeStage} language={language} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataTypeClassifier = ({ language }: { language: Language }) => {
  const t = translations[language].lab.dataTypeClassifier;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const dataItems = useMemo(() => [
    { item: t.items.sql, type: "Structured" },
    { item: t.items.audio, type: "Unstructured" },
    { item: t.items.json, type: "Structured" },
    { item: t.items.images, type: "Unstructured" },
    { item: t.items.csv, type: "Structured" },
    { item: t.items.notes, type: "Unstructured" },
    { item: t.items.logs, type: "Structured" },
    { item: t.items.pdf, type: "Unstructured" },
  ].sort(() => Math.random() - 0.5), [t]);

  const handleAnswer = (type: string) => {
    if (feedback) return;
    if (type === dataItems[currentIdx].type) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    
    setTimeout(() => {
      setFeedback(null);
      setCurrentIdx(c => (c + 1) % dataItems.length);
    }, 1000);
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 h-full relative overflow-hidden">
      <h3 className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
        <Database size={14} />
        {t.title}
      </h3>
      <div className="mb-8 p-6 bg-black/40 border border-white/5 text-center">
        <p className="text-[10px] text-slate-500 uppercase mb-3 tracking-widest">{t.prompt}</p>
        <div className="text-lg font-bold text-white border-b-2 border-cyan-500 pb-2 inline-block">
          {dataItems[currentIdx].item}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleAnswer("Structured")}
          className={`p-4 text-[10px] font-mono uppercase border transition-all ${
            feedback === 'correct' && dataItems[currentIdx].type === 'Structured' ? 'bg-emerald-500 border-emerald-500 text-black font-bold' :
            feedback === 'wrong' && dataItems[currentIdx].type === 'Structured' ? 'bg-rose-500 border-rose-500 text-white font-bold' :
            'bg-white/5 border-white/10 hover:border-cyan-500 text-slate-400'
          }`}
        >
          {t.structured}
        </button>
        <button 
          onClick={() => handleAnswer("Unstructured")}
          className={`p-4 text-[10px] font-mono uppercase border transition-all ${
            feedback === 'correct' && dataItems[currentIdx].type === 'Unstructured' ? 'bg-emerald-500 border-emerald-500 text-black font-bold' :
            feedback === 'wrong' && dataItems[currentIdx].type === 'Unstructured' ? 'bg-rose-500 border-rose-500 text-white font-bold' :
            'bg-white/5 border-white/10 hover:border-purple-500 text-slate-400'
          }`}
        >
          {t.unstructured}
        </button>
      </div>
      <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-slate-600">
        <span>{t.accuracy}: {((score / (currentIdx || 1)) * 100).toFixed(0)}%</span>
        <span>{t.itemsLabel}: {currentIdx + 1} / {dataItems.length}</span>
      </div>
    </div>
  );
};

const LabSection = ({ language }: { language: Language }) => {
  const t = translations[language];
  return (
    <div className="flex-1 p-10 bg-[#0a0a0a] overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-mono text-orange-500 uppercase tracking-[0.3em] mb-2">{t.framework.playgroundSubtitle}</h2>
          <p className="text-4xl font-bold text-white tracking-tighter uppercase">{t.framework.playgroundTitle}</p>
          <p className="text-slate-500 mt-4 max-w-2xl">
            {t.framework.playgroundDesc}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
           <MaturityLab language={language} />
           <SuccessMetricMatcher language={language} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
           <PhaseSortingGame language={language} />
           <TaskMatcherGame language={language} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
           <DataTypeClassifier language={language} />
           <KDDSortingGame language={language} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
           <KDDQuiz language={language} />
        </div>
      </div>
    </div>
  );
};

const ResourcesSection = ({ language }: { language: Language }) => {
  const t = translations[language];
  const resources = [
    {
      title: t.framework.resources.lectures,
      items: [
        { name: "Introduction to Data Mining (CRISP-DM)", link: "#", type: "Lecture" },
        { name: "Statistical Learning & Causality", link: "#", type: "Lecture" },
        { name: "MLOps: The Lifecycle of a Model", link: "#", type: "Lecture" }
      ]
    },
    {
      title: t.framework.resources.reading,
      items: [
        { name: "The CRISP-DM User Guide", link: "https://www.the-modeling-agency.com/crisp-dm.pdf", type: "PDF" },
        { name: "Data Science for Business (Foster Provost)", link: "#", type: "Book" },
        { name: "Machine Learning Engineering (Andriy Burkov)", link: "#", type: "Book" }
      ]
    },
    {
      title: t.framework.resources.tools,
      items: [
        { name: "Scikit-Learn Documentation", link: "https://scikit-learn.org/", type: "Tool" },
        { name: "TensorFlow Extended (TFX)", link: "https://www.tensorflow.org/tfx", type: "Framework" },
        { name: "MLflow: A platform for the ML lifecycle", link: "https://mlflow.org/", type: "Platform" }
      ]
    }
  ];

  return (
    <div className="flex-1 p-10 bg-[#0a0a0a] overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-mono text-orange-500 uppercase tracking-[0.3em] mb-2">{t.framework.resources.subtitle}</h2>
          <p className="text-4xl font-bold text-white tracking-tighter uppercase">{t.framework.resources.title}</p>
          <p className="text-slate-500 mt-4 max-w-2xl">
            {t.framework.resources.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((section, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10">
              <h3 className="text-orange-500 font-bold text-sm mb-8 uppercase tracking-widest border-b border-orange-500/20 pb-4">
                {section.title}
              </h3>
              <div className="space-y-6">
                {section.items.map((item, j) => (
                  <a 
                    key={j} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{item.type}</span>
                      <ExternalLink size={10} className="text-slate-600 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <p className="text-sm text-white font-medium group-hover:text-orange-500 transition-colors leading-tight">
                      {item.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-orange-500/5 border border-orange-500/20 text-center">
          <h3 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">{t.framework.resources.learningPathTitle}</h3>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            {t.framework.resources.learningPathDesc}
          </p>
          <div className="flex justify-center gap-4">
             <div className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">{t.framework.resources.curriculum}</div>
             <div className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">{t.framework.resources.updated}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('maturity');
  const [activeId, setActiveId] = useState<StageId>('business');
  const [hoverId, setHoverId] = useState<StageId | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  
  const effectiveActiveId = hoverId || activeId;
  const t = translations[language].footer;
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500 selection:text-black">
      <Header viewMode={viewMode} setViewMode={setViewMode} language={language} setLanguage={setLanguage} />

      <main className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-89px)]">
        
        <AnimatePresence mode="wait">
          {viewMode === 'maturity' ? (
            <motion.div 
              key="maturity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <MaturitySection language={language} />
            </motion.div>
          ) : viewMode === 'framework' ? (
            <motion.div 
              key="framework"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <FrameworkSection activeId={effectiveActiveId} setActiveId={setActiveId} onHover={setHoverId} language={language} />
            </motion.div>
          ) : viewMode === 'blueprints' ? (
            <motion.div 
              key="blueprints"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <StrategyBlueprints language={language} />
            </motion.div>
          ) : viewMode === 'lab' ? (
            <motion.div 
              key="lab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <LabSection language={language} />
            </motion.div>
          ) : (
            <motion.div 
              key="resources"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <ResourcesSection language={language} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <footer className="py-8 px-8 border-t border-zinc-800 bg-zinc-950 flex flex-col items-center text-center">
        <div className="mb-4">
          <p className="text-white text-lg font-medium">{t.created} <span className="font-bold">David Díaz Ph.D.</span></p>
          <p className="text-zinc-500 text-[10px] italic mt-1">{t.attribution}</p>
        </div>
        
        <div className="flex gap-8 mt-4">
          <a 
            href="https://daviddiazsolis.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors group"
          >
            <div className="w-5 h-5 flex items-center justify-center border border-emerald-500/30 rounded-full group-hover:border-emerald-400">
              <Globe size={10} />
            </div>
            <span className="text-sm font-mono tracking-tight">{t.website}</span>
          </a>
          <a 
            href="https://github.com/daviddiazsolis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors group"
          >
            <div className="w-5 h-5 flex items-center justify-center border border-emerald-500/30 rounded-full group-hover:border-emerald-400">
              <Github size={10} />
            </div>
            <span className="text-sm font-mono tracking-tight">{t.github}</span>
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 w-full flex justify-between items-center">
          <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
            Kernel: v2.0.4-LTS // User: ANONYMOUS
          </div>
          <div className="flex gap-6 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            <span className="text-emerald-500/50">System Stable</span>
            <span>Latency: 14ms</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}} />
    </div>
  );
}
