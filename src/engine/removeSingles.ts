import _ from 'lodash';
import { ASTNode, ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { hashNode } from './hashing';

export function removeSingles(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // simplify children
        node.children = node.children.map((child) => removeSingles(child));
    }

    switch (node.type) {
        case ASTType.summation:
            return removeSinglesSummation(node);
        case ASTType.product:
            return removeSinglesProduct(node);
        default:
            return node;
    }
}

function removeSinglesSummation(node: ASTSummationNode): NodeType {
    if (node.children.length === 1) {
        return node.children[0];
    }
    return node;
}

function removeSinglesProduct(node: ASTProductNode): NodeType {
    if (node.children.length === 1) {
        return node.children[0];
    }
    return node;
}