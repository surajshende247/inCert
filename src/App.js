import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import samplePDF from './blank.pdf';
function App() {
  async function createPdf() {
    const url = samplePDF;
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })
  
    //const pdfBytes = await pdfDoc.save()  

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    console.log(pdfDataUri);
   //saveAs(pdfDataUri, "newcertificate.pdf");
   document.getElementById("pdf").src = pdfDataUri;
  }

  return (
    <div>
      <button onClick={createPdf}>Create PDF</button>
      <iframe id="pdf" width="100%" height="500px"></iframe>
    </div>
  );
}

export default App;