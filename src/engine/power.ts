import _ from 'lodash';
import { ASTNode, ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export function powerSimplify(node: NodeType): NodeType {
    if (node.type === ASTType.power) {
        node.children = node.children.map((child) => powerSimplify(child));
        return transformPower(node as ASTPowerNode);
    }

    if (node.type === ASTType.product) {
        node.children = node.children.map((child) => powerSimplify(child));
        return transformPowerBase(node as ASTProductNode);
    }

    if (node.type === ASTType.summation) {
        node.children = node.children.map((child) => powerSimplify(child));
    }
    
    return node;
}
export function transformPower(node: ASTPowerNode) {
    const children = node.children;
    if ((children[0]).type === ASTType.power) {
        const powerNode = children[0] as ASTPowerNode;
        children[0] = powerNode.children[0];
        children[1] = new ASTProductNode([powerNode.children[1], children[1]]);
    }

    if ((children[0]).type === ASTType.product) {
        return new ASTProductNode([new ASTPowerNode([(children[0] as ASTProductNode).children[0], children[1]]),
        new ASTPowerNode([(children[0] as ASTProductNode).children[1], children[1]])]);
    }

    return node;
}

export function transformPowerBase(node: ASTProductNode): ASTProductNode |ASTPowerNode {
    const children = node.children;
    for (let i = 1; i < children.length; i++) {
        if ((children[(i - 1)]).type === ASTType.power &&
        (children[i]).type === ASTType.power) {
            const base1 = (children[i - 1] as ASTPowerNode).children;
            const base2 = (children[i] as ASTPowerNode).children;
            if ((base1[0]).type === ASTType.number && 
            (base2[0]).type === ASTType.number && 
            (base1[0] as ASTNumberNode).value === (base2[0] as ASTNumberNode).value) {
                if (children.length === 2) {
                    return new ASTPowerNode([base1[0], new ASTSummationNode([base1[1], base2[1]])]);
                } else {
                    node.children = _.compact(node.children.map((child, index) => {
                        // Remove a child if it is a zero value
                        if (index === i) {
                            return new ASTPowerNode([base1[0], new ASTSummationNode([base1[1], base2[1]])]);
                        } else if (index === i - 1) {
                            return undefined; 
                        } else {
                            return child;
                        }
                    }));
                    return node;
                }
            } else if ((base1[0]).type === ASTType.variable && 
            (base2[0]).type === ASTType.variable && 
            (base1[0] as ASTVariableNode).variable === (base2[0] as ASTVariableNode).variable) {
                if (children.length === 2) {
                    return new ASTPowerNode([base1[0], new ASTSummationNode([base1[1], base2[1]])]);
                } else {
                    node.children = _.compact(node.children.map((child, index) => {
                        // Remove a child if it is a zero value
                        if (index === i) {
                            return new ASTPowerNode([base1[0], new ASTSummationNode([base1[1], base2[1]])]);
                        } else if (index === i - 1) {
                            return undefined; 
                        } else {
                            return child;
                        }
                    }));
                    return node;
                }
            }
        }
    }
    return node;
}