import { ImageResponse } from 'next/og';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

export const alt = 'TXT8 Certified Legend';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { serial: string } }) {
  // Try fetching the user's data using the serial number
  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq('serial_number', params.serial)
    .single();

  const name = data?.customer_name || 'Legend';
  const titleAr = data?.title_ar || 'أسطورة معتمدة';
  const titleEn = data?.title_en || 'Certified Legend';
  
  // Decide which language title to show based on preference if available, else fallback
  const isRTL = data?.language_preference === 'ar' || true;
  const title = isRTL ? titleAr : titleEn;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080808',
          border: '16px solid #2e6417',
          position: 'relative',
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(57, 255, 20, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            fontSize: 200,
            fontWeight: 900,
            color: 'rgba(57, 255, 20, 0.03)',
            transform: 'rotate(-20deg)',
          }}
        >
          TXT8 OFFICIAL
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          <h3
            style={{
              color: '#2e6417',
              fontSize: 32,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            {isRTL ? 'صك ملكية فخرية' : 'Honorary Certificate'}
          </h3>

          <h2
            style={{
              color: '#ffffff',
              fontSize: 80,
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {name}
          </h2>

          <div
            style={{
              backgroundColor: 'rgba(57, 255, 20, 0.1)',
              border: '4px solid #39ff14',
              padding: '20px 60px',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                color: '#39ff14',
                fontSize: 50,
                fontWeight: 'bold',
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '0 60px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#555555', fontSize: 16 }}>SERIAL_NO</span>
            <span style={{ color: '#2e6417', fontSize: 24, fontFamily: 'monospace' }}>{params.serial}</span>
          </div>
          <div style={{ color: '#39ff14', fontSize: 24, fontWeight: 'bold' }}>
            KAC8.ME
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
