// server/controllers/qualificationCntrl.js
import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import nodemailer from "nodemailer";

// Create a new qualification entry
export const createQualification = asyncHandler(async (req, res) => {
  try {
    const {
      propertyId,
      propertyPrice,
      loanAmount,
      interestRate,
      monthlyPayment,
      downPayment,
      term,
      // Survey data
      language,
      homeUsage,
      realEstateAgent,
      homePurchaseTiming,
      currentHomeOwnership,
      currentOnAllPayments,
      downPaymentPercentage,
      employmentStatus,
      verifyIncome,
      incomeHistory,
      openCreditLines,
      totalMonthlyPayments,
      grossAnnualIncome,
      foreclosureForbearance,
      declaredBankruptcy,
      currentCreditScore,
      liensOrJudgments,
      // Personal info
      firstName,
      lastName,
      email,
      phone,
      // Property info
      propertyAddress,
      propertyCity,
      propertyState,
      propertyZip,
    } = req.body;

    console.log("Received qualification data:", req.body);

    // Calculate qualification based on survey answers
    const disqualifiers = [];
    let qualified = true;

    // Check for disqualifying factors
    if (
      currentOnAllPayments === "No" ||
      foreclosureForbearance === "Yes" ||
      declaredBankruptcy === "Yes" ||
      liensOrJudgments === "Yes" ||
      currentCreditScore === "Poor (580-619)" ||
      currentCreditScore === "Bad (Below 580)" ||
      verifyIncome === "No, I cannot" ||
      verifyIncome === "No, I don't" ||
      incomeHistory === "No"
    ) {
      qualified = false;
      
      // Determine specific reason
      if (currentOnAllPayments === "No") disqualifiers.push("Payment history");
      if (foreclosureForbearance === "Yes") disqualifiers.push("Current foreclosure/forbearance"); 
      if (declaredBankruptcy === "Yes") disqualifiers.push("Recent bankruptcy");
      if (liensOrJudgments === "Yes") disqualifiers.push("Outstanding liens/judgments");
      if (currentCreditScore === "Poor (580-619)" || currentCreditScore === "Bad (Below 580)") 
        disqualifiers.push("Low credit score");
      if (verifyIncome === "No, I cannot" || verifyIncome === "No, I don't") 
        disqualifiers.push("Unable to verify income");
      if (incomeHistory === "No") disqualifiers.push("Insufficient income history");
    }

    // Parse numeric values
    const safeParseFloat = (value) => {
      if (value === undefined || value === null) return null;
      const parsed = parseFloat(value);
      return isNaN(parsed) ? null : parsed;
    };

    // Create a new qualification entry
    const qualification = await prisma.qualification.create({
      data: {
        propertyId,
        propertyPrice: safeParseFloat(propertyPrice),
        loanAmount: safeParseFloat(loanAmount),
        interestRate: safeParseFloat(interestRate),
        monthlyPayment: safeParseFloat(monthlyPayment),
        downPayment: safeParseFloat(downPayment),
        term: term ? parseInt(term) : null,
        
        // Survey data
        language,
        homeUsage,
        realEstateAgent,
        homePurchaseTiming,
        currentHomeOwnership,
        currentOnAllPayments,
        downPaymentPercentage,
        employmentStatus,
        verifyIncome,
        incomeHistory,
        openCreditLines,
        totalMonthlyPayments: safeParseFloat(totalMonthlyPayments),
        grossAnnualIncome,
        foreclosureForbearance,
        declaredBankruptcy,
        currentCreditScore,
        liensOrJudgments,
        
        // Personal info
        firstName,
        lastName,
        email,
        phone,
        
        // Status
        qualified,
        disqualificationReason: disqualifiers.length > 0 ? disqualifiers.join(", ") : null,
        
        // Property info
        propertyAddress,
        propertyCity,
        propertyState,
        propertyZip,
      }
    });

    // Send email notification to administrators
    await sendQualificationEmail(qualification);

    // Return success response
    res.status(201).json({
      message: "Qualification submitted successfully",
      qualification,
      qualified
    });
  } catch (error) {
    console.error("Error creating qualification:", error);
    res.status(500).json({
      message: "Failed to submit qualification",
      error: error.message
    });
  }
});

