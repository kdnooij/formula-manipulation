import { ASTNode, ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export function prettyPrintNode(node?: NodeType): string {
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
                    return '?(' + node.children.map((c) => prettyPrintNode(c)).join(' ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.symbol:
                return node.symbol;
            case ASTType.power:
                if (node.children) {
                    if (checkNodeType(node.children[0])) {
                        if (checkNodeType(node.children[1])) {
                            return prettyPrintNode(node.children[0]) + '^' +
                                prettyPrintNode(node.children[1]);
                        } else {
                            return prettyPrintNode(node.children[0]) + '^(' +
                                prettyPrintNode(node.children[1]) + ')';
                        }
                    } else {
                        if (checkNodeType(node.children[1])) {
                            return '(' + prettyPrintNode(node.children[0]) + ')^' +
                                prettyPrintNode(node.children[1]);
                        } else {
                            return '(' + prettyPrintNode(node.children[0]) + ')^(' +
                                prettyPrintNode(node.children[1]) + ')';
                        }
                    }
                } else {
                    return node.name;
                }
            case ASTType.summation:
                if (node.children) {
                    const child = node.children.slice(1, (node.children.length - 1));
                    let str = prettyPrintNode(node.children[0]);
                    // tslint:disable-next-line:prefer-for-of
                    for (let _i = 0; _i < child.length; _i++) {
                        // tslint:disable-next-line:prefer-conditional-expression
                        if ((child[_i]).type === ASTType.number &&
                            (child[_i] as ASTNumberNode).value < 0) {
                            str = str + prettyPrintNode(child[_i]);
                        } else if ((child[_i]).type === ASTType.variable &&
                            ((child[_i] as ASTVariableNode).variable).substring(0, 1) === '-') {
                            str = str + prettyPrintNode(child[_i]);
                        } else {
                            str = str + '+' + prettyPrintNode(child[_i]);
                        }
                    }
                    // tslint:disable-next-line:prefer-conditional-expression
                    if ((node.children[node.children.length - 1]).type === ASTType.number &&
                        (node.children[node.children.length - 1] as ASTNumberNode).value < 0) {
                        str = str + prettyPrintNode(node.children[node.children.length - 1]);
                    } else if (((node.children[node.children.length - 1]).type
                        === ASTType.variable &&
                        ((node.children[node.children.length - 1] as ASTVariableNode)
                            .variable).substring(0, 1) === '-')) {
                        str = str + prettyPrintNode(node.children[node.children.length - 1]);
                    } else {
                        str = str + '+' + prettyPrintNode(node.children[node.children.length - 1]);
                    }
                    return str;
                } else {
                    return node.name;
                }

            /* return node.children.map((c) => {
                if ((c).type === ASTType.number && (c as ASTNumberNode).value < 0) {
                    return '(' + prettyPrintNode(c) + ')';
                } else {
                    return prettyPrintNode(c);
                }
            }).join(' + ');
        } else {
            return node.name;
        } */
            case ASTType.product:
                if (node.children) {
                    return node.children.map((c) => {
                        if ((c).type === ASTType.summation) {
                            return '(' + prettyPrintNode(c) + ')';
                        } else {
                            return prettyPrintNode(c);
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
                    return '?(' + node.children.map((c) => printNode(c)).join(' ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.symbol:
                return node.symbol;
            case ASTType.power:
                if (node.children) {
                    return '(' + printNode(node.children[0]) + '^' +
                        printNode(node.children[1]) + ')';
                } else {
                    return node.name;
                }
            case ASTType.summation:
                if (node.children) {
                    return '(' + node.children.map((c) => printNode(c)).join(' + ') + ')';
                } else {
                    return node.name;
                }
            case ASTType.product:
                if (node.children) {
                    return '(' + node.children.map((c) => printNode(c)).join(' * ') + ')';
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