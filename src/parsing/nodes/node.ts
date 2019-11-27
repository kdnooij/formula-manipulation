export enum ASTType {
    null = 'null',
    expression = 'expression',
    number = 'number',
    variable = 'variable',
    symbol = 'symbol'
}

export abstract class ASTNode {
    public name: string;
    public children?: ASTNode[];

    constructor(type: string, children?: ASTNode[]) {
        this.children = children;
        this.name = type;
    }
}