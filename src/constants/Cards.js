export const community = [
  {title: `Advance to "Go". Collect £200.`, type: 'receive', item: 200},

  { title: `Bank error in your favor. Collect £200.`, type: 'receive', item:200},

  { title: `Doctor's fees. Pay £50.`, type: 'pay', item:50},

  { title: `From sale of stock you get £50.`, type: 'receive', item: 50},

  { title: `Get Out of Jail Free.`, type: 'getOutOfJailFree'},

  { title: `Go to Jail. Go directly to jail. Do not pass Go, Do not collect £200.`, type: 'goToJail',},

  { title: `Grand Opera Night. Collect £50 from every player for opening night seats.`, type: 'receive', item: 50, from: 'everyone'},

  { title: `Holiday {Xmas} Fund matures. Receive {Collect} £100.`, type: 'receive', item: 100},

  { title: `Income tax refund. Collect £20.`, type: 'receive', item: 20},

  { title: `It is {It's} your birthday. Collect £10 from every player.`, type: 'receive', item: 10, from: 'everyone'},

  { title: `Life insurance matures – Collect £100`, type: 'receive', item: 100},

  { title: `Hospital Fees. Pay £50.`, type: 'pay', item: 50},

  { title: `School fees. Pay £50.`, type: 'pay', item: 50},

  { title: `Receive £25 consultancy fee.`, type: 'receive', item: 25},

  { title: `You are assessed for street repairs: Pay £40 per house and £115 per hotel you own.`, type: 'payVariant', item: { house: 40, hotel: 115}},

  { title: `You have won second prize in a beauty contest. Collect £10.`, type: 'receive', item: 10},

  { title: `You inherit £100.`, type: 'receive', item: 100}
];

export const chance = [
  {title: `Advance to "Go". (Collect £200)`, type: 'receive', item: 200},

  {title: `Advance to Mathurin Ave. If you pass Go, collect £200.`, type: 'move', item: {toId: 'b2', conditions: {passGo: 200}}},

  {title: `Advance to St. Middle Street. If you pass Go, collect £200.`, type: 'move', item: {toId: 'b9', conditions: {passGo: 200}}},

  {title: `Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total 10 times the amount thrown.`, type: 'move', item: {toType: 'utility', conditions: {buy: true, ifOwned: "* 10"}}},

  {title: `Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.`,  type: 'move', item: {toTitle: 'Railroad', conditions: {buy: true, ifOwned: "* 2"}}},

  {title: `Bank pays you dividend of £50.`, type: 'receive', item: 50},

  {title: `Get Out of Jail Free.`, type: 'getOutOfJailFree'},

  {title: `Go to Jail. Go directly to Jail. Do not pass GO, do not collect £200.`, type: 'goToJail'},

  {title: `Make general repairs on all your property: For each house pay £25, For each hotel {pay} £100.`, type: 'payVariant', item: { house: 40, hotel: 115}},

  {title: `Pay  Speeding fine of £15.`, type: 'pay', item: 15},

  {title: `You have been elected Chairman of the Board. Pay each player £50.`, type: 'pay', item: 50, to: 'everyone'},

  {title: `Your building loan matures. Receive £150.`, type: 'receive', item: 150},

  {title: `You have won a crossword competition. Collect £100.`, type: 'receive', item: 100}
];

export default {
  community,
  chance
};