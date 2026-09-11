import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MasterRow } from '../types';

interface PDFExportOptions {
  rows: MasterRow[];
  activeCategory: string;
  searchQuery: string;
}

export function generateMasterReportPDF({
  rows,
  activeCategory,
  searchQuery
}: PDFExportOptions): void {
  // Create landscape A4 document for maximum table readability
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Top header banner
  doc.setFillColor(153, 27, 27); // Deep Crimson
  doc.rect(0, 0, pageWidth, 42, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('INDIANA 2025 vs. HISTORICAL TITANS', 30, 26);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(254, 226, 226);
  doc.text('MASTER STATISTICAL REPOSITORY REPORT', pageWidth - 30, 26, { align: 'right' });

  // Metadata summary section
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text('REPORT DETAILS & PARAMETERS:', 30, 62);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);

  const categoryLabel =
    activeCategory === 'all'
      ? 'All Categories (Complete Ledger)'
      : activeCategory === 'scoring'
      ? 'Scoring & Record'
      : activeCategory === 'efficiency'
      ? 'EPA & Efficiency'
      : activeCategory === 'market'
      ? 'Market & ATS'
      : activeCategory;

  const searchLabel = searchQuery.trim() ? `"${searchQuery.trim()}"` : 'None (Full category view)';

  doc.text(`• Scope / Category: ${categoryLabel}`, 30, 76);
  doc.text(`• Search Filter: ${searchLabel}`, 30, 90);
  doc.text(`• Total Metrics Included: ${rows.length}`, 300, 76);
  doc.text(`• Generated: ${currentDate}`, 300, 90);
  doc.text(`• Benchmark Squads: Indiana 2025, Alabama 2020, LSU 2019, Georgia 2022, Michigan 2023`, 300, 104);

  // Table columns & rows preparation
  const head = [
    [
      'Metric / Attribute',
      'Indiana (2025)',
      'Alabama (2020)',
      'LSU (2019)',
      'Georgia (2022)',
      'Michigan (2023)',
      'Context / Description'
    ]
  ];

  const body = rows.map((r) => [
    r.label,
    r.iu,
    r.ala,
    r.lsu,
    r.uga,
    r.um,
    r.description || ''
  ]);

  // Generate Table using autoTable
  autoTable(doc, {
    startY: 114,
    head: head,
    body: body,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 4,
      overflow: 'linebreak',
      valign: 'middle'
    },
    headStyles: {
      fillColor: [185, 28, 28], // Crimson red
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 140, halign: 'left' },
      1: {
        fontStyle: 'bold',
        textColor: [185, 28, 28],
        fillColor: [254, 242, 242], // Light tint for Indiana
        halign: 'center',
        cellWidth: 80
      },
      2: { halign: 'center', cellWidth: 75 },
      3: { halign: 'center', cellWidth: 75 },
      4: { halign: 'center', cellWidth: 75 },
      5: { halign: 'center', cellWidth: 75 },
      6: { halign: 'left', fontStyle: 'italic', textColor: [100, 100, 100] }
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { top: 40, bottom: 40, left: 30, right: 30 },
    didDrawPage: (data) => {
      // Footer on every page
      const pageStr = `Page ${data.pageNumber}`;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(140, 140, 140);

      // Attribution
      doc.text(
        'This site is property of CreativeTech.Studio (https://creativetech.studio/)',
        30,
        pageHeight - 18
      );

      // Page numbering
      doc.text(pageStr, pageWidth - 30, pageHeight - 18, { align: 'right' });
    }
  });

  // Save the generated PDF
  const sanitizedCat = activeCategory.replace(/[^a-z0-9]/gi, '_');
  const filename = `Indiana2025_Master_Report_${sanitizedCat}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
