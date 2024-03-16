import dbConnect from "./dbConnect";
import { ObjectId } from 'mongodb'; // TODO mongoose?
import {
  Horse
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function fetchHorsesPages(query: string) {
  noStore();

  // TODO there is probably a better place to put this
  await dbConnect();

  // TODO get only this user's horses
  // TODO use query
  let horseCount = await Horse.find().countDocuments();
  return (Math.ceil(horseCount / ITEMS_PER_PAGE));
}

// TODO only this user's horses? admin?
export async function fetchHorseById(id: string) {
  noStore();

  // TODO there is probably a better place to put this
  await dbConnect();

  return (await Horse.findOne({_id:new ObjectId(id)}));
}

// TODO implement
export async function fetchLatestHorses() {
  noStore();
  const amount = 10;
  
  // TODO there is probably a better place to put this
  await dbConnect();

  // TODO get only this user's horses
  // return (await Horse.find().lean());

  return (await Horse.find().sort("-dateLastEdited").limit(amount));
}

// TODO implement
export async function fetchFilteredHorses(
  query: string,
  currentPage: number,
) {

  noStore();

  // TODO there is probably a better place to put this
  await dbConnect();

  // TODO get only this user's horses
  // sort by date,return top X
  //  return (await Horse.find());

  // let latestHorses: Horse[] = Horse.find();
  let latestHorses = await Horse.find().sort("-dateLastEdited").exec();
  console.log("Latest horses: ", latestHorses);
  //console.log("Count ", Horse.countDocuments());
  
  return(latestHorses);
  
}
