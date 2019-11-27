import { ASTNode, ASTType } from './node';

export class ASTPowerNode extends ASTNode {
    public type: ASTType.power = ASTType.power;

    public constructor(children: ASTNode[]) {
        super(ASTType.power, children);
        this.name = '^';
    }

}