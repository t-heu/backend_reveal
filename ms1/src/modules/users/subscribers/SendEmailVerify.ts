import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { SendEmailVerifyEvent } from '../domain/events/SendEmailVerify';

import { serviceNoti } from '../infra/rabbitmq';

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
    console.log('[AfterUserCreated]: Executed');

    await serviceNoti(
      {
        subject: this.craftMessage(),
        to: {
          email: event.user.email.value,
          name: event.user.name.value,
        },
        type: 'verified_email',
        token: event.user.generateToken,
      },
      'sendEmailRegistrations',
    );
  }
}
