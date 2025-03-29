import { prisma } from '@/lib/prisma';

export type Resume = {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  templateId?: string;
  isPublished: boolean;
};

export async function getResumes(userId: string) {
  try {
    console.log('Fetching resumes for user:', userId);
    const resumes = await prisma.cV.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    console.log('Found resumes:', resumes);
    return resumes;
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw new Error('Failed to fetch resumes');
  }
}

export async function deleteResume(id: string, userId: string) {
  try {
    const resume = await prisma.cV.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return resume;
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw new Error('Failed to delete resume');
  }
}
