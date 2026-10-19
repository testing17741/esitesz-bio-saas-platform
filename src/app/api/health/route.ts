import { jsonResponse } from '@/lib/api-response';

export async function GET() {
  return jsonResponse({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'eSitesz Bio Platform API',
    uptime: process.uptime(),
    version: '1.0.0',
  });
}
