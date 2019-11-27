import { ASTNode, ASTType } from './node';

export class ASTProductNode extends ASTNode {
    public type: ASTType.product = ASTType.product;

    public constructor(children: ASTNode[]) {
        super(ASTType.product, children);
        this.name = '*';
    }

}