import React, { useState, useEffect } from 'react';
import './App.css';
import Meme from './components/Meme';

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return '?' + params.join('&');
};

const App = () => {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setbottomText] = useState('');
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img style={{ width: 200 }} src={meme} alt="custom meme" />
      </div>
    );
  }

  return (
    <div>
      {template && (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: process.env.REACT_APP_IMGFLIP_USERNAME,
              password: process.env.REACT_APP_IMGFLIP_PASSWORD
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            );
            const json = await response.json();
            setMeme(json.data.url);
          }}
        >
          <Meme template={template} />
          <input
            placeholder="top text"
            value={topText}
            onChange={e => setTopText(e.target.value)}
          />
          <input
            placeholder="bottom text"
            value={bottomText}
            onChange={e => setbottomText(e.target.value)}
          />
          <button type="submit"> create meme</button>
        </form>
      )}
      {!template && (
        <>
          <h1>Pick a template</h1>
          {templates.map(template => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default App;
