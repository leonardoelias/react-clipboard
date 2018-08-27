# React Clipboard

A simple React Clipboard.

```
import React from "react";
import Clipboard from "react-clipboard";

const MyComponent = () => (
  <Clipboard
    text={"Copy on Button Click"}
    render={({copy}) => <button onClick={copy}>Copy</button>}
  />
)

export default MyComponent;
```
