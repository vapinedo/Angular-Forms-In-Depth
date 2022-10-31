import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent implements ControlValueAccessor {

  @Input()
  requiredFileType: string;

  fileName = "";
  fileUploadError = false;
  uploadProgress: number | null;

  onChange = (fileName: string) => {};
  onTouched = function() {};
  isDisabled: boolean = false;

  constructor(private http: HttpClient) {}

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      console.log(this.fileName);
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: "events"
      })
        .pipe(
          catchError(error => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            const progress = Math.round(100 * (event.loaded / event.total));
            this.uploadProgress = progress;
          } else if (event.type == HttpEventType.Response) {
            this.onChange(this.fileName);
          }
        });
    }
  }

  writeValue(value: any): void {
    this.fileName = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;    
  }

}
