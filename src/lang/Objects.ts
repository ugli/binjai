export class Objects {

    private constructor() { }

    static hashCode = (value: any): number => {
        switch (typeof value) {
            case "boolean": return value ? 1231 : 1237;
            case "number": return Objects.hashCode(`${value}`);
            case "string": {
                const str = value as string
                let result = 0;
                for (let i = 0; i < str.length; i++)
                    result = (result << 5) - result + str.charCodeAt(i) & 0xFFFFFFFF
                return result;
            }
        }
        if (value)
            return Objects.hashCode(JSON.stringify(value));
        return 0;
    }
}