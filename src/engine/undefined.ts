import { ASTNode, ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNullNode } from '../parsing/nodes/nullNode';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { applyNumerical } from './numerical';

export function isUndefined(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        node.children = node.children.map((child) => isUndefined(child));
    }

    if ((node).type === ASTType.product) {
        return undefinedProduct(node as ASTProductNode);
    }
    if ((node).type === ASTType.power) {
        return undefinedPower(node as ASTPowerNode);
    }

    if ((node).type === ASTType.summation) {
        return undefinedSum(node as ASTSummationNode);
    }
    
    return node;
}

export function undefinedProduct(node: ASTProductNode) {
    for (let i = 0; i < (node.children.length); i++) {
        if ((node.children[i]).type === ASTType.null) {
            return new ASTNullNode();
        }
    } 
    return node;
}

export function undefinedSum(node: ASTSummationNode) {
    for (let i = 0; i < (node.children.length); i++) {
        if ((node.children[i]).type === ASTType.null) {
            return new ASTNullNode();
        }
    } 
    return node;
}

export function undefinedPower(node: ASTPowerNode) {
    const child0 = node.children[0];
    const child1 = node.children[1];
    const base = applyNumerical(child0);
    const exponent = applyNumerical(child1);
    if ((base).type === ASTType.number && 
    (exponent).type === ASTType.number) {
        if (((base as ASTNumberNode).value === 0) &&
        ((exponent as ASTNumberNode).value < 0)) {
            return new ASTNullNode();
        } else if (((base as ASTNumberNode).value < 0) &&
        ((1 / (exponent as ASTNumberNode).value) % 2 === 0)) {
            return new ASTNullNode();
        }
    }
    for (let i = 0; i < (node.children.length); i++) {
        if ((node.children[i]).type === ASTType.null) {
            return new ASTNullNode();
        }
    } 
    return node;
} 