import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubIssues, State } from "../interfaces/github-issues.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken


export const getIssues = async (state: State = State.All, selectedLabels: string[]): Promise<GitHubIssues[]> => {

    await sleep(1500);
    const params = new URLSearchParams();
    params.append('state', state);

    if (selectedLabels.length > 0) {
        params.append('labels', selectedLabels.join(','))
    }

    try {
        const resp = await fetch(`${BASE_URL}/issues?${params}`, {
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