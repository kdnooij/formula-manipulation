import _ from 'lodash';
import { ASTNode, ASTType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { hashNode } from './hashing';
import { NodeType } from './simplification';

export function smartSimplify(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // simplify children
        node.children = node.children.map((child) => smartSimplify(child as NodeType));
    }

    switch (node.type) {
        case ASTType.summation:
            return smartSimplifySummation(node);
        case ASTType.product:
            return smartSimplifyProduct(node);
        default:
            return node;
    }
}

function smartSimplifySummation(node: ASTSummationNode): NodeType {
    const map = new Map<string, { node: ASTNode, mul: ASTSummationNode }>();
    for (const x of node.children) {
        let c: ASTNode = new ASTNumberNode(1);
        let n: ASTNode = _.cloneDeep(x);
        if ((x as NodeType).type === ASTType.product) {
            if (((x as ASTProductNode).children[0] as NodeType).type === ASTType.number) {
                c = _.cloneDeep((x as ASTProductNode).children[0]);
                n = new ASTProductNode((n as ASTProductNode).children.slice(1));
                hashNode(n as NodeType);
            }
        }
        if (map.has(n.hash!)) {
            const val = map.get(n.hash!);
            val?.mul.children.push(c);
        } else {
            map.set(n.hash!, { node: _.cloneDeep(n), mul: new ASTSummationNode([c]) });
        }
    }
    const children: ASTNode[] = [];
    map.forEach((pair) => {
        children.push(new ASTProductNode([pair.mul, pair.node]));
    });
    return new ASTSummationNode(children);
}

function smartSimplifyProduct(node: ASTProductNode): NodeType {
    const map = new Map<string, { node: ASTNode, exp: ASTSummationNode }>();
    for (const x of node.children) {
        let e: ASTNode = new ASTNumberNode(1);
        let n: ASTNode = _.cloneDeep(x);
        if ((x as NodeType).type === ASTType.power) {
            n = _.cloneDeep((x as ASTPowerNode).children[0]);
            e = _.cloneDeep((x as ASTPowerNode).children[1]);
            hashNode(n as NodeType);
        }
        if (map.has(n.hash!)) {
            const val = map.get(n.hash!);
            val?.exp.children.push(e);
        } else {
            map.set(n.hash!, { node: _.cloneDeep(n), exp: new ASTSummationNode([e]) });
        }
    }
    const children: ASTNode[] = [];
    map.forEach((pair) => {
        if (pair.exp.children.length === 1) {
            children.push(new ASTPowerNode([pair.node, pair.exp.children[0]]));
        } else {
            children.push(new ASTPowerNode([pair.node, pair.exp]));
        }
    });
    return new ASTProductNode(children);
}