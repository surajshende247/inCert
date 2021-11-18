import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import samplePDF from './blank_certificate.pdf';

function App() {

  const certificateNo = "JULYC001";
  const studentName = "JULIUS C. JONES";
  const courseName = "'CSCI E-101'";
  const completionDate = "01/01/2020";

  async function createPdf() {
    const url = samplePDF;
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Courier)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()

    firstPage.drawText(certificateNo, {
      x: width - 250,
      y: height -50,
      size: 15,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    firstPage.drawText(studentName, {
      x: width/2 - 200,
      y: height -260,
      size: 45,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    firstPage.drawText(courseName, {
      x: width - 370,
      y: height - 318,
      size: 25,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    firstPage.drawText(completionDate, {
      x: width - 490,
      y: height - 355,
      size: 25,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

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