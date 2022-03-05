import React, { useReducer, useContext, createContext, useEffect } from "react";
import repoReducer from "./repoReducer";

const RepoStateContext = createContext();
const RepoDispatchContext = createContext();

export function RepoProvider({ children, repos }) {
  const initialState = repos;
  console.log("initialState:", repos);

  const [state, dispatch] = useReducer(repoReducer, initialState);

  useEffect(() => {
    dispatch({ type: "GET", repos: repos });
  }, [repos]);

  return (
    <RepoStateContext.Provider value={repos}>
      <RepoDispatchContext.Provider value={dispatch}>
        {children}
      </RepoDispatchContext.Provider>
    </RepoStateContext.Provider>
  );
}

export function useRepoState() {
  const context = useContext(RepoStateContext);
  if (!context) {
    throw new Error("cannot find RepoProvider");
  }
}

export function useRepoDispatch() {
  const context = useContext(RepoDispatchContext);
  if (!context) {
    throw new Error("cannot find RepoDispatch");
  }
}
