import { FileContext } from '../../parsing/generated/ExpressionParser';

export default interface State {
    history: Array<{ tree: FileContext, ruleNames: string[] }>;
    index: number;
}