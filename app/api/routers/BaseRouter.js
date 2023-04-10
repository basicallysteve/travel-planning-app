class BaseRouter {
    constructor({ baseUrl, router, routingInfo = {}}) {
        this.router = router;
        this.baseUrl = baseUrl;
        this.routingInfo = routingInfo;

        this.setRoutes();
    }
    
    getRouter() {
        return this.router;
    }


    setRoutes(){
        for(let route in this.routingInfo){
            this.router[this.routingInfo[route].method](`${this.baseUrl}${this.routingInfo[route].url ? `/${this.routingInfo[route].url}` : ''}`, this.routingInfo[route].callback);
        }
    }
}

module.exports = BaseRouter;