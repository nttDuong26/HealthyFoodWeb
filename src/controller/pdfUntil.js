const PDFDocument = require('pdfkit');
// import Font from ('./ASSET/')
const path = require('path');

const fontPath = path.join(__dirname, '/ASSET/Arial Unicode MS.ttf');


const generatePDF = (invoiceContent) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ font: fontPath });
    const chunks = [];

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    doc.font(fontPath).fontSize(12);
    
    // Add header
    doc.text('HÓA ĐƠN', { align: 'center' }).moveDown(0.5);

    // Add invoice content
// Add invoice content with formatting
const contentLines = invoiceContent.split('\n');
contentLines.forEach((line) => {
  doc.text(line, { indent: 20, align: 'left' }).moveDown(0.5);
});


    // Add footer
    doc.text('Cảm ơn bạn đã mua hàng!', { align: 'center' }).moveDown(1);
    doc.text('Mọi thắc mắc xin liên hệ hotline: 0523433128', { align: 'center' });
    // Kết thúc tài liệu PDF
    doc.end();
  });
};

module.exports = generatePDF;
