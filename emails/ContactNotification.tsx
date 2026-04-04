import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ContactNotificationProps {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  projectType?: string | null
  budget?: string | null
  message: string
  receivedAt: string
}

export function ContactNotification({
  name,
  email,
  phone,
  company,
  projectType,
  budget,
  message,
  receivedAt,
}: ContactNotificationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouveau message de {name}</Preview>
      <Body
        style={{
          backgroundColor: '#050510',
          fontFamily: 'Arial, Helvetica, sans-serif',
          margin: 0,
          padding: '40px 0',
        }}
      >
        <Container
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: '#0a0a1a',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          {/* Header */}
          <Section
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              padding: '32px 40px 24px',
            }}
          >
            <Heading
              style={{
                color: '#ffffff',
                fontSize: '24px',
                fontWeight: '700',
                margin: 0,
              }}
            >
              Webco
            </Heading>
            <Text
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '13px',
                margin: '4px 0 0',
              }}
            >
              Nouveau message recu
            </Text>
          </Section>

          {/* Contact details */}
          <Section
            style={{
              margin: '24px 40px 0',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              padding: '20px 24px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Text
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#8b5cf6',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                margin: '0 0 12px',
              }}
            >
              Coordonnees
            </Text>
            <Text style={{ color: '#f8fafc', fontSize: '14px', margin: '4px 0' }}>
              <strong>Nom :</strong> {name}
            </Text>
            <Text style={{ color: '#f8fafc', fontSize: '14px', margin: '4px 0' }}>
              <strong>Email :</strong> {email}
            </Text>
            {phone && (
              <Text style={{ color: '#f8fafc', fontSize: '14px', margin: '4px 0' }}>
                <strong>Telephone :</strong> {phone}
              </Text>
            )}
            {company && (
              <Text style={{ color: '#f8fafc', fontSize: '14px', margin: '4px 0' }}>
                <strong>Entreprise :</strong> {company}
              </Text>
            )}
            {projectType && (
              <Text style={{ color: '#f8fafc', fontSize: '14px', margin: '4px 0' }}>
                <strong>Type de projet :</strong> {projectType}
              </Text>
            )}
            {budget && (
              <Text style={{ color: '#f8fafc', fontSize: '14px', margin: '4px 0' }}>
                <strong>Budget :</strong> {budget}
              </Text>
            )}
          </Section>

          {/* Message */}
          <Section
            style={{
              margin: '16px 40px 0',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              padding: '20px 24px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Text
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#8b5cf6',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                margin: '0 0 12px',
              }}
            >
              Message
            </Text>
            <Text
              style={{
                color: '#f8fafc',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.7',
                margin: 0,
              }}
            >
              {message}
            </Text>
          </Section>

          <Hr style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '24px 40px' }} />

          {/* Footer */}
          <Section style={{ padding: '0 40px 32px', textAlign: 'center' as const }}>
            <Text style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px' }}>
              Recu le {receivedAt}
            </Text>
            <Text style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              Gerez vos messages sur{' '}
              <a
                href="https://client-webco.vercel.app/admin/contacts"
                style={{ color: '#8b5cf6', textDecoration: 'none' }}
              >
                l&apos;espace admin
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
