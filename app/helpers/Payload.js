module.exports = class Payload {
    constructor(payload, fields){
        this._payload = payload ?? {}
        this._fields = fields ?? []

        this.responsePayload = this.data;
    }

    get data(){
        return this._fields.reduce((acc, field) => {
            if(field instanceof Object){
                acc[field.value] = this._payload[field.key];
            }else{
                acc[field] = this._payload[field]
            }
            return acc;
        }, {
            response: {
               
            },
            errors: {
                 error_length: 0
            }
        })
    }

    get errorLength(){
        return this.responsePayload.errors.error_length;
    }

    setResponse(response, key){
        if(key == null){
            if(response.errors){
                this.responsePayload['errors']['user'] = response.errors;
                this.responsePayload['errors'].error_length = this.responsePayload['errors'].error_length + response.errors.length;
            }else{
                this.responsePayload['response'] = response;
            }
        }else{
            if(response.errors){
                this.responsePayload['errors'][key]= response.errors
                this.responsePayload['errors'].error_length = this.responsePayload['errors'].error_length + response.errors.length;
            }else{
                this.responsePayload['response'] = {
                    ...this.responsePayload['response'],
                    [key]: response
                }
            }
        }
    }
    getErrors(){
        return {data: this.responsePayload.errors}
    }
    
    getResponse(){
        return {data: this.responsePayload.response};
    }
}