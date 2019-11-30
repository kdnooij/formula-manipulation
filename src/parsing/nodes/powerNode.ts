import { ASTNode, ASTType } from './node';

export class ASTPowerNode extends ASTNode {
    public type: ASTType.power = ASTType.power;
    public children: ASTNode[];

    public constructor(children: ASTNode[]) {
        super(ASTType.power);
        this.children = children;
        this.name = '^';
    }

}