import _ from 'lodash';
import { ASTType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { NodeType } from './simplification';

export function applyNumerical(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // Apply numerical rule to all children
        node.children = node.children.map((child) => applyNumerical(child as NodeType));
    }

    if (node.type === ASTType.summation) {
        return applyNumericalSummation(node);
    }

    if (node.type === ASTType.product) {
        return applyNumericalProduct(node);
    }

    if (node.type === ASTType.power) {
        return applyNumericalPower(node);
    }

    return node;
}

export function applyNumericalSummation(node: ASTSummationNode) {
    let sum = 0;
    for (const child of node.children) {
        if ((child as NodeType).type === ASTType.number) {
            sum += (child as ASTNumberNode).value;
        }
    }

    // Remove all number nodes
    node.children = _.compact(node.children.map((child) => {
        if ((child as NodeType).type !== ASTType.number) {
            return child;
        } else {
            return undefined;
        }
    }));

    if (node.children.length === 0) {
        return new ASTNumberNode(sum);
    } else if (node.children.length === 1 && sum === 0) {
        return node.children[0] as NodeType;
    } else if (sum !== 0) {
        // Add constant to end of sum
        node.children.push(new ASTNumberNode(sum));
    }

    return node;
}

export function applyNumericalProduct(node: ASTProductNode) {
    let product = 1;
    for (const child of node.children) {
        if ((child as NodeType).type === ASTType.number) {
            product *= (child as ASTNumberNode).value;
        }
    }

    // Remove all number nodes
    node.children = _.compact(node.children.map((child) => {
        if ((child as NodeType).type !== ASTType.number) {
            return child;
        } else {
            return undefined;
        }
    }));

    if (node.children.length === 0) {
        return new ASTNumberNode(product);
    } else if (node.children.length === 1 && product === 1) {
        return node.children[0] as NodeType;
    } else if (product !== 1) {
        // Add constant to start of product
        node.children.unshift(new ASTNumberNode(product));
    }
    return node;
}

export function applyNumericalPower(node: ASTPowerNode) {
    if ((node.children[0] as NodeType).type === ASTType.number &&
        (node.children[1] as NodeType).type === ASTType.number) {
        return new ASTNumberNode(Math.pow(
            (node.children[0] as ASTNumberNode).value,
            (node.children[1] as ASTNumberNode).value
        ));
    }
    return node;
}