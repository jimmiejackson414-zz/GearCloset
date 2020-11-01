export const state = () => ({
  categories: [
    {
      id: 1,
      title: 'Commerce',
      description: 'Forums related to the buying and selling of gear.',
      slug: 'commerce',
      subcategories: [
        {
          id: 1,
          title: 'Gear Swap',
          category_id: 1,
          slug: 'gear-swap',
          topics: [
            {
              id: 1,
              title: 'FS: LightheartGear SoLong 6',
              subcategory_id: 1,
              author: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51',
              pinned: false,
              posts: [
                { id: 1, author: 1, text: 'Selling a 2016 Lightheart Gear SoLong 6', created_at: '2020-03-07 20:45:51', updated_at: '2020-03-07 20:45:51' },
                { id: 2, author: 2, text: 'What kind of condition is it?', created_at: '2020-03-08 20:45:51', updated_at: '2020-03-08 20:45:51' },
                { id: 3, author: 3, text: 'PMed', created_at: '2020-03-09 20:45:51', updated_at: '2020-03-09 20:45:51' }
              ]
            },
            {
              id: 2,
              title: 'FS: Snow Peak 900 Titanium Cookset',
              subcategory_id: 1,
              author: 2,
              created_at: '2020-08-21 20:45:51',
              updated_at: '2020-03-07 20:45:51',
              pinned: false,
              posts: [
                { id: 4, author: 2, text: 'Selling a Snow Peak 900 Titanium Cookset. $40.', created_at: '2020-03-07 20:45:51', updated_at: '2020-03-07 20:45:51' }
              ]
            },
            {
              id: 3,
              title: 'PINNED: This is a test pinned topic.',
              subcategory_id: 1,
              author: 1,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51',
              pinned: true,
              posts: []
            }
          ]
        },
        {
          id: 2,
          title: 'Gear Deals',
          category_id: 1,
          slug: 'gear-deals',
          topics: []
        },
        {
          id: 3,
          title: 'Reader Reviews',
          category_id: 1,
          slug: 'reader-reviews',
          topics: [
            {
              id: 3,
              title: 'Warbonnet Blackbird',
              subcategory_id: 3,
              author: 3,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51',
              pinned: false,
              posts: [
                { id: 5, author: 3, text: 'This is a bunch of copy about the Warbonnet Blackbird.', created_at: '2020-03-07 20:45:51', updated_at: '2020-03-07 20:45:51' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Gear Talk',
      description: 'Have a question about a piece of gear? Ask it here!',
      slug: 'gear-talk',
      subcategories: [
        {
          id: 4,
          title: 'Gear (General)',
          category_id: 2,
          slug: 'gear-general',
          topics: [
            {
              id: 4,
              title: 'MSR Access 1 Tent',
              subcategory_id: 4,
              author: 3,
              created_at: '2020-03-07 20:45:51',
              updated_at: '2020-03-07 20:45:51',
              pinned: false,
              posts: [
                { id: 6, author: 3, text: 'This is a bunch of copy about the MSR Access 1 Tent.', created_at: '2020-03-07 20:45:51', updated_at: '2020-03-07 20:45:51' },
                { id: 7, author: 1, text: 'Yes, I agree.', created_at: '2020-03-20 20:45:51', updated_at: '2020-03-20 20:45:51' }
              ]
            }
          ]
        },
        { id: 5, title: 'Gear Lists', category_id: 2, slug: 'gear-lists', topics: [] },
        { id: 6, title: 'MYOG (Make Your Own Gear)', category_id: 2, slug: 'myog', topics: [] },
        { id: 7, title: 'Multiple Use Gear', category_id: 2, slug: 'multiple-use-gear', topics: [] }
      ]
    },
    {
      id: 3,
      title: 'General',
      description: 'Focuses on a particular style or subgenre of lightweight backpacking.',
      slug: 'general',
      subcategories: [
        { id: 8, title: 'Environmental Issues', category_id: 3, slug: 'environmental-issues', topics: [] },
        { id: 9, title: 'Speed Hiking and Fastpacking', category_id: 3, slug: 'speed-hiking-and-fastpacking', topics: [] },
        { id: 10, title: 'Super Ultralight (SUL)', category_id: 3, slug: 'super-ultralight', topics: [] },
        { id: 11, title: 'Hammock Camping', category_id: 3, slug: 'hammock-camping', topics: [] },
        { id: 12, title: 'Winter Hiking', category_id: 3, slug: 'winter-hiking', topics: [] }
      ]
    }
  ]
});
