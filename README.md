
# Generator Wow React - (Module NPM)

This module will help you to create structural directory folder for generating component, feature. Our case we work on SBDUI Library. 



## Environment requirement

- yarn package
```
  npm install -g yarn
```
- node version 16.17


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