import _ from 'lodash';
import { applyAssociative } from '../engine/assocative';
import { removeBrackets } from '../engine/brackets';
import { hashNode } from '../engine/hashing';
import { removeIdentities } from '../engine/identity';
import { likeTerms } from '../engine/likeTerms';
import { applyNumerical } from '../engine/numerical';
import { orderNode } from '../engine/ordering';
import { powerSimplify } from '../engine/power';
import { printNode } from '../engine/printing';
import { NodeType, simplifyInput } from '../engine/simplification';
import { smartSimplify } from '../engine/smartSimplify';
import { isUndefined } from '../engine/undefined';
import { ParserError } from '../parsing/errorListener';
import { ASTNode, ASTType } from '../parsing/nodes/node';
import { Parser } from '../parsing/parser';
import { clearHistory as clearConsoleHistory } from '../stores/console/actionCreators';
import store from '../stores/store';
import { clearHistory as clearTreeHistory, updateTree } from '../stores/tree/actionCreators';
import { getTree } from '../stores/tree/selectors';

export function execute(input: string): { output: string, error?: string } | undefined {
    const tokens = input.split(' ');
    switch (tokens[0]) {
        case '/clear':
            store.dispatch(clearConsoleHistory());
            store.dispatch(clearTreeHistory());
            return;
        case '/parse':
            try {
                const parser = new Parser(tokens.slice(1).join(' '));
                store.dispatch(updateTree(parser.getTree(), parser.getRuleNames()));
                return { output: 'parsed: ' + parser.toString() };
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        case '/p':
            try {
                const parser = new Parser(tokens.slice(1).join(' '));
                const newTree = simplifyInput(parser.getTree()[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], parser.getRuleNames()));
                }
                return { output: 'parsed: ' + parser.toString() };
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        case '/simplify': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = simplifyInput(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Simplified to: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to simplify` };
            }
        }
        case '/associative': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = applyAssociative(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/identity': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = removeIdentities(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/power': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = powerSimplify(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/brackets': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = removeBrackets(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/defined': {
            const tree = _.cloneDeep(getTree(store.getState()));
            const check = _.cloneDeep(getTree(store.getState()));
            if (tree && check) {
                if ((isUndefined(check.tree[0] as NodeType) as NodeType).type === ASTType.null) {
                    return { output: 'Result: the expression is undefined' };
                }
                return { output: 'Result: ' + printNode(tree.tree[0] as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/numerical': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = applyNumerical(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/order': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = orderNode(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/likeTerms': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = likeTerms(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/model1': {
            try {
                const parser = new Parser(tokens.slice(1).join(' '));
                store.dispatch(updateTree(parser.getTree(), parser.getRuleNames()));
                const tree = _.cloneDeep(store.dispatch(updateTree(parser.getTree(), parser.getRuleNames())));
                if (tree) {
                    const newTree = simplifyInput(tree.tree[0] as NodeType);
                    if (newTree) {
                        store.dispatch(updateTree([newTree], tree.ruleNames));
                    }
                    let root = _.cloneDeep(newTree);
                    const check = _.cloneDeep(newTree);
                    for (let i = 0; i < 100; i++) {
                        if (check && (isUndefined(check) as NodeType).type === ASTType.null) {
                            return { output: 'Result: the expression is undefined' };
                        }
                        if (root) {
                            root = applyAssociative(root as NodeType);
                            root = removeIdentities(root as NodeType);
                            root = powerSimplify(root as NodeType);
                            root = removeBrackets(root as NodeType);
                            root = likeTerms(root as NodeType);
                            root = applyNumerical(root as NodeType);
                        }
                    }
                    return { output: 'Result: ' + printNode(root as NodeType) };
                } else {
                    return { output: '', error: `Nothing to apply rule to` };
                }
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        }
        case '/model2': {
            try {
                const parser = new Parser(tokens.slice(1).join(' '));
                let newTree = simplifyInput(parser.getTree()[0] as NodeType);

                let lastHash;
                hashNode(newTree);
                newTree = smartSimplify(newTree as NodeType);
                newTree = orderNode(newTree as NodeType);
                hashNode(newTree);

                while (lastHash !== newTree?.hash) {
                    lastHash = newTree?.hash;
                    newTree = applyAssociative(newTree as NodeType);
                    newTree = removeIdentities(newTree as NodeType);
                    newTree = applyNumerical(newTree as NodeType);
                    newTree = powerSimplify(newTree as NodeType);
                    newTree = orderNode(newTree as NodeType);
                    hashNode(newTree as NodeType);
                    newTree = smartSimplify(newTree as NodeType);
                    newTree = applyAssociative(newTree as NodeType);
                    newTree = removeIdentities(newTree as NodeType);
                    newTree = applyNumerical(newTree as NodeType);
                    newTree = powerSimplify(newTree as NodeType);
                    newTree = orderNode(newTree as NodeType);
                    hashNode(newTree);
                }

                if (newTree) {
                    store.dispatch(updateTree([newTree], parser.getRuleNames()));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        }
        case '/smart': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = smartSimplify(tree.tree[0] as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/hash': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = tree.tree[0];
                hashNode(newTree as NodeType);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree as NodeType) };
            } else {
                return { output: '', error: `Nothing to apply hashing to` };
            }
        }
        default:
            return { output: '', error: `Command '${tokens[0]}' not recognized` };
    }

}