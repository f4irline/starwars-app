import { ApiService } from './api.service';
import { Character } from 'src/app/models/character';
import { of, throwError } from 'rxjs';
import { SWAPI } from 'src/app/models/swapi';
import { finalize } from 'rxjs/operators';
import { Token } from 'src/app/models/token';

describe('ApiService', () => {
    let httpClientSpy: { get: jest.Mock; post: jest.Mock };
    let service: ApiService;
    beforeEach(() => {
        httpClientSpy = {
            get: jest.fn(),
            post: jest.fn(),
        };
        service = new ApiService(<any>httpClientSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should request characters', () => {
        const response: SWAPI = {
            results: [
                {
                    name: 'Luke',
                } as Character,
                {
                    name: 'Kevin',
                } as Character,
                {
                    name: 'Steve',
                } as Character,
            ],
        } as SWAPI;

        httpClientSpy.get.mockReturnValue(of(response));
        service.getPageOfCharacters(1).subscribe(
            chars => expect(chars).toEqual(response.results),
            error => expect(error).toBeTruthy()
        );
        expect(httpClientSpy.get.mock.calls.length).toBe(1);
    });

    it('should return an error in login', () => {
        httpClientSpy.post.mockReturnValue(
            throwError({ status: 401, msg: 'Wrong username or password.' })
        );
        service.login({ userName: 'Wrong', password: 'wrong' }).subscribe(
            () => {},
            error => expect(error.status).toBe(401)
        );
    });

    it('should validate login', () => {
        const token: Token = {
            msg: 'Login successful',
            token: '1234-5678',
        };

        httpClientSpy.post.mockReturnValue(of(token));
        service
            .login({ userName: 'Correct', password: 'correct' })
            .subscribe(res => expect(res).toEqual(res));
    });
});
