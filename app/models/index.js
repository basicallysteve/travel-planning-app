let casual = require('casual');

casual.define('id', () => {
    return casual.integer(1, 100000);
});

casual.define('country_obj', ()=>{
    return {
        country_id: casual.id,
        name: casual.country,
        code: casual.country_code,
    }
});

casual.define('user', () => {
    let definition = require('../models/User');
    let data = {};
    for(let field in definition){
        data[field] = casual[definition[field]];
    }
    return data;
})

casual.define('travel_plan', () => {
    let definition = require('../models/TravelPlan');
    let data = {};
    for(let field in definition){
        if(field == 'relationships'){
            let relationships = {};
            for(let relationship in definition[field]){
                let relationship_definition = definition[field][relationship];
                if(relationship_definition.type == 'one'){
                    relationships[relationship] = casual[relationship_definition.record_type];
                }else if(relationship_definition.type == 'many'){
                    relationships[relationship] = [];
                    for(let i = 0; i < casual.integer(1, 10); i++){
                        relationships[relationship].push(casual[relationship_definition.record_type]);
                    }
                }
            }
            data = {...data, ...relationships};
        }else{
            switch(definition[field]){
                case 'date':
                    data[field] = casual[definition[field]](format = 'YYYY-MM-DD');
                    break;
                default:
                    data[field] = casual[definition[field]];
                    break;
            }
        }
    }
    return data;
});




module.exports = {
    get({record_type, size = 1}){
        if(size == 1){
            return casual[record_type];
        }
        let data = [];
        for(let i = 0; i < size; i++){
            data.push(casual[record_type]);
        }
        return data;
    }
};