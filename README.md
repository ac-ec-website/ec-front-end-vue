<p align="center">
  <img src="https://github.com/ac-ec-website/ec-front-end-vue/blob/master/src/assets/ec-front-end-vue-logo.png" alt="ec-front-end-vue-logo"/>
</p>

<p align="center">
  <a href="https://standardjs.com/"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

# EC-Front-End-Vue

EC-Front-End-Vue 是一個使用 Vue 建立的電子商務前端專案，平台使用者主要是下列兩種身份，分別為一般消費者（Visitor）、商家管理員（Admin），搭配 [EC-Back-End-Node](https://github.com/ac-ec-website/ec-back-end-node) 後端專案，打造一個全方位的電商網站。

![首頁截圖頁面]()

## 目錄

- [Demo](#Demo)
- [Initial - 專案緣起](#Initial---專案緣起)
- [Features - 專案功能](#Features---專案功能)
- [使用哪些技術實作專案](#使用哪些技術實作專案)
- [專案內容（先上架構，圖片＆文字整理中）](#專案內容（先上架構，圖片＆文字整理中）)
- [內容 & 圖片來源](#內容--圖片來源)
- [聲明](#聲明)
- [Environment SetUp - 環境建置](#Environment-SetUp---環境建置)
- [Installing - 專案安裝流程](#Installing---專案安裝流程)
- [Contributor and Responsibility - 開發人員與職責分工](#Contributor-and-Responsibility---開發人員與職責分工)

## Demo

[Demo Website - 前台消費者（無須登入）](https://ac-ec-website.github.io/ec-front-end-vue/dist/#/products)

[Demo Website - 後台管理員（需登入）](https://ac-ec-website.github.io/ec-front-end-vue/dist/#/admin/signin)

歡迎使用管理員測試帳號登入使用，帳密如下：

```
管理員
  帳號：root@example.com
  密碼：123
```

PS:請不要隨意刪除資料呦，避免影響他人的使用體驗 3Q :D

## Initial - 專案緣起

專案緣起於 Alpha Camp 畢業專題發想，由團隊共同決議要選擇「電商平台」為主題，打造一個前後端分離的作品，期望透過技術解決傳統店家要拓展線上通路進入門檻過高的問題，包含網站開發、金流串接...等等。

因此，我們建立一個可以讓店家輕鬆開店、提供消費者各種優惠，也可以管理庫存的電商網站，如同常見的前台購物功能、後台上架管理功能等等。

專案核心價值：

1. 對消費者的價值：提供一個產品資訊清楚，購物/付費流程簡單，體驗良好的網路購物平台。

2. 對店家的價值：大幅減低網路開店的成本，輕鬆轉型電商，省去自行開發、另找金流物流服務、行銷等事情，讓商家專注在本業商品的研發與生產。

## Features - 專案功能

- 前台:

  1. 商品展示( 搜尋、分類、單一商品詳細介紹 )
  2. 購物車功能( 快速下單、選擇數量 )
  3. 三步驟結帳( 加入購物車、訂單創建、瀏覽訂單資訊)
  4. 整合第三方金流服務，實踐付款功能

- 後台:

  1. 管理者註冊與登入
  2. 商品管理 (CRUD)
  3. 分類管理 (CRUD)
  4. 優惠卷管理 (CRUD)
  5. 特價活動管理 (CRUD)
  6. 訂單管理
  7. 用戶權限設定

- 延伸閱讀：[專案使用者故事](https://docs.google.com/spreadsheets/d/1nHfa21Cn-y_5VNikL2dbra9c-sItiD9ej7YfaObTWOU/edit#gid=987765644)

## 使用哪些技術實作專案

- Vue CLI 3 - 快速建立專案項目環境
- Vue Components - 使用 props / emit 實踐組件間資料傳遞
- Vuex - 統一管理應用程式所有狀態
- Vue Router - 統一管理應用程式路由
- Bootstrap4 - 實作響應式網站
- jQuery - DOM 元素操作
- ES7（async/await） - 實作資料庫非同步操作
- LocalStorage - 儲存身份認證的 JWT
- Vue-Axios - 對接伺服器 API 操作資料
- Sweetalert2 - 優化前端使用者體驗
- Moment - 資料時間格式轉換
- Curler - 實踐網站自動化警示提醒，提升團隊回應速度

## 專案內容（先上架構，圖片＆文字整理中）

#前台

![所有商品頁面]()

![個別商品頁面]()

![購物車頁面]()

![訂單創建頁面]()

![訂單確認頁面-付款前]()

![訂單確認頁面-付款後]()

#後台

![管理員註冊頁面]()

![管理員登入頁面]()

![管理員商品列表頁面]()

![管理員商品分類頁面]()

![管理員優惠券頁面]()

![管理員特價活動頁面]()

![管理員訂單頁面]()

![管理員權限設定頁面]()

## 內容 & 圖片來源

- [毛起來](https://shop.maoup.com.tw)

## 聲明

- 本作品內圖片、內容等，純粹為個人練習前端使用，不做任何商業用途。

## Environment SetUp - 環境建置

- [Vue CLI 3](https://cli.vuejs.org/zh/guide/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/ac-ec-website/ec-front-end-vue
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd ec-front-end-vue
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4. 啟動應用程式，本機運行

```
在 Terminal 輸入 npm run serve 指令
```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:8080](http://localhost:8080) ，你開始逛逛 GPW 電商網囉！

若想要體驗管理員功能，歡迎輸入 [http://localhost:8080/admin/signin](http://localhost:8080/admin/signin) ，歡迎使用管理員測試帳號登入使用。

PS:請不要隨意刪除資料呦，避免影響他人的使用體驗 3Q :D

帳密如下：

```
管理員
  帳號：root@example.com
  密碼：123
```

## Contributor and Responsibility - 開發人員與職責分工

[Pierce Shih](https://github.com/pierceshih15)

1. 負責團隊資源協調與協作機制建立，實踐各階段的產品開發目標
2. 負責前後端購物車、訂單創建、瀏覽訂單、優惠券、Email 通知功能開發
3. 負責專案核心分支管理，協助團隊 PR 審核
4. 協同團隊確立專案規格（User Story, Wireframe, ERD Model）
5. 協同團隊建立資料庫架構、種子資料與 Heroku 部署
6. 協同團隊串接第三方藍新金流

[Zhen Yi](https://github.com/asd8116)

1. 負責前後端後台功能開發，包含管理員 CRUD - 商品管理、商品分類管理、訂單管理、優惠券管理、特價活動管理、用戶權限管理
2. 負責專案分支管理，協助團隊 PR 審核
3. 協同團隊確立專案規格（User Story, Wireframe, ERD Model）
4. 協同團隊建立資料庫架構、種子資料與 Heroku 部署
5. 協同團隊串接第三方藍新金流

[Ginger 敬杰](https://github.com/Lianginger)

1. 負責前後端前台使用者商品頁面開發、後台管理員身份驗證、自動化測試等功能開發
2. 負責專案分支管理，協助團隊 PR 審核
3. 協同團隊確立專案規格（User Story, Wireframe, ERD Model）
4. 協同團隊建立資料庫架構、種子資料與 Heroku 部署
5. 協同團隊串接第三方藍新金流
