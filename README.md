
# Generator Wow React - (Module NPM)

This module will help you to create structural directory folder for generating component, feature. Our case we work on SBDUI Library. 



## Environment requirement

- yarn package
```
  npm install -g yarn
```
- node version 16.17

## Concept
When using generator-wow-react you can simply generate your component or feature on your project application
#### Basic syntax making component
```
  yarn component ComponentName
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
  yarn component RootComponentName/ComponentName
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
  yarn feature NameFeature
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

## How to Use

on your project root directory

#### 1. Installing
using npm
```
  npm install generator-wow-react
```

using yarn
```
  yarn add generator-wow-react
```

#### 2. Generate component

```
    yo wow-react:component
```

#### 3. Generate Feature

```
    yo wow-react:feature
```



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