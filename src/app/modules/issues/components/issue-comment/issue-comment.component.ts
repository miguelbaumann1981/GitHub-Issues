import { Component, input } from '@angular/core';
import { GitHubIssues } from '../../interfaces/github-issues.interface';
import { MarkdownModule } from 'ngx-markdown';
import { GitHubComment } from '../../interfaces/github-comment.interface';

@Component({
  selector: 'issue-comment',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './issue-comment.component.html'
})
export class IssueCommentComponent {
  issue = input<GitHubIssues>();
  comment = input<GitHubComment>();
}
