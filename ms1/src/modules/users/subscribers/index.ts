import { SendEmailVerify } from '@/modules/users/subscribers/sendEmailVerify';
import { SendEmailForgotPassword } from '@/modules/users/subscribers/sendEmailForgotPassword';

new SendEmailVerify();
new SendEmailForgotPassword();
