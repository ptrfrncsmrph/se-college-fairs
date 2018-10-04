// Generated by purs version 0.12.0
"use strict";
var Control_Alt = require("../Control.Alt/index.js");
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Lazy = require("../Control.Lazy/index.js");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
var Data_Either = require("../Data.Either/index.js");
var Data_Foldable = require("../Data.Foldable/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_List = require("../Data.List/index.js");
var Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
var Data_List_Types = require("../Data.List.Types/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_NonEmpty = require("../Data.NonEmpty/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Prelude = require("../Prelude/index.js");
var Text_Parsing_StringParser = require("../Text.Parsing.StringParser/index.js");
var withError = function (p) {
    return function (msg) {
        return Control_Alt.alt(Text_Parsing_StringParser.altParser)(p)(Text_Parsing_StringParser.fail(msg));
    };
};
var optional = function (p) {
    return Control_Alt.alt(Text_Parsing_StringParser.altParser)(Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v) {
        return Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(Data_Unit.unit);
    }))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(Data_Unit.unit));
};
var option = function (a) {
    return function (p) {
        return Control_Alt.alt(Text_Parsing_StringParser.altParser)(p)(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(a));
    };
};
var optionMaybe = function (p) {
    return option(Data_Maybe.Nothing.value)(Data_Functor.map(Text_Parsing_StringParser.functorParser)(Data_Maybe.Just.create)(p));
};
var many1Till = function (p) {
    return function (end) {
        var ending = function (acc) {
            return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(end)(function (v) {
                return Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(new Control_Monad_Rec_Class.Done(Data_List_NonEmpty.reverse(acc)));
            });
        };
        var $$continue = function (acc) {
            return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v) {
                return Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(new Control_Monad_Rec_Class.Loop(Data_List_NonEmpty.cons(v)(acc)));
            });
        };
        var inner = function (acc) {
            return Control_Alt.alt(Text_Parsing_StringParser.altParser)(ending(acc))($$continue(acc));
        };
        return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v) {
            return Control_Monad_Rec_Class.tailRecM(Text_Parsing_StringParser.monadRecParser)(inner)(Control_Applicative.pure(Data_List_Types.applicativeNonEmptyList)(v));
        });
    };
};
var manyTill = function (p) {
    return function (end) {
        return Control_Alt.alt(Text_Parsing_StringParser.altParser)(Control_Apply.applySecond(Text_Parsing_StringParser.applyParser)(end)(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(Data_List_Types.Nil.value)))(Data_Functor.map(Text_Parsing_StringParser.functorParser)(Data_List_NonEmpty.toList)(many1Till(p)(end)));
    };
};
var many = Data_List.manyRec(Text_Parsing_StringParser.monadRecParser)(Text_Parsing_StringParser.alternativeParser);
var lookAhead = function (v) {
    return function (s) {
        var v1 = v(s);
        if (v1 instanceof Data_Either.Right) {
            return new Data_Either.Right({
                result: v1.value0.result,
                suffix: s
            });
        };
        return v1;
    };
};
var endBy = function (p) {
    return function (sep) {
        return many(Control_Apply.applyFirst(Text_Parsing_StringParser.applyParser)(p)(sep));
    };
};
var cons$prime = function (h) {
    return function (t) {
        return new Data_NonEmpty.NonEmpty(h, t);
    };
};
var many1 = function (p) {
    return Control_Apply.apply(Text_Parsing_StringParser.applyParser)(Data_Functor.map(Text_Parsing_StringParser.functorParser)(cons$prime)(p))(many(p));
};
var endBy1 = function (p) {
    return function (sep) {
        return many1(Control_Apply.applyFirst(Text_Parsing_StringParser.applyParser)(p)(sep));
    };
};
var sepBy1 = function (p) {
    return function (sep) {
        return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v) {
            return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(many(Control_Apply.applySecond(Text_Parsing_StringParser.applyParser)(sep)(p)))(function (v1) {
                return Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(cons$prime(v)(v1));
            });
        });
    };
};
var sepBy = function (p) {
    return function (sep) {
        return Control_Alt.alt(Text_Parsing_StringParser.altParser)(Data_Functor.map(Text_Parsing_StringParser.functorParser)(Data_List_NonEmpty.toList)(sepBy1(p)(sep)))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(Data_List_Types.Nil.value));
    };
};
var sepEndBy1 = function (p) {
    return function (sep) {
        return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v) {
            return Control_Alt.alt(Text_Parsing_StringParser.altParser)(Control_Bind.bind(Text_Parsing_StringParser.bindParser)(sep)(function (v1) {
                return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(sepEndBy(p)(sep))(function (v2) {
                    return Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(cons$prime(v)(v2));
                });
            }))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(Data_List_NonEmpty.singleton(v)));
        });
    };
};
var sepEndBy = function (p) {
    return function (sep) {
        return Control_Alt.alt(Text_Parsing_StringParser.altParser)(Data_Functor.map(Text_Parsing_StringParser.functorParser)(Data_List_NonEmpty.toList)(sepEndBy1(p)(sep)))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(Data_List_Types.Nil.value));
    };
};
var choice = function (dictFoldable) {
    return Data_Foldable.foldl(dictFoldable)(Control_Alt.alt(Text_Parsing_StringParser.altParser))(Text_Parsing_StringParser.fail("Nothing to parse"));
};
var chainr1$prime = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(Text_Parsing_StringParser.altParser)(Control_Bind.bind(Text_Parsing_StringParser.bindParser)(f)(function (v) {
                return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(chainr1(p)(f))(function (v1) {
                    return Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(v(a)(v1));
                });
            }))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(a));
        };
    };
};
var chainr1 = function (p) {
    return function (f) {
        return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v) {
            return chainr1$prime(p)(f)(v);
        });
    };
};
var chainr = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(Text_Parsing_StringParser.altParser)(chainr1(p)(f))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(a));
        };
    };
};
var chainl1$prime = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(Text_Parsing_StringParser.altParser)(Control_Bind.bind(Text_Parsing_StringParser.bindParser)(f)(function (v) {
                return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v1) {
                    return chainl1$prime(p)(f)(v(a)(v1));
                });
            }))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(a));
        };
    };
};
var chainl1 = function (p) {
    return function (f) {
        return Control_Bind.bind(Text_Parsing_StringParser.bindParser)(p)(function (v) {
            return chainl1$prime(p)(f)(v);
        });
    };
};
var chainl = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(Text_Parsing_StringParser.altParser)(chainl1(p)(f))(Control_Applicative.pure(Text_Parsing_StringParser.applicativeParser)(a));
        };
    };
};
var between = function (open) {
    return function (close) {
        return function (p) {
            return Control_Apply.applyFirst(Text_Parsing_StringParser.applyParser)(Control_Apply.applySecond(Text_Parsing_StringParser.applyParser)(open)(p))(close);
        };
    };
};
module.exports = {
    lookAhead: lookAhead,
    many: many,
    many1: many1,
    withError: withError,
    between: between,
    option: option,
    optional: optional,
    optionMaybe: optionMaybe,
    sepBy: sepBy,
    sepBy1: sepBy1,
    sepEndBy: sepEndBy,
    sepEndBy1: sepEndBy1,
    endBy1: endBy1,
    endBy: endBy,
    chainr: chainr,
    chainl: chainl,
    chainl1: chainl1,
    "chainl1'": chainl1$prime,
    chainr1: chainr1,
    "chainr1'": chainr1$prime,
    choice: choice,
    manyTill: manyTill,
    many1Till: many1Till
};
