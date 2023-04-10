let TaskRunner = require('../../../../helpers/TaskRunner');
let DeleteTravelPlanTask = require("./Tasks/DeleteTravelPlanTask");
let TravelPlanDeletePipeRunner = new TaskRunner({
    tasks: [
        DeleteTravelPlanTask
    ]
});


module.exports = TravelPlanDeletePipeRunner;