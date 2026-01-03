# Salesforce Engagement App 🚀

Technical implementation for Acme Services Engagement Management. This project enables full-cycle management of customer engagements, from data modeling to automation.

## 🛠 Features Built
1.  **Data Modeling:** Custom `Engagement__c` object with relationships to Account and Opportunity.
2.  **User Interface:** Custom Lightning App and Engagement Record Page layout.
3.  **Backend Logic (Apex):**
    * `EngagementController.cls`: Handles SOQL queries and safe DML operations for tasks.
4.  **Frontend (LWC):**
    * `engagementSummary`: Displays real-time task/event counters and Opportunity Amount.
    * Includes a "Quick Follow-Up Call" button that creates tasks via Apex to bypass UI API limitations.
5.  **Automation (Flow):**
    * `Opportunity to Engagement Task`: Auto-creates a "Prepare proposal" task when an Opportunity enters "Negotiation/Review".
6.  **Reporting:** Custom Report Type and "Engagement Pipeline" report with visualization.

## 🧪 How to Test

### 1. LWC Component (Engagement Summary)
* Open any Engagement record linked to an Opportunity.
* Verify the "Opportunity Amount" is displayed.
* Click **"Quick Follow-Up Call"**.
* **Expected Result:** A success toast appears, and a new Task is created in the Activity timeline.

### 2. Flow Automation
* Go to an Opportunity linked to an Engagement.
* Change Stage to **"Negotiation/Review"**.
* **Expected Result:** Navigate to the linked Engagement; a new high-priority task "Prepare proposal" appears automatically.

### 3. Reporting
* Go to the **Reports** tab.
* Open **"Engagement Pipeline"**.
* Verify it shows Engagements grouped by Status with a Sum of Opportunity Amounts.

## 📂 Project Structure
* **LWC:** `force-app/main/default/lwc/engagementSummary`
* **Apex:** `force-app/main/default/classes/EngagementController.cls`