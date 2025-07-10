"use server"

import { sendContactEmail } from "@/lib/email"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    // Basic validation
    if (!name || !email || !phone || !message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Enhanced validation
    const trimmedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim().replace(/\s+/g, ""),
      message: message.trim(),
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Phone validation (Indian format)
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    if (!phoneRegex.test(trimmedData.phone)) {
      return {
        success: false,
        error: "Please enter a valid Indian phone number (10 digits starting with 6-9)",
      }
    }

    // Name validation
    if (trimmedData.name.length < 2) {
      return {
        success: false,
        error: "Name must be at least 2 characters long",
      }
    }

    // Message validation
    if (trimmedData.message.length < 10) {
      return {
        success: false,
        error: "Message must be at least 10 characters long",
      }
    }

    // Send email and SMS notifications
    const result = await sendContactEmail(trimmedData)

    if (result.success) {
      return {
        success: true,
        message:
          "Thank you for your inquiry! We've received your message and will get back to you within 24 hours. You'll also receive an SMS confirmation shortly.",
      }
    } else {
      return {
        success: false,
        error:
          "Failed to send message. Please try again or contact us directly at work@deepindian.in or +91 80528 38300",
      }
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function submitProductEnquiry(productName: string, userEmail?: string) {
  try {
    // Create a structured enquiry message
    const enquiryMessage = `
PRODUCT ENQUIRY DETAILS:
========================

Product of Interest: ${productName}
Enquiry Type: Product Information Request
Source: Website Product Page

Customer Request:
-----------------
The customer is interested in learning more about "${productName}" and would like:
• Product specifications and features
• Pricing information
• Availability and delivery options
• Technical support if needed

Next Steps:
-----------
Please follow up with the customer to provide:
1. Detailed product information
2. Competitive pricing
3. Delivery timeline
4. Any special offers or bulk discounts

This enquiry was generated from the Deep Indian LED website product section.
    `

    const enquiryData = {
      name: "Website Product Enquiry",
      email: userEmail || "enquiry@deepindian.in",
      phone: "Not provided - Website enquiry",
      message: enquiryMessage,
    }

    const result = await sendContactEmail(enquiryData)

    if (result.success) {
      return {
        success: true,
        message: `Thank you for your interest in ${productName}! Our team will contact you soon with detailed information and pricing. You'll also receive SMS updates.`,
      }
    } else {
      return {
        success: false,
        error: "Failed to submit enquiry. Please use the contact form below or call us directly at +91 80508 38300.",
      }
    }
  } catch (error) {
    console.error("Product enquiry error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try the contact form instead.",
    }
  }
}
