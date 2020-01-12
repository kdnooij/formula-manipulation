import _ from 'lodash';
import { ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export function endPrint(node: NodeType) {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        // Apply rule to all children
        node.children = node.children.map((child) =>
            endPrint(child));

        // case of summation
        if (node.type === ASTType.summation) {
            return endPrintSum(node);
        }

         // case of product
        if (node.type === ASTType.product) {
            return endPrintProduct(node);
        }

         /* // case of power
        if (node.type === ASTType.power) {
            return endPrintPower(node);
        }
        */
    }

    return node;
}

function endPrintSum(node: ASTSummationNode) {
    return node;
}

function endPrintProduct(node: ASTProductNode) {
    if (node.children.length === 2) {
        const child1 = node.children[0];
        const child2 = node.children[1];

        if ((child1.type === ASTType.number) && (child2.type === ASTType.variable) && 
        (child1.value < 0)) {
            return new ASTVariableNode('-' + child2.variable);
        }
    }
    return node;
}

/*
function endPrintPower(node: ASTPowerNode) {
    if (node.children.length === 2) {
        const child2 = node.children[0];
        const child1 = node.children[1];

        if ((child1.type === ASTType.number) && (child2.type === ASTType.variable) && 
        (child1.value < 0)) {
            if (child1.value === -1) {
                const absPower = -child1.value;
                return new ASTVariableNode('1/' + child2.variable);
            } else {
                const absPower = -child1.value;
                return new ASTVariableNode('(1/' + child2.variable + ')^' + absPower);
            }
        }
    }
    return node;
}
*/