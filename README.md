# babel-plugin-transform-flow-interface-imports

Babel plugin to removed useless flow interface modules

----

## Why babel-plugin-transform-flow-interface-imports

For vscode, we can use flow Type Annotations without having flow installed, and with the help of Babel plugin -- babel-plugin-transform-flow-strip-types, all type annations can be removed. And interface definitions can be removed, either.

But for those imported interfaces, the import statements and the modules are kept in output. As time goes on, more and more interfaces are added, and more and more useless(empty) modules kept in output, which lead to bandwidth waste.  

## Where to add babel-plugin-transform-flow-interface-imports

- [babelrc](https://babeljs.io/docs/usage/babelrc/)
- [babel-loader](https://github.com/babel/babel-loader)

## Example

#### Plugin usage

``` javascript
 {
  "plugins": [
    "transform-flow-strip-types",
    ["transform-flow-interface-imports", {
      "modules": [{
        "isRegExp": true,
        "name": '/interfaces/',
      }],
    }]
  ]
 }
```

```javascript
import {
  CreateManagerPayload,
  EditManagerPayload,
  DeleteManagerPayload,
} from '../interfaces/manager';

* createManager(
  { payload }: { payload: CreateManagerPayload },
  { call, put },
) {
  yield call(add, { ...payload });

  yield put({
    type: 'queryList',
  });
}

      ↓ ↓ ↓ ↓ ↓ ↓
      
* createManager(
  { payload }, // this removing is by babel-plugin-transform-flow-strip-types
  { call, put },
) {
  yield call(add, { ...payload });

  yield put({
    type: 'queryList',
  });
}
```

## Usage

```bash
npm install babel-plugin-transform-flow-interface-imports --save-dev
```

Via `.babelrc` or babel-loader.

```js
{
  "plugins": [["transform-flow-interface-imports", options]]
}
```

### options

`options` is an object.

```javascript
{
  "modules": [{
    "isRegExp": true,
    "name": '/interfaces/',
  }]
}
```
### Note

`babel-plugin-transform-flow-strip-types` is included in `babel-preset-react`