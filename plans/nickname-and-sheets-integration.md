# 計畫：暱稱收集 + Google Sheets 資料記錄

## 目標

在現有 quiz 流程中加入暱稱輸入頁，並於測驗結束後將資料送到 Google Sheets，
讓研究者可以觀察「pet exposure 是否真的影響了使用者的測驗結果」。

---

## 新的頁面流程

```
/ (WelcomePage)
  ↓
/nickname (NicknamePage)  ← 新增
  ↓
/door (DoorPage)
  ↓
/pet (PetInteractionPage)
  ↓
/quiz (QuizPage)
  ↓
/result (ResultPage)      ← 在此送出資料到 Google Sheets
```

---

## 需要修改 / 新增的檔案

### 新增

| 檔案 | 說明 |
|------|------|
| `quiz-app/src/pages/NicknamePage.jsx` | 新頁面：暱稱輸入表單 |
| `quiz-app/src/services/sheetsService.js` | 封裝 POST 到 Google Apps Script 的邏輯 |
| `plans/google-apps-script.js` | 要貼到 Google Apps Script 的程式碼（手動部署） |

### 修改

| 檔案 | 修改內容 |
|------|----------|
| `quiz-app/src/App.jsx` | 新增 `/nickname` route |
| `quiz-app/src/context/QuizContext.jsx` | 加入 `nickname` 狀態與 `setNickname` |
| `quiz-app/src/pages/WelcomePage.jsx` | Start 按鈕改為導向 `/nickname` |
| `quiz-app/src/pages/ResultPage.jsx` | 頁面載入時呼叫 `sheetsService` 送出資料 |
| `quiz-app/.env` (新增) | 存放 Apps Script 的 Web App URL |

---

## Google Sheets 欄位設計

### Sheet 1：`responses`（原始資料）

| 欄 | 標題 | 內容範例 |
|----|------|----------|
| A | Timestamp | 2026-03-21 14:30:00 |
| B | Nickname | Mindy |
| C | Pet Type | dog |
| D | Quiz Result | promotion |
| E | Influenced | Yes |
| F | Q1 | A |
| G | Q2 | B |
| H | Q3 | A |
| I | Q4 | A |
| J | Q5 | B |

> **Influenced 欄位邏輯：**
> `dog + promotion` = Yes（符合 pet exposure 效果）
> `cat + prevention` = Yes
> 其餘 = No

---

### Sheet 2：`statistics`（統計與圖表）

用公式自動從 Sheet1 計算：

| 統計項目 | 說明 |
|----------|------|
| 總作答數 | `COUNTA` |
| Dog 組人數 | `COUNTIF(C:C, "dog")` |
| Cat 組人數 | `COUNTIF(C:C, "cat")` |
| Promotion 人數 | `COUNTIF(D:D, "promotion")` |
| Prevention 人數 | `COUNTIF(D:D, "prevention")` |
| 被影響人數（Yes） | `COUNTIF(E:E, "Yes")` |
| 未被影響人數（No） | `COUNTIF(E:E, "No")` |
| 影響率 % | `Influenced Yes / 總人數` |

**圖表：**
- Pie Chart 1：Dog vs Cat 分布
- Pie Chart 2：Promotion vs Prevention 分布
- Pie Chart 3：Influenced Yes vs No 分布

> 圖表在 Google Sheets 介面手動建立（Apps Script 無法自動建立圖表格式，建議手動設定一次即可，資料會自動更新）。

---

## Google Apps Script 程式碼（`plans/google-apps-script.js`）

部署步驟：
1. 開啟 Google Sheets → 擴充功能 → Apps Script
2. 貼上程式碼（見下方獨立檔案）
3. 部署 → 新增部署 → 類型選「網路應用程式」
4. 執行身分：**我**（試算表擁有者）
5. 存取權：**所有人（含匿名）**
6. 複製產生的 Web App URL

---

## 前端環境變數

在 `quiz-app/` 根目錄新增 `.env`：

```
VITE_SHEETS_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

> `.env` 已加入 `.gitignore`，不會上傳到 GitHub。
> 注意：`VITE_` 前綴才能在前端讀取。

---

## NicknamePage 設計

- 簡單的輸入框 + 送出按鈕
- 暱稱為**必填**，但不限格式（學號、名字皆可）
- 若按下送出但欄位為空，顯示提示
- 送出後呼叫 `setNickname(value)` 並導向 `/door`
- 風格沿用既有 `PageContainer` + `Button` + `FadeIn` 元件

---

## ResultPage 送出資料的時機

- `useEffect` 在頁面**初次載入**時觸發一次
- 用 `useRef` 的 flag 防止 React StrictMode 重複送出
- 送出成功/失敗皆不阻塞使用者體驗（靜默失敗，console.error）
- 送出狀態可選擇性顯示一個小的 loading 指示器

---

## 資安注意事項

- Apps Script Web App URL 設為「所有人可存取」是必要的，這樣前端才能 POST
- 但 URL 本身就是存取憑證，請**不要公開分享**（不要 commit 進 git）
- 若擔心濫用，可在 Apps Script 加入 rate limiting 或 secret token 驗證

---

## 實作順序建議

1. **先部署 Apps Script**，確認 POST 成功
2. **加 `nickname` 到 Context**
3. **建立 NicknamePage** 並串接路由
4. **修改 WelcomePage** 的導向
5. **建立 sheetsService.js**
6. **修改 ResultPage** 送出資料
7. **手動在 Sheet2 建立統計公式與圖表**
