let TaskRunner = require('../../../../helpers/TaskRunner');
let CreateUserTask = require("../../User/Pipelines/Tasks/CreateUserTask");
let CreateTravelPlanTask = require("./Tasks/CreateTravelPlanTask");
let TravelPlanCreatePipeRunner = new TaskRunner({
    tasks: [
        {
            params: ['planner'],
            task: CreateUserTask,
            skip: (payload) => {
                return payload.data.planner == null;
            }
        },
        CreateTravelPlanTask
    ]
});


module.exports = TravelPlanCreatePipeRunner;