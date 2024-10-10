export default class CoreFilterRequestOperandEnum {

}

CoreFilterRequestOperandEnum.Name = () => {
    return Object.freeze({
        AND: Symbol("and"),
        OR: Symbol("or"),
        XOR: Symbol("xor"),
        NOT: Symbol("not"),
        NOTNULL: Symbol("notnull"),
    });
}