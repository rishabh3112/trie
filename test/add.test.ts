import Store from "../src";

describe("add funtionality", () => {
  it("should add single data item into store", async () => {
    const store = new Store<string>("test");
    await store.add("rishabh", "https://rishabhchawla.co");

    const dataFromStore = await store.at("rishabh");
    expect(dataFromStore.data).toBe("https://rishabhchawla.co");
    expect(dataFromStore).toMatchSnapshot();
  });
});
