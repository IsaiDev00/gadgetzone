import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/banners';

  constructor(private http: HttpClient) {}

  getActiveBanners(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }
}
