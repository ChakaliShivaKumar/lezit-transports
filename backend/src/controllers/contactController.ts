import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendContactForm } from '../utils/emailService';

// Submit contact form
export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
      return;
    }

    const { name, email, phone, subject, message } = req.body;

    // Send email notification
    try {
      const contactData = {
        name,
        email,
        phone,
        subject,
        message
      };

      await sendContactForm(contactData);
    } catch (emailError) {
      console.error('Failed to send contact form email:', emailError);
      // Don't fail the contact submission if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!'
    });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
};

// Submit support request
export const submitSupportRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
      return;
    }

    const { name, email, category, priority, subject, description } = req.body;

    // Send email notification
    try {
      const supportData = {
        userName: name,
        userEmail: email,
        category,
        priority,
        subject,
        description
      };

      await sendContactForm(supportData);
    } catch (emailError) {
      console.error('Failed to send support request email:', emailError);
      // Don't fail the support submission if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Support request submitted successfully. We will address your issue soon!'
    });
  } catch (error: any) {
    console.error('Error submitting support request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit support request',
      error: error.message
    });
  }
}; 