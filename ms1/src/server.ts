import 'reflect-metadata';

// Infra
import './shared/infra/database';
import './shared/infra/container';
import './shared/infra/app';

// Subscribers
import './modules/feed/subscribers';
// import './modules/notification/subscribers';
import './modules/users/subscribers';

console.log('[App]: 🚀 Start server');
