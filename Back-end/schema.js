const fetch = require('node-fetch');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

const QuestionType = new GraphQLObjectType({
  name: 'Question',
  fields: () => ({
    id: { type: GraphQLString },
    question: { type: GraphQLString },
    correctAnswer: { type: GraphQLString },
    incorrectAnswers: { type: new GraphQLList(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return fetch('https://api.sampleapis.com/futurama/questions')
          .then((res) => res.json())
          .then((data) => data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
