module.exports = class {
    constructor({payload, tasks}) {
        this._payload = payload ?? {}
        this._tasks = tasks ?? []
    }
    addTask(task) {
        this._tasks.push(task)
    }

    run(payload){
        this._payload = payload;
        return this.runTasks();
    }

    runTasks() {
        let payload = this._payload;
        for(let task of this._tasks){
            if(task instanceof Object && !(task instanceof Function)){
                let params = task.params ?? [];
                let taskFn = task.task;
                payload = taskFn(payload, ...params);
            }else{
                payload = task(payload)
            }
        }
        return payload;
    }
}