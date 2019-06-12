export default class AppHelpers {
    public static autoBind(context: any) {
        AppHelpers.getInstanceMethodNames(context)
            .forEach(func => context[func] = context[func].bind(context))
    }

    public static getInstanceMethodNames(object: object): string[] {
        let array: string[] = [];
        let proto = Object.getPrototypeOf(object);
        while (proto && proto !== stop) {
            Object.getOwnPropertyNames(proto)
                .forEach(name => {
                    if (name !== 'constructor') {
                        if (AppHelpers.hasMethod(proto, name)) {
                            array.push(name);
                        }
                    }
                });
            proto = Object.getPrototypeOf(proto);
        }

        return array;
    }

    public static hasMethod(object: object, name: string): boolean {
        const desc = Object.getOwnPropertyDescriptor(object, name);

        return !!desc && typeof desc.value === 'function';
    }
}