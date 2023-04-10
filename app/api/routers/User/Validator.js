let createValidator = (user) => {
    let errors = [];
    if(!user.name){
        errors.push('Name is required');
    }
    if(!user.last_name){
        errors.push('Last name is required');
    }
    if(!user.email){
        errors.push('Email is required');
    }
    if(!user.password){
        errors.push('Password is required');
    }
    return errors;
}

let updateValidator = (user) => {
    let errors = [];
    if(!user.name && 'name' in user){
        errors.push('Name is required');
    }
    if(!user.last_name && 'last_name' in user){
        errors.push('Last name is required');
    }
    if(!user.email && 'email' in user){
        errors.push('Email is required');
    }
    if(!user.password && 'password' in user){
        errors.push('Password is required');
    }
    return errors;
};
module.exports = {
    createValidator,
    updateValidator
};