"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var utils_1 = require("./utils");
var parseTypography = function (items) {
    console.log(chalk_1.default.bgBlue.black.bold('FIGMA -'), 'parseTypography');
    var textVariants = [];
    var styles = items
        .map(function (_a) {
        var _b;
        var name = _a.name, style = _a.typeStyles;
        var variantName = utils_1.camelCase(name);
        textVariants.push("'" + variantName + "'");
        return _b = {},
            _b[variantName] = {
                fontFamily: ['Roboto', 'SF Pro Text', 'SF Pro Display'].includes(style.fontFamily)
                    ? 'System'
                    : style.fontFamily,
                fontSize: style.fontSize,
                fontWeight: "" + style.fontWeight,
                letterSpacing: style.letterSpacing,
                lineHeight: style.lineHeightPx,
                textTransform: style.textCase === 'UPPER'
                    ? 'uppercase'
                    : style.textCase === 'LOWER'
                        ? 'lowercase'
                        : style.textCase === 'TITLE'
                            ? 'capitalize'
                            : 'none',
            },
            _b;
    })
        .reduce(function (result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
    }, {});
    return [
        "import { TextStyle } from 'react-native'\n\n    export type ITextVariant = " + textVariants.join('|') + "\n    export type ITextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy'\n    export type ITypographyStyle = { [key in ITextVariant | ITextWeight]: TextStyle }",
        {
            typography: tslib_1.__assign({ light: { fontWeight: '300' }, regular: { fontWeight: '400' }, medium: { fontWeight: '500' }, semibold: { fontWeight: '600' }, bold: { fontWeight: '800' }, heavy: { fontWeight: '900' } }, styles),
        },
    ];
};
exports.default = parseTypography;
