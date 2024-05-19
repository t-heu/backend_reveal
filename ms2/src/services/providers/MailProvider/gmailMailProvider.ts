import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

import mailConfig from '../../../configMail';

// Função para criar o transportador
async function createTransporter(): Promise<Transporter> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_MAIL_USER,
      clientId: process.env.GMAIL_MAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_MAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_MAIL_REFRESH_TOKEN,
      accessToken: process.env.GMAIL_MAIL_ACCESS_TOKEN,
      expires: 3599,
    },
  });

  return transporter;
}

async function mailTemplateParse({file, variables}: any) {
  const templateFileContent = await fs.promises.readFile(file, {
    encoding: 'utf-8',
  });

  const parseTemplate = handlebars.compile(templateFileContent);
  return parseTemplate(variables);
}

// Função para enviar o email
async function sendMail({ from, to, subject, templateData }: any): Promise<void> {
  const transporter = await createTransporter();
  const { name, email } = mailConfig.defaults.from;

  await transporter.sendMail({
    from: {
      name: from?.name || name,
      address: from?.email || email,
    },
    to: {
      name: to.name,
      address: to.email,
    },
    subject,
    html: await mailTemplateParse(templateData),
  });
}

export { sendMail };
