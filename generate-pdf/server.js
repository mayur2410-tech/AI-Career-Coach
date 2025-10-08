const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/generate-pdf", async (req, res) => {
  try {
    const { resumeData, candidateName, targetRole, aiProvider } = req.body;

    if (!resumeData || !candidateName) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // HTML content for PDF
    const htmlContent = `
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; padding: 30px; line-height: 1.5; color: #333; }
      h1 { font-size: 24px; margin-bottom: 10px; }
      h2 { font-size: 20px; color: #1F4E79; margin-top: 20px; }
      h3 { font-size: 16px; margin-bottom: 5px; color: #555; }
      .section { margin-bottom: 20px; }
      ul { margin: 0 0 10px 20px; }
      .score { font-weight: bold; color: #2E7D32; }
      .needs-improvement { color: #D32F2F; }
      .whats-good { color: #1976D2; }
    </style>
  </head>
  <body>
    <h1>Resume Analysis Report</h1>

    <p><strong>Overall Score:</strong> <span class="score">${resumeData.overall_score}</span></p>
    <p><strong>Overall Feedback:</strong> ${resumeData.overall_feedback}</p>
    <p><strong>Summary Comment:</strong> ${resumeData.summary_comment}</p>

    ${Object.keys(resumeData.sections).map(key => {
      const section = resumeData.sections[key];
      return `
        <div class="section">
          <h2>${key.charAt(0).toUpperCase() + key.slice(1)}</h2>
          <p><strong>Score:</strong> <span class="score">${section.score}</span></p>
          <p><strong>Comment:</strong> ${section.comment}</p>
          <h3>What's Good</h3>
          <ul class="whats-good">
            ${section.whats_good.map(item => `<li>${item}</li>`).join('')}
          </ul>
          ${section.needs_improvement.length ? `
            <h3>Needs Improvement</h3>
            <ul class="needs-improvement">
              ${section.needs_improvement.map(item => `<li>${item}</li>`).join('')}
            </ul>
          ` : ''}
          ${section.tips_for_improvement.length ? `
            <h3>Tips for Improvement</h3>
            <ul>
              ${section.tips_for_improvement.map(item => `<li>${item}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }).join('')}

    <div class="section">
      <h2>Overall Strengths</h2>
      <ul class="whats-good">
        ${resumeData.whats_good.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h2>Overall Areas to Improve</h2>
      <ul class="needs-improvement">
        ${resumeData.needs_improvement.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h2>General Tips for Improvement</h2>
      <ul>
        ${resumeData.tips_for_improvement.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  </body>
</html>
`;



    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%;">
          <span class="title"></span>
          <span class="date"></span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${candidateName}_resume_report.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: "Server error generating PDF" });
  }
});

app.listen(PORT, () => {
  console.log(`PDF server running on http://localhost:${PORT}`);
});
