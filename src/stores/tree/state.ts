import { FileContext } from '../../parsing/generated/ExpressionParser';
import { ASTNode } from '../../parsing/nodes/node';

export default interface State {
    history: Array<{ tree: ASTNode[], ruleNames: string[] }>;
    index: number;
}