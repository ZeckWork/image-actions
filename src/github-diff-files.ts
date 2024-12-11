import octokit from "./github-api";
import githubEvent from "./github-event";

const requestDiffFiles = async (): Promise<string[]> => {
    const event = await githubEvent();

    const owner = event.repository.owner.login
    const repo = event.repository.name
    const number = event.number

    const response = await octokit.request("GET /repos/{owner}/{repo}/pulls/{number}/files", {
        owner,
        repo,
        number
    })

    console.log('::debug:: === Diff files ===')
    console.log('::debug::', response.data)
    console.log('::debug:: === Diff files ===')

    const json = JSON.parse(response.data as unknown as string)
    return json.map((diffEntry: any) => diffEntry.filename);
}

export default requestDiffFiles;