import { container } from 'tsyringe';
import CreateNotificationUseCase from './createNotification';

const CreateNotification = container.resolve(CreateNotificationUseCase);

export { CreateNotificationUseCase, CreateNotification };