import { ASTExpressionNode } from './expressionNode';
import { ASTNullNode } from './nullNode';
import { ASTNumberNode } from './numberNode';
import { ASTPowerNode } from './powerNode';
import { ASTProductNode } from './productNode';
import { ASTSummationNode } from './summationNode';
import { ASTSymbolNode } from './symbolNode';
import { ASTVariableNode } from './variableNode';

export enum ASTType {
    null = 'null',
    expression = 'expression',
    number = 'number',
    variable = 'variable',
    symbol = 'symbol',
    summation = 'summation',
    product = 'product',
    power = 'power',
}

export type NodeType = ASTNullNode | ASTNumberNode | ASTVariableNode | ASTSymbolNode |
    ASTExpressionNode | ASTSummationNode | ASTProductNode | ASTPowerNode ;

export abstract class ASTNode {
    public name: string;
    public hash?: string;

    constructor(type: string) {
        this.name = type;
    }
}