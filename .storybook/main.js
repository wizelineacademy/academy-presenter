module.exports = {
    stories: ['../components/**/*.stories.tsx'],
    addons: [
        '@storybook/preset-scss',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/preset-typescript',
        '@storybook/addon-knobs/register'
    ],
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.
    
        // Make whatever fine-grained changes you need
    
        // Return the altered config
        return config;
      },
};
