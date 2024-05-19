import { IParseMailTemplateDTO } from '../../MailTemplateProvider/dtos/IMailTemplateProviderDTO';

interface IMailContact {
  name: string;
  email: string;
}

export interface SendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export interface IMailProvider {
  sendMail({ templateData, from, to, subject }: SendMailDTO): Promise<void>;
}
