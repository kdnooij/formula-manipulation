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
import { ASTNode, ASTType } from './nodes/node';
import { ASTNullNode } from './nodes/nullNode';
import { ASTNumberNode } from './nodes/numberNode';
import { ASTSymbolNode } from './nodes/symbolNode';
import { ASTVariableNode } from './nodes/variableNode';

export class ASTVisitor
    extends AbstractParseTreeVisitor<ASTNode[]>
    implements ExpressionVisitor<ASTNode[]> {

    public defaultResult() {
        return [];
    }

    public aggregateResult(aggregate: ASTNode[], nextResult: ASTNode[]) {
        return [...aggregate, ...nextResult];
    }

    public visitVariable(context: VariableContext): ASTNode[] {
        return [new ASTVariableNode(context.text)];
    }

    public visitScientific(context: ScientificContext): ASTNode[] {
        return [new ASTNumberNode(parseFloat(context.text))];
    }

    public visitAtom(context: AtomContext): ASTNode[] {
        return super.visitChildren(context);
    }

    public visitExpression(context: ExpressionContext): ASTNode[] {
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
    
    public visitFile(context: FileContext): ASTNode[] {
        return super.visitChildren(context);
    }

    public visitRelop(context: RelopContext): ASTNode[] {
        return super.visitChildren(context);
    }

    public visitTerminal(node: TerminalNode) {
        if (node.symbol.text) {
            return [new ASTSymbolNode(node.symbol.text)];
        }
        return [];
    }
}