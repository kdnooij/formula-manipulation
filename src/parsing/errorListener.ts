/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { ANTLRErrorListener, CommonToken, RecognitionException, Recognizer, Token } from 'antlr4ts';
// tslint:disable-next-line:no-submodule-imports
import { Override } from 'antlr4ts/Decorators';

export interface ParserResult {
    // tslint:disable-next-line:no-any
    ast: any;
    errors: ParserError[];
}

export interface ParserError {
    line: number;
    start: number;
    end: number;
    message: string;
    level: ParseErrorLevel;
}

export enum ParseErrorLevel {
    ERROR,
    WARNING
}

export class ErrorListener implements ANTLRErrorListener<CommonToken> {
    public errors: ParserError[] = [];

    public addError(error: ParserError) {
        this.errors.push(error);
    }

    public syntaxError<T extends Token>(
        // tslint:disable-next-line:no-any
        _recognizer: Recognizer<T, any>,
        offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        _e: RecognitionException | undefined
    ): void {
        // _e contains the first token of the rule that failed
        if (offendingSymbol && offendingSymbol.text) {
            if (offendingSymbol.text === ')') {
                this.errors.push({
                    end: charPositionInLine + offendingSymbol.text.length,
                    level: ParseErrorLevel.ERROR,
                    line: line - 1,
                    message: 'Expecting arguments before symbol )',
                    start: charPositionInLine,
                });
            } else {
                this.errors.push({
                    end: charPositionInLine + offendingSymbol.text.length,
                    level: ParseErrorLevel.ERROR,
                    line: line - 1,
                    message: msg,
                    start: charPositionInLine,
                });
            }
        }
    }
}