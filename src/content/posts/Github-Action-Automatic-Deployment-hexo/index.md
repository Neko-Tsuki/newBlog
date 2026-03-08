---
title: 一键掌控！GitHub Actions让你的Hexo博客部署狂拽酷炫炸天！
published: 2023-12-28
tags: [折騰, Hexo]
description: "一键部署，让你的Hexo博客翱翔云端！本文将介绍如何利用GitHub Actions实现博客文章自动部署，轻松迈入智能化博客搭建的新境界！\U0001F525\U0001F525\U0001F525掌握这项实用技巧，让您的博客飞上天！快来探索这个充满智能与创新的博客搭建世界吧！\U0001F680\U0001F680\U0001F680"
category: 教程
image: ./cover.jpeg
toc: true
---

# 注意事項（重要）
> ⚠️ **注意：** 請務必按照本文所示的方法進行操作，所有操作方法適用於最新Github網頁端
* 文中的部分內容請根據自己的實際情況進行替換，文章中的Workflow僅供參考
* 在進行自動部署之前，請確認你的  (並非`hexo d`之後的倉庫)已經上傳，如果未上傳請參考:「準備工作」一節
* 文章所使用的環境爲Linux，與Windows Mac OS等大同小異

# 準備工作
在使用自動部署前的準備，請確定以下步驟已完成
## 上傳Blog（博客）源文件
> 💡 **提示：** 建議複製一份源文件在複製的文件夾內操作上傳以確保不會出現 ~~毀滅性~~ 問題
### 新建倉庫
複製倉庫的Git地址（並非以github.io結尾的倉庫名稱）
```bash
https://github.com/{{UserName}}/{{repository}}.git
# 請替換鏈接中的{{userName}}和{{repository}}爲自己的實際地址
```
### 倉庫關聯
```bash
git remote add origin https://github.com/{{UserName}}/{{repository}}.git
```
### 推送源碼
```bash
git add .
git commit -m '在此處描述更新'
git push origin main
```
如果出現下面的錯誤，可以使用 `git push origin +main` 強制上傳
```bash
! [rejected]        main -> main (fetch first)
錯誤: 推送一些引用到 'https://github.com/Yoichi-Sato482/BAKA_BLOG.git' 失敗
提示：更新被拒絕，因為遠端包含您本機沒有的提交。這通常是因為
提示：另一個版本庫有推送更動到同個引用。如果您想要整合遠端更動，
提示：請在再次推送前使用 “git pull”。詳見 “git push --help” 中的
提示：〈Note about fast-forwards〉小節。
```
### 用戶驗證
根據Github官方的消息，目前Github驗證已經放棄使用用戶名和明文密碼進行驗證，需要自己申請Token進行登錄驗證，可參考`「申請用戶訪問密鑰（personal-access-token）」`一節的步驟進行申請。如果使用用戶名和密碼會出現下面的錯誤：

> remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.

## 確定Hexo能夠正常運行
首先確保Hexo能夠正常運行不會因爲Hexo的原因造成Github Action 自動部署時無法正常運作。  
進入到Hexo的 `Blog源文件目錄` ，文件結構如下圖
  
在此處打開終端並輸入下面的命令清空 `public` 目錄並重新生成文件啓動本地服務器以測試Hexo是否正常運行    
```bash
hexo clean
hexo g
hexo s
```
## 申請用戶訪問密鑰（personal-access-token）
1. 首先在Github首頁點擊右上角你的用戶頭像，下拉選取 `Settings` 選項進入到用戶設置
  
2. 進入到 `Settings` 內選擇左側最下方的 `< > Developer settings` 
3. 在新的頁面內，找到最下方的 `🔑 Personal access tokens` 展開選擇  一定注意不要選擇 Tokens，使用Tokens大概率變爲一次性使用所以建議申請    
  
4. 選擇右上角 `Generate new token` 按鈕進入到創建Token頁面，按照圖示設置即可
 
5. 滑到下方，在 `Permissions` 這部分設置相關的權限，如果你不知道具體的權限可以將所有的權限設置爲 .
`Account permissions` 可以不用設置
6. 在設置完成之後，點擊 `Generate token` 生成Token> ⚠️ **注意：** 注意！Token只會顯示一次，請妥善複製和保存到一個固定的地方，方便日後再次使用  

## 創建 Repository secrets
1. 打開你創建的選擇打開倉庫設置
{% image /imgs/posts/Github-Action-automatic/Resp.png::alt=倉庫設置頁面}
2. 在左側的選項中，找到 `Secrets and variables` 選項並展開選擇 `Action` 子選項
 
3. 在下方的 `Repository secrets` 點擊右邊的 `New repository secret` 創建新的Secrets
  
Name可以隨意但建議使用全大寫英文字母進行命名，在下方的`Secret*`填寫剛剛申請的並點擊 `Add secret`
4. 返回到倉庫的`Actions`選項內，點擊上方的藍色字體 `set up a workflow yourself ->` 創建Actions
5. 在下方編輯框粘貼代碼，並將其中的 `user.name` `user.email` `TOKEN_NAME` 替換爲自己所設置的地址和信息 
```yaml
name: Hexo Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'

    - name: Install Dependencies
      run: |
        npm install

    - name: Hexo Clean and Generate
      run: |
        npx hexo clean
        npx hexo generate

    - name: Deploy to GitHub Pages
      run: |
        git config --global user.name 'GithubAction'
        git config --global user.email 'action@github.com'

        # 使用 Personal Access Token 进行推送
        git clone https://${{ secrets.TOKEN_NAME }}@https://github.com/{{UserName}}/{{repository}}.git .deploy_git
        cp -r public/* .deploy_git
        cd .deploy_git

        git add -A
        git commit -m "Deployed by GitHub Actions"
        git push origin main

```
6. 點擊 `Commit changes...` 提交修改並等待Action自動執行