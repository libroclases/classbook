import { Injectable } from '@angular/core';
import { icons } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor() {

  }

  getBiClass(route: string) {
    return icons[route] ? icons[route]![0] : '';
  }

  getBiClass2(route: string[]): string[] {
    let images: string[] = [];
    route.forEach(r =>  images.push(icons[r]![0] ))
    return images;
  }

  getLabel(route: string) {
    return icons[route]![1];
  }

}
