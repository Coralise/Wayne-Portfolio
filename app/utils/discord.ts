/**
 * Sends contact form submissions straight to a Discord channel webhook.
 *
 * The site is a static export, so this runs in the browser and the webhook
 * URL ends up in the client bundle. It is injected at build time from
 * `NEXT_PUBLIC_DISCORD_WEBHOOK_URL` so it at least stays out of the repo.
 */
const WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

export const MESSAGE_MAX_LENGTH = 2000
export const NAME_MAX_LENGTH = 80
export const EMAIL_MAX_LENGTH = 120

export interface ContactMessage {
  name: string
  email: string
  reason: string
  message: string
}

export function isWebhookConfigured(): boolean {
  return Boolean(WEBHOOK_URL)
}

export async function sendContactMessage({ name, email, reason, message }: ContactMessage): Promise<void> {
  if (!WEBHOOK_URL) throw new Error('The contact form is not configured yet.')

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Portfolio Contact',
      // Never let a visitor ping @everyone / roles / users through the form.
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: `📬 ${reason}`,
          description: message.slice(0, MESSAGE_MAX_LENGTH),
          color: 0x229bff,
          fields: [
            { name: 'Name', value: name.slice(0, NAME_MAX_LENGTH), inline: true },
            { name: 'Email', value: email.slice(0, EMAIL_MAX_LENGTH), inline: true },
          ],
          footer: { text: 'Sent from the portfolio contact form' },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  })

  if (response.status === 429) throw new Error('Too many messages right now. Please try again in a minute.')
  if (!response.ok) throw new Error('Something went wrong while sending your message.')
}
