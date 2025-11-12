## AI Interaction Overview
We utilize ChatGPT and Deepseek chat platform to aid in refining the functional design and expanding the functionality of our overall system. With the help of these models, we ultimately determined the functions of this system and its subsequent development path.  
We use the AI platform "miaoda" as our programming tool. With the help of these agents, we  completed the front-end programming and the method for interfacing with the back-end Multi-agent system.  

## Prompting Details
### First example:
Prompt: We are designing a AI assistant for healthy living, the basic function is "health consultation", "Medicine recommendation", "long-term care", what else function it could have to help the user have a healthy life?  
AImessage: 1. Proactive Health Monitoring & Analytics
These functions turn raw data into actionable insights.

Symptom Checker & Triage: A more advanced version of consultation that helps users understand the potential severity of their symptoms and guides them on whether to seek immediate care, schedule a doctor's appointment, or manage it at home.

Biometric Data Integration: Sync with wearables (Apple Watch, Fitbit, Oura Ring) and smart scales to track heart rate, sleep patterns, activity levels, blood glucose, and blood pressure. The AI can then spot trends and provide context.

Personal Health Record (PHR) Vault: A secure place for users to store lab results, doctor's notes, vaccination records, and medication lists. The AI can help identify patterns across these documents.

Predictive Health Risk Assessment: Using aggregated data (age, family history, lifestyle, biometrics), the AI can provide personalized assessments of potential health risks (e.g., prediabetes, hypertension) and suggest preventive measures.

2. Daily Lifestyle & Habit Coaching
These functions help users build healthy habits into their daily routine.

Personalized Meal Planning & Nutrition: Creates weekly meal plans based on dietary goals (weight loss, muscle gain, keto, vegan), allergies, and even what's in the user's fridge. Includes recipes and grocery lists.

Fitness & Workout Coach: Generates personalized workout routines (strength, yoga, cardio) based on the user's fitness level, available equipment, time, and goals. Can include form checks via the phone's camera.

Sleep Optimization: Analyzes sleep data and provides tailored advice for improving sleep hygiene, such as wind-down routines, ideal bedroom temperature, and caffeine cut-off times.

Hydration & Mindfulness Reminders: Proactive, context-aware nudges to drink water, take a break from the screen, or do a 1-minute breathing exercise.

Habit Tracker & Goal Setting: Allows users to set and track progress on specific health goals (e.g., "10,000 steps a day," "meditate 5x/week") with positive reinforcement.

3. Mental & Emotional Wellbeing
A healthy life is not just physical.

Mental Health Check-ins: Daily or weekly prompts to gauge mood and stress levels. The AI can then suggest resources like guided meditations, journaling prompts, or breathing exercises.

Guided Meditation & Mindfulness: A library of audio-guided sessions for stress, anxiety, focus, and sleep.

Cognitive Behavioral Therapy (CBT) Tools: Provides simple, accessible CBT exercises to help users challenge negative thought patterns and manage anxiety.

Social Connection & Motivation: An optional community feature where users can share non-identifiable progress and motivate each other in a safe, moderated environment.

4. Administrative & Logistical Support
Reducing life's friction is a huge health benefit.

Healthcare Navigator: Helps users understand their health insurance, find in-network providers, compare costs for procedures, and decode medical bills.

Appointment Scheduler & Reminders: Integrates with calendar apps to schedule doctor's appointments and send reminders for upcoming visits and prescription refills.

Medication Adherence & Management: Sends reminders for when to take medicine, warns of potential drug interactions (based on the user's PHR), and can help arrange for delivery from pharmacies.

5. Education & Motivation
This keeps the user engaged and informed.

Personalized Health News & Research: Curates and explains the latest health research relevant to the user's specific conditions and goals, filtering out misinformation.

Health Literacy Content: Short, digestible articles and videos on health topics (e.g., "What is HbA1c?", "The Science of Intermittent Fasting") to empower the user.

Gamification & Rewards: Awards points, badges, and levels for consistent healthy behaviors, creating a fun and motivating feedback loop.
### Explaination:
Through this response, we have expanded the functionality of the entire system and broadened our horizons.  
### Second example:
Prompt: How could we connect the front-end to the back-end? We are using langchain and langgraph as the back-end Agent Driven package.  
AImessage: Excellent! Connecting a front-end to a LangChain/LangGraph back-end requires a well-designed architecture. Here's a comprehensive guide on how to structure this connection:  
Architecture Overview
Front-End (UI) → API Gateway → WebSocket/HTTP Server → LangGraph Agent Back-End
1. Back-End Setup with FastAPI/WebSockets
<code>
2. Enhanced LangGraph Agent Back-End
<code>
3. Front-End Integration
<code>
Component Usage:
<code>
4. Key Considerations
Real-time vs HTTP:
WebSockets: Best for chat interfaces, real-time updates
REST API: Better for file uploads, complex analyses, reports
Session Management:
Store conversation history
Maintain user context across sessions
Handle reconnections gracefully  
Scalability:
Use Redis for session storage in production
Implement connection pooling
Add rate limiting and authentication
This architecture provides a robust foundation for connecting your front-end to a LangGraph-powered back-end, supporting real-time interactions while maintaining the stateful, agentic capabilities of your health assistant.

### Explaination:
Through this response, we have determined the method for building the front end and how to interface with the back-end program.

### Third example:
Prompt: We have already build the front-end and back-end, how should we test the stability of the system?  
xcellent! Since you have both components built, here's a comprehensive testing strategy to ensure system stability. I'll cover different testing types and provide practical implementation approaches.

1. Back-End Agent Testing
Unit Testing for LangGraph Components  
<code>  
Load Testing for Agent Back-End  
<code>  
2. Integration Testing
API Integration Tests  
<code>  
3. End-to-End Testing
Playwright/Selenium E2E Tests  
<code>  
E2E Test with Real Back-End  
4. Stability & Chaos Testing
Resilience Testing  
<code>  
5. Performance Monitoring & Alerting
Continuous Monitoring Setup  
<code>
6. Test Automation Pipeline
GitHub Actions Example  
<code>  
Key Stability Metrics to Monitor:
Response Time: P95 under 2 seconds

Error Rate: < 1% of requests

Memory Usage: Stable over 24+ hours

Session Recovery: 100% after restarts

Concurrent Users: System limits and behavior

Message Throughput: Messages processed per minute

Start with the unit and integration tests, then gradually incorporate load testing and chaos engineering as you identify stability requirements. The goal is to catch issues before they affect real users!

### Explaination:
Through this response, we tested the front-end we built, fine-tuned the functional attributes of each button, and avoided interference between them.

## Project Evolution  
Through interacting with artificial intelligence, we have become aware of the limitations of our original system's functionality, broadening our horizons and enabling us to expand and improve the original design. It has given us a profound understanding of front-end program construction and how to interact with back-end programs, enhancing our learning speed and depth of understanding of new knowledge. We have also addressed some minor difficulties one by one. Furthermore, we have gained a new understanding of artificial intelligence itself, learning how AI collaborates to complete code construction, the principle of function calling, and relevant knowledge of the MCP workflow, which has benefited us immensely.

