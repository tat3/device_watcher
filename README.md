# DeviceWatcher

LAN内の特定のデバイスが接続されたこと、切断されたことを検知するツール。

## How it works

指定したデバイスに対してpingを打ち、数回連続で帰ってくれば(帰ってこなければ)接続(切断)したと判定する

## Usage

* デバイスの情報を`device.json`に記入する
  - `id`: 一意の数値
  - `ipAddr`: デバイスのIPアドレス
    - TODO: ARPテーブルを使ってMACアドレスから参照できるようにする
    - TODO: web上から登録できるようにする
* 独自のハンドラは`src/services/ReachabilityHandler.ts`を参考に書く
  - 接続時に特定のURLに通知するだけであれば、`src/app.ts`の`notifyConnectedUrl`を変更するのが楽

```
$ yarn && yarn build
$ node build/app.js
```
