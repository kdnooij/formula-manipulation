import { ASTNode, ASTType } from '../parsing/nodes/node';
import { ASTNumberNode } from '../parsing/nodes/numberNode';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTVariableNode } from '../parsing/nodes/variableNode';
import { NodeType } from './simplification';

export function powerToProduct(node: NodeType): NodeType {
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        node.children = node.children.map((child) => powerToProduct(child as NodeType));
    }
    if (node.type === ASTType.power && (node.children[1] as NodeType).type === ASTType.number &&
         Number.isInteger((node.children[1] as ASTNumberNode).value) &&
         (node.children[1] as ASTNumberNode).value > 1) {
            if ((node.children[0] as NodeType).type === ASTType.variable && 
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