const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map((anecdote) => asObject(anecdote));

const reducer = (state = initialState, action) => {
  // console.log("state now: ", state);
  // console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "VOTE_ANECDOTE": {
      const id = action.data.id;
      const anecdoteUpvote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteUpvote,
        votes: anecdoteUpvote.votes + 1,
      };
      const remapState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      return remapState.sort((a, b) => b.votes - a.votes);
    }
    default: {
      const checkState = [...state];
      checkState.sort((a, b) => a.votes - b.votes);
      // console.log(checkState);
      return checkState;
    }
  }
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    data: { content, id: getId(), votes: 0 },
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE_ANECDOTE",
    data: {
      id: id,
    },
  };
};
export default reducer;
