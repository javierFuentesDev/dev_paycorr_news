import {Article} from "../../models/article/article";
import {Meta} from "../../models/meta/meta";

export interface ApiResponseNy {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: Meta
  };
}
