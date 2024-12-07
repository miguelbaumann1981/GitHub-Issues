import { environment } from "src/environments/environment";
import { getIssueByComment } from "./get-issue-by-comment.action";

const issueNumber = '123';
const mockComments: any[] = [
    { id: 1, body: 'First Comment', user: { login: 'user1' } },
    { id: 2, body: 'Second Comment', user: { login: 'user2' } }
];
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

describe('GetIssueByComment Action', () => {

    it('should fetch issue comments successfully', async () => {
        const requestUrl = `${BASE_URL}/issues/${issueNumber}/comments`;
        const issueResponse = new Response(JSON.stringify(mockComments), {
            status: 200,
            statusText: 'OK'
        });

        spyOn(window, 'fetch').and.resolveTo(issueResponse);
        await getIssueByComment(issueNumber);

        expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        });

    });


    it('should throw an error if response is not ok', async () => {
        const issueResponse = new Response(null, {
            status: 404,
            statusText: 'Not Found'
        });

        spyOn(window, 'fetch').and.resolveTo(issueResponse);

        try {
            await getIssueByComment(issueNumber);
            expect(true).toBeFalse();
        } catch (error) {
            expect(error).toBe(`Can't load comments`);
        }
    });

});