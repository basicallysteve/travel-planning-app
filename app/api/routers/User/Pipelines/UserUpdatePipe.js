let TaskRunner = require('../../../../helpers/TaskRunner');
let UpdateUserTask = require("./Tasks/UpdateUserTask");
let UserUpdatePipeRunner = new TaskRunner({
    tasks: [
        UpdateUserTask
    ]
});


module.exports = UserUpdatePipeRunner;