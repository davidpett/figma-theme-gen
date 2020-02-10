"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var utils_1 = require("./utils");
var rgbToHex = function (r, g, b) {
    return '#' +
        ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .split('.')[0];
};
var parseColorScheme = function (items) {
    var themeColorNames = [];
    var themeColorValues = items
        .map(function (_a) {
        var _b;
        var name = _a.name, styles = _a.styles;
        var color = styles[0].color;
        var colorName = utils_1.camelCase(name.split('/')[1]);
        themeColorNames.push("'" + colorName + "'");
        return _b = {},
            _b[colorName] = rgbToHex(color.r * 255, color.g * 255, color.b * 255),
            _b;
    })
        .reduce(function (prev, cur) { return (tslib_1.__assign(tslib_1.__assign({}, prev), cur)); });
    return [themeColorValues, themeColorNames];
};
var parseColors = function (items) {
    console.log(chalk_1.default.bgBlue.black.bold('FIGMA -'), 'parseColors');
    var lightColors = items.filter(function (_a) {
        var name = _a.name;
        return name.split('/')[0] === 'light';
    });
    var darkColors = items.filter(function (_a) {
        var name = _a.name;
        return name.split('/')[0] === 'dark';
    });
    var _a = parseColorScheme(lightColors), light = _a[0], colorNames = _a[1];
    var dark = parseColorScheme(darkColors)[0];
    var theme = "export type IThemeColor = " + colorNames.join('|') + "\nexport type IPalette<T extends string> = { [key in T]: string }\nexport interface IColors {\n  dark: IPalette<IThemeColor>\n  light: IPalette<IThemeColor>\n  'no-preference': IPalette<IThemeColor>\n}";
    return [
        theme,
        {
            colors: light,
            colorSchemes: {
                light: light,
                dark: dark,
                'no-preference': light,
            },
        },
    ];
};
exports.default = parseColors;
