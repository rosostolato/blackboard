import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public onUpload(fileList: FileList) {
    const file = fileList[0];
    const reader = new FileReader();

    reader.onloadend = this.onLoad.bind(this);
    reader.readAsText(file, 'ISO-8859-1');
  }

  private onLoad(e: FileReaderProgressEvent) {
    const result: string = e.target.result;

    // parse csv
  }
}
