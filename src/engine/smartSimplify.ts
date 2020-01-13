import _ from 'lodash';
import { ASTNode, ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { hashNode } from './hashing';
import { orderNode } from './ordering';
import { removeSingles } from './removeSingles';

export function smartSimplify(node: NodeType): NodeType {
    node = orderNode(node);
    hashNode(node);
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // simplify children
        node.children = node.children.map((child) => smartSimplify(child));
    }

    let ret: NodeType;
    switch (node.type) {
        case ASTType.summation:
            ret = smartSimplifySummation(node);
            break;
        case ASTType.product:
            ret = smartSimplifyProduct(node);
            break;
        default:
            ret = node;
            break;
    }
    ret = removeSingles(ret);
    ret = orderNode(ret);
    hashNode(ret);
    return ret;
}

function smartSimplifySummation(node: ASTSummationNode): NodeType {
    const map = new Map<string, { node: NodeType, mul: ASTSummationNode }>();
    for (const x of node.children) {
        let c: NodeType = new ASTNumberNode(1);
        let n: NodeType = _.cloneDeep(x);
        if ((x).type === ASTType.product) {
            if (((x as ASTProductNode).children[0]).type === ASTType.number) {
                c = _.cloneDeep((x as ASTProductNode).children[0]);
                n = new ASTProductNode((n as ASTProductNode).children.slice(1));
                n = removeSingles(n);
                hashNode(n);
            }
        }
        if (map.has(n.hash!)) {
            const val = map.get(n.hash!);
            val?.mul.children.push(c);
        } else {
            map.set(n.hash!, { node: _.cloneDeep(n), mul: new ASTSummationNode([c]) });
        }
    }
    const children: NodeType[] = [];
    map.forEach((pair) => {
        if (pair.mul.children.length === 1) {
            if ((pair.mul.children[0]).type === ASTType.number &&
                (pair.mul.children[0] as ASTNumberNode).value === 1) {
                children.push(pair.node);
            } else {
                children.push(new ASTProductNode([pair.mul.children[0], pair.node]));
            }
        } else {
            children.push(new ASTProductNode([pair.mul, pair.node]));
        }
    });
    return new ASTSummationNode(children);
}

function smartSimplifyProduct(node: ASTProductNode): NodeType {
    const map = new Map<string, { node: NodeType, exp: ASTSummationNode }>();
    for (const x of node.children) {
        let e: NodeType = new ASTNumberNode(1);
        let n: NodeType = _.cloneDeep(x);
        if ((x).type === ASTType.power) {
            n = _.cloneDeep((x as ASTPowerNode).children[0]);
            e = _.cloneDeep((x as ASTPowerNode).children[1]);
            hashNode(n);
        }
        if (map.has(n.hash!)) {
            const val = map.get(n.hash!);
            val?.exp.children.push(e);
        } else {
            map.set(n.hash!, { node: _.cloneDeep(n), exp: new ASTSummationNode([e]) });
        }
    }
    const children: NodeType[] = [];
    map.forEach((pair) => {
        if (pair.exp.children.length === 1) {
            if ((pair.exp.children[0]).type === ASTType.number &&
                (pair.exp.children[0] as ASTNumberNode).value === 1) {
                children.push(pair.node);
            } else {
                children.push(new ASTPowerNode([pair.node, pair.exp.children[0]]));
            }
        } else {
            children.push(new ASTPowerNode([pair.node, pair.exp]));
        }
    });
    return new ASTProductNode(children);
}