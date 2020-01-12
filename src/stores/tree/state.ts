import { FileContext } from '../../parsing/generated/ExpressionParser';
import { ASTNode, NodeType } from '../../parsing/nodes/node';

export default interface State {
    history: Array<{ tree: NodeType[], ruleNames: string[] }>;
    index: number;
}