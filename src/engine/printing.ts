import { ASTType, ASTNode } from '../parsing/nodes/node';
import { NodeType } from './simplification';
import { ASTNumberNode } from '../parsing/nodes/numberNode';

export function printNode(node?: NodeType): string {
    if (node) {
        switch (node.type) {
            case ASTType.null:
                return '';
            case ASTType.variable:
                return node.variable;
            case ASTType.number:
                return node.value.toString();
            case ASTType.expression:
                if (node.children) {
                    return '?(' + node.children.map((c) => printNode(c as NodeType)).join(' ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.symbol:
                return node.symbol;
            case ASTType.power:
                if (node.children) {
                    if (checkNodeType(node.children[0] as NodeType)) {
                        if (checkNodeType(node.children[1] as NodeType)) {
                            return printNode(node.children[0] as NodeType) + '^' +
                            printNode(node.children[1] as NodeType);
                        } else {
                            return printNode(node.children[0] as NodeType) + '^(' +
                            printNode(node.children[1] as NodeType) + ')';
                        }
                    } else {
                        if (checkNodeType(node.children[1] as NodeType)) {
                            return '(' + printNode(node.children[0] as NodeType) + ')^' +
                            printNode(node.children[1] as NodeType);
                        } else {
                            return '(' + printNode(node.children[0] as NodeType) + ')^(' +
                            printNode(node.children[1] as NodeType) + ')';
                        }
                    }
                } else {
                    return node.name;
                }
            case ASTType.summation:
                    if (node.children) {
                        return node.children.map((c) => {
                            if ((c as NodeType).type === ASTType.number && (c as ASTNumberNode).value < 0) {
                                return '(' + printNode(c as NodeType) + ')';
                            } else {
                                return printNode(c as NodeType);
                            }
                        }).join(' + ');
                    } else {
                        return node.name;
                    }
            case ASTType.product:
                if (node.children) {
                    return node.children.map((c) => {
                        if ((c as NodeType).type === ASTType.summation) {
                            return '(' + printNode(c as NodeType) + ')';
                        } else {
                            return printNode(c as NodeType);
                        }
                    }).join('*');
                } else {
                    return node.name;
                }
            default:
                return '';
        }
    } else {
        return 'null';
    }
}

export function checkNodeType(node: NodeType) {
    if (node.type === ASTType.variable ||
        node.type === ASTType.symbol ||
        (node.type === ASTType.number && node.value >= 0)) {
            return true;
        }
    return false;
}