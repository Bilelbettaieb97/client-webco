import { createClient } from '@supabase/supabase-js'
import { getSettings } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, company, project_type, budget, message } = body as {
      name?: string
      email?: string
      phone?: string
      company?: string
      project_type?: string
      budget?: string
      message?: string
    }

    // Basic validation
    if (!name || name.length < 2 || name.length > 100) {
      return Response.json({ error: 'Le nom doit contenir entre 2 et 100 caracteres.' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }
    if (!message || message.length < 10 || message.length > 2000) {
      return Response.json({ error: 'Le message doit contenir entre 10 et 2000 caracteres.' }, { status: 400 })
    }

    // 1. Insert into Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

      const { error } = await supabase.from('contacts').insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        project_type: project_type || null,
        budget: budget || null,
        message,
        is_read: false,
      })

      if (error) {
        console.error('Supabase insert error:', error)
      }
    }

    // 2. Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const { ContactNotification } = await import('@/emails/ContactNotification')
        const resend = new Resend(process.env.RESEND_API_KEY)

        const settings = await getSettings()
        const toEmail = settings.notificationEmail || process.env.CONTACT_EMAIL || 'contact@webco.fr'

        const receivedAt = new Date().toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        await resend.emails.send({
          from: 'Webco Contact <onboarding@resend.dev>',
          to: toEmail,
          subject: `Nouveau message de ${name}`,
          react: ContactNotification({
            name,
            email,
            phone: phone || null,
            company: company || null,
            projectType: project_type || null,
            budget: budget || null,
            message,
            receivedAt,
          }),
        })
      } catch (emailErr) {
        console.error('Resend email error:', emailErr)
      }
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
