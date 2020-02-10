import chalk from 'chalk'
import { camelCase } from './utils'

const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .split('.')[0]

const parseColorScheme = (items: any[]): [{ [x: string]: string }, string[]] => {
  const themeColorNames: string[] = []
  const themeColorValues = items
    .map(({ name, styles }) => {
      const [{ color }] = styles
      const colorName = camelCase(name.split('/')[1])
      themeColorNames.push(`'${colorName}'`)
      return {
        [colorName]: rgbToHex(color.r * 255, color.g * 255, color.b * 255),
      }
    })
    .reduce((prev, cur) => ({ ...prev, ...cur }))
  return [themeColorValues, themeColorNames]
}
const parseColors = (items: any[]): [string, any] => {
  console.log(chalk.bgBlue.black.bold('FIGMA -'), 'parseColors')

  const lightColors = items.filter(({ name }) => name.split('/')[0] === 'light')
  const darkColors = items.filter(({ name }) => name.split('/')[0] === 'dark')
  const [light, colorNames] = parseColorScheme(lightColors)
  const [dark] = parseColorScheme(darkColors)

  const theme = `export type IThemeColor = ${colorNames.join('|')}
export type IPalette<T extends string> = { [key in T]: string }
export interface IColors {
  dark: IPalette<IThemeColor>
  light: IPalette<IThemeColor>
  'no-preference': IPalette<IThemeColor>
}`
  return [
    theme,
    {
      colors: light,
      colorSchemes: {
        light,
        dark,
        'no-preference': light,
      },
    },
  ]
}

export default parseColors
