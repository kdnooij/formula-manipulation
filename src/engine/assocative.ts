import _ from 'lodash';
import { ASTType, NodeType } from '../parsing/nodes/node';

export function applyAssociative(node: NodeType) {
    if (node.type === ASTType.summation || node.type === ASTType.product) {
        // Apply associative rule to all children
        node.children = node.children.map((child) =>
            applyAssociative(child));

        // Flatten this node and its children
        node.children = _.flatten(node.children.map((child) => {
            if ((child).type === node.type) {
                return (child as typeof node).children;
            } else {
                return [child];
            }
        }));
    }

    return node;
}