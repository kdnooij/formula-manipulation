import { ASTNode, ASTType } from './node';

export class ASTNullNode extends ASTNode {
    public type: ASTType.null = ASTType.null;

    constructor() {
        super(ASTType.null, undefined);

    }
}