const DataGenerator = require("../../../models/index");
let repo = {
    createValidator: require("./Validator").createValidator,
    updateValidator: require("./Validator").updateValidator,
    createUser(payload = {}){
        let user = payload.user;
        if(!user){
            return;
        }
        let errors = this.createValidator(user);
        if(errors.length > 0){
            return {errors: errors};
        }else{
            let primaryKey = DataGenerator.get({record_type: 'id', size: 1});
            return {user_id: primaryKey, ...user};
        }
    },
    getAllUsers(){
        return DataGenerator.get({record_type: 'user', size: 10});
    },
    getUserById(userId){
        return DataGenerator.get({record_type: 'user', size: 1});
    },
    updateUser(user){
        let errors = this.updateValidator(user);
        if(errors.length > 0){
            return {errors: errors};
        }else{
            return user;
        }
    },
    deleteUser(userId){
        return {user_id: userId};
    }
}

module.exports = repo;