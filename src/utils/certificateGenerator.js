import { jsPDF } from 'jspdf';

/**
 * Generate a professional, high-resolution certificate PDF using jsPDF
 * @param {Object} options
 * @param {string} options.userName
 * @param {string} options.quizTitle
 * @param {number} options.percentage
 * @param {string|Date} options.date
 * @param {string} [options.certificateId]
 */
export const generateCertificatePdf = ({
  userName = 'Developer',
  quizTitle = 'Engineering Assessment',
  percentage = 100,
  date = new Date(),
  certificateId = null,
}) => {
  // A4 Landscape: 297mm x 210mm
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const certId = certificateId || `DQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Background - Deep rich slate with light luxury inner parchment
  // Outer border background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Inner parchment frame
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 4, 4, 'F');

  // Decorative border lines
  // Outer gold accent line
  doc.setDrawColor(217, 119, 6); // amber-600 gold
  doc.setLineWidth(1.2);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // Inner subtle blue/slate line
  doc.setDrawColor(14, 140, 232); // brand blue
  doc.setLineWidth(0.4);
  doc.rect(15.5, 15.5, pageWidth - 31, pageHeight - 31);

  // Corner decorative marks
  const drawCorner = (x, y, flipX, flipY) => {
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(1.5);
    const size = 10;
    const dx = flipX ? -size : size;
    const dy = flipY ? -size : size;
    doc.line(x, y, x + dx, y);
    doc.line(x, y, x, y + dy);

    doc.setFillColor(14, 140, 232);
    doc.circle(x + (flipX ? -3 : 3), y + (flipY ? -3 : 3), 1.2, 'F');
  };

  drawCorner(18, 18, false, false);
  drawCorner(pageWidth - 18, 18, true, false);
  drawCorner(18, pageHeight - 18, false, true);
  drawCorner(pageWidth - 18, pageHeight - 18, true, true);

  // TOP LOGO / BADGE
  doc.setFillColor(15, 23, 42);
  doc.circle(pageWidth / 2, 28, 7, 'F');
  doc.setFillColor(217, 119, 6);
  doc.circle(pageWidth / 2, 28, 5.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('DQ', pageWidth / 2, 29.5, { align: 'center' });

  // Organization Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(14, 140, 232);
  doc.text('DEVQUIZ ACADEMY • VERIFIED TECHNICAL CERTIFICATION', pageWidth / 2, 40, { align: 'center' });

  // Certificate Header
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(15, 23, 42);
  doc.text('CERTIFICATE OF ACHIEVEMENT', pageWidth / 2, 53, { align: 'center' });

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text('THIS IS PROUDLY PRESENTED TO', pageWidth / 2, 63, { align: 'center' });

  // Student / User Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(15, 23, 42);
  doc.text(userName.toUpperCase(), pageWidth / 2, 78, { align: 'center' });

  // Underline under Name
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  const nameWidth = Math.max(80, doc.getTextWidth(userName.toUpperCase()) + 20);
  doc.line((pageWidth - nameWidth) / 2, 82, (pageWidth + nameWidth) / 2, 82);

  // Description text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text('for demonstrating exceptional knowledge and successfully completing the technical assessment for', pageWidth / 2, 92, { align: 'center' });

  // Quiz Title Box / Banner
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(pageWidth / 2 - 80, 97, 160, 14, 3, 3, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(pageWidth / 2 - 80, 97, 160, 14, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(2, 111, 199);
  doc.text(quizTitle, pageWidth / 2, 106, { align: 'center' });

  // Score badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(217, 119, 6);
  doc.text(`EXCELLENCE SCORE: ${Math.round(percentage)}%`, pageWidth / 2, 120, { align: 'center' });

  // Details ribbon / Metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Issued on ${formattedDate}  •  Certificate ID: ${certId}`, pageWidth / 2, 127, { align: 'center' });

  // Golden Seal of Authenticity (Left-Center)
  const sealX = 60;
  const sealY = 160;
  doc.setFillColor(245, 158, 11);
  doc.circle(sealX, sealY, 15, 'F');
  doc.setFillColor(217, 119, 6);
  doc.circle(sealX, sealY, 13.5, 'F');
  doc.setDrawColor(254, 243, 199);
  doc.setLineWidth(0.6);
  doc.circle(sealX, sealY, 12, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL', sealX, sealY - 4, { align: 'center' });
  doc.text('VERIFIED', sealX, sealY, { align: 'center' });
  doc.text('EXCELLENCE', sealX, sealY + 4, { align: 'center' });

  // Signatures Section
  // Signature 1: Academic Director
  const sig1X = 145;
  const sigLineY = 165;
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(sig1X - 25, sigLineY, sig1X + 25, sigLineY);
  // Elegant handwritten simulation
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('A. Richardson', sig1X, sigLineY - 3, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('DR. ARTHUR RICHARDSON', sig1X, sigLineY + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Chief Academic Assessor', sig1X, sigLineY + 9, { align: 'center' });

  // Signature 2: Platform Lead
  const sig2X = 225;
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(sig2X - 25, sigLineY, sig2X + 25, sigLineY);
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('Elena Vance', sig2X, sigLineY - 3, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('ELENA VANCE', sig2X, sigLineY + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Director of Engineering', sig2X, sigLineY + 9, { align: 'center' });

  // Bottom verification note
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('This credential validates competency through rigorous testing. Offline verified token: ' + certId, pageWidth / 2, 192, { align: 'center' });

  return doc;
};

/**
 * Trigger immediate download of the certificate PDF
 */
export const downloadCertificate = (options) => {
  const doc = generateCertificatePdf(options);
  const cleanTitle = (options.quizTitle || 'Quiz').replace(/[^a-zA-Z0-9]/g, '-');
  const filename = `${cleanTitle}-Certificate.pdf`;
  doc.save(filename);
  return filename;
};
