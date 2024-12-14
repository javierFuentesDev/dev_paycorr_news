import {Article} from "../article/article";
import {Meta} from "../meta/meta";

export interface ApiResponseNy {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: Meta
  };
}
