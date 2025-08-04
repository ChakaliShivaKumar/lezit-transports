import nodemailer from 'nodemailer';

// Email configurations
const bookingEmailConfig = {
  host: process.env.SMTP_HOST || 'smtppro.zoho.in',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER_BOOKING || 'bookings@lezittransports.com',
    pass: process.env.SMTP_PASS_BOOKING || ''
  }
};

const supportEmailConfig = {
  host: process.env.SMTP_HOST || 'smtppro.zoho.in',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER_SUPPORT || 'support@lezittransports.com',
    pass: process.env.SMTP_PASS_SUPPORT || ''
  }
};

// Create transporters
const bookingTransporter = nodemailer.createTransport(bookingEmailConfig);
const supportTransporter = nodemailer.createTransport(supportEmailConfig);

// Verify email configurations
const verifyEmailConfigs = async () => {
  try {
    await bookingTransporter.verify();
    console.log('✅ Booking email configuration verified');
  } catch (error) {
    console.error('❌ Booking email configuration failed:', error);
  }

  try {
    await supportTransporter.verify();
    console.log('✅ Support email configuration verified');
  } catch (error) {
    console.error('❌ Support email configuration failed:', error);
  }
};

// Email templates
const emailTemplates = {
  bookingConfirmation: (bookingData: any) => ({
    subject: `Booking Confirmation - ${bookingData.serviceType} Transportation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1>LEZIT TRANSPORTS</h1>
          <h2>Booking Confirmation</h2>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h3>Dear ${bookingData.userName},</h3>
          <p>Your transportation booking has been confirmed successfully!</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Booking Details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.serviceType} - ${bookingData.serviceCategory}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Pickup Location:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.pickupLocation}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Drop Location:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.dropLocation}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date & Time:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.pickupDate} at ${bookingData.pickupTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Vehicle Type:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.vehicleType}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total Amount:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">₹${bookingData.totalAmount}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Important Information:</h4>
            <ul>
              <li>Please be ready 10 minutes before the scheduled pickup time</li>
              <li>Our driver will contact you 30 minutes before pickup</li>
              <li>Payment can be made in cash or online as per your preference</li>
              <li>For any changes, please contact us at least 2 hours before pickup</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p>Thank you for choosing LEZIT TRANSPORTS!</p>
            <p>For support, contact us at: <a href="mailto:support@lezittransports.com">support@lezittransports.com</a></p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>© 2024 LEZIT TRANSPORTS. All rights reserved.</p>
        </div>
      </div>
    `
  }),

  bookingCancellation: (bookingData: any) => ({
    subject: `Booking Cancelled - ${bookingData.serviceType} Transportation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
          <h1>LEZIT TRANSPORTS</h1>
          <h2>Booking Cancelled</h2>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h3>Dear ${bookingData.userName},</h3>
          <p>Your transportation booking has been cancelled as requested.</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Cancelled Booking Details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingData.serviceType} - ${bookingData.serviceCategory}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Cancellation Date:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p>We hope to serve you again soon!</p>
            <p>For any questions, contact us at: <a href="mailto:support@lezittransports.com">support@lezittransports.com</a></p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>© 2024 LEZIT TRANSPORTS. All rights reserved.</p>
        </div>
      </div>
    `
  }),

  contactForm: (contactData: any) => ({
    subject: `New Contact Form Submission - ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1>LEZIT TRANSPORTS</h1>
          <h2>New Contact Form Submission</h2>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Contact Details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactData.subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactData.message}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p>Please respond to this inquiry as soon as possible.</p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>© 2024 LEZIT TRANSPORTS. All rights reserved.</p>
        </div>
      </div>
    `
  }),

  supportRequest: (supportData: any) => ({
    subject: `Support Request - ${supportData.category}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ffc107; color: white; padding: 20px; text-align: center;">
          <h1>LEZIT TRANSPORTS</h1>
          <h2>Support Request</h2>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Support Request Details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>User:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${supportData.userName} (${supportData.userEmail})</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Category:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${supportData.category}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Priority:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${supportData.priority}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${supportData.subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Description:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${supportData.description}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p>Please address this support request promptly.</p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>© 2024 LEZIT TRANSPORTS. All rights reserved.</p>
        </div>
      </div>
    `
  })
};

// Email service functions
export const sendBookingConfirmation = async (bookingData: any, userEmail: string) => {
  try {
    const template = emailTemplates.bookingConfirmation(bookingData);
    
    const mailOptions = {
      from: process.env.SMTP_USER_BOOKING || 'bookings@lezittransports.com',
      to: userEmail,
      subject: template.subject,
      html: template.html
    };

    const result = await bookingTransporter.sendMail(mailOptions);
    console.log('✅ Booking confirmation email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error('❌ Failed to send booking confirmation email:', error);
    return { success: false, error: error.message };
  }
};

export const sendBookingCancellation = async (bookingData: any, userEmail: string) => {
  try {
    const template = emailTemplates.bookingCancellation(bookingData);
    
    const mailOptions = {
      from: process.env.SMTP_USER_BOOKING || 'bookings@lezittransports.com',
      to: userEmail,
      subject: template.subject,
      html: template.html
    };

    const result = await bookingTransporter.sendMail(mailOptions);
    console.log('✅ Booking cancellation email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error('❌ Failed to send booking cancellation email:', error);
    return { success: false, error: error.message };
  }
};

export const sendContactForm = async (contactData: any) => {
  try {
    const template = emailTemplates.contactForm(contactData);
    
    const mailOptions = {
      from: process.env.SMTP_USER_SUPPORT || 'support@lezittransports.com',
      to: process.env.SMTP_USER_SUPPORT || 'support@lezittransports.com',
      subject: template.subject,
      html: template.html
    };

    const result = await supportTransporter.sendMail(mailOptions);
    console.log('✅ Contact form email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error('❌ Failed to send contact form email:', error);
    return { success: false, error: error.message };
  }
};

export const sendSupportRequest = async (supportData: any) => {
  try {
    const template = emailTemplates.supportRequest(supportData);
    
    const mailOptions = {
      from: process.env.SMTP_USER_SUPPORT || 'support@lezittransports.com',
      to: process.env.SMTP_USER_SUPPORT || 'support@lezittransports.com',
      subject: template.subject,
      html: template.html
    };

    const result = await supportTransporter.sendMail(mailOptions);
    console.log('✅ Support request email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error('❌ Failed to send support request email:', error);
    return { success: false, error: error.message };
  }
};

// Initialize email verification
verifyEmailConfigs();

export default {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendContactForm,
  sendSupportRequest
}; 