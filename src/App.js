import React, {useState} from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import samplePDF from './blank_certificate.pdf';

export default function App() {

  const [certificateDetail, setCertificateDetail] = useState({
    certNo: '', 
    certName: '',
    certCourse: '',
    certDate: ''
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCertificateDetail({
      ...certificateDetail,
      [e.target.name]: e.target.value
    })
  };


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

    firstPage.drawText(certificateDetail.certNo, {
      x: width - 250,
      y: height -50,
      size: 15,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    firstPage.drawText(certificateDetail.certName, {
      x: width/2 - 200,
      y: height -260,
      size: 45,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    firstPage.drawText(certificateDetail.certCourse, {
      x: width - 370,
      y: height - 318,
      size: 25,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    firstPage.drawText(certificateDetail.certDate, {
      x: width - 490,
      y: height - 355,
      size: 25,
      font: helveticaFont,
      color: rgb(0.6, 0, 1)
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

   document.getElementById("pdf").src = pdfDataUri+"#view=FitH";
   var link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = 'file.pdf';
    link.dispatchEvent(new MouseEvent('click'));
  }

  async function downloadPdf() {  
 
  }

   

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <form>
            <input type="text"  placeholder="Enter Certificate ID" 
            className="form-control" 
            name="certNo"
            value={certificateDetail.certNo}
            onChange={handleChange} />

            <input type="text" 
            placeholder="Enter Student Name" 
            className="form-control" 
            name="certName"
            value={certificateDetail.certName}
            onChange={handleChange}/>

            <input type="text" 
            placeholder="Enter Course Name" 
            className="form-control"
            name="certCourse"
            value={certificateDetail.certCourse}
            onChange={handleChange} />

            <input type="text" 
            placeholder="Enter Completion Date" 
            className="form-control" 
            name="certDate"
            value={certificateDetail.certDate}
            onChange={handleChange}/>
            <button type="button" className="btn btn-warning" onClick={createPdf}>Create PDF</button>
            <button type="button" className="btn btn-warning" onClick={downloadPdf}>Download</button>
          </form>
        </div>
        <div className="col-md-6">
          <iframe id="pdf" title="certificate-preview" width="100%" height="700px"></iframe>
        </div>
        
      </div>
      
      
    </div>
  );
}
