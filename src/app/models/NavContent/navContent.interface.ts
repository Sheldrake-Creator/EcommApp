export interface NavBarContentInterface {
  section1: any;
  section2: any;
}

export interface SectionInterface {
  id: string;
  name: string;
  featured: FeaturedItemInterface[];
  categories: CategoryInterface[];
}

export interface FeaturedItemInterface {
  name: string;
  href?: string;
  id?: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CategoryInterface {
  id?: string;
  categoryId?: string;
  name: string;
  items: CategoryItemInterface[];
}

export interface CategoryItemInterface {
  value: string;
  label: string;
}
