import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private _http: HttpClient) {}

  private apiURL = `${environment.apiUrl}/upload`;

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this._http.post<{ imageUrl: string }>(this.apiURL, formData);
  }
}
