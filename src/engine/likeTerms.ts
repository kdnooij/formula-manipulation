import _ from 'lodash';
import { ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export function likeTerms(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        node.children = node.children.map((child) => likeTerms(child));
    } 
    if (node.type === ASTType.product) {
        return likeProduct(node);
    }
    if (node.type === ASTType.summation) {
        return likeSum(node);
    }
    return node;
}

export function likeProduct(node: ASTProductNode): NodeType {
    const children = node.children;
    for (let i = 1; i < children.length; i++) {
        if ((children[i - 1]).type === ASTType.variable &&
        (children[i]).type === ASTType.variable &&
        (children[i - 1] as ASTVariableNode).variable === (children[i] as ASTVariableNode).variable) {
            const newChildren = _.compact(node.children.map((child, index) => {
                if (index === i - 1) {
                    return new ASTPowerNode([child, new ASTNumberNode(2)]);
                } else if (index === i) {
                    return undefined;
                } else {
                    return child;
                }
            }));
            return new ASTProductNode(newChildren);
        }
        if ((children[i - 1]).type === ASTType.variable &&
        (children[i]).type === ASTType.power &&
        (children[i - 1] as ASTVariableNode).variable === 
        ((children[i] as ASTPowerNode).children[0] as ASTVariableNode).variable) {
            const newChildren = _.compact(node.children.map((child, index) => {
                if (index === i - 1) {
                    return new ASTPowerNode([child, new ASTSummationNode([new ASTNumberNode(1),
                        (children[i] as ASTPowerNode).children[1]])]);
                } else if (index === i) {
                    return undefined;
                } else {
                    return child;
                }
            }));
            return new ASTProductNode(newChildren);
        }
        if ((children[i]).type === ASTType.variable &&
        (children[i - 1]).type === ASTType.power &&
        (children[i] as ASTVariableNode).variable === 
        ((children[i - 1] as ASTPowerNode).children[0] as ASTVariableNode).variable) {
            const newChildren = _.compact(node.children.map((child, index) => {
                if (index === i) {
                    return new ASTPowerNode([child, new ASTSummationNode([new ASTNumberNode(1),
                        (children[i - 1] as ASTPowerNode).children[1]])]);
                } else if (index === i - 1) {
                    return undefined;
                } else {
                    return child;
                }
            }));
            return new ASTProductNode(newChildren);
        }
    }
    return node;
}

export function likeSum(node: ASTSummationNode): NodeType {
    const children = node.children;
    for (let i = 1; i < children.length; i++) {
        if ((children[i - 1]).type === ASTType.variable &&
        (children[i]).type === ASTType.variable &&
        (children[i - 1] as ASTVariableNode).variable === (children[i] as ASTVariableNode).variable) {
            const newChildren = _.compact(node.children.map((child, index) => {
                if (index === i - 1) {
                    return new ASTProductNode([child, new ASTNumberNode(2)]);
                } else if (index === i) {
                    return undefined;
                } else {
                    return child;
                }
            }));
            return new ASTSummationNode(newChildren);
        }
        if ((children[i - 1]).type === ASTType.variable &&
        (children[i]).type === ASTType.product &&
        (children[i - 1] as ASTVariableNode).variable === 
        ((children[i] as ASTProductNode).children[0] as ASTVariableNode).variable) {
            const newChildren = _.compact(node.children.map((child, index) => {
                if (index === i - 1) {
                    return new ASTProductNode([child, new ASTSummationNode([new ASTNumberNode(1),
                        (children[i] as ASTProductNode).children[1]])]);
                } else if (index === i) {
                    return undefined;
                } else {
                    return child;
                }
            }));
            return new ASTSummationNode(newChildren);
        }
        if ((children[i]).type === ASTType.variable &&
        (children[i - 1]).type === ASTType.product &&
        (children[i] as ASTVariableNode).variable === 
        ((children[i - 1] as ASTProductNode).children[0] as ASTVariableNode).variable) {
            const newChildren = _.compact(node.children.map((child, index) => {
                if (index === i) {
                    return new ASTProductNode([child, new ASTSummationNode([new ASTNumberNode(1),
                        (children[i - 1] as ASTProductNode).children[1]])]);
                } else if (index === i - 1) {
                    return undefined;
                } else {
                    return child;
                }
            }));
            return new ASTSummationNode(newChildren);
        }
    }
    return node;
}