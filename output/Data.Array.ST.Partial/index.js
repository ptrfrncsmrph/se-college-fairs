// Generated by purs version 0.12.0
"use strict";
var $foreign = require("./foreign.js");
var Control_Monad_ST = require("../Control.Monad.ST/index.js");
var Data_Array_ST = require("../Data.Array.ST/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var poke = function (dictPartial) {
    return $foreign.pokeImpl;
};
var peek = function (dictPartial) {
    return $foreign.peekImpl;
};
module.exports = {
    peek: peek,
    poke: poke
};
