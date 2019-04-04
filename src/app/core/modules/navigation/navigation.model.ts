import { MenuItemInterface } from './interfaces/menu-item.interface';

export const NAVIGATION_MODEL: MenuItemInterface[] = [
  {
    name: 'Introduction',
    route: 'intro',
    icon: 'info_outline'
  },
  {
    name: 'Coding style',
    route: 'style',
    pages: [
      {
        // Interfaces, Models, Return Types & Complexity(Simple functions)
        name: 'Interfaces, Models & Return Types',
        icon: 'table_chart',
        route: 'interfaces'
      },
      {
        // Testing: What do we test in components, what in services, automated testing preparation
        name: 'Testing',
        icon: 'table_chart',
        route: 'testing'
      },
      {
        // EventEmitters, Observables, Subscriptions
        name: 'Communication',
        icon: 'table_chart',
        route: 'communication'
      },
      {
        // templates, components & services(component & http) responsibility
        // Templates: function calls in template = bad
        // Components: Stupid
        // Component services: local calculations & contacting deeper services
        // Http services: Managing external calls
        name: 'Areas of Responsibility',
        icon: 'table_chart',
        route: 'responsibility'
      },
    ]
  },
  {
    name: 'Components',
    route: 'components',
    pages: [
      {
        name: 'Table',
        icon: 'table_chart',
        route: 'table'
      },
      {
        name: 'Alerter',
        icon: 'table_chart',
        route: 'alerter'
      },
      {
        name: 'Coupons',
        icon: 'table_chart',
        route: 'coupons'
      },
      {
        name: 'Passenger list/cards',
        icon: 'table_chart',
        route: 'passengers'
      },
      {
        name: 'History state comparer',
        icon: 'table_chart',
        route: 'history-state'
      },
      {
        name: 'Mail Wizard',
        icon: 'table_chart',
        route: 'mail-wizard'
      },

    ]
  },
  {
    name: 'Directives',
    route: 'directives',
    pages: [
      {
        name: 'App Configuration',
        icon: 'table_chart',
        route: 'configurable'
      },
      {
        name: 'Set Focus',
        icon: 'table_chart',
        route: 'setfocus'
      },
      {
        name: 'Drag Element',
        icon: 'table_chart',
        route: 'drag'
      },
      {
        name: 'Table Row Color',
        icon: 'table_chart',
        route: 'rowcolor'
      },
    ]
  },
  {
    name: 'Pipes',
    route: 'pipes'
  },
  {
    name: 'Interceptors',
    route: 'interceptors'
  },
  {
    name: 'HTTP requests',
    route: 'http'
  }
];
