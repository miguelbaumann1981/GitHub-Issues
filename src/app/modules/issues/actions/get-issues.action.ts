import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubIssues } from "../interfaces/github-issues.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken


export const getIssues = async (): Promise<GitHubIssues[]> => {

    await sleep(1500);

    try {
        const resp = await fetch(`${BASE_URL}/issues`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        });

        if (!resp.ok) throw "Can't load issues";

        const issues: GitHubIssues[] = await resp.json();
        console.log({issues});

        return issues;

    } catch (error) {
        throw "Can't load issues";
    }
}