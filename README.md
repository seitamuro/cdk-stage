コンテキストを利用して分割する方法と`cdk.Stage`を利用する方法を実際に実装してみた。
`cdk.Stage`を利用している場合は`cdk deploy "**"`ですべてのステージ、`cdk deploy "Dev/*"`で dev ステージのみをデプロイすることができる。
今回は dev ステージに対して`RemovalPolicy.DESTROY`を矯正している。
