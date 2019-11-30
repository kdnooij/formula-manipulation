import { ASTNode, ASTType } from './node';

export class ASTSummationNode extends ASTNode {
    public type: ASTType.summation = ASTType.summation;
    public children: ASTNode[];

    public constructor(children: ASTNode[]) {
        super(ASTType.summation);
        this.children = children;
        this.name = '+';
    }

}