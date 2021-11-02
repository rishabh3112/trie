# trie

[![codecov](https://codecov.io/gh/rishabh3112/trie/branch/main/graph/badge.svg?token=P431NYNQHG)](https://codecov.io/gh/rishabh3112/trie)
[![trie](https://github.com/rishabh3112/trie/actions/workflows/node.yaml/badge.svg)](https://github.com/rishabh3112/trie/actions/workflows/node.yaml)
![npm (scoped)](https://img.shields.io/npm/v/@rishabh3112/trie)

Promise based Trie Store implementation.

## Installation
```bash
npm install @rishabh3112/trie
```

## Usage
```js
const store = new TrieStore();

```

### Methods

- **store.add**: `(key: string, data: Data) => Promise<string>`
- **store.delete**: `(key: string) => Promise<string>`
- **store.at**: `(key: string) => Promise<Result<Data>>`
- **store.search**: `(query: string, limit?: number) => Promise<Result<Data>[]>`
- **store.update**: `(id: string, key: string, data: Data) => Promise<string>`

## License
MIT