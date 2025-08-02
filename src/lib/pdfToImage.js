import pdf2pic from 'pdf2pic'
import sharp from 'sharp'

export async function convertPdfToJpg(pdfBuffer) {
  try {
    // Initialize pdf2pic with buffer input
    const convert = pdf2pic.fromBuffer(pdfBuffer, {
      density: 100,           // Output DPI (100 is good for web viewing)
      saveFilename: "page",   // Base filename
      savePath: "./",         // We'll handle the buffer directly
      format: "jpeg",         // Output format
      width: 800,             // Max width (keeps aspect ratio)
      height: 1200,           // Max height
      quality: 80             // JPEG quality (80 is good balance)
    })

    // Convert first page only (most resumes are single page)
    const result = await convert(1, false) // false = return buffer instead of saving to file
    
    if (result && result.buffer) {
      // Use sharp to optimize the image further
      const optimizedBuffer = await sharp(result.buffer)
        .jpeg({ 
          quality: 80, 
          progressive: true,
          mozjpeg: true 
        })
        .toBuffer()
      
      return {
        success: true,
        imageBuffer: optimizedBuffer,
        base64: optimizedBuffer.toString('base64')
      }
    } else {
      throw new Error('Failed to convert PDF to image')
    }
  } catch (error) {
    console.error('PDF to JPG conversion error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export async function convertMultiPagePdfToJpg(pdfBuffer, maxPages = 5) {
  try {
    const convert = pdf2pic.fromBuffer(pdfBuffer, {
      density: 100,
      saveFilename: "page",
      savePath: "./",
      format: "jpeg",
      width: 800,
      height: 1200,
      quality: 80
    })

    const pages = []
    
    // Convert up to maxPages
    for (let i = 1; i <= maxPages; i++) {
      try {
        const result = await convert(i, false)
        if (result && result.buffer) {
          const optimizedBuffer = await sharp(result.buffer)
            .jpeg({ 
              quality: 80, 
              progressive: true,
              mozjpeg: true 
            })
            .toBuffer()
          
          pages.push({
            page: i,
            imageBuffer: optimizedBuffer,
            base64: optimizedBuffer.toString('base64')
          })
        } else {
          break // No more pages
        }
      } catch (pageError) {
        console.log(`Page ${i} conversion failed, stopping`)
        break
      }
    }
    
    return {
      success: true,
      pages
    }
  } catch (error) {
    console.error('Multi-page PDF conversion error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
