import * as vscode from 'vscode';
import * as locations from './locations.json';

export interface ICity {
  id: string;
  name: string;
  lat: string;
  lng: string;
}

class CityItem extends vscode.TreeItem {
  constructor(city: ICity) {
    super('');
    this.label = city.name;
    this.id = city.id;
    this.iconPath = new vscode.ThemeIcon('location');
    this.description = `经度：${city.lat}，纬度：${city.lng}`;
    this.tooltip = '点击查看详情';
    this.command = {
      title: '查看天气',
      command: 'weather.watch',
      arguments: [city],
    };
  }
}

export class CityDataProvider implements vscode.TreeDataProvider<CityItem> {
  getTreeItem(element: any) {
    return element;
  }
  getChildren() {
    return locations.map((item: ICity) => new CityItem(item));
  }
}
