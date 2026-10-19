import { getSessionUser } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-response';

export async function GET() {
  const user = await getSessionUser();
  return jsonResponse({ user });
}
