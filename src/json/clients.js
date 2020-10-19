export default [
  { name: 'TLabel', props: { label: 'Clients' } },
  { name: 'Spacer', props: { size: 16 } },
  {
    name: 'Cell',
    props: { style: { borderRadus: '16px', backgroundColor: '#fff' } },
    components: [
      {
        name: 'List',
        props: {
          entity: {
            $type: '$data',
            path: '$store.apis.custodian.client',
          },
          components: [
            {
              name: 'Row',
              components: [
                {
                  name: 'Cell',
                  props: { xsAuto: true, children: { $type: '$data', path: '$context.id' } },
                },
                {
                  name: 'Cell',
                  components: [
                    {
                      name: 'Link',
                      props: {
                        to: {
                          $type: '$data',
                          path: '$context.id',
                          tamplate: '/client/${value}',
                        },
                        children: { $type: '$data', path: '$context.name' },
                      },
                    },
                  ],
                },
              ],
            },
          ],
          topComponents: [
            {
              name: 'TButton',
              props: {
                specialType: 'arrowLeft',
                type: 'text',
                style: '& div:last-child{color:var(--trood-red);}',
                onClick: { $type: '$data', path: '$context.prevPage' },
              },
            },
            {
              name: 'TButton',
              props: {
                specialType: 'arrowRight',
                type: 'text',
                style: '& div:last-child{color:var(--trood-red);}',
                onClick: { $type: '$data', path: '$context.nextPage' },
              },
            },
          ],
          bottomComponents: [],
        },
      },
    ],
  },
]
