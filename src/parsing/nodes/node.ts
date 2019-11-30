export enum ASTType {
    null = 'null',
    expression = 'expression',
    number = 'number',
    variable = 'variable',
    symbol = 'symbol',
    summation = 'summation',
    product = 'product',
    power = 'power',
}

export abstract class ASTNode {
    public name: string;

    constructor(type: string) {
        this.name = type;
    }
}