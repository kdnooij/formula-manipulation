import _ from 'lodash';
import { ASTExpressionNode } from '../parsing/nodes/expressionNode';
import { ASTType } from '../parsing/nodes/node';
import { ASTNullNode } from '../parsing/nodes/nullNode';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTSymbolNode } from '../parsing/nodes/symbolNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export type NodeType = ASTNullNode | ASTNumberNode | ASTVariableNode | ASTSymbolNode | ASTExpressionNode;

export function simplifyInput(node: NodeType): NodeType | undefined {
    switch (node.type) {
        case ASTType.null:
            return simplifyNull(node);
        case ASTType.number:
            return simplifyNumber(node);
        case ASTType.variable:
            return simplifyVariable(node);
        case ASTType.symbol:
            return simplifySymbol(node);
        case ASTType.expression:
            return simplifyExpression(node);
        default:
            return undefined;
    }
}

function simplifyNull(node: ASTNullNode): NodeType | undefined {
    return undefined;
}

function simplifyNumber(node: ASTNumberNode): NodeType | undefined {
    return node;
}

function simplifyVariable(node: ASTVariableNode): NodeType | undefined {
    return node;
}

function simplifySymbol(node: ASTSymbolNode): NodeType | undefined {
    return undefined;
}

function simplifyExpression(node: ASTExpressionNode): NodeType | undefined {
    if (node.children) {
        node.children = _.compact(node.children.map((child) => {
            return simplifyInput(child as NodeType);
        // tslint:disable-next-line:no-any
        }));
    }
    return node;
}