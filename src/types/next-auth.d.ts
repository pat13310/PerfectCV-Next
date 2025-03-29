import 'next-auth';
import { FormData } from '@/app/(protected)/dashboard/cv/new/page';

declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session {
    user: User & {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
    cvData?: FormData;
  }
}

// If you're using JWT strategy
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
