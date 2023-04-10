let TravelPlanRepository = require('../../TravelPlanRepository');

module.exports = function(payload){
    let response = TravelPlanRepository.updateTravelPlan(payload.data);
    payload.setResponse(response);
    return payload;
}