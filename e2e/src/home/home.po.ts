import { browser, by, element } from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get(`${browser.baseUrl}/home`) as Promise<any>;
    }

    getTitle() {
        return browser.getTitle() as Promise<string>;
    }

    getBmiClassList() {
        return element
            .all(by.css('app-root svg.ngx-charts [ngx-charts-bar] path.bar'))
            .first();
    }

    getCharactersModal() {
        return element(
            by.css(
                'app-root .cdk-overlay-container mat-dialog-container app-character-list ul'
            )
        );
    }

    getHeader() {
        return element(
            by.css('app-root .home .header h1')
        ).getText() as Promise<string>;
    }
}
