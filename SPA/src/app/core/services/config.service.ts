import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class ConfigService {

    static readonly RESOURCE_BASE_URI = environment.RESOURCE_BASE_URI;
    static readonly LOGOUT_URI = environment.logout_uri;


    constructor() { }

    getDefaultRoute(role: string): string {
                return '/product-requests';

    }

    
    get logoutURI() {
        return ConfigService.LOGOUT_URI;
    }


    get resourceApiURI() {
        return ConfigService.RESOURCE_BASE_URI + "/api";
    }

    get graphqlURI() {
        return ConfigService.RESOURCE_BASE_URI + "/graphql";
    }

}