let TaskRunner = require('../../../../helpers/TaskRunner');
let DeleteUserTask = require("./Tasks/DeleteUserTask");
let UserDeletePipeRunner = new TaskRunner({
    tasks: [
        DeleteUserTask
    ]
});


module.exports = UserDeletePipeRunner;