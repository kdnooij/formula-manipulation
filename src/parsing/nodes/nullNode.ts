import { ASTNode, ASTType } from './node';

export class ASTNullNode extends ASTNode {
    constructor() {
        super(ASTType.null, undefined);
    }
}