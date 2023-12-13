const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    return [
        Object.assign({}, common(env), frontend(env)),
        Object.assign({}, common(env), backend)
    ];
}

const common = (env) => {
    return {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ]
        },
        plugins: [
            new Dotenv({
                defaults: './.env.defaults',
                path: './.env.' + env.OFFICEMAP_ENV
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
};

const backend = {
    entry: [
        './src/server.ts'
    ],
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
}

const frontend = (env) => {
    return {
        entry: './src/main.ts',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: '[path][name][ext]'
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: '[path][name][ext]'
                    }
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "MPDL office map",
                meta: {
                    title: "MPDL office map",
                    description: "MPDL office map.",
                    keywords: "office, map",
                    author: "Felix Riehm",
                    "apple-mobile-web-app-capable": "yes"
                },
                minify: false
            }),
            new Dotenv({
                defaults: './.env.defaults',
                path: './.env.' + env.OFFICEMAP_ENV
            }),
        ],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
    }
}
