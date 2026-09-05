import { config } from 'dotenv';
import { execSync } from 'child_process';

config({ path: '.env.development' });

export async function resetDatabase(): Promise<void> {
  execSync('npx prisma db execute --stdin', {
    input: 'DROP SCHEMA IF EXISTS public CASCADE;\nCREATE SCHEMA public;',
    stdio: ['pipe', 'inherit', 'inherit'],
  });

  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
}
