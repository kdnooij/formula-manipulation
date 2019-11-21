import { ANTLRInputStream, CommonToken, CommonTokenStream } from 'antlr4ts';
import { ErrorListener } from './errorListener';
import { ExpressionLexer } from './generated/ExpressionLexer';
import { ExpressionParser, FileContext } from './generated/ExpressionParser';
import { ASTVisitor } from './visitor';

export class Parser {

    private _tree: FileContext;
    private _parser: ExpressionParser;
    private _lexer: ExpressionLexer;
    private _errorListener: ErrorListener;

    public constructor(str: string) {
        this._errorListener = new ErrorListener();
        // Create the lexer and parser
        const inputStream = new ANTLRInputStream(str);
        this._lexer = new ExpressionLexer(inputStream);
        const tokenStream = new CommonTokenStream(this._lexer);
        this._parser = new ExpressionParser(tokenStream);
        this._parser.addErrorListener(this._errorListener);

        // Parse the input, where `compilationUnit` is whatever entry point you defined
        this._tree = this._parser.file();
        if (this._errorListener.errors.length > 0) {
            throw this._errorListener.errors;
        }
    }

    public toString() {
        return this._tree.toStringTree(this._parser.ruleNames);
    }

    public getTree() {
        const visitor = new ASTVisitor();
        return visitor.visit(this._tree);
    }

    public getRuleNames() {
        return this._parser.ruleNames;
    }
}