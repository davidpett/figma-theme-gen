"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var Figma = tslib_1.__importStar(require("figma-js"));
var figma_transformer_1 = require("figma-transformer");
var fs_1 = require("fs");
var path_1 = require("path");
var util_1 = require("util");
var yargs_1 = require("yargs");
var parse_colors_1 = tslib_1.__importDefault(require("./parse-colors"));
var parse_spacing_1 = tslib_1.__importDefault(require("./parse-spacing"));
var parse_typography_1 = tslib_1.__importDefault(require("./parse-typography"));
var _a = yargs_1.argv.config, config = _a === void 0 ? 'figma.json' : _a;
var figmaConfig = JSON.parse(fs_1.readFileSync(path_1.resolve(config), 'utf8'));
var accessToken = yargs_1.argv.accessToken || figmaConfig.accessToken;
var outputFile = yargs_1.argv.outputFile || figmaConfig.outputFile;
var fileId = yargs_1.argv.fileId || figmaConfig.fileId;
var client = Figma.Client({ personalAccessToken: accessToken });
var parseStyles = function (fileStyles) {
    var textStyles = fileStyles.filter(function (_a) {
        var styleType = _a.styleType;
        return styleType === 'TEXT';
    });
    var colorStyles = fileStyles.filter(function (_a) {
        var styleType = _a.styleType;
        return styleType === 'FILL';
    });
    var _a = parse_typography_1.default(textStyles), typographyTypes = _a[0], typographyValues = _a[1];
    var _b = parse_colors_1.default(colorStyles), colorTypes = _b[0], colorValues = _b[1];
    var _c = parse_spacing_1.default(), spacingTypes = _c[0], spacingValues = _c[1];
    var styles = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, typographyValues), colorValues), spacingValues);
    fs_1.writeFileSync(path_1.resolve(outputFile), typographyTypes + "\n    " + colorTypes + "\n    " + spacingTypes + "\n    export interface IAppTheme {\n      colors: IPalette<IThemeColor>\n      colorSchemes: IColors\n      spacing: IThemeSpacing\n      typography: ITypographyStyle\n    }\n\n    export const appTheme: IAppTheme = " + util_1.inspect(styles));
    console.log(chalk_1.default.bgBlue.black.bold('FIGMA -'), chalk_1.default.green.bold('COMPLETE'));
};
exports.generateTheme = function () {
    if (!accessToken) {
        console.log(chalk_1.default.bgBlue.black.bold('FIGMA -'), chalk_1.default.red('no accessToken, please use `--accessToken` or add to the config file'));
    }
    if (!outputFile) {
        console.log(chalk_1.default.bgBlue.black.bold('FIGMA -'), chalk_1.default.red('no outputFile, please use `--outputFile` or add to the config file'));
    }
    if (!fileId) {
        console.log(chalk_1.default.bgBlue.black.bold('FIGMA -'), chalk_1.default.red('no fileId, please use `--fileId` or add to the config file'));
    }
    if (!accessToken || !outputFile || !fileId) {
        return;
    }
    client
        .file(fileId)
        .then(function (_a) {
        var data = _a.data;
        var shortcuts = figma_transformer_1.processFile(data, fileId).shortcuts;
        parseStyles(shortcuts.STYLE);
    })
        .catch(function (err) { return console.warn(err); });
};
exports.generateTheme();
