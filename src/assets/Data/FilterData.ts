export const color = [
  'White',
  'Black',
  'Red',
  'Maroon',
  'Beige',
  'Pink',
  'Green',
  'Yellow',
];

export const filters = [
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'black', label: 'Black' },
    ],
  },

  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'black', label: 'Black' },
    ],
  },
  {
    id: 'stock',
    name: 'Availability',
    options: [
      { value: 'in_stock', label: 'In Stock' },
      { value: 'out of_stock', label: 'Out Of Stock' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
    ],
  },
];
export const singleFilter = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '1-49', label: '1 To 49' },
      { value: '50-199', label: '50 To 199' },
      { value: '200-499', label: '200 To 499' },
      { value: '500-999', label: '1999 To 999' },
      { value: '1000-2000', label: '1000 To 2000' },
    ],
  },
  {
    id: 'disccout',
    name: 'DISCOUNT RANGE',
    options: [
      {
        value: '10',
        label: '10% And Above',
      },

      { value: '20', label: '20% And Above' },
      { value: '30', label: '30% And Above' },
      { value: '40', label: '40% And Above' },
      { value: '50', label: '50% And Above' },
      { value: '60', label: '60% And Above' },
      { value: '70', label: '70% And Above' },
      { value: '80', label: '80% And Above' },
      { value: '90', label: '90% And Above' },
    ],
  },
  {
    id: 'stock',
    name: 'Availability',
    options: [
      { value: 'in_stock', label: 'In Stock' },
      { value: 'out_of_stock', label: 'Out Of Stock' },
    ],
  },
];

export const sortOptions = [
  { name: 'Price: Low to High', query: 'price_low', current: false },
  { name: 'Price: High to Low', query: 'price_high', current: false },
];
