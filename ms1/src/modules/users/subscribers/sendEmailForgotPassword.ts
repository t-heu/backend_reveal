import { container } from 'tsyringe';

import { DomainEvents } from '../../../shared/domain/events/domainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { SendEmailForgotPasswordEvent } from '../domain/events/sendEmailForgotPasswordEvent';

import { RabbitMQHandler } from '../../../shared/infra/rabbitmq/rabbitMQHandler';

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
    const rabbitMQHandler = container.resolve(RabbitMQHandler);
    console.log('[forgot_password]: Executed');

    await rabbitMQHandler.publishToQueue('sendEmailRegistrations', {
      subject: this.craftMessage(),
      to: {
        email: event.user.email.value,
        name: event.user.name.value,
      },
      type: 'forgot_password',
      token: event.user.generateToken,
    });
  }
}
