import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class Utilities {
  public static readonly captionAndMessageSeparator = ':';
  public static readonly noNetworkMessageCaption = 'No Network';
  public static readonly noNetworkMessageDetail = 'The server cannot be reached';
  public static readonly accessDeniedMessageCaption = 'Access Denied!';
  public static readonly accessDeniedMessageDetail = '';
  public static readonly notFoundMessageCaption = 'Not Found';
  public static readonly notFoundMessageDetail = 'The target resource cannot be found';

  public static cookies =
    {
      getItem: (sKey) => {
        return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
      },
      setItem: (sKey, sValue, vEnd, sPath, sDomain, bSecure) => {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
          return false;
        }

        let sExpires = '';

        if (vEnd) {
          switch (vEnd.constructor) {
            case Number:
              sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
              break;
            case String:
              sExpires = '; expires=' + vEnd;
              break;
            case Date:
              sExpires = '; expires=' + vEnd.toUTCString();
              break;
          }
        }

        document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
        return true;
      },
      removeItem: (sKey, sPath, sDomain) => {
        if (!sKey) {
          return false;
        }
        document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
        return true;
      },
      hasItem: (sKey) => {
        return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
      },
      keys: () => {
        const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
      }
    };

  public static getHttpResponseMessages(data: HttpResponseBase | any): string[] {
    const responses: string[] = [];

    if (data instanceof HttpResponseBase) {
      if (this.checkNoNetwork(data)) {
        responses.push(`${this.noNetworkMessageCaption}${this.captionAndMessageSeparator} ${this.noNetworkMessageDetail}`);
      } else {
        const responseObject = this.getResponseBody(data);

        if (responseObject && (typeof responseObject === 'object' || responseObject instanceof Object)) {

          for (const key in responseObject) {
            if (key) {
              responses.push(`${key}${this.captionAndMessageSeparator} ${responseObject[key]}`);
            } else if (responseObject[key]) {
              responses.push(responseObject[key].toString());
            }
          }
        }
      }

      if (!responses.length) {
        if ((data as any).body) {
          responses.push(`body: ${(data as any).body}`);
        }

        if ((data as any).error) {
          responses.push(`error: ${(data as any).error}`);
        }
      }
    }

    if (!responses.length) {
      if (this.getResponseBody(data)) {
        responses.push(this.getResponseBody(data).toString());
      } else {
        responses.push(data.toString());
      }
    }

    if (this.checkAccessDenied(data)) {
      responses.splice(0, 0, `${this.accessDeniedMessageCaption}${this.captionAndMessageSeparator} ${this.accessDeniedMessageDetail}`);
    }

    if (this.checkNotFound(data)) {
      let message = `${this.notFoundMessageCaption}${this.captionAndMessageSeparator} ${this.notFoundMessageDetail}`;
      if (data.url) {
        message += `. ${data.url}`;
      }

      responses.splice(0, 0, message);
    }

    return responses;
  }

  public static getHttpResponseMessage(data: HttpResponseBase | any): string {
    const httpMessage =
      Utilities.findHttpResponseMessage(Utilities.noNetworkMessageCaption, data) ||
      Utilities.findHttpResponseMessage(Utilities.notFoundMessageCaption, data) ||
      Utilities.findHttpResponseMessage('error_description', data) ||
      Utilities.findHttpResponseMessage('error', data) ||
      Utilities.getHttpResponseMessages(data).join();

    return httpMessage;
  }

  public static findHttpResponseMessage(messageToFind: string, data: HttpResponse<any> | any, seachInCaptionOnly = true, includeCaptionInResult = false): string {
    const searchString = messageToFind.toLowerCase();
    const httpMessages = this.getHttpResponseMessages(data);

    for (const message of httpMessages) {
      const fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);

      if (fullMessage.firstPart && fullMessage.firstPart.toLowerCase().indexOf(searchString) != -1) {
        return includeCaptionInResult ? message : fullMessage.secondPart || fullMessage.firstPart;
      }
    }

    if (!seachInCaptionOnly) {
      for (const message of httpMessages) {

        if (message.toLowerCase().indexOf(searchString) != -1) {
          if (includeCaptionInResult) {
            return message;
          } else {
            const fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);
            return fullMessage.secondPart || fullMessage.firstPart;
          }
        }
      }
    }

    return null;
  }

  public static getResponseBody(response: HttpResponseBase) {
    if (response instanceof HttpResponse) {
      return response.body;
    }

    if (response instanceof HttpErrorResponse) {
      return response.error || response.message || response.statusText;
    }
  }

  public static checkNoNetwork(response: HttpResponseBase) {
    if (response instanceof HttpResponseBase) {
      return response.status == 0;
    }

    return false;
  }

  public static checkAccessDenied(response: HttpResponseBase) {
    if (response instanceof HttpResponseBase) {
      return response.status == 403;
    }

    return false;
  }

  public static checkNotFound(response: HttpResponseBase) {
    if (response instanceof HttpResponseBase) {
      return response.status == 404;
    }

    return false;
  }

  public static checkIsLocalHost(url: string, base?: string) {
    if (url) {
      const location = new URL(url, base);
      return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    }

    return false;
  }

  public static getQueryParamsFromString(paramString: string) {

    if (!paramString) {
      return null;
    }

    const params: { [key: string]: string } = {};

    for (const param of paramString.split('&')) {
      const keyValue = Utilities.splitInTwo(param, '=');
      params[keyValue.firstPart] = keyValue.secondPart;
    }

    return params;
  }

  public static splitInTwo(text: string, separator: string): { firstPart: string, secondPart: string } {
    const separatorIndex = text.indexOf(separator);

    if (separatorIndex == -1) {
      return { firstPart: text, secondPart: null };
    }

    const part1 = text.substr(0, separatorIndex).trim();
    const part2 = text.substr(separatorIndex + 1).trim();

    return { firstPart: part1, secondPart: part2 };
  }

  public static safeStringify(object) {

    let result: string;

    try {
      result = JSON.stringify(object);
      return result;
    } catch (error) {

    }

    const simpleObject = {};

    for (const prop in object) {
      if (!object.hasOwnProperty(prop)) {
        continue;
      }
      if (typeof (object[prop]) == 'object') {
        continue;
      }
      if (typeof (object[prop]) == 'function') {
        continue;
      }
      simpleObject[prop] = object[prop];
    }

    result = '[***Sanitized Object***]: ' + JSON.stringify(simpleObject);

    return result;
  }

  public static JsonTryParse(value: string) {
    try {
      return JSON.parse(value);
    } catch (e) {
      if (value === 'undefined') {
        return void 0;
      }
      return value;
    }
  }

  public static TestIsObjectEmpty(obj: any) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  }

  public static TestIsUndefined(value: any) {
    return typeof value === 'undefined';
    // return value === undefined;
  }

  public static TestIsString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  public static capitalizeFirstLetter(text: string) {
    if (text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    } else {
      return text;
    }
  }

  public static toTitleCase(text: string) {
    return text.replace(/\w\S*/g, (subString) => {
      return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
    });
  }

  public static toLowerCase(items: string);
  public static toLowerCase(items: string[]);
  public static toLowerCase(items: any): string | string[] {

    if (items instanceof Array) {
      const loweredRoles: string[] = [];

      for (let i = 0; i < items.length; i++) {
        loweredRoles[i] = items[i].toLowerCase();
      }

      return loweredRoles;
    } else if (typeof items === 'string' || items instanceof String) {
      return items.toLowerCase();
    }
  }

  public static uniqueId() {
    return this.randomNumber(1000000, 9000000).toString();
  }

  public static randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static baseUrl() {
    let base = '';

    if (window.location.origin) {
      base = window.location.origin;
    } else {
      base = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    return base.replace(/\/$/, '');
  }  

}
