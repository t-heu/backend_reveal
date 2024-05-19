import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

import mailConfig from '../../../configMail';

// Função para criar o transportador
async function createTransporter(): Promise<Transporter> {
  const account = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
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
async function sendMail({ to, subject, templateData }: any): Promise<void> {
  const transporter = await createTransporter();
  const { name, email } = mailConfig.defaults.from;

  const message = await transporter.sendMail({
    from: {
      name: name,
      address: email,
    },
    to: {
      name: to.name,
      address: to.email,
    },
    subject,
    html: await mailTemplateParse(templateData),
  });

  console.log(nodemailer.getTestMessageUrl(message));
}

export { sendMail, mailTemplateParse };
