import chalk from 'chalk'

type ISpacingPropOption = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
type SpaceMap = { [key in ISpacingPropOption]: number }

interface IThemeSpacing {
  baseUnit: number
  borderRadius: SpaceMap
  margin: SpaceMap
  padding: SpaceMap
}

const parseSpacing = (s?: Partial<IThemeSpacing>): [string, { spacing: IThemeSpacing }] => {
  console.log(chalk.bgBlue.black.bold('FIGMA -'), 'parseSpacing')
  const baseUnit = s?.baseUnit || 8
  const defaultSizes: SpaceMap = {
    none: 0,
    xs: baseUnit * 0.5,
    s: baseUnit * 1,
    m: baseUnit * 2,
    l: baseUnit * 3,
    xl: baseUnit * 4
  }

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
        margin: { ...defaultSizes, ...(s?.margin || {}) },
        padding: { ...defaultSizes, ...(s?.padding || {}) },
        borderRadius: { ...defaultSizes, ...(s?.borderRadius || {}) }
      }
    }
  ]
}

export default parseSpacing
