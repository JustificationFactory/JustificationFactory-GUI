/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* pdfkit module definition */
declare class PDFDocument {
  constructor(attributes: any);
  public pipe : any;
  public text(a: any, b: any, c: any);
  public end();
}

declare class blobStream {

}

declare function SVGtoPDF (doc: any, svg: any, x: any, y: any, options?: any);
