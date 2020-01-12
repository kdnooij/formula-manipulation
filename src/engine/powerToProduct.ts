import { ASTNode, ASTType, NodeType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';

export function powerToProduct(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        node.children = node.children.map((child) => powerToProduct(child));
    }
    if (node.type === ASTType.power && (node.children[1]).type === ASTType.number &&
        Number.isInteger((node.children[1] as ASTNumberNode).value) &&
        (node.children[1] as ASTNumberNode).value > 1) {
        if ((node.children[0]).type === ASTType.variable &&
            (node.children[0] as ASTVariableNode).variable === 'x') {
            return node;
        }
        const newNode = new ASTProductNode([node.children[0],
        new ASTPowerNode([node.children[0],
        new ASTNumberNode((node.children[1] as ASTNumberNode).value - 1)])]);
        return newNode;
    }
    return node;
}