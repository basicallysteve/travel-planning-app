let UserRepository = require('../../UserRepository');

module.exports = function(payload){
    let response = UserRepository.updateUser(payload.data);
    payload.setResponse(response);
    return payload;
}