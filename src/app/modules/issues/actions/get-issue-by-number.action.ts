import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubIssues } from "../interfaces/github-issues.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken


export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssues> => {

    await sleep(1500);

    try {
        const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        });

        if (!resp.ok) throw "Can't load issue";

        const issue: GitHubIssues = await resp.json();
        console.log({issue});

        return issue;

    } catch (error) {
        throw "Can't load issue";
    }
}