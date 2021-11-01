import Store from "../src";

describe("delete funtionality", () => {
  it("should delete single data item from store", async () => {
    const store = new Store<string>("test");

    await store.add("rishabh", "https://rishabhchawla.co");

    const beforeDelete = await store.at("rishabh");
    expect(beforeDelete).toMatchSnapshot();

    await store.delete("rishabh");

    try {
      await store.at("rishabh");
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("should throw error if item doesn't exists", async () => {
    const store = new Store<string>("test");
    try {
      await store.delete("rishabh");
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});
