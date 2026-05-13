'use server';

import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-supabase-url.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-service-key';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// In-memory IP rate limit map
const rateLimitMap = new Map<string, number[]>();

// Strict sanitization: strip ALL HTML tags and trim
const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, '').trim();

export async function generateCertificateAction(data: {
  customer_name: string;
  title_ar: string;
  title_en: string;
  serial_number: string;
  payment_status: string;
  language_preference: string;
  template_id: string;
  badge_id: string | null;
}) {
  // IP-based Rate Limiting
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const now = Date.now();
  
  let history = rateLimitMap.get(ip) || [];
  history = history.filter(time => now - time < 60000); // within last 1 minute
  
  if (history.length >= 5) {
    return { error: 'RATE_LIMIT_EXCEEDED' };
  }
  
  history.push(now);
  rateLimitMap.set(ip, history);

  // Sanitization
  const sanitizedName = sanitize(data.customer_name);
  const sanitizedTitleAr = sanitize(data.title_ar);
  const sanitizedTitleEn = sanitize(data.title_en);

  try {
    const { error } = await supabaseAdmin.from('orders').insert([{
      customer_name: sanitizedName,
      title_ar: sanitizedTitleAr,
      title_en: sanitizedTitleEn,
      serial_number: data.serial_number,
      payment_status: data.payment_status,
      language_preference: data.language_preference,
      template_id: data.template_id,
      badge_id: data.badge_id
    }]);

    if (error) {
      console.error('Supabase Admin Insert Error:', error);
      return { error: 'DB_ERROR' };
    }

    return { success: true };
  } catch (e) {
    console.error('Action Exception:', e);
    return { error: 'INTERNAL_SERVER_ERROR' };
  }
}