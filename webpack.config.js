const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    return {
        entry: './src/client/main.ts',
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
                },
                minify: false
            }),
            new Dotenv({
                defaults: './.env.defaults',
                path: './.env.' + env.OFFICEMAP_ENV
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
    }
};
