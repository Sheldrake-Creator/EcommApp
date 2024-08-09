export const color = [
  'white',
  'Black',
  'Red',
  'marun',
  'Being',
  'Pink',
  'Green',
  'Yellow',
];

export const filters = [
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
    name: 'Real or Fake',
    options: [
      { value: 'in_stock', label: 'In Stock' },
      { value: 'out of_stock', label: 'Out Of Stock' },
    ],
  },
  {
    id: 'size',
    name: 'Size of Object(s)',
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
      { value: '159-399', label: '$1 To $50' },
      { value: '399-999', label: '$51 To $100' },
      { value: '999-1999', label: '$101 To $200' },
      { value: '1999-2999', label: '$201 To $500' },
      { value: '3999-4999', label: '$500+' },
    ],
  },
  {
    id: 'disccout',
    name: 'On Sale?',
    options: [
      {
        value: '0',
        label: 'True',
      },
      {
        value: '1',
        label: 'False',
      },
    ],
  },
  {
    id: 'stock',
    name: 'Real or Fake',
    options: [
      { value: 'in_stock', label: 'Real Products' },
      { value: 'out_of_stock', label: 'Fake Products' },
    ],
  },
];

export const sortOptions = [
  { name: 'Price: Low to High', query: 'price_low', current: false },
  { name: 'Price: High to Low', query: 'price_high', current: false },
];
