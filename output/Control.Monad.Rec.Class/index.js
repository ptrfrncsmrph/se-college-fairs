// Generated by purs version 0.12.0
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Monad = require("../Control.Monad/index.js");
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Bifunctor = require("../Data.Bifunctor/index.js");
var Data_Either = require("../Data.Either/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Identity = require("../Data.Identity/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Effect = require("../Effect/index.js");
var Effect_Ref = require("../Effect.Ref/index.js");
var Partial_Unsafe = require("../Partial.Unsafe/index.js");
var Prelude = require("../Prelude/index.js");
var Loop = (function () {
    function Loop(value0) {
        this.value0 = value0;
    };
    Loop.create = function (value0) {
        return new Loop(value0);
    };
    return Loop;
})();
var Done = (function () {
    function Done(value0) {
        this.value0 = value0;
    };
    Done.create = function (value0) {
        return new Done(value0);
    };
    return Done;
})();
var MonadRec = function (Monad0, tailRecM) {
    this.Monad0 = Monad0;
    this.tailRecM = tailRecM;
};
var tailRecM = function (dict) {
    return dict.tailRecM;
};
var tailRecM2 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return tailRecM(dictMonadRec)(function (o) {
                    return f(o.a)(o.b);
                })({
                    a: a,
                    b: b
                });
            };
        };
    };
};
var tailRecM3 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return tailRecM(dictMonadRec)(function (o) {
                        return f(o.a)(o.b)(o.c);
                    })({
                        a: a,
                        b: b,
                        c: c
                    });
                };
            };
        };
    };
};
var tailRec = function (f) {
    var go = function ($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
            if (v instanceof Loop) {
                $copy_v = f(v.value0);
                return;
            };
            if (v instanceof Done) {
                $tco_done = true;
                return v.value0;
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 91, column 3 - line 91, column 25: " + [ v.constructor.name ]);
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
        };
        return $tco_result;
    };
    return function ($53) {
        return go(f($53));
    };
};
var monadRecMaybe = new MonadRec(function () {
    return Data_Maybe.monadMaybe;
}, function (f) {
    return function (a0) {
        var g = function (v) {
            if (v instanceof Data_Maybe.Nothing) {
                return new Done(Data_Maybe.Nothing.value);
            };
            if (v instanceof Data_Maybe.Just && v.value0 instanceof Loop) {
                return new Loop(f(v.value0.value0));
            };
            if (v instanceof Data_Maybe.Just && v.value0 instanceof Done) {
                return new Done(new Data_Maybe.Just(v.value0.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 127, column 7 - line 127, column 31: " + [ v.constructor.name ]);
        };
        return tailRec(g)(f(a0));
    };
});
var monadRecIdentity = new MonadRec(function () {
    return Data_Identity.monadIdentity;
}, function (f) {
    var runIdentity = function (v) {
        return v;
    };
    return function ($54) {
        return Data_Identity.Identity(tailRec(function ($55) {
            return runIdentity(f($55));
        })($54));
    };
});
var monadRecFunction = new MonadRec(function () {
    return Control_Monad.monadFn;
}, function (f) {
    return function (a0) {
        return function (e) {
            return tailRec(function (a) {
                return f(a)(e);
            })(a0);
        };
    };
});
var monadRecEither = new MonadRec(function () {
    return Data_Either.monadEither;
}, function (f) {
    return function (a0) {
        var g = function (v) {
            if (v instanceof Data_Either.Left) {
                return new Done(new Data_Either.Left(v.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Loop) {
                return new Loop(f(v.value0.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Done) {
                return new Done(new Data_Either.Right(v.value0.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 119, column 7 - line 119, column 33: " + [ v.constructor.name ]);
        };
        return tailRec(g)(f(a0));
    };
});
var monadRecEffect = new MonadRec(function () {
    return Effect.monadEffect;
}, function (f) {
    return function (a) {
        var fromDone = function (v) {
            var $__unused = function (dictPartial1) {
                return function ($dollar19) {
                    return $dollar19;
                };
            };
            return $__unused()((function () {
                if (v instanceof Done) {
                    return v.value0;
                };
                throw new Error("Failed pattern match at Control.Monad.Rec.Class line 111, column 30 - line 111, column 44: " + [ v.constructor.name ]);
            })());
        };
        return function __do() {
            var v = Control_Bind.bindFlipped(Effect.bindEffect)(Effect_Ref["new"])(f(a))();
            (function () {
                while (!(function __do() {
                    var v1 = Effect_Ref.read(v)();
                    if (v1 instanceof Loop) {
                        var v2 = f(v1.value0)();
                        var v3 = Effect_Ref.write(v2)(v)();
                        return false;
                    };
                    if (v1 instanceof Done) {
                        return true;
                    };
                    throw new Error("Failed pattern match at Control.Monad.Rec.Class line 102, column 22 - line 107, column 28: " + [ v1.constructor.name ]);
                })()) {

                };
                return {};
            })();
            return Data_Functor.map(Effect.functorEffect)(fromDone)(Effect_Ref.read(v))();
        };
    };
});
var functorStep = new Data_Functor.Functor(function (f) {
    return function (m) {
        if (m instanceof Loop) {
            return new Loop(m.value0);
        };
        if (m instanceof Done) {
            return new Done(f(m.value0));
        };
        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 25, column 8 - line 25, column 48: " + [ m.constructor.name ]);
    };
});
var forever = function (dictMonadRec) {
    return function (ma) {
        return tailRecM(dictMonadRec)(function (u) {
            return Data_Functor.voidRight((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(new Loop(u))(ma);
        })(Data_Unit.unit);
    };
};
var bifunctorStep = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Loop) {
                return new Loop(v(v2.value0));
            };
            if (v2 instanceof Done) {
                return new Done(v1(v2.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 27, column 1 - line 27, column 41: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
});
module.exports = {
    Loop: Loop,
    Done: Done,
    MonadRec: MonadRec,
    tailRec: tailRec,
    tailRecM: tailRecM,
    tailRecM2: tailRecM2,
    tailRecM3: tailRecM3,
    forever: forever,
    functorStep: functorStep,
    bifunctorStep: bifunctorStep,
    monadRecIdentity: monadRecIdentity,
    monadRecEffect: monadRecEffect,
    monadRecFunction: monadRecFunction,
    monadRecEither: monadRecEither,
    monadRecMaybe: monadRecMaybe
};
