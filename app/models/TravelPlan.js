let TravelPlan = {
    travel_plan_id: 'id',
    name: 'word',
    description: 'description',
    start_date: 'date',
    end_date: 'date',
    relationships:{
        planner: {
            type: 'one',
            record_type: 'user',
        },
        invitees: {
            type: 'many',
            record_type: 'user',
        },
        country: {
            type: 'one',
            record_type: 'country_obj',
        },
    }
}

module.exports = TravelPlan