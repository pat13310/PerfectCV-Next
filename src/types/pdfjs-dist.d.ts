declare module 'pdfjs-dist' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
    destroy(): Promise<void>;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<TextContent>;
    getViewport({ scale: number }): PDFPageViewport;
    render(renderParameters: RenderParameters): PDFRenderTask;
    destroy(): Promise<void>;
  }

  export interface TextContent {
    items: TextItem[];
    styles: { [key: string]: any };
  }

  export interface TextItem {
    str: string;
    dir: string;
    transform: number[];
    width: number;
    height: number;
    fontName: string;
  }

  export interface PDFPageViewport {
    width: number;
    height: number;
    scale: number;
    rotation: number;
  }

  export interface RenderParameters {
    canvasContext: CanvasRenderingContext2D;
    viewport: PDFPageViewport;
  }

  export interface PDFRenderTask {
    promise: Promise<void>;
    cancel(): void;
  }

  export interface GlobalWorkerOptions {
    workerSrc: string;
  }

  export interface PDFDataRangeTransport {}

  export interface DocumentInitParameters {
    url?: string;
    data?: Uint8Array | BufferSource;
    httpHeaders?: { [key: string]: string };
    withCredentials?: boolean;
    password?: string;
    rangeChunkSize?: number;
    length?: number;
    range?: PDFDataRangeTransport;
    worker?: any;
  }

  export function getDocument(
    source: string | Uint8Array | DocumentInitParameters
  ): Promise<PDFDocumentProxy>;

  export const version: string;
  export const GlobalWorkerOptions: GlobalWorkerOptions;
}
