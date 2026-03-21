const ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT

export async function submitToSheets({ nickname, petType, quizResult, answers }) {
  if (!ENDPOINT) {
    console.error('VITE_SHEETS_ENDPOINT is not set')
    return
  }

  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ nickname, petType, quizResult, answers }),
    })
  } catch (err) {
    console.error('Failed to submit to Google Sheets:', err)
  }
}
