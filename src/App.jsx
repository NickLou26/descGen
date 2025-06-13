import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const defaultTemplate =
  "The speaker's tone is {tone}, with a {pitch} pitch and a {rate} delivery. Their volume is {volume}, suggesting that they feel {desc}.";

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
  {
    label: 'Contempt',
    tone: [
      'mocking',
      'sarcastic',
      'scornful',
      'dry',
      'disdainful',
      'sneering',
      'dismissive',
      'cutting',
    ],
    pitch: [
      'flat',
      'nasal',
      'low',
      'dull',
      'bored',
      'monotone',
      'drawled',
      'scoffing',
    ],
    rate: [
      'deliberate',
      'slow',
      'smug',
      'aloof',
      'patronizing',
      'dragging',
      'clipped',
      'cool',
    ],
    volume: [
      'low',
      'quiet',
      'muted',
      'reserved',
      'controlled',
      'soft',
      'restrained',
      'dismissive',
    ],
    desc: [
      'superior',
      'condescending',
      'disdainful',
      'uninterested',
      'smug',
      'aloof',
      'scornful',
      'indifferent',
    ],
  },
  {
    label: 'Disgust',
    tone: [
      'cold',
      'bitter',
      'grim',
      'displeased',
      'sour',
      'judgmental',
      'disdainful',
      'tight',
    ],
    pitch: [
      'sharp',
      'uneven',
      'nasal',
      'wavering',
      'scratchy',
      'high',
      'trembling',
      'thin',
    ],
    rate: [
      'jerky',
      'reluctant',
      'hesitant',
      'short',
      'stilted',
      'abrupt',
      'clipped',
      'tense',
    ],
    volume: [
      'subdued',
      'low',
      'curt',
      'flat',
      'constrained',
      'hushed',
      'breathy',
      'dry',
    ],
    desc: [
      'repulsed',
      'disturbed',
      'offended',
      'queasy',
      'unsettled',
      'sickened',
      'displeased',
      'disapproving',
    ],
  },
  {
    label: 'Fear',
    tone: [
      'anxious',
      'nervous',
      'shaky',
      'panicked',
      'hesitant',
      'worried',
      'tense',
      'uncertain',
    ],
    pitch: [
      'high',
      'quivering',
      'shaky',
      'rising',
      'fragile',
      'unstable',
      'thin',
      'squeaky',
    ],
    rate: [
      'halting',
      'breathless',
      'jumpy',
      'broken',
      'uneven',
      'fast',
      'fragmented',
      'rushed',
    ],
    volume: [
      'soft',
      'whispery',
      'faltering',
      'low',
      'faint',
      'shaky',
      'hushed',
      'unstable',
    ],
    desc: [
      'afraid',
      'threatened',
      'terrified',
      'alarmed',
      'panicked',
      'uneasy',
      'stressed',
      'jumpy',
    ],
  },
  {
    label: 'Sadness',
    tone: [
      'soft',
      'downcast',
      'weary',
      'sorrowful',
      'heavy',
      'pained',
      'flat',
      'melancholic',
    ],
    pitch: [
      'low',
      'falling',
      'dull',
      'flat',
      'subdued',
      'trailing',
      'monotone',
      'soft',
    ],
    rate: [
      'slow',
      'dragging',
      'lethargic',
      'faltering',
      'subdued',
      'hesitant',
      'quiet',
      'weary',
    ],
    volume: [
      'quiet',
      'low',
      'muted',
      'gentle',
      'soft',
      'faint',
      'hushed',
      'subdued',
    ],
    desc: [
      'sad',
      'depressed',
      'heartbroken',
      'hopeless',
      'lonely',
      'downcast',
      'grieving',
      'reflective',
    ],
  },
  {
    label: 'Surprise',
    tone: [
      'startled',
      'amazed',
      'surprised',
      'bright',
      'shocked',
      'wide-eyed',
      'open',
      'reactive',
    ],
    pitch: [
      'high',
      'rising',
      'sudden',
      'sharp',
      'squeaky',
      'varied',
      'animated',
      'shifting',
    ],
    rate: [
      'fast',
      'sudden',
      'staccato',
      'spontaneous',
      'jumpy',
      'broken',
      'brisk',
      'alert',
    ],
    volume: [
      'sharp',
      'medium',
      'lifted',
      'elevated',
      'quick',
      'sudden',
      'brisk',
      'strong',
    ],
    desc: [
      'surprised',
      'amazed',
      'stunned',
      'confused',
      'startled',
      'intrigued',
      'shocked',
      'baffled',
    ],
  },
  {
    label: 'Happiness',
    tone: [
      'cheerful',
      'upbeat',
      'lively',
      'warm',
      'enthusiastic',
      'joyful',
      'bright',
      'playful',
    ],
    pitch: [
      'medium',
      'sing-song',
      'melodic',
      'dynamic',
      'musical',
      'steady',
      'crisp',
      'rising',
    ],
    rate: [
      'smooth',
      'flowing',
      'expressive',
      'rhythmic',
      'animated',
      'fluid',
      'joyful',
      'easy',
    ],
    volume: [
      'moderate',
      'clear',
      'ringing',
      'full',
      'vibrant',
      'bright',
      'resonant',
      'energized',
    ],
    desc: [
      'happy',
      'delighted',
      'excited',
      'cheerful',
      'pleased',
      'thrilled',
      'joyful',
      'content',
    ],
  },
  {
    label: 'Tenderness',
    tone: [
      'gentle',
      'loving',
      'soft',
      'warm',
      'affectionate',
      'soothing',
      'caring',
      'calm',
    ],
    pitch: [
      'low',
      'mellow',
      'soft',
      'lilting',
      'gentle',
      'slow',
      'warm',
      'steady',
    ],
    rate: [
      'slow',
      'soft-spoken',
      'tender',
      'nurturing',
      'calm',
      'gentle',
      'patient',
      'quiet',
    ],
    volume: [
      'low',
      'gentle',
      'soft',
      'tender',
      'quiet',
      'mellow',
      'subdued',
      'warm',
    ],
    desc: [
      'loving',
      'affectionate',
      'caring',
      'gentle',
      'compassionate',
      'kind',
      'nurturing',
      'tender',
    ],
  },
  {
    label: 'Calm',
    tone: [
      'even',
      'relaxed',
      'balanced',
      'composed',
      'steady',
      'neutral',
      'smooth',
      'mellow',
    ],
    pitch: [
      'low',
      'even',
      'soft',
      'steady',
      'flat',
      'unchanging',
      'smooth',
      'calm',
    ],
    rate: [
      'slow',
      'measured',
      'smooth',
      'steady',
      'deliberate',
      'fluid',
      'gentle',
      'unhurried',
    ],
    volume: [
      'soft',
      'steady',
      'low',
      'quiet',
      'balanced',
      'even',
      'muted',
      'consistent',
    ],
    desc: [
      'calm',
      'peaceful',
      'grounded',
      'centered',
      'secure',
      'composed',
      'tranquil',
      'stable',
    ],
  },
];

