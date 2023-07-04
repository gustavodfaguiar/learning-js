import { Category } from "./category";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    const created_at = new Date();

    const props = {
      name: "Movie",
      description: "description",
      is_active: true,
      created_at
    };

    const category = new Category(props);

    // expect(category.name).toBe('Movie');
    // expect(category.description).toBe('description');
    // expect(category.is_active).toBeTruthy();
    // expect(category.created_at).toBe(created_at);
    expect(category.props).toStrictEqual(props);
  });
});
