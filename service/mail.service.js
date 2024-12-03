import nodemailer from 'nodemailer';

class mailService {

    constructor(){ 
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    
    async sendMail(email, activationLink){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Avtivation website ${process.env.DOMAIN}`,
            html: `<div>
                    <h1><a href="${activationLink}">Click for activate your account</a></h1>
                   </div>`
        })
    }
}

export default new mailService();