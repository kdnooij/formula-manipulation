import _ from 'lodash';
import { ASTType, NodeType } from '../parsing/nodes/node';
import { ASTPowerNode } from '../parsing/nodes/powerNode';
import { ASTProductNode } from '../parsing/nodes/productNode';
import { ASTSummationNode } from '../parsing/nodes/summationNode';
import { hashNode } from './hashing';
import { orderNode } from './ordering';
import { powerToProduct, powerToProduct2 } from './powerToProduct';
import { smartSimplify } from './smartSimplify';

// export type PolyType = NodeType & {
//     polyType: 'poly' | 'nonpoly' | 'constant';
// };

// export function toPolyType(node: NodeType, variable: string): PolyType {
//     switch (node.type) {
//         case ASTType.null:
//             throw new Error('Cannot convert to polynomial');
//         case ASTType.expression:
//             throw new Error('Cannot convert to polynomial');
//         case ASTType.symbol:
//             throw new Error('Cannot convert to polynomial');
//         case ASTType.number:
//             return { ...node, polyType: 'constant' };
//         case ASTType.variable:
//             return node.variable === variable ?
//                 { ...node, polyType: 'poly' } :
//                 { ...node, polyType: 'constant' };
//         case ASTType.summation:
//             const polyTypeChildren = node.children
//                 .map((child) => toPolyType(child, variable));
//             if (polyTypeChildren.every((child) => child.polyType === 'constant')) {
//                 return { ...node, children: polyTypeChildren, polyType: 'constant' };
//             } else if (polyTypeChildren
//                 .every((child) => child.polyType === 'poly' || child.polyType === 'constant')) {
//                 return { ...node, children: polyTypeChildren, polyType: 'poly' };
//             } else {
//                 return { ...node, children: polyTypeChildren, polyType: 'nonpoly' };
//             }
//         case ASTType.power:
//             const base = toPolyType(node.children[0], variable);
//             const exp = toPolyType(node.children[1], variable);
//             if (base.polyType === 'constant' && exp.polyType === 'constant') {
//                 return { ...node, children: [base, exp], polyType: 'constant' };
//             } else if () { }
//         default:
//             throw new Error('Cannot convert to polynomial');
//     }
// }

export type PolyFlag = 'constant' | 'nonpoly' | 'poly' | 'term';

export function toPolynomial(node: NodeType, variable: string): { node: NodeType, flag: PolyFlag } {
    const childFlags: PolyFlag[] = [];
    if (node.type === ASTType.summation || node.type === ASTType.product || node.type === ASTType.power) {
        node.children = node.children.map((child) => {
            const res = toPolynomial(child, variable);
            childFlags.push(res.flag);
            return res.node;
        });
    }

    switch (node.type) {
        case ASTType.number:
            return { node, flag: 'constant' };
        case ASTType.variable:
            return { node, flag: node.variable === variable ? 'term' : 'constant' };
        case ASTType.power: {
            if (childFlags[0] === 'constant' && childFlags[1] === 'constant') {
                return { node, flag: 'constant' };
            } else if (childFlags[0] === 'term' && childFlags[1] === 'constant') {
                return { node, flag: 'term' };
            } else if (childFlags[0] === 'poly' && childFlags[1] === 'constant') {
                node = powerToProduct2(node);
                if (node.type === ASTType.product) {
                    return toPolynomial(node, variable);
                } else {
                    return { node, flag: 'nonpoly' };
                }
            } else {
                return { node, flag: 'nonpoly' };
            }
        }
        case ASTType.product: {
            if (childFlags.some((flag, i) => flag === 'nonpoly' ||
                (flag === 'poly' && (node as ASTProductNode).children[i].type !== ASTType.summation))) {
                return { node, flag: 'nonpoly' };
            }
            const constants = node.children.filter((child, i) => childFlags[i] === 'constant');
            const terms = node.children.filter((child, i) => childFlags[i] === 'term');
            let term: NodeType | undefined;
            if (terms.length > 0) {
                term = mergeTerms(terms);
            }
            const sums = node.children.filter((child, i) =>
                child.type === ASTType.summation && childFlags[i] === 'poly') as ASTSummationNode[];
            let sum: ASTSummationNode | undefined;
            if (sums.length > 0) {
                sum = multiplySums([...sums, ...(term ? [new ASTSummationNode([term])] : [])]);
            }

            if (sum) {
                node = distribute(constants, sum);
                return { node: toPolynomial(node, variable).node, flag: 'poly' };
            } else if (term) {
                node.children = [...constants, term];
                return { node, flag: 'term' };
            } else {
                return { node, flag: 'constant' };
            }
        }
        case ASTType.summation: {
            if (childFlags.some((flag) => flag === 'nonpoly')) {
                return { node, flag: 'nonpoly' };
            }
            if (childFlags.every((flag) => flag === 'constant')) {
                return { node, flag: 'constant' };
            }
            if (childFlags.every((flag) => flag === 'term' || flag === 'constant')) {
                return { node, flag: 'poly' };
            }
            const terms = node.children.filter((child, i) =>
                childFlags[i] === 'constant' || childFlags[i] === 'term');
            const sums = node.children.filter((child, i) =>
                childFlags[i] === 'poly' && child.type === ASTType.summation
            ) as ASTSummationNode[];
            node.children = [...terms, ..._.flatten(sums.map((sum) => sum.children))];
            return { node, flag: 'poly' };
        }

        default:
            throw new Error('Cannot convert to polynomial');
    }
}

function mergeTerms(terms: NodeType[]): NodeType {
    if (terms.length === 1) {
        return terms[0];
    }
    let node: NodeType = new ASTProductNode(terms);
    node = smartSimplify(node);
    return node;
}

function multiplySums(sums: ASTSummationNode[]): ASTSummationNode {
    // let terms: NodeType[] = [];
    if (sums.length === 1) {
        return sums[0];
    } else {
        return new ASTSummationNode(_.flatten(sums[0].children.map((child0) =>
            multiplySums(sums.slice(1)).children.map((child1) =>
                new ASTProductNode([child0, child1])
            )
        )));
    }
}

function distribute(constants: NodeType[], terms: ASTSummationNode): ASTSummationNode {
    return new ASTSummationNode(terms.children.map((child) => {
        if (child.type === ASTType.product) {
            child.children = [...constants, ...child.children];
            return child;
        } else if (constants.length === 0) {
            return child;
        } else {
            return new ASTProductNode([...constants, child]);
        }
    }));
}