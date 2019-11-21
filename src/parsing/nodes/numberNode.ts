import { ASTNode, ASTType } from './node';

export class ASTNumberNode extends ASTNode {
    public value: number;

    constructor(value: number) {
        super(ASTType.variable, undefined);
        this.value = value;
        this.name = value.toString();
    }
}