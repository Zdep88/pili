import { sequelize } from './relations.js';

try {
    await sequelize.sync( { force: true } );
    console.log('Database reset completed successfully.');
    process.exit(0);
} catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
}