import { ASTNode, ASTType } from './node';

export enum ASTOperator {
    id = 'id',
    plus = '+',
    minus = '-',
    mul = '*',
    div = '/',
    pow = '^'
}
export class ASTExpressionNode extends ASTNode {
    public operator: ASTOperator;
    public type: ASTType.expression = ASTType.expression;
    
    public constructor(operator: ASTOperator, children: ASTNode[]) {
        super(ASTType.expression, children);
        this.operator = operator;
    }

}