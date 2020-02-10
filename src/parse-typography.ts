import chalk from 'chalk'
import { camelCase } from './utils'

const parseTypography = (items: any[]): [string, any] => {
  console.log(chalk.bgBlue.black.bold('FIGMA -'), 'parseTypography')

  const textVariants: string[] = []
  const styles = items
    .map(({ name, typeStyles: style }) => {
      const variantName = camelCase(name)
      textVariants.push(`'${variantName}'`)
      return {
        [variantName]: {
          fontFamily: ['Roboto', 'SF Pro Text', 'SF Pro Display'].includes(style.fontFamily)
            ? 'System'
            : style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: `${style.fontWeight}`,
          letterSpacing: style.letterSpacing,
          lineHeight: style.lineHeightPx,
          textTransform:
            style.textCase === 'UPPER'
              ? 'uppercase'
              : style.textCase === 'LOWER'
              ? 'lowercase'
              : style.textCase === 'TITLE'
              ? 'capitalize'
              : 'none',
        },
      }
    })
    .reduce((result, item) => {
      const [key] = Object.keys(item)
      result[key] = item[key]
      return result
    }, {})

  return [
    `import { TextStyle } from 'react-native'

    export type ITextVariant = ${textVariants.join('|')}
    export type ITextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy'
    export type ITypographyStyle = { [key in ITextVariant | ITextWeight]: TextStyle }`,
    {
      typography: {
        light: { fontWeight: '300' },
        regular: { fontWeight: '400' },
        medium: { fontWeight: '500' },
        semibold: { fontWeight: '600' },
        bold: { fontWeight: '800' },
        heavy: { fontWeight: '900' },
        ...styles,
      },
    },
  ]
}

export default parseTypography
