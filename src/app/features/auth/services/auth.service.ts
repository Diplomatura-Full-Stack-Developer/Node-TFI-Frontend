import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../users/interfaces/user.interface';
import { catchError, of, tap } from 'rxjs';
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
      tap((response) => {
        const raw = response as unknown as { token: string, user: IUser & { userId?: string } };
        this.setToken(raw.token);
        this.user.set(raw.user as IUser);
      }),
    ).subscribe();
  }

  registerUser(user: IUser): void {
    this.http.post<IUser>(`${this.apiUrl}/auth/register`, user).pipe(
      tap((response) => {
        const raw = response as unknown as { token: string, user: IUser & { userId?: string } };
        this.setToken(raw.token);
        this.user.set(raw.user as IUser);
      }),
    ).subscribe();
  }

  refreshToken(): void {
    this.http.post<{ newToken: string }>(`${this.apiUrl}/auth/refresh-token`, { token: this.token() }).pipe(
      tap((response) => {
        this.setToken(response.newToken);
      }),
    ).subscribe();
  }


  logoutUser(): void {
    this.token.set(undefined);
    this.user.set(undefined);
  }

}

