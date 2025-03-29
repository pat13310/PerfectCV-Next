# Configuration Google OAuth pour NextAuth

## Étapes à suivre

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionner votre projet ou en créer un nouveau
3. Aller dans "APIs & Services" > "Credentials"
4. Cliquer sur "Create Credentials" > "OAuth client ID"
5. Choisir "Web application"
6. Configurer les paramètres :
   - Nom : PerfectCV OAuth
   - Origines JavaScript autorisées :
     * http://localhost:3000
   - URI de redirection autorisés :
     * http://localhost:3000/api/auth/callback/google

## Exemple de configuration .env

```env
GOOGLE_CLIENT_ID=votre_client_id_ici
GOOGLE_CLIENT_SECRET=votre_client_secret_ici
```

## Conseils de sécurité
- Ne jamais commiter vos clés
- Utilisez des variables d'environnement
- Régénérez les clés si elles sont exposées

## Troubleshooting
- Vérifiez que les URI correspondent exactement
- Assurez-vous que le projet Google Cloud est actif
- Activez l'API Google+ dans la console Google Cloud
