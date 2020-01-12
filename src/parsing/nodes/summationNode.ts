import { ASTNode, ASTType, NodeType } from './node';
import { ASTNumberNode } from './numberNode';

export class ASTSummationNode extends ASTNode {
    public type: ASTType.summation = ASTType.summation;
    public children: NodeType[];

    public constructor(children: NodeType[]) {
        super(ASTType.summation);
        this.children = children;
        this.name = '+';
    }

}