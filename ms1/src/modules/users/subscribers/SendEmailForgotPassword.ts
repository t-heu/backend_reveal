import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { SendEmailForgotPasswordEvent } from '../domain/events/SendEmailForgotPassword.ts';

import { serviceNoti } from '../infra/rabbitmq';

export class SendEmailForgotPassword implements IHandle {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(
      // @ts-ignore
      this.onSendEmailEvent.bind(this),
      SendEmailForgotPasswordEvent.name,
    );
  }

  private craftMessage(): string {
    return `Reveal Forgot Password`;
  }

  // This is called when the domain event is dispatched.
  private async onSendEmailEvent(
    event: SendEmailForgotPasswordEvent,
  ): Promise<void> {
    console.log('[forgot_password]: Executed');

    await serviceNoti(
      {
        subject: this.craftMessage(),
        to: {
          email: event.user.email.value,
          name: event.user.name.value,
        },
        type: 'forgot_password',
        token: event.user.generateToken,
      },
      'sendEmailRegistrations',
    );
  }
}