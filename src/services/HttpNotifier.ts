import axios from "axios";
import { INotifier } from "./INotifier";

export class HttpNotifier implements INotifier {
  constructor(private url: string) {
  }

  notify = () => {
    axios.get(this.url)
      .catch(console.log)
  }
}
