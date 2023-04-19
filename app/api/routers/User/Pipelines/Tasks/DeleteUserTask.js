let UserRepository = require('../../UserRepository');

module.exports = function(payload){
    let response = UserRepository.deleteUser(payload.data);
    payload.setResponse(response);
    return payload;
}