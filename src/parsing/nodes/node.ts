export enum ASTType {
    null = 'null',
    expression = 'expression',
    number = 'number',
    variable = 'variable',
    symbol = 'symbol'
}

export abstract class ASTNode {
    public name: string;
    public type: ASTType;
    public children?: ASTNode[];

    constructor(type: ASTType, children?: ASTNode[]) {
        this.type = type;
        this.children = children;
        this.name = type;
    }
}