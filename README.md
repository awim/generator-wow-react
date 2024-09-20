# Generator Wow React - (Module NPM)

This module will help you to create structural directory folder for generating component, feature. Our case we work on SBDUI Library.

## Environment requirement

- yarn package

```
  npm install -g yarn
```

- node version > 16.17

## Concept

When using generator-wow-react you can simply generate your component or feature on your react project application

## Generator Settings
You can configure the generator settings by modifying the .yo-rc.json file. Here are the available options:

```componentGeneratedDirPath```: The directory path where generated components will be placed (e.g., "src/app/components").

```featureDirPath```: The base directory for feature modules (e.g., "src/app/features").

```featureGeneratedFolders```: A comma-separated list of subfolders within each feature module (e.g., "services, components, hooks, types"). Use this to segment your code logically.

```generateStorybookComponent```: Set to true if you want to generate Storybook stories for your components.

```generateTestComponent```: Set to true if you want to generate test files for your components.

```storyFolder```: The folder where Storybook stories will be created (e.g., "src/stories").

```generateHelperComponent```: Set to true if you want to generate helper components.

## Register the command
Register the command on your package.json file to recognize the generator as part of your cli
- open package.json
- add these line under scripts property
  ```
  "scripts": {
    ...
    "wow:component": "yo wow-react:component",
    "wow:feature": "yo wow-react:feature",
  }
  ```
- save the modification
- run the command using `yarn` or `npm run` 
  
  `yarn wow:component YourComponentName.Prefix --path /your/custom/path`

#### Basic syntax making component

```
  yarn wow-component ComponentName
```

it will make directory folder like this

```
└── src/
    └── ui/
        └── component/
            └── ComponentName/
                ├── _test_/
                │   └── ComponentName.test.tsx
                ├── story/
                │   ├── ComponentName.story.mdx
                │   └── ComponentName.story.tsx
                ├── ComponentName.module.scss
                ├── ComponentName.tsx
                ├── ComponentNameHelper.ts
                └── index.ts
```

#### Custom Path syntax making component

If you want to make a root component grouping example Chart/BarChart, you can use syntax like this

```
  yarn wow-component RootComponentName/ComponentName
```

it will make directory folder like this

```
└── src/
    └── ui/
        └── component/
            └── RootComponentName/
                └── ComponentName/
                    ├── _test_/
                    │   └── ComponentName.test.tsx
                    ├── story/
                    │   ├── ComponentName.story.mdx
                    │   └── ComponentName.story.tsx
                    ├── ComponentName.module.scss
                    ├── ComponentName.tsx
                    ├── ComponentNameHelper.ts
                    └── index.ts
```

#### Basic syntax making feature

```
  yarn wow-feature NameFeature
```

it will make directory folder like this

```
└── src/
    └── features/
        └── component/
            ├── FeatureName/
            │   ├── _test_/
            │   │   └── FeatureName.test.tsx
            │   ├── story/
            │   │   ├── FeatureName.story.mdx
            │   │   └── FeatureName.story.tsx
            │   ├── FeatureName.module.scss
            │   ├── FeatureName.tsx
            │   ├── FeaHelpertureName.ts
            │   └── index.ts
            ├── hooks/
            │   └── chart.hook.ts
            ├── services/
            │   └── chart.service.ts
            ├── types/
            │   └── chart.type.ts
            └── index.ts
```

```
yarn wow-component OtherFeatureComponent --path src/features/RootFeature
```

it will make directory folder like this

```
└── src/
    └── features/
        └── component/
            ├── FeatureName/
            │   ├── _test_/
            │   │   └── FeatureName.test.tsx
            │   ├── story/
            │   │   ├── FeatureName.story.mdx
            │   │   └── FeatureName.story.tsx
            │   ├── FeatureName.module.scss
            │   ├── FeatureName.tsx
            │   ├── FeaHelpertureName.ts
            │   └── index.ts
            ├── hooks/
            │   └── chart.hook.ts
            ├── services/
            │   └── chart.service.ts
            ├── types/
            │   └── chart.type.ts
            └── index.ts
                └── component/
            ├── OtherFeatureComponent/
            │   ├── _test_/
            │   │   └── OtherFeatureComponent.test.tsx
            │   ├── story/
            │   │   ├── OtherFeatureComponent.story.mdx
            │   │   └── OtherFeatureComponent.story.tsx
            │   ├── OtherFeatureComponent.module.scss
            │   ├── OtherFeatureComponent.tsx
            │   ├── FeaHelpertureName.ts
            │   └── index.ts
            ├── hooks/
            │   └── chart.hook.ts
            ├── services/
            │   └── chart.service.ts
            ├── types/
            │   └── chart.type.ts
            └── index.ts
```

#### Syntax for making component on specific feature directory

example
```
yarn wow-component Test --path src\features\AccountInformation\components
```

## How to Use

on your project root directory

#### 1. Installing

using npm

```
  npm install yo generator-wow-react
```

using yarn

```bash
  yarn add -D yo generator-wow-react
```

#### 2. Generate component

```bash
    yo wow-react:component <ComponentName> -path <AlternativePath>
```

#### 3. Generate Feature

```bash
    yo wow-react:feature <FeatureName> -path <AlternativePath>
```

#### 4. Store your configuration
generator-wow-react initially save the configuration in yo-rc.json
```json
"generator-wow-react": {
    "featureDirPath": "src/main/webapp/app/modules",
    "featureGeneratedFolders": "services, components, hooks, types, utils, __tests__",
    "componentGeneratedDirPath": "src/main/webapp/app/components",
    "generateTestComponent": true,
    "generateStorybookComponent": false
  }
```
update the configuration based on your needs

## How to Enhance

#### 1. Clone from git

```
git clone https://github.com/awim/generator-wow-react.git
```

#### 2. Clone from git

```
yarn install
```

#### 3. Connect to your local project

- Go to your root directory generator-wow-react, and in terminal type "yarn link". This section is to register our package (generator-wow-react) to yarn registry local.

```
yarn link
```

- Go to our root directory of your project (our case is SBDUI root directory), and in terminal type "yarn link generator-wow-react". This section is to use our package (generator-wow-react) on our project (SBDUI)

```
yarn link generator-wow-react
```
