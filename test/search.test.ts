import Store from "../src";

describe("search functionality", () => {
  it("should search item which exists in store", async () => {
    const store = new Store<string>();

    await store.add("hinata", "karusuno");
    await store.add("kageyama", "karusuno");

    const hinata = await store.search("hinata");
    const kageyama = await store.search("kageyama");

    expect(hinata).toMatchSnapshot();
    expect(kageyama).toMatchSnapshot();
  });

  it("should return empty if no items found for the name", async () => {
    const store = new Store<string>();

    await store.add("hinata", "karusuno");
    await store.add("kageyama", "karusuno");

    const daichi = await store.search("daichi");

    expect(daichi).toMatchSnapshot();
  });

  it("should return limited items with limit is provided", async () => {
    const store = new Store<string>();

    await store.add("pickachu", "ash");
    await store.add("pichu", "unknown");

    const limitOne = await store.search("pic", 1);

    expect(limitOne).toMatchSnapshot();
  });
});
