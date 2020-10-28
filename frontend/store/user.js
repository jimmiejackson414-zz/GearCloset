export const state = () => ({
  id: 1,
  avatar_url: null,
  country: 'United States',
  email: 'benny.timkins@gmail.com',
  first_name: 'Benny',
  friends: [
    {
      id: 2,
      avatar_url: 'https://cdn.vuetifyjs.com/images/john.jpg',
      country: 'United States',
      email: 'michael.scott@gmail.com',
      first_name: 'Michael',
      last_name: 'Scott',
      password: 'password',
      subscription_level: 'annual member',
      system: 'Imperial',
      trail_name: 'Boss',
      packs: [
        {
          id: 2,
          name: 'JMT',
          active: 1,
          created_at: '2020-03-07 20:44:51',
          updated_at: '2020-03-07 20:44:51',
          categories: [
            {
              id: 10,
              name: 'The Big 3',
              pack_id: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51',
              items: [
                {
                  id: 1,
                  name: 'Zpacks Arc Haul',
                  weight: 24.4,
                  weight_type: 'oz',
                  price: 22000,
                  generic_type: 'Backpack',
                  category_id: 1,
                  consumable: 1,
                  worn: 1,
                  quantity: 1,
                  created_at: '2020-03-07 20:45:51',
                  updated_at: '2020-03-07 20:45:51'
                },
                {
                  id: 2,
                  name: 'REI Magma 15 Long',
                  weight: 24.4,
                  weight_type: 'oz',
                  price: 22000,
                  generic_type: 'Sleeping Bag',
                  category_id: 1,
                  consumable: 0,
                  worn: 0,
                  quantity: 1,
                  created_at: '2020-03-07 20:45:51',
                  updated_at: '2020-03-07 20:45:51'
                }
              ]
            },
            {
              id: 2,
              name: 'Kitchen',
              pack_id: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51',
              items: [
                {
                  id: 3,
                  name: 'MSR Pocket Rocket 2',
                  weight: 24.4,
                  weight_type: 'oz',
                  price: 22000,
                  generic_type: 'Stove',
                  category_id: 2,
                  consumable: 1,
                  worn: 0,
                  quantity: 1,
                  created_at: '2020-03-07 20:45:51',
                  updated_at: '2020-03-07 20:45:51'
                },
                {
                  id: 4,
                  name: 'Toaks 700mL Pot',
                  weight: 24.4,
                  weight_type: 'oz',
                  price: 22000,
                  generic_type: 'Titanium Pot',
                  category_id: 2,
                  consumable: 1,
                  worn: 1,
                  quantity: 1,
                  created_at: '2020-03-07 20:45:51',
                  updated_at: '2020-03-07 20:45:51'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      avatar_url: 'https://avatars0.githubusercontent.com/u/58872083?v=4',
      country: 'United States',
      email: 'pam.beesley@gmail.com',
      first_name: 'Pam',
      last_name: 'Beesley',
      password: 'password',
      subscription_level: 'monthly member',
      system: 'Imperial',
      trail_name: 'Artsy Fartsy'
    },
    {
      id: 4,
      avatar_url: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      country: 'United States',
      email: 'dwight.schrute@gmail.com',
      first_name: 'Dwight',
      last_name: 'Schrute',
      password: 'password',
      subscription_level: 'free',
      system: 'Imperial',
      trail_name: 'Recyclops'
    },
    {
      id: 5,
      avatar_url: null,
      country: 'United States',
      email: 'jim.halpert@gmail.com',
      first_name: 'Jim',
      last_name: 'Halpert',
      password: 'password',
      subscription_level: 'annual member',
      system: 'Imperial',
      trail_name: 'Big Tuna'
    },
    {
      id: 6,
      avatar_url: 'https://avatars0.githubusercontent.com/u/38821008?v=4',
      country: 'United States',
      email: 'holly.flax@gmail.com',
      first_name: 'Holly',
      last_name: 'Flax',
      password: 'password',
      subscription_level: 'annual member',
      system: 'Imperial',
      trail_name: 'HR'
    },
    {
      id: 7,
      avatar_url: 'https://avatars1.githubusercontent.com/u/27827979?v=4',
      country: 'United States',
      email: 'oscar.nunez@gmail.com',
      first_name: 'Oscar',
      last_name: 'Nunez',
      password: 'password',
      subscription_level: 'annual member',
      system: 'Imperial',
      trail_name: 'Know It All'
    },
    {
      id: 8,
      avatar_url: null,
      country: 'United States',
      email: 'andy.bernard@gmail.com',
      first_name: 'Andy',
      last_name: 'Bernard',
      password: 'password',
      subscription_level: 'annual member',
      system: 'Imperial',
      trail_name: 'Temper Tantrum'
    },
    {
      id: 9,
      avatar_url: 'https://avatars2.githubusercontent.com/u/42892508?v=4',
      country: 'United States',
      email: 'toby.flenderson@gmail.com',
      first_name: 'Toby',
      last_name: 'Flenderson',
      password: 'password',
      subscription_level: 'annual member',
      system: 'Imperial',
      trail_name: 'Bleh'
    }
  ],
  last_name: 'Timkins',
  notifications: [
    { id: 1, message: 'This is a notification', date: '2020-03-07 20:45:51' },
    { id: 2, message: 'This is a notification', date: '2020-04-14 20:45:51' },
    { id: 3, message: 'This is a notification', date: '2020-05-21 20:45:51' }
  ],
  packs: [
    {
      id: 1,
      name: 'Summer',
      active: 1,
      created_at: '2020-03-07 20:44:51',
      updated_at: '2020-03-07 20:44:51',
      categories: [
        {
          id: 1,
          name: 'The Big 3',
          pack_id: 1,
          created_at: '2020-03-07 20:45:51',
          updated_at: '2020-03-07 20:45:51',
          items: [
            {
              id: 1,
              name: 'Zpacks Arc Haul',
              weight: 24.4,
              weight_type: 'oz',
              price: 22000,
              generic_type: 'Backpack',
              category_id: 1,
              consumable: 1,
              worn: 1,
              quantity: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51'
            },
            {
              id: 2,
              name: 'REI Magma 15 Long',
              weight: 24.4,
              weight_type: 'oz',
              price: 22000,
              generic_type: 'Sleeping Bag',
              category_id: 1,
              consumable: 0,
              worn: 0,
              quantity: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51'
            }
          ]
        },
        {
          id: 2,
          name: 'Kitchen',
          pack_id: 1,
          created_at: '2020-03-07 20:45:51',
          updated_at: '2020-03-07 20:45:51',
          items: [
            {
              id: 3,
              name: 'MSR Pocket Rocket 2',
              weight: 24.4,
              weight_type: 'oz',
              price: 22000,
              generic_type: 'Stove',
              category_id: 2,
              consumable: 1,
              worn: 0,
              quantity: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51'
            },
            {
              id: 4,
              name: 'Toaks 700mL Pot',
              weight: 24.4,
              weight_type: 'oz',
              price: 22000,
              generic_type: 'Titanium Pot',
              category_id: 2,
              consumable: 1,
              worn: 1,
              quantity: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51'
            }
          ]
        }
      ]
    }
  ],
  password: 'password',
  subscription_level: 'annual member',
  system: 'Imperial',
  trail_name: 'Walk and Eat'
});
