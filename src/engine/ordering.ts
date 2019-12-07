import { ASTType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';
import { NodeType } from './simplification';

export function orderNode(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // Sort children
        node.children = node.children.map((child) => orderNode(child as NodeType));

        node.children = (node.children as NodeType[]).sort((a, b) => sortNode(a, b));
    }

    return node;
}

function sortNode(a: NodeType, b: NodeType) {
    if (a.type === ASTType.number && b.type === ASTType.number) {
        return sortNumerical(a, b);
    }
    if (a.type === ASTType.variable && b.type === ASTType.variable) {
        return sortLexi(a, b);
    }
    if (a.type === ASTType.number) {
        return 1;
    }
    if (b.type === ASTType.number) {
        return -1;
    }
    if (a.type === ASTType.variable) {
        return 1;
    }
    if (b.type === ASTType.variable) {
        return -1;
    }

    return sortSubTrees(a, b);
}

// Sort numbers on inverse numerical ordering
function sortNumerical(a: ASTNumberNode, b: ASTNumberNode): number {
    return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
}

// Sort variables lexicographically
function sortLexi(a: ASTVariableNode, b: ASTVariableNode): number {
    return a.variable.localeCompare(b.variable);
}

// Sort subtree on: power < product < sum
function sortSubTrees(a: NodeType, b: NodeType): number {
    if (a.type === ASTType.summation && b.type === ASTType.summation ||
        a.type === ASTType.product && b.type === ASTType.product) {
        return sortOnFirst(a, b);
    }
    if (a.type === ASTType.power && b.type === ASTType.power) {
        return sortPowers(a, b);
    }
    if (a.type === ASTType.summation) {
        return 1;
    }
    if (b.type === ASTType.summation) {
        return -1;
    }
    if (a.type === ASTType.product) {
        return 1;
    }
    if (b.type === ASTType.product) {
        return -1;
    }
    throw new Error('Fault in sorting algorithm');
}

function sortOnFirst(a: ASTSummationNode | ASTProductNode, b: ASTSummationNode | ASTProductNode): number {
    return sortNode(a.children[0] as NodeType, b.children[0] as NodeType);
}

function sortPowers(a: ASTPowerNode, b: ASTPowerNode): number {
    const res = sortNode(a.children[0] as NodeType, b.children[0] as NodeType);
    if (res === 0) {
        return sortNode(a.children[1] as NodeType, b.children[1] as NodeType);
    } else {
        return res;
    }
}