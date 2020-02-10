import chalk from 'chalk'

const baseUnit = 8
const sizes = {
  none: 0,
  xs: 0.5,
  s: 1,
  m: 2,
  l: 3,
  xl: 4,
}

const parseSpacing = (): [string, any] => {
  console.log(chalk.bgBlue.black.bold('FIGMA -'), 'parseSpacing')

  return [
    `export type ISpacingPropOption = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
    export type SpaceMap = { [key in ISpacingPropOption]: number }
    
    export interface IThemeSpacing {
      baseUnit: number
      borderRadius: SpaceMap
      margin: SpaceMap
      padding: SpaceMap
    }`,
    {
      spacing: {
        baseUnit,
        margin: sizes,
        padding: sizes,
        borderRadius: sizes,
      },
    },
  ]
}

export default parseSpacing
