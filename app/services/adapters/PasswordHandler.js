let Interface = require("interface");
let bcrypt = require("bcryptjs");
const PasswordHandlerInterface = Interface.create(...["hash", "compare"]);


class BycrptAdapter extends PasswordHandlerInterface {
    constructor() {
        super();
        this._bcrypt = bcrypt;
    }

    hash(password) {
        return this._bcrypt.hashSync(password, 10);
    }

    compare(password, hash) {
        return this._bcrypt.compareSync(password, hash);
    }
}


class PasswordHandler {
    constructor({ driver }) {
        this.driver = driver;
        this.adapter = null;
        switch(this.driver) {
            case "bcrypt":
                this.adapter = new BycrptAdapter();
                break;
            default:
                throw new Error("Invalid driver");
        }
    }

    hash(password) {
        return this.adapter.hash(password);
    }

    compare(password, hash) {
        return this.adapter.compare(password, hash);
    }
}



module.exports = PasswordHandler;

