import { ASTType } from '../parsing/nodes/node';
import { NodeType } from './simplification';

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
                    return '(' + printNode(node.children[0] as NodeType) + '^' +
                        printNode(node.children[1] as NodeType) + ')';
                } else {
                    return node.name;
                }
            case ASTType.summation:
                if (node.children) {
                    return '(' + node.children.map((c) => printNode(c as NodeType)).join(' + ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.product:
                if (node.children) {
                    return '(' + node.children.map((c) => printNode(c as NodeType)).join(' * ') + ')';
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