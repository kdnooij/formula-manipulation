import { ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export function integrate(node: NodeType): NodeType {
    if (node.type === ASTType.summation && containX(node)) {
        node.children = node.children.map((child) => {
            if (containX(child)) {
                return integrateProduct(child);
            } else {
                return new ASTProductNode([child, new ASTVariableNode('x')]);
            }
        });
        return new ASTSummationNode(node.children);
    } else if (containX(node)) {
        return integrateProduct(node);
    } else {
        return new ASTProductNode([node, new ASTVariableNode('x')]);
    }
}

export function containX(node: NodeType): boolean {
    if (node.type === ASTType.summation || node.type === ASTType.power || node.type === ASTType.product) {
        const result = node.children.map((child) => containX(child));
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < result.length; i++) {
            if (result[i]) {
                return true;
            }
        }
    }
    if (node.type === ASTType.variable && node.variable === 'x') {
        return true;
    }
    return false;
}

export function integrateProduct(node: NodeType): NodeType {
    if (node.type === ASTType.power) {
        const base = (node as ASTPowerNode).children[0];
        const exp = (node as ASTPowerNode).children[1];
        if (base.type === ASTType.variable && base.variable === 'x') {
            const int = new ASTProductNode([new ASTPowerNode([new
                ASTSummationNode([new ASTNumberNode(1), exp]), new ASTNumberNode(-1)]),
            new ASTPowerNode([base, new ASTSummationNode([new ASTNumberNode(1), exp])])]);
            return int;
        }
    }
    if (node.type === ASTType.variable && node.variable === 'x') {
        return new ASTProductNode([new ASTNumberNode(0.5),
        new ASTPowerNode([node, new ASTNumberNode(2)])]);
    }
    /*if (! containX(node)) {
        return new ASTProductNode([new ASTVariableNode('x'), node]);
    }*/
    if (node.type === ASTType.product) {
        return new ASTProductNode(node.children.map((child) => integrateProduct(child)));
    }
    return node;
}