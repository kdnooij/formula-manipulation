import _ from 'lodash';
import { ASTType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { NodeType } from './simplification';

export function removeIdentities(node: NodeType): NodeType | undefined {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // Remove identities from children
        node.children = _.compact(node.children.map((child) => removeIdentities(child as NodeType)));
        // We remove the node if it has no children after removing identities
        if (node.children.length === 0) {
            return undefined;
        }
    }

    // Case of summation
    if (node.type === ASTType.summation) {
        node.children = _.compact(node.children.map((child) => {
            // Remove a child if it is a zero value
            if ((child as NodeType).type === ASTType.number
                && (child as ASTNumberNode).value === 0) {
                return undefined;
            } else {
                return child;
            }
        }));

        if (node.children.length === 0) {
            return undefined;
        } else {
            return node;
        }
    }

    // Case of product

    // Case of power

    // Otherwise
    return node;
}