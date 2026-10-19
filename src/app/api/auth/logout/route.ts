import { clearSessionCookie } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-response';

export async function POST() {
  await clearSessionCookie();
  return jsonResponse({ message: 'Logged out successfully' });
}
