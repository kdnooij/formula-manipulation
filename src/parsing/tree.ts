import { ASTNode } from './nodes/node';

export class AbstractSyntaxTree {
    public root: ASTNode;

    constructor(root: ASTNode) {
        this.root = root;
    }
}