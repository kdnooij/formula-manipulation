import _ from 'lodash';
import { ASTType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { NodeType } from './simplification';

export function removeIdentities(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // Remove identities from children
        node.children = node.children.map((child) => removeIdentities(child as NodeType));
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
        if ((child as NodeType).type === ASTType.number
            && (child as ASTNumberNode).value === 0) {
            return undefined;
        } else {
            return child;
        }
    }));

    if (node.children.length === 0) {
        return new ASTNumberNode(0);
    } else if (node.children.length === 1) {
        return node.children[0] as NodeType;
    } else {
        return node;
    }
}

function removeIdentitiesProduct(node: ASTProductNode) {
    node.children = _.compact(node.children.map((child) => {
        // Remove a child if it is has value 1
        if ((child as NodeType).type === ASTType.number
            && (child as ASTNumberNode).value === 1) {
            return undefined;
        } else {
            return child;
        }
    }));

    const children = node.children;
    // tslint:disable-next-line:prefer-for-of
    for (let _i = 0; _i < children.length; _i++) {
        if ((children[_i] as NodeType).type === ASTType.number && (children[_i] as ASTNumberNode).value === 0) {
            return new ASTNumberNode(0);
        }
    }
    if (node.children.length === 0) {
        return new ASTNumberNode(1);
    } else if (node.children.length === 1) {
        return node.children[0] as NodeType;
    } else {
        return node;
    }
}

function removeIdentitiesPower(node: ASTPowerNode) {
    const base = node.children[0] as NodeType;
    const exp = node.children[1] as NodeType;

    if (base.type === ASTType.number && exp.type === ASTType.number) {
        if (exp.value === 0) {
            return new ASTNumberNode(1);
        } else if (exp.value === 1) {
            return base;
        }

        if (base.value === 1 || base.value === 0) {
            return base;
        }
    }
    
    return node;
}