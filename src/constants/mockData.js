import logo from '../assets/foxbar-logo.png';
export const ingredientTypes = [
  {
    id: 1,
    name: 'vodka'
  },
  {
    id: 2,
    name: 'rum'
  }
];

export const vendor = {
  name: 'Fox Bar',
  id: 1,
  logo,
  phoneNumber: 3125218000,
  items: [
    {
      id: 1,
      name: 'fortune and haste',
      description: [
        'dry gin',
        'suze',
        'lemon',
        'ginger syrup',
        'peach bitters'
      ],
      price: 12
    },
    {
      id: 2,
      name: 'the catt damon',
      description: [
        'pineapple rum',
        'hibiscus',
        'cordial',
        'lime',
        'angostura'
      ],
      price: 12
    },
    {
      id: 3,
      name: 'the ultra boom',
      description: [
        'mezcal',
        'ancho vermouth',
        'aperol',
        'grapefruit bitters'
      ],
      price: 12
    },
    {
      id: 4,
      name: 'please be seated',
      description: [
        'reposado',
        'salers',
        'graphefruit',
        'lime',
        'celery bitters',
        'salt'
      ],
      price: 12
    },
    {
      id: 5,
      name: 'the shannone rose',
      description: [
        'applejack',
        'lillet blanc',
        'peach',
        'lemon',
        'rose water'
      ],
      price: 12
    },
    {
      id: 6,
      name: 'the northerly island iced tea',
      description: [
        'rye',
        'aged rum',
        'fernet menta',
        'lemon',
        'ginger beer'
      ],
      price: 12
    },
    {
      id: 7,
      name: 'sky rockets in flight',
      description: [
        'bourbon',
        'cynar',
        'sherry',
        'raspberry',
        'herbsaint'
      ],
      price: 12
    }
  ],
  ingredients: [
    {
      id: '1',
      type: ingredientTypes[0],
      name: "tito's",
      price: 8,
      upgradePrice: 2,
      subPrice: 2
    },
    {
      id: 2,
      type: ingredientTypes[0],
      name: 'grey goose',
      price: 12,
      upgradePrice: 3,
      subPrice: 3
    },
    {
      id: 3,
      type: ingredientTypes[0],
      name: 'bankers',
      price: 7,
      upgradePrice: 0,
      subPrice: 0
    },
    {
      id: 4,
      type: ingredientTypes[1],
      name: 'captain morgan',
      price: 8,
      upgradePrice: 2,
      subPrice: 2
    },
    {
      id: 5,
      type: ingredientTypes[1],
      name: "sailor jerry's",
      price: 9,
      upgradePrice: 2,
      subPrice: 2
    },
    {
      id: 6,
      type: ingredientTypes[1],
      name: 'bankers',
      price: 7,
      upgradePrice: 0,
      subPrice: 0,
    }
  ],
  modifications: {
    types: {
      add: [
        ingredientTypes,
        'price'
      ],
      upgrade: [
        ingredientTypes,
        'price'
      ],
      remove: [
        ingredientTypes
      ],
      sub: [
        ingredientTypes,
        'price'
      ]
    }
  },
  location: {
    streetAddress: '123 N Green St',
    city: 'Chicago',
    state: 'Il',
    latitude: 41.88376239999999,
    longitude: -87.64840149999999,
    formattedAddress: '113 N Green St, Chicago, IL 60607, USA'
  },
  weekday_text: [
    'Monday: 6:00 PM – 1:00 AM',
    'Tuesday: 6:00 PM – 1:00 AM',
    'Wednesday: 6:00 PM – 1:00 AM',
    'Thursday: 6:00 PM – 2:00 AM',
    'Friday: 6:00 PM – 2:00 AM',
    'Saturday: 6:00 PM – 3:00 AM',
    'Sunday: 6:00 PM – 1:00 AM'
  ]
};

export default vendor;
