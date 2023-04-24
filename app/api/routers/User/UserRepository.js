const DataGenerator = require("../../../models/index");
const PasswordHandler = require("../../../services/adapters/PasswordHandler");
let repo = {
    createValidator: require("./Validator").createValidator,
    updateValidator: require("./Validator").updateValidator,
    createUser(payload = {}){
        let user = payload.user;
        if(!user){
            return;
        }

        let passwordHandler = new PasswordHandler({driver: "bcrypt"});
        user.password = passwordHandler.hash(user.password);
        let errors = this.createValidator(user);
        if(errors.length > 0){
            return {errors: errors};
        }else{
            let primaryKey = DataGenerator.get({record_type: 'id', size: 1});
            return {...user, user_id: primaryKey, };
        }
    },
    getAllUsers(){
        return {data: DataGenerator.get({record_type: 'user', size: 10})};
    },
    getUserById(userId){
        return {data: {...DataGenerator.get({record_type: 'user', size: 1}), user_id: userId}};
    },
    updateUser({user}){
        let errors = this.updateValidator(user);
        if(errors.length > 0){
            return {errors: errors};
        }else{
            return user;
        }
    },
    deleteUser(userId){
        return {user_id: userId, deleted_at: new Date()};
    },
    login({email, password, fails = false}){

        let passwordHandler = new PasswordHandler({driver: "bcrypt"});
        let user = DataGenerator.get({record_type: 'user', size: 1});
        let errors = [];
        if(fails){
            
            if(!passwordHandler.compare(password, user.password)){
                errors.push("Invalid password");
            }
            if(user.email !== email){
                errors.push("Invalid email");
            }
        }
        if(errors.length > 0){
            return {errors: errors};
        }else{
            user.password = passwordHandler.hash(password);
            return {data: user};
        }
    }
}

module.exports = repo;