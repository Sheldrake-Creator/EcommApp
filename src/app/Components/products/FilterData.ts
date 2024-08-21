export const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Genuinely Unpleasant', label: 'Genuinely Unpleasant' },
      { value: 'Novelty', label: 'Novelty' },
      { value: 'Frivolous', label: 'Frivolous' },
      { value: 'Potentially Lethal', label: 'Potentially Lethal' },
      { value: 'Mostly Deleterious', label: 'Mostly Deleterious' },
      { value: 'Psychic Ddamange', label: 'Psychic Damange' },
      { value: 'Unhinged', label: 'Unhinged' },
      { value: 'Mildly Upsetting', label: 'Mildly Upsetting' },
      { value: 'Ill-Concieved', label: 'Ill-Concieved' },
      { value: 'Confusing', label: 'Confusing' },
      { value: 'Silly', label: 'Silly' },
      { value: 'In Poor Taste', label: 'In Poor Taste' },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'Scheinhardt Wig Company', label: 'Scheinhardt Wig Company' },
      { value: 'ACME', label: 'ACME' },
      { value: 'Burns Industries', label: 'Burns Industries' },
      { value: 'Sterling Cooper', label: 'Sterling Cooper' },
      { value: 'The Bluth Company', label: 'The Bluth Company' },
      { value: 'Brawndo', label: 'Brawndo' },
      { value: 'Vandelay Industries', label: 'Vandelay Industries' },
      { value: 'Aperture Science', label: 'Aperture Science' },
      { value: 'Susquehana Hat Co.', label: 'Susquehana Hat Co.' },
    ],
  },
  {
    id: 'veracity',
    name: 'Real or Fake',
    options: [
      { value: 'true', label: 'Real' },
      { value: 'false', label: 'Fake' },
    ],
  },
  // {
  //   id: 'size',
  //   name: 'Size of Object(s)',
  //   options: [
  //     { value: 'S', label: 'S' },
  //     { value: 'M', label: 'M' },
  //     { value: 'L', label: 'L' },
  //   ],
  // },
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
      { value: '501', label: '$1000+' },
    ],
  },
  {
    id: 'disccout',
    name: 'On Sale?',
    options: [
      {
        value: '0',
        label: 'Under construction',
      },
      //     {
      //       value: '1',
      //       label: 'False',
      //     },
    ],
  },
];

export const sortOptions = [
  { name: 'Price: Low to High', query: 'price_low', current: false },
  { name: 'Price: High to Low', query: 'price_high', current: false },
];
