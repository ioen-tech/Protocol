export default [
  {
    title: 'Apps & Pages',
    icon: { icon: 'mdi-package-variant' },
    children: [
      { title: 'Calendar', to: 'calendar', icon: { icon: 'mdi-calendar-blank', action: 'read' }, subject: 'Auth' },
      {
        title: 'Invoice',
        icon: { icon: 'mdi-file-document-outline' },
        children: [
          { title: 'List', to: 'invoice-list' },
          { title: 'Preview', to: { name: 'invoice-preview-id', params: { id: '5036' } } },
          { title: 'Edit', to: { name: 'invoice-edit-id', params: { id: '5036' } } },
          { title: 'Add', to: 'invoice-add' },
        ],
      },
      {
        title: 'User',
        icon: { icon: 'mdi-account-outline' },
        children: [
          { title: 'List', to: 'user-list' },
          { title: 'View', to: { name: 'user-view-id', params: { id: 21 } } },
        ],
      },
      {
        title: 'Pages',
        icon: { icon: 'mdi-file-outline' },
        children: [
          {
            title: 'Authentication',
            children: [
              {
                title: 'Login',
                children: [
                  { title: 'Login v1', to: 'pages-authentication-login-v1', target: '_blank' },
                  { title: 'Login v2', to: 'pages-authentication-login-v2', target: '_blank' },
                ],
              },
              {
                title: 'Register',
                children: [
                  { title: 'Register v1', to: 'pages-authentication-register-v1', target: '_blank' },
                  { title: 'Register v2', to: 'pages-authentication-register-v2', target: '_blank' },
                ],
              },
              {
                title: 'Forgot Password',
                children: [
                  { title: 'Forgot Password v1', to: 'pages-authentication-forgot-password-v1', target: '_blank' },
                  { title: 'Forgot Password v2', to: 'pages-authentication-forgot-password-v2', target: '_blank' },
                ],
              },
              {
                title: 'Reset Password',
                children: [
                  { title: 'Reset Password v1', to: 'pages-authentication-reset-password-v1', target: '_blank' },
                  { title: 'Reset Password v2', to: 'pages-authentication-reset-password-v2', target: '_blank' },
                ],
              },
            ],
          },
          { title: 'Knowledge Base', to: 'pages-knowledge-base' },
          { title: 'Account Settings', to: { name: 'pages-account-settings-tab', params: { tab: 'account' } } },
          { title: 'Pricing', to: 'pages-pricing' },
          { title: 'FAQ', to: 'pages-faq' },
          {
            title: 'Miscellaneous',
            children: [
              { title: 'Coming Soon', to: 'pages-misc-coming-soon' },
              { title: 'Under Maintenance', to: 'pages-misc-under-maintenance', target: '_blank' },
              { title: 'Page Not Found - 404', to: 'pages-misc-not-found', target: '_blank' },
              { title: 'Not Authorized - 401', to: 'pages-misc-not-authorized', target: '_blank' },
              { title: 'Server Error - 500', to: 'pages-misc-internal-server-error', target: '_blank' },
            ],
          },
        ],
      },
    ],
  },
]
