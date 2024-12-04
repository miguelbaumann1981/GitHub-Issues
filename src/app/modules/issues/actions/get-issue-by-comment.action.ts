import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubComment } from "../interfaces/github-comment.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken


export const getIssueByComment = async (issueNumber: string): Promise<GitHubComment[]> => {

    await sleep(1500);

    try {
        const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        });

        if (!resp.ok) throw "Can't load comments";

        const comments: GitHubComment[] = await resp.json();
        console.log({comments});

        return comments;

    } catch (error) {
        throw "Can't load comments";
    }
}