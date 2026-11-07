import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../users/interfaces/user.interface';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Service()
export class AuthService {

  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  private token = signal<string | undefined>(undefined);

  user = signal<IUser | undefined>(undefined);

  getToken(): string | undefined {
    return this.token();
  }

  setToken(token: string): void {
    this.token.set(token);
  }

  loginUser(email: string, password: string): void {
    this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      catchError((error: { message: string }) => {
        return of(null);
      }),
    ).subscribe((response) => {
      const raw = response as unknown as { token: string, user: IUser & { _id?: string } };
      this.setToken(raw.token);
      this.user.set(raw.user as IUser);

    });
  }

  registerUser(user: IUser): void {
    this.http.post<IUser>(`${this.apiUrl}/auth/register`, user).pipe(
      catchError((error: { message: string }) => {
        return of(null);
      }),
    ).subscribe((response) => {
      const raw = response as unknown as IUser & { _id?: string };
      this.user.set(raw ? raw as IUser : undefined);
      console.log(response);
    });
  }

  logoutUser(): void {
    this.token.set(undefined);
    this.user.set(undefined);
    this.http.post<void>(`${this.apiUrl}/auth/logout`, {}).pipe(
      catchError((error: { message: string }) => {
        return of(null);
      }),
    ).subscribe((response) => {
      console.log(response);
    });
  }

}

