import { QueryFailedError } from 'typeorm';

export const queryFailedGuard = (err: any): err is QueryFailedError => err instanceof QueryFailedError;
