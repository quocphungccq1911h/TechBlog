import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UtilityService {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
  }

  isEmpty(input: any): boolean {
    if (input === undefined || input === null || input === '') return true;
    return false;
  }

  convertDateTime(date: Date) {
    const formattedDate = new Date(date.toString());
    return formattedDate.toDateString();
  }

  navigate(path: string) {
    this._router.navigate([path]);
  }

  unflattern = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    for (let i = 0; i < arr.length; i += 1) {
      let node = arr[i];
      node.children = [];
      map[node.id] = i; // use map to look-up the parents
      if (node.parentId !== null) {
        delete node['children'];
        arr[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };

  getDateFormatyyyymmdd(x) {
    let y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    d.length == 1 && (d = '0' + d);
    m.length == 1 && (m = '0' + m);
    let yyyymmdd = y + m + d;
    return yyyymmdd;
  }

  generateSlug(text: string): string {
    // Remove special characters and spaces from text
    const slug: string = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');

    // Combine slug and timestamp
    const slugWithTimestamp: string = `${slug}`;

    return slugWithTimestamp;
  }
}
