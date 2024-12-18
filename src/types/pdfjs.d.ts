declare module 'pdfjs-dist' {
  export * from 'pdfjs-dist';

  export interface GlobalWorkerOptionsType {
    workerSrc: string;
  }

  export const GlobalWorkerOptions: GlobalWorkerOptionsType;
  export const getDocument: any;
}

declare module 'pdfjs-dist/build/pdf.worker.js' {
  export * from 'pdfjs-dist/build/pdf.worker.js';
}
