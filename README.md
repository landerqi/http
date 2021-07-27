# @landerqi/http

## Install

```bash
yarn add @lanerqi/http --registry=https://registry.npmjs.org
```

## Usage

> The usage is the same as Axios

```js
import http from '@landerqi/http'

http.get(url[, config])
http.post(url[, data[, config]])
http.jsonp(url[, data[, config]])
```

> Advanced usage: Create http instance

```js
import { createHttp } from '@landerqi/http'

const httpOption = {
  baseURL: '', // base url
  timeout: 5000, // time out
  // axios Unique field: more info: https://github.com/axios/axios
  headers: {}, // Set header information
  // jsonp
  callbackKey: 'callback', // Parameter name that carries the name of the callback function
  callbackPrefix: '__jp', // Callback function name prefix
  callbackName: '', // Callback function name
}
const http = createHttp(httpOption)
```
