import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function renderNeubrutalistEmail({
  name,
  email,
  subject,
  message,
  timestamp,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "Pesan dari Portofolio Digital");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const safeDate = escapeHtml(timestamp);

  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: ${subject || "Pesan dari Portofolio Digital"}`
  )}`;

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pesan Baru: ${safeSubject}</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #f6f4ee; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto;">
    <tr>
      <td>
        <!-- Top Status Bar -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px;">
          <tr>
            <td align="left">
              <span style="display: inline-block; background-color: #e2ff3b; color: #111111; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 12px; border: 2px solid #111111; box-shadow: 2px 2px 0px #111111;">
                ● INCOMING TRANSMISSION // PORTOFOLIO
              </span>
            </td>
            <td align="right" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #555555; font-weight: 600;">
              ${safeDate}
            </td>
          </tr>
        </table>

        <!-- Main Neubrutalist Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 3px solid #111111; box-shadow: 6px 6px 0px #111111; border-radius: 2px;">
          <!-- Card Masthead -->
          <tr>
            <td style="padding: 24px 28px; background-color: #111111; color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">
                      ERGA WANDA AFRIZA
                    </h1>
                    <p style="margin: 4px 0 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #e2ff3b; text-transform: uppercase; letter-spacing: 0.06em;">
                      IT Developer · Sistem Telemetri Portofolio
                    </p>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: #e2ff3b; color: #111111; font-family: ui-monospace, monospace; font-weight: 900; font-size: 12px; padding: 4px 8px; border: 1.5px solid #ffffff;">
                      LIVE INQUIRY
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Metadata Section -->
          <tr>
            <td style="padding: 24px 28px; border-bottom: 2px dashed #111111; background-color: #faf9f5;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 6px 0; width: 130px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666666;">
                    Nama Pengirim
                  </td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 700; color: #111111;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666666;">
                    Alamat Email
                  </td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 700;">
                    <a href="mailto:${safeEmail}" style="color: #0052cc; text-decoration: underline; font-family: ui-monospace, monospace;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666666;">
                    Subjek
                  </td>
                  <td style="padding: 6px 0;">
                    <span style="display: inline-block; background-color: #ffffff; border: 1.5px solid #111111; padding: 3px 10px; font-size: 13px; font-weight: 700; color: #111111; box-shadow: 2px 2px 0px #111111;">
                      ${safeSubject}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 28px;">
              <p style="margin: 0 0 10px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #444444;">
                // DETAIL PESAN:
              </p>

              <!-- Neubrutalist Message Box -->
              <div style="background-color: #fdfcf7; border: 2px solid #111111; box-shadow: 4px 4px 0px #111111; padding: 20px; font-size: 15px; line-height: 1.65; color: #111111;">
                ${safeMessage}
              </div>

              <!-- Quick Reply CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top: 26px;">
                <tr>
                  <td>
                    <a href="${replyMailto}" target="_blank" style="display: inline-block; background-color: #e2ff3b; color: #111111; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; font-weight: 800; text-decoration: none; padding: 14px 26px; border: 2.5px solid #111111; box-shadow: 4px 4px 0px #111111; text-transform: uppercase; letter-spacing: 0.04em;">
                      Balas Pesan ke ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card Footer Seam -->
          <tr>
            <td style="padding: 16px 28px; background-color: #faf9f5; border-top: 2px solid #111111; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #666666;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left">
                    Portofolio: <a href="https://ergaporto.netlify.app" style="color: #111111; text-decoration: underline;">ergaporto.netlify.app</a>
                  </td>
                  <td align="right">
                    Status: <span style="color: #0a7b3e; font-weight: 700;">Verified 200 OK</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Outside Footer Note -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 14px;">
          <tr>
            <td align="center" style="font-family: ui-monospace, monospace; font-size: 11px; color: #777777;">
              © ${new Date().getFullYear()} Erga Wanda Afriza · Desain Email Neubrutalism Kustom
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Field nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // If Resend API key is not yet configured, tell client to use FormSubmit fallback
      return NextResponse.json(
        {
          success: false,
          fallbackRequired: true,
          message: "RESEND_API_KEY belum dikonfigurasi di server.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const now = new Date();
    const formattedTimestamp = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(now);

    const emailHtml = renderNeubrutalistEmail({
      name,
      email,
      subject: subject || "Diskusi Proyek Portofolio",
      message,
      timestamp: formattedTimestamp,
    });

    const targetEmail = process.env.CONTACT_TARGET_EMAIL || "ewandaafriza@gmail.com";
    const fromAddress = process.env.RESEND_FROM_EMAIL || "Portofolio Erga <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [targetEmail],
      replyTo: email,
      subject: `[Portofolio] ${subject || "Pesan Baru"} - dari ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Gagal mengirim email lewat Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: "Pesan berhasil dikirim dengan template Neubrutalism!",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
