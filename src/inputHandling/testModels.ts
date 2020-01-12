import { addToLog } from '../stores/console/actionCreators';
import { LogLine } from '../stores/console/state';
import store from '../stores/store';
import { execute } from './inputHandler';

export function testModel(i: number) {
    const tests = [
        { test: 'x*(x^2+x+1)', expected: 'x+x^2+x^3' },
        { test: '4*x^2+x+2*x^2+0', expected: 'x+6*x^2' },
        { test: '(x+2)^3', expected: '8+12*x+6*x^2+x^3' },
        { test: 'x/0', expected: 'the expression is undefined' },
        { test: '1/x^2', expected: 'x^(-2)' },
        { test: 'x^2*x^4*1', expected: 'x^6' },
        { test: '(x^2)^2+(5+2)*x', expected: '7*x+x^4' },
        { test: '4*x^3/x', expected: '4*x^2' },
        { test: '(x-x)+x^2*(x-2*x)', expected: '-1*x^3' },
        { test: '(x+1)*(x-1)', expected: '-1+x^2' },
    ];

    let results: LogLine[] = [];
    results = tests.map((test, index) => {
        const res = execute(`/model${i} ${test.test}`);
        if (res?.error) {
            return { isInput: false, line: `Test ${index + 1}: error ("${res.error}")`, isError: true };
        } else {
            const out = res?.output.split('Result: ')[1];
            if (test.expected === out) {
                return {
                    isError: false,
                    isInput: false,
                    line: `Test ${index + 1}: expected "${test.expected}", and got "${out}"`,
                };
            } else {
                return {
                    isError: true,
                    isInput: false,
                    line: `Test ${index + 1}: expected "${test.expected}", but got "${out}"`,
                };
            }
        }
    });
    results.forEach((res) => {
        store.dispatch(addToLog(res));
    });
}