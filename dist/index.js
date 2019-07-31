#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const meow_1 = __importDefault(require("meow"));
const Ui_1 = __importDefault(require("./Ui"));
const cli = meow_1.default(`  Usage
      $ emma

     Controls:
      - space: toggle dependencies
      - up/down: scroll the list
      - right/left: hide or show details
      - double right: show repo`);
ink_1.render(react_1.default.createElement(Ui_1.default, null), {
    exitOnCtrlC: false
});
//# sourceMappingURL=index.js.map