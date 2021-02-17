import isUndefined from "lodash/isUndefined";

let increment = 0;

export class AccessParams {
    public readonly name: string
    public readonly public: boolean

    constructor(type: string, name?: string) {
        if (isUndefined(name)) {
            increment++;
            this.name = `${type}_${increment}`
            this.public = false
        } else {
            this.name = name
            this.public = true
        }
    }
}
