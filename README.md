# binjai
## Install
```bash
npm i binjai
```
## Usage
```ts
import { List } from "binjai/collection/List";

List([1, 2, 3, 4])
  .filter(e => e % 2 === 0)
  .flatMap(n => List([n, n + 1])
  .toArray(true);

```
