function calcProb(map, overlay, path, length) {
  let prob = 1;
  let num = 0;
  let dense = 0;
  if(map === "Detroit") num = 0.000029333715;
  if(map === "Baltimore") num = 0.000019205514;
  if(map === "Pittsburgh") num = 0.000010663968;
  if(map === "Detroit") dense = 4878;
  if(map === "Baltimore") dense = 7428;
  if(map === "Pittsburgh") dense = 5412;
  for(let i = 0; i < length; i++) 
    prob *= 1-(overlay[path[i][0]]+overlay[path[i][1]])*num;
  prob = (1-prob)/dense*100;
  return [prob*4000/10050, prob*250/10050, prob*2300/10050, prob*500/10050, prob*13000/10050];
}