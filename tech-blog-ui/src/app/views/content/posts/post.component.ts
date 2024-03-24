import { Component } from '@angular/core';
import { AdminApiTestApiClient } from 'src/app/api/admin-api.service.generated';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent {
  constructor(private testApiClient: AdminApiTestApiClient) {}
  test() {
    this.testApiClient.testAuThen().subscribe({
      next: () => console.log('ok'),
      error: (err: any) => console.log(err),
    });
  }
}
