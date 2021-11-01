import Store from "../src";

describe("update funtionality", () => {
  it("should update the existing item", async () => {
    const store = new Store<string[]>("pokemon");
    await store.add("ash ketchup", ["pickachu"]);

    const ash = await store.at("ash ketchup");

    await store.update(ash.id, "ash ketchum", ["pickachu", "chalizard"]);

    const ashKetchum = await store.at("ash ketchum");
    expect(ashKetchum).toMatchSnapshot();

    try {
      await store.at("ash ketchup");
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("should update if key is same", async () => {
    const store = new Store<string[]>("pokemon");
    await store.add("ash ketchum", ["pickachu"]);

    const ash = await store.at("ash ketchum");

    await store.update(ash.id, "ash ketchum", ["pickachu", "chalizard"]);

    const ashKetchum = await store.at("ash ketchum");
    expect(ashKetchum).toMatchSnapshot();
  });

  it("should throw error if id doesn't exists", async () => {
    const store = new Store<string[]>();
    try {
      await store.update("id", "ash ketchum", ["pickachu", "chalizard"]);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});
