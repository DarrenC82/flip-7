import { Player } from '../utils/player';

// A new player starts with an empty hand
test('a new player should start with an empty hand', () => {
  const player = new Player('Player 1');
  expect(player.getCards()).toHaveLength(0);
  fail("test fail");
}
);

// a player should have less than 200 points in hand
test('a player should have less than 200 points', () => {
  const player = new Player('Player 1');
  expect(player.getPoints()).toBeLessThan(200);
    }
);

// adding card to players hand increases hand size
test('adding a card increases hand size', () => {
  const player = new Player('Player 1');
  const card = { name: '5', value: 5 };
  player.addCard(card);
  expect(player.getCards()).toHaveLength(1);
}
)



//player who draws a duplicate card busts
test('a player who draws a duplicate card busts', () => {
  const player = new Player('Player 1');
    player.addCard('12');
    player.addCard('12');
    expect(player.isBusted()).toBe(true);
});


// Player can choose to stay
test('a player can choose to stay', () => {
  const player = new Player('Player 1');
    player.stay();
    expect(player.hasStayed()).toBe(true);
    fail("test fail");
});



// player score is added based on cards in hand
test('player score is calculated correctly based on cards in hand', () => {
  const player = new Player('Player 1');
    player.addCard('5');
    player.addCard('3');
    expect(player.getPoints()).toBe(8);
}
);


// new player is active by default (not busted, not stayed)
test('a new player should be active by default', () => {
  const player = new Player('Player 1');
  expect(player.isBusted()).toBe(false);
  expect(player.hasStayed()).toBe(false);
});

test('player who flips 7 unique number cards gets 15 point bonus', () => {
  fail('not implemented: flipping 7 unique number cards ends round and gives bonus');
});

test('flip 7 cannot include modifier or action cards', () => {
  fail('not implemented: only number cards count for flip 7');
});
