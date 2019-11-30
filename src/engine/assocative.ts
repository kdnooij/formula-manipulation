import _ from 'lodash';
import { ASTType } from '../parsing/nodes/node';
import { NodeType } from './simplification';

export function applyAssociative(node: NodeType) {
    if (node.type === ASTType.summation || node.type === ASTType.product) {
        // Apply associative rule to all children
        node.children = node.children.map((child) =>
            applyAssociative(child as NodeType));

        // Flatten this node and its children
        node.children = _.flatten(node.children.map((child) => {
            if ((child as NodeType).type === node.type) {
                return (child as typeof node).children;
            } else {
                return [child];
            }
        }));
    }

    return node;
}