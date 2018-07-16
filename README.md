[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

* https://reactjs.org/docs/create-a-new-react-app.html#more-flexible-toolchains
    * [Creating a React App… From Scratch.](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)
* [NVM for Windows](https://github.com/coreybutler/nvm-windows)
* npm init
* [Yarn](https://yarnpkg.com/lang/ja/)
* index.html
    * [フロントエンドチェックリスト](https://qiita.com/miya0001/items/8fff46c201bf9eaeba4a)
* [Babel](https://babeljs.io/)
    * devDependencies
        * babel-core
        * babel-preset-react (JSX とか Flow 用)
        * babel-preset-env (ES6+)
    * dependencies
        * babel-polyfill (Object.assign()とか Promise とか使うよう。)
            * webpack.config.js の entry に追加。
* `yarn add -D babel-core babel-preset-react babel-preset-env`
* `yarn add babel-polyfill`
* .babelrc に preset を記述
* [webpack](https://webpack.js.org/)
    * webpack
    * webpack-cli (webpack コマンド)
    * webpack-dev-server (開発用 HTTP サーバ)
    * css-loader (CSS の読み込み)
    * style-loader (style タグへの CSS の書き出し)
    * postcss-loader ([PostCSS](https://postcss.org/)プリプロセッサ)
    * babel-loader (Babel の呼び出し)
    * eslint-loader (ESLint 呼び出し)
    * eslint (eslint-loader の peerDependency)
* `yarn add -D webpack webpack-cli webpack-merge webpack-dev-server css-loader style-loader postcss-loader babel-loader eslint-loader`
* `yarn add -D "eslint@>=1.6.0 <5.0.0"`
* webpack.common.js、webpack.dev.js、webpack.prod.js
    * https://webpack.js.org/configuration/
    * https://qiita.com/chuck0523/items/caacbf4137642cb175ec
* [React](https://reactjs.org/)
    * `yarn add react react-dom`
    * https://reactjs.org/docs/components-and-props.html#functional-and-class-components
        * コンポーネントは、props を持たないものはエレメントを返すだけの関数として、持つものは Component を継承して render()を実装するクラスとして作る。
        * コンポーネントは pure につくり、渡された props を変えちゃだめ。
    * props は prop-types で定義し、厳密な型チェックする。
        * yarn add prop-types
* ディレクトリ構成: https://qiita.com/numanomanu/items/af97312f34cf1388cee6
* index.js
    * components/App/App.js
* ESLint ルール(Airbnb)
    * https://github.com/airbnb/javascript
    * https://github.com/airbnb/javascript/tree/master/react
    * `yarn add -D eslint-config-airbnb "eslint-plugin-import@^2.12.0" "eslint-plugin-jsx-a11y@^6.0.3" "eslint-plugin-react@^7.9.1"`
    * eslintrc.js
* [prettier](https://prettier.io/)
    * `yarn add -D prettier`
    * prettier.config.js
    * ESLint の設定とコンフリクトするので、[これ](https://prettier.io/docs/en/eslint.html)で対応するか、perttier の後に eslint --fix する。
      * `yarn add -D eslint-config-prettier`して、.eslintrc.jsのextendsの最後にprettierを追加。
* PostCSS: https://qiita.com/morishitter/items/4a04eb144abf49f41d7d
    * `yarn add -D postcss-preset-env autoprefixer cssnano postcss-flexbugs-fixes stylelint`
    * postcss.config.js
* stylelint
    * `yarn add -D stylelint-config-standard stylelint-config-prettier`
    * stylelint.config.js
* CSS Modules
    * https://postd.cc/css-modules/
    * [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
    * yarn add -D babel-plugin-react-css-modules
    * .babelrc に plugins 追加。
    * webpack.config.js の css-loader に options を追加。
* [Material-UI](https://material-ui.com/)
    * yarn add @material-ui/core
    * Roboto Font
        * yarn add typeface-roboto url-loader file-loader
        * url-loader は@font-face を処理するため。
        * file-loader は url-loader のフォールバックで、指定したサイズ以上のは file-loader で読まれる。
        * webpack.config.js に url-loader 追加。
        * webpack.config.js の css-loader の include に typeface-roboto のディレクトリを追加。
        * index.js で`import 'typeface-roboto'`
            * 300, 400, 500 の一種類だけ読みたい。
            * https://www.6666666.jp/design/20160218/ によると、woff だけでいいか。IE いらないなら woff2 で。
            * ので typeface-roboto を import はやめて、index.css 書いて、必要なフォントファイルだけ読むようにしたら 200KB くらい減った。
    * [Font Icon](https://material-ui.com/style/icons/#font-icons) はとりあえずいれない
    * [SVG Icon](https://www.npmjs.com/package@material-ui/icons) はとりあえずいれない
* Redux
    * [たぶんこれが一番分かりやすいと思います React + Redux のフロー図解](https://qiita.com/mpyw/items/a816c6380219b1d5a3bf)
        * アプリの状態を表す state オブジェクトを action と reducer で更新するシステムを Redux で作る。
    * `yarn add redux react-redux`
    * [Actions](https://redux.js.org/basics/actions)
        * actionTypes.js に action 名定義
        * actions.js に Action Creators を定義。
            * action オブジェクトは[FSA](https://github.com/redux-utilities/flux-standard-action)
                * type プロパティ必須
                * payload プロパティも必須とする
                * boolean の error プロパティ。エラーアクションなら true にして、payload にエラーオブジェクト。
                * meta プロパティ持ってもいい
    * [Reducers](https://redux.js.org/basics/reducers)
        * State オブジェクトの構造を設計しておく。
        * ピュアじゃないといけない。
        * 既存の state オブジェクトと action を受け取って、新しい state を返す。
            * もとの state を書き換えてはだめなので、Object.assgin()とかオブジェクト分割代入とかする。
            * state のプロパティ毎にサブ reducer を作って、combineReducers で結合する。
            * [redux-actions](https://github.com/redux-utilities/redux-actions)
            * [relesect](https://github.com/reduxjs/reselect)
    * [Store](https://redux.js.org/basics/store)
        * アプリに一つで、アプリの状態を表す
        * getState()で state オブジェクトを返す。
        * dispatch(action)で state を更新できる
        * subscribe(listener)でリスナーを登録でき、戻り値を関数として実行することで登録解除できる。
* [React Redux](https://redux.js.org/basics/usage-with-react)
    * [シンプルな react-redux の connect の書き方](https://qiita.com/taneba/items/4d45d1075137a7dae10e)
    * [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
        * コンテナが redux とつながる。
        * コンテナは普通 React Redux をつかって生成する。
            * store.subscribe()を使って自分でも書けるけど、React Redux の connect()を使ったほうが楽だし性能もいい。
    * Redux で作った state を React のコンポーネントに渡す。コンポーネント内でのイベントハンドラで使う dispatch も。
    * state 構造と合うコンポーネント構造を考える。[Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
    * index.js では、[Provider](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store)を使って[store を渡す](https://redux.js.org/basics/usage-with-react#passing-the-store)ことで、全 container コンポーネントから store が見れるようになる。
* Middleware
    * Redux は同期フローしかサポートしないので、非同期処理とかしたいときは Middleware を導入する。
        * 普通、リクエスト開始、成功、失敗、のアクションを発生させる。
        * redux-thunk or redux-promise は dispatch()をラップして、プレーンオブジェクトの action だけじゃなく、function とか Promise とかを dispatch 可能にする。
    * https://qiita.com/pirosikick/items/d7f9e5e197a2e8aad62f
        * applyMiddlewareは渡す順番に意味があるときがある。
* API コール
    * AWS Lambda で API を作成
    * [axios](https://www.npmjs.com/package/axios)でコール
        * [superagent](https://www.npmjs.com/package/superagent)とか[r2](https://www.npmjs.com/package/r2)でもいい。
* [redux-saga](https://redux-saga.js.org/)
    * 次点の redux-thunk にくらべて、callback 地獄にならなくて、action を pure に保てる。
    * https://qiita.com/kuy/items/716affc808ebb3e1e8ac
    * `yarn add redux-saga`
    * 副作用をもつ action creater(Saga)を書いて、Saga middleware をインスタンス化(createSagaMiddleware)して、store に接続(redux の applyMiddleware)して、index.jsx で root Saga を実行する。
* [react-router](https://github.com/ReactTraining/react-router)
    * Reduxと使う場合は、v4以降はconnected-react-routerをつかう。
    * `yarn add react-router-dom connected-react-router history`
    * https://github.com/supasate/connected-react-router#usage
    * サーバの404をindex.htmlにリダイレクトする設定が必要。
        * webpack-dev-serverなら`--history-api-fallback`。
        * https://qiita.com/diescake/items/904523cb75669dc3c1f3
* [Code Splitting](https://webpack.js.org/guides/code-splitting/)
    * webpackの機能で、バンドルファイルを分割して遅延読み込みできるようにする。
    * [Dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports)を試した。
        * `yarn add -D babel-plugin-syntax-dynamic-import`して、.babelrcのpluginsにsyntax-dynamic-importを追加。
        * 遅延読み込みしたいモジュールを、`import(/* webpackPrefetch: true */ './index.css');`みたいにしてロードする。
* [Flow](https://flow.org/en/)
    * https://flow.org/en/docs/install/
    * `yarn add -D babel-preset-flow flow-bin`
    * .babelrcにpreset追加。
    * package.jsonのscriptsにflowを追加。
    * .flowconfig作成。
        * `yarn run flow init`で作れる。
        * 初期状態では何も書いてないけど、とりあえずそのままでいい。
    * `// @flow`を型チェックしたいファイルの頭に書く。
    * それだけでもだいぶ型推論してくれてチェックが利くけど、[型アノテーション](https://flow.org/en/docs/types/)を書いていくとよりいい。
        * アノテートするとESLintとけんかするので、それ対策が必要。[eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)を使う。
        * `yarn add -D babel-eslint eslint-plugin-flowtype`
        * .eslintrc.jsに
            * parserをbabel-eslintに設定。
            * extendsに`plugin:flowtype/recommended`を追加
            * pluginsに`flowtype`をついか。
        * Reactとかの3rdパーティライブラリの型情報([libdef](https://flow.org/en/docs/libdefs/))をインストールする。
            * プロジェクトルートのflow-typedディレクトリに入ってる`.js`ファイルがそれ。
            * Cのヘッダファイルみたいなもの。
            * 自分でも書けるけど、人が書いたのも使えて、[flow-typed](https://github.com/flow-typed/flow-typed/blob/master/README.md)で引っ張れる。
                * [リポジトリ](https://github.com/flow-typed/flow-typed/tree/master/definitions)から手動でダウンロードしてもいい。
            * `yarn add -D flow-typed`
            * package.jsonのscriptsにflow-typedを追加。
                * `--ignoreDeps dev`をつけてdevDependenciesを無視してもらう。
                * flow-typedはlibdefsが見つからなかったライブラリ用にanyという型を付けるスタブを生成する。`--skip`を付けてこの生成をしないようにしてもいいかも。
            * `yarn run flow-typed install`で、使ってるライブラリのlibdefsをダウンロードしてくれる。
            * libdefsはコミットすることが推奨されてるけど、違和感ある。
    * [Reactコンポーネントのpropsの型チェック](https://flow.org/en/docs/react/components/)が、prop-typesと冗長になってしまう。
        * 役割的には、前者がビルド時チェック、後者が実行時チェックなのでちょっと違う。
        * Flowの型定義からprop-typesの定義を生成してくれる[babel-plugin-react-flow-props-to-prop-types](https://github.com/atlassian/babel-plugin-react-flow-props-to-prop-types)というのがあるけど、サポートされていない型があるし、メンテされていないし、微妙。
        * とりあえず両方書いておく。
* [Jest](https://jestjs.io/ja/)
    * `yarn add -D jest babel-jest react-test-renderer`
    * package.jsonのscriptsに`"test": "jest"`を追加。
    * `yarn test --init`で[jest.config.js](https://jestjs.io/docs/ja/configuration)を生成。
        * testEnvironmentは、ブラウザで動くアプリなのでjsdom。
        * そのtestMatchで設定したファイルにテストを書く。デフォルトだと`__test__`ディレクトリ以下のファイルや、`.test.js`ファイルなど。
        * 現バージョン(23.4.2)だと、テスト実行時に「SecurityError: localStorage is not available for opaque origins」というエラーが出るのを防ぐため、testURLを「http://localhost/」に[しておく必要がある](https://github.com/facebook/jest/issues/6769#issuecomment-408352345)。
    * https://redux.js.org/recipes/writingtests
    * テストコードをESLintが怒る。主に定義されていないグローバルを使う件で。
        * [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)を使う。
            * `yarn add -D eslint-plugin-jest`して、.eslintrc.jsのpluginsにjestを追加して、envにjest/globalsを追加。
    * Jestの目玉は[スナップショットテスト](https://jestjs.io/docs/ja/snapshot-testing)
        * Reactコンポーネントのレンダリング結果が以前と変わってないかをテストできる。
* [Enzyme](http://airbnb.io/enzyme/)
    * Reactコンポーネントをテストするユーティリティライブラリ。
    * ReactのライフサイクルメソッドやDOMイベントハンドラのテストなどもできる。
    * `yarn add -D enzyme enzyme-adapter-react-16`
    * 今のバージョン(3.3.0)では、enzymeを使ったテスト実行前に、`Enzyme.configure({ adapter: new Adapter() });`を実行する必要がある。beforAllで実行すればよさそう。
