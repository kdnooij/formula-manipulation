import { ASTType } from '../parsing/nodes/node';
import { NodeType } from './simplification';

export function hashNode(node?: NodeType) {
    if (node) {
        if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
            node.children.forEach((child) => hashNode(child as NodeType));
        }
        node.hash = generateHash(node);
    }
}

export function generateHash(node?: NodeType): string {
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
                    return '?(' + node.children.map((c) => generateHash(c as NodeType)).join(' ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.symbol:
                return node.symbol;
            case ASTType.power:
                if (node.children) {
                    return '(' + generateHash(node.children[0] as NodeType) + '^' +
                        generateHash(node.children[1] as NodeType) + ')';
                } else {
                    return node.name;
                }
            case ASTType.summation:
                if (node.children) {
                    return '(' + node.children.map((c) => generateHash(c as NodeType)).join(' + ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.product:
                if (node.children) {
                    return '(' + node.children.map((c) => generateHash(c as NodeType)).join(' * ') + ')';
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