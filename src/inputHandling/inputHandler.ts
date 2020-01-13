import _ from 'lodash';
import { applyAssociative } from '../engine/assocative';
import { removeBrackets } from '../engine/brackets';
import { differentiate } from '../engine/differentiate';
import { endPrint } from '../engine/finalPrint';
import { hashNode } from '../engine/hashing';
import { removeIdentities } from '../engine/identity';
import { likeTerms } from '../engine/likeTerms';
import { applyNumerical } from '../engine/numerical';
import { orderNode } from '../engine/ordering';
import { powerSimplify } from '../engine/power';
import { powerToProduct } from '../engine/powerToProduct';
import { prettyPrintNode, printNode } from '../engine/printing';
import { removeSingles } from '../engine/removeSingles';
import { simplifyInput } from '../engine/simplification';
import { smartSimplify } from '../engine/smartSimplify';
import { toPolynomial } from '../engine/toPolynomial';
import { isUndefined } from '../engine/undefined';
import { ParserError } from '../parsing/errorListener';
import { ASTNode, ASTType, NodeType } from '../parsing/nodes/node';
import { Parser } from '../parsing/parser';
import { clearHistory as clearConsoleHistory } from '../stores/console/actionCreators';
import store from '../stores/store';
import { clearHistory as clearTreeHistory, updateTree } from '../stores/tree/actionCreators';
import { getTree } from '../stores/tree/selectors';
import { testModel } from './testModels';

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
                const newTree = simplifyInput(parser.getTree()[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], parser.getRuleNames()));
                }
                return { output: 'parsed: ' + parser.toString() };
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        case '/d': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = differentiate(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/simplify': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = simplifyInput(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Simplified to: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to simplify` };
            }
        }
        case '/associative': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = applyAssociative(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/identity': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = removeIdentities(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/power': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = powerSimplify(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/brackets': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = removeBrackets(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/defined': {
            const tree = _.cloneDeep(getTree(store.getState()));
            const check = _.cloneDeep(getTree(store.getState()));
            if (tree && check) {
                if ((isUndefined(check.tree[0])).type === ASTType.null) {
                    return { output: 'Result: the expression is undefined' };
                }
                return { output: 'Result: ' + prettyPrintNode(tree.tree[0]) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/numerical': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = applyNumerical(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/order': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = orderNode(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/likeTerms': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = likeTerms(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
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
                    const newTree = simplifyInput(tree.tree[0]);
                    if (newTree) {
                        store.dispatch(updateTree([newTree], tree.ruleNames));
                    }
                    let root = _.cloneDeep(newTree);
                    const check = _.cloneDeep(newTree);
                    for (let i = 0; i < 100; i++) {
                        if (check && (isUndefined(check)).type === ASTType.null) {
                            return { output: 'Result: the expression is undefined' };
                        }
                        if (root) {
                            root = applyAssociative(root);
                            root = removeIdentities(root);
                            root = powerSimplify(root);
                            root = removeBrackets(root);
                            root = likeTerms(root);
                            root = applyNumerical(root);
                        }
                    }
                    return { output: 'Result: ' + prettyPrintNode(root) };
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
                let newTree = simplifyInput(parser.getTree()[0]);
                if (newTree) {
                    newTree = orderNode(newTree);
                    hashNode(newTree);
                    let lastHash;
                    // Do smart simplification
                    while (lastHash !== newTree?.hash) {
                        const check = _.cloneDeep(newTree);
                        if (check && isUndefined(check).type === ASTType.null) {
                            return { output: 'Result: the expression is undefined' };
                        }
                        lastHash = newTree?.hash;
                        newTree = applyAssociative(newTree);
                        newTree = removeIdentities(newTree);
                        newTree = applyNumerical(newTree);
                        newTree = powerSimplify(newTree);
                        newTree = smartSimplify(newTree);
                        newTree = removeSingles(newTree);
                        newTree = orderNode(newTree);
                        hashNode(newTree);
                    }
                    lastHash = undefined;
                    newTree = orderNode(newTree);
                    hashNode(newTree);
                    // Do basic simplification
                    while (lastHash !== newTree?.hash) {
                        lastHash = newTree?.hash;
                        newTree = applyAssociative(newTree);
                        newTree = removeIdentities(newTree);
                        newTree = applyNumerical(newTree);
                        newTree = powerSimplify(newTree);
                        newTree = orderNode(newTree);
                        hashNode(newTree);
                    }

                    if (newTree) {
                        store.dispatch(updateTree([_.cloneDeep(newTree)], parser.getRuleNames()));
                    }
                    return { output: 'Result: ' + prettyPrintNode(newTree) };
                } else {
                    return { output: '', error: `Nothing to apply rule to` };
                }
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        }
        case '/model2*': {
            try {
                const variable = tokens[1];
                const parser = new Parser(tokens.slice(2).join(' '));
                let newTree = simplifyInput(parser.getTree()[0]);
                if (newTree) {
                    newTree = orderNode(newTree);
                    hashNode(newTree);
                    let lastHash;
                    // Do smart simplification
                    while (lastHash !== newTree?.hash) {
                        const check = _.cloneDeep(newTree);
                        if (check && isUndefined(check).type === ASTType.null) {
                            return { output: 'Result: the expression is undefined' };
                        }
                        lastHash = newTree?.hash;
                        newTree = applyAssociative(newTree);
                        newTree = removeIdentities(newTree);
                        newTree = applyNumerical(newTree);
                        newTree = powerSimplify(newTree);
                        const res = toPolynomial(newTree, variable);
                        if (res.flag === 'nonpoly') {
                            return { output: '', error: 'Could not convert to polynomial' };
                        }
                        newTree = res.node;
                        newTree = smartSimplify(newTree);
                        newTree = removeSingles(newTree);
                        newTree = orderNode(newTree);
                        hashNode(newTree);
                    }
                    lastHash = undefined;
                    newTree = orderNode(newTree);
                    hashNode(newTree);
                    // Do basic simplification
                    while (lastHash !== newTree?.hash) {
                        lastHash = newTree?.hash;
                        newTree = applyAssociative(newTree);
                        newTree = removeIdentities(newTree);
                        newTree = applyNumerical(newTree);
                        newTree = powerSimplify(newTree);
                        newTree = orderNode(newTree);
                        hashNode(newTree);
                    }

                    if (newTree) {
                        store.dispatch(updateTree([_.cloneDeep(newTree)], parser.getRuleNames()));
                    }
                    return { output: 'Result: ' + prettyPrintNode(newTree) };
                } else {
                    return { output: '', error: `Nothing to apply rule to` };
                }
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        }
        case '/poly': {
            const variable = tokens.slice(1).join(' ');
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const res = toPolynomial(tree.tree[0], variable);
                switch (res.flag) {
                    case 'constant':
                        store.dispatch(updateTree([res.node], tree.ruleNames));
                        return { output: 'Reduced to constant: ' + prettyPrintNode(res.node) };
                    case 'term':
                        store.dispatch(updateTree([res.node], tree.ruleNames));
                        return { output: 'Reduced to single term: ' + prettyPrintNode(res.node) };
                    case 'poly':
                        store.dispatch(updateTree([res.node], tree.ruleNames));
                        return { output: 'Converted to polynomial: ' + prettyPrintNode(res.node) };
                    case 'nonpoly':
                    default:
                        return { output: '', error: 'Could not convert to polynomial' };
                }
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/smart': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = smartSimplify(tree.tree[0]);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + prettyPrintNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply rule to` };
            }
        }
        case '/hash': {
            const tree = _.cloneDeep(getTree(store.getState()));
            if (tree) {
                const newTree = tree.tree[0];
                hashNode(newTree);
                if (newTree) {
                    store.dispatch(updateTree([newTree], tree.ruleNames));
                }
                return { output: 'Result: ' + printNode(newTree) };
            } else {
                return { output: '', error: `Nothing to apply hashing to` };
            }
        }
        case '/test': {
            const i = tokens.slice(1).join(' ');
            const tree = _.cloneDeep(getTree(store.getState()));
            testModel(i);
            return { output: 'Tested model ' + i };
        }
        case '/model3': {
            try {
                const parser = new Parser(tokens.slice(1).join(' '));
                store.dispatch(updateTree(parser.getTree(), parser.getRuleNames()));
                const tree = _.cloneDeep(store.dispatch(updateTree(parser.getTree(), parser.getRuleNames())));
                if (tree) {
                    const newTree = simplifyInput(tree.tree[0]);
                    if (newTree) {
                        store.dispatch(updateTree([newTree], tree.ruleNames));
                        const derivativeTree = differentiate(newTree);
                        let root = _.cloneDeep(derivativeTree);
                        const check = _.cloneDeep(derivativeTree);
                        for (let i = 0; i < 100; i++) {
                            if (check && (isUndefined(check)).type === ASTType.null) {
                                return { output: 'Result: the expression is undefined' };
                            }
                            if (root) {
                                root = applyAssociative(root);
                                root = removeIdentities(root);
                                root = powerSimplify(root);
                                root = removeBrackets(root);
                                root = likeTerms(root);
                                root = applyNumerical(root);

                            }
                        }
                        root = endPrint(root);
                        return { output: 'Result: ' + prettyPrintNode(root) };
                    }
                    return { output: '', error: `Nothing to apply rule to` };
                } else {
                    return { output: '', error: `Nothing to apply rule to` };
                }
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        }
        case '/model3*': {
            try {
                const parser = new Parser(tokens.slice(1).join(' '));
                const newTree = simplifyInput(parser.getTree()[0]);
                if (newTree) {
                    let derivativeTree = differentiate(newTree);
                    derivativeTree = orderNode(derivativeTree);
                    hashNode(derivativeTree);
                    let lastHash;
                    // Do smart simplification
                    while (lastHash !== derivativeTree?.hash) {
                        const check = _.cloneDeep(derivativeTree);
                        if (check && isUndefined(check).type === ASTType.null) {
                            return { output: 'Result: the expression is undefined' };
                        }
                        lastHash = derivativeTree?.hash;
                        derivativeTree = applyAssociative(derivativeTree);
                        derivativeTree = removeIdentities(derivativeTree);
                        derivativeTree = applyNumerical(derivativeTree);
                        derivativeTree = powerSimplify(derivativeTree);
                        derivativeTree = smartSimplify(derivativeTree);
                        derivativeTree = removeSingles(derivativeTree);
                        derivativeTree = orderNode(derivativeTree);
                        hashNode(derivativeTree);
                    }
                    lastHash = undefined;
                    derivativeTree = orderNode(derivativeTree);
                    hashNode(derivativeTree);
                    // Do basic simplification
                    while (lastHash !== derivativeTree?.hash) {
                        lastHash = derivativeTree?.hash;
                        derivativeTree = applyAssociative(derivativeTree);
                        derivativeTree = removeIdentities(derivativeTree);
                        derivativeTree = applyNumerical(derivativeTree);
                        derivativeTree = powerSimplify(derivativeTree);
                        derivativeTree = orderNode(derivativeTree);
                        hashNode(derivativeTree);
                    }

                    if (derivativeTree) {
                        store.dispatch(updateTree([_.cloneDeep(derivativeTree)], parser.getRuleNames()));
                    }
                    return { output: 'Result: ' + prettyPrintNode(derivativeTree) };
                } else {
                    return { output: '', error: `Nothing to apply rule to` };
                }
            } catch (err) {
                return { output: '', error: err.map((e: ParserError) => e.message).join('\n') };
            }
        }
        default:
            return { output: '', error: `Command '${tokens[0]}' not recognized` };
    }

}