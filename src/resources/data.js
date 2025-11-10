// data.js
export var data = [
    {
      listID: 1,
      name: "My Favorite RPGs PRIVATE",
      customList: [
        { gameId: 101, title: "The Witcher 3: Wild Hunt" },
        { gameId: 102, title: "Skyrim" },
        { gameId: 103, title: "Baldur's Gate 3" },
      ],
      createdDate: "2024-02-15T12:00:00",
      isPublic: false,
      user: { username: "casper" },
    },
    {
      listID: 2,
      name: "Boardgames PUBLIC",
      customList: [
        { gameId: 104, title: "Boardgame1" },
        { gameId: 105, title: "Boardgame2" },
        { gameId: 106, title: "Boardgame3" },
      ],
      createdDate: "2025-03-15T12:00:00",
      isPublic: true,
      user: { username: "casper" },
    },
  ];
