"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var baseUnit = 8;
var sizes = {
    none: 0,
    xs: 0.5,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
};
var parseSpacing = function () {
    console.log(chalk_1.default.bgBlue.black.bold('FIGMA -'), 'parseSpacing');
    return [
        "export type ISpacingPropOption = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'\n    export type SpaceMap = { [key in ISpacingPropOption]: number }\n    \n    export interface IThemeSpacing {\n      baseUnit: number\n      borderRadius: SpaceMap\n      margin: SpaceMap\n      padding: SpaceMap\n    }",
        {
            spacing: {
                baseUnit: baseUnit,
                margin: sizes,
                padding: sizes,
                borderRadius: sizes,
            },
        },
    ];
};
exports.default = parseSpacing;
