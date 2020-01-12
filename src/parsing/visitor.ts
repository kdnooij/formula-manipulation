// tslint:disable-next-line:no-submodule-imports
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
// tslint:disable-next-line:no-submodule-imports
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import {
    AtomContext, ExpressionContext,
    FileContext, RelopContext, ScientificContext, VariableContext
} from './generated/ExpressionParser';
import { ExpressionVisitor } from './generated/ExpressionVisitor';
import { ASTExpressionNode, ASTOperator } from './nodes/expressionNode';
import { ASTNode, ASTType, NodeType } from './nodes/node';
import { ASTNullNode } from './nodes/nullNode';
import { ASTNumberNode } from './nodes/numberNode';
import { ASTSymbolNode } from './nodes/symbolNode';
import { ASTVariableNode } from './nodes/variableNode';

export class ASTVisitor
    extends AbstractParseTreeVisitor<NodeType[]>
    implements ExpressionVisitor<NodeType[]> {

    public defaultResult() {
        return [];
    }

    public aggregateResult(aggregate: NodeType[], nextResult: NodeType[]) {
        return [...aggregate, ...nextResult];
    }

    public visitVariable(context: VariableContext): NodeType[] {
        return [new ASTVariableNode(context.text)];
    }

    public visitScientific(context: ScientificContext): NodeType[] {
        return [new ASTNumberNode(parseFloat(context.text))];
    }

    public visitAtom(context: AtomContext): NodeType[] {
        return super.visitChildren(context);
    }

    public visitExpression(context: ExpressionContext): NodeType[] {
        const children = super.visitChildren(context);

        /* if (context.children) {
            if (children.length === 1 && context.children[0].text === '(') {
                return children;
            }
        } */
        // if (children.length === 1) {
        return [new ASTExpressionNode(ASTOperator.id, children)];
        // } else if (children.length === 2) {
        //     if (children[0].type === ASTType.symbol) {
        //         switch(children[0].type.)
        //     }
        // }
    }
    
    public visitFile(context: FileContext): NodeType[] {
        return super.visitChildren(context);
    }

    public visitRelop(context: RelopContext): NodeType[] {
        return super.visitChildren(context);
    }

    public visitTerminal(node: TerminalNode) {
        if (node.symbol.text) {
            return [new ASTSymbolNode(node.symbol.text)];
        }
        return [];
    }
}