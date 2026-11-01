// The Outlast Trials trials and MK-Challenges, used by the Trial Randomizer and the Loadout Randomizer.
const KINDS=[{id:'trial',name:'Trial',title:'Trials'},{id:'mk',name:'MK-Challenge',title:'MK-Challenges'}];
const ASSETS=[{id:'coyle',name:'Leland Coyle'},{id:'gooseberry',name:'Mother Gooseberry'},{id:'franco',name:'Franco Barbi'},
  {id:'kress',name:'Otto and Arora Kress'},{id:'liliya',name:'Liliya Bogomolova'},{id:'any',name:'Any Prime Asset'},{id:'other',name:'Other'}];
// Every trial and MK-Challenge as of Season 7.1 (October 2026), by Prime Asset. Event versions are these
// with extra modifiers, so they aren't listed separately. Rebirth and Escape! start off.
// The ids are used to save your choices, so rename with care.
const LIST={
  trial:{
    coyle:['Kill the Snitch','Locksock the Warden','Vindicate the Guilty'],
    gooseberry:['Cleanse the Orphans','Grind the Bad Apples','Pervert the Futterman'],
    franco:['Liquidate the Union','Pleasure the Prosecutor','Poison the Medicine'],
    kress:['Kill the Politician','Silence the Idol'],
    liliya:['Despoil the Auction'],
    other:['Rebirth','Escape!']
  },
  mk:{
    coyle:['Bribe the Judges','Cancel the Autopsy','Destroy the Evidence','Eliminate the Past','Escape the Courthouse','Fuel the Release',
      'Release the Prisoners','Sabotage the Lockdown','Seize the Narcotics','Sentence the Prosecuted','Teach the Police Officer','Tilt the Scales of Justice'],
    gooseberry:['Beguile the Children','Compel the Children','Crush the Sex Toys','Deface the Futtermans','Drill the Futterman','Feed the Children',
      'Flatten the Foreman','Foster the Orphans','Fumigate the Factory','Gather the Children of God','Incinerate the Sex Toys','Open the Gates',
      'Punish the Miscreants','Redeem Your Freedom','Reunite the Family','Sanitize the Factory','Shutdown the Factory','Win the Truth'],
    franco:['Cook the Informant','Disrupt the Neighborhood','Eliminate the Legacy','Empty the Vault','Get Out the Vote','Kidnap the Mistress',
      'Poison the Cattle','Spread the Disease','Stash the Contraband','Traffick the Product'],
    kress:['Cancel the Broadcast','Change the Program','Fabricate the Scandal','Fund the Campaign','Investigate the Minotaur'],
    liliya:['Incinerate the Relic','Solve the Murder'],
    any:['Escape the Lies']
  }
};
const DEFAULT_OFF=['rebirth','escape-'];
const slug=n=>n.toLowerCase().replace(/[^a-z]+/g,'-');
const TRIALS=KINDS.flatMap(k=>ASSETS.flatMap(a=>(LIST[k.id][a.id]||[]).map(n=>({name:n,id:slug(n),kind:k.id,asset:a.id}))));
const trial=id=>TRIALS.find(t=>t.id===id);

// The Trial Randomizer's settings, saved as 'outlast': off = trials left out of rolls; played = trials marked as played;
// usePlayed = leave played trials out of rolls; result = the last roll;
// seen = default-off trials already turned off once, so ticking one later sticks
function loadTrialSettings(){
  const s=Object.assign({off:[],played:[],usePlayed:true,result:null,seen:[]},store.load('outlast'));
  DEFAULT_OFF.filter(id=>!s.seen.includes(id)).forEach(id=>{s.off.push(id);s.seen.push(id);});
  store.save('outlast',s);
  return s;
}
// The trials those settings allow
const trialCandidates=s=>TRIALS.filter(t=>!s.off.includes(t.id)&&!(s.usePlayed&&s.played.includes(t.id)));
