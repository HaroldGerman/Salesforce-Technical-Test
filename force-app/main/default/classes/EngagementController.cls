public with sharing class EngagementController {

    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getActivityCounts(Id engagementId){

        //Consultar las tareas completadas y eventos próximos relacionados
        Integer completedTasks = [SELECT COUNT() FROM Task WHERE WhatId = :engagementId AND Status = 'Completed'];
        Integer upcomingEvents = [SELECT Count() FROM Event WHERE WhatId = :engagementId AND StartDateTime >= TODAY];
        
        // Devolver los resultados
        Map<String, Integer> results = new Map<String, Integer>();
        results.put('tasks', completedTasks);
        results.put('events', upcomingEvents);
        
        return results;
    }
    @AuraEnabled
    public static void createTask(Id engagementId, String subject) {
        Task t = new Task();
        t.Subject = subject;
        t.WhatId = engagementId; // Relacionarlo con el Engagement
        t.Status = 'Not Started';
        t.Priority = 'Normal';
        t.ActivityDate = Date.today().addDays(1); // Fecha de vencimiento: Mañana
        
        insert t; // Insertar en base de datos (DML)
    }
}
