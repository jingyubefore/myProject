
//引入webpack-html插件
const HTMLWebpackPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
//引入node拼接文件路径一个包
const path=require('path')

//webpack中所有配置信息开始
module.exports={

    //指定入口文件
    entry: "./src/index.ts",

//    指定打包文件所在目录
    output: {
    //    指定打包后的目录
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.js",
        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    //默认配置
    mode: "production",

//    指定webpack打包时要指定的模块
    module: {
        //指定loader加载规则
        rules: [
            {
                //test指定规则生效的文件
                test: /\.ts$/,
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                    //    设置babel
                        options: {
                          presets:[
                              [
                              //    环境插件
                                  "@babel/preset-env",
                                  // 配置信息
                                  {
                                      //要兼容的浏览器
                                      targets:{
                                          "chrome":"58",
                                          "ie":"11"
                                      },
                                      //指定core-js的版本
                                      "corejs":"3",
                                      ///指定core-js的方式 ”usage“表示按需加载
                                      "useBuiltIns":"usage"
                                  }
                              ]
                          ]
                        }
                    },
                    'ts-loader',
                ],
                //要排除的文件
                exclude: /node_modules/
            },
        //    设置less文件处理
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss---用于兼容浏览器
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title:"自定义title"
            template: "./src/index.html"
        }),
    ],
    //打包编译需要指定文件类型
    resolve: {
        extensions: ['.ts','.js']
    }

}