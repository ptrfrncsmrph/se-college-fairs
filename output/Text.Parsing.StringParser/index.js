// Generated by purs version 0.12.0
"use strict";
var Control_Alt = require("../Control.Alt/index.js");
var Control_Alternative = require("../Control.Alternative/index.js");
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Lazy = require("../Control.Lazy/index.js");
var Control_Monad = require("../Control.Monad/index.js");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
var Control_MonadPlus = require("../Control.MonadPlus/index.js");
var Control_MonadZero = require("../Control.MonadZero/index.js");
var Control_Plus = require("../Control.Plus/index.js");
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Bifunctor = require("../Data.Bifunctor/index.js");
var Data_Boolean = require("../Data.Boolean/index.js");
var Data_Either = require("../Data.Either/index.js");
var Data_Eq = require("../Data.Eq/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Show = require("../Data.Show/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Prelude = require("../Prelude/index.js");
var ParseError = (function () {
    function ParseError(value0) {
        this.value0 = value0;
    };
    ParseError.create = function (value0) {
        return new ParseError(value0);
    };
    return ParseError;
})();
var Parser = function (x) {
    return x;
};
var unParser = function (v) {
    return v;
};
var $$try = function (v) {
    return function (v1) {
        return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(function (v2) {
            return {
                pos: v1.pos,
                error: v2.error
            };
        })(v(v1));
    };
};
var showParseError = new Data_Show.Show(function (v) {
    return v.value0;
});
var runParser = function (v) {
    return function (s) {
        return Data_Bifunctor.bimap(Data_Either.bifunctorEither)(function (v1) {
            return v1.error;
        })(function (v1) {
            return v1.result;
        })(v({
            str: s,
            pos: 0
        }));
    };
};
var lazyParser = new Control_Lazy.Lazy(function (f) {
    return Parser(function (str) {
        return unParser(f(Data_Unit.unit))(str);
    });
});
var functorParser = new Data_Functor.Functor(function (f) {
    return function (v) {
        return function ($80) {
            return Data_Functor.map(Data_Either.functorEither)(function (v1) {
                return {
                    result: f(v1.result),
                    suffix: v1.suffix
                };
            })(v($80));
        };
    };
});
var fail = function (msg) {
    return function (v) {
        return new Data_Either.Left({
            pos: v.pos,
            error: new ParseError(msg)
        });
    };
};
var eqParseError = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x.value0 === y.value0;
    };
});
var ordParseError = new Data_Ord.Ord(function () {
    return eqParseError;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x.value0)(y.value0);
    };
});
var applyParser = new Control_Apply.Apply(function () {
    return functorParser;
}, function (v) {
    return function (v1) {
        return function (s) {
            return Control_Bind.bind(Data_Either.bindEither)(v(s))(function (v2) {
                return Control_Bind.bind(Data_Either.bindEither)(v1(v2.suffix))(function (v3) {
                    return Control_Applicative.pure(Data_Either.applicativeEither)({
                        result: v2.result(v3.result),
                        suffix: v3.suffix
                    });
                });
            });
        };
    };
});
var bindParser = new Control_Bind.Bind(function () {
    return applyParser;
}, function (v) {
    return function (f) {
        return function (s) {
            return Control_Bind.bind(Data_Either.bindEither)(v(s))(function (v1) {
                return unParser(f(v1.result))(v1.suffix);
            });
        };
    };
});
var semigroupParser = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(Control_Apply.lift2(applyParser)(Data_Semigroup.append(dictSemigroup)));
};
var applicativeParser = new Control_Applicative.Applicative(function () {
    return applyParser;
}, function (a) {
    return function (s) {
        return new Data_Either.Right({
            result: a,
            suffix: s
        });
    };
});
var monadParser = new Control_Monad.Monad(function () {
    return applicativeParser;
}, function () {
    return bindParser;
});
var monadRecParser = new Control_Monad_Rec_Class.MonadRec(function () {
    return monadParser;
}, function (f) {
    return function (a) {
        var split = function (v) {
            if (v.result instanceof Control_Monad_Rec_Class.Loop) {
                return new Control_Monad_Rec_Class.Loop({
                    state: v.result.value0,
                    str: v.suffix
                });
            };
            if (v.result instanceof Control_Monad_Rec_Class.Done) {
                return new Control_Monad_Rec_Class.Done({
                    result: v.result.value0,
                    suffix: v.suffix
                });
            };
            throw new Error("Failed pattern match at Text.Parsing.StringParser line 88, column 7 - line 88, column 70: " + [ v.constructor.name ]);
        };
        return function (str) {
            return Control_Monad_Rec_Class.tailRecM(Control_Monad_Rec_Class.monadRecEither)(function (st) {
                return Data_Functor.map(Data_Either.functorEither)(split)(unParser(f(st.state))(st.str));
            })({
                state: a,
                str: str
            });
        };
    };
});
var altParser = new Control_Alt.Alt(function () {
    return functorParser;
}, function (v) {
    return function (v1) {
        return function (s) {
            var v2 = v(s);
            if (v2 instanceof Data_Either.Left) {
                if (s.pos === v2.value0.pos) {
                    return v1(s);
                };
                if (Data_Boolean.otherwise) {
                    return new Data_Either.Left({
                        error: v2.value0.error,
                        pos: v2.value0.pos
                    });
                };
            };
            return v2;
        };
    };
});
var plusParser = new Control_Plus.Plus(function () {
    return altParser;
}, fail("No alternative"));
var alternativeParser = new Control_Alternative.Alternative(function () {
    return applicativeParser;
}, function () {
    return plusParser;
});
var monadZeroParser = new Control_MonadZero.MonadZero(function () {
    return alternativeParser;
}, function () {
    return monadParser;
});
var monadPlusParser = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroParser;
});
module.exports = {
    ParseError: ParseError,
    Parser: Parser,
    unParser: unParser,
    runParser: runParser,
    fail: fail,
    "try": $$try,
    showParseError: showParseError,
    eqParseError: eqParseError,
    ordParseError: ordParseError,
    functorParser: functorParser,
    applyParser: applyParser,
    applicativeParser: applicativeParser,
    altParser: altParser,
    plusParser: plusParser,
    alternativeParser: alternativeParser,
    bindParser: bindParser,
    monadParser: monadParser,
    monadZeroParser: monadZeroParser,
    monadPlusParser: monadPlusParser,
    monadRecParser: monadRecParser,
    lazyParser: lazyParser,
    semigroupParser: semigroupParser
};
