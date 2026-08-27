import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
 host: "localhost",
 port: 1025,
 ignoreTLS: true,
 secure: false
});

function verificationEmailTemplate(email: string, verificationLink: string) {

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 480px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .header {
        background-color: #4f46e5;
        color: #ffffff;
        padding: 24px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 20px;
      }
      .body {
        padding: 32px 24px;
        color: #333333;
      }
      .body p {
        line-height: 1.6;
        font-size: 15px;
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 28px;
        background-color: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        padding: 16px 24px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
      .link-fallback {
        word-break: break-all;
        font-size: 12px;
        color: #4f46e5;
        margin-top: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>
      <div class="body">
        <p>Hi ${email},</p>
        <p>Thanks for signing up! Please confirm your email address by clicking the button below.</p>
        <div style="text-align: center;">
          <a href="${verificationLink}" class="button">Verify Email</a>
        </div>
        <p class="link-fallback">
          Or copy and paste this link into your browser:<br>
          ${verificationLink}
        </p>
        <p>This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}


export const sendMail = async (email: string, token: string) => {
	const verificationLink = `http://localhost:3000/api/v1/auth/verify-email?token=${token}`;

	await transporter.sendMail({
		from: '"elmart" <no-reply@yourapp.com>',
		to: email,
		subject: "Email Verification",
		html: verificationEmailTemplate(email,verificationLink)
	});

}