import { TestBed } from "@angular/core/testing";
import { IssuesService } from "./issues.service";
import { provideAngularQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { State } from "../interfaces/github-issues.interface";


describe('Issues Service', () => {

    let service: IssuesService;
    const queryClient = new QueryClient();

    beforeEach(() => {
        TestBed.configureTestingModule({
            teardown: {
                destroyAfterEach: false
            },
            providers: [
                provideAngularQuery(queryClient)
            ]
        });

        service = TestBed.inject(IssuesService);
    });

    afterEach(() => {

    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should load labels', async () => {
        const {data} = await service.labelsQuery.refetch();
        expect(data?.length).toBe(30);

        const [label] = data!;
        console.log(label);
        expect(typeof label.color).toBe('string');
        expect(typeof label.default).toBe('boolean');
        expect(typeof label.id).toBe('number');
    });

    it('should set selected state', async () => {
        service.showIssuesByState(State.Closed);
        expect(service.selectedState()).toBe(State.Closed);

        const {data} = await service.issuesQuery.refetch();
        data?.forEach(issue => {
            expect(issue.state).toBe(State.Closed);
        });

        service.showIssuesByState(State.Open);
        const {data: dataOpen} = await service.issuesQuery.refetch();
        dataOpen?.forEach(issue => {
            expect(issue.state).toBe(State.Open);
        });
    });

    it('should set selectedLabels', () => {
        service.toggleLabel('Accesibilty');
        expect(service.selectedLabels().has('Accesibilty')).toBeTrue();

        service.toggleLabel('Accesibilty');
        expect(service.selectedLabels().has('Accesibilty')).toBeFalse();
    });

    it('should set selectedLabels and get issues by label', async () => {
        const label = 'Accesibilty';
        service.toggleLabel(label);
        expect(service.selectedLabels().has(label)).toBeTrue();

        const { data } = await service.issuesQuery.refetch();
        data?.forEach(issue => {
            const hasLabel = issue.labels.some(l => l.name === label);
            expect(hasLabel).toBeTrue();
        })
    });


});