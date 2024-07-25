import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MothsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.Model";
import nodemailer, { Transporter } from 'nodemailer';
const { PDFDocument, rgb, StandardFonts, setFontAndSize  } = require('pdf-lib');
const fs = require('fs');

export const generateCertificate = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const courseName:string = "CIVIL";
    const userName = "Parth";
    const userEmail = "parth.midas@gmail.com";
    // Load the certificate template
    const templateBytes = fs.readFileSync("Academy_Certificate.pdf");
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Embed a font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    // Get the first page of the document
    const page = pdfDoc.getPage(0);

    const { width, height } = page.getSize();

    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    // Define the width of the columns
    const col1Width = pageWidth * 0.4;
    const col2Width = pageWidth * 0.6;

    // Define the height of the columns (assuming full page height)
    const colHeight = pageHeight;

    // Define the text to be inserted and its position
    const courseText = `Course: ${courseName}`;
    const userText = `${userName}`;

    const text = userName

    // Measure the text size
    const textSize = 24;
    const textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
    const textHeight = helveticaFont.heightAtSize(textSize);
  
    // Calculate the x and y coordinates to center the text in the second column
    const textX = col1Width + (col2Width - textWidth) / 2;
    const textY = (colHeight - textHeight) / 2;

    // Draw the course name on the certificate
    page.drawText(courseText, {
      x: 50,
      y: 400,
      size: 24,
      font: helveticaFont,
      color: rgb(0.107, 0.329, 0.058),
    });

    // Draw the user name on the certificate
    page.drawText(userText, {
      x: textX,
      y: 305,
      size: 24,
      font: helveticaFont,
      color: rgb( (179/255), (84/255), (15/255) )
    });

      // Draw the first column (40% width)
    // page.drawRectangle({
    //   x: 0,
    //   y: 0,
    //   width: col1Width,
    //   height: colHeight,

    // });

    // // Draw the second column (60% width)
    // page.drawRectangle({
    //   x: col1Width,
    //   y: 0,
    //   width: col2Width,
    //   height: colHeight,
     
    // });

    const imageBytes = fs.readFileSync("Picture1.png"); // Change to your image path
    const image = await pdfDoc.embedPng(imageBytes); // Use embedJpg for JPEG images
    const scaled = image.scale(0.3) // Scale the image if needed

    // Draw the image on the certificate
    page.drawImage(image, {
      x: 100,
      y: 300,
      width : scaled.width,
      height : scaled.height
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    // Create a transporter
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    // Define the email options
    const mailOptions: any = {
      from: process.env.SMTP_MAIL,
      to: userEmail,
      subject: "Course Completion Certificate",
      text: `Dear ${userName},\n\nCongratulations on completing the course "${courseName}"! Please find your certificate attached.\n\nBest regards,\nYour Course Team`,
      attachments: [
        {
          filename: `certificate_${userName}.pdf`,
          content: pdfBytes,
          contentType: "application/pdf",
        },
      ],
    };

    // Send the email
    await Promise.all([
      await transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          return console.log("Error occurred:", error);
        }
        return console.log("Mail Sent...")
      })
    ]) 
    await Promise.all([res.status(200)])
  }
);
