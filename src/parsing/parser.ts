import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { ExpressionLexer } from './generated/ExpressionLexer';
import { ExpressionParser, FileContext } from './generated/ExpressionParser';

export class Parser {

    private _tree: FileContext;
    private _parser: ExpressionParser;
    private _lexer: ExpressionLexer;

    public constructor(str: string) {
        // Create the lexer and parser
        const inputStream = new ANTLRInputStream(str);
        this._lexer = new ExpressionLexer(inputStream);
        const tokenStream = new CommonTokenStream(this._lexer);
        this._parser = new ExpressionParser(tokenStream);
    
        // Parse the input, where `compilationUnit` is whatever entry point you defined
        this._tree = this._parser.file();
    }

    public toString() {
        return this._tree.toStringTree(this._parser.ruleNames);
    }

    public getTree() {
        return this._tree;
    }

    public getRuleNames() {
        return this._parser.ruleNames;
    }
}