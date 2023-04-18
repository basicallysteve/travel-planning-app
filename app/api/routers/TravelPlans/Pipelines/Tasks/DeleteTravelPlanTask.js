let TravelPlanRepository = require('../../TravelPlanRepository');

module.exports = function(payload){
    let response = TravelPlanRepository.deleteTravelPlan(payload.data);
    payload.setResponse(response);
    return payload;
}