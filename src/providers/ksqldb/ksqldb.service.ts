import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class KsqldbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  executeQuery(data: { ksql: string; streamProperties: any }) {
    const url = this._getKsqlDbUrl('ksql');
    return this._postQuery(url, data);
  }

  runQuery(data: { ksql: string; streamProperties: any }) {
    const url = this._getKsqlDbUrl('query');
    return this._postQuery(url, data);
  }

  // private methods
  async _postQuery(url, data) {
    const { token } = this.configService.get('ksqldb');
    console.log('in postQery');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    console.log('url', url);
    console.log('data', data);
    console.log('options', { headers });
    const ksqlDBResponse = await lastValueFrom(
      this.httpService.post(url, data, { headers }).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );

    return ksqlDBResponse;
  }

  _getKsqlDbUrl(type: 'ksql' | 'query') {
    const { url, port } = this.configService.get('ksqldb');
    return `${url}:${port}/${type}`;
  }
}
