let UserRepository = require("../../UserRepository");
module.exports = function(payload, responseKey = null){
    let response = UserRepository.createUser(payload.data);
    if(!response){
        return payload;
    }
    payload.setResponse(response, responseKey)
    return payload;
}