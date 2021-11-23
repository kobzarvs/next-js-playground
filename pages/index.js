import {useEffect, useState} from 'react';


const script = `
try {
  const btn = document.querySelector('[data-testid=button]');
  console.log("start observe");
  btn.addEventListener('click', console.log);
  const config = {
    attributes: true,
    attributeOldValue: true,
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true,
  };
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      console.log(mutation);
    }
  });
  observer.observe(document.documentElement, config);
} catch (e) {
  console.log(e);
}
`

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log('loaded...');
    setLoaded(true);
  }, []);

  return (
    <div className="container">
      {loaded ? (
        <h1>
          State Loaded
        </h1>
      ) : (
        <h1>
          Loading...
        </h1>
      )}

      <main data-main="main-div">
        <div>value: {state}</div>
        <button data-testid="button" onClick={() => setState(val => val + 1)}>
          Click me
        </button>
      </main>

      <script lang="javascript" dangerouslySetInnerHTML={{__html: script}}/>
    </div>
  );
}
