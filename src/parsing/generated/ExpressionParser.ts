// Generated from src/parsing/grammars/Expression.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ExpressionListener } from "./ExpressionListener";
import { ExpressionVisitor } from "./ExpressionVisitor";


export class ExpressionParser extends Parser {
	public static readonly VARIABLE = 1;
	public static readonly SCIENTIFIC_NUMBER = 2;
	public static readonly LPAREN = 3;
	public static readonly RPAREN = 4;
	public static readonly PLUS = 5;
	public static readonly MINUS = 6;
	public static readonly TIMES = 7;
	public static readonly DIV = 8;
	public static readonly GT = 9;
	public static readonly LT = 10;
	public static readonly EQ = 11;
	public static readonly POINT = 12;
	public static readonly POW = 13;
	public static readonly WS = 14;
	public static readonly RULE_file = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_atom = 2;
	public static readonly RULE_scientific = 3;
	public static readonly RULE_variable = 4;
	public static readonly RULE_relop = 5;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"file", "expression", "atom", "scientific", "variable", "relop",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'('", "')'", "'+'", "'-'", "'*'", "'/'", 
		"'>'", "'<'", "'='", "'.'", "'^'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "VARIABLE", "SCIENTIFIC_NUMBER", "LPAREN", "RPAREN", "PLUS", 
		"MINUS", "TIMES", "DIV", "GT", "LT", "EQ", "POINT", "POW", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ExpressionParser._LITERAL_NAMES, ExpressionParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ExpressionParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Expression.g4"; }

	// @Override
	public get ruleNames(): string[] { return ExpressionParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ExpressionParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ExpressionParser._ATN, this);
	}
	// @RuleVersion(0)
	public file(): FileContext {
		let _localctx: FileContext = new FileContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ExpressionParser.RULE_file);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 12;
			this.expression(0);
			this.state = 13;
			this.match(ExpressionParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, ExpressionParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 24;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ExpressionParser.LPAREN:
				{
				this.state = 16;
				this.match(ExpressionParser.LPAREN);
				this.state = 17;
				this.expression(0);
				this.state = 18;
				this.match(ExpressionParser.RPAREN);
				}
				break;
			case ExpressionParser.PLUS:
				{
				this.state = 20;
				this.match(ExpressionParser.PLUS);
				}
				break;
			case ExpressionParser.MINUS:
				{
				this.state = 21;
				this.match(ExpressionParser.MINUS);
				this.state = 22;
				this.atom();
				}
				break;
			case ExpressionParser.VARIABLE:
			case ExpressionParser.SCIENTIFIC_NUMBER:
				{
				this.state = 23;
				this.atom();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 37;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 35;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ExpressionParser.RULE_expression);
						this.state = 26;
						if (!(this.precpred(this._ctx, 7))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 7)");
						}
						this.state = 27;
						this.match(ExpressionParser.POW);
						this.state = 28;
						this.expression(8);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ExpressionParser.RULE_expression);
						this.state = 29;
						if (!(this.precpred(this._ctx, 6))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 6)");
						}
						this.state = 30;
						_la = this._input.LA(1);
						if (!(_la === ExpressionParser.TIMES || _la === ExpressionParser.DIV)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 31;
						this.expression(7);
						}
						break;

					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ExpressionParser.RULE_expression);
						this.state = 32;
						if (!(this.precpred(this._ctx, 5))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						}
						this.state = 33;
						_la = this._input.LA(1);
						if (!(_la === ExpressionParser.PLUS || _la === ExpressionParser.MINUS)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 34;
						this.expression(6);
						}
						break;
					}
					}
				}
				this.state = 39;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public atom(): AtomContext {
		let _localctx: AtomContext = new AtomContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ExpressionParser.RULE_atom);
		try {
			this.state = 42;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ExpressionParser.SCIENTIFIC_NUMBER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 40;
				this.scientific();
				}
				break;
			case ExpressionParser.VARIABLE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 41;
				this.variable();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scientific(): ScientificContext {
		let _localctx: ScientificContext = new ScientificContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ExpressionParser.RULE_scientific);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 44;
			this.match(ExpressionParser.SCIENTIFIC_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ExpressionParser.RULE_variable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 46;
			this.match(ExpressionParser.VARIABLE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relop(): RelopContext {
		let _localctx: RelopContext = new RelopContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ExpressionParser.RULE_relop);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 48;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ExpressionParser.GT) | (1 << ExpressionParser.LT) | (1 << ExpressionParser.EQ))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 7);

		case 1:
			return this.precpred(this._ctx, 6);

		case 2:
			return this.precpred(this._ctx, 5);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x105\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\x1B\n\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03&\n\x03\f" +
		"\x03\x0E\x03)\v\x03\x03\x04\x03\x04\x05\x04-\n\x04\x03\x05\x03\x05\x03" +
		"\x06\x03\x06\x03\x07\x03\x07\x03\x07\x02\x02\x03\x04\b\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x02\x05\x03\x02\t\n\x03\x02\x07\b\x03\x02\v" +
		"\r\x025\x02\x0E\x03\x02\x02\x02\x04\x1A\x03\x02\x02\x02\x06,\x03\x02\x02" +
		"\x02\b.\x03\x02\x02\x02\n0\x03\x02\x02\x02\f2\x03\x02\x02\x02\x0E\x0F" +
		"\x05\x04\x03\x02\x0F\x10\x07\x02\x02\x03\x10\x03\x03\x02\x02\x02\x11\x12" +
		"\b\x03\x01\x02\x12\x13\x07\x05\x02\x02\x13\x14\x05\x04\x03\x02\x14\x15" +
		"\x07\x06\x02\x02\x15\x1B\x03\x02\x02\x02\x16\x1B\x07\x07\x02\x02\x17\x18" +
		"\x07\b\x02\x02\x18\x1B\x05\x06\x04\x02\x19\x1B\x05\x06\x04\x02\x1A\x11" +
		"\x03\x02\x02\x02\x1A\x16\x03\x02\x02\x02\x1A\x17\x03\x02\x02\x02\x1A\x19" +
		"\x03\x02\x02\x02\x1B\'\x03\x02\x02\x02\x1C\x1D\f\t\x02\x02\x1D\x1E\x07" +
		"\x0F\x02\x02\x1E&\x05\x04\x03\n\x1F \f\b\x02\x02 !\t\x02\x02\x02!&\x05" +
		"\x04\x03\t\"#\f\x07\x02\x02#$\t\x03\x02\x02$&\x05\x04\x03\b%\x1C\x03\x02" +
		"\x02\x02%\x1F\x03\x02\x02\x02%\"\x03\x02\x02\x02&)\x03\x02\x02\x02\'%" +
		"\x03\x02\x02\x02\'(\x03\x02\x02\x02(\x05\x03\x02\x02\x02)\'\x03\x02\x02" +
		"\x02*-\x05\b\x05\x02+-\x05\n\x06\x02,*\x03\x02\x02\x02,+\x03\x02\x02\x02" +
		"-\x07\x03\x02\x02\x02./\x07\x04\x02\x02/\t\x03\x02\x02\x0201\x07\x03\x02" +
		"\x021\v\x03\x02\x02\x0223\t\x04\x02\x023\r\x03\x02\x02\x02\x06\x1A%\'" +
		",";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ExpressionParser.__ATN) {
			ExpressionParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ExpressionParser._serializedATN));
		}

		return ExpressionParser.__ATN;
	}

}

