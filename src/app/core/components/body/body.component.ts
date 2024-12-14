import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {Article} from "../../models/article/article";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  @Input() articles$!: Observable<Article[]>;
  @Input() loading$!: Observable<boolean>;
}
