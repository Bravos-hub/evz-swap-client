import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

/**
 * EVZ-P06-S01 — ExtendHold (Mobile, World-class, Router-safe)
 * - Shows remaining hold time and current summary
 * - Calculates extension options (5 / 10 / 15 min) as add-on prices vs. current fee
 * - Persists selection to localStorage('evz.booking.extend*') and continues to /booking/extend/pay
 * Brand colors used: primary green #03CD8C, accent orange #F77F00.
 */

const BOOK_NS = 'evz.booking.';

const HOLD_OPTIONS = [
  { minutes: 5, label: '5 minutes', fee: 3200 },
  { minutes: 10, label: '10 minutes', fee: 3350 },
  { minutes: 15, label: '15 minutes', fee: 3500 },
];

function get(k: string, d = ''): string {
  try {
    return localStorage.getItem(BOOK_NS + k) || d;
  } catch {
    return d;
  }
}

function fmtUGX(n: number): string {
  return `UGX ${Number(n || 0).toLocaleString('en-UG')}`;
}

function msToClock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

export default function ExtendHoldScreen(): JSX.Element {
  const navigate = useNavigate();
  const stationName = get('stationName');
  const minutes = Number(get('holdMinutes', '0'));
  const fee = Number(get('holdFee', '0'));
  const expiryAt = Number(get('expiryAt', '0'));

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, expiryAt - now);
  const danger = remainingMs <= 60 * 1000;

  // Determine available targets strictly greater than current minutes
  const targets = useMemo(
    () => HOLD_OPTIONS.filter((o) => o.minutes > minutes),
    [minutes]
  );

  const onExtend = (target: (typeof HOLD_OPTIONS)[number]) => {
    const addOn = Math.max(0, target.fee - fee);
    try {
      localStorage.setItem(BOOK_NS + 'extendTargetMinutes', String(target.minutes));
      localStorage.setItem(BOOK_NS + 'extendTargetFee', String(target.fee));
      localStorage.setItem(BOOK_NS + 'extendAddOnFee', String(addOn));
    } catch {
      // ignore storage failures
    }
    navigate(ROUTES.EXTEND_PAYMENT);
  };

  const hasBooking = !!expiryAt && !!minutes && !!fee;

  return (
    <Box
      className="evz-extend-screen"
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #F9FAFB 0%, #F2F4F7 40%, #FFFFFF 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        className="px-5 pt-6 pb-2"
        sx={{ maxWidth: 420, mx: 'auto', width: '100%' }}
      >
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ letterSpacing: 0.02, color: '#111827' }}
        >
          Extend hold
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          {stationName || 'Station'}
        </Typography>
      </Box>

      {/* Timer + summary card */}
      <Box className="px-5" sx={{ maxWidth: 420, mx: 'auto', width: '100%' }}>
        <Card
          sx={{
            bgcolor: 'rgba(255,255,255,0.96)',
            borderRadius: 3,
            boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
            border: '1px solid #F3F4F6',
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ py: 2.5 }}>
            <Stack direction="row" spacing={2.25} alignItems="center">
              <Box
                sx={{
                  p: 2.25,
                  borderRadius: 2.5,
                  textAlign: 'center',
                  bgcolor: danger
                    ? 'rgba(247, 127, 0, 0.06)'
                    : 'rgba(3, 205, 140, 0.08)',
                  border: '1px solid',
                  borderColor: danger ? '#F77F00' : '#03CD8C',
                  minWidth: 132,
                  boxShadow: danger
                    ? '0 12px 30px rgba(247, 127, 0, 0.35)'
                    : '0 12px 30px rgba(3, 205, 140, 0.3)',
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: danger ? '#F77F00' : '#03CD8C' }}
                >
                  {msToClock(remainingMs)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#6B7280', textTransform: 'uppercase', mt: 0.5 }}
                >
                  time remaining
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={800}
                  sx={{ color: '#111827', mb: 0.25 }}
                >
                  Current hold
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {minutes} min • {fmtUGX(fee)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Extension options */}
      <Box
        className="px-5 mt-3"
        sx={{ maxWidth: 420, mx: 'auto', width: '100%' }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={800}
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 0.12,
            fontSize: 12,
            color: '#4B5563',
          }}
        >
          Extension options
        </Typography>
        {!hasBooking && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            No active booking.{' '}
            <a href="/stations/map-list" style={{ color: '#F77F00' }}>
              Find stations
            </a>
            .
          </Typography>
        )}
        {hasBooking && targets.length === 0 && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            You already have the maximum hold (15 min).
          </Typography>
        )}
        <Stack spacing={1.5} mt={1.5}>
          {targets.map((t, index) => {
            const add = Math.max(0, t.fee - fee);
            const addFormatted = Number(add || 0).toLocaleString('en-UG');
            const isRecommended = index === 0;
            return (
              <Button
                key={t.minutes}
                onClick={() => onExtend(t)}
                variant="outlined"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderColor: '#E5E7EB',
                  color: '#111827',
                  borderRadius: 2.5,
                  py: 1.6,
                  px: 1.9,
                  backgroundColor: '#FFFFFF',
                  textTransform: 'none',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
                  transition: 'all 0.18s ease-out',
                  '&:hover': {
                    borderColor: '#F77F00',
                    backgroundColor: 'rgba(247, 127, 0, 0.04)',
                    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ flexGrow: 1 }}
                >
                  <Typography
                    fontWeight={800}
                    sx={{
                      fontSize: 13,
                      textTransform: 'uppercase',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {`Extend\nTo ${t.minutes}\nMinutes`}
                  </Typography>

                  <Stack spacing={0.5}>
                    <Chip
                      size="small"
                      label={`New total ${t.minutes} minutes`}
                      sx={{
                        bgcolor: '#A6A6A6',
                        color: '#ffffff',
                        borderRadius: '999px',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    />
                    {isRecommended && (
                      <Typography
                        variant="caption"
                        sx={{ color: '#03CD8C', fontWeight: 600 }}
                      >
                        Recommended
                      </Typography>
                    )}
                  </Stack>
                </Stack>

                <Box textAlign="right">
                  <Typography
                    fontWeight={700}
                    sx={{ color: '#F77F00', fontSize: 12, letterSpacing: 0.08 }}
                  >
                    + UGX
                  </Typography>
                  <Typography fontWeight={800} sx={{ fontSize: 16 }}>
                    {addFormatted}
                  </Typography>
                </Box>
              </Button>
            );
          })}
        </Stack>
      </Box>

      {/* Footer */}
      <Box
        className="p-5 mt-auto"
        sx={{ maxWidth: 420, mx: 'auto', width: '100%' }}
      >
        <Button
          fullWidth
          variant="text"
          href="/booking/confirmed"
          sx={{
            color: '#F77F00',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.12,
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}

/**
 * Manual test cases:
 * 1) No booking: clear evz.booking.* → page shows guidance and the 5/10/15 minute
 *    extension cards (as in design screenshot).
 * 2) From 5 min (fee 3200): options show 10 min (+150) and 15 min (+300).
 * 3) From 10 min (fee 3350): option shows 15 min (+150).
 * 4) From 15 min: shows message "maximum hold".
 * 5) Clicking an option sets extendTargetMinutes/extendTargetFee/extendAddOnFee and
 *    navigates to /booking/extend/pay.
 * 6) Mobile fit: 360x780 → no horizontal scroll.
 */
