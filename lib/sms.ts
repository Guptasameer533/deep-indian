interface SMSData {
  name: string
  email: string
  phone: string
  message: string
}

export async function sendSMSNotification(data: SMSData) {
  try {
    // Format SMS message for business notification
    const smsMessage = `🔥 NEW LEAD - Deep Indian LEDs

👤 ${data.name}
📧 ${data.email}
📱 ${data.phone}

💬 "${data.message.substring(0, 100)}${data.message.length > 100 ? "..." : ""}"

⏰ ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Reply to customer: ${data.email}`

    // Using Textbelt API for SMS (you can replace with your preferred SMS service)
    const response = await fetch("https://textbelt.com/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: "+919876543210", // Your business phone number
        message: smsMessage,
        key: process.env.TEXTBELT_API_KEY || "textbelt", // Free tier key
      }),
    })

    const result = await response.json()

    if (result.success) {
      console.log("SMS notification sent successfully")
      return { success: true }
    } else {
      console.error("SMS sending failed:", result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error("SMS notification error:", error)
    return { success: false, error: "Failed to send SMS notification" }
  }
}

// Alternative SMS service using Web3Forms SMS feature
export async function sendSMSViaWeb3Forms(data: SMSData) {
  try {
    const smsContent = `NEW LEAD: ${data.name} (${data.phone}) interested in Deep Indian LEDs. Email: ${data.email}. Check email for full details.`

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || "0dbd8392-6012-4200-8526-bc02aa3fd902",
        subject: "SMS Notification - New Lead",
        message: smsContent,
        to: "+919876543210", // Your business phone number for SMS
        from_name: "Deep Indian LED Website",
        botcheck: false,
        // Enable SMS notification if supported by your Web3Forms plan
        sms: true,
        sms_to: "+919876543210",
        sms_message: smsContent,
      }),
    })

    const result = await response.json()
    return { success: result.success }
  } catch (error) {
    console.error("Web3Forms SMS error:", error)
    return { success: false, error: "Failed to send SMS via Web3Forms" }
  }
}
