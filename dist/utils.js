"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Ui_1 = require("./Ui");
const templatePath = path_1.default.resolve(__dirname, '../template');
function copyDir(fromDir, toDir) {
    if (fs_1.default.existsSync(toDir)) {
        const files = fs_1.default.readdirSync(fromDir);
        files.map(filename => {
            const fromFile = path_1.default.resolve(fromDir, filename);
            const toFile = path_1.default.resolve(toDir, filename);
            if (fs_1.default.statSync(fromFile).isDirectory()) {
                copyDir(fromFile, toFile);
            }
            else {
                fs_1.default.copyFileSync(fromFile, toFile);
            }
        });
    }
    else {
        fs_1.default.mkdirSync(toDir);
        copyDir(fromDir, toDir);
    }
}
function generate(to, type = Ui_1.TEMPLATE_TYPE.IVIEW_ADMIN) {
    switch (type) {
        case Ui_1.TEMPLATE_TYPE.IVIEW_ADMIN:
            const fromDir = path_1.default.resolve(templatePath, 'admin');
            copyDir(fromDir, to);
            return true;
    }
    return false;
}
exports.generate = generate;
//# sourceMappingURL=utils.js.map