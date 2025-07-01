
// Using .tsx for potential JSX like SVG icons.
// No specific constants needed for now other than those embedded in components or services.
// API Keys and sensitive information should always be handled via environment variables.

// Example:
// export const APP_TITLE = "Internal IT Support Chatbot";
// export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

// For quick replies to keep them consistent
export const QUICK_REPLY_OPTIONS = {
  INITIAL: [
    { id: 'qr_password_reset', label: 'Password Reset', payload: 'I need help with password reset.' },
    { id: 'qr_vpn_issue', label: 'VPN Problem', payload: 'I have a VPN problem.' },
    { id: 'qr_email_access', label: 'Email Access', payload: 'I cannot access my email.' },
    { id: 'qr_onboarding', label: 'New Employee Onboarding', payload: 'I need help with new employee onboarding.' },
  ],
  ESCALATE: { id: 'qr_escalate', label: 'Talk to Human Agent', payload: 'ESC_AGENT' },
  MAIN_MENU: { id: 'qr_main_menu', label: 'Main Menu', payload: 'Show main menu' },
};

export const BOT_GREETING_MESSAGE = "Hello! I'm your IT Support Bot. How can I help you today?";
export const BOT_SYSTEM_INSTRUCTION = `You are an expert internal IT support chatbot for a company. 
Your goal is to help employees resolve common IT issues. 
Be friendly, professional, concise, and guide users step-by-step. 
You can help with:
1.  Password reset (guide through self-service portal or standard procedure)
2.  VPN issues (check connection, guide common troubleshooting steps)
3.  Email access problems (check account status, common client issues)
4.  Onboarding new employees (provide links to resources, checklists, initial setup help)

When a user asks for help, first try to understand the specific problem within these categories.
Provide clear instructions. If a user's request is vague, ask clarifying questions.
If you cannot resolve the issue after a few attempts or if the issue is complex, offer to escalate to a human agent. 
If the user chooses to escalate, respond with: "Okay, I'll connect you with a human agent. Please wait a moment." and then end the interaction for escalation.
If the user seems satisfied or the issue is resolved, confirm this and ask if there's anything else you can help with.
If the user asks for the main menu, present the initial quick reply options again.
Do not answer questions outside of these IT support topics. If asked, politely state you can only help with IT support issues.`;