// Get qualifications for a specific property
export const getQualificationsForProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  
  try {
    const qualifications = await prisma.qualification.findMany({
      where: { propertyId },
      orderBy: { createdAt: 'desc' }
    });
    
    res.status(200).json({
      propertyId,
      totalOffers: qualifications.length,
      qualifications
    });
  } catch (error) {
    console.error("Error fetching qualifications:", error);
    res.status(500).json({
      message: "Failed to fetch qualifications",
      error: error.message
    });
  }
});

// Get all qualifications with pagination and filtering
export const getAllQualifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, qualified, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);
  
  try {
    // Build filter object
    const where = {};
    if (qualified !== undefined) {
      where.qualified = qualified === 'true';
    }
    
    // Get total count for pagination
    const totalCount = await prisma.qualification.count({ where });
    
    // Get data with sorting
    const qualifications = await prisma.qualification.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder }
    });
    
    res.status(200).json({
      qualifications,
      pagination: {
        totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / take)
      }
    });
  } catch (error) {
    console.error("Error fetching qualifications:", error);
    res.status(500).json({
      message: "Failed to fetch qualifications",
      error: error.message
    });
  }
});

// Email notification for new qualifications
async function sendQualificationEmail(qualification) {
  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping email notification");
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare email content
    const qualificationStatus = qualification.qualified ? "QUALIFIED" : "NOT QUALIFIED";
    const emailSubject = `Landivo: New ${qualificationStatus} Lead - ${qualification.firstName} ${qualification.lastName}`;
    
    // Format currency
    const formatCurrency = (value) => {
      return value ? `$${value.toLocaleString()}` : "N/A";
    };

    // Email HTML content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: ${qualification.qualified ? '#2e7d32' : '#c62828'}">
          ${qualificationStatus} - Pre-Qualification Submission
        </h2>
        
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <h3 style="margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Property Information</h3>
          <p><strong>Property ID:</strong> ${qualification.propertyId}</p>
          <p><strong>Property Address:</strong> ${qualification.propertyAddress}, ${qualification.propertyCity}, ${qualification.propertyState} ${qualification.propertyZip}</p>
          <p><strong>Property Price:</strong> ${formatCurrency(qualification.propertyPrice)}</p>
          <p><strong>Loan Amount:</strong> ${formatCurrency(qualification.loanAmount)}</p>
          <p><strong>Down Payment:</strong> ${formatCurrency(qualification.downPayment)}</p>
          <p><strong>Interest Rate:</strong> ${qualification.interestRate ? qualification.interestRate + '%' : 'N/A'}</p>
          <p><strong>Monthly Payment:</strong> ${formatCurrency(qualification.monthlyPayment)}/month</p>
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <h3 style="margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Applicant Information</h3>
          <p><strong>Name:</strong> ${qualification.firstName} ${qualification.lastName}</p>
          <p><strong>Email:</strong> ${qualification.email}</p>
          <p><strong>Phone:</strong> ${qualification.phone}</p>
          <p><strong>Employment:</strong> ${qualification.employmentStatus}</p>
          <p><strong>Credit Score:</strong> ${qualification.currentCreditScore}</p>
          <p><strong>Annual Income:</strong> ${qualification.grossAnnualIncome}</p>
        </div>
        
        ${!qualification.qualified ? `
        <div style="margin-bottom: 20px; padding: 15px; background-color: #ffebee; border-radius: 5px; border-left: 4px solid #c62828;">
          <h3 style="margin-top: 0; color: #c62828;">Disqualification Reasons</h3>
          <p>${qualification.disqualificationReason}</p>
        </div>` : ''}
        
        <p style="margin-top: 30px; font-size: 14px; color: #757575;">
          This is an automated message from the Landivo Pre-Qualification System.
        </p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Landivo Qualification" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Qualification notification email sent successfully");
  } catch (error) {
    console.error("Error sending qualification email:", error);
  }
}