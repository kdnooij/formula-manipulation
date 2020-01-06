import _ from 'lodash';
import { ASTType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { NodeType } from './simplification';

export function differentiate(node: NodeType): NodeType {

    // Case of summation
    if (node.type === ASTType.summation) {
        return differentiateSum(node);
    }

    // Case of product

    if (node.type === ASTType.product) {
        return differentiateProduct(node);
    }

    // Case of power

    if (node.type === ASTType.power) {
        return differentiatePower(node);
    }

    // Case of variable

    if (node.type === ASTType.variable && node.variable === 'x') {
        return new ASTNumberNode(1);
    }

    return new ASTNumberNode(0);
}

export function differentiateSum(node: ASTSummationNode) {
    node.children = node.children.map((child) => differentiate(child as NodeType));
    return node;
}

export function differentiateProduct(node: ASTProductNode) {
    const children = _.cloneDeep(node.children);
    return new ASTSummationNode([
        new ASTProductNode([differentiate(children[0] as NodeType), node.children[1]]),
        new ASTProductNode([node.children[0], differentiate(children[1] as NodeType)])]);
}

export function differentiatePower(node: ASTPowerNode) {
    const children = _.cloneDeep(node.children);
    return new ASTProductNode([node.children[1], new ASTProductNode([
        new ASTPowerNode([node.children[0], 
        new ASTSummationNode([node.children[1], new ASTNumberNode(-1)])]), 
        differentiate(children[0] as NodeType)])]);
}