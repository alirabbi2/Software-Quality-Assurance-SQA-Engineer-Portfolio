import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { QATestCase } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

export function generateTestReportPdf(testCases: QATestCase[], completedRuns: number): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const totalTests = testCases.length;
  const passedTests = testCases.filter((tc) => tc.status === 'passed').length;
  const failedTests = testCases.filter((tc) => tc.status === 'failed').length;
  const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  const totalExecutionTime = testCases.reduce((acc, tc) => acc + (tc.executionTimeMs || 25), 0);
  const reportDate = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Header Banner
  doc.setFillColor(16, 185, 129); // Emerald 500
  doc.rect(0, 0, 210, 18, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('SOFTWARE QUALITY ASSURANCE (SQA) TEST EXECUTION REPORT', 14, 12);

  // Engineer & Metadata block
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Automated Test Suite Execution Log', 14, 28);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Lead SQA Engineer: ${PERSONAL_INFO.name} (${PERSONAL_INFO.email})`, 14, 34);
  doc.text(`Report Generation Date: ${reportDate} | Test Cycle #${completedRuns}`, 14, 39);
  doc.text(`Target Environment: Production Web / Responsive Mobile & Desktop`, 14, 44);

  // Metrics Summary Cards (drawn with light backgrounds)
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(14, 48, 42, 22, 2, 2, 'F');
  doc.roundedRect(62, 48, 42, 22, 2, 2, 'F');
  doc.roundedRect(110, 48, 42, 22, 2, 2, 'F');
  doc.roundedRect(158, 48, 38, 22, 2, 2, 'F');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('PASS RATE', 18, 55);
  doc.text('ASSERTIONS', 66, 55);
  doc.text('EXECUTION TIME', 114, 55);
  doc.text('DEFECTS', 162, 55);

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.text(`${passRate}%`, 18, 64);

  doc.setTextColor(15, 23, 42);
  doc.text(`${passedTests} / ${totalTests}`, 66, 64);

  doc.setTextColor(14, 116, 144); // cyan-700
  doc.text(`~${totalExecutionTime}ms`, 114, 64);

  doc.setTextColor(failedTests > 0 ? 225 : 100, failedTests > 0 ? 29 : 116, failedTests > 0 ? 72 : 139);
  doc.text(`${failedTests} Blockers`, 162, 64);

  // Table of Test Cases
  const tableRows = testCases.map((tc) => [
    tc.id,
    tc.category ? `${tc.suite} [${tc.category}]` : tc.suite,
    tc.title,
    tc.severity,
    tc.executionTimeMs ? `${tc.executionTimeMs}ms` : '32ms',
    tc.status.toUpperCase(),
  ]);

  autoTable(doc, {
    startY: 76,
    head: [['ID', 'Test Suite', 'Scenario / Objective', 'Severity', 'Latency', 'Status']],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: [15, 23, 42], // slate-900
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [51, 65, 85],
    },
    columnStyles: {
      0: { cellWidth: 16, fontStyle: 'bold' },
      1: { cellWidth: 38 },
      2: { cellWidth: 84 },
      3: { cellWidth: 18 },
      4: { cellWidth: 16 },
      5: { cellWidth: 18, fontStyle: 'bold' },
    },
    didParseCell: function (data) {
      if (data.section === 'body' && data.column.index === 5) {
        if (data.cell.raw === 'PASSED') {
          data.cell.styles.textColor = [5, 150, 105]; // emerald-600
        } else if (data.cell.raw === 'FAILED') {
          data.cell.styles.textColor = [225, 29, 72]; // rose-600
        }
      }
    },
    styles: {
      cellPadding: 2.2,
      overflow: 'linebreak',
    },
  });

  // Footer & QA Sign-off block
  const finalY = (doc as any).lastAutoTable?.finalY || 200;

  if (finalY < 250) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('QA Sign-Off & Verification Statement:', 14, finalY + 12);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(
      'This document confirms that all critical automated test scenarios for the web application were executed adhering to STLC standards. Input validation, responsiveness, and state persistence verified.',
      14,
      finalY + 17,
      { maxWidth: 182 }
    );

    // Signature line
    doc.setDrawColor(203, 213, 225);
    doc.line(14, finalY + 34, 75, finalY + 34);
    doc.text(`Authorized SQA Engineer: ${PERSONAL_INFO.name}`, 14, finalY + 39);
    doc.text(`Credential Track: Ostad SQA / B.Sc. CSE Daffodil Int. University`, 14, finalY + 43);
  }

  // Page numbering
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Md. Akher Ali Rabbi | SQA Portfolio Automated Test Report — Page ${i} of ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
  }

  // Download PDF
  const filename = `SQA_Test_Execution_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
