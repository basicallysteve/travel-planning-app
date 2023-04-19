let TaskRunner = require('../../../../helpers/TaskRunner');
let CreateUserTask = require("./Tasks/CreateUserTask");
let UserCreatePipeRunner = new TaskRunner({
    tasks: [
        CreateUserTask
    ]
});


module.exports = UserCreatePipeRunner;