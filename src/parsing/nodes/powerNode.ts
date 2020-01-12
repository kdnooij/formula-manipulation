import { ASTNode, ASTType, NodeType } from './node';

export class ASTPowerNode extends ASTNode {
    public type: ASTType.power = ASTType.power;
    public children: NodeType[];

    public constructor(children: NodeType[]) {
        super(ASTType.power);
        this.children = children;
        this.name = '^';
    }

}