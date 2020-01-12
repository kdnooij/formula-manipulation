import { ASTNode, ASTType, NodeType } from './node';

export class ASTProductNode extends ASTNode {
    public type: ASTType.product = ASTType.product;
    public children: NodeType[];

    public constructor(children: NodeType[]) {
        super(ASTType.product);
        this.children = children;
        this.name = '*';
    }

}