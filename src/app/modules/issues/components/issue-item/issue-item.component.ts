import { Component, input } from '@angular/core';
import { GitHubIssues, State } from '../../interfaces/github-issues.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './issue-item.component.html'
})
export class IssueItemComponent {

  public issue = input.required<GitHubIssues>();

  get isOpen() {
    return this.issue().state === State.Open;
  }

 }
