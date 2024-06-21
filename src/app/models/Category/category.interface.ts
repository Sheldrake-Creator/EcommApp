export interface CategoryInterface {
  categoryId: number;
  name: string;
  parentCategory: CategoryInterface;
  level: number;
}
