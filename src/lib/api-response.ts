import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export function jsonResponse<T>(
  data: T,
  status = 200,
  headers?: Record<string, string>
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status, headers }
  );
}

export function errorResponse(
  errorMessage: string,
  status = 400,
  context?: Record<string, unknown>
): NextResponse<ApiResponse<null>> {
  const timestamp = new Date().toISOString();
  // Structured logging for server diagnostics
  console.error(
    JSON.stringify({
      timestamp,
      severity: status >= 500 ? 'ERROR' : 'WARN',
      status,
      message: errorMessage,
      context,
    })
  );

  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
    },
    { status }
  );
}
