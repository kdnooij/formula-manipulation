import { ASTNode, ASTType } from './node';

export enum ASTOperator {
    plus = '+',
    minus = '-',
    mul = '*',
    div = '/',
    pow = '^'
}
export class ASTExpressionNode extends ASTNode {
    public operator: ASTOperator;

    public constructor(operator: ASTOperator, children: ASTNode[]) {
        super(ASTType.expression, children);
        this.operator = operator;
    }

}