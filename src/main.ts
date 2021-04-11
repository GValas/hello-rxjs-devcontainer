import { from } from "rxjs";

const arraySource = from([1, 2, 3, 4, 5]);
const subscribe = arraySource.subscribe((val) => console.log(val));
