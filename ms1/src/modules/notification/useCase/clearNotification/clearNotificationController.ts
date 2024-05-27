import { container } from 'tsyringe';

import ClearNotificationUseCase from '@/modules/notification/useCase/clearNotification/clearNotificationUseCase';

interface IRequestDTO {
  userID: string;
}

export class ClearNotificationController {
  async executeImpl({ userID }: IRequestDTO): Promise<any> {
    const response = container.resolve(ClearNotificationUseCase);
    await response.execute({
      userID,
    });
  }
}
