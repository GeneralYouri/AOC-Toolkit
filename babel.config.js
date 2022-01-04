module.exports = (api) => {
    // true when running tests via Jest
    const isTest = api.env('test');

    api.cache(true);

    const presets = [
        ['@babel/preset-env', { targets: { node: 'current' } }],
    ];
    const plugins = [
        '@babel/plugin-syntax-bigint',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-private-methods',
    ];

    return {
        presets,
        plugins,
    };
};
