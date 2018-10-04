// Generated by purs version 0.12.0
"use strict";
var Data_List = require("../Data.List/index.js");
var Data_List_Types = require("../Data.List.Types/index.js");
var tail = function (dictPartial) {
    return function (v) {
        var $__unused = function (dictPartial1) {
            return function ($dollar5) {
                return $dollar5;
            };
        };
        return $__unused(dictPartial)((function () {
            if (v instanceof Data_List_Types.Cons) {
                return v.value1;
            };
            throw new Error("Failed pattern match at Data.List.Partial line 15, column 1 - line 15, column 46: " + [ v.constructor.name ]);
        })());
    };
};
var last = function (dictPartial) {
    return function (v) {
        var $__unused = function (dictPartial1) {
            return function ($dollar9) {
                return $dollar9;
            };
        };
        return $__unused(dictPartial)((function () {
            if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
                return v.value0;
            };
            if (v instanceof Data_List_Types.Cons) {
                return last(dictPartial)(v.value1);
            };
            throw new Error("Failed pattern match at Data.List.Partial line 21, column 1 - line 21, column 41: " + [ v.constructor.name ]);
        })());
    };
};
var init = function (dictPartial) {
    return function (v) {
        var $__unused = function (dictPartial1) {
            return function ($dollar13) {
                return $dollar13;
            };
        };
        return $__unused(dictPartial)((function () {
            if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            if (v instanceof Data_List_Types.Cons) {
                return new Data_List_Types.Cons(v.value0, init(dictPartial)(v.value1));
            };
            throw new Error("Failed pattern match at Data.List.Partial line 28, column 1 - line 28, column 46: " + [ v.constructor.name ]);
        })());
    };
};
var head = function (dictPartial) {
    return function (v) {
        var $__unused = function (dictPartial1) {
            return function ($dollar17) {
                return $dollar17;
            };
        };
        return $__unused(dictPartial)((function () {
            if (v instanceof Data_List_Types.Cons) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Data.List.Partial line 9, column 1 - line 9, column 41: " + [ v.constructor.name ]);
        })());
    };
};
module.exports = {
    head: head,
    tail: tail,
    last: last,
    init: init
};
