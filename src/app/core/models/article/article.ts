import {Headline} from "../headline/headline";
import {Multimedia} from "../multimedia/multimedia";

export interface Article {
  id: string;
  web_url: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  word_count: number;
}
