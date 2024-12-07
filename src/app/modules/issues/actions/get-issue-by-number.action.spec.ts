import { environment } from "src/environments/environment";
import { getIssueByNumber } from "./get-issue-by-number.action";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
const issueNumber = '123';
const mockIssue = {
    id: 123,
    number: issueNumber,
    body: '# Hola Mundo'
}


describe('GetIssueByNumber Action', () => {

    
    it('should fetch issue successfully', async () => {
        const requestUrl = `${BASE_URL}/issues/${issueNumber}`;
        const issueResponse = new Response(JSON.stringify(mockIssue), {
            status: 200,
            statusText: 'OK'
        });

        spyOn(window, 'fetch').and.resolveTo(issueResponse);

        await getIssueByNumber(issueNumber);
        expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        });
    });

    it('should not fetch issue and return error', async () => {
        const issueResponse = new Response(null, {
            status: 404,
            statusText: 'Not Found'
        });

        spyOn(window, 'fetch').and.resolveTo(issueResponse);

        try {
            await getIssueByNumber(issueNumber);
            expect(true).toBeFalse();
        } catch (error) {
            expect(error).toBe(`Can't load issue ${issueNumber}`);
        }
    });

});