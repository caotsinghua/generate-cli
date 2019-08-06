"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const path_1 = __importDefault(require("path"));
const ink_text_input_1 = __importDefault(require("ink-text-input"));
const ink_select_input_1 = __importDefault(require("ink-select-input"));
const ink_spinner_1 = __importDefault(require("ink-spinner"));
const utils_1 = require("./utils");
var VIEW;
(function (VIEW) {
    VIEW["INPUT_TITLE"] = "INPUT_TITLE";
    VIEW["SELECT_TYPE"] = "SELECT_TYPE";
})(VIEW || (VIEW = {}));
var TEMPLATE_TYPE;
(function (TEMPLATE_TYPE) {
    TEMPLATE_TYPE["IVIEW_ADMIN"] = "IVIEW_ADMIN";
    TEMPLATE_TYPE["CRUD_TEMPLATE"] = "CRUD_TEMPLATE";
})(TEMPLATE_TYPE = exports.TEMPLATE_TYPE || (exports.TEMPLATE_TYPE = {}));
const selectTypes = [
    {
        label: TEMPLATE_TYPE.IVIEW_ADMIN,
        value: TEMPLATE_TYPE.IVIEW_ADMIN
    }
];
const ENTER = '\r';
const CTRL_C = '\x03';
const Ui = ({ stdin, setRawMode }) => {
    const [title, setTitle] = react_1.useState('');
    const [type, setType] = react_1.useState(TEMPLATE_TYPE.IVIEW_ADMIN);
    const [status, setStatus] = react_1.useState('EDITING');
    react_1.useEffect(() => {
        if (setRawMode)
            setRawMode(true);
        stdin.on('data', handleInput);
        return () => {
            if (setRawMode)
                setRawMode(true);
            stdin.removeListener('data', handleInput);
        };
    });
    const handleInput = (data) => __awaiter(this, void 0, void 0, function* () {
        const s = String(data);
        if (s === CTRL_C)
            process.exit(0);
        if (s === ENTER) {
            setStatus('GENERATING');
            try {
                utils_1.generateAdminTemplate(path_1.default.resolve(process.cwd(), title));
                setStatus('OK');
            }
            catch (e) {
                console.log(e);
                setStatus('FAILED');
            }
            finally {
                process.exit(0);
            }
        }
    });
    const handleTitleChange = (value) => {
        setTitle(value);
    };
    const handleHighlight = (item) => {
        const value = item.value;
        setType(value);
    };
    const renderFunc = () => {
        if (status === 'GENERATING') {
            return (react_1.default.createElement(ink_1.Box, { flexDirection: "row" },
                react_1.default.createElement(ink_1.Box, { marginRight: 1 },
                    react_1.default.createElement(ink_1.Color, { green: true },
                        react_1.default.createElement(ink_spinner_1.default, { type: "dots" }))),
                react_1.default.createElement(ink_1.Box, null,
                    react_1.default.createElement(ink_1.Color, { blackBright: true }, "\u751F\u6210\u4E2D..."))));
        }
        if (status === 'FAILED') {
            return (react_1.default.createElement(ink_1.Box, null,
                react_1.default.createElement(ink_1.Color, { redBright: true }, "\u751F\u6210\u5931\u8D25,\u8BF7\u91CD\u8BD5")));
        }
        if (status === 'OK') {
            return (react_1.default.createElement(ink_1.Box, null,
                react_1.default.createElement(ink_1.Color, { greenBright: true }, "\u6210\u529F")));
        }
        if (status === 'EDITING') {
            return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
                react_1.default.createElement(ink_1.Box, { flexDirection: "row" },
                    react_1.default.createElement(ink_1.Box, { marginRight: 1 },
                        react_1.default.createElement(ink_1.Color, { cyan: true }, "\u8F93\u5165\u9879\u76EE\u540D\u79F0:")),
                    react_1.default.createElement(ink_text_input_1.default, { value: title, onChange: handleTitleChange, placeholder: "\u8F93\u5165\u9879\u76EE\u540D..." })),
                react_1.default.createElement(ink_select_input_1.default, { items: selectTypes, onHighlight: handleHighlight })));
        }
    };
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
        react_1.default.createElement(ink_1.Box, null, "\u8F93\u5165\u9879\u76EE\u540D\u5E76\u9009\u62E9\u9879\u76EE\u7C7B\u578B\u540E\uFF0C\u6309Enter\u786E\u8BA4/CtrlC\u9000\u51FA."),
        renderFunc()));
};
const UiWithStdin = props => {
    return (react_1.default.createElement(ink_1.StdinContext.Consumer, null, ({ stdin, setRawMode }) => react_1.default.createElement(Ui, Object.assign({}, props, { stdin: stdin, setRawMode: setRawMode }))));
};
exports.default = UiWithStdin;
//# sourceMappingURL=Ui.js.map