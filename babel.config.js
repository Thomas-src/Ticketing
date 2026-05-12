module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "react-native-reanimated/plugin",
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',
                    },
                },
            ],
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            'babel-plugin-transform-typescript-metadata',
        ],
    };
};