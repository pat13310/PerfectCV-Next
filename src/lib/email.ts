import nodemailer from 'nodemailer';

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendPasswordChangeEmail = async (to: string, name: string) => {
  const currentDate = new Date().toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Modification de votre mot de passe</h2>
      <p>Bonjour ${name},</p>
      <p>Nous vous informons que votre mot de passe a été modifié le ${currentDate}.</p>
      <p>Si vous n'êtes pas à l'origine de cette modification, veuillez immédiatement :</p>
      <ol>
        <li>Vous connecter à votre compte</li>
        <li>Changer votre mot de passe</li>
        <li>Contacter notre support</li>
      </ol>
      <p>Cordialement,<br>L'équipe PerfectCV</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"PerfectCV" <${process.env.SMTP_FROM}>`,
    to,
    subject: 'Modification de votre mot de passe',
    html,
  });
};

export const sendVerificationEmail = async (
  to: string,
  name: string,
  code: number,
  expiresAt: Date
) => {
  const expirationTime = expiresAt.toLocaleString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Code de vérification pour le changement de mot de passe</h2>
      <p>Bonjour ${name},</p>
      <p>Voici votre code de vérification pour le changement de mot de passe :</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px;">${code.toString().padStart(6, '0')}</span>
      </div>
      <p>Ce code expirera à ${expirationTime}.</p>
      <p>Si vous n'avez pas demandé ce code, veuillez ignorer cet email et sécuriser votre compte.</p>
      <p>Cordialement,<br>L'équipe PerfectCV</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"PerfectCV" <${process.env.SMTP_FROM}>`,
    to,
    subject: 'Code de vérification - Changement de mot de passe',
    html,
  });
};
