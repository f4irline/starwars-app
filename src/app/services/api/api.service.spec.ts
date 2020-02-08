import { ApiService } from './api.service';
import { Character } from 'src/app/models/character';
import { of, throwError } from 'rxjs';
import { SWAPI } from 'src/app/models/swapi';
import { finalize } from 'rxjs/operators';
import { Token } from 'src/app/models/token';

describe('ApiService', () => {
    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
    let service: ApiService;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        service = new ApiService(<any> httpClientSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should request characters', (done: DoneFn) => {
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

        httpClientSpy.get.and.returnValue(of(response));
        service.getPageOfCharacters(1).subscribe(
            chars => expect(chars).toEqual(response.results, 'expected characters'),
            error => expect(error).toBeTruthy(),
            () => done()
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return an error in login', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(throwError({ status: 401, msg: 'Wrong username or password.' }));
        service.login({ userName: 'Wrong', password: 'wrong' }).pipe(
            finalize(() => done())
        ).subscribe(
            () => {},
            (error) => expect(error.status).toBe(401),
        );
    });

    it('should validate login', (done: DoneFn) => {
        const token: Token = {
            msg: 'Login successful',
            token: '1234-5678'
        };

        httpClientSpy.post.and.returnValue(of(token));
        service.login({ userName: 'Correct', password: 'correct' }).pipe(
            finalize(() => done()),
        ).subscribe(
            (res) => expect(res).toEqual(res)
        );
    });
});
