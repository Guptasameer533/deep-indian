import { sendSMSNotification } from "./sms"

interface EmailData {
  name: string
  email: string
  phone: string
  message: string
}

export async function sendContactEmail(data: EmailData) {
  try {
    // Clean text version for better email delivery
    const textContent = `
New Contact Form Submission - Deep Indian LEDs
=============================================

Customer Details:
-----------------
👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}

Message:
--------
${data.message}

Additional Information:
----------------------
📅 Date: ${new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
⏰ Time: ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    })}
🌐 Source: Deep Indian LED Website Contact Form

---
This is an automated message from your website contact form.
Please reply directly to the customer's email: ${data.email}
    `

    // Simple HTML version (optional, cleaner format)
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 10px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #f97316, #fb923c); color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">🔥 New Contact Form Submission</h2>
        <p style="margin: 5px 0 0 0;">Deep Indian LED Website</p>
      </div>
      
      <div style="padding: 30px; background: white; margin: 20px;">
        <h3 style="color: #f97316; margin-top: 0;">Customer Details:</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #f97316; width: 100px;">👤 Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #f97316;">📧 Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #f97316; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #f97316;">📱 Phone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:+91${data.phone}" style="color: #f97316; text-decoration: none;">+91 ${data.phone}</a></td>
          </tr>
        </table>
        
        <h3 style="color: #f97316; margin-top: 30px;">💬 Message:</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316;">
          ${data.message.replace(/\n/g, "<br>")}
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
          <p><strong>📅 Received:</strong> ${new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "medium",
          })}</p>
          <p><strong>🌐 Source:</strong> Deep Indian LED Website Contact Form</p>
        </div>
      </div>
      
      <div style="background: #f97316; color: white; padding: 15px; text-align: center;">
        <p style="margin: 0; font-size: 14px;">
          💡 <strong>Quick Action:</strong> Reply directly to <a href="mailto:${data.email}" style="color: white; text-decoration: underline;">${data.email}</a>
        </p>
      </div>
    </div>
    `

    // Send email first
    const emailResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || "0dbd8392-6012-4200-8526-bc02aa3fd902",
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: textContent,
        to: "work@deepindian.in",
        subject: `🔥 New Lead: ${data.name} - Deep Indian LEDs Contact Form`,
        from_name: "Deep Indian LED Website",
        replyto: data.email,
        html: htmlContent,
        botcheck: false,
        "Customer Name": data.name,
        "Customer Email": data.email,
        "Customer Phone": data.phone,
        "Customer Message": data.message,
        "Submission Time": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      }),
    })

    const emailResult = await emailResponse.json()

    if (!emailResponse.ok || !emailResult.success) {
      throw new Error(emailResult.message || "Failed to send email")
    }

    // Send SMS notification after successful email
    try {
      await sendSMSNotification(data)
      console.log("SMS notification sent successfully")
    } catch (smsError) {
      console.error("SMS notification failed, but email was sent:", smsError)
      // Don't fail the entire process if SMS fails
    }

    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}
