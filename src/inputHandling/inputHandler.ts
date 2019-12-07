import _ from 'lodash';
import { applyAssociative } from '../engine/assocative';
import { removeIdentities } from '../engine/identity';
import { applyNumerical } from '../engine/numerical';
import { orderNode } from '../engine/ordering';
import { printNode } from '../engine/printing';
import { NodeType, simplifyInput } from '../engine/simplification';
import { ParserError } from '../parsing/errorListener';
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
        default:
            return { output: '', error: `Command '${tokens[0]}' not recognized` };
    }

}