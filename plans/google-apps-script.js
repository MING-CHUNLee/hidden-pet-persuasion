/**
 * Google Apps Script — Hidden Pet Persuasion Quiz
 *
 * 部署步驟：
 * 1. 開啟 Google Sheets → 擴充功能 → Apps Script
 * 2. 將此檔案全部貼上
 * 3. 部署 → 新增部署 → 類型：「網路應用程式」
 * 4. 執行身分：我（試算表擁有者）
 * 5. 存取權：所有人（含匿名）
 * 6. 複製 Web App URL，填入 quiz-app/.env 的 VITE_SHEETS_ENDPOINT
 */

const SHEET_RESPONSES = 'responses';
const SHEET_STATISTICS = 'statistics';

// ──────────────────────────────────────────────
// 初始化：建立 Sheet 標題列（第一次執行用）
// ──────────────────────────────────────────────
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Sheet 1: responses
  let sheet1 = ss.getSheetByName(SHEET_RESPONSES);
  if (!sheet1) sheet1 = ss.insertSheet(SHEET_RESPONSES);
  if (sheet1.getLastRow() === 0) {
    sheet1.appendRow([
      'Timestamp', 'Nickname', 'Pet Type', 'Quiz Result', 'Influenced',
      'Q1', 'Q2', 'Q3', 'Q4', 'Q5'
    ]);
    sheet1.getRange(1, 1, 1, 10).setFontWeight('bold');
  }

  // Sheet 2: statistics
  let sheet2 = ss.getSheetByName(SHEET_STATISTICS);
  if (!sheet2) sheet2 = ss.insertSheet(SHEET_STATISTICS);
  if (sheet2.getLastRow() === 0) {
    const statsData = [
      ['Metric', 'Count'],
      ['Total Responses', `=COUNTA(${SHEET_RESPONSES}!B2:B)`],
      ['Dog Group', `=COUNTIF(${SHEET_RESPONSES}!C2:C,"dog")`],
      ['Cat Group', `=COUNTIF(${SHEET_RESPONSES}!C2:C,"cat")`],
      ['Promotion Result', `=COUNTIF(${SHEET_RESPONSES}!D2:D,"promotion")`],
      ['Prevention Result', `=COUNTIF(${SHEET_RESPONSES}!D2:D,"prevention")`],
      ['Influenced (Yes)', `=COUNTIF(${SHEET_RESPONSES}!E2:E,"Yes")`],
      ['Not Influenced (No)', `=COUNTIF(${SHEET_RESPONSES}!E2:E,"No")`],
      ['Influence Rate (%)', `=IF(B2=0,"",ROUND(B7/B2*100,1))`],
    ];
    sheet2.getRange(1, 1, statsData.length, 2).setValues(statsData);
    sheet2.getRange(1, 1, 1, 2).setFontWeight('bold');
    sheet2.autoResizeColumns(1, 2);
  }
}

// ──────────────────────────────────────────────
// 處理 CORS preflight (OPTIONS)
// ──────────────────────────────────────────────
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ──────────────────────────────────────────────
// 處理 POST 請求（來自前端）
// ──────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const {
      nickname = '',
      petType = '',
      quizResult = '',
      answers = [],     // ['A','B','A','A','B']
    } = data;

    // 判斷是否被 pet exposure 影響
    const influenced =
      (petType === 'dog' && quizResult === 'promotion') ||
      (petType === 'cat' && quizResult === 'prevention')
        ? 'Yes'
        : 'No';

    // 取得台灣時間
    const now = new Date();
    const taipei = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
    const timestamp = Utilities.formatDate(taipei, 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_RESPONSES);
    if (!sheet) {
      setupSheets();
      sheet = ss.getSheetByName(SHEET_RESPONSES);
    }

    sheet.appendRow([
      timestamp,
      nickname,
      petType,
      quizResult,
      influenced,
      answers[0] || '',
      answers[1] || '',
      answers[2] || '',
      answers[3] || '',
      answers[4] || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────
// 測試用：直接在 Apps Script 執行此函數來測試寫入
// ──────────────────────────────────────────────
function testInsert() {
  setupSheets();

  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        nickname: 'TestUser',
        petType: 'dog',
        quizResult: 'promotion',
        answers: ['A', 'A', 'A', 'B', 'A'],
      }),
    },
  };

  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