export class FileContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public EOF(): TerminalNode { return this.getToken(ExpressionParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ExpressionParser.RULE_file; }
	// @Override
	public enterRule(listener: ExpressionListener): void {
		if (listener.enterFile) {
			listener.enterFile(this);
		}
	}
	// @Override
	public exitRule(listener: ExpressionListener): void {
		if (listener.exitFile) {
			listener.exitFile(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ExpressionVisitor<Result>): Result {
		if (visitor.visitFile) {
			return visitor.visitFile(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public POW(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.POW, 0); }
	public TIMES(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.TIMES, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.DIV, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.MINUS, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.RPAREN, 0); }
	public atom(): AtomContext | undefined {
		return this.tryGetRuleContext(0, AtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ExpressionParser.RULE_expression; }
	// @Override
	public enterRule(listener: ExpressionListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ExpressionListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ExpressionVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomContext extends ParserRuleContext {
	public scientific(): ScientificContext | undefined {
		return this.tryGetRuleContext(0, ScientificContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ExpressionParser.RULE_atom; }
	// @Override
	public enterRule(listener: ExpressionListener): void {
		if (listener.enterAtom) {
			listener.enterAtom(this);
		}
	}
	// @Override
	public exitRule(listener: ExpressionListener): void {
		if (listener.exitAtom) {
			listener.exitAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ExpressionVisitor<Result>): Result {
		if (visitor.visitAtom) {
			return visitor.visitAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScientificContext extends ParserRuleContext {
	public SCIENTIFIC_NUMBER(): TerminalNode { return this.getToken(ExpressionParser.SCIENTIFIC_NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ExpressionParser.RULE_scientific; }
	// @Override
	public enterRule(listener: ExpressionListener): void {
		if (listener.enterScientific) {
			listener.enterScientific(this);
		}
	}
	// @Override
	public exitRule(listener: ExpressionListener): void {
		if (listener.exitScientific) {
			listener.exitScientific(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ExpressionVisitor<Result>): Result {
		if (visitor.visitScientific) {
			return visitor.visitScientific(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	public VARIABLE(): TerminalNode { return this.getToken(ExpressionParser.VARIABLE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ExpressionParser.RULE_variable; }
	// @Override
	public enterRule(listener: ExpressionListener): void {
		if (listener.enterVariable) {
			listener.enterVariable(this);
		}
	}
	// @Override
	public exitRule(listener: ExpressionListener): void {
		if (listener.exitVariable) {
			listener.exitVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ExpressionVisitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelopContext extends ParserRuleContext {
	public EQ(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.EQ, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.GT, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(ExpressionParser.LT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ExpressionParser.RULE_relop; }
	// @Override
	public enterRule(listener: ExpressionListener): void {
		if (listener.enterRelop) {
			listener.enterRelop(this);
		}
	}
	// @Override
	public exitRule(listener: ExpressionListener): void {
		if (listener.exitRelop) {
			listener.exitRelop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ExpressionVisitor<Result>): Result {
		if (visitor.visitRelop) {
			return visitor.visitRelop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


