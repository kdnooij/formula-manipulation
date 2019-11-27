import _ from 'lodash';
import { ASTExpressionNode } from '../parsing/nodes/expressionNode';
import { ASTType } from '../parsing/nodes/node';
import { ASTNullNode } from '../parsing/nodes/nullNode';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { ASTSymbolNode } from '../parsing/nodes/symbolNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export type NodeType = ASTNullNode | ASTNumberNode | ASTVariableNode | ASTSymbolNode |
    ASTExpressionNode | ASTSummationNode | ASTProductNode | ASTPowerNode ;

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
            return node;
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
    const sI = simplifyInput;

    if (node.children) {
        if (node.children.length === 1) {
            const child: NodeType = node.children[0] as NodeType;
            // Check if expression only contains a variable
            if (child.type === ASTType.variable) {
                return simplifyInput(child);
            }
            // Check if expression only contains a number
            if (child.type === ASTType.number) {
                return simplifyInput(child);
            }
        }

        if (node.children.length === 2) {
            const children = node.children as NodeType[];
            // (+ | -) exp
            node.children = _.compact([
                sI(new ASTNumberNode(0)),
                children[0],
                sI(children[1])
            ]);
            return sI(node);
        }

        if (node.children.length === 3) {
            const children = node.children as NodeType[];
            // Remove brackets
            if (children[0].type === ASTType.symbol) {
                return simplifyInput(children[1]);
            }

            const operator = children[1];
            if (operator.type === ASTType.symbol) {
                switch (operator.symbol) {
                    case '+':
                        return sI(new ASTSummationNode(_.compact([
                            sI(children[0]),
                            sI(children[2]),
                        ])));
                    case '-':
                        return sI(new ASTSummationNode(_.compact([
                            sI(node.children[0] as NodeType),
                            sI(new ASTProductNode(_.compact([
                                sI(new ASTNumberNode(-1)),
                                sI(node.children[2] as NodeType)
                            ]))),
                        ])));
                    case '*':
                        return simplifyInput(new ASTProductNode(_.compact([
                            simplifyInput(children[0]),
                            simplifyInput(children[2]),
                        ])));
                    case '/':
                        return sI(new ASTProductNode(_.compact([
                            sI(node.children[0] as NodeType),
                            sI(new ASTPowerNode(_.compact([
                                sI(node.children[2] as NodeType),
                                sI(new ASTNumberNode(-1))
                            ]))),
                        ])));
                    case '^':
                        return sI(new ASTPowerNode(_.compact([
                            sI(node.children[0] as NodeType),
                            sI(node.children[2] as NodeType),
                        ])));
                    default:
                        return node;
                }
            }
        }
    }

    // Simplify children
    if (node.children) {
        node.children = _.compact(node.children.map((child) => {
            return simplifyInput(child as NodeType);
            // tslint:disable-next-line:no-any
        }));
    }
    return node;
}