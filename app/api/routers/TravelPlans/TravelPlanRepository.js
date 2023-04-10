const DataGenerator = require("../../../models/index");
/**
 * Refactor to class based architecture
 */
let repo = {
    createValidator: require("./Validator").createValidator,
    updateValidator: require("./Validator").updateValidator,
    createTravelPlan({travel_plan}){
        let errors = this.createValidator(travel_plan);
        if(errors.length > 0){
            return {errors: errors};
        }else{
            let primaryKey = DataGenerator.get({record_type: 'id', size: 1});
            return {travel_plan_id: primaryKey, ...travel_plan};
        }
    },
    getAllTravelPlans(){
        return DataGenerator.get({record_type: 'travel_plan', size: 10});
    },
    getTravelPlanById(travelPlanId){
        return DataGenerator.get({record_type: 'travel_plan', size: 1});
    },
    updateTravelPlan({travel_plan}){
        let errors = this.updateValidator(travel_plan);
        if(errors.length > 0){
            return {errors: errors};
        }else{
            return travel_plan;
        }
    },
    deleteTravelPlan({travel_plan_id}){
        return {travel_plan_id, deleted_at: new Date()};
    }
}

module.exports = repo;