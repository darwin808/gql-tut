import React, { useState } from "react";

import { useQuery, gql, useMutation } from "@apollo/client";

const ALL_STARSHIP = gql`
  query MyQuery {
    people {
      first_name
      id
    }
  }
`;

function App() {
  const add_todo = gql`
    mutation MyMutation($id: Int, $first_name: String) {
      insert_people(objects: { first_name: $fname }) {
        returning {
          first_name
          id
        }
      }
    }
  `;

  const [fname, setname] = useState("");

  const { loading, data } = useQuery(ALL_STARSHIP);
  const [addtodo, { error }] = useMutation(add_todo);
  const addd = () => {
    console.log(data);
  };

  const pushdata = (e) => {
    e.preventDefault();
    console.log(fname);
    addtodo({ variables: { fname } });
  };
  return (
    <div className="App">
      {loading ? "loading please wait" : JSON.stringify(data)}

      <button onClick={pushdata}>addd</button>

      <form action="submit" onSubmit={pushdata}>
        <input
          placeholder="1st name"
          type="text"
          value={fname}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </form>

      {/* {data.people.map((e) => (
        <div key={e.id}>
          {e.first_name} {e.last_name}
        </div>
      ))} */}
    </div>
  );
}

export default App;
