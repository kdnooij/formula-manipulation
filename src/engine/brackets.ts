import { ASTType, NodeType } from '../parsing/nodes/node';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';

export function removeBrackets(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        node.children = node.children.map((child) => removeBrackets(child));
    } 
    switch (node.type) {
        case ASTType.product:
            return productBrackets(node);
        default:
            return node;
    }
}

export function productBrackets(node: ASTProductNode): NodeType {
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
        if ((children[i]).type === ASTType.summation) {
            if (i === 0) {
                const newChildren = (children[i] as ASTSummationNode).children.map((child) => {
                    return new ASTProductNode([child, children[i + 1]]);
                });
                return new ASTSummationNode(newChildren);
            } else {
                const newChildren = (children[i] as ASTSummationNode).children.map((child) => {
                    return new ASTProductNode([child, children[i - 1]]);
                });
                return new ASTSummationNode(newChildren);
            }
        }
    }
    return node;
}