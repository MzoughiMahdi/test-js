import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import axios from 'axios';

const GET_QUESTIONS = gql`
  query {
    questions {
      question
      answer
    }
  }
`;

function Question() {
  

  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/questions");
      setListOfUsers(result.data);
    };
    fetchData();
  }, [  ]);
  const { loading, error, data } = useQuery(GET_QUESTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    let score = 0;

    for (let i = 0; i < data.questions.length; i++) {
      const question = data.questions[i];
      const answer = form.elements[`question-${i}`].value;

      if (answer.toLowerCase() === question.answer.toLowerCase()) {
        score += 1;
      }
    }

    // Afficher la page des résultats
    window.location.href = `/result?score=${score}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <input type="text" name={`question-${index}`} required />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Question;
