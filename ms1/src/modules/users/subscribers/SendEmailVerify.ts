import { container } from 'tsyringe';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { SendEmailVerifyEvent } from '../domain/events/SendEmailVerify';

import { RabbitMQHandler } from '../../../shared/infra/rabbitmq/RabbitMQHandler';

export class SendEmailVerify implements IHandle {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(
      // @ts-ignore
      this.onSendEmailEvent.bind(this),
      SendEmailVerifyEvent.name,
    );
  }

  private craftMessage(): string {
    return `Reveal confirm your email!`;
  }

  // This is called when the domain event is dispatched.
  private async onSendEmailEvent(event: SendEmailVerifyEvent): Promise<void> {
    const rabbitMQHandler = container.resolve(RabbitMQHandler);
    console.log('[AfterUserCreated]: Executed');

    await rabbitMQHandler.publishToQueue('sendEmailRegistrations', {
      subject: this.craftMessage(),
      to: {
        email: event.user.email.value,
        name: event.user.name.value,
      },
      type: 'verified_email',
      token: event.user.generateToken,
    });
  }
}
