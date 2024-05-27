import { container } from 'tsyringe';
import CreateNotificationUseCase from '@/modules/notification/useCase/createNotification/createNotification';

const CreateNotification = container.resolve(CreateNotificationUseCase);

export { CreateNotificationUseCase, CreateNotification };