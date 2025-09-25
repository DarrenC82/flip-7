


//Freeze card tests 
test('freeze forces player to stay and bank their points', () => {
	fail('not implemented: freeze card should end player round');
});

// Flip 3 card tests 
test('flip three forces the player to draw three cards', () => {
	fail('not implemented: flip three must auto-draw three cards');
});

test('flip three stops early if player busts or reaches 7 unique cards', () => {
	fail('not implemented: flip three must respect bust or flip 7');
});

test('flip three is auto enacted on holding player of last person in round', () => {
	fail('not implemented: flip three must auto-enact on last player');
});

// 2nd chance card tests 
test('second chance prevents bust on first duplicate', () => {
	fail('not implemented: second chance must remove duplicate and discard itself');
});

test('only one second chance card can be held at a time', () => {
	fail('not implemented: cannot hold multiple second chance cards');
});

test('unused second chance card is discarded at end of round', () => {
	fail('not implemented: second chance should be discarded even if unused');
});

test('action cards cannot be used once player has stayed or busted', () => {
	fail('not implemented: invalid to apply action to inactive player');
});

