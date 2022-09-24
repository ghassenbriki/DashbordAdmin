import {Inject, Injectable, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScriptsLoaderService {

  // tslint:disable-next-line:variable-name
  constructor(@Inject(DOCUMENT) private _document) {
  }

// a renderer2 must be created at the component to access its DOM
  addScriptCDN(LinkCDN: string, renderer2: Renderer2) {
    const s = renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = LinkCDN;
    s.text = ``;
    renderer2.appendChild(this._document.body, s);
  }

// a renderer2 must be created at the component to access its DOM
  addScripts(renderer2: Renderer2, ...scriptsNames: string[]) {
    scriptsNames.forEach((scriptPath: string) => {
      const s = renderer2.createElement('script');
      s.type = 'text/javascript';
      s.src = '..' + scriptPath;
      s.text = ``;
      renderer2.appendChild(this._document.body, s);
    });
  }

  // a renderer2 must be created at the component to access its DOM
  addScriptCustom(renderer2: Renderer2, script: string) {
    const s = renderer2.createElement('script');
    s.type = 'text/javascript';
    s.text = script;
    renderer2.appendChild(this._document.body, s);
  }

  // Paths should from /assets folder
  // example : /assets/js/myScript.js
  addOneScriptAsync(path): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = window.document.createElement('script');
      scriptElement.src = path;

      scriptElement.onload = () => {
        resolve();
      };
      scriptElement.onerror = () => {
        reject();
      };
      window.document.body.appendChild(scriptElement);
    });
  }

  // Paths should from /assets folder
  // example : /assets/js/myScript.js
  addManyScriptsAsync = async (...paths): Promise<void> => {
    for (const path of paths) {
      await this.addOneScriptAsync(path);
    }
  }

  // Paths should from /assets folder
  // example : /assets/css/myStyle.css
  addStylesheets(...paths: string[]) {
    paths.forEach((path) => {
      const linkElement = window.document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.type = 'text/css';
      linkElement.href = path;
      window.document.head.appendChild(linkElement);
    });
  }


}


