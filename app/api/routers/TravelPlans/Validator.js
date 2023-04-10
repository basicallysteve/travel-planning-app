let createValidator = (travelPlan) => {
    let errors = [];
    if(!travelPlan.name){
        errors.push('Name is required');
    }
    if((!travelPlan.country  && 'country' in travelPlan)|| (!travelPlan.country_id  && 'country_id' in travelPlan)){
        errors.push('Country is required');
    }

    if(!travelPlan.planner_id && 'planner_id' in travelPlan){
        errors.push('Planner is required');
    }

    return [...errors];
}

let updateValidator = (travelPlan) => {
    let errors = [];
    if(!travelPlan.name && 'name' in travelPlan){
        errors.push('Name is required');
    }
    if(((!travelPlan.country  && 'country' in travelPlan)|| (!travelPlan.country_id  && 'country_id' in travelPlan))){
        errors.push('Country is required');
    }

    if(!travelPlan.planner_id && 'planner_id' in travelPlan){
        errors.push('Planner is required');
    }

    return [...errors];
}


module.exports = {
    createValidator,
    updateValidator
}