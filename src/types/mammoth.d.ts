declare module 'mammoth' {
  export interface ConvertOptions {
    path?: string;
    arrayBuffer?: ArrayBuffer;
  }

  export interface Result {
    value: string;
    messages: any[];
  }

  export function extractRawText(options: ConvertOptions): Promise<Result>;
  export function convertToHtml(options: ConvertOptions): Promise<Result>;

  const mammoth: {
    extractRawText: typeof extractRawText;
    convertToHtml: typeof convertToHtml;
  };

  export default mammoth;
}

declare module 'docx' {
  export class Document {
    static load(buffer: ArrayBuffer): Promise<Document>;
    getChildren(): any[];
  }

  export class Paragraph {
    getText(): string;
  }

  export interface DocumentOptions {
    // Options de configuration du document
  }

  export interface ParagraphOptions {
    // Options de configuration des paragraphes
  }
}
