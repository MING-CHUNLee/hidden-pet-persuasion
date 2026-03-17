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
        const file = new File([blob], 'my_quiz_result.png', { type: 'image/png' })
        await navigator.share({
          title: 'My Hidden Consumer Traits Quiz Result',
          text: `I just took the Hidden Consumer Traits Quiz and I got "${resultType}"! Come find out yours!`,
          files: [file],
        })
      } else {
        // Fallback: download image
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'my_quiz_result.png'
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
      <p className="text-warmBrown/60 text-sm mb-3 text-center">Share with friends</p>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSaveImage}
          disabled={saving}
          className={`${btnClass} bg-milk text-white hover:bg-warmBrown shadow-md ${saving ? 'opacity-60' : ''}`}
        >
          {saving ? 'Generating...' : saved ? 'Saved! ✓' : '📷 Save Result Image'}
        </button>
        <button
          onClick={handleCopyImage}
          disabled={saving}
          className={`${btnClass} bg-white text-warmBrown border-2 border-milk hover:bg-softPink ${saving ? 'opacity-60' : ''}`}
        >
          {saving ? 'Processing...' : '📋 Copy Image to Clipboard'}
        </button>
      </div>
      <p className="text-warmBrown/40 text-xs mt-3 text-center">
        Save the image to share it on Instagram, Facebook, WhatsApp, etc.
      </p>
    </motion.div>
  )
}
