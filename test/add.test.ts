import Store from "../src";

describe("add funtionality", () => {
  it("should add single data item into store", async () => {
    const store = new Store<string>("test");

    await store.add("rishabh", "https://rishabhchawla.co");

    const dataFromStore = await store.at("rishabh");

    expect(dataFromStore.data).toBe("https://rishabhchawla.co");
    expect(dataFromStore).toMatchSnapshot();
  });

  it("should add multiple data items into store", async () => {
    const store = new Store<string>("test");

    await store.add("twitter", "https://twitter.com/_rishabh3112");
    await store.add("website", "https://rishabhchawla.co");
    await store.add("read.cv", "https://read.cv/");
    await store.add("hackerrank", "https://hackerrank.com/rishabh3112");

    const emptySearch = await store.search("");
    const hackerrank = await store.at("hackerrank");

    expect(emptySearch).toMatchSnapshot();
    expect(hackerrank).toMatchSnapshot();
  });
});
