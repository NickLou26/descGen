import React, { useState, useEffect } from 'react';

const defaultTemplate =
  "The speaker's tone is {tone} with a {pitch} pitch and a {rate} delivery. Their volume is {volume}, suggesting that they feel {desc}.";

const emotions = [
  {
    label: 'Anger',
    tone: [
      'harsh',
      'aggressive',
      'sharp',
      'biting',
      'hostile',
      'irritable',
      'seething',
      'explosive',
    ],
    pitch: [
      'high',
      'piercing',
      'strained',
      'tense',
      'screechy',
      'uneven',
      'jagged',
      'shrill',
    ],
    rate: [
      'abrupt',
      'forceful',
      'clipped',
      'confrontational',
      'jerky',
      'heated',
      'rapid',
      'snappy',
    ],
    volume: [
      'loud',
      'booming',
      'blaring',
      'thunderous',
      'strong',
      'elevated',
      'roaring',
      'raised',
    ],
    desc: [
      'furious',
      'enraged',
      'irritated',
      'provoked',
      'livid',
      'hostile',
      'upset',
      'volatile',
    ],
  },
];

function Dropdown({ label, options, selected, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div style={{ flex: '1', margin: '0 0.5rem', minWidth: '0' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        {label}
      </label>
      <select
        value={selected}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '0.5rem',
          backgroundColor: '#2d2d2d',
          color: 'white',
          border: '1px solid #444',
          borderRadius: '8px',
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ScrollSelections() {
  const [emotionSelection, setEmotionSelection] = useState('');
  const [template, setTemplateValue] = useState(defaultTemplate);
  const [selections, setSelections] = useState({
    tone: '',
    pitch: '',
    rate: '',
    volume: '',
    desc: '',
  });

  //Dropdowns
  const emotionDropdown = (
    <Dropdown
      key="1"
      label="Emotion"
      options={emotions.map((emotion) => emotion.label)}
      selected={emotionSelection}
      onChange={(label) => {
        const selected = emotions.find((e) => e.label === label);
        setEmotionSelection(selected || {});
      }}
    />
  );
  const toneDropdown = (
    <Dropdown
      key="2"
      label="Tone"
      selected={selections['tone']}
      options={emotionSelection.tone || []}
      onChange={(value) => handleChange('tone', value)}
    />
  );
  const pitchDropdown = (
    <Dropdown
      key="3"
      label="Pitch"
      selected={selections['pitch']}
      options={emotionSelection.pitch || []}
      onChange={(value) => handleChange('pitch', value)}
    />
  );
  const rateDropdown = (
    <Dropdown
      key="4"
      label="Speech Rate"
      selected={selections['rate']}
      options={emotionSelection.rate || []}
      onChange={(value) => handleChange('rate', value)}
    />
  );
  const volumeDropdown = (
    <Dropdown
      key="5"
      label="Volume"
      selected={selections['volume']}
      options={emotionSelection.volume || []}
      onChange={(value) => handleChange('volume', value)}
    />
  );
  const descDropdown = (
    <Dropdown
      key="6"
      label="Desc"
      selected={selections['desc']}
      options={emotionSelection.desc || []}
      onChange={(value) => handleChange('desc', value)}
    />
  );

  //Adding dropdowns to a list
  const dropdowns = [];
  dropdowns.push(emotionDropdown);
  dropdowns.push(toneDropdown);
  dropdowns.push(pitchDropdown);
  dropdowns.push(rateDropdown);
  dropdowns.push(volumeDropdown);
  dropdowns.push(descDropdown);

  //Generate output with the coorect words
  const generateOutput = () => {
    return template
      .replace('{tone}', selections['tone'] || '{tone}')
      .replace('{pitch}', selections['pitch'] || '{pitch}')
      .replace('{rate}', selections['rate'] || '{rate}')
      .replace('{volume}', selections['volume'] || '{volume}')
      .replace('{desc}', selections['desc'] || '{desc}');
  };

  //Handle changes within dropdowns
  const handleChange = (label, value) => {
    setSelections((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  //Update output with selection in dropdowns
  useEffect(() => {
    generateOutput();
  }, [selections]);

  //Copy output to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generateOutput());

    setSelections({
      tone: '',
      pitch: '',
      rate: '',
      volume: '',
      desc: '',
    });

    setEmotionSelection('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#121212',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
        }}
      >
        Emotion Gen
      </h2>
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '1rem' }}>
        Selected Emotion: {emotionSelection.label || 'None'}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'nowrap',
          overflowX: 'hidden',
          padding: '0 1rem',
        }}
      >
        {dropdowns}
      </div>
      <div
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          value={template}
          onChange={(e) => {
            setTemplateValue(e.target.value);
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
          }}
        />
      </div>
      <div
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          readOnly={true}
          value={generateOutput()}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
          }}
        />
      </div>
      <div
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <button
          onClick={handleCopy}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy Output
        </button>
      </div>
    </div>
  );
}
