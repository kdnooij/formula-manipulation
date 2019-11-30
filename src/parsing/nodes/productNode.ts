import { ASTNode, ASTType } from './node';

export class ASTProductNode extends ASTNode {
    public type: ASTType.product = ASTType.product;
    public children: ASTNode[];

    public constructor(children: ASTNode[]) {
        super(ASTType.product);
        this.children = children;
        this.name = '*';
    }

}