function Dropdown({ label, options, selected, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
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
  const cookieTemplate = Cookies.get('templateValue');
  const [emotionSelection, setEmotionSelection] = useState('');
  const [template, setTemplateValue] = useState(
    cookieTemplate || defaultTemplate
  );
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
      selected={emotionSelection.label || ''}
      onChange={(label) => {
        const selected = emotions.find((e) => e.label === label);
        console.log(selected);
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
  };

  const handleReset = () => {
    setSelections({
      tone: '',
      pitch: '',
      rate: '',
      volume: '',
      desc: '',
    });

    setEmotionSelection('');
  };

  //Save template in cookies
  const saveCookie = () => {
    Cookies.set('templateValue', template, { expires: 365 }); // Cookie expires in 7 days
    alert('Template saved!');
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
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '2rem' }}>
        Template
      </p>
      <p style={{ textAlign: 'center', color: '#aaa' }}>
        {
          'Type your desired template using the keywords {tone} {pitch} {rate} {volume} and {desc}. The keywords will be replaced by the selected words above, and the generated setence will be shown in the output box below.'
        }
      </p>
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
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
            marginRight: '1rem',
          }}
        />

        <button
          onClick={saveCookie}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '2rem' }}>
        Output
      </p>
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
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
            marginRight: '1rem',
          }}
        >
          Copy Output
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#8B0000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
