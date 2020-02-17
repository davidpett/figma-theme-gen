import chalk from 'chalk'
import * as Figma from 'figma-js'
import { processFile } from 'figma-transformer'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { inspect } from 'util'
import { argv } from 'yargs'
import parseColors from './parse-colors'
import parseSpacing from './parse-spacing'
import parseTypography from './parse-typography'

const { config = 'figma.json' } = argv
const figmaConfig = JSON.parse(readFileSync(resolve(config as string), 'utf8'))
const accessToken = argv.accessToken || figmaConfig.accessToken
const outputFile = argv.outputFile || figmaConfig.outputFile
const fileId = argv.fileId || figmaConfig.fileId

const client = Figma.Client({ personalAccessToken: accessToken })

const parseStyles = (fileStyles: any[]) => {
  const textStyles = fileStyles.filter(({ styleType }) => styleType === 'TEXT')
  const colorStyles = fileStyles.filter(({ styleType }) => styleType === 'FILL')
  const [typographyTypes, typographyValues] = parseTypography(textStyles)
  const [colorTypes, colorValues] = parseColors(colorStyles)
  const [spacingTypes, spacingValues] = parseSpacing(figmaConfig.spacing)

  const styles = {
    ...typographyValues,
    ...colorValues,
    ...spacingValues
  }

  writeFileSync(
    resolve(outputFile),
    `${typographyTypes}
    ${colorTypes}
    ${spacingTypes}
    export interface IAppTheme {
      colors: IPalette<IThemeColor>
      colorSchemes: IColors
      spacing: IThemeSpacing
      typography: ITypographyStyle
    }

    export const appTheme: IAppTheme = ${inspect(styles)}`
  )
  console.log(chalk.bgBlue.black.bold('FIGMA -'), chalk.green.bold('COMPLETE'))
}

export const generateTheme = () => {
  if (!accessToken) {
    console.log(
      chalk.bgBlue.black.bold('FIGMA -'),
      chalk.red('no accessToken, please use `--accessToken` or add to the config file')
    )
  }
  if (!outputFile) {
    console.log(
      chalk.bgBlue.black.bold('FIGMA -'),
      chalk.red('no outputFile, please use `--outputFile` or add to the config file')
    )
  }
  if (!fileId) {
    console.log(
      chalk.bgBlue.black.bold('FIGMA -'),
      chalk.red('no fileId, please use `--fileId` or add to the config file')
    )
  }

  if (!accessToken || !outputFile || !fileId) {
    return
  }
  client
    .file(fileId)
    .then(({ data }) => {
      const { shortcuts } = processFile(data, fileId)
      parseStyles(shortcuts.STYLE)
    })
    .catch(err => console.warn(err))
}

generateTheme()
