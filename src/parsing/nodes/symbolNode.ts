import { ASTNode, ASTType } from './node';

export class ASTSymbolNode extends ASTNode {
    public symbol: string;
    public type: ASTType.symbol = ASTType.symbol;

    constructor(symbol: string) {
        super(ASTType.symbol, undefined);
        this.symbol = symbol;
        this.name = symbol;
    }
}