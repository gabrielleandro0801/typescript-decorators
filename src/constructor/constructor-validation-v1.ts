import Joi, { Schema } from "joi";

const personSchema: Schema = Joi.object({
    name: Joi.string().min(4),
    age: Joi.number().min(1)
});

function ConstructorValidator(schema: Schema): Function {
    function validate(target: any): void {
        // save a reference to the original constructor
        const originalConstructor = target;

        // wrap original constructor with validation behaviour
        const f: any = function (...args) {
            // create an instance of the class
            const instance = new originalConstructor(...args);
            const { error } = schema.validate(instance);

            if (error instanceof Error)
                throw error;

            // return the created instance
            return instance;
        };

        // set f's prototype to orginal's prototype so f keeps original's type
        f.prototype = originalConstructor.prototype;
        return f;
    }

    return validate;
}

@ConstructorValidator(personSchema)
class Person {
    age: number
    name: string
    constructor(name: string, age: number) {
        this.age = age
        this.name = name
    }
}

function main() {
    const usersData = [
        { name: 'Jake', age: 50 }, // Shall pass
        { name: 'Jake', age: -1 }, // Shall not pass
        { name: 'John', age: 10 }, // Shall pass
        { name: 'Doc', age: 25 }, // Shall not pass
    ];

    for (const user of usersData) {
        try {
            new Person(user.name, user.age);
            console.log("===== Person successfully created =====\n");
        } catch (error) {
            console.error(`===== Error when creating person: ${error.message} =====\n`);
        }
    }
}

(() => {
    main();
})();
