// const path = require('path');
//
//
// module.exports = {
//     //元となるファイル
//     entry:'./src/js/app.js',
//     //出力先
//     //__dirnameは、JavaScriptのソースコードファイルを含むディレクトリのディレクトリ名を返します つまりこのディレクトリ
//     output: {
//         path: path.join(__dirname,'dist/js'),
//         filename: 'bundle.js'
//     },
//     // test 正規表現exclude  ローダの処理対象から除外する
//     module: {
//         rules: [
//             {
//                 test:/\.js$/,
//                 exclude: '/node.modules/',
//                 use:[
//                     {
//                         loader:'babel-loader',
//                         options: {
//                             presets: ['react','env']
//                         }
//                     }
//                 ]
//             }
//         ]
//     },
//     resolve: {
//         extensions: ['.js','json','jsx'],
//         modules:[path.join(__dirname,'src'),'node_modules'],
//         alias: {
//             vue$: 'vue/dist/vue.esm.js'
//         }
//     }
// }



const path = require('path');

module.exports= {
    // entry 起点となるファイル　あとで結合する コンパイル元 フルパス
    entry: path.join(__dirname,'src/js/app.js'),
    //output 出力先
    output:{
        path:path.join(__dirname,'dist/js'),
        filename:'bundle.js'
    },

    devtool: 'eval',
    //お決まり
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['react','env']
                }
            }
        ]
    },
    resolve:{
        modules:[path.join(__dirname,'src'),'node_modules'],
        extensions:['.js'],
        alias: {
            vue:'vue/dist/vue.esm.js' //npm installしたvueはtemplete機能のないランタイム限定ビルドなのでこっちを使うよりに
        }

    }

};
