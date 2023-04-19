let TravelPlanRepository = require('../../TravelPlanRepository');

module.exports = function(payload){
    let response = TravelPlanRepository.createTravelPlan(payload.data);
    payload.setResponse(response);

    return payload;
}