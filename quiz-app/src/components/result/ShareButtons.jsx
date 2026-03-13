import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'

export default function ShareButtons({ resultType, captureRef }) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveImage = useCallback(async () => {
    if (!captureRef?.current || saving) return
    setSaving(true)

    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#FFF8F0',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))

      // Try native share (mobile) first
      if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'result.png', { type: 'image/png' })] })) {
        const file = new File([blob], '消費潛意識測驗結果.png', { type: 'image/png' })
        await navigator.share({
          title: '我的消費潛意識測驗結果',
          text: `我在「消費潛意識測驗」中測出我是「${resultType}」！你也來測測看吧！`,
          files: [file],
        })
      } else {
        // Fallback: download image
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = '消費潛意識測驗結果.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      console.error('Save image failed:', err)
    } finally {
      setSaving(false)
    }
  }, [captureRef, resultType, saving])

  const handleCopyImage = useCallback(async () => {
    if (!captureRef?.current) return
    setSaving(true)

    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#FFF8F0',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])

      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      // If clipboard image fails, fall back to download
      handleSaveImage()
    } finally {
      setSaving(false)
    }
  }, [captureRef, handleSaveImage])

  const btnClass = 'flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-medium text-base transition-all active:scale-95'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="w-full"
    >
      <p className="text-warmBrown/60 text-sm mb-3 text-center">分享給朋友一起測</p>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSaveImage}
          disabled={saving}
          className={`${btnClass} bg-milk text-white hover:bg-warmBrown shadow-md ${saving ? 'opacity-60' : ''}`}
        >
          {saving ? '產生圖片中⋯' : saved ? '已儲存！✓' : '📷 儲存結果圖片'}
        </button>
        <button
          onClick={handleCopyImage}
          disabled={saving}
          className={`${btnClass} bg-white text-warmBrown border-2 border-milk hover:bg-softPink ${saving ? 'opacity-60' : ''}`}
        >
          {saving ? '處理中⋯' : '📋 複製圖片到剪貼簿'}
        </button>
      </div>
      <p className="text-warmBrown/40 text-xs mt-3 text-center">
        儲存圖片後即可分享到 LINE、IG 限動、Facebook 等
      </p>
    </motion.div>
  )
}
