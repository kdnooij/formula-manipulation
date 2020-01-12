import { ASTType, NodeType } from '../parsing/nodes/node';

export function hashNode(node?: NodeType) {
    if (node) {
        if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
            node.children.forEach((child) => hashNode(child));
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
                    return '?(' + node.children.map((c) => generateHash(c)).join(' ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.symbol:
                return node.symbol;
            case ASTType.power:
                if (node.children) {
                    return '(' + generateHash(node.children[0]) + '^' +
                        generateHash(node.children[1]) + ')';
                } else {
                    return node.name;
                }
            case ASTType.summation:
                if (node.children) {
                    return '(' + node.children.map((c) => generateHash(c)).join(' + ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.product:
                if (node.children) {
                    return '(' + node.children.map((c) => generateHash(c)).join(' * ') + ')';
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