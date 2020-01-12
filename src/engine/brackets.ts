import { ASTType } from '../parsing/nodes/node';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { NodeType } from './simplification';

export function removeBrackets(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        node.children = node.children.map((child) => removeBrackets(child as NodeType));
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
    if (children.length === 2) {
        for (let i = 0; i < children.length; i++) {
            if ((children[i] as NodeType).type === ASTType.summation) {
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
    } else {
        for (let i = 0; i < children.length; i++) {
            if ((children[i] as NodeType).type === ASTType.summation) {
                if (i === 0) {
                    const newChildren = (children[i] as ASTSummationNode).children.map((child) => {
                        return new ASTProductNode([child, children[i + 1]]);
                    });
                    return new ASTProductNode([new ASTSummationNode(newChildren), 
                        new ASTProductNode(children.slice(2, children.length))]);
                } else {
                    const newChildren = (children[i] as ASTSummationNode).children.map((child) => {
                        return new ASTProductNode([child, children[i - 1]]);
                    });
                    return new ASTProductNode([new ASTSummationNode(newChildren), 
                        new ASTProductNode(children.slice(1, i)), 
                        new ASTProductNode(children.slice(i + 1, children.length))]);
                }
            }
        }
    }
    return node;
}