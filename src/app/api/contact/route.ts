import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(150),
  serviceType: z.enum([
    'bio-platform',
    'custom-profile-design',
    'custom-web-development',
    'enterprise-saas',
    'support',
    'other',
  ]),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.issues[0]?.message || 'Invalid form data provided',
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, serviceType, message } = result.data;

    // Structured server log for traceability
    console.info('[CONTACT_INQUIRY]', {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || 'N/A',
      subject,
      serviceType,
      messageLength: message.length,
    });

    return NextResponse.json({
      success: true,
      data: {
        message:
          'Thank you for reaching out! Your inquiry has been received. An Esitesz specialist will connect with you via email or WhatsApp shortly.',
      },
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process inquiry. Please reach out directly at contact@esitesz.com or via WhatsApp.',
      },
      { status: 500 }
    );
  }
}
