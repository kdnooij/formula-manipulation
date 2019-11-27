import { ASTNode, ASTType } from './node';

export class ASTVariableNode extends ASTNode {
    public variable: string;
    public type: ASTType.variable = ASTType.variable;

    constructor(variable: string) {
        super(ASTType.variable, undefined);
        this.variable = variable;
        this.name = variable;
    }
}