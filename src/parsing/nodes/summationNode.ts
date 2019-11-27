import { ASTNode, ASTType } from './node';

export class ASTSummationNode extends ASTNode {
    public type: ASTType.summation = ASTType.summation;

    public constructor(children: ASTNode[]) {
        super(ASTType.summation, children);
        this.name = '+';
    }

}