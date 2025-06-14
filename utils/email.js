// const pug = require('pug');
const htmlToText = require('html-to-text');
const nodemailer = require('nodemailer');

class Email {
  constructor(user, url) {
    this.firstName = user.name.split(' ')[0];
    this.to = user.email;
    this.from = `Nwosu Chisom <${process.env.EMAIL_FROM}>`;
    this.url = url;
  }

  newTransport() {
    if (process.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firtName: this.firstName,
    //   url: this.url,
    //   subject,
    // });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      // html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to natours family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (expires after 10mins)',
    );
  }
}

module.exports = Email;
