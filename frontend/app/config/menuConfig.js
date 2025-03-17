export const menuConfig = {
  official: {
    trade: [
      {
        icon: '/dashboard.svg',
        label: 'Dashboard',
        path: '/vyapara/dashboard'
      },
      {
        icon: '/new1.svg',
        label: 'New',
        path: '/vyapara/new'
      },
      {
        icon: '/update.svg',
        label: 'Update',
        path: '/vyapara/update'
      },
      {
        icon: '/cancel.svg',
        label: 'Cancel',
        path: '/vyapara/cancel'
      },
      {
        icon: '/reports.svg',
        label: 'Reports',
        path: '/vyapara/reports'
      },
      {
        icon: '/settings.svg',
        label: 'Settings',
        path: '/vyapara/settings'
      }
      
    ],
    // Add other department menus here
    property: [
      {
        icon: '/dashboard.svg',
        label: 'Dashboard',
        path: '/property/dashboard'
      },
      // Add other property department menu items
    ]
  },
  citizen: {
    common: [
      {
        icon: '/dashboard.svg',
        label: 'My Applications',
        path: '/citizen/applications'
      },
      {
        icon: '/new1.svg',
        label: 'Apply New',
        path: '/citizen/apply'
      },
      {
        icon: '/track.svg',
        label: 'Track Status',
        path: '/citizen/track'
      },
      {
        icon: '/payments.svg',
        label: 'Payments',
        path: '/citizen/payments'
      }
    ]
  }
} 