interface StoreNode<Data> {
  id: string;
  children: Record<string, StoreNode<Data>>;
}

interface Result<Data> {
  id: string;
  key: string;
  data: Data;
}

class Trie<Data> {
  private id: number = 0;
  private root: StoreNode<Data>;
  private name: string;
  private idToData: Record<string, Result<Data>> = {};
  private keyToId: Record<string, string> = {};

  constructor(name: string = "store") {
    this.name = name;
    this.root = this._createNode();
  }

  private _getID = (): string => {
    return `${this.name}#${this.id++}`;
  };

  private _createNode = () => {
    return {
      id: this._getID(),
      children: {},
    };
  };

  private _getAllData = async (parent: StoreNode<Data>, results: Result<Data>[], limit: number) => {
    if (limit !== -1 && results.length >= limit) return;

    if (this.idToData[parent.id] !== undefined) {
      results.push(this.idToData[parent.id]);
    }

    for (const child of Object.values(parent.children)) {
      await this._getAllData(child, results, limit);
    }
  };

  add = (key: string, data: Data): Promise<string> => {
    let parent = this.root;
    for (const character of [...key]) {
      if (!parent.children[character]) {
        parent.children[character] = this._createNode();
      }
      parent = parent.children[character];
    }

    if (!this.idToData[parent.id]) {
      this.idToData[parent.id] = { id: parent.id, key, data };
      this.keyToId[key] = parent.id;
    } else {
      return Promise.reject("Data with same key exists");
    }

    return Promise.resolve("Data added");
  };

  update = async (id: string, key: string, data: Data): Promise<string> => {
    if (!this.idToData[id]) return Promise.reject("Data doesn't exists");

    if (key !== this.idToData[id].key) {
      await this.delete(id);
      await this.add(key, data);
      return "Data updated";
    }

    this.idToData[id] = { id, key, data };
    return "Data updated";
  };

  search = async (query: string, limit: number = -1): Promise<Result<Data>[]> => {
    let parent = this.root;
    for (const character of [...query]) {
      if (!parent.children[character]) return Promise.resolve([]);
      parent = parent.children[character];
    }

    const results: Result<Data>[] = [];
    await this._getAllData(parent, results, limit);
    return Promise.resolve(results);
  };

  delete = (key: string): Promise<string> => {
    if (!this.keyToId[key] || !this.idToData[this.keyToId[key]]) {
      return Promise.reject("Data doesn't exists");
    }

    delete this.idToData[this.keyToId[key]];
    delete this.keyToId[key];

    return Promise.resolve("Data deleted");
  };

  at = (key: string): Result<Data> => {
    if (!this.keyToId[key] || !this.idToData[this.keyToId[key]]) {
      throw "Data doesn't exists";
    }
    return this.idToData[this.keyToId[key]];
  };
}

export default Trie;
