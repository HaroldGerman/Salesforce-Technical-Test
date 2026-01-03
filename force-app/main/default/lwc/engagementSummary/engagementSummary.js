import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Importamos los métodos Apex 
import getActivityCounts from '@salesforce/apex/EngagementController.getActivityCounts';
import createTask from '@salesforce/apex/EngagementController.createTask';

import ENGAGEMENT_NAME from '@salesforce/schema/Engagement__c.Name';
import OPP_AMOUNT from '@salesforce/schema/Engagement__c.Related_Opportunity__r.Amount';

const FIELDS = [ENGAGEMENT_NAME, OPP_AMOUNT];

export default class EngagementSummary extends LightningElement {
    @api recordId;
    
    completedTasks = 0;
    upcomingEvents = 0;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    engagement;

    get opportunityAmount() {
        return getFieldValue(this.engagement.data, OPP_AMOUNT);
    }

    get engagementName() {
        return getFieldValue(this.engagement.data, ENGAGEMENT_NAME);
    }

    @wire(getActivityCounts, { engagementId: '$recordId' })
    wiredCounts({ error, data }) {
        if (data) {
            this.completedTasks = data.tasks;
            this.upcomingEvents = data.events;
        } else if (error) {
            console.error(error);
        }
    }

    // Lógica llama a Apex en vez de UI API
    handleCreateTask() {
        const subject = 'Follow-up on ' + this.engagementName;

        createTask({ engagementId: this.recordId, subject: subject })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Follow-up task created successfully!',
                        variant: 'success',
                    }),
                );
                ;
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body ? error.body.message : error.message,
                        variant: 'error',
                    }),
                );
            });
    }
}