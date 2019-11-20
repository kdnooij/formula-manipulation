import { ASTNode, ASTType } from './node';

export class ASTVariableNode extends ASTNode {
    public name: string;
    constructor(name: string) {
        super(ASTType.variable, undefined);
        this.name = name;
    }
}