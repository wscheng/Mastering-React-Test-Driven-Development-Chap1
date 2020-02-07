# 2020/02/07

[TOC]

---

### 將所有轉換 JS(X)成 TS(X)

1. 安裝 typescript 相關套件

```bash
npm install --save-dev typescript ts-loader source-map-loader
```

2. 新增 tsconfig.json (新增完後，src test 的資料夾下的 ts, tsx 檔案，就會看到 IDE 提醒哪些部分不符合 typescript 語法)

```javascript
{
  "compilerOptions": {
    "outDir": "./dist/", // path to output directory
    "sourceMap": true, // allow sourcemap support
    "strictNullChecks": true, // enable strict null checks as a best practice
    "module": "es6", // specify module code generation
    "jsx": "react", // use typescript to transpile jsx to js
    "target": "es5", // specify ECMAScript target version
    "allowJs": true // allow a partial TypeScript and JavaScript codebase
  },
  "include": ["./src/", "./test"]
}
```

3. 將所有.js 副檔名改為.tsx
4. 修改 import

```javascript
import React from "react";
// 必須改為
import * as React from "react";
```

5. 新增宣告 interface：I_props_Customer, I_props_Customer
6. 修改 React 的 Function Component

#### Appointment.tsx

#### Appointment.test.tsx

### 讓 jest 支援 typescript

1. 安裝@types/jest, ts-jest

```bash
npm install --save-dev @types/jest ts-jest
```

2. 修改 jest 設定

- 方法 A: package.json 加上 jest 設定

```javascript
"jest": {
    "preset": "ts-jest",
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
```

- 方法 B：直接新增 jest.config.js

```javascript
module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
```

#### 錯誤 debug

- 錯誤：describe, it 找不到

  > ANS: 安裝@types/jest
  >
  > ```bash
  > npm install --save-dev @types/jest
  > ```

- 錯誤：

```bash
SyntaxError: C:\Users\WeiShengCheng\Documents\RookieTraining\appointments\src\Appointment.tsx: Unexpected reserved word 'interface' (4:0)
```

> ANS: jest 的 config 中要加入以下
>
> ```javascript
> "transform": {
>       "^.+\\.tsx?$": "ts-jest"
>     },
>     "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
>     "moduleFileExtensions": [
>       "ts",
>       "tsx",
>       "js",
>       "jsx",
>       "json",
>       "node"
>     ]
> ```

- 錯誤：TypeError: Cannot read property 'createElement' of undefined

```bash
    TypeError: Cannot read property 'createElement' of undefined

      17 |   });
      18 |   it("renders the customer first name", () => {
   > 19 |     render(<Appointment appointment={appointments[0]} />);
            |
```

> ANS: import 必須修改成 TS 可以接受的

##### TODAY's TIPS

> - npm -D 是--save-dev 的精簡寫法

### 修改 webpack

- 在 webpack build 後，網頁發生以下錯誤

```bash
Uncaught ReferenceError: React is not defined
    at Object.react (external "React":1)
    at __webpack_require__ (bootstrap:19)
    at Module../src/index.tsx (index.tsx:1)
    at __webpack_require__ (bootstrap:19)
    at bootstrap:83
    at bootstrap:83
```

> - 請教 Fam
>   ANS: 發現 webpack.config.js 中加入了
>
> ```bash
>   externals: {
>     react: "React",
>     "react-dom": "ReactDOM"
>   },
> ```

### 解析 interface FunctionComponent(Still Working)

```typescript
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```

> - [interface 的 function type](http://www.typescriptlang.org/docs/handbook/interfaces.html#function-types)

```typescript
type FC<P = {}> = FunctionComponent<P>;
```

> - [型別別名](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)

////

### webpack

#### mode

mode 的 default value 是 production，可以使用的有 development, production, none

- development, production 有自己默認的優化選項
- none 會不選擇任何優化的選項(option)

##### command line 指定 build 的環境

```bash
webpack --mode=development
```

##### Reference

[webpack official configuration](https://webpack.js.org/configuration/)
[中文 webpack 文件](https://webpack.docschina.org/)

#### resolve

要解析的檔案，副檔名：extensions

#### module(Still working)

##### rules

###### rules conditions

1. resource
2. issuer
   > When we import **_'./style.css'_** within **_app.js_**, the resource is **_/path/to/style.css_** and the issuer is **_/path/to/app.js_**.

###### rules results

1. Applied loaders
2. Parser options
   > - enforce affects the loader
   > - parser affects the parser
