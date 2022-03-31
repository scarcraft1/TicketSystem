import { PIPES } from './pipes';
import { ROUTES } from './routes';

const COMPONENTS = [...ROUTES, ...PIPES]

export * from './pipes';
export * from './routes';
export { COMPONENTS };
