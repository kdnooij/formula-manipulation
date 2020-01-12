import _ from 'lodash';
import { ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';

export function removeIdentities(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // Remove identities from children
        node.children = node.children.map((child) => removeIdentities(child));
    }

    // Case of summation
    if (node.type === ASTType.summation) {
        return removeIdentitiesSummation(node);
    }

    // Case of product

    if (node.type === ASTType.product) {
        return removeIdentitiesProduct(node);
    }

    // Case of power

    if (node.type === ASTType.power) {
        return removeIdentitiesPower(node);
    }

    // Otherwise

    return node;
}

function removeIdentitiesSummation(node: ASTSummationNode) {
    node.children = _.compact(node.children.map((child) => {
        // Remove a child if it is a zero value
        if ((child).type === ASTType.number
            && (child as ASTNumberNode).value === 0) {
            return undefined;
        } else {
            return child;
        }
    }));

    if (node.children.length === 0) {
        return new ASTNumberNode(0);
    } else if (node.children.length === 1) {
        return node.children[0];
    } else {
        return node;
    }
}

function removeIdentitiesProduct(node: ASTProductNode) {
    node.children = _.compact(node.children.map((child) => {
        // Remove a child if it is has value 1
        if ((child).type === ASTType.number
            && (child as ASTNumberNode).value === 1) {
            return undefined;
        } else {
            return child;
        }
    }));

    const children = node.children;
    // tslint:disable-next-line:prefer-for-of
    for (let _i = 0; _i < children.length; _i++) {
        if ((children[_i]).type === ASTType.number && (children[_i] as ASTNumberNode).value === 0) {
            return new ASTNumberNode(0);
        }
    }

    if (node.children.length === 0) {
        return new ASTNumberNode(0);
    } else  if (node.children.length === 1) {
        return node.children[0];
    } else {
        return node;
    }
}

function removeIdentitiesPower(node: ASTPowerNode) {
    const base = node.children[0];
    const exp = node.children[1];

    // if (base.type === ASTType.number && exp.type === ASTType.number) {
    if (exp.type === ASTType.number) {
        if (exp.value === 0) {
            return new ASTNumberNode(1);
        } else if (exp.value === 1) {
            return base;
        }
    }

    if (base.type === ASTType.number) {
        if (base.value === 1 || base.value === 0) {
            return base;
        }
    }
    // }
    
    return node;
}