let TravelPlanRepository = require('../../TravelPlanRepository');

module.exports = function(payload){
    if(payload.errorLength > 0){
        return payload;
    } 
    let response = TravelPlanRepository.createTravelPlan(payload.data);
    payload.setResponse(response);

    return payload;
}