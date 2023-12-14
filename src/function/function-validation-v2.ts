import Joi, { Schema } from "joi";

const accountSchema: Schema = Joi.object({
    id: Joi.number().required(),
    country: Joi.string().valid("BR", "US").required(),
});

function InputValidator(schema: Schema): Function {
    function validate(target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        // save a reference to the original function
        const childFunction = descriptor.value;

        descriptor.value = (...args: any[]) => {
            // extract the first (and only) given argument to validate
            const argsPassed = args[0];
            const { error } = schema.validate(argsPassed);

            // if there is any error, there will be a return instead of calling the original function
            if (error instanceof Error) {
                console.log(`Invalid input === ${JSON.stringify(argsPassed)} ===\n`);
                return;
            }

            // call the original function after the validation
            return childFunction.apply(this, args);
        };

        return descriptor;
    }

    return validate;
}

class AccountService {

    @InputValidator(accountSchema)
    create(data): void {
        console.log(`===== Account saved in database! [${JSON.stringify(data)}] =====\n`);
    }

}

function main() {
    const accountService: AccountService = new AccountService();

    accountService.create({ id: 1, country: "BR" }); // Shall pass
    accountService.create({ id: 2, country: "US" }); // Shall pass
    accountService.create({ id: 3, country: "AR" }); // Shall not pass
    accountService.create({ country: "AR" }); // Shall not pass
}

(() => {
    main();
})();
