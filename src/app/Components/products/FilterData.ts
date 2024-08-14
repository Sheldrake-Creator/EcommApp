export const color = [];

export const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'GenuinelyUnpleasant', label: 'Genuinely Unpleasant' },
      { value: 'Novelty', label: 'Novelty' },
      { value: 'Frivolous', label: 'Frivolous' },
      { value: 'PotentiallyLethal', label: 'Potentially Lethal' },
      { value: 'MostlyDeleterious', label: 'Mostly Deleterious' },
      { value: 'Psychicdamange', label: 'Psychic Damange' },
      { value: 'Unhinged', label: 'Unhinged' },
      { value: 'MildlyUpsetting', label: 'Mildly Upsetting' },
      { value: 'Ill-Concieved', label: 'Ill-Concieved' },
      { value: 'Confusing', label: 'Confusing' },
      { value: 'Silly', label: 'Silly' },
      { value: 'InPoorTaste', label: 'In Poor Taste' },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: '', label: 'Scheinhardt Wig Company' },
      { value: '', label: 'ACME' },
      { value: '', label: 'Burns Industries' },
      { value: '', label: 'Sterling Cooper' },
      { value: '', label: 'The Bluth Company' },
      { value: '', label: 'Brawndo' },
      { value: '', label: 'Vandelay Industries' },
      { value: '', label: 'Aperture Science' },
      { value: '', label: 'Susquehana Hat Co.' },
    ],
  },
  {
    id: 'stock',
    name: 'Real or Fake',
    options: [
      { value: 'real', label: 'Real' },
      { value: 'fake', label: 'Fake' },
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
      { value: '1-50', label: '$1 To $50' },
      { value: '51-100', label: '$51 To $100' },
      { value: '101-200', label: '$101 To $200' },
      { value: '201-500', label: '$201 To $500' },
      { value: '501+', label: '$500+' },
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
];

export const sortOptions = [
  { name: 'Price: Low to High', query: 'price_low', current: false },
  { name: 'Price: High to Low', query: 'price_high', current: false },
];
