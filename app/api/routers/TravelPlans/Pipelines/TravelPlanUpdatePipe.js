let TaskRunner = require('../../../../helpers/TaskRunner');
let UpdateTravelPlanTask = require("./Tasks/UpdateTravelPlanTask");
let TravelPlanUpdatePipeRunner = new TaskRunner({
    tasks: [
        UpdateTravelPlanTask
    ]
});


module.exports = TravelPlanUpdatePipeRunner;