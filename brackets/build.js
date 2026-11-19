// Building brackets, kept apart from the page so build.test.js can check it: node --test brackets/
// Players are indexes into the list, top seed first. BYE stands in for a player who isn't there.
const BYE=-1;

// Elimination brackets. Seeds are placed the usual way (1 v 8, 4 v 5, 2 v 7, 3 v 6), so byes go to the top seeds.
function seedOrder(S){let o=[0];while(o.length<S){const L=o.length*2;o=o.flatMap(x=>[x,L-1-x]);}return o;}
// Every match is {a, b}, each fed by a seed, or the winner or loser of another match. W and L are the winners' and
// losers' rounds (lists of match ids). Double elimination ends with a grand final (g0) and a reset (g1), played only
// if the losers' bracket player wins g0.
function elim(n,double){
  let S=2;while(S<n)S*=2;
  const k=Math.log2(S),M={},W=[],L=[],order=seedOrder(S);
  for(let r=0;r<k;r++){
    const ids=[];
    for(let i=0;i<S>>(r+1);i++){
      const id='w'+r+'-'+i;ids.push(id);
      M[id]=r?{a:{win:'w'+(r-1)+'-'+2*i},b:{win:'w'+(r-1)+'-'+(2*i+1)}}:{a:{seed:order[2*i]},b:{seed:order[2*i+1]}};
    }
    W.push(ids);
  }
  if(!double)return {M,W,L};
  let lbChamp={lose:'w0-0'};
  if(k>1){
    const round=(make,c)=>{const r=L.length,ids=[];for(let i=0;i<c;i++){const id='l'+r+'-'+i;M[id]=make(i);ids.push(id);}L.push(ids);return ids;};
    let prev=round(i=>({a:{lose:'w0-'+2*i},b:{lose:'w0-'+(2*i+1)}}),S/4);
    for(let j=1;j<k;j++){
      // Losers from the winners' round drop in, in reverse order so early opponents don't meet again straight away
      const c=S>>(j+1),p=prev,w=W[j];
      prev=round(i=>({a:{win:p[i]},b:{lose:w[c-1-i]}}),c);
      if(j<k-1){const q=prev;prev=round(i=>({a:{win:q[2*i]},b:{win:q[2*i+1]}}),c/2);}
    }
    lbChamp={win:prev[0]};
  }
  M.g0={a:{win:W[k-1][0]},b:lbChamp};
  M.g1={a:{win:'g0'},b:{lose:'g0'}};
  return {M,W,L};
}
// Works out who's in each match and who won, from results ({match id: [winner, loser]}). undefined means not known yet.
// A bye sends the other player through. Results that no longer fit their match (an earlier result changed) are
// deleted from results.
function solve(M,n,results){
  const memo={},used=new Set();
  const val=s=>s.seed!=null?(s.seed<n?s.seed:BYE):s.win?res(s.win).w:res(s.lose).l;
  function res(id){
    if(memo[id])return memo[id];
    const m=M[id],a=val(m.a),b=val(m.b);let w,l;
    if(a!==undefined&&b!==undefined){
      if(a===BYE||b===BYE){w=a===BYE?b:a;l=BYE;}
      else{const r=results[id];if(r&&(r[0]===a&&r[1]===b||r[0]===b&&r[1]===a)){[w,l]=r;used.add(id);}}
    }
    return memo[id]={a,b,w,l};
  }
  Object.keys(M).forEach(res);
  for(const id of Object.keys(results))if(!used.has(id))delete results[id];
  return res;
}

// Round robin: everyone plays everyone, in rounds made by the circle method. With an odd count, one player sits out each round.
function robin(n){
  const a=[...Array(n).keys()];if(n%2)a.push(BYE);
  const m=a.length,rounds=[];
  for(let r=0;r<m-1;r++){
    const pairs=[];for(let i=0;i<m/2;i++)pairs.push([a[i],a[m-1-i]]);
    rounds.push(pairs);a.splice(1,0,a.pop());
  }
  return rounds;
}
