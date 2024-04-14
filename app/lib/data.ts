import { Horse } from './definitions';
import { toObjects } from './utils';
import { getSession } from '@auth0/nextjs-auth0';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function fetchHorsesPages(query: string) {
  noStore();

  const session = await getSession();
  if (session) {
    let user = session.user;
    try {
      let horseCount = await Horse.find({ownerId:user.sub}).countDocuments();
      return (Math.ceil(horseCount / ITEMS_PER_PAGE));
    } catch (e) {
      throw new Error ("Unable to connect to database");
    }
  } else { throw new Error ("Session undefined."); }
}

export async function fetchHorseById(id: string) {
  noStore();

  const session = await getSession();
  if (session) {
    let user = session.user;
    try {
      let horse : InstanceType<typeof Horse> = await Horse.findOne({_id:id, ownerId:user.sub});
      return(horse.toObject({ flattenObjectIds: true }));
      //return (await Horse.findOne({_id:new ObjectId(id)}).lean());
    } catch (e) {
      throw new Error ("Unable to connect to database");
    }
  } else { throw new Error ("Session undefined."); }
}

export async function fetchLatestHorses() {
  noStore();
  const amount = 10;

  const session = await getSession();
  if (session) {
    let user = session.user;

    try {
      return (toObjects(await Horse.find({ownerId:user.sub}).sort("-dateLastEdited").limit(amount)));
      //return (await Horse.find().lean().sort("-dateLastEdited").limit(amount));
    } catch (e) {
      throw new Error ("Unable to connect to database");
    }
  } else {
    throw new Error ("Session undefined.");
  }
}

export async function fetchFilteredHorses(
  query: string,
  currentPage: number,
) {

  noStore();

  const session = await getSession();
  if (session) {
    let user = session.user;

    try {
      if (query.length > 0) {
	return (toObjects( await Horse.find(
	  { ownerId:user.sub, $or: [{name: new RegExp(query, "i")},
		  {breed: new RegExp(query, "i")}]})
			   .sort("-dateLastEdited")));
      } else {
	return (toObjects( await Horse.find({ownerId:user.sub}).sort("-dateLastEdited")));
	//return ( await Horse.find().lean().sort("-dateLastEdited") );
      }
    } catch (e) {
      throw(e);
      throw new Error ("Unable to connect to database");
    }
  } else {
    throw new Error ("Session undefined.");
  }
}
