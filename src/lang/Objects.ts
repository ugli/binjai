export class Objects {

    private constructor() { }

    static hashCode = (value: any): number => {
        if (typeof value === "boolean")
            return value ? 1231 : 1237;
        if (!value)
            return 0;
        if (typeof value === "string") {
            const str = value as string
            let result = 0;
            for (let i = 0; i < str.length; i++)
                result = (result << 5) - result + str.charCodeAt(i) & 0xFFFFFFFF
            return result;
        }
        if (typeof value === "number")
            return Objects.hashCode(`${value}`);
        return Objects.hashCode(JSON.stringify(value));
    }
}