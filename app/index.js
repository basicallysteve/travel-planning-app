let express = require('express');

let app = express();
app.use(require('cors')());
// app.configure(function(){
app.use(require('body-parser').json());
    // });
app.use(require('./api/routers/User/UserRouter'));
app.use(require("./api/routers/TravelPlans/TravelPlanRouter"));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});