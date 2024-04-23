import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import type { Entity } from "@/utilities/jlpt_with_examples.json";
import rawData from "@/utilities/jlpt_with_examples.json";

const router = createRouter<NextApiRequest, NextApiResponse>();
const pageLength = 10;

const data = Object.values(rawData);
const levelTable:Record<string, number> = {};

// for(const level in rawData){
//   for(const entry in rawData[level]){
//     const jlptData = rawData[level][entry];
//     levelTable[entry] = parseInt(level);
//   }
// }

router.get(async (req, res) => {
  const condition:{
    'q'?: string,
    'level'?: number,
    'p': number
  } = {
    level: -1,
    p: 0
  };
  if(req.query['q']) condition.q = String(req.query['q']);
  if(typeof req.query['level'] === "string") condition.level = parseInt(req.query['level']);
  if(typeof req.query['p'] === "string") condition.p = parseInt(req.query['p']);
  const list:Entity[] = data.filter(v => {
    // const vv = levels[Object.keys(levels)[0]];
    // const v = vv[Object.keys(vv)[0]];
    v['examples'] &&= v['examples']['slice'](0, 1);
    if(condition.q){
      let ok = false;

      if(v['entry'] === condition.q) ok = true;
      else if(v['pronunciation'] === condition.q) ok = true;
      else if(v['pronunciation']['includes'](condition.q)) ok = true;

      if(!ok) return false;
    }
    if('level' in condition && condition.level !== -1){
      if(levelTable[v['entry']] !== condition.level) return false;
    }
    return true;
  });

  // if(condition.q?.length === 1){
  //   list.sort((a, b) => Math.abs(a['entry']['localeCompare'](condition.q!)) - Math.abs(b['entry']['localeCompare'](condition.q!)));
  // }
  res.send({
    list: list.slice(pageLength * condition.p, pageLength * (condition.p + 1)),
    count: list.length,
    pageCount: Math.ceil(list.length / pageLength)
  });
});
export default router.handler();