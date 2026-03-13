import sys
try:
    import PyPDF2
except ImportError:
    print("PyPDF2 not installed")
    sys.exit(1)

text = ""
with open("reference/EBSCO-FullText-03_09_2026.pdf", "rb") as f:
    reader = PyPDF2.PdfReader(f)
    for i, page in enumerate(reader.pages):
        text += f"--- Page {i+1} ---\n"
        text += page.extract_text() + "\n"

with open("paper_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
print("Extracted to paper_text.txt")
