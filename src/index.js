import mon from 'mongoose';
import * as Email from './email';
import * as Url from './url';

export default function (go) {
	let mongo = go || mon;
	Url( mongo.Schema, mongo.Types);
	Email( mongo.Schema, mongo.Types);

	return mongo;
}