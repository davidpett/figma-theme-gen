# figma-theme-gen

![Build and Publish](https://github.com/davidpett/figma-theme/workflows/Build%20and%20Publish/badge.svg)

This package will parse your figma file's local styles and create a theme for you to consume in your project.

## install

```
yarn add -D figma-theme-gen
```

## configure

By default, this looks for a `figma.json` file in the root of your project, you can use a different file name by specifying `--config foo.json`

In this config file, there are a few required options:

```
{
  "outputFile": "<path-to-output-theme-file>",
  "fileId": "<your-figma-file-id>",
  "accessToken": "<your-figma-access-token>"
}
```

You can also configure the spacing options by adding

```
{
  "spacing": {
    "baseUnit": 10, // by default this is 8, this will change all unspecified spacing to multiples of 10
    "padding": {
      "xs": 6,
      "s": 12,
      "m": 18,
      "l": 24,
      "xl": 30
    },
    "margin": {},
    "borderRadius": {}
  }
}
```
