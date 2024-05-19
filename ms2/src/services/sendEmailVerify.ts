
import path from 'path';
import { generateDynamicLink } from './generateLink/firebaseGenerateLink';

import {sendMail} from './providers/MailProvider/etherealMailProvider';

interface IRequestDTO {
  to: {
    email: string;
    name: string;
  }
  type: string;
  subject: string;
  token: string;
}

export async function sendEmailVerify({ to, subject, token }: IRequestDTO): Promise<void> {
  const verifiedEmailTemplate = path.resolve(
    __dirname,
    '..',
    'views',
    'verified_email.hbs',
  );

  await sendMail({
    to: {
      name: to.name,
      email: to.email,
    },
    subject,
    templateData: {
      file: verifiedEmailTemplate,
      variables: {
        name: to.name,
        link: process.env.NODE_ENV === 'development' ? `${process.env.APP_URL}/api/v1/user/confirm/email?token=${token}`: await generateDynamicLink(`${process.env.APP_URL}/api/v1/user/confirm/email?token=${token}`),
      },
    },
  });
}
